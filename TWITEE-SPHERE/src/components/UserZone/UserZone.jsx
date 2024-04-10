//Utils
import { firstLetterUpperCase } from "../../utils/stringFunction";
import route from "../../routes/route";

//Librairies
import { Link } from "react-router-dom";

export default function UserZone({ userInformations }) {
  //JSX
  return (
    <>
      <div className="flex flex-row justify-center items-center gap-2">
        {/* user's picture */}
        <img
          className="w-[70px]  shadow-lg "
          src={userInformations.img_src}
          alt="user's picture"
          style={{ clipPath: "ellipse(33% 50%)" }}
        />
        {/* User first name and last name */}
        <span className=" font-bold">
          <Link
            to={route.USER_INFORMATION}
            state={{ authorId: userInformations.id_user }}
          >
            {firstLetterUpperCase(userInformations.firstname) +
              " " +
              firstLetterUpperCase(userInformations.lastname)}
          </Link>
        </span>
      </div>
    </>
  );
}
