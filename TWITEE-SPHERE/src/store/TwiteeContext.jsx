import { createContext, useEffect, useReducer } from "react";
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
});

function twiteeReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_ARTICLES:
      // console.log("SET_ARTICLES paylod:");
      // console.log(action.payload);
      const newDataForArticles = {
        ...state,
        articles: action.payload,
      };
      // console.log("return SET_ARTICLES");
      // console.log(newDataForArticles);
      return newDataForArticles;

    case actionTypes.SET_USER:
      // console.log("setUser paylod:");
      // console.log(action.payload.userInformations);
      const newDataForUser = {
        ...state,
        user: action.payload.userInformations,
      };
      // console.log("return SET USER");
      // console.log(newDataForUser);
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
      // console.log("SET_ARTICLES Articles");
      // console.log(articles);
      dispatch({ type: actionTypes.SET_ARTICLES, payload: { articles } });
    },
    setUser: (userInformations) => {
      dispatch({ type: actionTypes.SET_USER, payload: { userInformations } });
    },
    // addTwitee: (newTwitee) => {
    //   dispatch({ type: "ADD_TWITEE", payload: newTwitee });
    // },
  };

  //METHODES
  const getThirtyArticlesWhithOffset = async () => {
    const request = await fetch(
      `https://twitee-api.gamosaurus.fr/api/articles/get?limit=30&offset=0`,
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
      // console.log("FETCH");
      // console.log(newArticles);
      dispatch({ type: actionTypes.SET_ARTICLES, payload: newArticles });
    }
  };

  //CYCLES
  useEffect(() => {
    getThirtyArticlesWhithOffset();
  }, []);

  //JSX
  return (
    <TwiteeContext.Provider value={contextValue}>
      {children}
    </TwiteeContext.Provider>
  );
}
