export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-100 w-100">
      <div>
        <img
          src="../../public/icons/navbar/homeIcon.svg"
          alt="little house icon"
          width={"30px"}
        />
        <span>Accueil</span>
      </div>
      <div>
        <img
          src="../../public/icons/navbar/fireIcon.svg"
          alt="little house icon"
          width={"30px"}
        />
        <span>Suivie</span>
      </div>
      <div>
        <img
          src="../../public/icons/navbar/frameIcon.svg"
          alt="little house icon"
          width={"30px"}
        />
        <span>Favoris</span>
      </div>
      <div>
        <img
          src="../../public/icons/navbar/communityIcon.svg"
          alt="little house icon"
          width={"30px"}
        />
        <span>Communauté</span>
      </div>
    </div>
  );
}
