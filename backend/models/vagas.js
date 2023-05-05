const {Sequelize} = require('sequelize');
const sequelize = require('../BD/conexao');

// No modelo de vagas:
const clientes = require('./clientes');

const {DataTypes} = Sequelize;

const vagas = sequelize.define('vagas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
    },
    descricao: {
        type: DataTypes.STRING,
        unique: true
    },
    Requisitos: {
        type: DataTypes.STRING,
    },
    DataExpiração: {
        type: DataTypes.DATE,
    }
});


// Cliente pode cadastrar varias vagas
clientes.hasMany(vagas, {
  foreignKey: 'clientes_id'
});

// Mas a vaga pertence apenas a um cliente
vagas.belongsTo(clientes, {
  constraint:true,
  foreignKey: 'clientes_id'
});

module.exports = vagas;