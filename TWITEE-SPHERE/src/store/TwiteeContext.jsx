import { createContext, useReducer } from "react";

export const TwiteeContext = createContext({
  data: {},
  setArticles: () => {},
  setUser: () => {},
  addTwitee: () => {},
});

function twiteeReducer(state, action) {
  switch (action.type) {
    case "SET_ARTICLES":
      const getThirtyArticlesWhithOffset = async () => {
        const response = await fetch(
          `https://twitee-api.gamosaurus.fr/api/articles/get?limit=30&offset=${articlesOffset}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        if (response.status !== 200) {
          toast.error(json.message);
        } else {
          let data = await response.json();
          //   console.log(twitee.current.value);

          let newData = [...data];
          setArticles(newData);
        }
      };
      // console.log("payload in setArticles:");
      // console.log(action.payload);
      const newDataForArticles = { ...state.data, articles: action.payload };
      return { ...state, data: newDataForArticles };

    case "SET_USER":
      //   console.log("setUser:");
      //   console.log(action.payload);
      const newDataForUser = { ...state.data, user: action.payload };
      return { ...state, data: newDataForUser };

    // case "ADD_TWITEE":
    //   return {
    //     ...state,
    //     items: [
    //       /**
    //        * Récupère les items de la positon 0 à la position "itemIndex" EXCLUS
    //        * itemIndex étant l'index ou se trouve l'item que l'on veut modifier
    //        */
    //       ...state.items.slice(0, itemIndex),
    //       // On place notre nouvel item avec la nouvelle quantité
    //       { ...existingItem, quantity: updateQuantity },
    //       /**
    //        * Récupère les items de la positon "itemIndex + 1" à la fin du tableau
    //        * itemIndex étant l'index ou se trouve l'item que l'on veut modifier
    //        */
    //       ...state.items.slice(itemIndex + 1),
    //     ],
    //   };
  }

  // Add item to items
  return {
    ...state,
    items: [...state.items, { ...action.payload, quantity: 1 }],
  };
}

export default function TwiteeProvider({ children }) {
  const [state, dispatch] = useReducer(twiteeReducer, {
    data: { articles: [], user: {} },
  });
  const contextValue = {
    data: state.data,
    setArticles: (articles) => {
      dispatch({ type: "SET_ARTICLES", payload: articles });
    },
    setUser: (userInformations) => {
      dispatch({ type: "SET_USER", payload: userInformations });
    },
    addTwitee: (newTwitee) => {
      dispatch({ type: "ADD_TWITEE", payload: newTwitee });
    },
  };

  return (
    <TwiteeContext.Provider value={contextValue}>
      {children}
    </TwiteeContext.Provider>
  );
}
