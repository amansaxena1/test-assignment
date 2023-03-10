import React from "react";
import moment from "moment";
import './userCard.css';

const UserCard = ({props}) => {
    return <div className="user-card-data-box">
    <img className="user-card-data-img" src={props.img} alt={props.timestamp}/>
    <div className="user-card-data-time-container">
    <p className="user-card-data-time-text">{props.timestamp}</p>
    <p className="user-card-data-time-text">{moment.unix(props.timestamp/1000).format("hh:mm:SS A")} at<span className="user-card-data-date-text"> {moment.unix(props.timestamp/1000).format("DD-MM-YYYY")}</span></p>
</div></div>
}

export default UserCard;