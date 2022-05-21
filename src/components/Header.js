import React, { useState, useEffect, } from "react";
import axios from "axios";
import { API_URL, } from "../utils/constants";
import { Link } from "react-router-dom";
import '../style/header.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

function Header(props) {

    const [user, updateUser] = useState({});

    useEffect(() => {
        if (localStorage.getItem("token")) {
          axios.get(API_URL + "/auth/user_data",
              {
                headers: {
                  token: localStorage.getItem("token")
              },
          })
          .then(res => {
            updateUser(res.data);
          })
          .catch(err => console.log(err));
        }
      }, [localStorage.getItem("token")])

    const ROLE_MAP = {
        1: "Admin",
        2: "Moderator",
        3: "Provider",
    }
    
    useEffect(() => {
        if (localStorage.getItem("token")) {
            axios.get(API_URL + "/auth/user_data",
                {
                    headers: {
                    token: localStorage.getItem("token")
                },
            })
            .then(res => {
                updateUser(res.data);
            })
            .catch(err => console.log(err));
        }
    }, [localStorage.getItem("token")])

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
                users: [1],
            },
        ]

        return categories
            .filter(category => category.users.includes(user.role))
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
                    <li> ROLE: <span className="user-data">{ROLE_MAP[user.role]}</span></li>
                    <li> LOCATION: <span className="user-data">{user.location?.name}</span></li>
                    <li> EMAIL: <span className="user-data">{user.email}</span></li>
                    <li> PHONE: <span className="user-data">{user.phone}</span></li>
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