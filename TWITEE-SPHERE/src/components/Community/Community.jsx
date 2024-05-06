//hook
import { useEffect, useState } from "react";
import { useToken } from "../../hooks/useToken";

//style
import { toast } from "react-toastify";
//composant
import TopCommunity from "./TopCommunity";
import { useFetchCommunity } from "../../hooks/useFetchCommunity";
import CommunityRender from "./CommunityRender";

export default function Community({ communitiesToDisplay }) {
  //Hook personnaliser
  const { getToken } = useToken();
  const { modifyCommunity } = useFetchCommunity();

  //state
  const [userData, setUserData] = useState({ id_communities: 0 });
  const [loading, setLoading] = useState(true);

  //Rejoindre la commnunauté
  const changeCommunity = async (e, communityId, name) => {
    e.preventDefault();
    setLoading(false);
    let data;

    if (communityId === userData.id_communities) {
      data = { id_communities: null };
    } else {
      data = { id_communities: communityId };
    }

    try {
      await modifyCommunity(data);
      if (communityId === userData.id_communities) {
        toast.success(`vous venez de quitter ${name}`);
      } else {
        toast.success(`Bravo vous venez de rejoindre ${name}`);
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      userDisplay();
    } catch (e) {
      toast.error("Erreur inattendue, veuillez réessayer");
    }
  };

  // fetch du profil du user
  const otherUserDisplay = async (id) => {
    try {
      const url = `https://twitee-api.gamosaurus.fr/api/users/get/other/${id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setLoading(true);

      return json;
    } catch (e) {
      toast.error("Erreur lors du chargement du profil");
    }
  };

  const userDisplay = async () => {
    try {
      const url = `https://twitee-api.gamosaurus.fr/api/users/get/id`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setLoading(true);

      setUserData(json);
    } catch (e) {
      toast.error("Erreur lors du chargement du profil");
    }
  };

  // Render community
  const communityRenderer = communitiesToDisplay.map((community, index) => {
    return (
      <CommunityRender
        key={"community_" + index}
        userInfo={otherUserDisplay(community.id_user)}
        community={community}
        changeCommunity={changeCommunity}
        myCommunity={userData.id_communities}
      />
    );
  });

  useEffect(() => {
    userDisplay();
  }, []);
  return (
    <>
      {/* Top community */}
      <TopCommunity changeCommunity={changeCommunity} />
      {loading ? (
        communityRenderer
      ) : (
        <div className="h-[100vh] flex items-center text-white font-bold text-2xl my-5 w-[90px]">
          <img src="loading/ripple-loading.svg" alt="Loading" />
        </div>
      )}
    </>
  );
}
