import ArticlesDisplay from "../components/Articles/ArticlesDisplay";
import { useContext, useEffect, useState } from "react";
import { TwiteeContext } from "../store/TwiteeContext";
import { useToken } from "../hooks/useToken";
import Button from "../components/Button/Button";
import AlerteModal from "../components/modales/AlertModal";
import { getFetch } from "../utils/Fetch";
import { toast } from "react-toastify";

export default function Home() {
    //Context
    const { refreshHomeFromContext } = useContext(TwiteeContext);

    //State
    const [articles, setArticles] = useState([]);
    const [refreshComponent, setRefreshComponent] = useState(0);
    const [offset, setOffset] = useState(0);
    const [alertModalDisplay, setAlertModalDisplay] = useState(false);
    const [articlesCount, setArticlesCount] = useState();
    const [onClickMoreArticle, setOnClickMoreArticle] = useState(false);

    //Variable
    const token = useToken();

    //Méthode

    const alertModaleDisplayHandler = (value) => setAlertModalDisplay(value);

    const setRefreshHomeHandler = () => {
        const newRefresh = refreshComponent + 1;

        // getArticles();
        setRefreshComponent(newRefresh);
    };

    const displayMoreArticles = () => {
        if (articlesCount > articles.length) {
            const newOffset = offset + 30;
            setOnClickMoreArticle(true);
            setOffset(newOffset);
            setRefreshHomeHandler();
            // getArticles(offset);
        } else {
            alertModaleDisplayHandler(true);
        }
    };

    const getArticles = async (offset = 0) => {
        if (!onClickMoreArticle) {
            offset = 0;
        }

        const request = await fetch(
            `https://twitee-api.gamosaurus.fr/api/articles/get?limit=30&offset=${offset}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token.getToken(),
                },
            }
        );

        const response = await request.json();

        if (response.message) {
            toast.error(response.message);
        } else {
            const articlesAlreadyDisplay = [...articles];
            let getedArticles;

            if (!onClickMoreArticle) {
                getedArticles = [...response];
            } else if (onClickMoreArticle) {
                getedArticles =
                    offset === 0
                        ? [...response]
                        : [...articlesAlreadyDisplay, ...response];
            }

            // console.log("getArticles", getedArticles);
            setArticles(getedArticles);
        }

        setOnClickMoreArticle(false);
    };

    const getArticlesCount = async () => {
        const request = await getFetch(
            `https://twitee-api.gamosaurus.fr/api/articles/count/all`,
            {
                Authorization: token.getToken(),
            }
        );

        setArticlesCount(request.total);
    };

    //Cycle
    useEffect(() => {
        getArticles(offset);
        getArticlesCount();
        // console.log("refreshHomeFromContext", refreshHomeFromContext);
    }, [refreshComponent, refreshHomeFromContext]);

    //JSX
    return (
        <>
            <ArticlesDisplay
                setRefreshHomeHandler={setRefreshHomeHandler}
                articlesToDisplay={articles}
            />
            <div className="flex justify-center mt-5">
                <Button
                    value="Plus de Twitee"
                    h="50px"
                    w="600px"
                    className="bg-blueLogo hover:bg-blueLogoDark my-4"
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
