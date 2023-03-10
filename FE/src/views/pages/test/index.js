import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { testDetails, sendImage } from '../../../actions';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Countdown from '../../components/countdown';

import './test.css';
const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}
const Test = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [end, setEnd] = useState(3000);
  const [testDataLoaded, setTestDataLoaded] = useState(false);
  const [testData, setTestData] = useState({});
  const webcamRef = React.useRef(null);
  const data = location.state

  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    const reqObj = {
      img: pictureSrc,
      timestamp: Date.now(),
      key: data.email+"-"+data.code
    }
    sendImage(reqObj);
  });

  async function getTestDetails(obj){
    const resp = await testDetails(obj);
    setTestData(resp);
    setTestDataLoaded(true);
    setEnd(Date.now() + resp.duration);
  }
  

  useEffect(()=>{
    getTestDetails(data);
  },[]);

  useEffect(() => {
    if(testDataLoaded){
      let intervalFun = setInterval(() => {
          if(Date.now() > end) {
            clearInterval(intervalFun);
            navigate('/greet');
          }
          capture();
      }, testData.interval);
    }
 },[end]);
console.log(testData.duration)
  return (
    <div className='test-container'>
      <div className='test-video-container' >
        <p className='test-video-text'> 🔴 REC</p>
        
          <Webcam
            audio={true}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          {testDataLoaded ? <div style={{display: 'flex'}}>
          <p style={{
            color: "#00ddd4",
            fontSize: "1rem",
            marginRight: '4px'
          }}>Ends in:</p>
          <Countdown eventTime={end} interval={1000} /> </div> : null}
      </div>
      <div>
        <p className='test-heading'>eLitmus Test</p>
        <div className='test-question-container'>
          <p className='test-question-heading'>Q. solve the following question</p>
          <div className='test-answer-container'>
            <p className='test-question'>2 + 2 = </p>
            <input className='test-input' placeholder='Enter your answer here'></input>
          </div>
          <Link to="/greet">
            <button className='test-submit'>Submit</button>
          </Link>
          
      </div>
        </div>
        
    </div>
  )
}
export default Test