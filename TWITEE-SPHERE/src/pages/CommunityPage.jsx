//composant
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import NavBar from "../components/NavBar/NavBar";
import Community from "../components/Community/Community";

//Hook
import { useEffect, useRef, useState } from "react";
import { useToken } from "../hooks/useToken";

//style
import { toast } from "react-toastify";
import { useFetchCommunity } from "../hooks/useFetchCommunity";
import NavBarCommunity from "../components/Community/NavBarCommunity/NavBarCommunity";

export default function CommunityPage() {
  //state
  const [communities, setCommunities] = useState([]);
  const [noCommunities, setNoCommunities] = useState(false);
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
  const { getAllCommunities } = useFetchCommunity();

  // Chargement des communautés
  const loadCommunities = async () => {
    try {
      const json = await getAllCommunities();
      // Tri des communautés de la plus récente à la plus ancienne
      const sortedCommunities = json.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setCommunities(sortedCommunities); // Initialisation de l'état avec les données chargées
    } catch (e) {
      toast.error("Erreur lors de la récupération des communautés");
    }
  };

  const searchCommunities = async (e) => {
    e.preventDefault();
    // Rechercher des données
    try {
      setSearch(true);
      // Stockage de la communauté recherchée dans une variable
      const communitieSearch = searchRef.current.value;
      console.log(searchRef.current.value);
      const url = `https://twitee-api.gamosaurus.fr/api/communities/get/${communitieSearch}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setCommunities(json);

      // Tri des communautés de la plus récente à la plus ancienne
      const sortedCommunities = json.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setCommunitieFilter(json);
      if (json.length === 0) {
        //   toast.error("Aucune communauté trouvée");
        setNoCommunities(true);
      } else {
        setNoCommunities(false);
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
      const community = await getAllCommunities();

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

  // Affichage des communautés
  useEffect(() => {
    loadCommunities();
  }, []);

  return (
    <div className="h-screen gradientBackGround text-white grid grid-rows-[1fr_10fr_0.5fr] box-border ">
      <NavBarCommunity
        searchCommunities={searchCommunities}
        searchRef={searchRef}
      />

      <div className="h-full grid gap-6 grid-cols-[1fr_2fr_1fr] grid-rows-1 px-4 py-2 overflow-y-auto">
        <div className="flex flex-col justify-center items-start p-2 sticky top-0 mx-auto">
          {/* SideBar Menue */}
          <NavBar />
        </div>
        {/* community */}
        <div className="flex flex-col items-center h-full w-full ">
          <Community
            communitiesToDisplay={seacrh ? communities : communities}
          />
          {noCommunities && (
            <div className=" flex justify-center items-center text-center h-[100vh] text-blueLogo text-[25px] font-bold">
              {" "}
              Aucune communauté trouvée
            </div>
          )}
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
