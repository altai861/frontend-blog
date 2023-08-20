import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from "@fortawesome/free-brands-svg-icons"
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faBasketball, faBook, faAtom, faFilm, faCode } from "@fortawesome/free-solid-svg-icons"
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons'
import { faPagelines } from '@fortawesome/free-brands-svg-icons'

const Navbar = () => {

    const navigate = useNavigate();

    const [menuClicked, setMenuClicked] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [showMenuButton, setShowMenuButton] = useState(screenWidth < 993)

    const [smallNav, setSmallNav] = useState(showMenuButton && !menuClicked)


    useEffect(() => {
        window.addEventListener('resize', () => {
            setScreenWidth(window.innerWidth)
            if (screenWidth < 993) {
                setShowMenuButton(true)
            } else {
                setShowMenuButton(false)
                setSmallNav(false)
            }
        })

        return () => {
            window.removeEventListener('resize', () => {
                setScreenWidth(window.innerWidth)
                if (screenWidth < 993) {
                    setShowMenuButton(true)
                } else {
                    setShowMenuButton(false)
                    setSmallNav(false)
                }
            })
        }
    }, [window.innerWidth])

    const toggleMenu = () => {
        setMenuClicked(prev => !prev);
    }

    useEffect(() => {
        setSmallNav(showMenuButton && !menuClicked)
    }, [menuClicked, showMenuButton])
    
  return (
    <header className={!smallNav ? 'navbar' : 'small-navbar'}>
        <h1 className='navbar-title'><Link to="/">Life Blog</Link></h1>
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

        {!showMenuButton 
            ? (
                <>
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
                <h2 className='navbar-menu-title'>
                     <FontAwesomeIcon icon={faPaintBrush} />
                    Art and Drawing
                </h2>
                <h2 className='navbar-menu-title'>
                     <FontAwesomeIcon icon={faPagelines} />
                    Other
                </h2>
                
                </>
            ) : (
                 !menuClicked
                    ? <button onClick={toggleMenu} className='navbar-small-screen-menu-button'>Menu</button>
                    : (
                        <>
                        <button onClick={toggleMenu} className='navbar-menu-clicked'>Menu</button>
                        <h2 className='navbar-menu-title'>
                            <FontAwesomeIcon icon={faCode} />
                            Programming 
                        </h2>
                        <h2 className='navbar-menu-title'>
                            <FontAwesomeIcon icon={faBasketball} />
                            Basketball and Training 
                        </h2>
                        <h2 className='navbar-menu-title'>
                            <FontAwesomeIcon icon={faBook} className='book-icon'/>
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
                        <h2 className='navbar-mene-title'>
                            <FontAwesomeIcon icon={faPaintBrush} />
                            Art and Drawing
                        </h2>
                        <h2 className='navbar-mene-title'>
                            <FontAwesomeIcon icon={faPagelines} />
                            Other
                        </h2>
                        </>
                    )
            )}
        
    </header>
  )
}

export default Navbar