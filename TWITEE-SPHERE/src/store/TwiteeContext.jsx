import { createContext, useReducer } from "react";
import { toast } from "react-toastify";

//Variables
const token = sessionStorage.getItem("token");

const actionTypes = {
  SET_USER: "SET_USER",
  SET_ARTICLES: "SET_ARTICLES",
};

export const TwiteeContext = createContext({
  articles: [],
  user: {},
  setArticles: () => {},
  setUser: () => {},
  addTwitee: () => {},
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
  }
}

export default function TwiteeProvider({ children }) {
  const [state, dispatch] = useReducer(twiteeReducer, {
    articles: [],
    user: {},
  });

  //VARIABLES
  const contextValue = {
    articles: state.articles,
    user: state.user,
    setArticles: (articles) => {
      dispatch({ type: actionTypes.SET_ARTICLES, payload: { articles } });
    },
    setUser: (userInformations) => {
      dispatch({ type: actionTypes.SET_USER, payload: { userInformations } });
    },
    getThirtyArticlesWhithOffset: async () => {
      const request = await fetch(
        `https://twitee-api.gamosaurus.fr/api/articles/get?limit=300&offset=0`,
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

        dispatch({ type: actionTypes.SET_ARTICLES, payload: newArticles });
      }
    },
  };

  //JSX
  return (
    <TwiteeContext.Provider value={contextValue}>
      {children}
    </TwiteeContext.Provider>
  );
}