import React from 'react';
import { Line } from "react-chartjs-2";
import { UnitFromText } from '../../shared/helper/unit';
import { externalTooltipHandler } from './tooltip';

const LineChart = ({chartDays, chartHours, unit, title}) => {
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
                labels: chartHours
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
                        external: externalTooltipHandler
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function(value, index, ticks) {
                                return `${value} ${UnitFromText(unit)}`;
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