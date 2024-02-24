import { useRef } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "./LoginPage.css";

export default function LoginPage() {
  //ref
  const email = useRef();
  const password = useRef();

  // function qui récupère les infos de mon utilisateur
  const onsubmit = async (e) => {
    e.preventDefault();
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
      body: JSON.stringify({email: emailValue, password: passwordValue}),
    });

    const json = await response.json(); // stockage de donné recut par l'API dans la variable json
    console.log(json);
  };

  return (
    <>
      <form
        className="formLogin"
        onSubmit={(event) => onsubmit(event)}
        action=""
      >
        <h1 className="text-white">Bienvenue</h1>
        <p className="text-white">
          Allez-y, connectez-vous. Vous êtes a deux doigts du bonheur !
        </p>
        <Input type={"email"} placeholder={"Email"} reference={email} />
        <Input type={"password"} placeholder={"Mot de passe"} reference={password} />

        <Button value={"Connexion"} />
      </form>
    </>
  );
}
