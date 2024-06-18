import { useEffect, useState } from "react";
import "./css/resultPlayview2.css";
import { useNavigate, useLocation } from "react-router-dom";

function ResultScreen({ gauge1, gauge2, gauge3, finalGauge }) {
    // 게이지 관련 변수
    const gaugeStyles = [
        { width: gauge1, backgroundImage: "linear-gradient(to right, #F7F6BB, #FFE23A)" },
        { width: gauge2, backgroundImage: "linear-gradient(to right, #FFE23A, #9ADA28)" },
        { width: gauge3, backgroundImage: "linear-gradient(to right, #9ADA28, #149710)" },
    ]

    return (
        <>
            <div className="gaugeResultContainer">
                {/* 게이지바 3개를 map으로 출력 */}
                {gaugeStyles.map((style, index) => (
                    <div key={index} className="gaugebar">
                        <div className="innerGaugebar" style={style}>
                            <img src={`../images/play_potatos/play_potato${index + 2}.png`} alt='gaugePotatoImg' />
                        </div>
                    </div>
                ))}
            </div>
            <img src="../images/ect/end_mark.png" className="endMark" alt="endmark" />
            <div className="finalGaugebar">
                <div className="finalInnerGaugebar" style={{ width: finalGauge }}>
                    <img src={"../images/play_potatos/play_potato2.png"} alt='gaugePotatoImg' />
                </div>
            </div>
        </>
    )
}

export default function ResultPlayview2() {
    const navigate = useNavigate()
    const [smoke, setSmoke] = useState(false)
    const success = '' // 성공여부 확인 성공이면 'O', 실패면 'X'
    const location = useLocation();
    const [scores, setScores] = useState({ firstScore: 0, secondScore: 0, thirdScore: 0, finalScore: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/gaugeInfoApi/result`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (response.ok) {
                    const data = await response.json()
                    const scoreData = {
                        firstScore: 85 + (data.firstScore * 12),   // width의 최대값이 1020px일 때 기준
                        secondScore: 85 + (data.secondScore * 12),
                        thirdScore: 85 + (data.thirdScore * 12),
                        finalScore: 85 + (data.finalScore * 14) // width의 최대값이 1200px일 때 기준
                    }
                    setScores(scoreData)
                    setTimeouts(scoreData)
                } else {
                    console.log('Failed to fetch scores');
                }
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchData();
    }, [])

    // 게이지바 길이를 useState 배열에 저장
    const [gauges, setGauges] = useState({
        gauge1: '85px',
        gauge2: '85px',
        gauge3: '85px',
        finalGauge: '85px'
    });

    const setTimeouts = (newScores) => {
        document.body.style.backgroundImage = "url(../images/backgrounds/play_background1.png)"
        const explosionSound = new Audio('../bgm/explosion.mp3')

        const timeouts = [
            setTimeout(() => setGauges(gauges => ({ ...gauges, gauge1: `${newScores.firstScore}px` })), 1000),
            setTimeout(() => setGauges(gauges => ({ ...gauges, gauge2: `${newScores.secondScore}px` })), 2000),
            setTimeout(() => setGauges(gauges => ({ ...gauges, gauge3: `${newScores.thirdScore}px` })), 3000),
            setTimeout(() => setGauges(gauges => ({ ...gauges, finalGauge: `${newScores.finalScore}px` })), 4000),
            setTimeout(() => {
                setSmoke(true)
                explosionSound.play()
            }, 5000),
            // 결과창 보여주는것과 연기 gif가 나타나는 시간을 합친 것
            setTimeout(() => {
                navigate('/storymanager', { state: { propsNum: location.state.propsNum, success: location.state.change } })
            }, 6200),
            console.log("check2",location.state.propsNum),
        ];

        return () => timeouts.forEach(timeout => clearTimeout(timeout))
    };

    return (
        smoke ?
            <img src="../images/smokeGIF.gif" alt="smokeGIF" style={{ width: '100%', height: 'auto' }} />
            :
            <ResultScreen gauge1={gauges.gauge1} gauge2={gauges.gauge2} gauge3={gauges.gauge3} finalGauge={gauges.finalGauge} />
    )
}