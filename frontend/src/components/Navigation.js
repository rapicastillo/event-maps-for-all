import React from 'react';
import Icon from 'react-fontawesome';
import './Navigation.css';

import WFPLogo from '../assets/images/logo.png';

export default ({ handleNavClose, showBigCircle, handleNavOpen, isMobileNavVisible }) => (

    <header className='navigation'>
      <div className='navigation-area'>
        {showBigCircle && <div className='big-circle-area'>
          <a href='/' className='big-circle'></a>
        </div>}
        <a href='/' className='logo-area'>
          <img src={WFPLogo} className='logo-img'/>
        </a>
        <nav>
          <ul className='link-list'>   
            <li className='donate-area'>
              <a href='https://wfp2020.org/watchparties' className='donate-button'>Host an Event</a>
            </li>
         
            <li className='mobile-nav-open'>
              <a href='javascript: void(null)' onClick={handleNavOpen}>
                <Icon name='bars' size='2x' />
              </a>
            </li>
          </ul>
        </nav>
        {isMobileNavVisible &&
          <nav className='mobile-nav'>
            
            <div className='mobile-nav-viewport'>
              <a href='javascript: void(null)' className='mobile-nav-close' onClick={handleNavClose}>
                <Icon name='close' size='2x' />
              </a>
              <ul>
              <li>
                <a href='/'>
                  <img src={WFPLogo} width='200px' />
                </a>
              </li>
              <li className='donate-area'>
              <a href='https://wfp2020.org/watchparties' className='donate-button'>Host an Event</a>
              </li>
              </ul>
            </div>
          </nav>
        }
      </div>
    </header>
  )

/**
 *               <li><a href='https://cabanforqueens.com/about'>About</a></li>
              <li>
                <a href='https://cabanforqueens.com/issues'>Issues</a>
              </li>
              <li>
                <a href='https://store.cabanforqueens.com?ref=website'>Store</a>
              </li>
              <li>
                <a href='https://cabanforqueens.com/map'>Volunteer</a>
              </li>

 */