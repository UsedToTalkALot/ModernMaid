import React, {useState, useEffect} from "react";
import "../assets/css/Home.css";



import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {comment} from "postcss";


const Home: React.FC = () => {

  const [isApplying, setIsApplying] = useState<boolean>(true);

  const applyJob = () => {
    // Your logic here, e.g., making an API call, updating state, etc.

    if (isApplying) {
      // Apply state
      console.log('Applying for the job!');
    } else {
      // Cancel state
      console.log('Cancelled the application.');
    }

    // Toggle the state
    setIsApplying(!isApplying);
  };

  useEffect(() => {
    const handleWindowClick = (event: MouseEvent) => {
      // Your logic here for window click
      // For example, if you want to close a modal with id 'modal' on outside click
      const modal = document.getElementById('modal');
      if (modal && event.target === modal) {
        modal.style.display = 'none';
      }
    };

    window.addEventListener('click', handleWindowClick);

    return () => {
      // Cleanup the event listener when the component unmounts
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);



  return (
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link href="https://fonts.googleapis.com/css?family=Lato|Nanum+Gothic:700|Raleway&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css" rel="stylesheet" />
        <link rel="stylesheet" href="StyleIT.css" />
        <title>modernMaid</title>
        <header id="topHeader">
          <nav>
          <ul id="topInfo">
            <li>+977 9876543210</li>
            <li>info@red_panda_inc.com</li>
          </ul>
            <span className="logo" >
            <a href="">
              <img style={{  height:"50px" ,  width:"50px" ,marginLeft: "55px" }} src="src/images/icon.png" alt="Home Icon" />


            modernMaid</a></span>
            <div className="menu-btn-3" onClick="menuBtnFunction(this)">
              <span />
            </div>
            <div className="mainMenu">

              <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    const scrollAmount = 950;
                    window.scrollBy({
                      top: scrollAmount,
                      behavior: 'smooth',
                    });
                  }}
              >
                <span>About Us</span>
              </a>
              <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    const scrollAmount = 950;
                    window.scrollBy({
                      top: scrollAmount,
                      behavior: 'smooth',
                    });
                  }}
              >
                <span>Contact Us</span>
              </a>

              <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    const scrollAmount = 1520;
                    window.scrollBy({
                      top: scrollAmount,
                      behavior: 'smooth',
                    });
                  }}
              >
                <span>Our Services</span>
              </a>

              {/*<a href><span>Blog</span></a>*/}
              <a href="/maidlogin">Work With Us</a>
            </div>
          </nav>
        </header>
        <section id="intro" style={{height:"750px"}}>
          <div id="intro-info">
            <div>
              <h1>Find a maid just for you</h1>
              <div id="intro-tag-btn">
                <span>Over 100k active maid all over Nepal.</span>
                <a href={"/login"} className="brand-btn">Login</a>
              </div>
            </div>
          </div>
          <div id="development-img">
            <img className="w-full h-full  rounded" style={{ maxHeight: "750px", width: "100%", marginLeft: "auto" }} src="src\images\maid.svg" alt="Image 2"/>
          </div>
        </section>
        <section id="delivery">
          <h1 className="sec-heading">Delivering Experience Since 2009</h1>
          <div className="col-5 delivery-img">
            <img src="src/images/aboutus.png" alt="Productivity Delivering Experience" title="Delivering Experience Since 2009" />
          </div>
          <div className="col-7">
            <h2>Enhancing Your Home with Professional Maid Services</h2>
            <p>
              Discover unparalleled convenience with our premier maid hiring platform. Whether you need assistance with daily chores, specialized cleaning tasks, or any household duties, our platform connects you with skilled and reliable maids to meet your unique requirements. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. <br /><br /> Experience the ease of finding qualified maids who excel in their craft. Our platform revolutionizes the way you manage household tasks, providing a seamless and efficient solution. Join the countless satisfied users who have entrusted us with their maid hiring needs. Embrace a new standard of cleanliness and order with our professional maid services.
            </p>
            <div className="btn-footer">
            </div>
          </div>
        </section>




        <section id="services">
          <h1 className="sec-heading">Our Services</h1>
          <ul>
            <li>
              <div>

                  <img style={{  height:"75px" ,  width:"75px" ,marginLeft: "10px" }} src="src/images/cooking.png" alt="Home Icon" /><span>Cooking</span>

              </div>
            </li>
            <li>
              <div>
                <img style={{  height:"75px" ,  width:"75px" ,marginLeft: "10px" }} src="src/images/cleaning.png" alt="Home Icon" /><span>Cleaning</span>
              </div>
            </li>
            <li>
              <div>
                <img style={{  height:"75px" ,  width:"75px" ,marginLeft: "10px" }} src="src/images/babysiting.png" alt="Home Icon" /><span>BabySitting</span>
              </div>
            </li>
            <li>
              <div>
                <img style={{  height:"75px" ,  width:"75px" ,marginLeft: "10px" }} src="src/images/laundry.png" alt="Home Icon" /><span>Laundry</span>
              </div>
            </li>
            <li>
              <div>
                <img style={{  height:"75px" ,  width:"75px" ,marginLeft: "10px" }} src="src/images/gardening.png" alt="Home Icon" /><span>Gardening</span>
              </div>
            </li>
            <li>
              <div>
                <img style={{  height:"75px" ,  width:"75px" ,marginLeft: "10px" }} src="src/images/petcare.png" alt="Home Icon" /><span>Pet Care</span>
              </div>
            </li>
          </ul>
          <div id="service-footer">
            <a href="/login" className="brand-btn">Find Maid</a>
          </div>
        </section>

        <footer>
          <div>
            <span className="logo">redPanda Inc</span>
          </div>
          <div className="row">
            <div className="col-3">
              <span className="footer-cat">Solution</span>
              <ul className="footer-cat-links">
                <li><a href="/login"><span>Hiire a maid</span></a></li>
                <li><a href="/maidlogin"><span>Start your career as a maid</span></a></li>
              </ul>
            </div>
            <div className="col-3">
              <span className="footer-cat">Services</span>
              <ul className="footer-cat-links">
                <li><a href><span>Coking</span></a></li>
                <li><a href><span>Cleaning</span></a></li>
                <li><a href><span>Babysitting</span></a></li>
                <li><a href><span>Laundry</span></a></li>
                <li><a href><span>Gardening</span></a></li>
                <li><a href><span>Pet Care</span></a></li>
              </ul>
            </div>
            <div className="col-3">
              <span className="footer-cat">Quick Links</span>
              <ul className="footer-cat-links">
                <li><a href={"https://schoolworkspro.com/"}><span>School Works Pro</span></a></li>
                <li><a href={"https://github.com/UsedToTalkALot"}><span> GitHub</span></a></li>
                <li><a href={"https://www.linkedin.com/in/ayush-adhikari-a40801251/"}><span>LinkedIn</span></a></li>
                <li><a href={"https://maps.app.goo.gl/SK2uPjPfWU9gZgLRA"}><span>Site Map</span></a></li>
              </ul>
            </div>
            <div className="col-3" id="newsletter">

              <div className="social-links social-2">
                <a href><i className="fab fa-facebook-f" /></a>
                <a href><i className="fab fa-twitter" /></a>
                <a href><i className="fab fa-linkedin-in" /></a>
                <a href><i className="fab fa-instagram" /></a>
                <a href><i className="fab fa-tumblr" /></a>
                <a href><i className="fab fa-reddit-alien" /></a>
              </div>
              <div id="address">
                <span className="footer-cat">Office Location</span>
                <ul>
                  <li>
                    <i className="far fa-building" />
                    <div>Los Angeles<br />
                      Office 9B, Sky High Tower, New A Ring Road, Los Angeles</div>
                  </li>
                  <li>
                    <img src="src/images/ktm.png" alt="Productivity Delivering Experience" title="Delivering Experience Since 2009" />
                      <div>Kathmandu<br />
                      100 meters inside pipalbot, Dillibazar, Kathmandu</div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="social-links social-1 col-6">
              <a href><i className="fab fa-facebook-f" /></a>
              <a href><i className="fab fa-twitter" /></a>
              <a href><i className="fab fa-linkedin-in" /></a>
              <a href><i className="fab fa-instagram" /></a>
              <a href><i className="fab fa-tumblr" /></a>
              <a href><i className="fab fa-reddit-alien" /></a>
            </div>
          </div>
          <div id="copyright">
            Project for web development
          </div>
          <div id="owner">
            <span>
              Designed by <br/>220320@softwarica.edu.np<br/>
Coventry ID :13702432
            </span>
          </div>
          <a href="#topHeader" id="gotop">Top</a>
        </footer>
      </div>
  );
};

export default Home;
