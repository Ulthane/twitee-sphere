//Hooks
import { useContext } from "react";
import { useToken } from "../../hooks/useToken.jsx";

//Utils
import { postFetch } from "../../utils/Fetch.js";

//Components
import ModaleTempalte from "../modales/ModaleTemplate";
import Button from "../Button/Button.jsx";

//Context
import { TwiteeContext } from "../../store/TwiteeContext.jsx";

//Librairies
import { toast } from "react-toastify";

export default function ReTwiteeModal({ displayModaleHandler, twiteeValue }) {
  //Context
  const { setRefreshHomeFromContext } = useContext(TwiteeContext);

  //Variable
  const token = useToken();

  // Méthode

  const reTwiteeHandler = async () => {
    // console.log(twiteeValue.textValue);
    // console.log(twiteeValue.imgSrcValue);

    const request = await postFetch(
      "https://twitee-api.gamosaurus.fr/api/articles/create",
      { Authorization: token.getToken() },
      {
        description: twiteeValue.textValue,
        img_src: twiteeValue.imgSrcValue,
      }
    );

    if (request.message !== "success") {
      toast.error(request.message);
    } else {
      setRefreshHomeFromContext();
      displayModaleHandler(false);
    }
  };

  return (
    <>
      <ModaleTempalte displayModaleHandler={displayModaleHandler}>
        <div className="m-6 flex flex-col justify-center items-center ">
          <h2 className=" text-2xl font-bold my-4">
            Souhaitez-vous ReTwitee ce message ?
          </h2>
          <Button
            value="Oui"
            w="200px"
            h="50px"
            className="bg-blueLogo hover:bg-blueLogoDark my-2"
            fn={() => reTwiteeHandler()}
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
    </>
  );
}
