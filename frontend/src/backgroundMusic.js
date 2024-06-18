import React, { useEffect, useRef } from 'react';
// 배경음악 넣기
const BackgroundMusic = () => {
    const audioRef = useRef(null)

    useEffect(() => {
        const handlePlay = () => {
          if (audioRef.current) {
            audioRef.current.play()
          }
          document.removeEventListener('click', handlePlay)
        }
    
        document.addEventListener('click', handlePlay)
    
        return () => {
          document.removeEventListener('click', handlePlay)
        }
      }, [])

    return(
        <audio ref={audioRef} loop>
            <source src='../bgm/BGM.mp3' type='audio/mp3'/>
            이 브라우저에서는 오디오가 지원되지 않습니다.
        </audio>
    )
}

export default BackgroundMusic;