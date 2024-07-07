function authenticate() {
    const password = document.getElementById('password').value;
    
    if (password === 'SYM2024') {
        document.getElementById('calculator').style.display = 'block';
        document.getElementById('authenticate-button').style.display = 'none';
    } else {
        alert('Incorrect password. Access denied.');
    }
}

function calculateROI() {
    const investment = parseFloat(document.getElementById('investment').value);
    const roi = parseFloat(document.getElementById('roi').value) / 100;
    const years = parseInt(document.getElementById('years').value);
    const bankRate = parseFloat(document.getElementById('bank-rate').value) / 100;

    let investmentValues = [];
    let bankValues = [];
    let labels = [];

    for (let year = 0; year <= years; year++) {
        labels.push(year);
        investmentValues.push(investment * Math.pow(1 + roi, year));
        bankValues.push(investment * Math.pow(1 + bankRate, year));
    }

    displayChart(labels, investmentValues, bankValues);
}

function displayChart(labels, investmentValues, bankValues) {
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Investment ROI (€)',
                    data: investmentValues,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: false
                },
                {
                    label: 'Bank ROI (€)',
                    data: bankValues,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Years',
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Amount (€)',
                        font: {
                            weight: 'bold'
                        }
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

function clearData() {
    document.getElementById('investment').value = '';
    document.getElementById('roi').value = '';
    document.getElementById('years').value = '';
    document.getElementById('bank-rate').value = '';
    const chartContainer = document.getElementById('chart-container');
    chartContainer.innerHTML = '<canvas id="chart"></canvas>';
}

function downloadChart() {
    const link = document.createElement('a');
    link.download = 'chart.png';
    link.href = document.getElementById('chart').toDataURL('image/png').replace('image/png', 'image/octet-stream');
    link.click();
}
