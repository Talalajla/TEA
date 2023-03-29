import React from 'react';
import { Line } from "react-chartjs-2";
import { UnitFromText } from '../../shared/helper/unit';
import { externalTooltipHandler } from './tooltip';

const LineChart = ({chartDays, chartHours, chartIcons, unit, title}) => {
    return (
    <div className='chart-container'>
        <h2 style={{textAlign: 'center'}}>Daily weather chart</h2>
        <h3 style={{textAlign: 'center'}}>{title}</h3>
        <Line 
            data={{
                datasets: [{
                    fill: true,
                    data: chartDays,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }],
                labels: chartHours,
            }}
            options={{
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    tooltip: {
                        enabled: false,
                        position: 'nearest',                    
                        titleMarginBottom: 10,
                        external: externalTooltipHandler,
                        callbacks: {
                            title: function(context) {
                                const dataIndex = context[0].dataIndex;
                                const icon = chartIcons[dataIndex];
                                const hour = chartHours[dataIndex];
                                return `${hour}`;
                            },
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.formattedValue;
                                return `${label}: ${value}`;
                            }
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function(value, index, ticks) {
                                return `${Math.round(value*100)/100} ${UnitFromText(unit)}`;
                            }
                        }
                    }
                }
            }}    
        />
    </div>
    );
}
export default LineChart