//Servidor

//importar dependencias
const express = require('express');
const path = require('path');

//importando relação de páginas
const pages = require('./pages.js');

//Iniciando o express
const server = express();

server
    //utilizando os arquivos estatísticos
    .use(express.static('public'))

    //Configurar template engine
    .set('views', path.join(__dirname, "views"))
    .set('view engine', 'hbs')

    //rotas da aplicação
    .get('/', pages.index)
    .get('/orphanage', pages.orphanage)
    .get('/orphanages', pages.orphanages)
    .get('/create-orphanage', pages.createOrphanage);

server.listen(8080);
console.log("Servidor local funcionando na porta 8080");
console.log("Acesse http://127.0.0.1:8080/ ou http://localhost:8080/ para visualizar a página inicial da aplicação.");
console.log("Para desligar o servidor, pressione <CTRL+C>.");
console.log("Nota: Para visualizar as mudanças implementadas, é necessário reiniciar o servidor manualmente.");