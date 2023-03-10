import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function Domain() {
    const [data, setData] = useState(null);
    const chartRef = useRef(null);

    useEffect(() => {
        fetch('https://myworker.prathibaramesh2120.workers.dev/popular-domains')
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log(data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (data) {
            const chart = chartRef.current;

            if (chart) {
                chart.destroy();
            }

            const ctx = document.getElementById('myChart').getContext('2d');
            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.rankingEntries.map(entry => entry.domain),
                    datasets: [
                        {
                            label: 'Ranking',
                            data: data.rankingEntries.map(entry => entry.rank),
                            backgroundColor: data.rankingEntries.map(entry => {
                                if (entry.rankChange === '1') {
                                    return 'rgba(75, 192, 192, 0.2)';
                                } else if (entry.rankChange === '-1') {
                                    return 'rgba(255, 99, 132, 0.2)';
                                } else {
                                    return 'rgba(54, 162, 235, 0.2)';
                                }
                            }),
                            borderColor: data.rankingEntries.map(entry => {
                                if (entry.rankChange === '1') {
                                    return 'rgba(75, 192, 192, 1)';
                                } else if (entry.rankChange === '-1') {
                                    return 'rgba(255, 99, 132, 1)';
                                } else {
                                    return 'rgba(54, 162, 235, 1)';
                                }
                            }),
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Ranking',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Domain',
                            },
                        },
                    },

                },
            });
        }
    }, [data]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 style={{ textAlign: "center", fontWeight: "bold" }}>Popular Domains</h1>
            <p style={{ textAlign: "center" }}>The domain that have fallen in rank is represented in red and domain that have raised in rank is represented in green </p>
            <canvas id="myChart" style={{ height: '100px' }}></canvas>
            <br />
        </div>
    );
}

export default Domain;
