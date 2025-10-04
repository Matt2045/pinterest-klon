import {account} from "../../../appwrite/client";
import {Outlet, redirect} from "react-router";

// Arbeite an Logik der Layouts mit korrekter Weiterleitung je nachdem ob User vorhanden


export async function clientLoader() {
    try {
        const session = await account.getSession({
                sessionId: "current"
             }
        );
        console.log(session);
        if (!session) {
            console.log("No session found");
            return;
        }

        const user = await account.get();

        // Implementieren für das Weiterleiten zu Admin-Layout
        //if(user.role === "admin") return redirect("/dashboard-DUMMY");

        console.log("User in Auth Layout", user);
        if(user.$id) return redirect("/feed");

    } catch (e) {
        console.log("Error loading sign-in page: ", e);
    }
}

export const authLayout = () => {




    return (
        <main className="auth-layout flex items-center justify-center min-h-screen">
            <div>Auth</div>
            <Outlet />
        </main>
    );
};
