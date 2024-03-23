import { useContext, useEffect, useState } from "react";
import Article from "./Article/Article";
import { TwiteeContext } from "../../store/TwiteeContext";
import Button from "../Button/Button";

export default function ArticlesDisplay() {
  //Context
  const {
    articles,
    getThirtyArticlesWhithOffset,
    setArticleOffset,
    user,
    articleOffset,
  } = useContext(TwiteeContext);

  //STATE
  const [articlesOffsetLocal, setArticlesOffsetLocal] = useState(articleOffset);

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

  const displayMoreArticles = () => {
    //Mettre local offset + 30
    // Mettre context offset à +30
    const newOffset = articlesOffsetLocal + 30;
    setArticlesOffsetLocal(newOffset);
    setArticleOffset(newOffset);
    getThirtyArticlesWhithOffset(articlesOffsetLocal);
  };

  //CYCLES
  useEffect(() => {
    getThirtyArticlesWhithOffset();
  }, []);

  return (
    <div className="flex flex-col justify-start items-center mt-8 gap-5 ">
      {prepareArticlesToDisplay()}
      <Button
        value="Plus de Twitee"
        h="50px"
        className="bg-blueLogo hover:bg-blueLogoDark my-2 w-full"
        fn={() => displayMoreArticles()}
      />
    </div>
  );
}
