import { useRef, useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "./LoginPage.css";
import { useNavigate } from "react-router";
import route from "../../routes/route";
import { toast } from "react-toastify";
import Logo from "../../components/Logo/Logo";

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
  const [loading, setLoading] = useState(true);

  //useNavigate
  let navigate = useNavigate();

  //fucntion de redirection vers la page d'inscription
  const linkRegistrationPage = () => {
    navigate(route.REGISTER);
  };

  // function qui récupère les infos de mon utilisateur
  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(false);
      const urlInfo = "https://twitee-api.gamosaurus.fr/api/users/signin"; // stockage de url DE l'API qui recoit les infos de mon user
      const emailValue = email.current.value;
      const passwordValue = password.current.value;

      console.log(emailValue);
      console.log(passwordValue);
      const response = await fetch(urlInfo, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailValue, password: passwordValue }),
      });
      console.log(response);
      const json = await response.json(); // stockage de donné recut par l'API dans la variable json
      if (response) {
        setLoading(true);
      }
      // verification de la requête
      if (response.status !== 200) {
        // si il y a une erreur
        toast.error(json.message);
      } else {
        sessionStorage.setItem("token", json.accesToken);
        navigate(route.HOME);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Logo />
      <div className="containerFormLogin">
        <form
          className="formLogin"
          onSubmit={(event) => onsubmit(event)}
          action=""
        >
          <h1 className="text-white text-[1.6em]">Bienvenue</h1>
          <p className="text-white">
            Allez-y, connectez-vous. Vous êtes a deux doigts du bonheur !
          </p>
          <Input
            type={"email"}
            placeholder={"Email"}
            reference={email}
            className={"inputLogin"}
          />
          <Input
            type={"password"}
            placeholder={"Mot de passe"}
            reference={password}
            className={"inputLogin"}
          />
          <div className="text-white">{loading ? "" : "chargement..."}</div>

          <Button
            disabled={!loading}
            value={"Connexion"}
            className={
              loading
                ? "buttonLogin"
                : "buttonLogin opacity-4 cursor-not-allowed"
            }
          />
          <p
            onClick={linkRegistrationPage}
            className="text-white cursor-pointer"
          >
            S’enregistrer
          </p>
        </form>
      </div>
    </>
  );
}
