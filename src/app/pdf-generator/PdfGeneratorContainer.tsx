import { useState } from "react";
import { InputForm } from "./components/form/InputForm";
import { PdfViewer } from "./components/viewer/PdfViewer";

export const PdfGeneratorContainer = () => {
    const [openedDocument, setOpenedDocument] = useState<string | null>(null);

    const handlePdfCreate = async (base64Content: string) => {
        setOpenedDocument(base64Content);
    };

    return (
        <div className='flex flex-col gap-4'>
            <InputForm onConvert={handlePdfCreate} />
            {openedDocument && <PdfViewer base64Document={openedDocument} />}
        </div>
    );
};
