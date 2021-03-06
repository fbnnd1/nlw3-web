//Relação de páginas

//Importando meios de acesso aos dados
const Database = require('./database/db');
const saveOrphanage = require("./database/saveOrphanage.js");
const registerLogs = require("./register-logs.js");

module.exports = {
    index(req, res) {
        return res.render('index');
    },
    async orphanage(req, res) {
        const id = req.query.id;

        try {

            const db = await Database;
            const results = await db.all(`SELECT * FROM orphanages WHERE id = "${id}"`);
            const orphanage = results[0];

            //Converntendo para array onde cada elemento é 1 imagem
            orphanage.images = orphanage.images.split(",");
            orphanage.firstImage = orphanage.images[0];

            //Transformando em boolando o valor de open_on_weekends p/ alteração de apresentação do dado
            //Desafio: aplicar operador terenário
            if (orphanage.open_on_weekends == "0") {
                orphanage.open_on_weekends = false;
            } else {
                orphanage.open_on_weekends = true;
            }

            return res.render('orphanage', {orphanage});

        } catch(error) {
            console.log(error);
            //Registrando log de erro
            registerLogs("D1", error.toString());
            //return res.send("Erro no banco de dados");
            return res.redirect('/error-msg');
        }

    },
    async orphanages(req, res) {
        try {

            const db = await Database;
            const orphanages = await db.all("SELECT * FROM orphanages");
            return res.render('orphanages', {orphanages});
        
        } catch(error) {
            console.log(error);
            //Registrando log de erro
            registerLogs("D1", error.toString());
            //return res.send("Erro no banco de dados");
            return res.redirect('/error-msg');
        }
    },
    createOrphanage(req, res) {
        return res.render('create-orphanage');
    },

    //Função para salvar os dados de um novo orfanato
    async saveOrphanage(req, res) {
        const fields = req.body;

        //Validar se todos os campos foram preenchidos
        if (Object.values(fields).includes('')) {
            return res.send('Todos os campos devem ser preenchidos!');
        }

        try{
            const db = await Database;

            await saveOrphanage(db, {
                
                lat: fields.lat,
                lng: fields.lng,
                name: fields.name,
                about: fields.about,
                whatsapp: fields.whatsapp,
                images: fields.images.toString(),
                instructions: fields.instructions,
                opening_hours: fields.opening_hours,
                open_on_weekends: fields.open_on_weekends

            });

            //redirecionando para página com os orfanatos
            return res.redirect('/orphanages');

        } catch(error) {
            console.log(error);
            //Registrando log de erro
            registerLogs("D2", error.toString());
            //return res.send("Erro no banco de dados");
            return res.redirect('/error-msg');
        }
    },
    pageError(req, res) {
        if (req.accepts('html')) {
            const errorMsg = {msg:"Erro no banco de dados."};
            res.render('error', {errorMsg} );
            return;
        }
    },
    pageNotFound(req, res) { //Página não localizada
        if (req.accepts('html')) {
            const errorMsg = {msg:"Página ou recurso não localizado!"};
            res.render('error', {errorMsg} );
            return;
        }
    }
};