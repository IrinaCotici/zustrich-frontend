import React, { useContext, } from "react";
import { Link } from "react-router-dom";
import '../style/header.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

function Header(props) {
    const getLingks = () => {
        const categories = [
            {
                label: "REQUESTS",
                to: "/requests",
                users: [1, 2, 3],
            },
            {
                label: "LOCATIONS",
                to: "/locations",
                users: [1, 2],
            },
            {
                label: "USERS",
                to: "/users",
                users: [1, 2],
            },
        ]

        return categories
            .map((category , idx) => (
                <Link
                    key={ `link-${ idx }` }
                    className=""
                    data-menu-name={ category.label }
                    to={ category.to }>
                    { category.label }
                </Link>
        ))
    }

    return (
        <div className="header-wrapper">
            <div className="header-container">
                <Link
                    to="/requests"
                    className="">
                    <img
                        className="small-logo"
                        alt="logo"
                        src="/logo.png" />
                </Link>
                <div className="tabs btn-15">
                    { getLingks() }
                </div>
                <div className="profile">
                  <AccountCircleIcon fontSize="large" />
                  <span> USERNAME </span>
                  <ul className="tooltip">
                    <li> ROLE: <span>ceva</span></li>
                    <li> LOCATION: <span>ceva</span></li>
                    <li> EMAIL: <span>ceva</span></li>
                    <li> PHONE: <span>ceva</span></li>
                    <li className="logout">
                    <Link
                        to='/login'>
                        Logout
                        <LogoutIcon></LogoutIcon>
                    </Link>
                    </li>
                  </ul>
                </div>
            </div>
        </div>
    );
}
  
export default Header;