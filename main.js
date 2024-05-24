"use strict";
let livrosArr = JSON.parse(localStorage.getItem('livrosArr') || '[]');
const btn = document.getElementById('btn');
const codigo = document.getElementById('codigo');
const nome = document.getElementById('nome');
const autor = document.getElementById('autor');
const editora = document.getElementById('editora');
const paginas = document.getElementById('paginas');
const genero = document.getElementById('genero');
const obs = document.getElementById('obs');
const data = document.getElementById('data');
const categoria = document.getElementById('categoria');
const listaLivros = document.getElementById('books-ul');
btn.addEventListener("click", (event) => {
    event.preventDefault();
    // Cria um novo objeto livro a cada clique
    const livro = {
        id: codigo.value,
        nome: nome.value,
        autor: autor.value,
        editora: editora.value,
        paginas: paginas.value,
        genero: genero.value,
        obs: obs.value,
        dataCadastro: data.value
    };
    livrosArr.push(livro);
    salvarLivros();
});
categoria.addEventListener('change', (e) => {
    e.preventDefault();
    listaLivros.innerHTML = '';
    const livros = getLivros();
    const generoSelecionado = categoria.value;
    const livrosFiltrados = livros.filter((livro) => livro.genero === generoSelecionado);
    livrosFiltrados.forEach((livro) => {
        const li = document.createElement('li');
        li.classList.add('book-li');
        li.textContent = `${livro.nome} - ${livro.autor}`;
        listaLivros.appendChild(li);
    });
});
function salvarLivros() {
    localStorage.setItem('livrosArr', JSON.stringify(livrosArr));
}
function getLivros() {
    return JSON.parse(localStorage.getItem('livrosArr') || '[]');
}
