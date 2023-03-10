import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
    const navigate = useNavigate();

    return <div className="home">
        <p className="home-heading">Welcome to eLitmus</p>
        <button className="home-button" onClick={() => navigate('/admin')}>Admin Portal</button>
    </div>;
}

export default Home;