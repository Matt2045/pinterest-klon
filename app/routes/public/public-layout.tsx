import {Outlet, redirect, useLoaderData} from "react-router";
import {account} from "../../../appwrite/client";
import {getExistingUser, storeUserInDatabase} from "../../../appwrite/auth";
import SearchBar from "../../../components/SearchBar";
import {useState} from "react";

// Auf Routes Context nutzen - auf Komponenten dann Props nutzen

type UserProp = {
    user?: {
        name: string;
        email: string;
        $id: string;
    }
}

export async function clientLoader() {
    try {
        const user = await account.get();


        if(!user.$id) return redirect("/sign-in");

        const existingUser = await getExistingUser(user.$id);
        console.log("User in Feed Layout", existingUser);

        if (existingUser?.status === "user") {
            // User haben keinen Zugriff auf Feed
            //return redirect("/sign-in");
        }


        return existingUser?.$id ? existingUser : await storeUserInDatabase();

    } catch (e) {
        console.log("Error loading dashboard: ", e);
        return redirect("/sign-in");
    }
}


export default function PublicLayout() {
    const user = useLoaderData();
    const [searchTerm, setSearchTerm] = useState("");


    return (
        <div className="admin-layout">

            <div>Public Layout</div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user}/>
                <div>
                    {user?.name}
                </div>
            <Outlet context={{user, searchTerm, setSearchTerm}} />


        </div>
    );
};
