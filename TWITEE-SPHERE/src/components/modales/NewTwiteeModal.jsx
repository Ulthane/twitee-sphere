import { createPortal } from "react-dom";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import route from "../../routes/route";

export default function NewTwiteeModal({ updateStateModalDisplay }) {
  //hooks
  const navigate = useNavigate();
  //ref
  const twitee = useRef();
  const twiteeImg = useRef();

  // variables
  const token = sessionStorage.getItem("token");

  //METHODES
  const sendNewTwiteeHandle = async (event) => {
    event.preventDefault();

    console.log("Twitee: " + twitee.current.value);
    console.log("TwiteeImgUrl: " + twiteeImg.current.value);

    const response = await fetch(
      "https://twitee-api.gamosaurus.fr/api/articles/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          description: `${twitee.current.value}`,
          img_src: twiteeImg.current.value,
        }),
      }
    );

    if (response.status !== 200) {
      toast.error(json.message);
    } else {
      //Close New Twitee Modale
      updateStateModalDisplay(false);
      //refresh Home
      navigate(route.HOME);
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

              <p>
                <label name="twiteeUrlImg" className="text-xs ">
                  Votre Twitee
                </label>
                <br />
                <textarea
                  name="newTwitee"
                  id="newTwitee"
                  cols="50"
                  rows="5"
                  ref={twitee}
                  className=" border-2 rounded-md  text-black mt-1"
                ></textarea>
              </p>

              <p className=" self-start w-full">
                <label name="twiteeUrlImg" className="text-xs ">
                  Url de votre image
                </label>
                <br />
                <input
                  type="text"
                  name="twiteeUrlImg"
                  id="twiteeUrlImg"
                  ref={twiteeImg}
                  className=" border-2 rounded-md  text-black w-full mt-1"
                />
              </p>

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
