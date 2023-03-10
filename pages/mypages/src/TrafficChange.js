import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function TrafficChange() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://raw.githubusercontent.com/lauragift21/hiring-submission-data/main/internet-traffic.csv');
            const text = await response.text();
            const rows = text.split('\n');
            const headers = rows[0].split(',');
            const rawData = rows.slice(1).map((row) => {
                const values = row.split(',');
                return headers.reduce((obj, header, i) => {
                    obj[header] = values[i];
                    return obj;
                }, {});
            });
            const chartData = rawData.slice(-30).map((d) => ({
                time: d.Time,
                totalTrafficChange: parseInt(d['Total Traffic Change']),
                httpTrafficChange: parseInt(d['HTTP Traffic Change']),
            }));
            console.log('Fetched data:', chartData);
            setData(chartData);
        }
        fetchData();
    }, []);

    useEffect(() => {
        console.log('Data changed:', data);
        if (Chart.getChart('traffic-chart')) {
            Chart.getChart('traffic-chart').destroy();
        }

        const chartData = {
            labels: data.map((d) => d.time),
            datasets: [
                {
                    label: 'Total Traffic Change',
                    data: data.map((d) => d.totalTrafficChange),
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                },
                {
                    label: 'HTTP Traffic Change',
                    data: data.map((d) => d.httpTrafficChange),
                    fill: false,
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1,
                },
            ],
        };

        const chartConfig = {
            type: 'line',
            data: chartData,
        };

        const chartCanvas = document.getElementById('traffic-chart');
        new Chart(chartCanvas, chartConfig);
    }, [data]);

    return (
        <div>
            <h2 style={{ textAlign: "center", fontWeight: "bold" }}>Traffic Change</h2>
            <p style={{ textAlign: "center" }}>The data in improper</p>
            <canvas id="traffic-chart" style={{ height: '100px' }}></canvas>
        </div>
    );
}

export default TrafficChange;
