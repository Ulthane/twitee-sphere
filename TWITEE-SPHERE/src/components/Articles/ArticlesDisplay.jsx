import { useContext, useEffect, useState } from "react";
import Article from "./Article/Article";
import { toast } from "react-toastify";
import { TwiteeContext } from "../../store/TwiteeContext";

export default function ArticlesDisplay() {
  //Context
  const { setArticles, data } = useContext(TwiteeContext);

  //STATE
  const [articlesOffset, setArticlesOffset] = useState(0);
  const [articlesToDisplay, setArticlesToDisplay] = useState();

  //Variables
  const token = sessionStorage.getItem("token");

  const getThirtyArticlesWhithOffset = async () => {
    const response = await fetch(
      `https://twitee-api.gamosaurus.fr/api/articles/get?limit=30&offset=${articlesOffset}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (response.status !== 200) {
      toast.error(json.message);
    } else {
      let data = await response.json();
      //   console.log(twitee.current.value);

      let newData = [...data];
      setArticles(newData);
    }
  };

  //Methode
  const prepareArticlesToDisplay = () => {
    const articlesToDisplay = [...data.articles].reverse();

    return articlesToDisplay.map((article, index) => (
      <Article key={index} articleInformations={article} />
    ));
  };

  //CYCLE
  useEffect(() => {
    getThirtyArticlesWhithOffset();
  }, []);

  useEffect(() => {
    // Essais pour actualiser le feed des Twitees lorsqu'un message est posté mais ne marche pas
    // getThirtyArticlesWhithOffset();
    setArticlesToDisplay(prepareArticlesToDisplay());
  }, [data.articles]);

  console.log("data in displayArticles:");
  console.log(data);

  return (
    <div className="flex flex-col justify-start items-center mt-8 gap-5 ">
      {articlesToDisplay}
    </div>
  );
}
