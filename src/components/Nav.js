import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from './Modal.js';

const Nav = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [datetime, setDatetime] = useState('');
    const [description, setDescription] = useState('');
    const [selectedValue, setSelectedValue] = useState('');

    

    const handleDropdownChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        console.log("Selected Value: " + value);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    function formatDate(inputDate) {
        const date = new Date(inputDate);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const period = (date.getHours() < 12) ? 'AM' : 'PM';

        const formattedDate = `${day}-${month}-${year} , ${hours % 12 || 12}:${minutes} ${period}`;

        return formattedDate;
    }

    const addNewTransaction = async (name, description, datetime, selectedValue) => {

        const url = process.env.REACT_APP_API_URL + "/transaction";
        const price = name.split(' ')[0]
        console.log(name, description, datetime, selectedValue);
        let transactionType = ''
        if (price > 0) {
            transactionType = 'Income'
        } else {
            transactionType = 'Expense'
        }

        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(
                {
                    price: price,
                    name: name.substring(price.length + 1),
                    description: description,
                    datetime: datetime,
                    label: selectedValue,
                    userId: `${localStorage.getItem('userId')}`,
                    transactionType: transactionType
                }),
        })
            .then(response => response.json())
            .then(json => {
                setName('');
                setDescription('')
                setDatetime('')
                setSelectedValue('')
                console.log('result', json);


            })
            .catch(error => {
                console.error('Error:', error);
            });



    };


    return (
        <>
            <div className='Nav'>
                <div className='logo'>
                    <Link to='/'>
                        <h1><span className='logoM'><h1>M</h1></span>Track</h1>
                    </Link>
                </div>



                {token ?
                    <div className='linksWrapper'>
                        <div className='NavLink Record_btn'>
                            <button onClick={openModal}>+ Record</button>
                        </div>
                        <div className='NavLink'>
                            <Link onClick={() => {
                                localStorage.removeItem('token')
                                localStorage.removeItem('userId')
                                navigate('/')
                            }}>Logout</Link>
                        </div>
                    </div>
                    :
                    <div className='linksWrapper'>
                        <div className='NavLink'>
                            <Link to='/createAccount'>Create</Link>
                        </div>
                        <div className='NavLink'>
                            <Link to='/login'>Login</Link>
                        </div>
                    </div>}
            </div>
            {
                isModalOpen ?
                    
                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            <h1 className='AddRecordModalHeading'>Add Record</h1>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                addNewTransaction(name, description, datetime, selectedValue);

                            }}>
                                {console.log('modal open , mobile view not')}

                                <div className='basic'>
                                <input type='text' required value={name} onChange={(e) => setName(e.target.value)} placeholder='+200$ New Samsung TV' className='width100'/>
                                    
                                </div>
                                <div className='description'>
                                    <div className='LabelForTransaction'>
                                        <label for="dropdown">Label : </label>
                                        <select id="dropdown" className='selectDropdown' required onChange={handleDropdownChange}>
                                            <option  >Select a Option</option>
                                            <option value="Food & Drinks">Food & Drinks</option>
                                            <option value="Shopping">Shopping</option>
                                            <option value="Housing">Housing</option>
                                            <option value="Transportation">Transportation</option>
                                            <option value="Vehicle">Vehicle</option>
                                            <option value="Life & Entertainment">Life & Entertainment</option>
                                            <option value="Commmunication & PC">Commmunication & PC</option>
                                            <option value="Financial Expenses">Financial Expenses</option>
                                            <option value="Investments">Investments</option>
                                            <option value="Income">Income</option>
                                            <option value="Others">Others</option>
                                            <option value="Unknown">Unknown</option>

                                        </select>
                                    </div>
                                    <div className='Display_datetime'>
                                    <input type='datetime-local' required color='white' value={datetime} onChange={(e) => setDatetime(e.target.value)} className='dateAndTimeIcon'/>
                                        {

                                            !datetime ?
                                                <input value={'Date and Time'} disabled />
                                                :
                                                <input value={formatDate(datetime)} disabled />

                                        }
                                    </div>
                                <input type='text' value={description} required onChange={(e) => setDescription(e.target.value)} placeholder='description' className='width100' />
                                </div>
                                <button className='AddNewTransaction' type='submit' >Add New Transaction</button>
                            </form>
                        </Modal> :
                    null
            }

        </>
    )
}

export default Nav