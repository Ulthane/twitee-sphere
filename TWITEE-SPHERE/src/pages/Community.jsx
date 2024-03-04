import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import Logo from "../components/Logo/Logo";
import NavBar from "../components/NavBar/NavBar";
import "../../public/Icons/searchBar/search_white.svg";

export default function Community() {
  return (
    <div className="h-screen gradientBackGround text-white grid grid-rows-[1fr_10fr_0.5fr] box-border ">
      <div className="px-4 py-2 flex justify-between ">
        {/* HEADER */}
        <Logo />
        <div className="relative">
          <Input
            type={"search"}
            placeholder={"Rechercher"}
            className="placeholder:pl-5 "
          />
          <img
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            width="20"
            height="20"
            src="../../public/Icons/searchBar/search_white.svg"
            alt="icone search"
          />
        </div>
        <h2>Profil..</h2>
      </div>

      <div className="h-full grid gap-6 grid-cols-[1fr_2fr_1fr] grid-rows-1 px-4 py-2 overflow-y-auto">
        <div className="flex flex-col justify-center items-start p-2 sticky top-0 mx-auto">
          {/* SideBar Menue */}
          <NavBar />
        </div>
        <div className=" h-full w-[600px] ">
          <div
            className="rounded-[25px] p-5"
            style={{ background: "rgba(42, 163, 239, 0.1)" }}
          >
            <div className="flex justify-between mb-[20px]">
              <h3>John Doe</h3>
              <img
                src="https://pixabay.com/fr/illustrations/chien-chiot-mignonne-dessin-anim%C3%A9-3431913/"
                alt=""
              />
            </div>
            <h2 className="text-blueLogo">Girly friends</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className=" mt-[35px] flex justify-around items-center">
              <p>2532</p>
              <Button value={"Rejoindre"} />
            </div>
          </div>
          {/* Outlet */}
        </div>

        {/* Formulaire de création de communauté */}
        <div className="sticky top-0">
          <form className="p-2 flex justify-center flex-col items-center ">
            <h2 className="text-center mt-[30px]">
              <b>
                <span className="text-blueLogo">Créer</span> en une !
              </b>
            </h2>
            <Input
              placeholder={"Titre"}
              type={"text"}
              className={"mt-[20px] mb-[25px]"}
            />

            <textarea
              style={{ background: "rgba(42, 163, 239, 0.1)" }}
              className=" rounded-[25px] placeholder: p-3 placeholder-white focus:outline-none"
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Description"
            ></textarea>
            <Input
              placeholder={"Lien de votre image"}
              className={"mt-[25px]"}
            />
            <Button value={"Créer moi !"} className={"mt-[20px]"} />
          </form>
        </div>
      </div>

      <div
        className="px-4 py-2"
        style={{ background: "rgba(255,255,255,0.3)" }}
      >
        {/* Footer */}
        FOOTER
      </div>
    </div>
  );
}
