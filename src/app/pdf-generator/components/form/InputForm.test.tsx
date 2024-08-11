import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
    convertTextToBase64PDF,
    savePdfToLocalStorage,
} from "../../../../utils/helpers";
import { InputForm } from "./InputForm";

jest.mock("../../../../utils/helpers", () => ({
    convertTextToBase64PDF: jest.fn(),
    savePdfToLocalStorage: jest.fn(),
    getHistoryFromLocalStorage: jest.fn().mockReturnValue([]),
}));

describe("Component: InputForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Given InputForm component is rendered, When form elements are checked, Then input field and buttons should be present", () => {
        render(<InputForm onConvert={jest.fn()} />);

        expect(
            screen.getByPlaceholderText("Введіть текст...")
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /Конвертувати в PDF/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /History/i })
        ).toBeInTheDocument();
    });

    test("Given valid input text, When form is submitted, Then the input text should be converted to PDF, saved, and passed to the onConvert callback", async () => {
        const mockOnConvert = jest.fn();
        const mockConvertTextToBase64PDF = convertTextToBase64PDF as jest.Mock;
        mockConvertTextToBase64PDF.mockResolvedValue({
            status: "success",
            result: "base64pdfcontent",
        });

        render(<InputForm onConvert={mockOnConvert} />);

        fireEvent.change(screen.getByPlaceholderText("Введіть текст..."), {
            target: { value: "Test text" },
        });

        fireEvent.click(
            screen.getByRole("button", { name: /Конвертувати в PDF/i })
        );

        await waitFor(() => {
            expect(mockConvertTextToBase64PDF).toHaveBeenCalledWith(
                "Test text"
            );
        });

        await waitFor(() => {
            expect(savePdfToLocalStorage).toHaveBeenCalledWith(
                "base64pdfcontent"
            );
        });

        await waitFor(() => {
            expect(mockOnConvert).toHaveBeenCalledWith("base64pdfcontent");
        });
    });

    test("Given empty input, When form is submitted, Then no conversion should be attempted and no actions should be taken", async () => {
        const mockOnConvert = jest.fn();

        render(<InputForm onConvert={mockOnConvert} />);

        fireEvent.click(
            screen.getByRole("button", { name: /Конвертувати в PDF/i })
        );

        await waitFor(() => {
            expect(convertTextToBase64PDF).not.toHaveBeenCalled();
        });

        await waitFor(() => {
            expect(savePdfToLocalStorage).not.toHaveBeenCalled();
        });

        await waitFor(() => {
            expect(mockOnConvert).not.toHaveBeenCalled();
        });
    });

    test("Given conversion fails, When form is submitted, Then an error message should be displayed", async () => {
        const mockOnConvert = jest.fn();
        const mockConvertTextToBase64PDF = convertTextToBase64PDF as jest.Mock;
        mockConvertTextToBase64PDF.mockResolvedValue({
            status: "error",
            error: "Conversion error",
        });

        render(<InputForm onConvert={mockOnConvert} />);

        fireEvent.change(screen.getByPlaceholderText("Введіть текст..."), {
            target: { value: "Test text" },
        });

        fireEvent.click(
            screen.getByRole("button", { name: /Конвертувати в PDF/i })
        );

        await waitFor(() => {
            expect(screen.getByText("Conversion error")).toBeInTheDocument();
        });
    });

    test("Given the history button is clicked, When the button is clicked, Then the history dialog should be displayed", async () => {
        const mockOnConvert = jest.fn();

        render(<InputForm onConvert={mockOnConvert} />);

        fireEvent.click(screen.getByRole("button", { name: /History/i }));

        await waitFor(() => {
            expect(screen.getByText("Історія конвертацій")).toBeInTheDocument();
        });
    });
});
