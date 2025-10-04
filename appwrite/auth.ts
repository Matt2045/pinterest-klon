import { ID, OAuthProvider, Query } from "appwrite";
import {account, database, appwriteConfig, storage} from "./client";
import { redirect } from "react-router";
import {generatePinMetadata} from "../gemini/gemini";

/*
TypeScript-Typen nutzen
interface CreatePinData {
  title?: string;
  description?: string;
  tags?: string;
  imageFile: File;
}
Das ? zeigt dir sofort, dass Felder optional/fehlend sein können → zwingt dich, im Code damit umzugehen.
 */


interface CreatePinData {
    title: string;
    description: string;
    tags: string;
    imageFile: File;
}


export const getExistingUser = async (userId: string) => {
    try {
        console.log("Fetching existing user with ID: ", userId);
        const { documents, total} = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', userId)]
        );
        return total > 0 ? documents[0] : null;

    } catch (e) {
        console.log("Error fetching existing user: ", e);
        return null;
    }


}

//Account Id hier nötig - derzeit normale $id des Users

/**
 * Erstellt einen neuen Pin durch Hochladen des Bildes und Erstellen des Datenbankeintrags.
 * @param pinData Die Daten aus dem Formular.
 * @returns Das erstellte Appwrite-Dokument.
 * @throws Wirft einen Fehler, wenn der Prozess fehlschlägt.
 */
export const uploadImage = async (pinData: CreatePinData) => {
    try {
        //Aktuellen Benutzer holen, Fehler wenn nicht angemeldet
        const user = await account.get();
        // account.get() wirft bereits, wenn nicht eingeloggt.
        const userId = user.$id;

        //Upload Bild in Appwrite Storage
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageBucketId,
            ID.unique(),
            pinData.imageFile
        );
        // Erstellen einer URL für das hochgeladene Bild (Preview oder View)
        const imageUrl = storage.getFileView(
            appwriteConfig.storageBucketId,
            uploadedFile.$id
        );

        console.log("Image URL:", imageUrl);

        //Aufruf Gemini-API um Metadaten für das Bild zu erstellen

        const aiData = await generatePinMetadata(pinData.imageFile);

        console.log("AI-Daten:", aiData);

        //Validierung hinzufügen: if (!pinData.imageFile) throw new Error("Es muss ein Bild hochgeladen werden!"); etc

        // Vorbereiten des Dokument-Objekts für die Datenbank (pinCollection) - Kann gelöscht werden
        const documentData = {
            title: aiData.title,
            description: aiData.description,
            tags: aiData.tags,
            imageUrl: imageUrl,
            createdBy: user.$id,
        };

        // Erstellen des Dokuments in der Datenbank (pinCollection)
        const newDocument = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.pinCollectionId,
            ID.unique(),
            {
                title: documentData.title,
                imageUrl: documentData.imageUrl,
                description: documentData.description,
                tags: documentData.tags,
                createdBy: documentData.createdBy,
                $createdAt: new Date().toISOString(),
            }
        );



        return newDocument;
    } catch(e) {
        console.error('Fehler beim Erstellen des Pins in der Service-Funktion:', e);
        // Wirf den Fehler weiter, damit die Komponente ihn fangen und anzeigen kann
        const message = e instanceof Error ? e.message : 'Unbekannter Fehler';
        throw new Error('Pin konnte nicht erstellt werden. ' + message);
    }
}

export const loginWithGoogle = async () => {

    try {
        account.createOAuth2Session({
            provider: OAuthProvider.Google,
            success: `${window.location.origin}/dashboard`, // redirect here on success
            failure: `${window.location.origin}/sign-in`, // redirect here on failure
        });
    } catch (e) {
        console.log("Error login with Google OAuth2: ", e);
    }

}

// Holt über den providerAccessToken den User-Avatar von Google
export const getGooglePicture = async (accessToken: string) => {
    try {
        const response = await fetch(
            "https://people.googleapis.com/v1/people/me?personFields=photos",
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (!response.ok) throw new Error("Failed to fetch Google profile picture");

        const { photos } = await response.json();
        return photos?.[0]?.url || null;
    } catch (error) {
        console.error("Error fetching Google picture:", error);
        return null;
    }
}

//User in Database speichern die mit OAuth2 angelegt wurde
export const storeUserInDatabase = async () => {

    try {
        //Users: $id, name!, email!, password!, avatar, $createdAt, $updatedAt

        const user = await account.get();
        if(!user) return redirect("/sign-in");

        //Holt den User-Avatar von Google
        const { providerAccessToken } = (await account.getSession("current")) || {};
        const profilePicture = providerAccessToken
            ? await getGooglePicture(providerAccessToken)
            : null;
        const createdUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: user.$id,
                name: user.name,
                email: user.email,
                password: "",
                avatar: profilePicture,
                $createdAt: new Date().toISOString(),
            }
        )

        if(!createdUser) return redirect("/sign-in");

    } catch (e) {
        console.log("Error storing user in database: ", e);
        return redirect("/sign-in");
    }


}

