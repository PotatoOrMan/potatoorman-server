import Story from "./story";
import { useLocation } from 'react-router-dom'

export default function Storymanager() {
    const propsNum = useLocation();
    const success = propsNum.state.success;
    let personNum = propsNum.state.propsNum;

    console.log("succes",success)
    console.log("perNum",personNum)
    //1번 감자를 선택했다면 랜덤으로 번호를 재생성한다
    if (personNum === 1) {
        personNum = Math.trunc(Math.random() * 3 + 3);
    }
    console.log("check3 again",personNum)

    //사람 이미지도 props로 전달하기
    const storyData1 = {
        text: ["아 역시 할 것도 없고 심심하네...", "어? 저게 할머니 감자밭인가?", "음? 뭐지?"],
        bgImg: [
            "../images/backgrounds/story_background1.png",
            "../images/backgrounds/story_background2.png",
            "../images/backgrounds/story_background3.png"
        ]
    };
    const person1 = "나"
    const limit1 = 2
    const navigateURL1 = "choice"
    const resultImgURL1 = null

    const storyData2 = {
        text: ["어! 안녕! 백하민이라고 해~", "감자팩하다가 깜빡 잠들었더니 ㅎㅎ", "감자가 되버렸네~~", "어쨌든 너무너무 고마워~~"],
        bgImg: [
            "../images/backgrounds/end_background1.png",
            "../images/backgrounds/end_background1.png",
            "../images/backgrounds/end_background1.png",
            "../images/backgrounds/end_background1.png"
        ]
    };
    const person2 = "백하민"
    const limit2 = 3
    const navigateURL2 = "photo"
    const resultImgURL2 = "../images/men/handsome.png"

    const storyData3 = {
        text: ["아 안녕하세요", "공부하면서 감자를 너무 많이먹었나..?", "감자에 갇혀서 공부도 못하고 하...", "하여튼 감사합니다"],
        bgImg: [
            "../images/backgrounds/end_background1.png",
            "../images/backgrounds/end_background1.png",
            "../images/backgrounds/end_background1.png",
            "../images/backgrounds/end_background1.png"
        ]
    };
    const person3 = "최재윤"
    const limit3 = 3
    const navigateURL3 = "photo"
    const resultImgURL3 = "../images/men/student.png"

    const storyData4 = {
        text: ["아 안녕하세요", "공부하면서 감자를 너무 많이먹었나..?", "감자에 갇혀서 공부도 못하고 하...", "하여튼 감사합니다"],
        bgImg: [
            "../images/backgrounds/end_background1.png",
            "../images/backgrounds/end_background1.png",
            "../images/backgrounds/end_background1.png",
            "../images/backgrounds/end_background1.png"
        ]
    };
    const person4 = "이도현"
    const limit4 = 3
    const navigateURL4 = "photo"
    const resultImgURL4 = "../images/men/badboy.png"

    const storyData5 = {
        text: ["ㅇ..안녕하세요...! 저는 김민재인데요...!", "여기 감자밭을 지나가다가 넘어졌는데...", "그래서 감자가... 이게 뭐야...!", "ㄱ..구..구해주셔서 감사합니다!!"],
        bgImg: [
            "../images/backgrounds/end_background1.png",
            "../images/backgrounds/end_background1.png",
            "../images/backgrounds/end_background1.png",
            "../images/backgrounds/end_background1.png"
        ]
    };
    const person5 = "김민재"
    const limit5 = 3
    const navigateURL5 = "photo"
    const resultImgURL5 = "../images/men/nerd.png"

    const storyData6 = {
        text: ["(당신의 감자는 그렇게 평생 감자로 살았다....)"],
        bgImg: [
            "../images/backgrounds/play_background1.png"
        ]
    };
    const person6 = "감자"
    const limit6 = 0
    const navigateURL6 = "photo"
    const resultImgURL6 = `../images/potatos/potato${propsNum.state.propsNum}_1.png`

    if (success === 'O') {
        switch (personNum) {
            case 2: return (<Story storyData={storyData2} person={person2} limit={limit2} navigateURL={navigateURL2} resultImgURL={resultImgURL2} potatoIdx={personNum} success={success} />)
            case 3: return (<Story storyData={storyData3} person={person3} limit={limit3} navigateURL={navigateURL3} resultImgURL={resultImgURL3} potatoIdx={personNum} success={success} />)
            case 4: return (<Story storyData={storyData4} person={person4} limit={limit4} navigateURL={navigateURL4} resultImgURL={resultImgURL4} potatoIdx={personNum} success={success} />)
            case 5: return (<Story storyData={storyData5} person={person5} limit={limit5} navigateURL={navigateURL5} resultImgURL={resultImgURL5} potatoIdx={personNum} success={success} />)
            default: return null
        }
    } else if (success === 'X') {
        return (<Story storyData={storyData6} person={person6} limit={limit6} navigateURL={navigateURL6} resultImgURL={resultImgURL6} potatoIdx={propsNum.state.propsNum} success={success} />)

    } else {
        return (<Story storyData={storyData1} person={person1} limit={limit1} navigateURL={navigateURL1} resultImgURL={resultImgURL1} />)
    }

    // 배경이미지, person 등 넘겨주기
    // 조건에 맞게 story, resultStory 불러오기
}