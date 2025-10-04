import React from "react";

type SearchBarProps = {
    user?: {
        $id: string;
        name: string;
        email: string;
        imageUrl?: string;
    }
    searchTerm: string;
    setSearchTerm: (value: string) => void;
};


export default function SearchBar({searchTerm, setSearchTerm, user}: SearchBarProps) {
    const tokens = searchTerm.split(" ").filter(Boolean);

    return (
        <header className="flex items-center justify-between px-6 py-4 shadow">
            {/* Logo oder Home-Button */}
            <div className="text-xl font-bold text-red-600">Pinterest</div>

            {/* Suchfeld */}
            <div className="flex-1 mx-6">
                <input
                    type="text"
                    placeholder="Whats on your mind?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                />

            </div>

            {/* User-Avatar */}
            {user && (
                <div className="flex items-center gap-2">
                    <img
                        src={user.imageUrl}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border border-gray-300"
                    />
                </div>
            )}
        </header>
    );
}
