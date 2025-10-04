
    import { GoogleGenerativeAI} from "@google/generative-ai";

    const genAI = new GoogleGenerativeAI("AIzaSyCjU85xbGp59eNMl-LcYhhGpU5EcnBUqVs");

    export async function generatePinMetadata(file: File) {



    const model = genAI.getGenerativeModel({model: "gemini-2.5-flash"});

    const dataBase64 = await fileToBase64(file);

    const prompt = `
    Analyse this image and generate a JSON object with the following properties:
    { 
    title (maximum 32 characters): A short and pleasing title that summarizes the image 
    description (maximum 1000 characters): A detailed description including main subjects, setting, and any notable actions or objects.
    an array of tags that describe the image (max 12): ["tag1", "tag2", "tag3"]
    }
    Answer ONLY in JSON format.
    `;

    const result = await model.generateContent([
        { text: prompt},
        {
            inlineData: {
                mimeType: file.type,
                data: dataBase64,
            },
        }
    ]);

    const text = result.response.text();
    console.log(text);
    const cleanedText = cleanJsonResponse(text);
    console.log(cleanedText);
    return JSON.parse(cleanedText);
}

    // Etwaige verbotene Zeichen entfernen
    function cleanJsonResponse(text: string) {
        // Falls Gemini mit ```json anfängt oder ``` am Ende hat → wegtrimmen
        return text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
    }

    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file); // liest die Datei als Data URL
            reader.onload = () => {
                // Ergebnis sieht so aus: "data:image/jpeg;base64,/9j/4AAQSk..."
                const base64 = (reader.result as string).split(",")[1]; // nur Base64-Teil nehmen
                resolve(base64);
            };
            reader.onerror = (error) => reject(error);
        });
    }
