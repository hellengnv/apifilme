const apikey = 'b7b380fe'
const frmPesquisa = document.querySelector('form')


window.onload = function () {

    fetch(`https://www.omdbapi.com/?s='naruto'&apikey=${apikey}`)
        .then(result => result.json())
        .then(json => carregalista(json))

}


frmPesquisa.onsubmit = (ev) => {
    ev.preventDefault()

    let divInfos = document.querySelector('div.infos-filme');

    let divLista = document.querySelector('div.lista');
    mostraDiv(divLista);
    escondeDiv(divInfos);

    const pesquisa = ev.target.pesquisa.value

    if (pesquisa == '') {
        alert('preencha o campo')
        return
    }

    fetch(`https://www.omdbapi.com/?s=${pesquisa}&apikey=${apikey}`)
        .then(result => result.json())
        .then(json => carregalista(json))
}



const carregalista = (json) => {
    const lista = document.querySelector('div.lista')
    lista.innerHTML = ''

    if (!json.Response == 'False') {
        alert('Nenhum filme encontrado')
        return
    }

    json.Search.forEach(element => {
        console.log(element)

        let item = document.createElement('div')
        item.classList.add('item')
        item.addEventListener('click', () => {

            pegarInfosFilme(element.imdbID);

            let divInfos = document.querySelector('div.infos-filme');
            let divLista = document.querySelector('div.lista');

            mostraDiv(divInfos);
            escondeDiv(divLista);
        })

        item.innerHTML = `<img src="${element.Poster}"/><h2>${element.Title}</h2><p>${element.Year}</p><h6>Tipo: ${element.Type}</h6>`

        lista.appendChild(item)
    });
}

const pegarInfosFilme = (imdbid) => {

    fetch(`https://www.omdbapi.com/?i=${imdbid}&apikey=${apikey}`).then(result => result.json()).then(json => {

        console.log(json)

        let plot = json.Plot;
        let genero = json.Genre;
        let imagem = json.Poster;
        let tempoDeFilme = json.Runtime;
        let tipo = json.Type;
        let ano = json.Year;
        let atores = json.Actors;
        let awards = json.Awards;
        let nome = json.Title;


        limpaDiv();


        criarConteudoDaDivInfosFilme({ plot, genero, imagem, tempoDeFilme, tipo, ano, atores, awards, nome });

    });
}


const limpaDiv = () => {
    const lista = document.querySelector('div.infos-filme')
    lista.innerHTML = '';
}


const escondeDiv = (div) => {


    if (div.style.display != 'none') {

        div.style.display = 'none';

    }
}

const mostraDiv = (div) => {

    if (div.style.display == 'none') {

        div.style.display = 'flex';

    }
}


const criarConteudoDaDivInfosFilme = (infos) => {

    let divFather = document.querySelector('.infos-filme');

    let card = document.createElement('div');

    card.classList.add('card');

    let cardApresentation = document.createElement('div');
    cardApresentation.classList.add('card-apresentation');

    let cardImage = document.createElement('div');
    cardImage.classList.add('card-image');

    let imagemCard = document.createElement('img');
    imagemCard.src = infos.imagem;

    let cardNome = document.createElement('div');
    cardNome.classList.add('card-nome');
    cardNome.innerHTML = infos.nome;

    let cardInfos = document.createElement('div');
    cardInfos.classList.add('card-infos');

    let descricao = document.createElement('div');
    descricao.classList.add('descricao');
    descricao.innerHTML = infos.plot;

    let genero = document.createElement('div');
    genero.classList.add('genero');
    genero.innerHTML = infos.genero;

    let tempoDeFilme = document.createElement('div');
    tempoDeFilme.classList.add('tempodefilme');
    tempoDeFilme.innerHTML = infos.tempoDeFilme;

    let tipo = document.createElement('div');
    tipo.classList.add('tipo');
    tipo.innerHTML = infos.tipo;

    let ano = document.createElement('div');
    ano.classList.add('ano');
    ano.innerHTML = infos.ano;

    let atores = document.createElement('div');
    atores.classList.add('atores');
    atores.innerHTML = infos.atores;

    let awards = document.createElement('div');
    awards.classList.add('awards');
    awards.innerHTML = infos.awards;

    cardImage.appendChild(imagemCard);

    cardApresentation.appendChild(cardImage);
    cardApresentation.appendChild(cardNome);

    cardInfos.appendChild(descricao);
    cardInfos.appendChild(genero);
    cardInfos.appendChild(tempoDeFilme);
    cardInfos.appendChild(tipo);
    cardInfos.appendChild(ano);
    cardInfos.appendChild(atores);
    cardInfos.appendChild(awards);

    card.appendChild(cardApresentation);
    card.appendChild(cardInfos);

    divFather.appendChild(card);

}




