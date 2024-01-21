import React, { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './../App.css'

const CreateAccount = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const login = localStorage.getItem('token')
        if (login) {
            navigate('/dashboard')
        }
    })
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const createAccountFunc=async ()=>{
        const url = process.env.REACT_APP_API_URL + "/createAccount";
        try{
            fetch(url,{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({username,password})
            }).then((response)=>{
                console.log(response);
            }).then(
                navigate('/login')
            )
        }catch(err){
            console.log('error',err);
        }
    }
    return (
        <>
            <div className='Create'>
            <div className='Create_AccountWrapper'>
            <h1 className='CreateAccountDiv'>Create Account</h1>
                <div className='CreateWrapper'>
                    <div className='username'>
                        <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter Username' />
                    </div>
                    <div className='password'>
                        <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
                    </div>
                    <div className='create_btn'>
                        <button onClick={()=>{
                            console.log('username',username);
                            console.log('password',password);
                            createAccountFunc()
                        }}>Create </button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default CreateAccount