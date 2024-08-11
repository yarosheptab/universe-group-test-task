import { ReactNode } from "react";

export interface HistoryViewerDialogHeaderProps {
    children?: ReactNode;
}

export const HistoryViewerDialogHeader = ({
    children,
}: HistoryViewerDialogHeaderProps) => {
    return (
        <div className='flex flex-row justify-between items-center'>
            {children}
        </div>
    );
};
