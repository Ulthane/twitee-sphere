import { useContext, useState } from "react";
import Article from "./Article/Article";
import { TwiteeContext } from "../../store/TwiteeContext";

export default function ArticlesDisplay({
  articlesToDisplay,
  setRefreshHomeHandler,
}) {
  //Context
  const { user } = useContext(TwiteeContext);

  //Méthodes
  const prepareArticlesToDisplay = () => {
    return articlesToDisplay.map((article, index) => (
      <Article
        key={index}
        articleInformations={article}
        communityId={(user.id_communities = 2)}
        connectedUserId={user.id_user}
        setRefreshHomeHandler={setRefreshHomeHandler}
      />
    ));
  };

  return (
    <>
      <div className="flex flex-col justify-start items-center mt-8 gap-5 ">
        {prepareArticlesToDisplay()}
        {/* <Button
          value="Plus de Twitee"
          h="50px"
          className="bg-blueLogo hover:bg-blueLogoDark my-2 w-full"
          fn={() => displayMoreArticles()}
        /> */}
      </div>
      {/* {alertModalDisplay && (
        <AlerteModal
          displayModaleHandler={alertModaleDisplayHandler}
          alertMessage={"Il n'y a plus de Twitee à charger"}
        />
      )} */}
    </>
  );
}
