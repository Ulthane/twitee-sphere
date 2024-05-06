//hook
import { useEffect, useState } from "react";
import { useToken } from "../../hooks/useToken";
import { toast } from "react-toastify";
import { useFetchCommunity } from "../../hooks/useFetchCommunity";
//composant
import Button from "../Button/Button";

//style
import { toast } from "react-toastify";

export default function TopCommunity({ changeCommunity }) {
  //state
  const [firstCommunity, setFirstCommunity] = useState([]);
  const [userData, setUserData] = useState();
  const [myCommunity, setMyCommunity] = useState();
  //hook personaliser
  const { getToken } = useToken();
  const { fetchProfil } = useFetchCommunity();
  //functions
  //Récupération des communautés
  const fetchCommunities = async () => {
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
      setFirstCommunity(json[0]);
    } catch (e) {
      toast.error("Erreur lors du chargement des communautés");
    }
  };

  //récuperation des donné du user
  const fetchUser = async () => {
    try {
      const response = await fetchProfil();
      setUserData(response.id_communities);
    } catch {
      toast.error("Une erreur s'est produite.");
    }
  };

  useEffect(() => {
    fetchCommunities();
    fetchUser();
  }, []);

  useEffect(() => {
    if (firstCommunity.id_communities === userData) {
      setMyCommunity(true);
    } else {
      setMyCommunity(false);
    }
  }, [userData]);

  return (
    <div className="w-[650px] flex justify-around items-center mt-[20px] mb-[50px]">
      <img className="w-[100px] rounded-md" src={firstCommunity.icon} alt="" />
      <h3>
        <span className="text-[20px]">Top Communauté</span> <br />
        <span className="text-blueLogo text-[36px]">
          <b>{firstCommunity.name}</b>
        </span>
      </h3>
      <span style={{ borderRight: "1px solid white", height: "80px" }}></span>
      <h3>
        <span className="text-blueLogo text-[36px]">
          <b>{firstCommunity.score}</b>
        </span>
        <br /> <span className="text-[20px]">points</span>
      </h3>
      <Button
        fn={(e) =>
          changeCommunity(e, firstCommunity.id_communities, firstCommunity.name)
        }
        value={
          myCommunity ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              >
                <path
                  strokeDasharray="20"
                  strokeDashoffset="20"
                  d="M3 21V20C3 17.7909 4.79086 16 7 16H11C13.2091 16 15 17.7909 15 20V21"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.4s"
                    values="20;0"
                  ></animate>
                </path>
                <path
                  strokeDasharray="20"
                  strokeDashoffset="20"
                  d="M9 13C7.34315 13 6 11.6569 6 10C6 8.34315 7.34315 7 9 7C10.6569 7 12 8.34315 12 10C12 11.6569 10.6569 13 9 13Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.5s"
                    dur="0.2s"
                    values="20;0"
                  ></animate>
                </path>
                <path strokeDasharray="8" strokeDashoffset="8" d="M15 6H21">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.5s"
                    dur="0.2s"
                    values="8;0"
                  ></animate>
                </path>
              </g>
              strokeDasharray
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeDasharray="24"
                strokeDashoffset="24"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 11L11 17L21 7"
              >
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.5s"
                  values="24;0"
                ></animate>
              </path>
            </svg>
          )
        }
        type={"button"}
        w={"60px"}
        h={"60px"}
        textSize={"30px"}
        className=" bg-blueLogo hover:bg-blueLogoDark p-3"
      />
    </div>
  );
}
