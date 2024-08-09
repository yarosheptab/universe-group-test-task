import { Banner } from "./components/Banner";
import { PdfGeneratorContainer } from "./pdf-generator/PdfGeneratorContainer";

export const PageContainer = () => {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
            <Banner />
            <PdfGeneratorContainer />
        </div>
    );
};
