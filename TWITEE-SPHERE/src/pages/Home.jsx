import ArticlesDisplay from "../components/Articles/ArticlesDisplay";
import { useContext, useEffect, useState } from "react";
import { TwiteeContext } from "../store/TwiteeContext";
import { useToken } from "../hooks/useToken";
import Button from "../components/Button/Button";
import AlerteModal from "../components/modales/AlertModal";
import { getFetch } from "../utils/Fetch";

export default function Home({ friendFeed }) {
  //Context
  const { refreshHomeFromContext } = useContext(TwiteeContext);

  //State
  const [articles, setArticles] = useState([]);
  const [refreshComponent, setRefreshComponent] = useState(0);
  const [offset, setOffset] = useState(0);
  const [alertModalDisplay, setAlertModalDisplay] = useState(false);
  const [articlesCount, setArticlesCount] = useState();

  //Variable
  const token = useToken();

  //Méthode

  const alertModaleDisplayHandler = (value) => setAlertModalDisplay(value);

  const setRefreshHomeHandler = () => {
    const newRefresh = refreshComponent + 1;
    console.log("newRefresh");
    getArticles();
    setRefreshComponent(newRefresh);
  };

  const displayMoreArticles = () => {
    if (articlesCount > articles.length) {
      const newOffset = offset + 30;
      setOffset(newOffset);

      getArticles(offset);
      setRefreshHomeHandler();
    } else {
      alertModaleDisplayHandler(true);
    }
  };

  const getArticles = async (offset = 0) => {
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
      const getedArticles = () =>
        offset === 0 ? [...response] : [...articlesAlreadyDisplay, ...response];

      setArticles(getedArticles);
    }
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
  }, [refreshComponent, refreshHomeFromContext]);

  // useEffect(() => {
  //   console.log("refreshHomeFromContext HOME:", refreshHomeFromContext);
  // }, [refreshHomeFromContext]);

  // console.log("Articles", articles);

  //JSX
  return (
    <>
      <ArticlesDisplay
        setRefreshHomeHandler={setRefreshHomeHandler}
        articlesToDisplay={articles}
      />
      <Button
        value="Plus de Twitee"
        h="50px"
        className="bg-blueLogo hover:bg-blueLogoDark my-4 w-full "
        fn={() => displayMoreArticles()}
      />

      {alertModalDisplay && (
        <AlerteModal
          displayModaleHandler={alertModaleDisplayHandler}
          alertMessage={"Il n'y a plus de Twitee à charger"}
        />
      )}
    </>
  );
}
