import React from "react";
import { NavLink } from "react-router-dom";

const TopNav = () => {
    return (
        <div className="border flex justify-between">
            <img
                className="w-28"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
                alt=""
            />

            <div className="py-2 px-2">
                <NavLink to="/" className="mr-3">
                    Home
                </NavLink>
                <NavLink to="/pokemon" className="mr-3">
                    Pokemon
                </NavLink>
            </div>
        </div>
    );
};

export default TopNav;
