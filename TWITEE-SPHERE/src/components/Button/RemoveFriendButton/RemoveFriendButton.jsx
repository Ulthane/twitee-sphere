// React
import { useState } from "react";

//Components
import ModaleTempalte from "../../modales/ModaleTemplate";
import Button from "../Button";

// Utils
import { deleteFetch } from "../../../utils/Fetch";
import { useToken } from "../../../hooks/useToken";

export default function RemoveFriendButton({
  firstName,
  lastName,
  idUser,
  ...props
}) {
  //STATES
  const [removeFriendModalDisplay, setRemoveFriendModalDisplay] =
    useState(false);

  //Variables
  const token = useToken();

  //METHODES

  const displayModaleHandler = (value) => {
    setRemoveFriendModalDisplay(value);
  };

  const RemoveFriendHandler = async () => {
    console.log("idUser");
    console.log(idUser);
    const request = await deleteFetch(
      "https://twitee-api.gamosaurus.fr/api/friends/delete",
      { Authorization: token.getToken() },
      { "Content-Type": "application/json", friend: idUser }
    );

    console.log(request);

    if (request.message !== "success") {
      toast.error(request.message);
    } else {
      displayModaleHandler(false);
    }
  };

  return (
    <>
      <div onClick={() => displayModaleHandler(true)}>
        <Button
          value="Supprimer"
          w="80px"
          h="30px"
          className="bg-blueLogo hover:bg-blueLogoDark my-2"
          textSize="0.6rem"
          fn={() => displayModaleHandler()}
        />
      </div>

      {removeFriendModalDisplay && (
        <ModaleTempalte displayModaleHandler={displayModaleHandler}>
          <div className="m-6 flex flex-col justify-center items-center ">
            <h2 className=" text-2xl font-bold my-4">
              Voulez-vous supprimer {firstName + " " + lastName} de vos ami(e)s
              ?
            </h2>
            <Button
              value="Oui"
              w="200px"
              h="50px"
              className="bg-blueLogo hover:bg-blueLogoDark my-2"
              fn={() => RemoveFriendHandler()}
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
