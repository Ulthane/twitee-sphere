//hook
import { useEffect, useState } from "react";
import { useFetchCommunity } from "../../../hooks/useFetchCommunity";

//style
import { toast } from "react-toastify";

export default function CommunityBar() {
  // Hook personnalisé
  const { getTopScore, fetchProfil, communitiesById } = useFetchCommunity();
  // State
  const [topCommunity, setTopCommunity] = useState([]);
  const [communityUser, setCommunityUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  // Fetch meilleur communauté
  const fetchTopScore = async () => {
    try {
      const communityTopScore = await getTopScore();
      setTopCommunity(communityTopScore);
    } catch {
      toast.error("Une erreur s'est produite.");
    }
  };

  // Fetch du user
  const fetchUser = async () => {
    try {
      const userData = await fetchProfil();
      setUser(userData);
    } catch {
      toast.error("Une erreur s'est produite.");
    }
  };

  // Fetch community user
  const fetchCommunity = async () => {
    try {
      const userCommunities = await communitiesById(user.id_communities);
      console.log(userCommunities);
      setCommunityUser(userCommunities);
      setLoading(true);
    } catch {
      toast.error("Une erreur s'est produite.");
    }
  };

  useEffect(() => {
    fetchTopScore();
    fetchUser();
  }, []);

  useEffect(() => {
    if (user && user.id_user !== undefined) {
      fetchCommunity();
    }
  }, [user]);

  return (
    <div>
      <div
        className="h-[200px] mt-5 rounded-[35px] flex flex-col items-center"
        style={{ background: "rgba(42, 163, 239, 0.1)" }}
      >
        <h2 className="text-center text-blueLogo font-bold text-[1.5em] mt-5 ">
          Ma Communauté
        </h2>
        {loading ? (
          communityUser.length > 0 ? (
            communityUser.map((community, index) => (
              <div key={index}>
                <h2 className="text-center  font-bold mt-5 text-[1.3em]">
                  {community.name}
                </h2>
                <h2 className="text-center mt-5 text-[1.1em]">
                  Score : {community.score}
                </h2>
              </div>
            ))
          ) : (
            <>
              <h2 className="text-center mt-5 text-blue-100 ">
                Vous n'avez rejoint aucune communauté
              </h2>
              <script src="https://cdn.lordicon.com/lordicon.js"></script>
              <lord-icon
                src="https://cdn.lordicon.com/lhwyshcs.json"
                trigger="loop"
                delay="2000"
                style={{ width: "70px", height: "70px" }}
              ></lord-icon>
            </>
          )
        ) : (
          <div className="h-[100vh] flex items-center text-white font-bold text-2xl my-5 w-[60px]">
            <img src="/loading/ripple-loading.svg" alt="Loading" />
          </div>
        )}
      </div>
      <div
        className="rounded-[35px] mt-5 h-[auto]"
        style={{ background: "rgba(42, 163, 239, 0.1)" }}
      >
        <h2 className="text-center font-bold p-2 text-[1.5em]">Top Score</h2>

        {topCommunity.map((community, index) => (
          <div key={index}>
            <div className="p-5 flex justify-around items-center">
              <img
                className="w-[40px] h-[40px] rounded-md mx-5"
                src={community.icon}
                alt=""
              />
              <p className="font-bold">{community.score}</p>
              <p className="text-blueLogo text-center text-[1.5em]">
                {index + 1}
              </p>
            </div>
            {index !== 3 && (
              <div className="mx-[auto] w-[150px] h-0.5 bg-gray-400"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
