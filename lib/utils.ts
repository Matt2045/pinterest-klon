// src/utils/searchUtils.js


type Pin = {
    $id: string;
    title: string;
    description: string;
    imageUrl: string;
    tags?: string[]; // Array von Strings, optional
    userName: string;
};

/**
 * Filtert eine Liste von Pins basierend auf einem komplexen Suchbegriff.
 * @param {Array<Pin>} pins - Die vollständige Liste der Pin-Objekte.
 * @param {string} searchTerm - Der vom Benutzer eingegebene Suchbegriff.
 * @returns {Array<Pin>} Die gefilterte Liste der Pins.
 */
export function filterPins(pins: Pin, searchTerm: string) {
// HIER WAR DER FEHLER: Entfernen Sie die doppelten Klammern um pins und searchTerm
// Korrekt: function filterPins(pins, searchTerm)
    if (!searchTerm || !pins) {
        return pins || [];
    }

    // Die Suchlogik bleibt unverändert
    const filteredPins = pins.filter((pin) => {
        // z. B. ["@user1", "statuen", "aus", "der", "Antike"]
        const terms = searchTerm.split(" ").filter(Boolean);

        return terms.every((term) => {
            if (term.startsWith("@")) {
                // User-Suche
                const userQuery = term.slice(1).toLowerCase();
                return pin.userName.toLowerCase().includes(userQuery);
            } else if (term.startsWith("#")) {
                // Tag-Suche
                const tagQuery = term.slice(1).toLowerCase();
                // Nutzen Sie optional Chaining (?) falls tags fehlen könnte
                return pin.tags?.some((tag) => tag.toLowerCase().includes(tagQuery));
            } else {
                // Normale Textsuche (Titel + Description)
                const textQuery = term.toLowerCase();
                return (
                    pin.title.toLowerCase().includes(textQuery) ||
                    pin.description.toLowerCase().includes(textQuery)
                );
            }
        });
    });

    return filteredPins;
}