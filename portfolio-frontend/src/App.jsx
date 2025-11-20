import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaLocationArrow, FaExternalLinkAlt, FaDesktop, FaComments, FaChartBar, FaLaptopCode, FaBolt, FaServer, FaMapMarkerAlt } from 'react-icons/fa';
import profileImg from './assets/ProfileImage.png';
import './App.css'
// removed unsupported 'react-icons/fa6' import
import axios from 'axios';

function App() {
  const [showDivider, setShowDivider] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [loadingExperiences, setLoadingExperiences] = useState(true);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        alert('Please fill out all fields.');
        return;
      }
      await axios.post('http://127.0.0.1:4000/send', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error(error);
      alert('Failed to send message');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowDivider(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    fetchExperiences();
  }, []);

  useEffect(() => {
    fetchProjects();
  }, []);

  // Function to get the appropriate icon component based on icon string
  const getProjectIcon = (iconType) => {
    const iconProps = { size: 48, className: "text-indigo-900 opacity-20 mb-6" };
      switch (iconType) {
      case 'desktop': return <FaDesktop {...iconProps} />;
      case 'comments': return <FaComments {...iconProps} />;
      case 'chart': return <FaChartBar {...iconProps} />;
      case 'code': return <FaLaptopCode {...iconProps} />;
      default: return <FaDesktop {...iconProps} />;
    }
  };

  // Fetch projects from database
  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      const response = await axios.get('http://127.0.0.1:4000/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to default projects if API fails
      setProjects([
        {
          title: "E-Commerce Platform",
          description: "A full-featured e-commerce solution with product management, cart functionality, and payment processing.",
          tech: ["React", "Node.js", "MongoDB"],
          image: "https://via.placeholder.com/400x250/667eea/ffffff?text=E-Commerce+Platform",
          links: { live: "#", github: "#" }
        }
      ]);
    } finally {
      setLoadingProjects(false);
    }
  };

  // Fetch experiences from database
  const fetchExperiences = async () => {
    try {
      setLoadingExperiences(true);
      const response = await axios.get('http://127.0.0.1:4000/api/experiences');
      setExperiences(response.data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      // Fallback to default experiences if API fails
      setExperiences([
        {
          title: "Senior Frontend Developer",
          company: "TechCorp Solutions",
          period: "2021 - Present",
          type: "Full-time",
          description: "Led the frontend development team in building responsive web applications. Implemented modern UI/UX designs and optimized performance across multiple platforms.",
          tech: ["React", "TypeScript", "Redux", "Tailwind CSS"]
        }
      ]);
    } finally {
      setLoadingExperiences(false);
    }
  };

  const frontendSkills = [
    { label: "React / React Native", value: 95 },
    { label: "JavaScript / TypeScript", value: 90 },
    { label: "HTML5 / CSS3", value: 95 },
    { label: "Vue.js / Angular", value: 85 },
    { label: "Tailwind / SASS", value: 90 },
  ];
  const frontendTags = [
    "Redux", "Next.js", "Webpack", "Jest", "Responsive Design"
  ];

  const backendSkills = [
    { label: "Node.js / Express", value: 90 },
    { label: "MongoDB / Mongoose", value: 85 },
    { label: "SQL / PostgreSQL", value: 80 },
    { label: "GraphQL", value: 75 },
    { label: "RESTful APIs", value: 95 },
  ];
  const backendTags = [
    "Firebase", "AWS", "Docker", "CI/CD", "Microservices"
  ];

  const otherSkills = [
    "Git & Version Control",
    "UI/UX Design",
    "Agile Methodology",
    "Project Management"
  ];
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
            </div>
          </div>
        </div>
        <div id="Projects" className="Projects">
          <section className="featured-section">
            <div className="featured-container">
              <div className="featured-subtitle">My Recent Work</div>
              <h2 className="featured-title">Featured Projects</h2>
              <div className="featured-underline"></div>

              <div className="featured-cards">
                {loadingProjects ? (
                  <div className="loading-projects">
                    <p>Loading projects...</p>
                  </div>
                ) : (
                  projects.map((project, i) => (
                  <div className="project-card" key={project._id || i}>
                    <div className="project-image-container">
                      <img
                        src={project.image || "https://via.placeholder.com/400x250/6366f1/ffffff?text=Project+Image"}
                        alt={project.title}
                        className="project-image"
                      />
                    </div>

                    <div className="project-row">
                      <h3 className="project-title">{project.title}</h3>
                      <div className="project-actions">
                        <a
                          href={project.links?.live || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-action"
                          aria-label={`Open ${project.title} live`}
                        >
                          <FaExternalLinkAlt />
                        </a>
                        <a
                          href={project.links?.github || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-action"
                          aria-label={`Open ${project.title} github`}
                        >
                          <FaGithub />
                        </a>
                      </div>
                    </div>

                    <p className="project-description">{project.description}</p>

                    <div className="project-tech-list">
                      {(project.tech || []).map((t) => (
                        <span className="project-tech" key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))
              )}
              </div>
              <a href="#" className="featured-viewall">
                View All Projects <span aria-hidden>→</span>
              </a>
            </div>
          </section>
        </div>
        <div id="Experience" className="Experience">
          <section className="experience-section">
            <div className="experience-container">
              <div className="experience-subtitle">My Professional Journey</div>
              <h2 className="experience-title">Work Experience</h2>
              <div className="experience-underline"></div>

              <div className="timeline">
                <div className="timeline-line"></div>

                {loadingExperiences ? (
                  <div className="loading-experiences">
                    <p>Loading experiences...</p>
                  </div>
                ) : (
                  (experiences || []).map((exp, i) => (
                    <div className="timeline-item" key={exp._id || i}>
                      <div className="timeline-dot"></div>
                      <div className="experience-card">
                        <div className="experience-header">
                          <h3 className="experience-role">{exp.title}</h3>
                          <div className="experience-period">
                            <span className="experience-period-text">{exp.period}</span>
                            <span className="experience-type">{exp.type}</span>
                          </div>
                        </div>

                        <div className="experience-company">{exp.company}</div>
                        <p className="experience-description">{exp.description}</p>

                        <div className="experience-tech-list">
                          {(exp.tech || []).map((t) => (
                            <span className="experience-tech" key={t}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
        <div id="Skills" className="Skills">
          <section className="skills-section">
            <div className="skills-header">
              <div className="skills-subtitle">What I Can Do</div>
              <h2 className="skills-title">My Skills</h2>
              <div className="skills-underline"></div>
            </div>

            <div className="skills-grid">
              <div className="skills-col">
                <div className="skills-col-header">
                  <FaLaptopCode className="skills-col-icon" />
                  <span className="skills-col-title">Frontend Development</span>
                </div>

                <div className="skills-bars">
                  {frontendSkills.map(({ label, value }) => (
                    <div className="skills-bar-row" key={label}>
                      <div className="skills-bar-label">{label}</div>
                      <div className="skills-bar-track">
                        <div className="skills-bar-fill" style={{ width: `${value}%` }}></div>
                      </div>
                      <div className="skills-bar-value">{value}%</div>
                    </div>
                  ))}
                </div>

                <div className="skills-tags">
                  {frontendTags.map(tag => (
                    <span className="skills-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="skills-col">
                <div className="skills-col-header">
                  <FaServer className="skills-col-icon" />
                  <span className="skills-col-title">Backend Development</span>
                </div>

                <div className="skills-bars">
                  {backendSkills.map(({ label, value }) => (
                    <div className="skills-bar-row" key={label}>
                      <div className="skills-bar-label">{label}</div>
                      <div className="skills-bar-track">
                        <div className="skills-bar-fill" style={{ width: `${value}%` }}></div>
                      </div>
                      <div className="skills-bar-value">{value}%</div>
                    </div>
                  ))}
                </div>

                <div className="skills-tags">
                  {backendTags.map(tag => (
                    <span className="skills-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="skills-other">
              <div className="skills-other-header">
                <FaBolt className="skills-other-icon" />
                <span className="skills-other-title">Other Skills</span>
              </div>
                
              <div className="skills-other-tags">
                {otherSkills.map(tag => (
                  <span className="skills-other-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </section>
        </div>
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
              <form className="contact-form" onSubmit={handleSubmit}>
                <p className="form-text">Name</p>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />

                <p className="form-text">Email</p>
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />

                <p className="form-text">Subject</p>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                />

                <p className="form-text">Message</p>
                <textarea
                  name="message"
                  placeholder="Your message here..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                />

                <button type="submit" className="contact-form-button">
                  Send Message
                  <span className="send-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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
                <div className = "contact-info-item">
                  <div className="contact-info-icon">
                    <FaEnvelope/>
                  </div>
                  <div className="contact-info-text">
                    <p><strong>Email</strong></p>
                    <a href="mailto:akshaysbuilds@gmail.com">akshaysbuilds@gmail.com</a>
                  </div>
                </div>
                <div className = "contact-info-item">
                  <div className="contact-info-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="contact-info-text">
                    <p><strong>Location</strong></p>
                    <p>Noida, India</p>
                  </div>
                </div>
                {/* <p><strong>Phone:</strong> <a href="tel:+1234567890">+1 (234) 567-890</a></p> */}
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
