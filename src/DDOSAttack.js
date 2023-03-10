import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function DDOSAttack() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://myworker.prathibaramesh2120.workers.dev/attack-layer3');
            const json = await response.json();
            console.log(json);
            setData(json);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const createChart = () => {
            if (Chart.getChart('layer3-attack-chart')) {
                Chart.getChart('layer3-attack-chart').destroy();
            }
            const chartData = {
                labels: data.map((d) => d.time),
                datasets: [
                    {
                        label: 'Layer 3 DDoS Attack over the last 30 days',
                        data: data.map((d) => d.percent),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                    },
                ],
            };

            const chartConfig = {
                type: 'line',
                data: chartData,
            };

            const chartCanvas = document.getElementById('layer3-attack-chart');
            new Chart(chartCanvas, chartConfig);
        };

        createChart();
    }, [data]);

    return (
        <div>
            <h2 style={{ textAlign: "center", fontWeight: "bold" }}>Layer 3 DDoS Attack</h2>
            <p style={{ textAlign: "center" }}>The data in improper - No percentage given</p>
            <canvas id="layer3-attack-chart" style={{ height: '100px' }}></canvas>
        </div>
    );
}


export default DDOSAttack;