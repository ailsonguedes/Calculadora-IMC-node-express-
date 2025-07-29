document.getElementById('calcularBtn').addEventListener('click', async () =>{
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const resultadoDiv = document.getElementById('resultado');

    if (isNaN(peso) || isNaN (altura) || peso <= 0 || altura <= 0) {
        resultadoDiv.innerHTML = '<p style="color: red;">Por favor insira valores válidos para peso e altura</p>'
        return;
    }

    try {
        // Envia os dados para o servidor Express
        const response = await fetch('/calcImc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ peso, altura })
        });

        // Converte a resposta do servidor para JSON
        const data = await response.json();

        // Exibe o resultado na div
        if (data.imc && data.status){
            resultadoDiv.innerHTML = `
                <p>Seu IMC é <strong>${data.imc.toFixed(2)}</strong></p>
                <p>Status: <strong>${data.status}</strong></p>
            `;
        } else {
            resultadoDiv.innerHTML = `<p style="color: red;">Erro ao calcular o IMC: ${data.message || 'Resposta inválida do servidor.'}'</p>`;
        }
    } catch (erro) {
        console.error('Erro ao comunicar com o servidor', erro);
        resultadoDiv.innerHTML = '<p style="color: red;">Erro ao calcular o IMC. Tente novamente mais tarde.</p>'
    }
});
