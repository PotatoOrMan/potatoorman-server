const express = require('express');

const router = express.Router();
const multer = require('multer');
const app = express();
const upload = multer();
const session = require('../config/session')
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post('/save', upload.single('image'), (req, res) => {
    // const imageData = req.file.buffer.toString('base64');
    // console.log("???")
    // console.log(req.file.buffer.toString('base64'))
    const filename = "captured_image_" + (Date.now()) + ".png"
    fs.writeFileSync("./public/images/" + filename, req.file.buffer);

    console.log("save test!!!!!!!!!!")
    // 이미지 데이터 처리 로직
    // console.log(imageData); // 이미지 데이터가 base64 형식으로 출력됩니다.
    // res.send('이미지가 성공적으로 전송되었습니다.');
    res.json({
        'filepath': "http://13.125.230.135:8081/images/" + filename
    })
});


router.use((req, res, next) => {
    if (!req.session.authuser || !req.session.authpass) {
        req.session.authuser = session.authouser; // Correcting the assignment
        req.session.authpass = session.authopass; // Correcting the assignment
    }
    next();
});

// 이메일 전송
router.post('/submit', (req, res) => {
    let authuser = req.session.authuser;
    let authpass = req.session.authpass;
    let sendInput = req.body.sendInput

    console.log("sendInput Test: ", sendInput)

    try {
        // if (!req.file || !req.body.email) {
        //     return res.status(400).send('Email and file are required.');
        // }

        // nodemailer 설정
        /*
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: authuser,
                pass: authpass
            }
        });
        */
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: authuser,
                pass: authpass
            }
        });
        // 이메일 옵션 설정
        const mailOptions = {
            from: authuser, // 작성자
            to: sendInput, // 수신자 (클라이언트가 입력한 이메일)
            subject: '감자?남자!', // 메일 제목
            text: '<감자?남자!>를 이용해주셔서 감사합니다! ' + req.body.filepath, // 메일 내용
        };
        console.log(mailOptions)

        // 이메일 전송
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).send('Error sending email.');
            } else {
                console.log('Email sent: ' + info.response);
                res.send('Email sent successfully.');
            }
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Error processing request.');
    }
});

router.get('/gallery', (req, res) => {
    const imagesDir = path.join(__dirname, '..', 'public', 'images');
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            res.status(500).send('Failed to load gallery images.');
            return;
        }
        const filenames = files.map(file => file); // 파일 이름만 반환
        res.json(filenames);
    });
});

module.exports = router;
