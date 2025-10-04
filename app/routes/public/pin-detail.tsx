import { useLoaderData } from "react-router";
import { pins } from "~/constants";

// Loader: sucht in den Dummy-Daten den Pin mit passender ID
export async function loader({ params }: { params: { id: string } }) {
    const pin = pins.find((p) => String(p.$id) === params.id);

    if (!pin) {
        throw new Response("Not Found", { status: 404 });
    }

    return pin;
}

// Komponente
export default function PinDetail() {
    const pin = useLoaderData() as (typeof pins)[0];

    return (
        <div className="flex flex-col md:flex-row p-8 gap-8">
            {/* Bild links */}
            <div className="flex-1">
                <img
                    src={pin.imageUrl}
                    alt={pin.title}
                    className="rounded-xl shadow w-full"
                />
            </div>

            {/* Infos rechts */}
            <div className="md:w-1/3 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">{pin.title}</h1>
                <p className="text-gray-700">{pin.description}</p>

                {pin.tags && (
                    <div className="flex flex-wrap gap-2">
                        {pin.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-gray-200 rounded-full"
                            >
                #{tag}
              </span>
                        ))}
                    </div>
                )}

                <div className="mt-auto">
                    <p className="text-sm text-gray-500">von {pin.userName}</p>
                </div>
            </div>
        </div>
    );
}
