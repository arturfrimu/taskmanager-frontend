import React from 'react';
import classes from './footerStyle/Footer.module.css';

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <nav>
                <ul>
                    <li>
                        <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                           target='_blank'><i className="fab fa-facebook-square"/></a>
                    </li>
                    <li>
                        <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                           target='_blank'><i className="fab fa-instagram-square"/></a>
                    </li>
                    <li>
                        <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                           target='_blank'><i className="fab fa-linkedin"/></a>
                    </li>
                    <li>
                        <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                           target='_blank'><i className="fab fa-twitter-square"/></a>
                    </li>
                    <li>
                        <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                           target='_blank'><i className="fab fa-telegram"/></a>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;