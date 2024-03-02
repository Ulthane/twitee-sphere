import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import route from "../../routes/route";
import NavlinkDisplay from "./NavLink/NavlinkDisplay";
import NewTwiteeModal from "../modales/NewTwiteeModal";

export default function Home() {
  // STATE
  const [newTwiteeModalDisplay, setnewTwiteeModalDisplay] = useState(false);

  const updateNewTwiteeModalDisplayHandler = (value) => {
    setnewTwiteeModalDisplay(value);
  };

  return (
    <>
      <ul className="flex flex-col justify-center items-start h-75 w-100 gap-y-5">
        {/* Link to home */}
        <li>
          <NavlinkDisplay
            route={route.HOME}
            img={"../../public/icons/navbar/homeIcon_"}
            altValue="little house icon"
            value={"Accueil"}
          />
        </li>
        {/* Link to Follows */}
        <li>
          <NavlinkDisplay
            route={route.FOLLOW}
            img={"../../public/icons/navbar/fireIcon_"}
            altValue="little fire icon"
            value={"Suivis"}
          />
        </li>
        {/* Link to My Favorite */}
        <li>
          <NavlinkDisplay
            route={route.FAVORITE}
            img={"../../public/icons/navbar/frameIcon_"}
            altValue="little frame icon"
            value={"Favoris"}
          />
        </li>
        {/* Link to Community */}
        <li>
          <NavlinkDisplay
            route={route.COMMUNITY}
            img={"../../public/icons/navbar/communityIcon_"}
            altValue="little community icon"
            value={"Community"}
          />
        </li>
        {/* New Twitee button */}
        <li>
          <button
            onClick={() => setnewTwiteeModalDisplay(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl my-4 self-center"
          >
            New Twitee
          </button>
        </li>
      </ul>

      {/* MODALE NEW TWITEE */}
      {
        newTwiteeModalDisplay && (
          <NewTwiteeModal
            updateStateModalDisplay={updateNewTwiteeModalDisplayHandler}
          />
        )
        // ANCIENNE MODALE MAINTENANT DANS LE COMPOSANT NewTwiteeModal
        // createPortal(
        //   <div
        //     className="absolute bottom-0 right-0 left-0 top-0 flex justify-center items-center"
        //     style={{
        //       background: "rgba(0, 0, 0, 0.6)",
        //     }}
        //   >
        //     <div className="py-[20px] px-[40px] bg-blueBgArticle text-white flex flex-col justify-center items-center gap-2 rounded-xl">
        //       <div className="self-end  hover:bg-white hover:rounded-full">
        //         <img
        //           src="https://cdn.icon-icons.com/icons2/1157/PNG/512/1487086345-cross_81577.png"
        //           alt="cross"
        //           width={"20px"}
        //           onClick={(event) => {
        //             event.stopPropagation();
        //             setnewTwiteeModalDisplay(false);
        //           }}
        //         />
        //       </div>

        //       <form
        //         onSubmit={(event) => sendNewTwiteeHandle(event)}
        //         className="flex flex-col justify-center items-center gap-4"
        //       >
        //         <h2 className="text-xl font-semibold">Nouveau Twitee</h2>
        //         <textarea
        //           name="newTwitee"
        //           id="newTwitee"
        //           cols="50"
        //           rows="5"
        //           ref={twitee}
        //           className=" border-2 rounded-md  text-black"
        //         ></textarea>
        //         <button
        //           type="submit"
        //           className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl mt-3"
        //         >
        //           Envoyer
        //         </button>
        //       </form>
        //     </div>
        //   </div>,
        //   document.querySelector("body")
        // )
      }
    </>
  );
}
