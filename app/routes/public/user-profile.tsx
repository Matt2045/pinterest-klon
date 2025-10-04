import { useEffect, useState } from "react";
import {redirect, useParams} from "react-router";
import {account} from "../../../appwrite/client";

//To Do:
// Get User - Get Users Pins
// Implementation Masonry
export async function loader() {

}

import {pins} from "~/constants";
import CreatePin from "../../../components/CreatePin";

// Standard-Export der Komponente, damit die Route korrekt rendert
export default function UserProfile() {
    const {id: userId} = useParams();

    return (

        <div>
            <div>
                <CreatePin />
            </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8">
            {pins?.map(pin => (
                <div key={pin.$id} className="rounded overflow-hidden shadow">
                    <img src={pin.imageUrl} alt={pin.title} />
                    <div className="p-2">
                        <h3 className="text-lg font-bold">{pin.title}</h3>
                        <p className="text-sm text-gray-500">von {pin.userName}</p>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
}