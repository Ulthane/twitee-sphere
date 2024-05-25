// Librairie
import { createPortal } from "react-dom";
import { useContext, useRef, useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";

// Hooks
import { useToken } from "../../hooks/useToken";

// Composant
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { TwiteeContext } from "../../store/TwiteeContext";
import AlerteModal from "./AlertModal";
//Utils
import { postFetch, putFetch } from "../../utils/Fetch";

export default function NewTwiteeModal({
    updateStateModalDisplay,
    value = { textValue: "", imgSrcValue: "" },
    update = false,
    id = "",
    setRefreshHomeHandler = () => {},
}) {
    //Context
    const { setRefreshHomeFromContext } = useContext(TwiteeContext);

    //State
    const [twiteeValue, setTwiteeValue] = useState(value);
    const [alertModalDisplay, setAlertModalDisplay] = useState(false);

    //ref
    const twitee = useRef();
    const articleImg = useRef();

    // variables
    const { getToken } = useToken();
    const token = getToken();

    //METHODES
    const alertModaleDisplayHandler = (value) => {
        setAlertModalDisplay(value);
    };

    const sendNewTwiteeHandler = async (event) => {
        event.preventDefault();

        if (
            twitee.current.value == "" ||
            [...twitee.current.value].length > 281
        ) {
            alertModaleDisplayHandler(true);
        } else {
            const request = await postFetch(
                "https://twitee-api.gamosaurus.fr/api/articles/create",
                { Authorization: token },
                {
                    description: twitee.current.value,
                    img_src: articleImg.current.value,
                }
            );

            if (request.message !== "success") {
                toast.error(request.message);
            } else {
                setRefreshHomeHandler();
                setRefreshHomeFromContext();
                updateStateModalDisplay(false);
            }
        }
    };

    const updateTwiteeHandler = async (event, id) => {
        event.preventDefault();

        if (
            twitee.current.value == "" ||
            [...twitee.current.value].length > 281
        ) {
            alertModaleDisplayHandler(true);
        } else {
            const request = await putFetch(
                `https://twitee-api.gamosaurus.fr/api/articles/modify/${id}`,
                { Authorization: token },
                {
                    description: twitee.current.value,
                    img_src: articleImg.current.value,
                }
            );

            if (request.message !== "success") {
                toast.error(request.message);
            } else {
                setRefreshHomeHandler();
                updateStateModalDisplay(false);
                toast.success("Article mis à jour !");
            }
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
                            onSubmit={(event) => {
                                update
                                    ? updateTwiteeHandler(event, id)
                                    : sendNewTwiteeHandler(event);
                            }}
                            className="flex flex-col justify-center items-center gap-4"
                        >
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
                                defaultValue={twiteeValue.textValue}
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
                                    value={twiteeValue.imgSrcValue}
                                    onChange={(event) => {
                                        setTwiteeValue({
                                            ...value,
                                            imgSrcValue: event.target.value,
                                        });
                                    }}
                                />
                                <IoImageOutline className="absolute left-5 top-6 text-[25px] text-white" />
                            </div>
                            <Button
                                value="Envoyer"
                                w="250px"
                                h="50px"
                                className="mb-10 bg-blueLogo hover:bg-blueLogoDark"
                                type="submit"
                            />
                        </form>
                    </div>
                </div>,
                document.querySelector("body")
            )}

            {alertModalDisplay && (
                <AlerteModal
                    displayModaleHandler={alertModaleDisplayHandler}
                    alertMessage={
                        "Votre twitee doit contenir entre 1 et 281 caractères"
                    }
                />
            )}
        </>
    );
}
