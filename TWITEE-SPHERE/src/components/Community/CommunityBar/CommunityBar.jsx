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
        <div className="flex flex-col pt-8">
            <div
                className="h-[215px] w-[325px] rounded-[35px] flex flex-col items-center"
                style={{ background: "rgba(42, 163, 239, 0.1)" }}
            >
                <h2 className="text-center text-blueLogo font-bold text-[1.8em] mt-5">
                    Ma Communauté
                </h2>
                {loading ? (
                    communityUser.length > 0 ? (
                        communityUser.map((community, index) => (
                            <div
                                key={index}
                                className=" flex flex-col items-center"
                            >
                                <h2 className="text-center font-bold mt-3 text-[1.3em]">
                                    {community.name}
                                </h2>
                                <div className="w-[200px] h-[20px] bg-gray-100/10 mt-3 rounded-xl">
                                    <div className="w-[200px] h-[20px] bg-blueLogo rounded-xl"></div>
                                </div>
                                <h2 className="text-center text-gray-300 mt-5 text-[1.3em]">
                                    {community.score} Points
                                </h2>
                            </div>
                        ))
                    ) : (
                        <>
                            <h2 className="text-center mt-5 text-blue-100 mb-5">
                                Vous n&apos;avez rejoint aucune communauté
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
                className="rounded-[35px] mt-10 h-[auto] w-[325px] py-5"
                style={{ background: "rgba(42, 163, 239, 0.1)" }}
            >
                <h2 className="text-center font-bold p-2 text-[2.0em]">
                    Top Score
                </h2>

                {topCommunity.map((community, index) => (
                    <div key={index}>
                        <div className="p-5 flex justify-around items-center">
                            <img
                                className="w-[60px] h-[60px] rounded-xl shadow-lg object-cover"
                                src={community.icon}
                                alt=""
                            />
                            <p className="font-bold text-[2em]">
                                {community.score}
                            </p>
                            <p className="text-blueLogo text-center text-[2em]">
                                {index + 1}
                            </p>
                        </div>
                        {index !== 3 && (
                            <div className="mx-[auto] w-[250px] h-[1px] bg-gray-400/50"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
