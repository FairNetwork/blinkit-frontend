import './utilityDataProtection.scss';

const UtilityDataProtection = () => {
    return (
        <div className="utility-data-protection">
            <h2>Datenschutzerklärung</h2>
            <p>
                <strong>1. Datenschutz auf einen Blick</strong>
            </p>
            <p>
                Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Hier erhalten Sie einen
                Überblick darüber, was mit Ihren Daten passiert, wenn Sie unsere Website besuchen.
            </p>
            <p>
                <strong>2. Verantwortlicher</strong>
            </p>
            <p>
                Verantwortlicher für die Datenverarbeitung auf dieser Website ist:
                <br />
                Max Mustermann
                <br />
                Musterstraße 123
                <br />
                12345 Musterstadt
                <br />
                E-Mail: datenschutz@ihrunternehmen.de
            </p>
            <p>
                <strong>3. Erhebung und Verarbeitung von Daten</strong>
            </p>
            <p>
                Beim Besuch unserer Website speichern wir automatisch technische Daten wie Ihre
                IP-Adresse und Browsertyp. Diese Daten werden nur zur Sicherstellung des
                ordnungsgemäßen Betriebs der Website verwendet.
            </p>
            <p>
                <strong>4. Rechte der Betroffenen</strong>
            </p>
            <ul>
                <li>Recht auf Auskunft über gespeicherte Daten</li>
                <li>Recht auf Berichtigung oder Löschung</li>
                <li>Recht auf Widerspruch gegen die Verarbeitung</li>
                <li>Recht auf Datenübertragbarkeit</li>
            </ul>
            <p>
                <strong>5. Kontakt</strong>
            </p>
            <p>
                Für weitere Informationen oder zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte
                per E-Mail an datenschutz@ihrunternehmen.de.
            </p>
        </div>
    );
};

UtilityDataProtection.displayName = 'UtilityDataProtection';

export default UtilityDataProtection;
