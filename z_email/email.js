var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    // host: "smtp.qq.com", // 主机
    // secureConnection: true, // 使用 SSL
    // port: 465, // SMTP 端口
    service: 'qq',
    auth: {
        user: "1047887945@qq.com", // 账号
        pass: "abcd1234" // 密码
    }
});

// var transporter = nodemailer.createTransport();

// var mailOptions = {
//     from: 'bsspirit', // sender address
//     to: 'towne766@126.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world ✔', // plaintext body
//     html: '<b>Hello world ✔</b>' // html body
// };


var mailOptions = {
    from: 'Fred Foo <1047887945@qq.com>', // sender address
    to: 'towne766@126.com', // list of receivers
    subject: 'Hello World✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});