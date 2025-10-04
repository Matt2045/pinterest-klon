import React from 'react'
import {account} from "../../../appwrite/client";
import {Outlet, redirect, useOutletContext} from "react-router";
import {getExistingUser, storeUserInDatabase} from "../../../appwrite/auth";
import CreatePin from "../../../components/CreatePin";
import {MasonryFeed} from "../../../components";

type userContext = {
    user?: {
        $id: string;
        name: string;
        email: string;
        imageUrl?: string;
    }
}

type searchTermContext = {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}


export default function Feed(){
    const { user } = useOutletContext<userContext>()
    const { searchTerm, setSearchTerm } = useOutletContext<searchTermContext>()


    return (
        <>
            <h1>Feed</h1>
            <div>
                Hallo {user?.name}
            </div>
            <MasonryFeed user={user} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </>
    )
}

