import api from '../utils/api'


import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


export default function useAuth(){
    const [autenticado, setAutenticado] = useState(false)
    const navigate = useNavigate()

    // Verifica se o usuário está logado assim que a página for carregada
    useEffect(() => {

        const token = localStorage.getItem('token')

        // Se tiver token ira colocar no headers authorization automaticamente
        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAutenticado(true)
        }

    },[])

    async function register(usuario){


    
        try {
            const data = await api.post('/', usuario).then((response) => {
                return response.data
            })
            // Executa a função de autenticar
            await authUser(data)
        } catch (error) {
            console.log(error)
        }

    }

    // Vai receber os dados do login
    async function authUser(data){
        setAutenticado(true)

        // Salva token no local storage
        localStorage.setItem('token', JSON.stringify(data.token))

        // Após usuário logado ira ser mandado para a home
        navigate('/')
    }

    // Vai logar os usuários
    async function loginUser(usuario){



        try {
            const data = await api.post('/login', usuario).then((response) => {
                return response.data
            })
            // Executa a função de autenticar
            await authUser(data)
        } catch (error) {

        }

    }

    // Vai deslogar os usuários
    async function logoutUser(){


        setAutenticado(false)

        // Remover o token
        localStorage.removeItem('token')

        // Remover token do headers authorization
        api.defaults.headers.Authorization = undefined

        // Após usuário deslogado ira ser mandado para o login
        navigate('/login')

    }

    return {autenticado, register, logoutUser, loginUser}
}