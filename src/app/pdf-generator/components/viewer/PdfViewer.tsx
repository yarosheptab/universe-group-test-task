import PDFViewer from "pdf-viewer-reactjs";

export interface PdfViewerProps {
    base64Document: string;
}

export const PdfViewer = ({ base64Document }: PdfViewerProps) => {
    return (
        <div className='h-[800px]'>
            <PDFViewer
                canvasCss='w-full flex flex-col items-stretch rounded-xl'
                key={base64Document}
                document={{
                    base64: base64Document,
                }}
            />
        </div>
    );
};
