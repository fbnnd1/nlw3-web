
/*
Códigos de erro
D1: Erro de leitura do BD.
D2: Erro de escrita do BD.
*/

//Importando bibliotecas
const path = require('path');
const fs   = require('fs');

module.exports = async function registerLogs(ErrCode, ErrDetails) {
    const actualDate = new Date();
    let msg = actualDate.toString() + "\n";

    if (ErrCode == "D1") {
        msg += "(D1): Erro de leitura no banco de dados.\n";
    }
    if (ErrCode == "D2") {
        msg += "(D2): Erro de escrita no banco de dados\n";
    }

    msg +=  "Detalhes:\n" + ErrDetails.toString() + "\n\n";

    let arqLog = actualDate.getFullYear().toString() + "-" + actualDate.getMonth() + "-";
    
    if (actualDate.getDate() < 10) {
        arqLog += "0";
    }
    arqLog += actualDate.getDate().toString() + ".log";

    arqLog = path.join(__dirname + '/../logs/' + arqLog);

    //Adiciona no final do arquivo
    await fs.appendFile(arqLog, msg, function (err) {
        if (err) throw err;
        //console.log('Registro salvo em log');
    });

}

