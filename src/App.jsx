import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import profileImg from './assets/ProfileImage.png';
import './App.css'

function App() {
  const [showDivider, setShowDivider] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowDivider(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <div className="App">
        <div className="header">
          <h2>Akshay.dev</h2>
          <div className="navbar">
            <a href="#Home">Home</a>
            <a href="#Projects">Projects</a>
            <a href="#Experience">Experience</a>
            <a href="#Skills">Skills</a>
            <a href="#Contact">Contact</a>
          </div>
        </div>
        <div className={`divider ${showDivider ? 'visible' : ''}`}></div>
        <div id = "Home" className="Home">
          <div className="home-container">
            <div className="home-image">
              <img src={profileImg} alt="Akshay Shukla" />
            </div>
            <div className="home-text">
              <p>Hello, my name is</p>
              <h1>Akshay Shukla</h1>
              <h2>Full Stack Developer</h2>
              <div className="text-divider"></div>
              <p className="home-description">
                 I build exceptional digital experiences with a focus on performance and user experience.
                  Specializing in modern web technologies and scalable architecture.
              </p>
              <div className="home-buttons">
                <a href="#Projects" className="home-btn primary">
                  View My Work
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
                    <path d="M7 5L12 10L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#Contact" className="home-btn secondary">Contact Me</a>
              </div>
              <div className="social-icons">
                <a href="https://github.com/AkshayS734" target="_blank" rel="noreferrer">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com/akshaysshukla" target="_blank" rel="noreferrer">
                  <FaLinkedin />
                </a>
                <a href="https://twitter.com/akshaysshukla" target="_blank" rel="noreferrer">
                  <FaTwitter />
                </a>
                <a href="mailto:akshaysbuilds@gmail.com">
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div id = "Projects" className="Projects">
          <div className="projects-container"></div>
        </div>
        <div id = "Experience" className="Experience"></div>
        <div id = "Skills" className="Skills"></div>
        <div id = "Contact" className="Contact">
          <div className="contact-heading">
            <p className="subheading">Get In Touch</p>
            <h2>Contact Me</h2>
            <div className="heading-divider visible"></div>
            <p className="description">
              Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
            </p>
          </div>
          <div className="contact-wrapper">
            <div className="contact-left">
              <h3>Send Me a Message</h3>
              <form className="contact-form">
                <p class = "form-text">Name</p>
                <input type="text" placeholder="Your Name" />
                <p class = "form-text">Email</p>
                <input type="email" placeholder="your.email@example.com" />
                <p class = "form-text">Subject</p>
                <input type="text" placeholder="Subject" />
                <p class = "form-text">Message</p>
                <textarea placeholder="Your message here..." rows="5" />
                <button type="submit" class="contact-form-button">
                  Send Message
                  <span class="send-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>

            <div className="contact-right">
              <div className="contact-info">
                <h3>Contact Information</h3>
                <p><strong>Email:</strong> <a href="mailto:akshaysbuilds@gmail.com">akshaysbuilds@gmail.com</a></p>
                {/* <p><strong>Phone:</strong> <a href="tel:+1234567890">+1 (234) 567-890</a></p> */}
                <p><strong>Location:</strong> Noida, India</p>
              </div>

              <div className="contact-socials">
                <h3>Connect With Me</h3>
                <div className="contact-social-icons">
                  <a href="https://github.com/AkshayS734" target="_blank" rel="noreferrer">
                    <FaGithub />
                  </a>
                  <a href="https://linkedin.com/akshaysshukla" target="_blank" rel="noreferrer">
                    <FaLinkedin />
                  </a>
                  <a href="https://twitter.com/akshaysshukla" target="_blank" rel="noreferrer">
                    <FaTwitter />
                  </a>
                  <a href="mailto:akshaysbuilds@gmail.com">
                    <FaEnvelope />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="footer-left">
            <h2><strong>Akshay.dev</strong></h2>
            <p>Building digital experiences.</p>
          </div>
          <div className="footer-right">
            <p>© 2025 Akshay Shukla. All rights reserved.</p>
            <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
              Back to top 
              <span className="up-chevron" aria-hidden="true" style={{ display: 'inline-block', width: 12, height: 12 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </span>
            </button>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
