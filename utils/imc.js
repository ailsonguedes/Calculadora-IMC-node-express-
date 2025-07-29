function imc(peso, altura) {
    return peso / (altura * altura);
}

function classImc(imc) {
    if (imc < 18.5) return "Abaixo do peso";
    else if (imc > 18.5 && imc < 24.9) return "Peso normal";
    else if (imc > 24.9 && imc < 29.9) return "Sobrepeso";
    else if (imc > 29.9 && imc < 34.9) return "Obesidade grau I";
    else if (imc > 34.9 && imc < 39.9) return "Obesidade Grau II";
    else return "Obesidade Grau III";
}

module.exports = { imc, classImc };
