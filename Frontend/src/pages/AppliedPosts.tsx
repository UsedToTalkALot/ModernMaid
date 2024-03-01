import React, {useState, useEffect} from "react";
import "../assets/css/Home.css";



import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import DatePicker from "react-datepicker";

interface Post {
    id: number;
    user: {
        id: number;
    };
    address: string;
    discription: string;
    salary: number;
    noOfMaids: number;
    start: number;
    finish: number;
}

interface Job {
    id: number;
    userid: number;
    maidid: number;
    postid: number;
}
const AppliedPosts: React.FC = () => {
    const [userData, setUserData] = useState<any | null>(null);
    const [maidData, setMaidData] = useState<any | null>(null);
    const [isUserExists, setIsUserExists] = useState<boolean>(false);
    const [MaidExists, setIsMaidExists] = useState<boolean>(false);
    const [idPost, setIdPost] = useState<number>();
    const userId = localStorage.getItem('id');
    const uid = parseInt(userId, 10);


















    const [jobs, setJobs] = useState([]);


    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get('http://localhost:8082/job/findByMaidId/3');

                setJobs(response.data);
                console.log('data found maid id Data:', response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        fetchJob();
    }, [userId]);

    const [acceptedJobs, setAcceptedJobs] = useState([]);

    useEffect(() => {
        acptJobs();
    }, []);
    const acptJobs = async () => {
        try {
            const response = await axios.get('http://localhost:8082/job/getAll');
            // Filter the data to include only posts with user id 2
            const filteredData = response.data.filter(job => job.accepted === true  && job.maid ===4);

            console.log('Response accepted Data:', response.data);
            console.log('Filtered rejected Data:', filteredData);

            setAcceptedJobs(filteredData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [rejectedJobs, setRejectedJobs] = useState([]);

    useEffect(() => {
        rjctJobs();
    }, []);
    const rjctJobs = async () => {
        try {
            const response = await axios.get('http://localhost:8082/job/getAll');
            // Filter the data to include only posts with user id 2
            const filteredData = response.data.filter(job => job.rejected === true && job.maid ===4);

            console.log('Response rejected Data:', response.data);
            console.log('Filtered rejected Data:', filteredData);

            setRejectedJobs(filteredData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    console.log("accepted=",acceptedJobs)
    console.log("rejected=",rejectedJobs)












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
            <a href="/modernmaid">
              <img style={{  height:"50px" ,  width:"50px" ,marginLeft: "55px" }} src="src/images/icon.png" alt="Home Icon" />


            modernMaid</a></span>
                    <div className="menu-btn-3" >
                        <span />
                    </div>
                    <div className="mainMenu">

                        <a ><span >show Applied Jobs</span></a>
                        <a href="/profile"><span >View Profile</span></a>

                        {/*<a href><span>Blog</span></a>*/}
                        {isUserExists && (
                            <a href="/post">Create post</a>
                        )}

                        {!isUserExists && (
                            <a href="/login">Login as client</a>
                        )}

                    </div>
                </nav>
            </header>

            <div className="row"  style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {acceptedJobs.map((aj: any) =>(
            <div className="column" style={{ flex: '0 0 calc(33.33% - 20px)', margin: '10px' }}>
                <section id="services">
                    <div className="big" style={{
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: '50px',
                        bottom: '10px',
                        right: 0,
                        left: 0,
                        display: 'flex',
                        position: 'relative',
                        height: '500px'
                    }}>
                        <div className="container" style={{
                            padding: '1.5em',
                            top: '50px',
                            bottom: '100px',
                            right: 0,
                            left: 0,
                            height: '350px', // Wrap the value in quotes as it is a string
                            width: '450px', // Wrap the value in quotes as it is a string
                            borderRadius: '10px', // Use camelCase for CSS properties with hyphens
                            backgroundColor: '#E5989B',
                            boxShadow: '5px 5px 0px 5px var(--darktwo)', // Wrap the value in quotes as it is a string
                            position: 'relative',
                        }}>
        <span id="txt">
          <div id="header" style={{ textAlign: 'center' }}>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div id="user" style={{ display: "flex", alignItems: "center", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
                  {/*{maid.name}*/}
                    <p style={{ fontSize: "15px", color: "black", marginLeft: "10px" }}>
                        {/*{parseFloat(maid.review.toFixed(1))}*/}
                    </p>

                </div>
              </div>
              <label>
                <textarea
                    value={`User #${aj.user} has accepted your job application for post #${aj.post}`}
                    readOnly
                    style={{
                        resize: "none",
                        width: '100%',
                        padding: '8px',
                        fontSize: '16px',
                        border: '1px solid #E5989B',
                        borderRadius: '20px',
                        marginBottom: '10px',
                        backgroundColor: '#F0B4A4',
                    }}
                    rows={4}
                    className="description-input"
                />
              </label>

              <br />
              <br />
              <div className="star-rating" style={{ textAlign: "center" }}>
                <span
                    style={{ color: 'gray', transition: 'color 0.5s' }}
                    onMouseOver={(e) => (e.currentTarget.style.color = 'yellow')}
                    onMouseOut={(e) => (e.currentTarget.style.color = 'gray')}
                >
                  &#9733;
                </span>
                  <span
                      style={{ color: 'gray', transition: 'color 0.5s' }}
                      onMouseOver={(e) => (e.currentTarget.style.color = 'yellow')}
                      onMouseOut={(e) => (e.currentTarget.style.color = 'gray')}
                  >
                  &#9733;
                </span>
                  <span
                      style={{ color: 'gray', transition: 'color 0.5s' }}
                      onMouseOver={(e) => (e.currentTarget.style.color = 'yellow')}
                      onMouseOut={(e) => (e.currentTarget.style.color = 'gray')}
                  >
                  &#9733;
                </span>
                  <span
                      style={{ color: 'gray', transition: 'color 0.5s' }}
                      onMouseOver={(e) => (e.currentTarget.style.color = 'yellow')}
                      onMouseOut={(e) => (e.currentTarget.style.color = 'gray')}
                  >
                  &#9733;
                </span>
                  <span
                      style={{ color: 'gray', transition: 'color 0.5s' }}
                      onMouseOver={(e) => (e.currentTarget.style.color = 'yellow')}
                      onMouseOut={(e) => (e.currentTarget.style.color = 'gray')}
                  >
                  &#9733;
                </span>
              </div>
              <br />

              <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '20px', // Adjust the margin as needed
              }}>

              </div>
            </div>
          </div>
        </span>
                        </div>
                    </div>
                </section>
            </div>
             ))}

            </div>


            <div className="row"  style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {rejectedJobs.map((rj: any) =>(
                    <div className="column" style={{ flex: '0 0 calc(33.33% - 20px)', margin: '10px' }}>
                        <section id="services">
                            <div className="big" style={{
                                alignContent: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                top: '50px',
                                bottom: '10px',
                                right: 0,
                                left: 0,
                                display: 'flex',
                                position: 'relative',
                                height: '500px'
                            }}>
                                <div className="container" style={{
                                    padding: '1.5em',
                                    top: '50px',
                                    bottom: '100px',
                                    right: 0,
                                    left: 0,
                                    height: '350px', // Wrap the value in quotes as it is a string
                                    width: '450px', // Wrap the value in quotes as it is a string
                                    borderRadius: '10px', // Use camelCase for CSS properties with hyphens
                                    backgroundColor: '#E5989B',
                                    boxShadow: '5px 5px 0px 5px var(--darktwo)', // Wrap the value in quotes as it is a string
                                    position: 'relative',
                                }}>
        <span id="txt">
          <div id="header" style={{ textAlign: 'center' }}>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div id="user" style={{ display: "flex", alignItems: "center", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
                  {/*{maid.name}*/}
                    <p style={{ fontSize: "15px", color: "black", marginLeft: "10px" }}>
                        {/*{parseFloat(maid.review.toFixed(1))}*/}
                    </p>

                </div>
              </div>
              <label>
                <textarea
                    value={`User #${rj.user} has rejected your job application for post #${rj.post}`}
                    readOnly
                    style={{
                        resize: "none",
                        width: '100%',
                        padding: '8px',
                        fontSize: '16px',
                        border: '1px solid #E5989B',
                        borderRadius: '20px',
                        marginBottom: '10px',
                        backgroundColor: '#F0B4A4',
                    }}
                    rows={4}
                    className="description-input"
                />
              </label>

              <br />
              <br />
              <br />

              <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '20px', // Adjust the margin as needed
              }}>

              </div>
            </div>
          </div>
        </span>
                                </div>
                            </div>
                        </section>
                    </div>
                ))}

            </div>


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
            </footer>        </div>
    );
};

export default AppliedPosts;
