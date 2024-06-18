import { useEffect, useState } from "react";
import "./css/resultPlayview1.css";
import { useNavigate } from "react-router-dom";

export default function ResultPlayview1({ potatoIdx }) {
    const navigate = useNavigate()

    const [change, setChange] = useState(null)
    useEffect(() => {
        const fetchChangeData = async () => {
            try {
                const response = await fetch(`/gaugeInfoApi/change`)
                const data = await response.json()
                const changeValue = data.changeOX;
                console.log('Extracted change value:', changeValue);
                setChange(changeValue);
            } catch (error) {
                console.log('Error : ', error)
            }
        }
        fetchChangeData()
    }, [])

    useEffect(() => {
        document.body.style.backgroundImage = "url(../images/backgrounds/play_background3.png)"
    }, [])

    useEffect(() => {
        const resultplayviewTimer = setTimeout(() => {
            navigate("/resultPlayview2", { state: { propsNum: potatoIdx, change: change } })
        }, 2000)
        console.log("check1",potatoIdx)
        return () => clearTimeout(resultplayviewTimer)
    }, [navigate, potatoIdx, change])

    return <div className='resultDiv'>
        <img src={`../images/potatos/potato${potatoIdx}_3.png`} className='resultPotato' alt='resultPotatoImg' />
    </div>;
}