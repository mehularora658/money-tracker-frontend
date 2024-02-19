import { useEffect, useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import DonutChart from './components/DonutChart.js';
import BarChart from './components/BarChart.js';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [renderChart, setRenderChart] = useState(false);
  const [RenderCashFlow, setRenderCashFlow] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [dataState, setDataState] = useState({
    labels: [],
    data: [],
    colors: []
  });
  const [CashFlowDataState, setCashFlowDataState] = useState({
    IncomeData: [],
    ExpenseData: []
  });

  useEffect(() => {
    getTransactions().then(transactions => {
      setTransactions(transactions)
    })

  }, [])
  const RefreshTransactions = () => {
    getTransactions().then(transactions => {
      setTransactions(transactions)
    })
  }
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const getTransactions = async () => {
    const userId = localStorage.getItem('userId')
    try {
      const url = process.env.REACT_APP_API_URL + "/transactions/" + userId;
      const response = await fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    }
    catch (error) {
      console.log('error', error);
    }
  }



  let balance = 0;
  let balTrans = []
  let fraction = 0;
  balTrans = transactions
  if (transactions) {

    for (const transaction of balTrans) {
      balance = balance + transaction.price;
    }

    balance = balance.toFixed(2);
    fraction = balance.split('.')[1]
    balance = balance.split('.')[0]
  }

  function formatDate(inputDate) {
    // 1. Parse the input date string using Date.parse()
    const date = new Date(Date.parse(inputDate));

    // 2. Format the date and time using Intl.DateTimeFormat with options
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true // Use 12-hour format with AM/PM
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    // 3. Return the formatted date string
    return formattedDate;
  }

  const clearTransactions = () => {
    const userId = localStorage.getItem('userId')
    const url = process.env.REACT_APP_API_URL + "/delete/" + userId;
    fetch(url, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    }).then(response => response.json())
      .then(json => {
        console.log('clear', json);
        getTransactions().then(transactions => {
          setTransactions(transactions)
          console.log('from delete api');
        })
      })
  }
  useEffect(() => {
    getDonutData().then((response) => {
      console.log('DonutData', response.result);

      const labels = response.result.map(item => item.label);
      const data = response.result.map(item => item.data);
      const color = response.result.map(item => item.color);
      setDataState({
        labels: labels,
        data: data,
        colors: color
      });


      setRenderChart(true)
    })

    getCashflowData().then((response) => {
      console.log('cashflow data', response.IncomeData)
      setCashFlowDataState({
        IncomeData: response.IncomeData,
        ExpenseData: response.ExpenseData,
      })
      setRenderCashFlow(true)
    })


  }, [])
  const getCashflowData = async () => {
    const userId = localStorage.getItem('userId')
    try {
      const url = process.env.REACT_APP_API_URL + "/cashFlowData/" + userId;
      const response = await fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      return await response.json();
    } catch (error) {
      console.log('error', error);
    }
  }
  const getDonutData = async () => {
    const userId = localStorage.getItem('userId')
    try {
      const url = process.env.REACT_APP_API_URL + "/LabelMoneyStructure/" + userId;
      const response = await fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    }
    catch (error) {
      console.log('error', error);
    }
  }
  return (
    <>

      <main><h1 className='Balance'>${balance}<span>{fraction}</span></h1>
        <div className='MainContent'>
          <div className='transactions'>
            <h1>Records <img alt='' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAq0lEQVR4nO2UvQ3CMBCF3ZCsgMQkljJP6mwRRoAOJZtQwCKgzED1ISNHihwn5x9Kf9I1tnXPz/I9pQo5AB3hvIEzUO01bE05awNx9FvNNfCxpRPcNrMT3+YReC1uMQGnBJEf7uIBuHusPoH6HwLXnfe8ZQtEHRAoAiLlibwI3/yS/U3ZHtTHalBT54DQqLGRa2gSRLQYliZqiWOU4t4VqKzI7CSELtZtQS35Ao2HRjghsRAxAAAAAElFTkSuQmCC"
              onClick={RefreshTransactions}
            ></img></h1>
            {transactions && transactions[0] ?
              <div className='transaction'>
                <div className='left'>
                  <div className='name'>{transactions[0].name}</div>
                  <div className='description'>{transactions[0].description}</div>
                  <div className='label'>{"Label - "}</div>
                </div>
                <div className='right'>
                  <div className={'price ' + (transactions[0].price > 0 ? "green" : " red")} >{transactions[0].price}</div>
                  <div className='datetime'>{formatDate(transactions[0].datetime)}</div>
                  <div className='labelValue'>{transactions[0].label}</div>
                </div>
              </div>
              : null}
            {transactions && transactions[1] ?
              <div className='transaction'>
                <div className='left'>
                  <div className='name'>{transactions[1].name}</div>
                  <div className='description'>{transactions[1].description}</div>
                  <div className='label'>{"Label - "}</div>
                </div>
                <div className='right'>
                  <div className={'price ' + (transactions[1].price > 0 ? "green" : " red")} >{transactions[1].price}</div>
                  <div className='datetime'>{formatDate(transactions[1].datetime)}</div>
                  <div className='labelValue'>{transactions[1].label}</div>
                </div>
              </div>
              : null}
            {transactions && transactions[2] ?
              <div className='transaction'>
                <div className='left'>
                  <div className='name'>{transactions[2].name}</div>
                  <div className='description'>{transactions[2].description}</div>
                  <div className='label'>{"Label - "}</div>
                </div>
                <div className='right'>
                  <div className={'price ' + (transactions[2].price > 0 ? "green" : " red")} >{transactions[2].price}</div>
                  <div className='datetime'>{formatDate(transactions[2].datetime)}</div>
                  <div className='labelValue'>{transactions[2].label}</div>
                </div>
              </div>
              : null}
            {transactions && transactions[3] ?
              <div className='transaction'>
                <div className='left'>
                  <div className='name'>{transactions[3].name}</div>
                  <div className='description'>{transactions[3].description}</div>
                  <div className='label'>{"Label - "}</div>
                </div>
                <div className='right'>
                  <div className={'price ' + (transactions[3].price > 0 ? "green" : " red")} >{transactions[3].price}</div>
                  <div className='datetime'>{formatDate(transactions[3].datetime)}</div>
                  <div className='labelValue'>{transactions[3].label}</div>
                </div>
              </div>
              : null}


            <button
              className='SeeAllBtn'
              onClick={openModal}
            >See All ...</button>
          </div>



          <div className='LabelStructureDivision'>
            <h2 className='ExpensesHeading'>This month Expenses</h2>
            {
              renderChart === true ? <div>

                <DonutChart
                  Chartlabels={dataState.labels}
                  Chartdata={dataState.data}
                  ChartColor={dataState.colors}
                />
              </div>
                :
                <h2>No chart</h2>
            }
          </div>
          <div className='ThisMonthExpenseIncome'>
            <div>
              <h2 className='CashflowHeading'>This month Cashflow</h2>
              {
                RenderCashFlow === true ?
                  <div>
                    <BarChart
                      IncomeData={CashFlowDataState.IncomeData}
                      ExpenseData={CashFlowDataState.ExpenseData}
                    />
                  </div>
                  :
                  <h2>No Cashflow</h2>
              }
            </div>
          </div>
        </div>
      </main >
      <button className='clearBtn' onClick={clearTransactions}>
        Clear
      </button>
      {
        isModalOpen ?
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className='RecordsModal'>
              <h1 className='RecordsHeading'>Records</h1>
              {transactions && transactions.length > 0 && [...transactions].reverse().map(transaction => (

                <div className='transaction'>
                  <div className='left'>
                    <div className='name BlackClr'>{transaction.name}</div>
                    <div className='description BlackClr'>{transaction.description}</div>
                    <div className='Modallabel'>{"Label - "}</div>

                  </div>
                  <div className='right'>
                    <div className={'price ' + (transaction.price > 0 ? "green" : " red")} >{transaction.price}</div>
                    <div className='datetime BlackClr'>{formatDate(transaction.datetime)}</div>
                    <div className='ModalLabelValue'>{transaction.label}</div>

                  </div>
                </div>
              ))}
            </div>
          </Modal>
          : null
      }

    </>
  );
}

export default App;
