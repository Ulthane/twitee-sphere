import ArticlesDisplay from "../components/Articles/ArticlesDisplay";
import { useContext, useEffect, useState } from "react";
import { TwiteeContext } from "../store/TwiteeContext";
import { getFetch } from "../utils/Fetch";
import { useToken } from "../hooks/useToken";
import Button from "../components/Button/Button";
import AlerteModal from "../components/modales/AlertModal";

export default function FriendsFeed({ friendFeed = true }) {
  //Context
  const {
    setArticleOffset,
    user: userInformations,
    articleOffset,
  } = useContext(TwiteeContext);

  //State
  const [articles, setArticles] = useState([]);
  const [refreshComponent, setRefreshComponent] = useState(0);
  const [offset, setOffset] = useState(0);
  const [user, setUser] = useState(
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
    // console.log("userInformations", userInformations);
    if (userInformations.id_user) {
      setUser(userInformations);
    }

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

    console.log("response", response);

    if (response.message) {
      toast.error(response.message);
    } else {
      const articlesAlreadyDisplay = [...articles];
      const getedArticles = () =>
        offset === 0 ? [...response] : [...articlesAlreadyDisplay, ...response];

      setArticles(getedArticles);
    }
  };

  //Cycle
  useEffect(() => {
    getArticles(offset);
    console.log("refreshComponent", refreshComponent);
  }, [refreshComponent]);

  //JSX
  return (
    <>
      <h1 className="text-2xl">Feeds</h1>
      <ArticlesDisplay friendFeed={friendFeed} articlesToDisplay={articles} />
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
