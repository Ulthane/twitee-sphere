import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import Logo from "../components/Logo/Logo";
import NavBar from "../components/NavBar/NavBar";
import Community from "../components/Community/Community";
import TopCommunity from "../components/Community/TopCommunity";
import UserCommunity from "../components/Community/userCommunityPage/UserCommunity";
import IconeCommunity from "../components/Community/iconeCommunity/IconeCommunity";

import { useEffect, useRef, useState } from "react";
import { useToken } from "../hooks/useToken";
import { toast } from "react-toastify";

export default function CommunityPage() {
  //state
  const [communities, setCommunities] = useState([]);
  const [communitieFilter, setCommunitieFilter] = useState([]);
  const [seacrh, setSearch] = useState(false);

  //ref
  const name = useRef("");
  const description = useRef("");
  const icone = useRef("");
  const form = useRef("");
  const searchRef = useRef("");

  //hook personaliser
  const { getToken } = useToken();

  //functions

  //Récupération des communautés
  const fetchCommunities = async () => {
    try {
      const url = "https://twitee-api.gamosaurus.fr/api/communities/get/";
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

  // Chargement des communautés
  const loadCommunities = async () => {
    try {
      const json = await fetchCommunities();
      // Tri des communautés de la plus récente à la plus ancienne
      const sortedCommunities = json.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setCommunities(sortedCommunities); // Initialisation de l'état avec les données chargées
    } catch (e) {
      toast.error("Erreur lors de la récupération des communautés");
    }
  };

  // function pour rechercher une communauté
  const searchCommunities = async (e) => {
    e.preventDefault();
    // Rechercher des données
    try {
      // Stockage de la communauté recherchée dans une variable
      const communitieSearch = searchRef.current.value;
      const url = `https://twitee-api.gamosaurus.fr/api/communities/get/${communitieSearch}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      // Tri des communautés de la plus récente à la plus ancienne
      const sortedCommunities = json.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setCommunitieFilter(json);
      if (communitieFilter.length === 0) {
        toast.error("Aucune communauté trouvée");
      } else {
        setSearch(true);
      }
    } catch (e) {
      toast.error("Erreur lors du chargement des communautés");
    }
  };

  // function Pour créer une nouvelle communauté
  const submit = async (e) => {
    e.preventDefault();
    // Envoi des données
    try {
      // Création d'un objet pour stocker les données
      const data = {
        name: name.current.value,
        description: description.current.value,
        icon: icone.current.value,
      };
      let communityExist = false;
      const community = await fetchCommunities();

      community.forEach((communaute) => {
        if (data.name === communaute.name) {
          communityExist = true;
        }
      });

      if (communityExist) {
        toast.error("Le nom de cette communauté existe déjà.");
        return;
      }
      const url = "https://twitee-api.gamosaurus.fr/api/communities/create";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json(); // Stocke les données reçues de l'API dans la variable json
      if (json.message !== "success") {
        toast.error("Une erreur s'est produite, veuillez réessayer");
      } else {
        form.current.reset();
        loadCommunities();
        toast.success(
          "Félicitations, votre communauté a été créée avec succès"
        );
      }
    } catch (e) {
      console.log(e);
      toast.error(
        "Erreur lors de la création de la communauté. Veuillez réessayer."
      );
    }
  };

  const removeSearch = () => {
    if (searchRef.current.value == "") {
      loadCommunities();
      setSearch(false);
    }
  };

  // Affichage des communautés
  useEffect(() => {
    loadCommunities();
  }, []);

  return (
    <div className="h-screen gradientBackGround text-white grid grid-rows-[1fr_10fr_0.5fr] box-border ">
      <div className="px-4 py-2 flex justify-between ">
        {/* HEADER */}
        <Logo />
        <div className="relative">
          <form id="searchForm" onSubmit={(e) => searchCommunities(e)}>
            <Input
              type={"search"}
              placeholder={"Rechercher"}
              className=" w-[300px] h-[50px] "
              reference={searchRef}
              onchange={removeSearch}
            />
            <Button
              value={
                <img
                  className="mx-auto"
                  width="15"
                  height="100px"
                  src="../../public/Icons/searchBar/search_white.svg"
                  alt="icone search"
                />
              }
              type={"submit"}
              w={"80px"}
              h={"50px"}
              className=" bg-blueLogo hover:bg-blueLogoDark absolute right-0 top-3"
            />
          </form>
        </div>
        <UserCommunity />
      </div>

      <div className="h-full grid gap-6 grid-cols-[1fr_2fr_1fr] grid-rows-1 px-4 py-2 overflow-y-auto">
        <div className="flex flex-col justify-center items-start p-2 sticky top-0 mx-auto">
          {/* SideBar Menue */}
          <NavBar />
        </div>
        {/* community */}
        <div className=" w-full flex flex-col align-top  items-center">
          {/* Top community */}
          <TopCommunity />
          <Community
            communitiesToDisplay={seacrh ? communitieFilter : communities}
          />
        </div>

        {/* Formulaire de création de communauté */}
        <div className="sticky top-0">
          <form
            onSubmit={(e) => submit(e)}
            ref={form}
            className="p-2 flex justify-center flex-col items-center "
          >
            <h2 className="text-center mt-[30px] text-[36px]">
              <b>
                <span className="text-blueLogo">Créer</span> en une !
              </b>
            </h2>
            <Input
              placeholder={"Titre"}
              type={"text"}
              className={"mt-[20px] mb-[25px]"}
              reference={name}
            />

            <textarea
              style={{ background: "rgba(42, 163, 239, 0.1)" }}
              className=" rounded-[25px] placeholder: p-3 placeholder-white focus:outline-none"
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Description"
              ref={description}
            ></textarea>
            <Input
              placeholder={"Lien de votre image"}
              className={"mt-[25px]"}
              reference={icone}
            />
            <Button
              value={"créer moi"}
              type={"submit"}
              w={"200px"}
              h={"40px"}
              className=" bg-blueLogo hover:bg-blueLogoDark "
            />
          </form>
        </div>
      </div>

      <div>{/* Footer */}</div>
    </div>
  );
}
