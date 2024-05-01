import { createContext, useReducer } from "react";
import { toast } from "react-toastify";

//Variables
const token = sessionStorage.getItem("token");

const actionTypes = {
  SET_USER: "SET_USER",
  SET_ARTICLES: "SET_ARTICLES",
  SET_ARTICLE_OFFSET: "SET_ARTICLE_OFFSET",
  SET_COMMUNITY: "SET_COMMUNITY",
  SET_REFRESH_HOME_FROM_CONTEXT: "SET_REFRESH_HOME_FROM_CONTEXT",
  // Community ACTIONS
};

export const TwiteeContext = createContext({
  articles: [],
  user: {},
  articleOffset: 0,
  community: [],
  refreshHomeFromContext: 0,
  // Community
  setCommunity: () => {},
  setArticles: () => {},
  setUser: () => {},
  setArticleOffset: () => {},
  getThirtyArticlesWhithOffset: () => {},
  setRefreshHomeFromContext: () => {},
});

function twiteeReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_ARTICLES:
      const newDataForArticles = {
        ...state,
        articles: action.payload,
      };

      return newDataForArticles;

    case actionTypes.SET_USER:
      const newDataForUser = {
        ...state,
        user: action.payload.userInformations,
      };

      // console.log("newDataForUser", newDataForUser);

      return newDataForUser;

    case actionTypes.SET_ARTICLE_OFFSET:
      const newDataForArticleOffset = {
        ...state,
        articleOffset: action.payload.newOffset,
      };

      // console.log("newDataForArticleOffset");
      // console.log(newDataForArticleOffset);

      return newDataForArticleOffset;

    case actionTypes.SET_COMMUNITY:
      const newCommunity = {
        ...state,
        community: action.payload.newCommunity,
      };
      return newCommunity;

    case actionTypes.SET_REFRESH_HOME_FROM_CONTEXT:
      const oldRefreshHomeFromContext = state.refreshHomeFromContext;
      const newsRefreshHomeFromContext = {
        ...state,
        refreshHomeFromContext: oldRefreshHomeFromContext + 1,
      };

      console.log(
        "newsRefreshHomeFromContext",
        newsRefreshHomeFromContext.refreshHomeFromContext
      );

      return newsRefreshHomeFromContext;
  }
  // Community CASE setCommunity
}

export default function TwiteeProvider({ children }) {
  const [state, dispatch] = useReducer(twiteeReducer, {
    articles: [],
    user: { friends: [] },
    articleOffset: 0,
    community: [],
    refreshHomeFromContext: 0,
    // Community
  });

  //VARIABLES
  const contextValue = {
    articles: state.articles,
    user: state.user,
    articleOffset: state.articleOffset,
    refreshHomeFromContext: state.refreshHomeFromContext,
    setArticles: (articles) => {
      dispatch({ type: actionTypes.SET_ARTICLES, payload: { articles } });
    },
    setUser: (userInformations) => {
      dispatch({ type: actionTypes.SET_USER, payload: { userInformations } });
    },
    setArticleOffset: (newOffset) => {
      dispatch({
        type: actionTypes.SET_ARTICLE_OFFSET,
        payload: { newOffset },
      });
    },
    setRefreshHomeFromContext: () => {
      dispatch({
        type: actionTypes.SET_REFRESH_HOME_FROM_CONTEXT,
      });
    },
    getThirtyArticlesWhithOffset: async (
      offset = state.articleOffset,
      friendFeed
    ) => {
      const currentArticles = [...state.articles];

      //Request initialisazion
      let request;

      if (friendFeed) {
        const friends_id = state.user.friends.map((friend) => friend.id_user);
        console.log("friends_id", friends_id);

        request = await fetch(
          `https://twitee-api.gamosaurus.fr/api/articles/get/multiple?limit=30&offset=${offset}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify(friends_id),
          }
        );
      } else {
        request = await fetch(
          `https://twitee-api.gamosaurus.fr/api/articles/get?limit=30&offset=${offset}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
      }

      if (request.status !== 200) {
        toast.error(json.message);
      } else {
        const response = await request.json();
        const newArticles = [...response];

        // console.log("request", request);

        let allArticles = [];

        // Remplace les articles ou les concataines
        if (currentArticles[0] !== undefined && newArticles[0] !== undefined) {
          if (
            currentArticles[0]["id_articles"] !== newArticles[0]["id_articles"]
          ) {
            allArticles = [...currentArticles, ...response];
            // console.log("allArticles 2");
            // console.log(allArticles);
          }
        } else {
          allArticles = [...response];
          // console.log("allArticles");
          // console.log(allArticles);
        }

        dispatch({
          type: actionTypes.SET_ARTICLES,
          payload: friendFeed ? allArticles.reverse() : allArticles,
        });
      }
    },
    setCommunity: (newCommunity) => {
      dispatch({
        type: actionTypes.SET_COMMUNITY,
        payload: { newCommunity },
      });
    },
    // Community setCommunity
  };

  //JSX
  return (
    <TwiteeContext.Provider value={contextValue}>
      {children}
    </TwiteeContext.Provider>
  );
}
