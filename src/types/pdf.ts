export interface PDF {
    name: string;
    data: string;
    pages: number;
    currentPage: number;
    id: string;
}

export enum EYE_STATE {
    NONE,
    RECORDING,
    PAUSED,
    SUCCESSFUL
}
