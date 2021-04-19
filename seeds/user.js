const { User } = require("../models");

const userData = [

    {        
        username: "User",
        email: "pyrat32@gmail.com",
        password: "password",
        first_name: "Joe",
        last_name: "Malone",
        phone: "830-221-0948",
        address: "4481 Bold Sundown, TX"
    }
]

const seedUser = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  })
module.exports = seedUser;


