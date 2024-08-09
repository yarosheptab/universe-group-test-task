import { useState } from "react";

export const InputForm = () => {
    const [inputValue, setInputValue] = useState("");
    return (
        <form
            className='flex flex-col items-stretch gap-3'
            onSubmit={(e) => e.preventDefault()}
        >
            <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Введіть текст...'
                className='resize-none w-[700px] h-[300px] w-max-[100%] p-8 bg-black border-2 border-neutral-500 text-lg text-neutral-100 outline-none focus-visible:ring-2 ring-offset-background focus-visible:ring-offset-2 rounded-2xl placeholder:text-neutral-600'
            />
            <button className='w-full bg-neutral-100 text-neutral-950 hover:bg-neutral-100/90 transition-all h-11 rounded-lg px-8 font-semibold'>
                Конвертувати в PDF
            </button>
        </form>
    );
};
