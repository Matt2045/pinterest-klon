import { Link } from "react-router";

type PinCardProps = {
    imageUrl: string;
    title: string;
    userName: string;
    id: string,
};

export default function PinCard({ imageUrl, title, userName, id }: PinCardProps) {
    return (
        <Link to={`/pin/${id}`} className="block">
        <div className="relative rounded-xl overflow-hidden shadow hover:shadow-lg transition">
            {/* Bild */}
            <img
                src={imageUrl}
                alt={title}
                className="w-full object-cover"
            />

            {/* Overlay (Titel + Button "Merken") */}
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex flex-col justify-between">
                {/* Header */}
                <div className="flex justify-between p-2">
                    <span className="text-white text-sm font-medium">{title}</span>
                    <button className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-lg hover:bg-red-700">
                        Merken
                    </button>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center p-2">
                    <button className="bg-white text-xs px-2 py-1 rounded shadow hover:bg-gray-200">
                        Webseite
                    </button>
                    <div className="flex gap-2">
                        <button className="bg-white p-1 rounded-full shadow hover:bg-gray-200">
                            ↗
                        </button>
                        <button className="bg-white p-1 rounded-full shadow hover:bg-gray-200">
                            …
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </Link>
    );
}
