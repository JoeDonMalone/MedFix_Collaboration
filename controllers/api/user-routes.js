const router = require('express').Router();
const { User } = require('../../models');
const nodemailer = require('nodemailer')

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    console.log(userData)
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: 'noreply.medication.reminder@gmail.com',
        pass: process.env.EMAIL_PASSWORD,
      },
    })
    await transporter.sendMail({
      from: '"Get my fix" <noreply.medication.reminder@gmail.com>',
      to: userData.email,
      subject: "Account created confirmation",
      text: `Success! Your account was created.`
    })

    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.logged_in = true

      res.status(200).json(userData);

    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    
    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;
      res.json('ok');
      
    });
      // res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.save(() => {
      req.session.logged_in = false
      res.redirect('/')
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
