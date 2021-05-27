const { render } = require('ejs')
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static(__dirname+ '/public'))

const produto = []

app.get('/', (req, res)=>{
    res.render('pages/principal')
})

app.get('/sobre', (req, res)=>{
    res.render('pages/sobre',{
        sobre: produto
    })
})

//Read
app.get('/produtos', (req, res)=>{ //Mostrar arquivos
    if(produto.length > 0){
        res.render('pages/produtos', {
            produtos: produto
        })
    }else{
        res.render('pages/aviso', {
            nota: "Lista Vazia"
        })
    }   
})

//Create
app.get('/cadastro', (req, res)=>{ //Página que exibe a tela de cadastro de produtos
    res.render('pages/cadastro')
})

app.post('/cadastrar', (req, res)=>{ //Função que insere os dados no Array

    const codigoProduto = req.body.codigo
    const descProduto = req.body.descricao
    const qtdeProduto = req.body.quantidade
    const precoProduto = req.body.preco
    var arr = {codigo: codigoProduto, descricao: descProduto, quantidade: qtdeProduto, preco: precoProduto}

    produto.push(arr)
    res.redirect('/cadastro')
})

//Delete
app.get('/remove', (req, res)=>{ //Página que exibe os produtos do array para serem removidos 
    if(produto.length > 0){
        res.render('pages/remove', {
            produtos: produto
        })
    }else{
        res.render('pages/aviso', {
            nota: "Lista Vazia"
        })
    }
})

app.get('/apaga/:id',(req,res)=>{ //Função que apaga os itens do array
    const i = req.params.id
    produto.splice(i,1)
    res.render('pages/cadastro')
})

//Update
app.get('/alterar', (req, res)=>{ //Página que exibe os produtos do array para serem alterados
    if(produto.length > 0){
        res.render('pages/altera', {
            produtos: produto
        })
    }else{
        res.render('pages/aviso', {
            nota: "Lista Vazia"
        })
    }   
})

app.get('/pageAltera/:id', (req, res)=>{ //Página que exibe o formulário que irá alterar os campos do array
    const id = parseInt(req.params.id)
    const dado = produto[id]
    res.render('pages/update',{
        nota: dado, indice : id
    })
})

app.post('/update/:id', (req, res)=>{ //Função que altera os valores do array
    const id = parseInt(req.params.id)
    const campo = req.body
    produto[id] = campo
    res.redirect('/alterar')
})

app.listen(port, ()=>{ //Chamada do servidor
    console.info('Servindo rondando em localhost:' +port)})
