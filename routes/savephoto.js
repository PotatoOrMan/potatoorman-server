const express = require('express');

const router = express.Router();
const multer = require('multer');
const app = express();
const upload = multer();
const session = require('../config/session')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/savephotoApi/save', upload.single('image'), (req, res) => {
  const imageData = req.file.buffer.toString('base64');
  // 이미지 데이터 처리 로직
  console.log(imageData); // 이미지 데이터가 base64 형식으로 출력됩니다.
  res.send('이미지가 성공적으로 전송되었습니다.');
});


router.use((req, res, next) => {
    if (!req.session.authuser || !req.session.authpass) {
        req.session.authuser = session.authouser; // Correcting the assignment
        req.session.authpass = session.authopass; // Correcting the assignment
    }
    next();
});

// 이메일 전송
router.post('/submit', upload.single('image'), async (req, res) => {
    let authuser = req.session.authuser;
    let authpass = req.session.authpass;
    
    try {
        if (!req.file || !req.body.email) {
            return res.status(400).send('Email and file are required.');
        }

        // nodemailer 설정
        const transporter = nodemailer.createTransport({
            service: 'gmail', // gmail을 사용함
            auth: {
                user: authuser, // 나의 (작성자) 이메일 주소
                pass: authpass // 이메일의 비밀번호
            }
        });

        // 이메일 옵션 설정
        const mailOptions = {
            from: 'w2223@e-mirim.hs.kr', // 작성자
            to: req.body.email, // 수신자 (클라이언트가 입력한 이메일)
            subject: '감자?남자!', // 메일 제목
            text: 'Here is your photo!', // 메일 내용
            attachments: [
                {
                    filename: 'photo.png',
                    content: req.file.buffer,
                    contentType: 'image/png'
                }
            ]
        };

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

module.exports = router;
