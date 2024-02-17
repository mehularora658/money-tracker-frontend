import React, { useRef, useEffect } from 'react'
import Chart from 'chart.js/auto'

const BarChart = ({  IncomeData , ExpenseData}) => {
    const BarChartRef = useRef(null);
    const BarChartInstance = useRef(null);
    useEffect(() => {
        if (BarChartInstance.current) {
            BarChartInstance.current.destroy();
        }
        const myBarChartRef = BarChartRef.current.getContext('2d')

        BarChartInstance.current = new Chart(myBarChartRef, {
            type: 'bar',
            data: {
                labels: ['Cashflow'],
                datasets: [{

                    label: "Income",
                    barThickness: 60,
                    data: [IncomeData],
                    backgroundColor: 'rgb(0,255,0)',
                    borderColor: 'transparent',
                    borderWidth: 10,
                    
                },
                {

                    label: "Expense",
                    barThickness: 60,
                    data: [ExpenseData],
                    backgroundColor:'red',
                    borderColor:'transparent',
                    borderWidth:10
                }
                ]

            },
            options: {
                indexAxis: 'y',
                scales: {
                    x: {
                        ticks: {
                            color: 'White'
                        }
                    },
                    y: {
                        ticks: {
                            color: 'White'
                        }
                    }
                }
            },

        })
        return () => {
            if (BarChartInstance.current) {
                BarChartInstance.current.destroy()
            }
            // Chartlabels=[]
            // Chartdata=[]
            // ChartColor=[]
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
           
            <div className='BarChart'>
                <canvas ref={BarChartRef} style={{  height: '200px', padding: '10px' }} />
            </div>
        </>
    )
}

export default BarChart