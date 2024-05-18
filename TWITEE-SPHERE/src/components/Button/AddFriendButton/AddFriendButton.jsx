// React
import { useState } from "react";
import { toast } from "react-toastify";
//Components
import AddFriend from "../../../assets/SVG/AddFriend";
import ModaleTempalte from "../../modales/ModaleTemplate";
import Button from "../Button";
// Utils
import { postFetch } from "../../../utils/Fetch";
import { useToken } from "../../../hooks/useToken";

export default function AddFriendButton({ firstName, lastName, idUser }) {
    //STATES
    const [AddFriendModalDisplay, setAddFriendModalDisplay] = useState(false);

    //Variables
    const token = useToken();

    //METHODES
    const displayModaleHandler = (value) => {
        setAddFriendModalDisplay(value);
    };

    const AddFriendHandler = async () => {
        const request = await postFetch(
            "https://twitee-api.gamosaurus.fr/api/friends/create",
            { Authorization: token.getToken() },
            {
                friend: idUser,
            }
        );

        if (request.message !== "success") {
            toast.error(request.message);
        } else {
            displayModaleHandler(false);
            toast.success("Ami ajouté avec succès !");
        }
    };

    return (
        <>
            <div
                onClick={() => displayModaleHandler(true)}
                className="ml-3 absolute bottom-[2px] right-[5px]"
            >
                <AddFriend
                    tailwindClasse={
                        "text-white hover:cursor-pointer hover:text-blueLogo hover:font-semibold"
                    }
                    displayModaleHandler={displayModaleHandler}
                />
            </div>

            {AddFriendModalDisplay && (
                <ModaleTempalte displayModaleHandler={displayModaleHandler}>
                    <div className="m-6 flex flex-col justify-center items-center ">
                        <h2 className=" text-2xl font-bold my-4">
                            Voulez-vous ajouter {firstName + " " + lastName} en
                            ami(e) ?
                        </h2>
                        <Button
                            value="Oui"
                            w="200px"
                            h="50px"
                            className="bg-blueLogo hover:bg-blueLogoDark my-2"
                            fn={() => AddFriendHandler()}
                        />
                        <Button
                            value="Non"
                            w="200px"
                            h="50px"
                            className="bg-blueLogo hover:bg-blueLogoDark my-2"
                            fn={() => displayModaleHandler(false)}
                        />
                    </div>
                </ModaleTempalte>
            )}
        </>
    );
}
