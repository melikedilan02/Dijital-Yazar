const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const axios = require('axios');

const { GoogleGenerativeAI } = require("@google/generative-ai");




const app = express();
const port= 3000;

const genAI = new GoogleGenerativeAI("AIzaSyAZ0EWJ0Cm3ke2fslYovyO9wA68eW5JNjg");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, '../public')));


app.post('/login',(req,res)=>{
    const {name,password}=req.body;
    const query = 'SELECT * FROM users WHERE name = ? AND password = ?';

    connection.query(query, [name, password], (err, results) => {
        if (err) {
            console.error('Veritabanı hatası: ' + err.stack);
            res.status(500).send('Giriş sırasında bir hata oluştu.');
            return;
        }

        if (results.length > 0) {
            // Giriş başarılı
            res.redirect('/startScreen'); // Başarılı giriş sonrası yönlendirme
        } else {
            // Giriş başarısız
            res.status(401).send('Kullanıcı adı veya şifre hatalı.');
        }
    });
})



app.post('/dijitalYazar', async (req, res) => {
    const text = req.body.text;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([text]);

        const aiResponse = result.response.text();
        
        res.json({ correctedText: aiResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ correctedText: "An error occurred while processing the text." });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
//şimdi contact'in aynısını al startscreen yap
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/contact.html'));
});

app.get('/hizmetler', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/hizmetler.html'));
});
app.get('/uyelik', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/uyelik.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});
app.get('/startScreen', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/startScreen.html'));
});
app.get('/dijitalYazar', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/dijitalYazar.html'));
});
app.get('/yukleniyor', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/startScreen.html'));
});
app.get('/seoanalizi', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/seoanalizi.html'));
});
app.get('/ozellestirilebilir', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/özelleştirilebilirarayüz.html'));
});
app.get('/icerikdonusturucu', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/içerikdönüştürücü.html')); 
});
app.get('/senaryo', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/senaryo.html')); 
});
app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/blog.html')); 
});
app.get('/okuma', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/okumamodu.html')); 
});
app.get('/kapsamliraporlama', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/kapsamlıraporlama.html')); 
});
const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com', // E-posta sağlayıcınızın SMTP sunucu adresi
    port: 587, // Genellikle 587 veya 465
    secure: false, // TLS kullanıyorsanız false, SSL için true
    auth: {
      user: 'efetr140@outlook.com', // Gönderen e-posta adresiniz
      pass: '19051905efe' // E-posta şifreniz veya uygulama şifresi
    }
  });
  
  // Handle form submission
  app.post('/send-email', (req, res) => {
      const mailOptions = {
          from: 'efetr140@outlook.com', // Gönderen e-posta
          to: 'efetr140@outlook.com', // Alıcı e-posta
          subject: req.body.subject, // Formdan gelen konu
          text: `Ad: ${req.body.name}\nE-posta: ${req.body.email}\nMesaj: ${req.body.message}\n\nMerhabalar`, // E-posta içeriği
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log(error);
              res.status(500).send('Bir hata oluştu');
          } else {
              console.log('Email sent: ' + info.response);
              res.status(200).send('E-posta başarıyla gönderildi');
          }
      });
  });

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'test' 
});

connection.connect((err) => {
    if (err) {
        console.error('MySQL bağlantısı başarısız: ' + err.stack);
        return;
    }
    console.log('MySQL\'e bağlandı: ' + connection.threadId);
});

app.post('/uyelik', (req, res) => {
    let { name, surname, email,password } = req.body;

    // Veritabanına kayıt eklemek için SQL sorgusu
    const query = 'INSERT INTO users (name, surname, email,password) VALUES (?, ?, ?, ?)';

    connection.query(query, [name, surname, email,password], (err, result) => {
        if (err) {
            console.error('Veritabanına kayıt yapılırken bir hata oluştu: ' + err.stack);
            res.status(500).send('Üyelik sırasında bir hata oluştu.');
            return;
        }

        console.log('Kayıt başarılı, ID: ' + result.insertId);
        res.redirect('/uyelik'); // Başarılı kayıt sonrası yönlendirme
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
