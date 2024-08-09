import { API_KEY } from "./constants";

export const convertTextToBase64PDF = (
    text: string
): Promise<
    { status: "success"; result: string } | { status: "error"; error: string }
> => {
    const url = `http://95.217.134.12:4010/create-pdf?apiKey=${API_KEY}`;

    return fetch(url, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ text }),
    })
        .then((res) => res.blob())
        .then(blobToBase64)
        .then((res) => ({
            status: "success" as const,
            result: (res as string).split(",")[1],
        }))
        .catch((res) => ({
            status: "error" as const,
            error: JSON.stringify(res),
        }));
};

export const blobToBase64 = (blob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
        reader.onloadend = () => {
            resolve(reader.result);
        };
    });
};
