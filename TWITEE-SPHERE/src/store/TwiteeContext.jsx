import { createContext, useReducer } from "react";

export const TwiteeContext = createContext({
  data: {},
  addTwitee: () => {},
});

function twiteeReducer(state, action) {
  switch (action.type) {
    case "ADD_TWITEE":
      //Check if item.producName, if yes increment qte, if not display item
      const itemIndex = state.items.findIndex(
        (itemInItems) => itemInItems.productName === action.payload.productName
      );

      if (itemIndex !== -1) {
        // On recupère le state passé par dispatch dans le cartReducer
        const existingItem = state.items[itemIndex];
        const updateQuantity = existingItem.quantity + 1;

        if (updateQuantity === 10) {
          alert(
            "Vous ne pouvez pas ajouter plus de 10 articles pour ce produit"
          );
          return state;
        }
        return {
          ...state,
          items: [
            /**
             * Récupère les items de la positon 0 à la position "itemIndex" EXCLUS
             * itemIndex étant l'index ou se trouve l'item que l'on veut modifier
             */
            ...state.items.slice(0, itemIndex),
            // On place notre nouvel item avec la nouvelle quantité
            { ...existingItem, quantity: updateQuantity },
            /**
             * Récupère les items de la positon "itemIndex + 1" à la fin du tableau
             * itemIndex étant l'index ou se trouve l'item que l'on veut modifier
             */
            ...state.items.slice(itemIndex + 1),
          ],
        };
      }

      // Add item to items
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
  }
}

export default function TwiteeProvider({ children }) {
  const [state, dispatch] = useReducer(twiteeReducer, { data: {} });
  const contextValue = {
    data: state.data,
    /**
     * Dans le dispatch
     * 1- On ne le voit pas mais dispatch envoie automatique le "state" qui lui est associé avec useReducer =>  const [state, dispatch] = useReducer(cartReducer, { items: [] });
     * C'est comme ça que l'on retrouve le state dans les actions
     * 2- type de l'action qui permet de déclencher la bonne action dans le switch du Reducer
     * 3- Les payloads qui sont des arguments que l'on pourra ré-utiliser dans nos actions car leur valeurs ne sont pas le state et que nous sommes obligé de les faire passer par ce biais
     */
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
