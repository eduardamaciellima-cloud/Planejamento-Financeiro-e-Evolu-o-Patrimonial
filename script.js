// Dados extraídos da planilha de planejamento financeiro
const dadosFinanceiros = [
  { ano: 2026, idade: 18, salario: 1500.00, reserva: 180.00, valorInicial: 0.00, rendimento: 0.00, valorFinal: 180.00 },
  { ano: 2027, idade: 19, salario: 1650.00, reserva: 198.00, valorInicial: 180.00, rendimento: 9.00, valorFinal: 387.00 },
  { ano: 2028, idade: 20, salario: 1815.00, reserva: 217.80, valorInicial: 387.00, rendimento: 19.35, valorFinal: 624.15 },
  { ano: 2029, idade: 21, salario: 1996.50, reserva: 239.58, valorInicial: 624.15, rendimento: 31.21, valorFinal: 894.94 },
  { ano: 2030, idade: 22, salario: 2196.15, reserva: 263.54, valorInicial: 894.94, rendimento: 44.75, valorFinal: 1203.22 },
  { ano: 2031, idade: 23, salario: 2415.77, reserva: 289.89, valorInicial: 1203.22, rendimento: 60.16, valorFinal: 1553.28 },
  { ano: 2032, idade: 24, salario: 2657.34, reserva: 318.88, valorInicial: 1553.28, rendimento: 77.66, valorFinal: 1949.82 },
  { ano: 2033, idade: 25, salario: 2923.08, reserva: 350.77, valorInicial: 1949.82, rendimento: 97.49, valorFinal: 2398.08 },
  { ano: 2034, idade: 26, salario: 3215.38, reserva: 385.85, valorInicial: 2398.08, rendimento: 119.90, valorFinal: 2903.83 },
  { ano: 2035, idade: 27, salario: 3536.92, reserva: 424.43, valorInicial: 2903.83, rendimento: 145.19, valorFinal: 3473.45 },
  { ano: 2036, idade: 28, salario: 3890.61, reserva: 466.87, valorInicial: 3473.45, rendimento: 173.67, valorFinal: 4114.00 }
];

// Funções de Formatação
const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// Preencher Tabela HTML
function renderizarTabela() {
  const tbody = document.querySelector('#tabelaFinanceira tbody');
  tbody.innerHTML = '';

  let totalReserva = 0;
  let totalRendimento = 0;

  dadosFinanceiros.forEach(item => {
    totalReserva += item.reserva;
    totalRendimento += item.rendimento;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="col-ano">${item.ano}</td>
      <td class="col-idade">${item.idade}</td>
      <td class="col-moeda">${formatarMoeda(item.salario)}</td>
      <td class="col-moeda col-reserva">${formatarMoeda(item.reserva)}</td>
      <td class="col-moeda">${formatarMoeda(item.valorInicial)}</td>
      <td class="col-moeda col-rendimento">${formatarMoeda(item.rendimento)}</td>
      <td class="col-moeda col-valor-final">${formatarMoeda(item.valorFinal)}</td>
    `;
    tbody.appendChild(tr);
  });

  // Linha de Rodapé / Totais
  const tfootRow = document.getElementById('linhaTotal');
  const ultimoValorFinal = dadosFinanceiros[dadosFinanceiros.length - 1].valorFinal;
  
  tfootRow.innerHTML = `
    <td colspan="3" style="text-align: left;">Total Acumulado</td>
    <td class="col-moeda col-reserva">${formatarMoeda(totalReserva)}</td>
    <td class="col-moeda">-</td>
    <td class="col-moeda col-rendimento">${formatarMoeda(totalRendimento)}</td>
    <td class="col-moeda col-valor-final">${formatarMoeda(ultimoValorFinal)}</td>
  `;
}

// Renderizar Gráfico Chart.js
function renderizarGrafico() {
  const ctx = document.getElementById('chartPatrimonio').getContext('2d');
  
  const anos = dadosFinanceiros.map(d => d.ano);
  const valoresFinais = dadosFinanceiros.map(d => d.valorFinal);
  const reservas = dadosFinanceiros.map(d => d.reserva);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: anos,
      datasets: [
        {
          label: 'Valor Final Acumulado (R$)',
          data: valoresFinais,
          borderColor: '#1f497d',
          backgroundColor: 'rgba(31, 73, 125, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.3,
          pointRadius: 5,
          pointBackgroundColor: '#2f5597'
        },
        {
          label: 'Reserva Anual Aportada (R$)',
          data: reservas,
          borderColor: '#1e4620',
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${formatarMoeda(context.raw)}`;
            }
          }
        }
      },
      scales: {
        y: {
          ticks: {
            callback: (value) => `R$ ${value}`
          }
        }
      }
    }
  });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  renderizarTabela();
  renderizarGrafico();
});
