let nomes = [];


function adicionar() {
    let nomeAmigo = document.getElementById('nome-amigo').value;

    if (nomeAmigo.trim() !== '') {
        let novoNome = document.createElement('li');
        novoNome.textContent = nomeAmigo;

        //Adiciona o novo elemento à lista
        document.getElementById('lista-amigos').appendChild(novoNome);
        nomes.push(nomeAmigo);

        //Limpa o campo de texto após adicionar o nome
        document.getElementById('nome-amigo').value = '';
    }        
}


function sortear() {
    if (nomes.length < 2) {
        alert('É necessário pelo menos 2 pessoas para sortear.');
        return;
    }

    let sorteio = [...nomes];
    let resultado = [];

    //Embaralha a lista de nomes
    for (let i = sorteio.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sorteio[i], sorteio[j]] = [sorteio[j], sorteio[i]];
    }

    //Assegura que ninguém tire a si mesmo
    let tentativas = 0;
    while (tentativas < 100) {
        tentativas++;
        let sucesso = true;
        resultado.length = 0;

        for (let i = 0; i < nomes.length; i++) {
            if (nomes[i] === sorteio[i]) {
                sucesso = false;
                const temp = sorteio[i];
                sorteio[i] = sorteio[(i + 1) % nomes.length];
                sorteio[(i + 1) % nomes.length] = temp;
                break;
            }    
            resultado.push(`${nomes[i]} tirou ${sorteio[i]} como amigo secreto`);
        }  
        
        if (sucesso) break;
    }    

    //Exibe o resultado do sorteio
    let resultadoSorteioEl = document.getElementById('lista-sorteio');
    resultadoSorteioEl.innerHTML = '';
    resultado.forEach(par => {
        let item = document.createElement('li');
        item.textContent = par;
        resultadoSorteioEl.appendChild(item);
    });
}


function reiniciar() {
    nomes = [];

    document.getElementById('lista-amigos').innerHTML = '';
    document.getElementById('lista-sorteio').innerHTML = '';
}