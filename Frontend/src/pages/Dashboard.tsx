import React, {useState, useEffect} from "react";
import "../assets/css/Home.css";



import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import DatePicker from "react-datepicker";


interface Post {
    id: number;
    userId: number;
    address: string;
    description: string;
    salary: number;
    noOfMaids: number;
    start: number;
    finish: number;
}

const Home: React.FC = () => {
    const [userData, setUserData] = useState<any | null>(null);
    const [maidData, setMaidData] = useState<any | null>(null);
    const [isUserExists, setIsUserExists] = useState<boolean>(false);
    const [isMaidExists, setIsMaidExists] = useState<boolean>(false);
    const userId = localStorage.getItem('id');
    const [uid, setUid] = useState<string>('');
    const [postid, setPostid] = useState<string>('');

    function formatDate(numericalDate) {
        const date = new Date(numericalDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const  str  = `${year}/${month}/${day}`
        console.log(str,"str =")
        return str;

    }

    const handleSaveJob = async () => {
        try {
            console.log("maid id =")
            console.log(userId)
            // Make a POST request to save job with userId and uid
            await axios.post('http://localhost:8082/job/save', {

                maid: 3,
                user: uid,
                post: postid,
                accepted: false,
                rejected: false
            });

            // Handle success, e.g., show a success message or update state
            console.log('Job saved successfully!');
        } catch (error) {
            // Handle errors, e.g., show an error message or log the error
            console.error('Error saving job:', error);
        }
    };



    useEffect(() => {
        fetchData();
    }, []);

    const fetchUserNameById = async (userId: number): Promise<string | null> => {
        try {
            const response = await axios.get(`http://localhost:8082/user/getName/${userId}`);
            return response.data.name;
        } catch (error) {
            console.error(`Error fetching name for user with id ${userId}:`, error);
            return null;
        }
    };



    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/user/getById/${userId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),

                    },
                });

                setUserData(response.data);
                setIsUserExists(true);
                console.log(isUserExists);
                console.log(' user vetyo:');
            } catch (error) {
                console.error('Error fetching user user vetena:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    useEffect(() => {
        const fetchMaidData = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/maid/getById/${userId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),

                    },
                });

                setMaidData(response.data);
                setIsMaidExists(true);
                console.log(isUserExists);
                console.log(' maid vetyo:');
            } catch (error) {
                console.error('Error maid vetena:', error);
            }
        };

        fetchMaidData();
    }, [userId]);



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


    const [posts, setPosts] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8082/post/getAll');
            console.log('Response Data:', response.data);
            setPosts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            console.error('aayena hai aayena data sata', error);
        }
    };





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

                        {isUserExists && (
                            <a href="/myposts"><span >My Posts</span></a>
                        )}

                        {isUserExists && (
                            <a href="/applicents"><span >Applicants</span></a>
                        )}

                        <a href="/profile"><span >View Profile</span></a>
                        {!isUserExists && (
                            <a href="/appliedposts">Show Applied Jobs</a>
                        )}




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
            {posts.map((post: any) => (
                <div key={post.id} className="column" style={{ flex: '0 0 calc(33.33% - 20px)', margin: '10px' }}>
            <section id="services"

            >
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
                    height: '850px'
                }}>
                    <div className="container" style={{

                        padding: '1.5em',
                        top: '50px',
                        bottom: '100px',
                        right: 0,
                        left: 0,
                        height: '900px', // Wrap the value in quotes as it is a string
                        width: '450px', // Wrap the value in quotes as it is a string
                        borderRadius: '10px', // Use camelCase for CSS properties with hyphens
                        backgroundColor: '#E5989B',
                        boxShadow: '5px 5px 0px 5px var(--darktwo)', // Wrap the value in quotes as it is a string
                        position: 'relative',
                    }}>

                        <span id="txt">
    <div id="header" style={{textAlign: 'center' }}>
        <div className="material-symbols-outlined">
            <div style={{
                fontSize: 10,
                textAlign: "left",
                paddingLeft:"50px",
                paddingTop: "15px"


            }} >id: {post.id}</div>
          <img
              style={{
                  height: '100px',
                  marginLeft: 'auto',
                  marginTop: '20px',
                  marginRight: 'auto',
                  width: '100px',
                  borderRadius: '50%',  // Make it circular
              }}
              src="src/images/4th.png"
              alt="Home Icon"
          />
            <br/>
        </div>
                             <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div id="user" style={{ display: "flex", alignItems: "center",textAlign:"center",marginLeft:"auto",marginRight:"auto" }}>
                    {post.user.name}
                      <p style={{ fontSize: "15px", color: "black", marginLeft: "10px" }}>{post.user.review}</p>
                    <img
                        style={{
                            height: '17px',
                            width: '17px',
                        }}
                        src="src/images/star.png"
                        alt="Star Icon"
                    />
                  </div>
                </div>
                                <div id="user">Needs a maid!</div>
                            </div>
                        </div>
                        <br />

                            <label>
                            Address:
                            <input type="text"
                                   value={post.address}
                                   readOnly
                                   style={{
                                       width: '68%',
                                       padding: '8px',
                                       fontSize: '16px',
                                       border: '1px solid #E5989B',
                                       borderRadius: '20px',
                                       marginBottom: '10px',
                                       backgroundColor: '#F0B4A4',
                                   }}
                                    />
                        </label>
                        <br />

                        <label>
                            Description:
                            <textarea
                                value={post.discription}
                                readOnly
                                style={{
                                resize :"none",
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

                        <label>
                            Salary:
                            <input type="number"
                                   value={post.salary}
                                   readOnly
                                   style={{
                                       width: '75%',
                                       padding: '8px',
                                       fontSize: '16px',
                                       border: '1px solid #E5989B',
                                       borderRadius: '20px',
                                       marginBottom: '10px',
                                       backgroundColor: '#F0B4A4',
                                   }}
                                   />
                        </label>
                        <br />

                        <label>
                            Number of Maids:
                            <input type="number"
                                   value={post.noOfMaids}
                                   readOnly
                                   style={{
                                       width: '34%',
                                       padding: '8px',
                                       fontSize: '16px',
                                       border: '1px solid #E5989B',
                                       borderRadius: '20px',
                                       marginBottom: '10px',
                                       backgroundColor: '#F0B4A4',
                                   }}
                                  />

                        </label>
                        <br />

                        <label>
                            Start Date:
                            <input type="string"
                                   value={formatDate(post.start)}
                                   readOnly
                                   style={{
                                       width: '61%',
                                       padding: '8px',
                                       fontSize: '16px',
                                       border: '1px solid #E5989B',
                                       borderRadius: '20px',
                                       marginBottom: '10px',
                                       backgroundColor: '#F0B4A4',
                                   }}
                            />

                        </label>


                        <label>
                            End Date:
                            <input type="string"
                                   value={formatDate(post.finish)}
                                   readOnly
                                   style={{
                                       width: '65%',
                                       padding: '8px',
                                       fontSize: '16px',
                                       border: '1px solid #E5989B',
                                       borderRadius: '20px',
                                       marginBottom: '10px',
                                       backgroundColor: '#F0B4A4',
                                   }}
                            />

                        </label>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '20px', // Adjust the margin as needed
                        }}>
      {!isUserExists && (
          <button
              type="submit"
              className="btn"
              style={{
                  fontFamily: 'Material Icons',
                  color: 'black',
                  cursor: 'pointer',
                  fontSize: '30px',
                  backgroundColor: '#F0B4A4', // Replace with your desired background color
                  border: 'none',
                  padding: '10px 20px', // Adjust padding as needed
                  borderRadius: '20px', // Adjust border-radius for circular corners
                  display: 'inline-block',
                  textAlign: 'center',
                  textDecoration: 'none',
              }}
              onClick={() => {
                  setUid(post.user.id);
                  setPostid(post.id);
                  handleSaveJob();
                  console.log("post gerney   user")
                  console.log(uid)
                  console.log("post ")
                  console.log(postid)
              }}

          >
              APPLY
          </button>
      )}
    </div>
      </span>
                    </div>
                </div>
            </section>
                </div>
            ))}
            </div>




            <footer style={{marginTop:"100px"}}>
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
