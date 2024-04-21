import { createContext, useReducer } from "react";
import { toast } from "react-toastify";

//Variables
const token = sessionStorage.getItem("token");

const actionTypes = {
  SET_USER: "SET_USER",
  SET_ARTICLES: "SET_ARTICLES",
  SET_ARTICLE_OFFSET: "SET_ARTICLE_OFFSET",
  SET_COMMUNITY: "SET_COMMUNITY",
  // Community ACTIONS
};

export const TwiteeContext = createContext({
  articles: [],
  user: {},
  articleOffset: 0,
  community: [],
  // Community
  setCommunity: () => {},
  setArticles: () => {},
  setUser: () => {},
  setArticleOffset: () => {},
  getThirtyArticlesWhithOffset: () => {},
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

      return newDataForUser;

    case actionTypes.SET_ARTICLE_OFFSET:
      const newDataForArticleOffset = {
        ...state,
        articleOffset: action.payload.newOffset,
      };

      console.log("newDataForArticleOffset");
      console.log(newDataForArticleOffset);

      return newDataForArticleOffset;

    case actionTypes.SET_COMMUNITY:
      const newCommunity = {
        ...state,
        community: action.payload.newCommunity,
      };

      return newCommunity;
  }
  // Community CASE setCommunity
}

export default function TwiteeProvider({ children }) {
  const [state, dispatch] = useReducer(twiteeReducer, {
    articles: [],
    user: {},
    articleOffset: 0,
    community: [],
    // Community
  });

  //VARIABLES
  const contextValue = {
    articles: state.articles,
    user: state.user,
    articleOffset: state.articleOffset,
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
    getThirtyArticlesWhithOffset: async (offset = state.articleOffset) => {
      const currentArticles = [...state.articles];

      // console.log("offset");
      // console.log(offset);

      const request = await fetch(
        `https://twitee-api.gamosaurus.fr/api/articles/get?limit=30&offset=${offset}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (request.status !== 200) {
        toast.error(json.message);
      } else {
        const response = await request.json();
        const newArticles = [...response];
        // console.log("newArticles");
        // console.log(newArticles);

        // console.log("currentArticles");
        // console.log(currentArticles);

        let allArticles = [];

        if (
          currentArticles[0] &&
          currentArticles[0]["id_articles"] !== newArticles[0]["id_articles"]
        ) {
          allArticles = [...currentArticles, ...response];
          // console.log("allArticles 2");
          // console.log(allArticles);
        } else {
          allArticles = [...response];
          // console.log("allArticles");
          // console.log(allArticles);
        }

        dispatch({ type: actionTypes.SET_ARTICLES, payload: allArticles });
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
