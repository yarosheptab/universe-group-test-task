import { useState } from "react";
import { History } from "tabler-icons-react";
import { Spinner } from "../../../../shared/components/Spinner";
import { convertTextToBase64PDF } from "../../../../utils/helpers";

export interface InputFormProps {
    onConvert: (content: string) => void;
}

export const InputForm = ({ onConvert }: InputFormProps) => {
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [convertError, setConvertError] = useState<string | null>(null);

    const handleFormSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        if (!inputValue) {
            return;
        }
        setIsLoading(true);
        setConvertError(null);

        const result = await convertTextToBase64PDF(inputValue);

        if (result.status === "success") {
            onConvert(result.result);
            setInputValue("");
        } else {
            setConvertError(result.error);
        }

        setIsLoading(false);
    };
    return (
        <form
            className='flex flex-col items-stretch gap-3'
            onSubmit={handleFormSubmit}
        >
            <textarea
                disabled={isLoading}
                value={inputValue}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleFormSubmit();
                    }
                }}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Введіть текст...'
                className='resize-none w-[700px] h-[300px] w-max-[100%] p-8 bg-black border-2 border-neutral-500 disabled:border-neutral-800 text-lg text-neutral-100 disabled:text-neutral-500 outline-none focus-visible:ring-2 ring-offset-background focus-visible:ring-offset-2 rounded-2xl placeholder:text-neutral-600'
            />
            <div className='flexe flex-row gap-2'>
                <button
                    disabled={isLoading}
                    className='w-full bg-neutral-100 text-neutral-950 disabled:bg-neutral-400 enabled:hover:bg-neutral-100/90 transition-all h-11 rounded-lg px-8 font-semibold flex justify-center items-center'
                >
                    {isLoading ? (
                        <Spinner className='h-8 w-8' />
                    ) : (
                        "Конвертувати в PDF"
                    )}
                </button>
                <button className='aspect-square bg-transparent text-neutral-100 enabled:hover:bg-neutral-700 transition-all h-11 rounded-lg px-8 font-semibold flex justify-center items-center'>
                    <History />
                </button>
            </div>
            {convertError && <p className='text-red-500'>{convertError}</p>}
        </form>
    );
};
