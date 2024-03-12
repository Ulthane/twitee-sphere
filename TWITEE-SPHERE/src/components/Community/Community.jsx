import Button from "../Button/Button";

export default function Community({ communitiesToDisplay }) {
  return (
    <>
      {communitiesToDisplay.map((community, index) => (
        <div
          key={index}
          className="rounded-[25px] p-5 w-[600px] h-[auto] community mb-[15px]"
          style={{ background: "rgba(42, 163, 239, 0.1)" }}
        >
          {/* Mapping des communautés pour afficher dynamiquement */}
          {console.log(community.id_communities)}
          <div className="flex justify-between mb-[5px]">
            <h3>profil ..</h3>
            <img
              className="w-[40px] h-[30px] object-contain rounded-[10px]"
              src={community.icon}
              alt="icone de la communauté"
            />
          </div>
          <h2 className="text-blueLogo text-[36px]">
            <b>{community.name}</b>
          </h2>
          <p className="text-[16px]">{community.description}</p>
          <div className="mt-[15px] flex justify-between items-center">
            <div className="flex items-center">
              <img
                className="mr-[10px]"
                src="../../public/Icons/user/user_white.svg"
                alt="icone user"
              />
              <p>2532</p>
            </div>
            <Button
              click={() => handleClick()}
              value={Rejoindre}
              className={
                "transition-all duration-200 ease-in-out hover:font-bold  hover:bg-blue-500"
              }
            />
          </div>
        </div>
      ))}
    </>
  );
}
