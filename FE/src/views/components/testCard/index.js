import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./testCard.css";
import { updateIntervalOrDuration } from "../../../actions";
const TestCard = (props) => {
    const navigate = useNavigate();
    const [editableInterval , setEditableInterval] = useState(() => false);
    const [editableDuration , setEditableDuration] = useState(() => false);
    const [interval,setInterval] = useState(props.data.interval);
    const [duration,setDuration] = useState(props.data.duration);

    const edit = async (key) => {
        if(key === "interval") setEditableInterval((editableInterval) => !editableInterval);
        else setEditableDuration((editableDuration) => !editableDuration);
    }

    const save = async(key) => {
        const obj = {
            code:props.data.code,
            key:key,
            value:key === "interval" ? interval : duration
        };
        console.log(obj)
        await updateIntervalOrDuration(obj);
        edit(key);
    }

    function getAllUsers(){
        return props.data.attemptedBy.map((ele,ind) => {
            return (
                <button key={ind} onClick={()=> navigate(`/user/${ele+"-"+props.data.code}`)} className='test-card-button' >
                    <div className="test-card-button-line-border"></div>
                    <div className="test-card-button-box">
                        <p className="test-card-button-box-text">{ele}</p>
                    </div>
                </button>
            )
        })
    }
    function secondsToDhms(seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600*24));
        var h = Math.floor(seconds % (3600*24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);
        
        var dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
        var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
    }

    const handleIntervalChange = (event) => {
        setInterval(event.target.value);
      };

    const handleDurationChange = (event) => {
        setDuration(event.target.value);
    };

    return(
        <div className="test-card-container">
            <div className="test-card-sub-box-container"> 
                <div className="test-card-sub-info-one-container">
                    <p className="test-card-one-text">{props.data.name}</p>
                    <p className="test-card-one-text">{`(${props.data.code})`}</p>
                </div>
                <div className="test-card-sub-info-two-container">
                    <div className="test-card-config-container">
                        <p className="test-card-two-text">Interval:</p>
                        <div className="test-card-config-sub-container">
                            {
                                editableInterval ? 
                                <div className="test-card-config-sub-container-box">
                                    <input className="test-card-config-sub-container-box-input" placeholder="Enter in milliseconds" type="number" onChange={handleIntervalChange}></input>
                                    <button className="test-card-config-sub-container-box-btn" onClick={() => save("interval")}>💾</button>
                                </div> : 
                                <div className="test-card-config-sub-container-box">
                                    <p className="test-card-two-text">{secondsToDhms(interval/1000)}</p>
                                    <button className="test-card-config-sub-container-box-btn" onClick={() => edit("interval")}>🖊️</button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="test-card-config-container">
                        <p className="test-card-two-text">Duration:</p> 
                        <div className="test-card-config-sub-container">
                            {
                                editableDuration ? 
                                <div className="test-card-config-sub-container-box">
                                    <input className="test-card-config-sub-container-box-input" placeholder="Enter in milliseconds" type="number" onChange={handleDurationChange}></input>
                                    <button className="test-card-config-sub-container-box-btn" onClick={() => save("duration")}>💾</button>
                                </div> : 
                                <div className="test-card-config-sub-container-box">
                                    <p className="test-card-two-text">{secondsToDhms(duration/1000)}</p>
                                    <button className="test-card-config-sub-container-box-btn" onClick={() => edit("duration")}>🖊️</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="test-card-users-container">
            <div className="test-card-line-border"></div>
            <div>
            {getAllUsers()}
            </div>
            </div>
        </div>
    )
}

export default TestCard;