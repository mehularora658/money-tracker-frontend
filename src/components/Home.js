import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import heroImage from './../assets/heroImage.jpeg'
const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const login = localStorage.getItem('token')
    if (login) {
      navigate('/dashboard')
    }
  })
  return (
    <>
      <div className='Home'>
        <div className='HomeWrapper'>
          <div className='HeroSection1'>
            <div className='heroImgWrapper'>
              <img className='heroImg' src={heroImage} alt='hero img' />
            </div>
          </div>
          <div className='HeroSection2'>
            <div className='infoWrapper'><h1>Take Control of Your Finances: </h1>
              <h2>Empowering you to budget, track, and achieve your financial goals.</h2>
              <p>Effortless tracking: Seamlessly record your income, expenses, and bills.</p>
              <Link to='/createAccount'  >
                <div className='get_StartedBtn'>
                  <button >Get Started </button>
                </div></Link></div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Home