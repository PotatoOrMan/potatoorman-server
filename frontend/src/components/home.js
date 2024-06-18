import { Link } from 'react-router-dom';
import "./css/reset.css";
import "./css/home.css";
import { useEffect } from 'react';

export default function Home() {
    const fetchData = async () => {
        try {
            const response = await fetch(`/storyApi/start`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    const handleLinkClick = async (e) => {
        await fetchData()
    };

    // 게임 도중 홈화면으로 돌아와도 홈 배경이미지가 나오게 함
    useEffect(() => {
        document.body.style.backgroundImage = `url("../images/backgrounds/home_background.png")`;
    }, []);

    return <div className="backgroundDiv">
        <img src="../images/ect/logo.png" alt="logo" className="logoImg" />
        <Link to="/storymanager" state={{ propsNum: 0 }} onClick={handleLinkClick}><p className="startPlay">- 게임시작 -</p></Link>
        <Link to="/gallery"><p className="gallery">갤러리</p></Link>
    </div>
}