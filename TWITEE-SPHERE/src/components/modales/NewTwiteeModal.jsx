// Librairie
import { createPortal } from "react-dom";
import { useRef } from "react";
<<<<<<< HEAD
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import route from "../../routes/route";
=======
import { IoImageOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
// Hooks
import { useToken } from "../../hooks/useToken";
// Composant
import Button from "../Button/Button";
>>>>>>> c40b7c066efb2470024d25fb52a088574cc70dad

export default function NewTwiteeModal({ updateStateModalDisplay }) {
  //hooks
  const navigate = useNavigate();
  //ref
  const twitee = useRef();
  const twiteeImg = useRef();

  // variables
  const { getToken } = useToken();
  const articleImg = useRef();

  //METHODES
  const sendNewTwiteeHandle = async (event) => {
    event.preventDefault();

<<<<<<< HEAD
    console.log("Twitee: " + twitee.current.value);
    console.log("TwiteeImgUrl: " + twiteeImg.current.value);

    const response = await fetch(
=======
    const request = await fetch(
>>>>>>> c40b7c066efb2470024d25fb52a088574cc70dad
      "https://twitee-api.gamosaurus.fr/api/articles/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
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
<<<<<<< HEAD
      //Close New Twitee Modale
=======
>>>>>>> c40b7c066efb2470024d25fb52a088574cc70dad
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
          <div className="w-[920px] backdrop-blur-md bg-blueBgArticle/50 text-white flex flex-col justify-center items-center gap-2 rounded-xl">
            <div className="absolute right-5 top-5 hover:text-blueLogo hover:cursor-pointer">
              <div
                className="text-[35px]"
                onClick={(event) => {
                  event.stopPropagation();
                  updateStateModalDisplay(false);
                }}
              >
                <IoCloseCircleOutline />
              </div>
            </div>

            <form
              onSubmit={(event) => sendNewTwiteeHandle(event)}
              className="flex flex-col justify-center items-center gap-4"
            >
<<<<<<< HEAD
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
=======
              <h2 className="text-[32px] my-5 font-bold font-poppins">
                <span className="text-blueLogo">T</span>witee{" "}
                <span className="text-blueLogo">M</span>essage
              </h2>
              <textarea
                name="newTwitee"
                id="newTwitee"
                cols="50"
                rows="10"
                ref={twitee}
                placeholder="Ecrivez votre message..."
                className="p-5 font-poppins font-bold text-[16px] w-[600px] border-0 rounded-3xl bg-blueLogo/10 text-white focus:outline-none resize-none"
              ></textarea>
              <div className="relative flex flex-column">
                <input
                  className="pl-[65px] relative bg-blueLogo/10 w-[600px] h-[50px] border-none rounded-full text-white focus:outline-none my-3 text-[16px] font-bold font-poppins placeholder:text-gray-300 placeholder:font-bold placeholder:text-[16px] placeholder:font-poppins;"
                  type="text"
                  ref={articleImg}
                  placeholder="Lien vers une image"
                  name="article_image"
                />
                <IoImageOutline className="absolute left-5 top-6 text-[25px] text-white" />
              </div>
              <Button
                value="Envoyer"
                w="250px"
                h="50px"
                className="mb-10 bg-blueLogo hover:bg-blueLogoDark"
              />
>>>>>>> c40b7c066efb2470024d25fb52a088574cc70dad
            </form>
          </div>
        </div>,
        document.querySelector("body")
      )}
    </>
  );
}
