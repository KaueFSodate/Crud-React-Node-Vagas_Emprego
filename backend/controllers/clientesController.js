const User = require('../models/clientes')
const bcrypt = require('bcrypt')

// Helpers
const criarToken = require('../helpers/criarToken')
const pegarToken = require('../helpers/pegarToken')
const pegarUsuarioToken = require('../helpers/pegarUsuarioToken')


module.exports = class usuarioController{


    static listar = async(req, res) => {

        // Pega os usuários no BD e armazena em 'resposta'
        const resposta = await User.findAll()

        // Se tiver valor retorna
        if(resposta){
            res.status(200).json(resposta)
            return
        }
    }

    static listarId = async(req, res) => {
        const id = req.params.id

        // Pega o usuário no BD onde o id for igual ao id que o usuário inseriu e armazena em 'resposta'
        const resposta = await User.findOne({
            where:{
                id: id
            }
        });


        // Se tiver valor retorna
        if(!resposta){
            res.status(422).json({message: "Usuário não encontrado"})
            return
        }

        res.status(200).json({usuario: resposta})


    }

    static cadastrar = async(req, res) => {

        const {nome, senha, email} = req.body

        // Validações

        if(!nome){
            res.status(422).json({message: "Insira um nome"})
            return
        }

        if(!senha){
            res.status(422).json({message: "Insira uma senha"})
            return
        }

        if(!email){
            res.status(422).json({message: "Insira um e-mail"})
            return
        }

        // Checa se e-mail já está em uso
        const resposta = await User.findOne({
            where:{
                email: email
            }
        });

        if(resposta){
            res.status(422).json({message: "E-mail já está em uso"})
            return
        }

        // Criptografa a senha inseria pelo usuário
        const salt = bcrypt.genSaltSync(10);
        const senhaCriptografada = bcrypt.hashSync(senha, salt);

        // Objeto usuário
        const usuario = {
            nome: nome,
            senha: senhaCriptografada,
            email: email,
        }

        // Criação do objeto
        try {
            await User.create(usuario);
            res.status(200).json({msg: "Usuario criado com sucesso", User});
            //Criar token após o login
            await criarToken(req, res, usuario)
        } catch (error) {
            console.log(error);
        }

    }

    static login = async(req, res) => {
        const {email, senha} = req.body

        if(!email){
            res.status(422).json({message:"Insira um email"})
            return
        }

        if(!senha){
            res.status(422).json({message:"Insira uma senha"})
            return
        }

        // Checar usuario
        const Usuario = await User.findOne({
            where:{
                email: email
            }
        });

        if(!Usuario){
            res.status(422).json({message:"E-mail incorreto!"})
            return
        }

        // Checar senha

        const existeSenha = await bcrypt.compare(senha, Usuario.senha)
        console.log(Usuario.senha)

        if(!existeSenha){
            res.status(422).json({message:"Senha invalida!"})
            return
        }

        //Criar token após o login
        await criarToken(req, res, Usuario)

    }

    static editar = async(req, res) => {
        const id = req.params.id

        // Checa se o usuário existe e pegar o usuario
        const token = pegarToken(req)
        const user = await pegarUsuarioToken(token)

        const {nome, senha, email} = req.body

        // Validações

        const usuarioid = id

        if(!nome){
            res.status(422).json({message: "Insira um nome"})
            return
        }

        user.nome = nome


        if(!senha){
            res.status(422).json({message: "Insira uma senha"})
            return
        }

        if(!email){
            res.status(422).json({message: "Insira um e-mail"})
            return
        }

        user.email = email

        const salt = bcrypt.genSaltSync(10);
        const senhaCriptografada = bcrypt.hashSync(senha, salt);

        user.senha = senhaCriptografada


        try {
            await User.update(user.dataValues,{
                where:{
                    id: usuarioid
                }
            });;
            res.status(200).json({msg: "Usuario atualizado com sucesso", user});
        } catch (error) {
            console.log(error);
        }
    }

    static deletar = async(req, res) => {
        const id = req.params.id

        try {
            await User.destroy({
                where:{
                    id: id
                }
            });
            res.status(200).json({msg: "Usuario deletado"});
        } catch (error) {
            console.log(error.message);
        }

    }

}