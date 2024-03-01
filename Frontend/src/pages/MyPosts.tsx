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
const MyPosts: React.FC = () => {
    const [userData, setUserData] = useState<any | null>(null);
    const [maidData, setMaidData] = useState<any | null>(null);
    const [isUserExists, setIsUserExists] = useState<boolean>(false);
    const [isMaidExists, setIsMaidExists] = useState<boolean>(false);
    const userId = localStorage.getItem('id');
    const uid = parseInt(userId, 10);


    const [isApplying, setIsApplying] = useState<boolean>(true);

    function formatDate(numericalDate) {
        const date = new Date(numericalDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const  str  = `${year}/${month}/${day}`
        console.log(str,"str =")
        return str;

    }




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


    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8082/post/getAll');
            // Filter the data to include only posts with user id 2
            const filteredData = response.data.filter(post => post.user.id === uid);

            console.log('Response Data:', response.data);
            console.log('Filtered Data:', filteredData);

            setPosts(filteredData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8082/post/deleteById/${id}`);
            console.log(`Post with id ${id} deleted successfully.`);
            // You can perform additional actions after successful deletion if needed.
            fetchData(); // Fetch data again after deletion to update the posts state
        } catch (error) {
            console.error(`Error deleting post with id ${id}:`, error);
        }
    };









    return (
        <div>
            {/*Designed by CodingTuting.Com*/}
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

                        <a ><span >My Posts</span></a>
                        {isUserExists && (
                            <a href="/applicents"><span >Applicants</span></a>
                        )}
                        <a href="/profile"><span >View Profile</span></a>
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

          <button>
              <a onClick={() => handleDelete(post.id)}>
                            <img style={{  height:"75px" ,  width:"75px" ,marginLeft: "55px" }} src="src/images/delete.png" alt="Home Icon" />
                    </a>
          </button>

    </div>
      </span>
                                </div>
                            </div>
                        </section>
                    </div>
                ))}
            </div>








            <footer  style={{ marginTop: "95px"}}>
                <div>
                    <span className="logo">iTechnology</span>
                </div>
                <div className="row">
                    <div className="col-3">
                        <span className="footer-cat">Solution</span>
                        <ul className="footer-cat-links">
                            <li><a href><span>Interprise App Development</span></a></li>
                            <li><a href><span>Android App Development</span></a></li>
                            <li><a href><span>ios App Development</span></a></li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <span className="footer-cat">Industries</span>
                        <ul className="footer-cat-links">
                            <li><a href><span>Healthcare</span></a></li>
                            <li><a href><span>Sports</span></a></li>
                            <li><a href><span>ECommerce</span></a></li>
                            <li><a href><span>Construction</span></a></li>
                            <li><a href><span>Club</span></a></li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <span className="footer-cat">Quick Links</span>
                        <ul className="footer-cat-links">
                            <li><a href><span>Reviews</span></a></li>
                            <li><a href><span>Terms &amp; Condition</span></a></li>
                            <li><a href><span>Disclaimer</span></a></li>
                            <li><a href><span>Site Map</span></a></li>
                        </ul>
                    </div>
                    <div className="col-3" id="newsletter">
                        <span className="footer-cat">Stay Connected</span>
                        <form id="subscribe">
                            <input type="email" id="subscriber-email" placeholder="Enter Email Address" />
                            <input type="submit" defaultValue="Subscribe" id="btn-scribe" />
                        </form>
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
                                    <i className="fas fa-gopuram" />
                                    <div>Delhi<br />
                                        Office 150B, Behind Sana Gate Char Bhuja Tower, Station Road, Delhi</div>
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
                    © All Rights Reserved 2019-2020
                </div>
                <div id="owner">
            <span>
              Designed by <a href="https://www.codingtuting.com">CodingTuting.Com</a>
            </span>
                </div>
                <a href="#topHeader" id="gotop">Top</a>
            </footer>
        </div>
    );
};

export default MyPosts;
