// Librairie
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Composant
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Logo from "../../components/Logo/Logo";

// CSS
import "./LoginPage.css";

// hooks
import { useToken } from "../../hooks/useToken";

// Route
import route from "../../routes/route";

// dda024646@gmail.com
// 00

/**
 * john.doe@email.com
 * password
 */

export default function LoginPage() {
  //ref
  const email = useRef();
  const password = useRef();

  //state
  const [loading, setLoading] = useState(false);

  //useNavigate
  let navigate = useNavigate();

  //variable
  const { getToken } = useToken();

  //useEffect
  useEffect(() => {
    const token = getToken();

    if (token !== null && token !== "") {
      navigate(route.HOME);
    }
  }, [getToken]);

  // function qui récupère les infos de mon utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const urlInfo = "https://twitee-api.gamosaurus.fr/api/users/signin"; // stockage de url DE l'API qui recoit les infos de mon user
      const emailValue = email.current.value;
      const passwordValue = password.current.value;

      const response = await fetch(urlInfo, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailValue, password: passwordValue }),
      });

      const json = await response.json(); // stockage de donné recut par l'API dans la variable json

      // verification de la requête
      if (response.status !== 200) {
        console.log("erreur");
        // si il y a une erreur
        toast.error(json.message);
      } else {
        sessionStorage.setItem("token", json.accesToken);
        navigate(route.HOME);
      }
    } catch (error) {
      console.log("erreur");
      toast.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="h-screen overflow-hidden">
      {/* Logo de l'application  */}
      <Logo />
      <div className="containerFormLogin">
        {/* Formulaire */}
        <form className="formLogin" onSubmit={(event) => handleSubmit(event)}>
          <h1 className="text-white font-bold font-poppins text-[40px] my-5">
            Bienvenue
          </h1>
          <p className="text-white font-poppins text-[16px] font-light mb-10">
            Allez-y, connectez-vous. Vous êtes a deux doigts du bonheur !
          </p>
          <Input
            type={"email"}
            placeholder={"Email"}
            reference={email}
            className={"inputLogin inputLoginRegisterSize"}
          />
          <Input
            type={"password"}
            placeholder={"Mot de passe"}
            reference={password}
            className="inputLogin inputLoginRegisterSize"
          />

          {loading ? (
            <div className="text-white font-bold text-2xl my-5 w-[74px]">
              <img src="loading/ripple-loading.svg" alt="Loading" />
            </div>
          ) : (
            <Button
              value="Connexion"
              w="250px"
              h="50px"
              className="m-8 bg-blueLogo hover:bg-blueLogoDark"
              type="submit"
            />
          )}
          <div
            onClick={() => navigate(route.REGISTER)}
            className="m-1 text-white font-poppins font-light text-[16px] hover:cursor-pointer hover:text-blueLogo"
          >
            S’enregistrer
          </div>
          {/* Mot de passe oublier désactiver car pas dans la release */}
          <div className="mb-8 text-gray-400 font-poppins font-light text-[16px]">
            Mot de passe oublié
          </div>
        </form>
      </div>
    </div>
  );
}
