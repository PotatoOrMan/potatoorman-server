import { useState, useEffect, useCallback } from "react";
import "./css/gaugebar.css";

export default function Gaugebar({ roundIdx }) {
    const [gaugeWidth, setGaugeWidth] = useState(114);
    const gaugebarColor = ['F7F6BB', 'FFE23A', '9ADA28', '149710'];
    const [keysPressed, setKeysPressed] = useState({}); // 두 개의 키 이벤트의 상태를 관리하는 상태
    const [comboTriggered, setComboTriggered] = useState(false); // 두 개의 키를 연속적으로 누를 때 게이지가 올라가지 않도록 막는 트리거
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/gaugeInfoApi/${roundIdx}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ counter }),
                });
            } catch (error) {
                console.error('Error fetching story data:', error);
            }
        };

        fetchData();
    }, [roundIdx, counter]);

    // 스페이스바와 방향키를 객체에 넣어서 상태 업로드
    const handleKeyDown = useCallback((event) => {
        setKeysPressed((prevKeys) => ({
            ...prevKeys,
            [event.code]: true,
        }));
    }, []);
    const handleKeyUp = useCallback((event) => {
        setKeysPressed((prevKeys) => ({
            ...prevKeys,
            [event.code]: false,
        }));
    }, []);

    useEffect(() => {
        const spacebarSound = new Audio('../bgm/spacebar.mp3') // 키보드 효과음
        const keyNames = ['ArrowUp', 'ArrowLeft', 'ArrowRight'];
        // 스페이스바와 방향키를 누름 , 연속적으로 누르고 있지 않음
        if (keysPressed['Space'] && keysPressed[keyNames[roundIdx - 1]] && !comboTriggered) {
            setGaugeWidth((prevWidth) => {
                if (prevWidth < 1314) {
                    spacebarSound.play();
                    setCounter((prevCounter) => {
                        // console.log(`count: ${prevCounter + 1}`);
                        return prevCounter + 1;
                    });
                    return prevWidth + 15;
                }
                return prevWidth; // 1314px 이상일 경우 더 이상 증가하지 않음
            });
            setComboTriggered(true);    // 키를 누르면 comboTriggered가 true로 바뀌기 때문에 연속적으로 누르는 것을 방지 할 수 있음 
        }

        if (!keysPressed['Space'] || !keysPressed[keyNames[roundIdx - 1]]) {
            setComboTriggered(false);
        }
    }, [keysPressed, comboTriggered, roundIdx]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    useEffect(() => {
        setGaugeWidth(114); // roundIdx가 변경될 때마다 gaugeWidth를 114로 초기화
        setCounter(0);
    }, [roundIdx]);

    return (
        <div className="gaugebarContainer">
            <div className='gaugebar'>
                <div className="innerGaugebar" style={{ width: `${gaugeWidth}px`, backgroundImage: `linear-gradient(to right, #${gaugebarColor[roundIdx - 1]}, #${gaugebarColor[roundIdx]})` }}></div>
            </div>
            <div className="imgContainer">
                <img src={`../images/play_potatos/play_potato${roundIdx}.png`} alt='gaugePotatoImg' />
                <img src={`../images/play_potatos/play_potato${roundIdx + 1}.png`} alt='gaugePotatoImg' />
            </div>
        </div>
    );
}
