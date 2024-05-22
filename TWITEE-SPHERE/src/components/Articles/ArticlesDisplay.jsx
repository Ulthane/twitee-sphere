import { useContext, useEffect, useState } from "react";
import Article from "./Article/Article";
import { TwiteeContext } from "../../store/TwiteeContext";

export default function ArticlesDisplay({
    articlesToDisplay,
    setRefreshHomeHandler,
}) {
    //Context
    const { user } = useContext(TwiteeContext);
    // const [articlesToDisplay, setArticlesToDisplay] = useState(articles);

    //Méthodes
    const prepareArticlesToDisplay = articlesToDisplay.map((article, index) => {
        let isFriend = false;

        user.friends.forEach((friend) => {
            if (friend.id_user === article.user.id_user) {
                isFriend = true;
            }
        });

        return (
            <Article
                key={"articles_" + index}
                articleInformations={article}
                communityId={(user.id_communities = 2)}
                connectedUserId={user.id_user}
                friend={isFriend}
                setRefreshHomeHandler={setRefreshHomeHandler}
            />
        );
    });

    // useEffect(() => {
    //     console.log("articles", articles);
    //     setArticlesToDisplay(articles);
    //     console.log("articlesToDisplay", articlesToDisplay);
    // }, [articles]);

    return (
        <div className="flex flex-col justify-start items-center mt-8 gap-5 relative">
            {/* {console.log("articlesToDisplay", articlesToDisplay)} */}
            {prepareArticlesToDisplay}
        </div>
    );
}
