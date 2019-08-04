import React from 'react';
import Icon from 'react-fontawesome';
import './Navigation.css';

import CabanLogo from '../assets/images/caban-logo.png';

export default ({ handleNavClose, showBigCircle, handleNavOpen, isMobileNavVisible }) => (

    <header className='navigation'>
      <div className='navigation-area'>
        {showBigCircle && <div className='big-circle-area'>
          <a href='/' className='big-circle'></a>
        </div>}
        <a href='/' className='logo-area'>
          <img src={CabanLogo} width='200px' className='logo-img'/>
        </a>
        <nav>
          <ul className='link-list'>
            <li><a href='https://cabanforqueens.com/about'>About</a></li>
            <li>
              <a href='https://cabanforqueens.com/issues'>Issues</a>
            </li>
            <li>
              <a href='https://cabanforqueens.com/endorsements'>Endorsements</a>
            </li>
            <li>
              <a href='https://store.cabanforqueens.com?ref=website'>Store</a>
            </li>
            <li>
              <a href='https://map.cabanforqueens.com'>Volunteer</a>
            </li>
            {/* <li>
              <a href='/contact' target='_blank'>Contact</a>
            </li> */}
            <li className='donate-area'>
              <a href='https://secure.actblue.com/donate/people-powered-justice-for-queens?refcode=map&amount=27' className='donate-button'>Contribute</a>
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
                  <img src={CabanLogo} width='200px' />
                </a>
              </li>
              <li><a href='https://cabanforqueens.com/about'>About</a></li>
              <li>
                <a href='https://cabanforqueens.com/issues'>Issues</a>
              </li>
              <li>
                <a href='https://store.cabanforqueens.com?ref=website'>Store</a>
              </li>
              <li>
                <a href='https://cabanforqueens.com/map'>Volunteer</a>
              </li>
              <li className='donate-area'>
                <a href='https://cabanforqueens.com/donate' className='donate-button'>Contribute</a>
              </li>
              </ul>
            </div>
          </nav>
        }
      </div>
    </header>
  )
