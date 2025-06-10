const form = document.getElementById('item-form');
const lista = document.getElementById('estoque-lista');

let itens = JSON.parse(localStorage.getItem('estoque')) || [];

function renderizarTabela() {
  lista.innerHTML = '';
  itens.forEach((item, index) => {
    const row = `
      <tr>
        <td>${item.codigo}</td>
        <td>${item.nome}</td>
        <td>${item.categoria}</td>
        <td>${item.quantidade}</td>
        <td>${item.localizacao}</td>
        <td>
          <button onclick="editarItem(${index})">Editar</button>
          <button onclick="removerItem(${index})">Excluir</button>
        </td>
      </tr>
    `;
    lista.innerHTML += row;
  });
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const item = {
    codigo: document.getElementById('codigo').value,
    nome: document.getElementById('nome').value,
    categoria: document.getElementById('categoria').value,
    quantidade: parseInt(document.getElementById('quantidade').value),
    localizacao: document.getElementById('localizacao').value
  };
  itens.push(item);
  localStorage.setItem('estoque', JSON.stringify(itens));
  form.reset();
  renderizarTabela();
});

function removerItem(index) {
  itens.splice(index, 1);
  localStorage.setItem('estoque', JSON.stringify(itens));
  renderizarTabela();
}

function editarItem(index) {
  const item = itens[index];
  document.getElementById('codigo').value = item.codigo;
  document.getElementById('nome').value = item.nome;
  document.getElementById('categoria').value = item.categoria;
  document.getElementById('quantidade').value = item.quantidade;
  document.getElementById('localizacao').value = item.localizacao;
  itens.splice(index, 1); // Remove para substituir
}

renderizarTabela();
