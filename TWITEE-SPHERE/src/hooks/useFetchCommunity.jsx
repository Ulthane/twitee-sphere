import { toast } from "react-toastify";
import { useToken } from "./useToken";

export const useFetchCommunity = () => {
  //Token
  const { getToken } = useToken();
  // dans l'ordre des meilleurs communautées
  const getTopScore = async () => {
    try {
      const url = "https://twitee-api.gamosaurus.fr/api/score/get/top";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      return json;
    } catch (e) {
      toast.error("Erreur lors du chargement des communautés");
    }
  };

  // toutes les communautées
  const getAllCommunities = async () => {
    try {
      const url =
        "https://twitee-api.gamosaurus.fr/api/communities/get?limit=30&offset=0";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      return json;
    } catch (e) {
      toast.error("Erreur lors du chargement des communautés");
    }
  };

  // Communautée par id
  const communitiesById = async (id) => {
    try {
      const url = `https://twitee-api.gamosaurus.fr/api/communities/get/id/${id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      return json;
    } catch (e) {
      toast.error("Erreur lors du chargement des communautés");
    }
  };

  // modifier une communauté
  const modifyCommunity = async (data) => {
    try {
      const url = "https://twitee-api.gamosaurus.fr/api/users/modify";
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (e) {
      toast.error("Erreur inattendue, veuillez réessayer");
    }
  };

  // profil user
  const fetchProfil = async () => {
    try {
      const url = "https://twitee-api.gamosaurus.fr/api/users/get/id";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      return json;
    } catch (e) {
      toast.error("Erreur lors du chargement du profil");
    }
  };

  return {
    getTopScore,
    getAllCommunities,
    communitiesById,
    modifyCommunity,
    fetchProfil,
  };
};
