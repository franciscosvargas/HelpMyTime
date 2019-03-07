const mongoose = require('mongoose');
const readline = require('readline');

// Models
const User = require('../models/User');
const Category = require('../models/Category');
var UserRef = null;
var CategoryRef = null;

var database_name = "htm";
mongoose.Promise = global.Promise;

// Connection with database_name
const connect = () => {
    mongoose.connect("mongodb://localhost/"+database_name, {useNewUrlParser: true}).then(() =>{
        console.log("Conectado ao database: " + database_name);
    }).catch((erro) => {
        console.log("Erro ao se conectar ao database: " + database_name +" - "+ erro);
    });

    mongoose.model('users', User);
    mongoose.model('categories', Category);
    UserRef = mongoose.model('users');
    CategoryRef = mongoose.model('categories');
}


// User tools
const createUserFromEmail = (name, email, city, phone, password, ac_type) => {
    new UserRef({
        name: name,
        email: email,
        city: city,
        phone: phone,
        password: password,
        account_type: ac_type
    }).save().then(() =>{
        console.log("Usuário cadastrado com sucesso.");
    }).catch((erro) => {
        console.log("Erro ao criar usuário: "+erro);
    });
}
const userExists = (email, callback) => {
    UserRef.findOne({email: email}, function(err, user){            
        if(!user && err == null){
            callback(0);
        } else if(err){
            callback(err);
        }else{
            callback("Usuário já cadastrado.")
        }
    });
}

const confirmationSucess = (email, callback) => {
     UserRef.findOne({email: email}, function(err, user){            
        if(user){
            user.confirmated = true;
            user.save(function(error) {
                if(err){
                    callback(error);
                } else {
                    callback("success");
                } 
            });
        } else {
            callback(err);
        }
    });
}

// CATEGORY TO0LS
const createCategory = (name, slug) => {
    new CategoryRef({
        name: name,
        slug: slug,
        rank: 1
    }).save().then(() =>{
        console.log("Categoria cadastrada com sucesso");
    }).catch((erro) => {
        console.log("Erro ao criar categoria: "+erro);
    });
}

const createCategoryFromFile = () => {
    var lineReader = require('line-reader');
    lineReader.eachLine('./public/database_start/categorys.txt', function(line, last) {
        var name = line;
        var slug = line;
        // Formating name to slug
            slug = slug.toLowerCase();
            slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            slug = slug.replace(/\s/g, '-');
            slug = slug.replace("/a","");
            slug = slug.replace("/","-");
        // The end of file    
        if (line == "FIM"){
            return false; 
        } else {
            createCategory(name, slug);
        }
    });
}

const getCategoryList = (callback) => {
    CategoryRef.find().then((categories) => {
        callback(categories);
    })
}

const getCategoryHomeList = (callback) => {
    CategoryRef.find().sort({rank: 'desc'}).limit(8).then((categories) => {
        callback(categories);
    })
}


// Exporting the modules
module.exports = {
    connect: connect,
    createUserFromEmail: createUserFromEmail,
    createCategory: createCategory,
    getCategoryList: getCategoryList,
    getCategoryHomeList: getCategoryHomeList,
    createCategoryFromFile: createCategoryFromFile,
    confirmationSucess: confirmationSucess,
    userExists: userExists
}