import { ChevronRight } from "tabler-icons-react";
import { HistoryRecord } from "../../../../utils/types";

export interface HistoryRowProps {
    historyRecord: HistoryRecord;
    onSelect: (historyRecord: HistoryRecord) => void;
}

export const HistoryRow = ({ historyRecord, onSelect }: HistoryRowProps) => {
    return (
        <div
            className='py-4 px-2 text-neutral-100 border-b border-b-neutral-400 flex flex-row justify-between hover:underline cursor-pointer'
            onClick={() => onSelect(historyRecord)}
        >
            <span className=''>
                {new Date(historyRecord.createdAt).toLocaleString()}
            </span>
            <ChevronRight />
        </div>
    );
};
