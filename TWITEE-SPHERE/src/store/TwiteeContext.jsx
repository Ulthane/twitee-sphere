import { createContext, useReducer } from "react";

const actionTypes = {
  SET_USER: "SET_USER",
  SET_ARTICLES: "SET_ARTICLES",
  SET_COMMUNITY: "SET_COMMUNITY",
  SET_REFRESH_HOME_FROM_CONTEXT: "SET_REFRESH_HOME_FROM_CONTEXT",
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
      return {
        ...state,
        articles: action.payload,
      };

    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload.userInformations,
      };

    case actionTypes.SET_COMMUNITY:

      return {
        ...state,
        community: { ...action.payload.newCommunity },
      };

    case actionTypes.SET_REFRESH_HOME_FROM_CONTEXT:
      return {
        ...state,
        refreshHomeFromContext: state.refreshHomeFromContext + 1,
      };
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
    community: state.community,
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
