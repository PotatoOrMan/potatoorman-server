import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import "./css/story.css";

function InfoBox({ text, changeIndex, person }) {

    return (
        <div className="storyDiv">
            <div className="person-text">{person}</div>
            <div className="text-box">
                <Typewriter
                    options={{
                        strings: text,  // 출력하고 싶은 문자열
                        autoStart: true,    // 자동 시작
                        loop: false,    // 글자가 지워지고 반복 여부
                        delay: 80  // 글자 타이핑 속도
                    }}
                />
            </div>
            <i className="bi bi-caret-right-fill" onClick={() => {
                changeIndex();
            }}></i>
        </div>
    );
}

export default function Story({ storyData, person, limit, navigateURL, resultImgURL, potatoIdx, success }) {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate(); // 화면 바꿀 때 사용

    const changeIndex = () => {
        if (index !== limit) {
            setIndex(index + 1);
        } else {
            navigate(`/${navigateURL}`, { state: { potatoIdx: potatoIdx, success: success } }) // choice 화면으로 이동, 사진 찍는 화면으로 이동
        }
    };

    const bgImg = storyData.bgImg[index];
    const text = storyData.text[index];

    useEffect(() => {
        document.body.style.backgroundImage = `url(${bgImg})`;
        document.body.style.overflow = 'hidden'
    }, [bgImg]);

    useEffect(() => {
        const nextStory = (e) => {
            if (e.key === ' ' || e.key === 'Space' || e.key === 'ArrowRight') changeIndex()
        }
        document.addEventListener('keydown', nextStory)

        return () => document.removeEventListener('keydown', nextStory)
    },)

    return (
        <div className="storyContainer">
            {resultImgURL !== null ? <img src={resultImgURL} alt="menImg" className="menImg" /> : null}
            <InfoBox text={text} changeIndex={changeIndex} person={person} />
        </div>
    );
}
