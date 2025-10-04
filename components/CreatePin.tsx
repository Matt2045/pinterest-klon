
import React, { useState } from 'react';
import {uploadImage} from "../appwrite/auth";



const CreatePin = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    //Logik des Formulars mit Funktionsaufruf des Hochladens und Erstellen eines Pins
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Die clientseitige Validierung bleibt hier
        if (!imageFile || !title || !tags) {
            console.log(e, 'Bitte fülle alle Pflichtfelder aus (Titel, Bild, Tags).');
            setError('Bitte fülle alle Pflichtfelder aus (Titel, Bild, Tags).');
            return;
        }
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // HIER IST DIE ÄNDERUNG:
            // Wir rufen die ausgelagerte Funktion auf und übergeben
            // ihr ein Objekt mit allen notwendigen Daten aus dem State.
            const created = await uploadImage({
                title,
                description,
                tags,
                imageFile,
            });

            // Wenn createPin erfolgreich war (also keinen Fehler geworfen hat):
            console.log('Dein Pin wurde erfolgreich erstellt!', created);
            setSuccess('Dein Pin wurde erfolgreich erstellt!');
            // Formular zurücksetzen
            setTitle('');
            setDescription('');
            setTags('');
            setImageFile(null);
            e.currentTarget.reset();

        } catch (e) {
            // Wenn createPin einen Fehler wirft, fangen wir ihn hier
            console.log(e, 'Fehler beim Erstellen des Pins:');
            const msg = e instanceof Error ? e.message : 'Fehler beim Erstellen des Pins.';
            setError(msg);
        } finally {
            // Dieser Block wird immer ausgeführt
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Neuen Pin erstellen</h2>
            <form onSubmit={handleSubmit}>
                {/* Titel */}
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="title">Titel*</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Titel für deinen Pin"
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        required
                    />
                </div>

                {/* Beschreibung */}
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="description">Beschreibung</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Beschreibe deinen Pin..."
                        rows={4}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>

                {/* Tags */}
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="tags">Tags* (Komma-getrennt)</label>
                    <input
                        id="tags"
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="z.B. Natur, Reisen, Sommer"
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        required
                    />
                </div>

                {/* Bild-Upload */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="image">Bild hochladen*</label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
                        style={{ width: '100%' }}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '10px', background: isLoading ? '#ccc' : '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {isLoading ? 'Wird hochgeladen...' : 'Pin erstellen'}
                </button>
            </form>

            {/* Statusmeldungen */}
            {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
            {success && <p style={{ color: 'green', marginTop: '1rem' }}>{success}</p>}
        </div>
    );
}

export default CreatePin;