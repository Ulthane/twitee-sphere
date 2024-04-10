// Librairie
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Composant
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Logo from "../../components/Logo/Logo";

// Route
import route from "../../routes/route";

// hooks
import { useToken } from "../../hooks/useToken";

export default function RegisterPage() {
  //states
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [securePassword, setSecurePassword] = useState("");

  //ref
  // Permettra d'ajouter un focus sur le premier champs du formulaire
  const firstnameRef = useRef(null);

  //useEffect
  useEffect(() => {
    // Donne le focus au champ firstname lors du montage du composant
    if (firstnameRef.current) {
      firstnameRef.current.focus();
    }
  }, []);

  //variable
  const { getToken } = useToken();

  //useEffect
  useEffect(() => {
    const token = getToken();

    if (token !== null && token !== "") {
      navigate(route.HOME);
    }
  }, [getToken]);

  //Variable
  let navigate = useNavigate();

  //Functions
  // function qui gère le changement des inputs
  const handleChange = (e) => {
    const { name, value } = e.target; // extrait les infos de name et value de e.target
    setFormData({
      ...formData,
      [name]: value, // modification des valeur ( [name] devient la clés et value la valeur )
    });
  };

  // function pour envoyer les donnés de mon utilisateur a mon API
  const onSubmit = async (e) => {
    e.preventDefault(); // ne relance pas la page lors de la soummision du formulaire

    //vérification que les 2 mots de passe sont identiques
    if (formData.password !== securePassword) {
      toast.error("Les mots de passe ne sont pas identiques");
    } else {
      setLoading(true);

      try {
        const url = "https://twitee-api.gamosaurus.fr/api/users/signup"; // stockage de url DE l'API dans la variable  url

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const json = await response.json(); // stocke les donnés reçut de l'API dans la variable json
        sessionStorage.setItem("token", json.accessToken); // stocke accessToke dans dans mon state token
        setLoading(false);

        if (response.status == 403) {
          toast.error(json.message);
        } else if (response.status == 200) {
          navigate(route.HOME);
        }
      } catch (error) {
        console.error(error);
        toast.error(error);
      }
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <Logo />
      <div className="containerFormLogin">
        <form onSubmit={onSubmit} className="formLogin" action="">
          <h1 className="text-white font-bold font-poppins text-[40px] my-5">
            Inscription
          </h1>
          <p className="text-white font-poppins text-[16px] font-light mb-10">
            Inscrivez-vous pour rejoindre la sphère des communautés
          </p>
          <Input
            className={"inputLoginRegisterSize"}
            type={"text"}
            placeholder={"Prenom"}
            name={"firstname"}
            value={formData.prenom}
            onchange={handleChange}
            reference={firstnameRef}
          />
          <Input
            className={"inputLoginRegisterSize"}
            type={"text"}
            placeholder={"Nom"}
            name={"lastname"}
            value={formData.nom}
            onchange={handleChange}
          />
          <Input
            className={"inputLoginRegisterSize"}
            type={"email"}
            placeholder={"Email"}
            name={"email"}
            value={formData.email}
            onchange={handleChange}
          />
          <Input
            className={"inputLoginRegisterSize"}
            type={"password"}
            placeholder={"Mot de passe"}
            name={"password"}
            value={formData.password}
            onchange={handleChange}
          />
          <Input
            //verification 2 mdp en front
            className={"inputLoginRegisterSize"}
            type={"password"}
            placeholder={"Vérification mot de passe"}
            name={"confirmPassword"}
            value={securePassword}
            onchange={(e) => setSecurePassword(e.target.value)}
          />

          {loading ? (
            <div className="text-white font-bold text-2xl my-5 w-[74px]">
              <img src="loading/ripple-loading.svg" alt="Loading" />
            </div>
          ) : (
            <Button
              value={"S'enregistrer"}
              w="250px"
              h="50px"
              className="m-8 bg-blueLogo hover:bg-blueLogoDark"
              type="submit"
            />
          )}
          <div
            onClick={() => navigate(route.LOGIN)}
            className="mb-8 text-white font-poppins font-light text-[16px] hover:cursor-pointer hover:text-blueLogo"
          >
            Se connecter
          </div>
        </form>
      </div>
    </div>
  );
}
