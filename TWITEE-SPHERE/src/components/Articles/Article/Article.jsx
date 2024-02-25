import { useState } from "react";

export default function Article({ articleInformations }) {
  const [isOpen, setOpen] = useState(false);

  const DropDown = () => {
    const handleDropDown = () => {
      setOpen(!isOpen);
    };

    return (
      <div className="dropdown">
        <button className=" font-bold" onClick={handleDropDown}>
          ...
        </button>

        <div
          id="dropdown"
          className={`z-10 w-44 bg-blueBgArticle rounded divide-y divide-gray-100 shadow ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className=" z-10 w-44 bg-blueBgArticle rounded-xl divide-y divide-gray-100 shadow ">
            <li>
              <a
                href="#"
                className="block py-2 px-4 rounded-xl hover:bg-blueLogo"
              >
                Options
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="max-w-md p-6 bg-blueBgArticle rounded-3xl shadow">
        {/* Header Container */}
        <div className="flex flex-row justify-between items-center gap-3 mb-3 ">
          {/* User's informations */}
          <div className="flex flex-row justify-center items-center gap-2">
            {/* user's picture */}
            <img
              className="w-[40px] h-[40px] rounded-full shadow-lg"
              src={articleInformations.userInformations.imgProfil}
              alt="default"
            />
            {/* User first name and last name */}
            <span className=" font-bold">
              {articleInformations.userInformations.firstName +
                " " +
                articleInformations.userInformations.lastName}
            </span>
          </div>
          {/* actions and Community */}
          <div className="flex flex-row justify-center items-center gap-3">
            {DropDown()}

            {/* Community's image */}
            <img
              className="w-[40px] h-[40px] rounded-xl"
              src={articleInformations.communityInformations.imgProfil}
              alt="default"
            />
          </div>
        </div>
        {/* article's message */}
        <p className="mb-3 text-sm text-white">{articleInformations.content}</p>
        {/* article's image */}
        <img
          className="rounded-3xl w-max-[500px] h-max-[250px]"
          src={articleInformations.imgSrc}
          alt="default"
        />
        {/* Footer container */}
        <div className="flex flex-row justify-evenly items-center mt-6">
          <div className="flex flex-row gap-1">
            <img
              src="../../../public/icons/article/comentaryIcon.svg"
              alt="comentary icon"
              width={"25px"}
            />
            <span>12</span>
          </div>
          <div className="flex flex-row gap-1">
            <img
              src="../../../public/icons/article/repostIcon.svg"
              alt="repost icon"
              width={"25px"}
            />
          </div>
          <div className="flex flex-row gap-1">
            <img
              src="../../../public/icons/article/likeIcon.svg"
              alt="like icon"
              width={"25px"}
            />
            <span>25</span>
          </div>
          <div className="flex flex-row gap-1">
            <img
              src="../../../public/icons/article/frameIcon.svg"
              alt="frame icon"
              width={"25px"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

// Exemple de l'objet reçu
//      {
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices felis non orci suscipit viverra. Donec tincidunt malesuada ex, iaculis elementum odio elementum sit amet. Proin non arcu dui.",
//     imgSrc:
//       "https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_1280.jpg",
//     userInformations: {
//       firstName: "John",
//       lastName: "Doe",
//       imgProfil:
//         "https://cdn.pixabay.com/photo/2017/01/16/19/54/ireland-1985088_1280.jpg",
//     },
//     communityInformations: {
//       name: "Farmer",
//       imgProfil:
//         "https://cdn.pixabay.com/photo/2016/05/21/10/39/village-1406652_1280.jpg",
//     },
//   },
