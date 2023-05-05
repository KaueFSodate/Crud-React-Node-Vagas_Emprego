const {Sequelize} = require('sequelize');
const sequelize = require('../BD/conexao');



const {DataTypes} = Sequelize;

const clientes = sequelize.define('clientes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
    }
});



module.exports = clientes;