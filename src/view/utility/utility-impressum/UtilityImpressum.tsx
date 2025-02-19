import './utilityImpressum.scss';

const UtilityImpressum = () => {
    return (
        <div className="utility-impressum">
            <h2>Impressum</h2>
            <p>
                <strong>Angaben gemäß § 5 TMG</strong>
            </p>
            <p>
                Ihr Firmenname
                <br />
                Musterstraße 123
                <br />
                12345 Musterstadt
            </p>
            <p>
                <strong>Vertreten durch:</strong>
                <br />
                Max Mustermann
            </p>
            <p>
                <strong>Kontakt:</strong>
                <br />
                Telefon: 01234 567890
                <br />
                E-Mail: info@ihrunternehmen.de
            </p>
            <p>
                <strong>Umsatzsteuer-ID:</strong>
                <br />
                Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: DE123456789
            </p>
            <p>
                <strong>Aufsichtsbehörde:</strong>
                <br />
                Musteraufsichtsbehörde
            </p>
        </div>
    );
};

UtilityImpressum.displayName = 'UtilityImpressum';

export default UtilityImpressum;
