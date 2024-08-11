import { memo } from "react";
import { X } from "tabler-icons-react";
import { getHistoryFromLocalStorage } from "../../../../utils/helpers";
import { HistoryRow } from "./HistoryRow";
import { HistoryViewerDialogHeader } from "./HistoryViewerDialogHeader";

export interface HistoryViewerDialogProps {
    open: boolean;
    onClose: () => void;
    onSelect: (content: string) => void;
}

export const HistoryViewerDialog = memo(
    function ({ open, onClose, onSelect }: HistoryViewerDialogProps) {
        const getHistory = () => {
            const history = getHistoryFromLocalStorage();
            return history.sort((a, b) =>
                b.createdAt.localeCompare(a.createdAt)
            );
        };

        return (
            <>
                {open && (
                    <div className='fixed w-screen h-screen top-0 left-0 flex justify-center items-center z-50'>
                        <div
                            className='bg-neutral-950/80 absolute w-full h-full z-0'
                            onClick={() => onClose()}
                        />
                        <section className='flex flex-col gap-4 border rounded-2xl border-neutral-100 relative z-10 max-w-lg w-full p-5 min-h-60 bg-neutral-950'>
                            <HistoryViewerDialogHeader>
                                <h1 className='text-neutral-100 text-3xl font-semibold'>
                                    Історія конвертацій
                                </h1>
                                <button
                                    onClick={() => onClose()}
                                    className='aspect-square bg-transparent text-neutral-100 h-11 rounded-lg px-8 font-semibold flex justify-center items-center'
                                >
                                    <X />
                                </button>
                            </HistoryViewerDialogHeader>
                            <div className='flex flex-col'>
                                {getHistory().map((historyRecord, index) => (
                                    <HistoryRow
                                        key={index}
                                        historyRecord={historyRecord}
                                        onSelect={(historyRecord) =>
                                            onSelect(historyRecord.content)
                                        }
                                    />
                                ))}
                            </div>
                        </section>
                    </div>
                )}
            </>
        );
    },
    ({ open: oldOpen }, { open: newOpen }) => oldOpen === newOpen
);
