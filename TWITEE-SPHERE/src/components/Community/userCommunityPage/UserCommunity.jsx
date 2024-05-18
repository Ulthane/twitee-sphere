// import { toast } from "react-toastify";
// //composant
// import IconeCommunity from "../iconeCommunity/IconeCommunity";

// //hook
// import { useEffect, useState } from "react";
// import { useFetchCommunity } from "../../../hooks/useFetchCommunity";

// export default function UserCommunity() {
//   //Hook personaliser

//   const { fetchProfil } = useFetchCommunity();
//   //state
//   const [userData, setUserData] = useState(null);

//   // fetch profil user
//   const userDisplay = async () => {
//     try {
//       const json = await fetchProfil();
//       setUserData(json);
//     } catch (e) {
//       toast.error("Erreur lors du chargement du profil");
//     }
//   };

//   //affichage
//   useEffect(() => {
//     userDisplay();
//   }, []);

//   return (
//     <div className="flex justify-between items-center">
//       {userData && (
//         <>
//           <div>
//             <img
//               className="w-[25px] mr-4"
//               src="https://cdn.pixabay.com/photo/2013/07/13/10/50/one-eyed-monster-157897_960_720.png"
//               alt="Photo de profil"
//             />
//           </div>
//           <div>
//             <p className="text-lg">
//               <b>{userData.firstname + " " + userData.lastname}</b>
//             </p>
//             <p className="text-sm">{userData.surname}</p>
//           </div>
//           <div className="items-center ml-[50px]">
//             <IconeCommunity />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
