import React, { useEffect, useState } from "react";
import TestCard from "../../components/testCard";
import { getAllTests } from "../../../actions";
import './admin.css';

const Admin = () => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [testsData, setTestsData] = useState({});
    function getAlltets(){
        return testsData.map((ele,ind) => {
            return <TestCard  key={ind} data={ele}/>
        })        
    }
    async function loadAllTests(){
        const resp = await getAllTests();
        setTestsData(resp);
        setDataLoaded(true);
    }
    useEffect(()=>{
        loadAllTests();
    },[]);
    return(
        <>
            <p className="admin-heading">All Tests</p>
            <div className="admin-container">
            {dataLoaded ? getAlltets() : <p className="admin-loading">Loading</p>}
            </div>
        </>
    )
}

export default Admin;