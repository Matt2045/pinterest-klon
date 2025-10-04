import React, { useEffect, useRef, useState } from "react";
//import Masonry from "masonry-layout";

//import imagesLoaded from "imagesloaded";
import { useInView } from "react-intersection-observer";
import {PinCard} from "../components";
import {PinModal} from "../components"

import { pins } from "~/constants";
import SearchBar from "./SearchBar";
import {useOutletContext} from "react-router";

type userProps = {
    user?: {
        $id: string;
        name: string;
        email: string;
        imageUrl?: string;
    }
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}




const MasonryFeed = ({searchTerm, setSearchTerm, user}: userProps) => {

    const filteredPins = pins.filter((pin) => {
        const terms = searchTerm.split(" ").filter(Boolean); // z. B. ["@user1", "statuen", "aus", "der", "Antike"]

        return terms.every((term) => {
            if (term.startsWith("@")) {
                // User-Suche
                const userQuery = term.slice(1).toLowerCase(); // "@user1" -> "user1"
                return pin.userName.toLowerCase().includes(userQuery);
            } else if (term.startsWith("#")) {
                // Tag-Suche
                const tagQuery = term.slice(1).toLowerCase(); // "#kunst" -> "kunst"
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


    console.log("Search Term: ", searchTerm)
    return (
        <>

            <div className="p-4">
                Hallo User in Masonry {user?.name}

                <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
                    {filteredPins.map((pin) => (
                        <PinCard id={pin.$id} imageUrl={pin.imageUrl} title={pin.title} userName={pin.userName} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MasonryFeed;
