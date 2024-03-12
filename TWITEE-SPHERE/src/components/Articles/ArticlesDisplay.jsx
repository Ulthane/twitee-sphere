import { useContext, useEffect, useState } from "react";
import Article from "./Article/Article";
import { TwiteeContext } from "../../store/TwiteeContext";

export default function ArticlesDisplay() {
  //Context
  const { articles, getThirtyArticlesWhithOffset } = useContext(TwiteeContext);
  const { user } = useContext(TwiteeContext);

  //STATE
  const [articlesOffset, setArticlesOffset] = useState(0);

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

  // //CYCLES
  // useEffect(() => {
  //   setArticlesToDisplay(prepareArticlesToDisplay());
  // }, [articles]);

  useEffect(() => {
    getThirtyArticlesWhithOffset();
  }, []);

  return (
    <div className="flex flex-col justify-start items-center mt-8 gap-5 ">
      {prepareArticlesToDisplay()}
    </div>
  );
}
