import { useEffect, useState } from "react";
import "./css/playview.css";

export default function PlayView({roundIdx, potatoIdx}) {
    const [time, setTime] = useState(10)
    let textColor = "#000"
    
    if(time <= 6) textColor="#BA0000"
    if (time <= 3) textColor="#F00000"

    useEffect(() => {
        if(time > 0) {  // 타이머가 무한반복 하지 않도록
            const timeId = setTimeout(() => {
                setTime(prevTime => prevTime - 1)
            },1000)
            return () => clearTimeout(timeId)
        }
    }, [time])

    useEffect(() => {
        setTime(10)
    }, [roundIdx])

    return <>     
        <p className='time' style={{color:textColor}}>{time}</p>
        <img src={`../images/potatos/potato${potatoIdx}_${roundIdx}.png`} className='mainPotatoImg' alt='playPotatoImg'/>
    </>

}