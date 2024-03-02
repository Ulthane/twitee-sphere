import { useEffect } from "react";
import ArticlesDisplay from "../components/Articles/ArticlesDisplay";
import { useContext } from "react";
import { TwiteeContext } from "../store/TwiteeContext";

export default function Home() {
  //Context
  const { setUser } = useContext(TwiteeContext);
  // VARIABLE
  const token = sessionStorage.getItem("token");

  //METHOD
  const getUserInformations = async () => {
    const response = await fetch(
      `https://twitee-api.gamosaurus.fr/api/users/get/id`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (response.status !== 200) {
      toast.error(json.message);
    } else {
      let user = await response.json();
      let newUser = { ...user };
      // console.log(newUser);
      setUser(newUser);
    }
  };

  //CYCLE
  useEffect(() => {
    getUserInformations();
  }, []);

  return (
    <>
      <h1 className="text-2xl">Home</h1>
      <ArticlesDisplay />
    </>
  );
}
