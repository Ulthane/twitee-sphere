import ArticlesDisplay from "../components/Articles/ArticlesDisplay";
import { useEffect, useState } from "react";
import { useToken } from "../hooks/useToken";
import Button from "../components/Button/Button";
import AlerteModal from "../components/modales/AlertModal";
import { toast } from "react-toastify";

export default function FriendsFeed({ friendFeed = true }) {
    //State
    const [articles, setArticles] = useState([]);
    const [refreshComponent, setRefreshComponent] = useState(0);
    const [offset, setOffset] = useState(0);
    const [user] = useState(
        JSON.parse(sessionStorage.getItem("user_informations"))
    );
    const [alertModalDisplay, setAlertModalDisplay] = useState(false);

    //Variable
    const token = useToken();

    //Méthode

    const alertModaleDisplayHandler = (value) => setAlertModalDisplay(value);

    const displayMoreArticles = () => {
        if (articles.length % 30 == 0) {
            const newOffset = offset + 30;
            setOffset(newOffset);

            getArticles(newOffset);
            setRefreshComponent(refreshComponent + 1);
        } else {
            alertModaleDisplayHandler(true);
        }
    };

    const getArticles = async (offset) => {
        const friends_id = user.friends.map((friend) => friend.id_user);

        const request = await fetch(
            `https://twitee-api.gamosaurus.fr/api/articles/get/multiple?limit=30&offset=${offset}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token.getToken(),
                },
                body: JSON.stringify(friends_id),
            }
        );

        const response = await request.json();

        if (response.message) {
            toast.error(response.message);
        } else {
            const articlesAlreadyDisplay = [...articles];

            const getedArticles = () =>
                offset === 0
                    ? [...response]
                    : [...articlesAlreadyDisplay, ...response];
            setArticles(getedArticles());
        }
    };

    //Cycle
    useEffect(() => {
        getArticles(offset);
    }, [refreshComponent]);

    //JSX
    return (
        <>
            <ArticlesDisplay
                friendFeed={friendFeed}
                articlesToDisplay={articles}
            />
            <div className="flex justify-center mt-5">
                <Button
                    value="Plus de Twitee"
                    h="50px"
                    w="600px"
                    className="bg-blueLogo hover:bg-blueLogoDark my-4 w-full "
                    fn={() => displayMoreArticles()}
                />
            </div>

            {alertModalDisplay && (
                <AlerteModal
                    displayModaleHandler={alertModaleDisplayHandler}
                    alertMessage={"Il n'y a plus de Twitee à charger"}
                />
            )}
        </>
    );
}
