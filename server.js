const models = require("./models");

const User = models.User;

User.create({ email: "Jane", username: "Doe", password: "toto" }).then(jane => {
    console.log("Jane's auto-generated ID:", jane.id);
});



// const Model = Sequelize.Model;
// class User extends Model {}
