import './utility.scss';
import { useUtilityContent } from '../../hooks/utility';

const Utility = () => {
    const content = useUtilityContent();

    return <div className="utility">{content}</div>;
};

Utility.displayName = 'Utility';

export default Utility;
