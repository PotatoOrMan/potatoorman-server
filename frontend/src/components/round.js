import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import "./css/round.css";
import "./css/roundmodal.css"
import Gaugebar from './gaugebar';
import PlayView from './playview';
import ResultPlayView1 from './resultPlayview1'

export default function Round() {
    const location = useLocation()
    const index = location.state.index   //choice에서 넘긴 index값 저장
    const [roundIdx, setRoundIdx] = useState(1)
    const [showModal, setShowModal] = useState(true) // 모달창 띄우기 여부

    useEffect(() => {
        if (roundIdx !== 4) {
            document.body.style.backgroundImage = `url(../images/backgrounds/play_background${roundIdx}.png)`;
        }
    }, [roundIdx]);

    useEffect(() => {
        if (!showModal) {    // 모달창이 사라지면 타이머가 시작되도록 조건 체크
            const roundTime = setTimeout(() => {
                if (roundIdx < 4) {
                    setRoundIdx(idx => idx + 1)
                    if (roundIdx < 3) setShowModal(true); // 라운드가 시작될 때마다 모달창 띄우기
                }
            }, 11000)
            return () => clearTimeout(roundTime)
        }
    }, [roundIdx, showModal])

    useEffect(() => {
        // 키보드 입력 설명 모달창이 1.5초동안 화면에 뜨게 하기
        const modalTimer = setTimeout(() => {
            setShowModal(false);
        }, 1500);
        return () => clearTimeout(modalTimer);
    }, [roundIdx])


    return (
        showModal ?
            <div className='roundmodalContainer'>
                <div className='roundmodal'>
                    <text className='modalText'>감자를 키워주세요!</text>
                    <div className='keysContainer'>
                        <div className='spacebar'>space</div>
                        <div className='fourKeys'>
                            {/* roundIdx로 라운드마다 색깔 위치 바꿔주기 */}
                            <div className='keyItem upKey' style={{ backgroundColor: roundIdx === 1 && '#FBDC2E' }}>↑</div>
                            <div className='arrowKeys'>
                                <div className='keyItem leftKey' style={{ backgroundColor: roundIdx === 2 && '#FBDC2E' }}>←</div>
                                <div className='keyItem downKey'>↓</div>
                                <div className='keyItem rightKey' style={{ backgroundColor: roundIdx === 3 && '#FBDC2E' }}>→</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> :
            roundIdx === 4 ? // 결과창인지 조건 확인
                <ResultPlayView1 potatoIdx={index} /> :  // 결과 화면
                // 라운드 화면
                <div className='playDiv'>
                    <Gaugebar roundIdx={roundIdx} potatoIdx={index} />
                    <PlayView roundIdx={roundIdx} potatoIdx={index} />
                </div>
    )
}

