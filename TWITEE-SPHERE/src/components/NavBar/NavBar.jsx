import classes from "./NavBar.module.css";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Home() {
  // STATE
  const [newTwiteeModalDisplay, setnewTwiteeModalDisplay] = useState(false);

  //ref
  const twitee = useRef();

  // variables
  const token = sessionStorage.getItem("token");

  //METHODES
  const sendNewTwiteeHandle = async (event) => {
    event.preventDefault();

    // console.log(twitee.current.value);

    const request = await fetch(
      "https://twitee-api.gamosaurus.fr/api/articles/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ description: `${twitee.current.value}` }),
      }
    );

    if (!request.ok) {
      alert("Un probleme est survenu lors du chargement...");
    } else {
      let data = await request.json();
      console.log(twitee.current.value);
      console.log(data);
      setnewTwiteeModalDisplay(false);
    }
  };
  return (
    <>
      <ul className="flex flex-col justify-center items-start h-75 w-100 gap-y-5">
        {/* Link to home */}
        <li>
          <img
            src="../../public/icons/navbar/homeIcon.svg"
            alt="little house icon"
            width={"30px"}
          />
          <span>Accueil</span>
        </li>
        {/* Link to Follows */}
        <li>
          <img
            src="../../public/icons/navbar/fireIcon.svg"
            alt="little house icon"
            width={"30px"}
          />
          <span>Suivie</span>
        </li>
        {/* Link to My Favorite */}
        <li>
          <img
            src="../../public/icons/navbar/frameIcon.svg"
            alt="little house icon"
            width={"30px"}
          />
          <span>Favoris</span>
        </li>
        {/* Link to Community */}
        <li>
          <img
            src="../../public/icons/navbar/communityIcon.svg"
            alt="little house icon"
            width={"30px"}
          />
          <span>Communauté</span>
        </li>
        {/* New Twitee button */}
        <li>
          <button
            onClick={() => setnewTwiteeModalDisplay(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4 self-center"
          >
            New Twitee
          </button>
        </li>
      </ul>

      {/* MODALE NEW TWITEE */}
      {newTwiteeModalDisplay &&
        createPortal(
          <div
            className="absolute bottom-0 right-0 left-0 top-0 flex justify-center items-center"
            style={{
              background: "rgba(0, 0, 0, 0.6)",
            }}
          >
            <div className="p-[30px] bg-white flex flex-col justify-center items-center">
              <img
                src="https://cdn.icon-icons.com/icons2/1157/PNG/512/1487086345-cross_81577.png"
                alt="cross"
                width={"20px"}
                onClick={(event) => {
                  event.stopPropagation();
                  setnewTwiteeModalDisplay(false);
                }}
                className="self-end"
              />
              <form onSubmit={(event) => sendNewTwiteeHandle(event)}>
                <h1 className="text-xl font-semibold">Nouveau Twitee</h1>
                <textarea
                  name="newTwitee"
                  id="newTwitee"
                  cols="30"
                  rows="10"
                  ref={twitee}
                  className=" border-2 rounded-md"
                ></textarea>
                <button
                  type="submit"
                  className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>,
          document.querySelector("body")
        )}
    </>
  );
}
