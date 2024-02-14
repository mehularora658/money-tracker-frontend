import React , {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './../App.css'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        const login = localStorage.getItem('token')
        if(login){
            navigate('/dashboard')
        }
    })
    
    const loginFunc = async(username,password) =>{
        const url = `${process.env.REACT_APP_API_URL}/login`;
        try{
            fetch(url,{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({username,password})
            }).then((resp)=>{
                resp.json().then((result)=>{
                    console.log(result);
                    
                    if(result.token){
                        localStorage.setItem('userId', result.result[0]._id)
                        localStorage.setItem('token', result.token)
                        console.log(result.token);
                        navigate('/dashboard')
                    }
                })
            })
        }catch(err){
            console.log('error',err);
        }
        
    }
    return (
        <>
        <div className='Login'>
            <div className='LoginWrapper'>
            <h1 className='LoginDiv'>Login </h1>
                <div className='loginWrapper'>
                    <div className='username'>
                        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter Username' />
                    </div>
                    <div className='password'>
                        <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
                    </div>
                    <div className='create_btn'>
                        <button onClick={() => {
                            console.log('username', username);
                            console.log('password', password);
                            loginFunc(username, password)
                        }}>Login</button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Login