const protocolo = 'http://'
const baseURL = 'localhost:3003'

const fazerLogin = async () => {
    const emailLoginInput = document.querySelector('#emailLoginInput');
    const senhaLoginInput = document.querySelector('#senhaLoginInput');
    const emailLogin = emailLoginInput.value;
    const senhaLogin = senhaLoginInput.value;

    if (emailLogin && senhaLogin) {
        try {
            const loginEndpoint = '/loginUsuario';
            const URLCompleta = `${protocolo}${baseURL}${loginEndpoint}`;
            const response = await axios.post(URLCompleta, { email: emailLogin, senha: senhaLogin });
            
            // Salva o token no localStorage
            localStorage.setItem('token', response.data.token);
            console.log(localStorage.getItem('token'));
            
            // Limpa os campos de entrada
            emailLoginInput.value = '';
            senhaLoginInput.value = '';

            // Exibe alerta de sucesso
            exibirAlerta('.alert', "Usuário logado com sucesso!", ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000);

            // Redireciona para index-03.html após sucesso
            setTimeout(() => {
                window.location.href = 'index-03.html';
            }, 2000); // Espera 2 segundos para mostrar o alerta antes do redirecionamento

        } catch (error) {
            // Exibe alerta de erro em caso de falha
            exibirAlerta('.alert', 'Falha no login. Verifique suas credenciais.', ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000);
            console.error(error);
        }
    } else {
        // Exibe alerta se os campos estiverem vazios
        exibirAlerta('.alert', 'Preencha todos os campos', ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000);
    }
};


function validarESalvar() {
    
    cadastrarUsuario()
}

// function verificarSenha() {
//     const senhaInput = document.getElementById("senhaCadastroInput").value;
//     const confirmarSenhaInput = document.getElementById("confirmarSenhaCadastroInput").value;
//     const mensagemErro = document.getElementById("mensagemErro");

//     const regexSenhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//     if (!senhaInput || !confirmarSenhaInput) {
//         mensagemErro.innerHTML = "Por favor, preencha os campos de senha.";
//         return false;
//     }

//     if (!regexSenhaForte.test(senhaInput)) {
//         mensagemErro.innerHTML = `
//             A senha deve conter:<br>
//             - No mínimo 8 caracteres<br>
//             - Pelo menos 1 letra maiúscula<br>
//             - Pelo menos 1 letra minúscula<br>
//             - Pelo menos 1 número<br>
//             - Pelo menos 1 símbolo especial (@$!%*?&).
//         `;
//         return false;
//     }

//     if (senhaInput !== confirmarSenhaInput) {
//         mensagemErro.textContent = "As senhas não coincidem. Por favor, verifique.";
//         return false;
//     }

//     mensagemErro.textContent = "";
//     return true;
// }

async function cadastrarUsuario() {
    let nomeCadastroInput = document.querySelector('#nomeCadastroInput');
    let emailCadastroInput = document.querySelector('#emailCadastroInput');
    let senhaCadastroInput = document.querySelector('#senhaCadastroInput');
    let confirmarSenhaCadastroInput = document.querySelector('#confirmarSenhaCadastroInput');
    let nomeCadastro = nomeCadastroInput.value;
    let emailCadastro = emailCadastroInput.value;
    let senhaCadastro = senhaCadastroInput.value;
    let confirmarSenha = confirmarSenhaCadastroInput.value;

    if (nomeCadastro && emailCadastro && senhaCadastro && confirmarSenha) {
        try {
            const cadastroEndpoint = '/cadastroUsuario';
            const URLCompleta = `${protocolo}${baseURL}${cadastroEndpoint}`;
            await axios.post(URLCompleta, {
                nome: nomeCadastro,
                email: emailCadastro,
                senha: senhaCadastro,
                confirmarSenha: confirmarSenha
            });

            // Limpa os campos
            nomeCadastroInput.value = "";
            emailCadastroInput.value = "";
            senhaCadastroInput.value = "";
            confirmarSenhaCadastroInput.value = "";

            // Exibe alerta de sucesso
            exibirAlerta('.alert', "Usuário cadastrado com sucesso! Redirecionando para login...", ['show', 'alert-success'], ['d-none'], 2000);

            // Redireciona para a tela de login após 2 segundos
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);

        } catch (error) {
            // Exibe alerta de erro
            exibirAlerta('.alert', "Erro ao cadastrar usuário", ['show', 'alert-danger'], ['d-none'], 2000);
            console.error(error);
        }
    } else {
        exibirAlerta('.alert', 'Preencha todos os campos', ['show', 'alert-danger'], ['d-none'], 2000);
    }
}


function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
    let alert = document.querySelector(seletor)
    alert.innerHTML = innerHTML

    alert.classList.add(...classesToAdd)
    alert.classList.remove(...classesToRemove)

    setTimeout(() => {
        alert.classList.remove('show')
        alert.classList.add('d-none')
    }, timeout)
}

function ocultarModal(seletor, timeout){
    setTimeout(() => {
    let modal = bootstrap.Modal.getInstance(document.querySelector(seletor))
    modal.hide()
    }, timeout)
}

document.addEventListener("DOMContentLoaded", () => {
    const loginLink = document.querySelector("#cadastroLink");

    loginLink.addEventListener("click", (e) => {
        e.preventDefault();

        window.location.href = "cadastro.html";
    });
});