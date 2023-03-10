import React, { useEffect, useState } from 'react'
import { validateCreds } from '../../../actions';
import { useNavigate } from 'react-router-dom';


const Verification = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("Verifying your details...")
    function decompress(string) {
        var newString = '', char, codeStr, firstCharCode, lastCharCode;
        string = decodeURIComponent(escape(atob(string)));
        for (var i = 0; i < string.length; i++) {
            char = string.charCodeAt(i);
            if (char > 132) {
            codeStr = char.toString(10);
            firstCharCode = parseInt(codeStr.substring(0, codeStr.length - 2), 10);
            lastCharCode = parseInt(codeStr.substring(codeStr.length - 2, codeStr.length), 10) + 31;
            newString += String.fromCharCode(firstCharCode) + String.fromCharCode(lastCharCode);
            } else newString += string.charAt(i);
        }
        return newString;
    }
    const key = (new URLSearchParams(window.location.search)).get('id');
    const data = JSON.parse(decompress(key));
    async function validate(){
        const validation = await validateCreds(data);
        if (validation.status === 200) navigate('/test', {state: data});
        else setMessage(validation.message);
    }
    useEffect(()=>{
        validate();
    },[])
    return (
    <div style={{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'        
    }}>
        <h2 style={{color: "#fff", fontSize: '3rem'}}>{message}</h2>
    </div>);
}
export default Verification