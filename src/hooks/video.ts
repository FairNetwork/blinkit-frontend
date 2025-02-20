import { useEffect, useRef, useState } from 'react';
import * as faceApi from 'face-api.js';
import { usePDFContext } from '../components/pdf-context/PdfContext';
import { EYE_STATE } from '../types/pdf';

export const useBlinkDetection = (onTripleBlink: () => void) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const { updateEyeState } = usePDFContext();

    const [blinkCount, setBlinkCount] = useState(0);
    const [lastBlinkTime, setLastBlinkTime] = useState<number | null>(null);

    useEffect(() => {
        const loadModels = async () => {
            await faceApi.nets.ssdMobilenetv1.loadFromUri('/models');
            await faceApi.nets.faceLandmark68Net.loadFromUri('/models');
            void startVideo();
        };

        const startVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                alert('Bitte erlaube den Zugriff auf deine Kamera.');
            }
        };

        void loadModels();

        return () => {
            if (videoRef.current) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream?.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const detectHeadTilt = (landmarks: faceApi.FaceLandmarks) => {
        const leftEye = landmarks.positions.slice(36, 42);
        const rightEye = landmarks.positions.slice(42, 48);

        const eyeDistanceX = Math.abs(leftEye[0].x - rightEye[3].x);
        const eyeDistanceY = Math.abs(leftEye[1].y - rightEye[1].y);

        const tiltThreshold = 10;
        const tiltAngle = Math.atan2(eyeDistanceY, eyeDistanceX) * (180 / Math.PI);

        return Math.abs(tiltAngle) > tiltThreshold;
    };

    useEffect(() => {
        const detectBlink = async () => {
            updateEyeState(EYE_STATE.RECORDING);

            if (!videoRef.current) return;

            const detections = await faceApi.detectSingleFace(videoRef.current).withFaceLandmarks();

            if (!detections) return;

            const landmarks = detections.landmarks;

            if (detectHeadTilt(landmarks)) {
                updateEyeState(EYE_STATE.PAUSED);

                return;
            }

            const leftEye = landmarks.positions.slice(36, 42);
            const rightEye = landmarks.positions.slice(42, 48);

            const eyeClosed = (eye: faceApi.Point[]) => {
                const verticalDist = Math.hypot(eye[1].y - eye[5].y);
                const horizontalDist = Math.hypot(eye[0].x - eye[3].x);
                return verticalDist / horizontalDist < 0.24;
            };

            const isBlink = eyeClosed(leftEye) && eyeClosed(rightEye);

            if (isBlink) {
                const now = Date.now();

                if (lastBlinkTime && now - lastBlinkTime < 1300) {
                    setBlinkCount((prev) => prev + 1);
                } else {
                    setBlinkCount(1);
                }

                setLastBlinkTime(now);
            }
        };

        const interval = setInterval(detectBlink, 1000);
        return () => clearInterval(interval);
    }, [lastBlinkTime]);

    useEffect(() => {
        if (blinkCount >= 3) {
            updateEyeState(EYE_STATE.SUCCESSFUL);

            onTripleBlink();
            setBlinkCount(0);
        }
    }, [blinkCount, onTripleBlink]);

    return videoRef;
};
