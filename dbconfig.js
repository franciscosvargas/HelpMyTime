const mongoose = require('mongoose');

// Models
const User = require('./models/User');

var database_name = "htm";
mongoose.Promise = global.Promise;

// Connection with database_name
var connect = () => {
    mongoose.connect("mongodb://localhost/"+database_name, {useNewUrlParser: true}).then(() =>{
        console.log("Conectado ao database: " + database_name);
    }).catch((erro) => {
        console.log("Erro ao se conectar ao database: " + database_name +" - "+ erro);
    });

    mongoose.model('users', User);
}

var createUser = () => {
    const UserRef = mongoose.model('users');
    new UserRef({
        name: "Francisco",
        email: "falisson.sv@gmail.com",
        city: "Palmas",
        phone: "991047876",
        password: "12345678"
    }).save().then(() =>{
        console.log("Usuário cadastrado com sucesso.");
    }).catch((erro) => {
        console.log("Erro ao criar usuário: "+erro);
    });
}

module.exports = {
    connect: connect,
    createUser: createUser
}