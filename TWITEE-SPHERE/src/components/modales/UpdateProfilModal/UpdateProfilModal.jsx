// Librairie
import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

// Hooks
import { useToken } from "../../../hooks/useToken";
// Composant
import Button from "../../Button/Button";
import { toast } from "react-toastify";

//Utils
import { putFetch } from "../../../utils/Fetch";

//Style
import classes from "./UpdateProfilModal.module.css";

export default function UpdateProfilModal({
    userInformations,
    displayModaleHandler,
}) {
    //State
    const [userInfo, setUserInfo] = useState(userInformations);

    //ref
    const email = useRef();
    const profilImg = useRef();

    // variables
    const token = useToken();

    //METHODES

    const updateProfilHandler = async (event) => {
        event.preventDefault();

        if (email.current.value == "") {
            toast.error("L'email ne peut être vide !");
        } else {
            putFetch(
                `https://twitee-api.gamosaurus.fr/api/users/modify`,
                { Authorization: token.getToken() },
                {
                    email: email.current.value,
                    img_src: profilImg.current.value,
                }
            )
                .then((res) => {
                    toast.success(res.message);
                    event.stopPropagation();
                    displayModaleHandler(false);
                })
                .catch((err) => toast.error(err.message));
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
                                    displayModaleHandler(false);
                                }}
                            >
                                <IoCloseCircleOutline />
                            </div>
                        </div>

                        <form
                            onSubmit={(event) => {
                                updateProfilHandler(event);
                            }}
                            className="flex flex-col justify-center items-center gap-4"
                        >
                            <h2 className="text-[32px] my-5 font-bold font-poppins">
                                <span className="text-blueLogo">U</span>dapte{" "}
                                <span className="text-blueLogo">P</span>rofil
                            </h2>
                            {/* Email */}
                            <div className={classes.inputDiv}>
                                <label
                                    htmlFor="email_user"
                                    className={classes.labelInput}
                                >
                                    Email
                                </label>
                                <input
                                    className={classes.input}
                                    type="mail"
                                    ref={email}
                                    placeholder="Votre email"
                                    name="email_user"
                                    id="email_user"
                                    value={userInfo.email}
                                    onChange={(event) => {
                                        setUserInfo({
                                            ...userInfo,
                                            email: event.target.value,
                                        });
                                    }}
                                />
                            </div>

                            {/* Image Profil */}
                            <div className={classes.inputDiv}>
                                <label
                                    htmlFor="email_user"
                                    className={classes.labelInput}
                                >
                                    Image de profil
                                </label>
                                <input
                                    className={classes.input}
                                    type="text"
                                    ref={profilImg}
                                    placeholder="Lien vers une image"
                                    name="article_image"
                                    value={userInfo.img_src}
                                    onChange={(event) => {
                                        setUserInfo({
                                            ...userInfo,
                                            img_src: event.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <Button
                                value="Mettre à jour"
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
        </>
    );
}
