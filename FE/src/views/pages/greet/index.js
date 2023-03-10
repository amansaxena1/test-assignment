import React from "react";

const Greet = () => {
    return (<div style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"100vh",
        flexDirection:"column"
    }}>
        <p style={{
            color:"#fff",
            fontSize:"4rem"
        }}>Thank you for completing the test</p>
        <p style={{
            color:"#fff",
            fontSize:"3rem",
            marginTop:"10px"
        }}>
        <a href="http://localhost:3000/admin" target="_blank" style={{
            color:"#0088ff",
            textDecoration:"none"
        }}>Click here</a>
        {" "}to visit admin portal
        </p>
    </div>);
}

export default Greet;