//hook
import { useContext, useEffect, useState } from "react";
import { useFetchCommunity } from "../../hooks/useFetchCommunity";

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
  const [myCommunity, setMyCommunity] = useState();

  //Rejoindre la commnunauté
  const changeCommunity = async (e, communityId, name) => {
    e.preventDefault();
    setLoading(false);
    let data;

    console.log(userData);

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
        // communitiesToDisplay.map((community, index) => (
        //   <div
        //     key={'community_' + index}
        //     className="rounded-[25px] p-5 w-[600px] h-[auto] community mb-[15px]"
        //     style={{ background: "rgba(42, 163, 239, 0.1)" }}
        //   >
        //     {/* Mapping des communautés pour afficher dynamiquement */}
        //     <div className="flex justify-between mb-[5px]">
        //       <UserProfile userInformations={userData} />
        //       <img
        //         className="w-[35px] h-[35px] rounded-full object-cover"
        //         src={community.icon}
        //         alt="icone de la communauté"
        //       />
        //     </div>
        //     <h2 className="text-blueLogo text-[36px]">
        //       <b>{community.name}</b>
        //     </h2>
        //     <p className="text-[16px]">{community.description}</p>
        //     <div className="mt-[15px] flex justify-between items-center">
        //       <div className="flex items-center">
        //         <img
        //           className="mr-[10px]"
        //           src="../../public/Icons/user/user_white.svg"
        //           alt="icone user"
        //         />
        //         <p>2532</p>
        //       </div>
        //       <Button
        //         fn={(e) => {
        //           changeCommunity(e, community.id_communities, community.name);
        //         }}
        //         value={
        //           userData &&
        //           community.id_communities === userData.id_communities
        //             ? "Quitter"
        //             : "Rejoindre"
        //         }
        //         type={"button"}
        //         w={"200px"}
        //         h={"50px"}
        //         className={
        //           userData &&
        //           community.id_communities === userData.id_communities
        //             ? "p-3 bg-blue-700 hover:bg-red-500"
        //             : "p-3 bg-blueLogo hover:bg-blueLogoDark"
        //         }
        //       />
        //     </div>
        //   </div>
        // ))
        <div className="h-[100vh] flex items-center text-white font-bold text-2xl my-5 w-[90px]">
          <img src="loading/ripple-loading.svg" alt="Loading" />
        </div>
      )}
    </>
  );
}
