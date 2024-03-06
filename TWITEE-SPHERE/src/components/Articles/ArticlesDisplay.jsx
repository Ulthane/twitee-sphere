import { useContext, useEffect, useState } from "react";
import Article from "./Article/Article";
import { toast } from "react-toastify";
import { TwiteeContext } from "../../store/TwiteeContext";

export default function ArticlesDisplay() {
  //Context
  const { articles, getThirtyArticlesWhithOffset } = useContext(TwiteeContext);
  const { user } = useContext(TwiteeContext);

  //Pour les TEST
  // const context = useContext(TwiteeContext);
  // console.log("CONTEXT");
  // console.log(context);

  //STATE
  const [articlesOffset, setArticlesOffset] = useState(0);
  const [articlesToDisplay, setArticlesToDisplay] = useState();

  //Methode
  const prepareArticlesToDisplay = () => {
    const articlesToDisplay = [...articles].reverse();
    return articlesToDisplay.map((article, index) => (
      <Article
        key={index}
        articleInformations={article}
        communityId={(user.id_communities = 2)}
      />
    ));
  };

  //CYCLES
  useEffect(() => {
    setArticlesToDisplay(prepareArticlesToDisplay());
  }, [articles]);

  useEffect(() => {
    getThirtyArticlesWhithOffset();
  }, []);

  return (
    <div className="flex flex-col justify-start items-center mt-8 gap-5 ">
      {articlesToDisplay}
    </div>
  );
}
