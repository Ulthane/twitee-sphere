import { useEffect, useRef, useState, CSSProperties } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "./register.css";
import Logo from "../../components/Logo/Logo";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import route from "../../routes/route";

export default function RegisterPage() {
  //states
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);

  //ref
  const firstnameRef = useRef(null);

  //useEffect
  useEffect(() => {
    // Donne le focus au champ firstname lors du montage du composant
    if (firstnameRef.current) {
      firstnameRef.current.focus();
    }
  }, []);

  const [securePassword, setSecurePassword] = useState("");

  const [token, setToken] = useState(); // stockage du accesToken

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
  const onsubmit = async (e) => {
    e.preventDefault(); // ne relance pas la page lors de la soummision du formulaire
    //vérification que les 2 mots de passe sont identiques
    if (formData.password !== securePassword) {
      toast.error("Les mots de passe ne sont pas identiques");
    } else {
      setLoading(false);
      console.log(formData); // affiche les données de mon user dans la console
      try {
        const url = "https://twitee-api.gamosaurus.fr/api/users/signup"; // stockage de url DE l'API dans la variable  url

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response) {
          setLoading(true);
        }
        const json = await response.json(); // stocke les donnés reçut de l'API dans la variable json
        setToken(json.accessToken); // stocke accessToke dans dans mon state token
        console.log(response);

        if (response.status == 403) {
          toast.error(json.message);
        } else if (response.status == 200) {
          sessionStorage.setItem("token", json.accesToken);
          navigate(route.HOME);
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }
  };

  // function qui récupère les infos de mon utilisateur
  const getUserInfo = async () => {
    const urlInfo = "https://twitee-api.gamosaurus.fr/api/users/get"; // stockage de url DE l'API qui recoit les infos de mon user

    const response = await fetch(urlInfo, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    const json = await response.json(); // stockage de donné recut par l'API dans la variable json
    console.log(json);
  };

  //useEffect

  // lorsque mon usestate token change on appelle la function getUsers
  useEffect(() => {
    if (token) {
      // si mon state token n'est pas vide on appelle getUserInfo
      getUserInfo(); // function qui récupère les infos de mon utilisateur
    }
  }, [token]);

  return (
    <>
      <Logo />
      <div className="containerFormRegister">
        <form onSubmit={onsubmit} className="formRegister" action="">
          <div className="containerInfoForm">
            <h1>Inscription</h1>
            <p>
              Choisissez bien votre élément, il vous suivra tout au long de
              votre aventure sur TwiteeElement
            </p>
          </div>
          <Input
            className={"inputRegister"}
            type={"text"}
            placeholder={"Prenom"}
            name={"firstname"}
            value={formData.prenom}
            onchange={handleChange}
            reference={firstnameRef}
          />
          <Input
            className={"inputRegister"}
            type={"text"}
            placeholder={"Nom"}
            name={"lastname"}
            value={formData.nom}
            onchange={handleChange}
          />
          <Input
            className={"inputRegister"}
            type={"email"}
            placeholder={"Email"}
            name={"email"}
            value={formData.email}
            onchange={handleChange}
          />
          <Input
            className={"inputRegister"}
            type={"password"}
            placeholder={"Mot de passe"}
            name={"password"}
            value={formData.password}
            onchange={handleChange}
          />
          <Input
            //verification 2 mdp en front
            className={"inputRegister"}
            type={"password"}
            placeholder={"Vérification mot de passe"}
            name={"confirmPassword"}
            value={securePassword}
            onchange={(e) => setSecurePassword(e.target.value)}
          />
          <div className="text-white">{loading ? "" : "chargement..."}</div>
          <Button
            disabled={!loading}
            className={
              loading
                ? "buttonRegister"
                : "buttonRegister opacity-4 cursor-not-allowed"
            }
            value={"S'enregistrer"}
          />
        </form>
      </div>
    </>
  );
}
