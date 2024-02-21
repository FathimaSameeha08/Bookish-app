import React from 'react'
import main from './mainpic.png'
import './starrating.css'
function Intro() {
    return (
        <div style={{
            backgroundImage: `url(${main})`,
            backgroundSize: 'cover',  // You can use 'contain' or other values based on your preference
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            width: '100%',
            // height: '100vh',  // Set the desired height
            textAlign: 'center'
        }}>
            <div className='p-5'>
                <h1 className='text-dark' style={{ marginBottom: '-20px', marginTop: '80px' }}> Welcome to <span style={{ color: '#ffb429', fontFamily: 'poppins' }}>BOOK HAVEN</span>  </h1>
                <h3 className='text-dark'>Your Literary Journey Starts Here!</h3>
                <br />
                <h5 id='embark'>Embark on a literary journey like never before with BOOK HAVEN, where reading becomes a personalized and immersive experience. Whether you're an avid bookworm or just starting your reading adventure, our platform is designed to enhance your literary exploration and make every page turn count.</h5>
                <br />
                <div class="social-buttons">
                    <a href="#" class="social-buttons__button social-button social-button--facebook" aria-label="Facebook">
                        <span class="social-button__inner">
                            <i class="fab fa-facebook-f"></i>
                        </span>
                    </a>
                    <a href="#" class="social-buttons__button social-button social-button--linkedin" aria-label="LinkedIn">
                        <span class="social-button__inner">
                            <i class="fab fa-linkedin-in"></i>
                        </span>
                    </a>
                    <a href="https://www.instagram.com/learningatwebdev/" target="_blank" class="social-buttons__button social-button social-button--instagram" aria-label="InstaGram">
                        <span class="social-button__inner">
                            <i class="fab fa-instagram"></i>
                        </span>
                    </a>
                    <a href="#" class="social-buttons__button social-button social-button--github" aria-label="GitHub">
                        <span class="social-button__inner">
                            <i class="fab fa-github"></i>
                        </span>
                    </a>
                    <a href="https://codepen.io/rajshukla9718" target="_blank" class="social-buttons__button social-button social-button--codepen" aria-label="CodePen">
                        <span class="social-button__inner">
                            <i class="fab fa-codepen"></i>
                        </span>
                    </a>
                </div>
            </div>

        </div>
    )
}

export default Intro