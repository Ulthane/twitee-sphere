import { createPortal } from "react-dom";
import { useRef } from "react";
<<<<<<< HEAD
import { toast } from "react-toastify";
=======
>>>>>>> development

export default function NewTwiteeModal({ updateStateModalDisplay }) {
  //ref
  const twitee = useRef();

  // variables
  const token = sessionStorage.getItem("token");

  //METHODES
  const sendNewTwiteeHandle = async (event) => {
    event.preventDefault();

    console.log("Twitee: " + twitee.current.value);
<<<<<<< HEAD

    const response = await fetch(
=======
    console.log("Token: " + token);

    const request = await fetch(
>>>>>>> development
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

<<<<<<< HEAD
    if (response.status !== 200) {
      toast.error(json.message);
    } else {
      let data = await response.json();
=======
    if (!request.ok) {
      alert("Un probleme est survenu lors du chargement...");
    } else {
      let data = await request.json();
      //   console.log(twitee.current.value);
>>>>>>> development
      console.log(data);
      updateStateModalDisplay(false);
    }
  };
  return (
    <>
      {createPortal(
        <div
          className="absolute bottom-0 right-0 left-0 top-0 flex justify-center items-center"
          style={{
            background: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <div className="py-[20px] px-[40px] bg-blueBgArticle text-white flex flex-col justify-center items-center gap-2 rounded-xl">
            <div className="self-end  hover:bg-white hover:rounded-full">
              <img
                src="https://cdn.icon-icons.com/icons2/1157/PNG/512/1487086345-cross_81577.png"
                alt="cross"
                width={"20px"}
                onClick={(event) => {
                  event.stopPropagation();
                  updateStateModalDisplay(false);
                }}
              />
            </div>

            <form
              onSubmit={(event) => sendNewTwiteeHandle(event)}
              className="flex flex-col justify-center items-center gap-4"
            >
              <h2 className="text-xl font-semibold">Nouveau Twitee</h2>
              <textarea
                name="newTwitee"
                id="newTwitee"
                cols="50"
                rows="5"
                ref={twitee}
                className=" border-2 rounded-md  text-black"
              ></textarea>
              <button
                type="submit"
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl mt-3"
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
