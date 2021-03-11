const nodemailer = require('nodemailer');

var mailer = function (receiver) {
    const senderMail = "barkha@newput.com";
    const senderPassword = "12B@rkha9";
    var content = `
        <p>Dear User,<p><br>
            <p>You have successfully registered on MyApp.<p><br>
        <p>Thanks & Regards,<br/>Team MyApp</p>
    `;
    var subject = 'Thank you for registering on MyApp.'
    const mailOptions = {
        to: receiver,
        from: 'barkha@newput.com',
        subject: subject,
        html: content
    };

    var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: senderMail,
            pass: senderPassword
        }
    });

    smtpTransport.sendMail(mailOptions, function (err,result) {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(result);   			
        }

    });
}

module.exports = mailer;
