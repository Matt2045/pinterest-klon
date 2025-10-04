import {useNavigate} from "react-router";
import {MasonryFeed} from "../../../components";

type SearchProps = {
    user?: {
        $id: string;
        name: string;
        email: string;
        imageUrl?: string;
    }
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

export const Search = () => {
    const navigate = useNavigate();


    return (
        <MasonryFeed />
    );
};
