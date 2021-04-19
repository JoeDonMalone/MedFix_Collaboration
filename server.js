const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const seed = require('./seeds/seed.js')
const schedule = require('node-schedule');
const nodemailer = require("nodemailer");

const sequelize = require('./config/connection');
const { User, Meds } = require('./models')

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};



let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: 'noreply.medication.reminder@gmail.com',
    pass: process.env.EMAIL_PASSWORD,
  },
})

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: true }).then(async () => {
  await seed()
  app.listen(PORT, () => console.log(`Server listening on: http://localhost: ${PORT}`));
});

const rule = new schedule.RecurrenceRule()
rule.minute = schedule.Range(0, 50, 10)
const emailJob = schedule.scheduleJob('*/10 * * * *', async (fireDate) => {
  console.log(fireDate)
  let users = await User.findAll({
    attributes: ['user_id', 'email']
  })
  for (user of users) {
    
    let meds = await Meds.findAll({
      where: {
        user_id: user.user_id
      }
    })
    for (med of meds) {
      let days = med.remind_days.split('')
      let time = med.remind_time.split(':')
      let hour = parseInt(time[0])
      let minute = parseInt(time[1])
      // console.log(days.includes(fireDate.getDay().toString()) && (hour == fireDate.getHours()) && (minute == (Math.floor(fireDate.getMinutes() / 10) * 10)))
      // console.log(days.includes(fireDate.getDay().toString()))
      // console.log((hour == fireDate.getHours()))
      // console.log((minute == (Math.floor(fireDate.getMinutes() / 10) * 10)))
      // console.log(Math.floor(fireDate.getMinutes() / 10) * 10)
      // console.log(minute)
      // console.log(time)
      console.log(days.includes(fireDate.getDay().toString()) && (hour == fireDate.getHours()) && (minute == (Math.floor(fireDate.getMinutes() / 10) * 10)))
      if (
        days.includes(fireDate.getDay().toString()) && (hour == fireDate.getHours()) && (minute == (Math.floor(fireDate.getMinutes() / 10) * 10))
      ) {
        await transporter.sendMail({
          from: '"Medication reminder" <noreply.medication.reminder@gmail.com>',
          to: user.email,
          subject: "Medication reminder",
          text: `This is a reminder to take ${med.name}. Instructions for consumption: \n${med.regimen}`
        })
      }
    }
  }
})

