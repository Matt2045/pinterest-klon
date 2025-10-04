import CreatePin from "../../../components/CreatePin";
import {useOutletContext} from "react-router";

export async function loader() {

}

type userContext = {
    user?: {
        $id: string;
        name: string;
        email: string;
        imageUrl?: string;
        accountId?: string;
    }
}


export default function SharePin(){
    const { user } = useOutletContext<userContext>()
    console.log("User in Share Pin", user);

    return (
        <div>
           <CreatePin />
        </div>
    );
};
