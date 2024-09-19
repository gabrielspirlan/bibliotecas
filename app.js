class livro {
  constructor(id, titulo, autor, anoPublicacao, isbn) {
    this._id = id;
    this._titulo = titulo;
    this._autor = autor;
    this._anoPublicacao = anoPublicacao;
    this._isbn = isbn;
  }

  get id() {
    return this._id
  }
  get titulo() {
    return this._titulo;
  }

  get autor() {
    return this._autor;
  }
  get anoPublicacao() {
    return this._anoPublicacao;
  }
  get isbn() {
    return this._isbn;
  }

  set titulo(novoTitulo) {
    this._titulo = novoTitulo;
  }

  set autor(novoAutor) {
    this._autor = novoAutor;
  }
  set anoPublicacao(novoAno) {
    this._anoPublicacao = novoAno;
  }

  set isbn(novoISBN) {
    this._isbn = novoISBN;
  }
}
class emprestimo {
  constructor(id, livro, usuario, dataEmprestimo) {
    this._id = id;
    this._livro = livro;
    this._usuario = usuario;
    this._dataEmprestimo = dataEmprestimo;
  }
  get id() {
    return this._id
  }
  get livro() {
    return this._livro;
  }
  get usuario() {
    return this._usuario;
  }

  get dataEmprestimo() {
    return this._emprestimo;
  }

  set livro(novoLivro) {
    this._livro = novoLivro;
  }
  set usuario(novoUsuario) {
    this._usuario = novoUsuario;
  }
  set data(novaData) {
    this._dataEmprestimo = novaData;
  }
}
class leitor {
  constructor(id, nome, email) {
    this._id = id;
    this._nome = nome;
    this._email = email;
  }

  get id() {
    return this._id
  }
  get nome() {
    return this._nome;
  }

  get email() {
    return this._email;
  }

  set nome(novoNome) {
    this._nome = novoNome;
  }

  set email(novoEmail) {
    this._email = novoEmail;
  }
}

class autor {
  constructor(id, nome, nacionalidade) {
    this._id = id;
    this._nome = nome;
    this._nacionalidade = nacionalidade;
  }
  get id() {
    return this._id
  }
  get nome() {
    return this._nome;
  }

  get nacionalidade() {
    return this._nacionalidade;
  }

  set nome(novoNome) {
    this._nome = novoNome;
  }
  set nacionalidade(novaNacionalidade) {
    this._nacionalidade = novaNacionalidade;
  }
}

let livros = [new livro(1, 'Harry Potter e a Pedra Filosofal', 'J. K. Rowling', '1997', '8532511015'), new livro(2, 'Jogador n° 1', 'Ernest Cline', '2011', '9780307887436')];
let autores = [new autor(1, 'J. K. Rowling', 'Britanica'), new autor(2, 'Ernest Cline', 'Americano')];
let leitores = [new leitor(1, 'Gabriel Resende Spirlandelli', 2, 'grspirlandelli@gmail.com')];
let emprestimos = [new emprestimo(1, 'Harry Potter e a Pedra Filosofal', 2, '14-08-20')];

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())


app.get('/', (req, res) => {
  res.send('<h1>Seja bem-vindo a biblioteca.</h1> <h2> Qual opção você deseja?</h2>  <p><a href="/livros"> Livros</a> </p> <p><a href="/autores"> Autores </a></p> <p> <a href="/leitores"> Leitores </a> </p> <p><a href="/Emprestimos"> Emprestimos </a> </p')
})

// MÉTODOS GET

app.get('/livros', (req, res) => {
  res.json(livros)
})

app.get('/emprestimos', (req, res) => {
  res.json(emprestimos)
})

app.get('/autores', (req, res) => {
  res.json(autores)
})

app.get('/leitores', (req, res) => {
  res.json(leitores)
})




app.get('/livros/:id', (req, res) => {
  let id = parseInt(req.params.id)
  let encontraIndex = livros.findIndex(u => u.id === id)
  if (encontraIndex != - 1) {
    res.json(livros[encontraIndex])
  }
  else {
    res.status(404).json({ mensagem: 'Livro não encontrado' })
  }
})

app.get('/emprestimos/:id', (req, res) => {
  let id = parseInt(req.params.id)
  let encontraIndex = emprestimos.findIndex(u => u.id === id)
  if (encontraIndex != - 1) {
    res.json(emprestimos[encontraIndex])
  } else {
    res.status(404).json({ mensagem: 'Emprestimo não encontrado' })
  }
})

app.get('/autores/:id', (req, res) => {
  let id = parseInt(req.params.id)
  let encontraIndex = autores.findIndex(u => u.id === id)
  if (encontraIndex != - 1) {
    res.json(autores[encontraIndex])
  } else {
    res.status(404).json({ mensagem: 'Autor não encontrado' })
  }
})

app.get('/leitores/:id', (req, res) => {
  let id = parseInt(req.params.id)
  let encontraIndex = leitores.findIndex(u => u.id === id)
  if (encontraIndex != - 1) {
    res.json(leitores[encontraIndex])
  } else {
    res.status(404).json({ mensagem: 'Leitor não encontrado' })
  }
})



// MÉTOODS PUSH


app.post('/livros', (req, res) => {
  const novoID = livros[livros.length - 1].id + 1
  const novoCadastro = req.body
  livros.push(new livro(novoID, novoCadastro.titulo, novoCadastro.autor, novoCadastro.anoPublicacao, novoCadastro.isbn))
  res.status(201).json(novoCadastro)
})

app.post('/leitores', (req, res) => {
  const novoID = leitores[leitores.length - 1].id + 1
  const novoCadastro = req.body
  leitores.push(new leitor(novoID, novoCadastro.nome, novoCadastro.email))
  res.status(201).json(leitores)
})

app.post('/emprestimos', (req, res) => {
  const novoID = emprestimos[emprestimos.length - 1].id + 1
  const novoCadastro = req.body
  emprestimos.push(new emprestimo(novoID, novoCadastro.livro, novoCadastro.usario, novoCadastro.dataEmprestimo))
  res.status(201).json(emprestimos)
})

app.post('/autores', (req, res) => {
  const novoID = autores[autores.length - 1].id + 1
  const novoCadastro = req.body
  autores.push(new autor(novoID, novoCadastro.nome, novoCadastro.nacionalidade))
  res.status(201).json(autores)
})





// MÉTODOS PUT

app.put('/livros/:id', (req, res) => {
  let id = parseInt(req.params.id)
  let encontraIndex = livros.findIndex(u => u.id === id)
  if (encontraIndex != -1) {
    // livros[encontraIndex].titulo = req.body._titulo
    livros[encontraIndex] = { ...livros[encontraIndex], ...req.body }
  }
  res.json(livros)
})

app.put('/leitores', (req, res) => {
  let id = parseInt(req.params.id)
  let encontraIndex = leitores.findIndex(u => u.id === id)
  if (encontraIndex != -1) {
    // livros[encontraIndex].titulo = req.body._titulo
    leitores[encontraIndex] = { ...leitores[encontraIndex], ...req.body }
  }
  res.json(leitores)
})

app.put('/emprestimos', (req, res) => {
  let id = parseInt(req.params.id)
  let encontraIndex = emprestimos.findIndex(u => u.id === id)
  if (encontraIndex != -1) {
    // livros[encontraIndex].titulo = req.body._titulo
    emprestimos[encontraIndex] = { ...emprestimos[encontraIndex], ...req.body }
  }
  res.json(emprestimos)
})

app.put('/autores', (req, res) => {
  let id = parseInt(req.params.id)
  let encontraIndex = autores.findIndex(u => u.id === id)
  if (encontraIndex != -1) {
    // livros[encontraIndex].titulo = req.body._titulo
    autores[encontraIndex] = { ...autores[encontraIndex], ...req.body }
  }
  res.json(autores)
})


// MÉTODOS DELETE

app.delete('/livros/:id', (req, res) => {
  let id = parseInt(req.params.id)
  livros = livros.filter(u => u.id !== id);
  res.json({ mensagem: 'Livro excluído com sucesso' });
})

app.delete('/leitores/:id', (req, res) => {
  let id = parseInt(req.params.id)
  leitores = leitores.filter(u => u.id !== id);
  res.json({ mensagem: 'Leitor excluído com sucesso' });
})

app.delete('/emprestimos/:id', (req, res) => {
  let id = parseInt(req.params.id)
  emprestimos = emprestimos.filter(u => u.id !== id);
  res.json({ mensagem: 'Emprestimos excluído com sucesso' });
})

app.delete('/autores/:id', (req, res) => {
  let id = parseInt(req.params.id)
  autores = autores.filter(u => u.id !== id);
  res.json({ mensagem: 'Autor excluído com sucesso' });
})





app.listen(port, () => { console.log("Servidor Rodando") })
