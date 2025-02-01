const protocolo = 'http://';
const baseURL = 'localhost:3003';

function formatarDataDDMMYYYY(data) {
    const d = new Date(data);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Exibe alertas na interface
function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
    let alert = document.querySelector(seletor)
    alert.innerHTML = innerHTML

    alert.classList.add(...classesToAdd)
    alert.classList.remove(...classesToRemove)

    setTimeout(() => {
        alert.classList.remove('show');
        alert.classList.add('d-none');
    }, timeout);
}

// Função para carregar eventos com redirecionamento específico
async function cadastrarEvento() {
    //constrói a URL completa
    const eventosEndpoint = '/cadastrar'
    const URLCompleta = `${protocolo}${baseURL}${eventosEndpoint}`

    //pega os inputs que contém os valores que o usuário digitou
    let nomeInput = document.querySelector('#nomeEventoInput')
    let dataInicioInput = document.querySelector('#dataInicioInput')
    let precoInput = document.querySelector('#precoInput');
    let descricaoInput = document.querySelector('#descricaoInput')
    // let urlLogoInput = document.querySelector('#urlLogoInput')
    let urlSiteInput = document.querySelector('#urlSiteInput')
    let enderecoInput = document.querySelector('#enderecoInput')
    let cepInput = document.querySelector('#cepInput')
    let cidadeInput = document.querySelector('#cidadeInput')
    let estadoInput = document.querySelector('#estadoInput')
    let numeroInput = document.querySelector('#numeroInput')
    let categoriasInput = document.querySelector('#categoriaInput')

    //pega os valores digitados pelo usuário
    let nome = nomeInput.value
    let dataInicio = formatarDataDDMMYYYY(dataInicioInput.value);
    let preco = parseFloat(precoInput.value)
    let descricao = descricaoInput.value
    // let urlLogo = urlLogoInput.value
    let urlSite = urlSiteInput.value
    let endereco = enderecoInput.value
    let cep = cepInput.value
    let cidade = cidadeInput.value
    let estado = estadoInput.value
    let numero = numeroInput.value
    let categorias = categoriasInput.value


    if (nome && dataInicio && preco >= 0 && descricao && urlSite && cep && endereco && cidade && estado && numero && categorias) {

        //limpa os campos que o usuário digitou
        nomeEventoInput.value = "";
        dataInicioInput.value = "";
        precoInput.value = "";
        descricaoInput.value = "";
        // urlLogoInput.value = "";
        urlSiteInput.value = "";
        enderecoInput.value = "";
        cepInput.value = "";
        cidadeInput.value = "";
        estadoInput.value = "";
        numeroInput.value = "";
        categoriasInput.value = "";

        //envia os dados ao servidor (back end)
        try {
        const response = (await axios.post(URLCompleta, {
            nome,
            dataInicio,
            preco, 
            descricao,
            urlSite, 
            endereco,
            cep,
            cidade, 
            estado, 
            numero,
            categorias
        })).data

             // Obtém a lista atualizada de eventos após o cadastro
             const eventos = response.data;  
             console.log(eventos)     

        exibirAlerta('.alert-evento', 'Evento cadastrado com sucesso', ['show',
            'alert-success'], ['d-none'], 2000)
                 
        } catch(error) {
             // Caso ocorra um erro ao cadastrar
             console.error(error);
             exibirAlerta('.alert-evento', 'Erro ao cadastrar evento', ['show', 'alert-danger'], ['d-none'], 2000);
        }
    }
    //senão, exibe o alerta por até 2 segundos
    else {
        exibirAlerta('.alert-evento', 'Preencha todos os campos', ['show','alert-danger'], ['d-none'], 2000)
    }
}
 
// API para listar eventos 
async function carregarEventos() {
    const eventosEndpoint = '/eventosRecentes';
    const URLCompleta = `${protocolo}${baseURL}${eventosEndpoint}`;

    try {
        const response = await axios.get(URLCompleta);
        const eventos = response.data;

        const container = document.querySelector('#eventosContainer');
        // container.innerHTML = '';

        eventos.forEach(evento => {
            const card = `
            <div class="col">
                <div class="card h-100">
                    <img src="${evento.urlLogo || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${evento.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${evento.nome}</h5>
                        <p class="card-text">${evento.descricao}</p>
                        <p class="card-text">
                            <small class="text-muted">Data: ${formatarDataDDMMYYYY(evento.dataInicio)}</small>
                        </p>
                        <a href="indexEventoEspecifico.html?id=${evento._id}" class="btn btn-primary">Saiba Mais</a>
                    </div>
                </div>
            </div>
        `;        
            container.insertAdjacentHTML('beforeend', card);
        });
    } catch (error) {
        console.error('Erro ao carregar eventos:', error);
    }
}

document.addEventListener('DOMContentLoaded', carregarEventos());

async function carregarEventosOrdenados() {
    const eventosOrdenadosEndpoint = '/eventosOrdenados';
    const URLCompleta = `${protocolo}${baseURL}${eventosOrdenadosEndpoint}`;

    try {
        const response = await axios.get(URLCompleta);
        const eventos = response.data;

        const container = document.querySelector('#eventosOrganizados'); 
        // container.innerHTML = ''; 

        eventos.forEach(evento => {
            const card = `
            <div class="col">
                <div class="card h-100">
                    <img src="${evento.urlLogo || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${evento.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${evento.nome}</h5>
                        <p class="card-text">${evento.descricao}</p>
                        <p class="card-text">
                            <small class="text-muted">Data: ${formatarDataDDMMYYYY(evento.dataInicio)}</small>
                        </p>
                        <a href="indexEventoEspecifico.html?id=${evento._id}" class="btn btn-primary">Saiba Mais</a>
                    </div>
                </div>
            </div>
        `;
        
            container.insertAdjacentHTML('beforeend', card);
        });
    } catch (error) {
        console.error('Erro ao carregar eventos ordenados:', error);
    }
}

// Chamar a função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarEventosOrdenados);

 document.addEventListener("DOMContentLoaded", () => {
    const authLink = document.querySelector('#authLink');

    authLink.addEventListener('click', (e) => {
        e.preventDefault(); 

        const token = localStorage.getItem('token');
        
        if (token) {
            window.location.href = 'cadastroEventos.html';
        } else {
            window.location.href = 'login.html';
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const loginLink = document.querySelector("#loginLink");

    loginLink.addEventListener("click", (e) => {
        e.preventDefault();

        window.location.href = "login.html";
    });
});

// document.addEventListener("DOMContentLoaded", () => {
//     const loginLink = document.querySelector("#cadastroLink");

//     loginLink.addEventListener("click", (e) => {
//         e.preventDefault();

//         window.location.href = "cadastro.html";
//     });
// });

document.getElementById('logo-link').addEventListener('click', function () {
    window.location.href = 'index-03.html';
});

async function carregarCarrossel() {
    const eventosEndpoint = '/eventosCarrossel';
    const URLCompleta = `${protocolo}${baseURL}${eventosEndpoint}`;

    try {
        const response = await axios.get(URLCompleta);
        const eventos = response.data;

        const carouselInner = document.querySelector('.carousel-inner');
        const carouselIndicators = document.querySelector('.carousel-indicators');

        // carouselInner.innerHTML = ''; 
        // carouselIndicators.innerHTML = ''; 

        eventos.forEach((evento, index) => {
            const activeClass = index === 0 ? 'active' : '';

            // Adiciona os indicadores
            const indicator = `
                <button type="button" data-bs-target="#carouselExampleIndicators" 
                    data-bs-slide-to="${index}" 
                    class="${activeClass}" aria-current="true" aria-label="Slide ${index + 1}">
                </button>`;
            carouselIndicators.insertAdjacentHTML('beforeend', indicator);

            // Adiciona os itens do carrossel
            const carouselItem = `
                <div class="carousel-item ${activeClass}">
                    <img src="${evento.urlLogo || 'https://via.placeholder.com/800x500'}" 
                         class="d-block w-100" alt="${evento.nome}" height="500">
                </div>`;
            carouselInner.insertAdjacentHTML('beforeend', carouselItem);
        });
    } catch (error) {
        console.error('Erro ao carregar carrossel:', error);
    }
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarCarrossel);

 // Carrega o evento específico
//  async function carregarEventoEspecifico() {
//     const params = new URLSearchParams(window.location.search);
//     const eventoId = params.get('id');

//     // if (!eventoId) {
//     //     console.error('ID do evento não fornecido.');
//     //     return;
//     // }

//     try {
//         const response = await axios.get(`${protocolo}${baseURL}/evento/${eventoId}`);
//         const evento = response.data;

//         // Preenche os elementos HTML
//         document.getElementById('eventoTitulo').innerText = `${evento.nome}`;
//         document.getElementById('eventoLocal').innerText = `${evento.endereco}, ${evento.cidade} - ${evento.estado}`;
//         document.getElementById('eventoData').innerText = new Date(evento.dataInicio).toLocaleDateString();
//         document.getElementById('eventoCep').innerText = evento.cep;
//         document.getElementById('eventoDescricao').innerText = evento.descricao;
//         document.getElementById('eventoCategoria').innerText = evento.categorias;
//         document.getElementById('eventoPreco').innerText = `R$ ${evento.preco}`;
//         document.getElementById('eventoCadastro').innerText = new Date(evento.dataCadastro).toLocaleDateString();

//         // Atualiza o banner (opcional)
//         const banner = document.getElementById('eventoBanner');
//         if (evento.urlLogo) {
//             banner.src = evento.urlLogo;
//             banner.alt = evento.nome;
//         }
//     } catch (error) {
//         console.error('Erro ao carregar detalhes do evento:', error);
//     }
// }

// Executa ao carregar a página
// document.addEventListener('DOMContentLoaded', carregarEventoEspecifico);

document.querySelector('form.d-flex').addEventListener('submit', async function (e) {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const query = document.querySelector('input[aria-label="Pesquisar"]').value;

    if (query) {
        try {
            const response = await axios.get(`${protocolo}${baseURL}/pesquisar?q=${query}`);
            const eventos = response.data;

            const container = document.querySelector('#eventosContainer');
            container.innerHTML = ''; // Limpa os resultados anteriores

            if (eventos.length > 0) {
                eventos.forEach(evento => {
                    const card = `
                    <div class="col">
                        <div class="card h-100">
                            <img src="${evento.urlLogo || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${evento.nome}">
                            <div class="card-body">
                                <h5 class="card-title">${evento.nome}</h5>
                                <p class="card-text">${evento.descricao}</p>
                                <p class="card-text">
                                    <small class="text-muted">Data: ${formatarDataDDMMYYYY(evento.dataInicio)}</small>
                                </p>
                                <a href="indexEventoEspecifico.html?id=${evento._id}" class="btn btn-primary">Saiba Mais</a>
                            </div>
                        </div>
                    </div>`;
                    container.insertAdjacentHTML('beforeend', card);
                });
            } else {
                container.innerHTML = '<p class="text-center">Nenhum evento encontrado.</p>';
            }
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
    } else {
        alert('Digite algo para pesquisar.');
    }
});

document.querySelector('.nav-link i.bi-geo-alt-fill').parentElement.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                alert(`Sua localização é: Latitude: ${latitude}, Longitude: ${longitude}`);

                // Enviar os dados para o servidor, se necessário
                // salvarLocalizacao(latitude, longitude);
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("Permissão negada. Ative a geolocalização.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("Informações de localização indisponíveis.");
                        break;
                    case error.TIMEOUT:
                        alert("O tempo para obter a localização expirou.");
                        break;
                    default:
                        alert("Ocorreu um erro ao obter a localização.");
                }
            }
        );
    } else {
        alert("Geolocalização não suportada pelo navegador.");
    }
});

// document.addEventListener('DOMContentLoaded', async () => {
//     const enderecoDefault = "São Paulo, Brasil"; // Endereço padrão caso não tenha entrada
//     const textoLocalizacao = document.querySelector('#localizacaoTexto');
//     const mapaLocalizacao = document.querySelector('#mapaLocalizacao');

//     try {
//         // Buscar coordenadas usando a API Nominatim
//         const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(enderecoDefault)}&accept-language=pt-br`);
//         const data = await response.json();

//         if (data && data.length > 0) {
//             const { lat, lon, display_name } = data[0];

//             // Atualizar texto e mapa
//             // textoLocalizacao.innerText = `Endereço: ${display_name}`;
//             const mapaURL = `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
//             mapaLocalizacao.innerHTML = `<iframe src="${mapaURL}" width="100%" height="100%" frameborder="0" style="border:0;" allowfullscreen></iframe>`;
//         } else {
//             textoLocalizacao.innerText = "Endereço padrão não encontrado.";
//         }
//     } catch (error) {
//         console.error("Erro ao carregar localização inicial:", error);
//         // textoLocalizacao.innerText = "Erro ao buscar localização inicial.";
//     }
// });


document.addEventListener("DOMContentLoaded", () => {
    const loginLink = document.querySelector("#loginLink");

    // Verifica se o usuário está logado
    if (localStorage.getItem('token')) {
        loginLink.innerHTML = `<i class="bi bi-box-arrow-right me-1"></i>Sair`;
        loginLink.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem('token'); // Remove o token do localStorage
            window.location.href = 'index-03.html'; // Recarrega a página
        });
    } else {
        loginLink.innerHTML = `<i class="bi bi-person-circle me-1"></i>Entre ou Cadastre-se`;
        loginLink.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "login.html"; // Redireciona para login
        });
    }
});

// const backend = async () => {
//     const imagemInput = document.querySelector("#image");

//     if (!imagemInput.files.length) {
//         alert("Selecione uma imagem para processar!");
//         return;
//     }

//     let formData = new FormData();
//     formData.append("image", imagemInput.files[0]);

//     try {
//         const response = await axios.post("http://localhost:3003/backend", formData, {
//             headers: { "Content-Type": "multipart/form-data" }
//         })

//         console.log("Resultado da IA:", response.data);
//         alert("Imagem processada! Verifique o console.");
//     } catch (error) {
//         console.error("Erro ao processar imagem:", error);
//         alert("Erro ao processar imagem.");
//     }
// }



const KEY = "AIzaSyAvLOmxABck9rJATmaVFAeZXuE1vC2EN8s";
async function gerarNome(categoria) {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${KEY}`,
            {
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `Apresente um nome criativo com base na categoria do evento: "${categoria}". Não precisa utilizar caracteres especiais no texto, como #, **, etc.`
                            }
                        ]
                    }
                ]
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );
        console.log("Resposta:", response.data)
        const nome = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
        return nome|| "Nome não gerado"
    } catch (error) {
        console.error("Erro ao gerar a nome do evento:", error.response?.data || error.message)
        return "";
    }
}
async function atribuirNome() {
    const nomeInput = document.getElementById("nomeEventoInput")
    const categoriaInput = document.getElementById("categoriaInput").value
    if (!categoriaInput) {
        alert("Preencha a categoria para gerar o nome");
        return;
    }
    nomeInput.value = "Gerando nome..."; 
    const newName = await gerarNome(categoriaInput);
    if (newName) {
        nomeInput.value = newName;  
    } else {
        nomeInput.value = ""; 
        alert("Erro ao gerar nome do evento");
    }
}
document.getElementById("btn-gerar-nome").addEventListener("click", atribuirNome)