import SidebarItem from '../components/shared/sidebar/sidebar-item/SidebarItem';
import { useMemo } from 'react';
import { usePDFContext } from '../components/pdf-context/PdfContext';

export const useSidebarFileContent = () => {
    const { pdfList } = usePDFContext();

    return useMemo(() => {
        return pdfList.map(({ name, id }) => {
            return (
                <SidebarItem
                    key={`sidebar-item--${id}`}
                    text={name}
                    route={`/${id}`}
                    icon="fa fa-file"
                />
            );
        });
    }, [pdfList]);
};
