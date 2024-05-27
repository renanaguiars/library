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
    exibirLivros()
})

categoria.addEventListener('change', (e: Event) => {
    e.preventDefault()
    exibirLivros()
})

function salvarLivros(): void {
    localStorage.setItem('livrosArr', JSON.stringify(livrosArr))
}

function getLivros(): Livro[] {
    return JSON.parse(localStorage.getItem('livrosArr') || '[]')
}

function removerLivro(id: string | number): void {
    const livros = getLivros()
    const livrosAtualizados = livros.filter((livro: Livro) => livro.id !== id);
    localStorage.setItem('livrosArr', JSON.stringify(livrosAtualizados));
    livrosArr = livrosAtualizados;
    exibirLivros()
}

function exibirLivros(): void {
    listaLivros.innerHTML = ''
    const livros = getLivros()
    const generoSelecionado = categoria.value;

    const livrosFiltrados = livros.filter((livro: Livro) => livro.genero === generoSelecionado)
    
    livrosFiltrados.forEach((livro: Livro) => {
        const li = document.createElement('li');
        li.classList.add('book-li');
        li.textContent = `${livro.nome} - ${livro.autor}`

        const img = document.createElement('img')
        img.setAttribute('src', 'imagens/excluir.png')
        img.classList.add('btn-delete')

        img.addEventListener('click', () => {
            const res = confirm(`Deseja mesmo remover o livro ${livro.nome} ?`)
            if(res) {
                li.remove();
                removerLivro(livro.id)
            }
        });

        li.appendChild(img)
        listaLivros.appendChild(li)
    })
}

exibirLivros();