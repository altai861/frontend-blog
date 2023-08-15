import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from "@fortawesome/free-brands-svg-icons"
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faBasketball, faBook, faAtom, faFilm, faCode } from "@fortawesome/free-solid-svg-icons"
 

const Navbar = () => {
  return (
    <header className='navbar'>
        <h1 className='navbar-title'>Altai's Blog</h1>
        <hr />
        <p className='navbar-myname'>Altai Gantumur</p>
        <p className='navbar-myemail'>bbyyydriver@gmail.com</p>
        <div className='navbar-social-media'>
            <FontAwesomeIcon icon={faFacebookF} className='navbar-social-media-icon' />
            <FontAwesomeIcon icon={faGithub} className='navbar-social-media-icon'/>
            <FontAwesomeIcon icon={faTwitter} className='navbar-social-media-icon'/>
            <FontAwesomeIcon icon={faInstagram} className='navbar-social-media-icon'/>
        </div>
        <hr />
        <h2 className='navbar-menu-title'>
            <FontAwesomeIcon icon={faCode} />
            Programming 
        </h2>
        <h2 className='navbar-menu-title'>
            <FontAwesomeIcon icon={faBasketball} />
            Basketball and Training 
        </h2>
        <h2 className='navbar-menu-title'>
            <FontAwesomeIcon icon={faBook} />
            Books 
        </h2>
        <h2 className='navbar-menu-title'>
            <FontAwesomeIcon icon={faAtom} />
            Health and Science 
        </h2>
        <h2 className='navbar-menu-title'>
            <FontAwesomeIcon icon={faFilm} />
            Movies
        </h2>
    </header>
  )
}

export default Navbar