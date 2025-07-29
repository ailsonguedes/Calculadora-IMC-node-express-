const {imc, classImc} = require('./utils/imc.js');
const express = require('express');
const app = express();
const port = 3000;

// Middleware para servir arquivos estáticos da pasta 'public'
// Isso permite que seu navegador acesse index.html, style.css e script.js
app.use(express.static('public'));

// Middleware para parsear o corpo das requisições POST como JSON
app.use(express.json());

// Rota POST para calcular o IMC
app.post('/calcImc', (req, res) => {
    const { peso, altura } = req.body;

    // Validação básica
    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        return res.status(400).json({message: 'Peso e altura devem ser valores positivos.'});
    }

    // Usar as funções importadas para calcular e classificar o imc
    const imcCalc = imc(peso, altura);
    const status = classImc(imcCalc);

    // Envia a resposta como JSON
    res.json({imc: imcCalc, status: status})
});

// Iniciar Servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log('Abra esta URL no seu navegador para usar a calculadora de IMC');
});
