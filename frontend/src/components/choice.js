import { useEffect } from "react";
import { Link } from 'react-router-dom';
import "./css/choice.css";

const PotatoOptions = [
    { index: 1, image: "../images/potatos/potato1_1.png", className: "potato1" },
    { index: 2, image: "../images/potatos/potato2_1.png", className: "potato2" },
    { index: 3, image: "../images/potatos/potato3_1.png", className: "potato3" },
    { index: 4, image: "../images/potatos/potato4_1.png", className: "potato4" },
    { index: 5, image: "../images/potatos/potato5_1.png", className: "potato5" }
];

function ChoicePotato(){
    return <div className="choicePotato">
        {
            PotatoOptions.map((potato => {
                return <Link to="/round" state={{index:potato.index}}>
                    <img src={potato.image} className={`potatoImg ${potato.className}`} alt="potatoImg"/>
                </Link>
            }))
        }
    </div>
}

export default function Choice() {
    useEffect(() => {
        document.body.style.backgroundImage = `url("../images/backgrounds/choice_background.png")`;
    }, []);
    

    return <div className="choiceDiv">
        <div className="choiceText">당신의 감자를 선택하세요</div>
        <ChoicePotato/>
    </div>
}