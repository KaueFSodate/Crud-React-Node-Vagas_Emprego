const Vagas = require('../models/vagas')
const User = require('../models/clientes')
// Helpers
const criarToken = require('../helpers/criarToken')
const pegarToken = require('../helpers/pegarToken')
const pegarUsuarioToken = require('../helpers/pegarUsuarioToken')


module.exports = class vagasController{


    static listarVagas = async(req, res) => {

        // Pega as vagas no BD e armazena em 'resposta'
        const resposta = await Vagas.findAll()

        // Se tiver valor retorna
        if(resposta){
            res.status(200).json(resposta)
            return
        }
    }

    static listarMinhasVagas = async(req, res) => {
        // Checa se o cliente que está cadastrando a vaga existe e pega o cliente
        const token = pegarToken(req)
        const cliente = await pegarUsuarioToken(token)
        console.log(cliente)

        // Busca as vagas correspondentes ao usuário
        const vagas = await Vagas.findAll({
            where: { clientes_id: cliente.id },
        });

        // Se não tiver valor retorna
        if(!vagas){
            res.status(422).json({message: "Vagas não encontrada"})
            return
        }

        res.status(200).json(vagas);


    }

    static listarId = async(req, res) => {
        const id = req.params.id

        // Pega o usuário no BD onde o id for igual ao id que o usuário inseriu e armazena em 'resposta'
        const resposta = await Vagas.findOne({
            where:{
                id: id
            }
        });

        // Se tiver valor retorna
        if(!resposta){
            res.status(422).json({message: "Vagas não encontrada"})
            return
        }

        res.status(200).json(resposta)


    }

    

    static cadastrar = async(req, res) => {

        const {nome, descricao, Requisitos, DataExpiração} = req.body

        // Validações

        if(!nome){
            res.status(422).json({message: "Insira um nome"})
            return
        }

        if(!descricao){
            res.status(422).json({message: "Insira uma descricao"})
            return
        }

        if(!Requisitos){
            res.status(422).json({message: "Insira os Requisitos"})
            return
        }

        if(!DataExpiração){
            res.status(422).json({message: "Insira a data de expiração da vaga"})
            return
        }

        // Checa se a vaga já está criada
        const resposta = await Vagas.findOne({
            where:{
                nome: nome
            }
        });

        if(resposta){
            res.status(422).json({message: "E-mail já está em uso"})
            return
        }

         // Checa se o cliente que está cadastrando a vaga existe e pega o cliente
         const token = pegarToken(req)
         const cliente = await pegarUsuarioToken(token)


        // Objeto usuário
        const vagas = {
            nome: nome,
            descricao: descricao,
            Requisitos: Requisitos,
            DataExpiração: DataExpiração,
            clientes_id: cliente.id,
        }

        // Criação do objeto
        try {
            await Vagas.create(vagas);
            res.status(200).json({msg: "Vaga cadastrada com sucesso", vagas});
        } catch (error) {
            console.log(error);
        }

    }

    
    static editar = async(req, res) => {
        const id = req.params.id

        // Checa se o usuário existe e pegar o usuario
        const token = pegarToken(req)
        const cliente = await pegarUsuarioToken(token)

        const {nome, descricao, Requisitos, DataExpiração} = req.body

        // Validações

        const vagaid = id

        if(!nome){
            res.status(422).json({message: "Insira um nome"})
            return
        }



        if(!descricao){
            res.status(422).json({message: "Insira uma descricao"})
            return
        }

        if(!Requisitos){
            res.status(422).json({message: "Insira os Requisitos"})
            return
        }

        if(!DataExpiração){
            res.status(422).json({message: "Insira a data de expiração"})
            return
        }

        try {
            await Vagas.update({
              nome: nome,
              descricao: descricao,
              Requisitos: Requisitos,
              DataExpiração: DataExpiração,
              clientes_id: cliente.id
            }, {
              where: { id: vagaid }
            });
          
            // Busca a vaga atualizada no BD
            const vagaAtualizada = await Vagas.findByPk(vagaid);
          
            // Retorna os dados da vaga atualizada no objeto JSON de resposta
            res.status(200).json({msg: "Vaga atualizada com sucesso", vaga: vagaAtualizada});
          } catch (error) {
            console.log(error);
          }

        
    }

    static deletar = async(req, res) => {
        const id = req.params.id

        try {
            await Vagas.destroy({
                where:{
                    id: id
                }
            });
            res.status(200).json({msg: "Vaga deletada com sucesso"});
        } catch (error) {
            console.log(error.message);
        }

    }

}