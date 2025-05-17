import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../../Context/Language';
import event1 from '../../assets/ev1.jpeg'
import event2 from '../../assets/ev2.jpeg'
import event3 from '../../assets/ev3.jpeg'
import event4 from '../../assets/ev4.jpg'


export default function Footer() {
const {language, setLanguage} = useContext(LanguageContext)

return (

        <>
        
        <section className='footer p-5 bg-fot'>
          <div className="container">
            <div className="row">

              <div className="col-lg-4 col-md-6">
                <div className="footer-item">
                    {/* <img src={footerLogo} alt="jabaness food" className="mb-4"/> */}
                    <a aria-label='logo' className="navbar-brand logo text-white " href="#">
                      Events
                    </a>
                    
                    <p className='text-footer-color text-white'>In tje new era of technology we look a in the future with
                      certainty and pride to for our company
                    </p>
                    

                  <div className="social d-flex">
                    <a aria-label='twitter' href="#">
                      <i className="fa-brands fa-twitter text-white"></i>
                    </a>
                    <a aria-label='facebook' href="#">
                      <i className="fa-brands fa-facebook-f text-white"></i>
                    </a>
                    <a aria-label='instagram' href="#">
                      <i className="fa-brands fa-instagram text-white"></i>
                    </a>
                    <a aria-label='github' href="#">
                      <i className="fa-brands fa-github text-white"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-6">
                <ul className='footer-list p-0'>
                  <li><Link aria-label='home' className='footer-link' to="/">Home</Link></li> 
                  <li><Link aria-label='home' className='footer-link' to="/allevents">All-Events</Link></li> 
                  <li><Link aria-label='home' className='footer-link' to="/myevents">MyEvents</Link></li> 
                </ul>
              </div>

              <div className="col-lg-2 col-md-6">
                <ul className='footer-list p-0 text-white'>
                  <li className=' mb-3 fw-500 '>Utility Pages</li>
                  <li >Start Hero</li>
                  <li>Styleguide</li>
                  <li>Pasword Protected</li>
                  <li>404 Not Found</li>
                  <li>Licenses</li>
                  <li>Changeiog</li>
                </ul>
              </div>


              <div className="col-lg-4 col-md-6">
                <p className='text-white fw-500 p-f'>Follow Us On Instagram</p>
                <div className='footer-imgs'>
                  <img loading='lazy' className='w-50' src={event1} alt="" />
                  <img loading='lazy' className='w-50' src={event2} alt="" />
                  <img loading='lazy' className='w-50' src={event3} alt="" />
                  <img loading='lazy' className='w-50' src={event4} alt="" />
                </div>
              </div>


            </div>
            

            <div className='but-footer'>
              <span className='line d-flex'></span>
              <div className='d-flex justify-content-center text-center'>
              <p className='text-footer-color mt-4 text-white'>
              Copyright © 2023 #AmrNour. All Rights Reserved
            </p>
              </div>
            </div>
          </div>
        </section>
        
        </>
        
  )

}

