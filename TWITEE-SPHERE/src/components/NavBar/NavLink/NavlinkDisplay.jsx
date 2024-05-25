import { NavLink } from "react-router-dom";
import classes from "./NavlinkDisplay.module.css";

export default function NavlinkDisplay({ route, img = "none", value }) {
    return (
        <NavLink
            to={route}
            className={({ isActive }) =>
                isActive ? classes.navlinksActive : classes.navlinks
            }
        >
            {img}
            <span>{value}</span>
        </NavLink>
    );
}
