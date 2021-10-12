const BASE_URL = 'http://192.168.56.1:4000/api/';
import { useSelector } from "react-redux";

export default () => {

    const token = useSelector(state => state.userReducer.token);

    return {
    login: async (email, senha) => {

        const dados = {
            method: 'POST',
            body: JSON.stringify({email,senha}),
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {

            const data = await fetch(`${BASE_URL}user/login`, dados);
            const json = await data.json()

            return json;

        }catch(e) {
            return {error: 'erro ao buscar dados no Banco, verifique a conexão com servidor'};
        }
        
    },
    getLojas: async () => {

                console.log(token);

                const dados = {
                    METHOD: 'GET',
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                }

                try {

                    const data = await fetch(`${BASE_URL}lojas/estabelecimento`, dados)
                    const json = await data.json()
                    console.log(json);
                    return json;

                }catch(e) {
                    return {error: 'erro ao buscar dados no Banco, verifique a conexão com servidor'};
                }
        
    },
    cadLojas: async (descricao, local) => {

        if(local == null) {
            local = "";
        }

        const dados = {
            method: 'POST',
            body: JSON.stringify({
                desc: descricao,
                local
            }),
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }
        }

        try {

            const data = await fetch(`${BASE_URL}lojas/newregister`, dados);
            const json = await data.json();
            console.log('CAD ' + JSON.stringify(json));
            return json;

        }catch(e) {
            return {error: 'erro ao conectar com o Banco, verifique a conexão com servidor'};
        }
    
    },
    cadUsers: async (nome, email, senha) => {

        const dados = {
            method: 'POST',
            body: JSON.stringify({
                nome,
                email,
                senha
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {

            const data = await fetch(`${BASE_URL}user/newregister`, dados)
            const json = await data.json()

            return json

        }catch(e) {
            return {error: 'erro ao conectar com o Banco, verifique a conexão com servidor'};
        }
    
    },
    editarLoja: async (id, desc, local) => {
        const dados = {
            method: 'PUT',
            body: JSON.stringify({
                id,
                desc,
                local
            }),
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }
        }

        try {

            const data = await fetch(`${BASE_URL}lojas/estabelecimento`, dados)
            const json = await data.json()
            console.log(json);
            return json

        }catch(e) {
            return {error: 'erro ao conectar com o Banco, verifique a conexão com servidor'};
        }       
    },
    excluirLoja: async function (id) {

        const dados = {
            method: 'DELETE',
            body: JSON.stringify({
                id
            }),
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }
        }

        try {

            const data = await fetch(`${BASE_URL}lojas/estabelecimento`, dados)
            const json = await data.json()

            return json

        }catch(e) {
            return {error: 'erro ao conectar com o Banco, verifique a conexão com servidor'};
        }       
    }

}

}