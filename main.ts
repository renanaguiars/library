interface Livro {
    id: number | string, 
    nome: string,
    autor: string,
    editora: string,
    paginas: number | string,
    genero: string,
    obs: string, 
    dataCadastro: string
}

let livrosArr: Livro[] = JSON.parse(localStorage.getItem('livrosArr') || '[]');

const btn: HTMLButtonElement = document.getElementById('btn') as HTMLButtonElement
const codigo: HTMLInputElement = document.getElementById('codigo') as HTMLInputElement
const nome: HTMLInputElement = document.getElementById('nome') as HTMLInputElement
const autor: HTMLInputElement = document.getElementById('autor') as HTMLInputElement
const editora: HTMLInputElement = document.getElementById('editora') as HTMLInputElement
const paginas: HTMLInputElement = document.getElementById('paginas') as HTMLInputElement
const genero: HTMLInputElement = document.getElementById('genero') as HTMLInputElement
const obs: HTMLInputElement = document.getElementById('obs') as HTMLInputElement
const data: HTMLInputElement = document.getElementById('data') as HTMLInputElement
const categoria: HTMLSelectElement = document.getElementById('categoria') as HTMLSelectElement
const listaLivros: HTMLUListElement = document.getElementById('books-ul') as HTMLUListElement

btn.addEventListener("click", (event) => {
    event.preventDefault();

// Cria um novo objeto livro a cada clique
    const livro: Livro = {
        id: codigo.value, 
        nome: nome.value,
        autor: autor.value,
        editora: editora.value,
        paginas: paginas.value,
        genero: genero.value,
        obs: obs.value,
        dataCadastro: data.value
    }

    livrosArr.push(livro)
    salvarLivros()
})

categoria.addEventListener('change', (e: Event) => {
    e.preventDefault()
    listaLivros.innerHTML = ''
    const livros = getLivros()
    const generoSelecionado = categoria.value;

    const livrosFiltrados = livros.filter((livro: Livro) => livro.genero === generoSelecionado)
    
    livrosFiltrados.forEach((livro: Livro) => {
        const li = document.createElement('li');
        li.classList.add('book-li');
        li.textContent = `${livro.nome} - ${livro.autor}`
        listaLivros.appendChild(li)
    })
})

function salvarLivros(): void {
    localStorage.setItem('livrosArr', JSON.stringify(livrosArr))
}

function getLivros(): Livro[] {
    return JSON.parse(localStorage.getItem('livrosArr') || '[]')
}