import { useContext, useEffect, useState } from "react";
import Article from "./Article/Article";
import { TwiteeContext } from "../../store/TwiteeContext";
import Button from "../Button/Button";
import AlerteModal from "../modales/AlertModal";

export default function ArticlesDisplay() {
  //Context
  const {
    articles,
    getThirtyArticlesWhithOffset,
    setArticleOffset,
    user,
    articleOffset,
  } = useContext(TwiteeContext);

  //STATES
  const [articlesOffsetLocal, setArticlesOffsetLocal] = useState(articleOffset);
  const [alertModalDisplay, setAlertModalDisplay] = useState(false);

  //Variables
  const offsetStep = 30;

  //Methodes
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

  const alertModaleDisplayHandler = (value) => {
    setAlertModalDisplay(value);
  };

  const displayMoreArticles = () => {
    if ([...articles].length % offsetStep === 0) {
      const newOffset = articlesOffsetLocal + offsetStep;

      setArticlesOffsetLocal(newOffset);
      setArticleOffset(newOffset);
      getThirtyArticlesWhithOffset(newOffset);
    } else {
      alertModaleDisplayHandler(true);
    }
  };

  //CYCLES
  useEffect(() => {
    getThirtyArticlesWhithOffset();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-start items-center mt-8 gap-5 ">
        {prepareArticlesToDisplay()}
        <Button
          value="Plus de Twitee"
          h="50px"
          className="bg-blueLogo hover:bg-blueLogoDark my-2 w-full"
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
