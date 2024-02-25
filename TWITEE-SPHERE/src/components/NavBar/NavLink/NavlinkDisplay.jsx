import { NavLink } from "react-router-dom";
import classes from "./NavlinkDisplay.module.css";

export default function NavlinkDisplay({
  route,
  img = "none",
  altValue = "none",
  value,
  ...props
}) {
  const imgDisplay = (isActive) => {
    return img != "none" ? (
      <img
        src={img + `${isActive ? "Blue" : "White"}.svg`}
        alt={altValue != "none" ? altValue : "icon image"}
        width={"25px"}
      />
    ) : null;
  };

  return (
    <NavLink
      to={route}
      className={({ isActive }) =>
        isActive ? classes.navlinksActive : classes.navlinks
      }
      end
    >
      {({ isActive }) => (
        <>
          {imgDisplay(isActive)}
          <span>{value}</span>
        </>
      )}
    </NavLink>
  );
}
