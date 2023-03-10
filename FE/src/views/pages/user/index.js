import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserData } from "../../../actions";
import moment from "moment";
import './user.css';
import UserCard from "../../components/userCard";

const User = () => {
    const [loaded, setLoaded] = useState(false);
    const [userData, setUserData] = useState({});
    const params= useParams();
    async function getUserInfo(){
        const data = await getUserData(params);
        setUserData(data.data);
        setLoaded(true);
    }
    function setData(){
        return userData.map((ele,ind) => {
            return <UserCard key={ind} props={ele}/>;
        })
    }
    useEffect(()=>{
        getUserInfo();
    }, [])
    return <>
    <p className="user-heading">Proctoring for:- <span className="user-heading-span">{params.key.split('-')[0]}</span></p>
    <div className="user-container">
    <p className="user-code-text">Code:- {params.key.split('-')[1]}</p>
    <div className="user-data-container">
    {
        loaded ? setData() : <p className="user-loading">Loading</p>
    }
    </div>
    </div>
    </>
}

export default User;