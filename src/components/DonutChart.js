import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
function DonutChart({ Chartlabels, Chartdata, ChartColor }) {
  const ChartRef = useRef(null);
  const ChartInstance = useRef(null);
  // let [labels,setLabels]= useState([]);
  // let [data, setData] = useState([]);
  // let [backgroundColor, setBackgroundColor] = useState([]);
  
 
 




  useEffect(() => {
    if (ChartInstance.current) {
      ChartInstance.current.destroy();
    }
    const myChartRef = ChartRef.current.getContext('2d')

    ChartInstance.current = new Chart(myChartRef, {
      type: 'doughnut',
      data: {
        labels: Chartlabels,
        datasets: [{
          data: Chartdata,
          backgroundColor: ChartColor
        }]

      }

    })
    return () => {
      if (ChartInstance.current) {
        ChartInstance.current.destroy()
      }
      // Chartlabels=[]
      // Chartdata=[]
      // ChartColor=[]
    }

  }, [])
  return (
    <div className='DonutChart'>
      <canvas ref={ChartRef} style={{ width: '400px', height: '200px', padding: '10px' }} />
    </div>
  )
}

export default DonutChart