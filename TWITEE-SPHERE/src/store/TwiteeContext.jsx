import { createContext, useReducer } from "react";
import { toast } from "react-toastify";

//Variables
const token = sessionStorage.getItem("token");

const actionTypes = {
  SET_USER: "SET_USER",
  SET_ARTICLES: "SET_ARTICLES",
  SET_COMMUNITY: "SET_COMMUNITY",
  SET_REFRESH_HOME_FROM_CONTEXT: "SET_REFRESH_HOME_FROM_CONTEXT",
  // Community ACTIONS
};

export const TwiteeContext = createContext({
  articles: [],
  user: {},
  community: {},
  refreshHomeFromContext: 0,
  // Community
  setCommunity: () => {},
  setArticles: () => {},
  setUser: () => {},
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

    case actionTypes.SET_COMMUNITY:
      const newCommunity = {
        ...state,
        community: { ...action.payload.newCommunity },
      };
      return newCommunity;

    case actionTypes.SET_REFRESH_HOME_FROM_CONTEXT:
      const oldRefreshHomeFromContext = state.refreshHomeFromContext;
      const newsRefreshHomeFromContext = {
        ...state,
        refreshHomeFromContext: oldRefreshHomeFromContext + 1,
      };

      return newsRefreshHomeFromContext;
  }
}

export default function TwiteeProvider({ children }) {
  const [state, dispatch] = useReducer(twiteeReducer, {
    articles: [],
    user: { friends: [] },
    community: {},
    refreshHomeFromContext: 0,
  });

  //VARIABLES
  const contextValue = {
    articles: state.articles,
    user: state.user,
    refreshHomeFromContext: state.refreshHomeFromContext,
    setArticles: (articles) => {
      dispatch({ type: actionTypes.SET_ARTICLES, payload: { articles } });
    },
    setUser: (userInformations) => {
      dispatch({ type: actionTypes.SET_USER, payload: { userInformations } });
    },
    setRefreshHomeFromContext: () => {
      dispatch({
        type: actionTypes.SET_REFRESH_HOME_FROM_CONTEXT,
      });
    },
    setCommunity: (newCommunity) => {
      dispatch({
        type: actionTypes.SET_COMMUNITY,
        payload: { newCommunity },
      });
    },
  };

  //JSX
  return (
    <TwiteeContext.Provider value={contextValue}>
      {children}
    </TwiteeContext.Provider>
  );
}
