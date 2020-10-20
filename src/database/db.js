//Criação e acesso ao banco de dados

//Importação da lib
const Database = require('sqlite-async');
const path     = require('path');

//Definindo local banco de dados
const localDB = path.join(__dirname + '/../../database/database.sqlite');

//Função que cria a tabela no caso do banco de dados estarem vazios
function execute(db) {
    return db.exec(`
        CREATE TABLE IF NOT EXISTS orphanages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lat TEXT,
            lng TEXT,
            name TEXT,
            about TEXT,
            whatsapp TEXT,
            images TEXT,
            instructions TEXT,
            opening_hours TEXT,
            open_on_weekends TEXT
        );
    `);

}

module.exports = Database.open(localDB).then(execute);


