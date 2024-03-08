import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import Logo from "../components/Logo/Logo";
import NavBar from "../components/NavBar/NavBar";
import Community from "../components/Community/Community";

import { useEffect, useRef, useState } from "react";
import { useToken } from "../hook/useToke";
import { toast } from "react-toastify";

export default function CommunityPage() {
  //state
  const [communities, setCommunities] = useState([]);
  const [communitieFilter, setCommunitieFilter] = useState([]);
  const [seacrh, setSearch] = useState(false);

  //ref
  const name = useRef("");
  const description = useRef("");
  const form = useRef("");
  const searchRef = useRef("");

  //hook personaliser
  const { getToken } = useToken();

  //functions

  //Récupération des communauté
  const fetchCommunities = async () => {
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

  //Chargement des communauté
  const loadCommunities = async () => {
    try {
      const json = await fetchCommunities();
      setCommunities(json); // Initialisation de l'état avec les données chargées
    } catch (e) {
      toast.error("Erreur lors de la récupération des communautés");
    }
  };

  // function pour rechercher une communauté
  const searchCommunities = async (e) => {
    e.preventDefault();
    // rechercher des donné
    try {
      const json = await fetchCommunities();
      // stockage de la communauté rechercher dans une variable
      const communitieSearch = searchRef.current.value;

      // filtration des communautées avec celle rechercher ( filtration avec mot clée )
      const filteredCommunities = json.filter((community) => {
        const regex = new RegExp(`\\b${communitieSearch}`, "i"); // Recherche de mot complet, insensible à la casse (majuscule/minuscule)
        return regex.test(community.name);
      });
      setCommunities(json);
      setCommunitieFilter(filteredCommunities);
      if (filteredCommunities.length === 0) {
        toast.error("aucune communauté trouver");
      } else {
        setSearch(true);
      }
    } catch (e) {
      toast.error("aucune communauté trouver");
    }
  };

  // function pour créer une nouvelle communauté
  const submit = async (e) => {
    e.preventDefault();
    // envoi des donné
    try {
      // création d'un objet pour stocker les donnés
      const data = {
        name: name.current.value,
        description: description.current.value,
      };
      let communityExist = false;
      const community = await fetchCommunities();

      community.forEach((communaute) => {
        if (data.name === communaute.name) {
          communityExist = true;
        }
      });

      if (communityExist) {
        toast.error("Le nom de votre communauté existe déjà.");
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

      const json = await response.json(); // stocke les donnés reçut de l'API dans la variable json
      if (json.message !== "success") {
        toast.error("une erreur vient de ce passer ");
      } else {
        form.current.reset();
        toast.success("votre communauté vient d'être créer");
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
      fetchCommunities();
      setSearch(false);
    }
  };

  // useEffect

  //Affichage des communauté
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
              className="placeholder:pl-5 focus:outline-none focus:border-blueLogo"
              reference={searchRef}
              onchange={removeSearch}
            />
            <img
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
              width="20"
              height="20"
              src="../../public/Icons/searchBar/search_white.svg"
              alt="icone search"
            />
            <Button value={"Chercher"} className={"bg-red-500"} />
          </form>
        </div>
        <h2>Profil..</h2>
      </div>

      <div className="h-full grid gap-6 grid-cols-[1fr_2fr_1fr] grid-rows-1 px-4 py-2 overflow-y-auto">
        <div className="flex flex-col justify-center items-start p-2 sticky top-0 mx-auto">
          {/* SideBar Menue */}
          <NavBar />
        </div>
        {/* community */}
        <div className=" w-full ">
          <Community
            communitiesToDisplay={seacrh ? communitieFilter : communities}
          />

          {/* Outlet */}
        </div>

        {/* Formulaire de création de communauté */}
        <div className="sticky top-0">
          <form
            onSubmit={(e) => submit(e)}
            ref={form}
            className="p-2 flex justify-center flex-col items-center "
          >
            <h2 className="text-center mt-[30px]">
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
            />
            <Button value={"Créer moi !"} className={"mt-[20px]"} />
          </form>
        </div>
      </div>

      <div
        className="px-4 py-2"
        style={{ background: "rgba(255,255,255,0.3)" }}
      >
        {/* Footer */}
        FOOTER
      </div>
    </div>
  );
}

// communitieFilter.length > 0
