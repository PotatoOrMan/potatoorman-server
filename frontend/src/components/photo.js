import React, { useEffect, useState, useRef } from "react";
import './css/photo.css';
import WebcamCapture from "./webcamCapture";
import { useLocation, Link } from "react-router-dom";
import html2canvas from "html2canvas";
import { saveAs } from 'file-saver';
// import * as fs from 'fs';


function PhotoModal() {
  return (
    <div className="photoModalContainer">
      <div className='photoModal'>
        <p className='modalText'>사진을 찍어주세요!</p>
        <div className='spacebar'>space</div>
      </div>
    </div>
  );
}

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

function CapturedImage({ capturedImage, potatoIdx }) {
  const captureRef = useRef(null);
  const [capturedURL, setCapturedURL] = useState("");
  const [email, setEmail] = useState("");

  // 이미지 캡쳐 기능
  const handleCapture = () => {
    html2canvas(captureRef.current).then(canvas => {
      canvas.toBlob(async (blob) => {
        const filename = "captured_image_" + (Date.now()) + ".png"
        // const buffer = Buffer.from( await blob.arrayBuffer() );
        // fs.writeFileSync(filename, buffer );
        // saveAs(blob, filename);
        fetchData(blob); // 캡쳐한 이미지를 서버로 전송
      }, "image/png");
    });
  };

  const fetchData = async (capturedImage) => {
    try {
      // let id
      const formData = new FormData();
      formData.append('image', capturedImage);

      // const rr = await fetch('http://localhost:8081/savephotoApi/save', {
      //   method: "POST"
      // })
      // console.log(rr.text())

      const response = await fetch(`http://localhost:8081/savephotoApi/save`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to send image');
      }

      const result = await response.json()
      console.log('Server Response:', result);

      // 이메일 전송 요청
      const emailResponse = await fetch(`http://localhost:8081/savephotoApi/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, filepath: result.filepath })
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send email');
      }

      const emailResult = await emailResponse.text();
      console.log('Email Response:', emailResult);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // handleCapture();

  return (
    <>
      <div className="capturedImageContainer">
        <div className="captureImgBorder" ref={captureRef}>
          <img src={capturedImage} alt="Captured" style={{ transform: 'scaleX(-1)' }} /> {/* 사진 거울모드로 반전 */}
          <img src={`../images/frames/frame_${potatoIdx}.png`} className="Frame" alt="photoframe" />
          {capturedURL && <img src={capturedURL} alt="Captured URL" style={{ width: '200px' }} />}
        </div>
      </div>
      <div className="sendEmail">
        <p>사진을 전송하시겠습니까?</p>
        <input type='email' placeholder="이메일 입력" className="sendInput" />
        <div className="buttonContainer">
          <Link to="/"><button style={{ backgroundColor: '#575757', marginRight: '130px' }}>아니요</button></Link>
          {/* <Link to="/"><button onClick={handleCapture}>전송</button></Link> */}
          <button onClick={handleCapture}>전송</button>
        </div>
      </div>
    </>
  );
}

function WebCam({ setCapturedImage, time, potatoIdx }) {
  return (
    <div className="webcamContainer">
      <div className="webcamBorder">
        <WebcamCapture onCapture={setCapturedImage} />
        <p className="timeText">{time <= 5 && time}</p>
        <img src={`../images/frames/frame_${potatoIdx}.png`} className="Frame" alt="photoframe" />
      </div>
    </div>
  );
}

export default function Photo() {
  const [bgImg, setBgImg] = useState('url(../images/backgrounds/play_background1.png)');
  const [showModal, setShowModal] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);
  const [time, setTime] = useState(10);
  const location = useLocation();
  let potatoIdx = location.state.potatoIdx - 1;

  if (location.state.success === 'X') potatoIdx = location.state.potatoIdx + 4; // 실패하면 감자 프레임이 나오도록 설정

  useEffect(() => {
    document.body.style.backgroundImage = bgImg;
  }, [bgImg]);

  // space 누르면 모달창 사라지고 사진 찍을 수 있도록 설정
  useEffect(() => {
    const handleModal = (e) => {
      if (e.key === ' ' || e.key === 'Space') {
        setShowModal(false);
        setBgImg('url(../images/backgrounds/home_background.png)');
      }
    };
    document.addEventListener('keydown', handleModal);
    return () => document.removeEventListener('keydown', handleModal);
  }, []);

  useEffect(() => {
    if (time > 1 && !showModal) {  // 타이머가 무한반복 하지 않도록
      const timeId = setTimeout(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timeId);
    }
  }, [time, showModal]);

  return (
    showModal ?
      <PhotoModal />
      :
      capturedImage ?
        <CapturedImage capturedImage={capturedImage} potatoIdx={potatoIdx} />
        :
        <WebCam setCapturedImage={setCapturedImage} time={time} potatoIdx={potatoIdx} />
  );
}


//filesaver