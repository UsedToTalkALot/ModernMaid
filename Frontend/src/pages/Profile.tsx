import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import "../assets/css/AdminEditProfile.css";

interface UserDetails {
    name: string;
    address: string;
    email: string;
    phonenumber: string;
    password: string;
    // Add other properties if needed
}

const Profile: React.FC = () => {
    const [userDetails, setUserDetails] = useState<UserDetails>();
    const [editedDetails, setEditedDetails] = useState({
        name: '',
        address: '',
        email: '',
        phonenumber: '',
        password: '',
    });
    const [userData, setUserData] = useState<any | null>(null);
    const [isUserExists, setIsUserExists] = useState<boolean>(false);
    const userId = localStorage.getItem('id');

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
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const userId = localStorage.getItem('id');



            if (userId) {
                const response = await axios.get<UserDetails>(`http://localhost:8082/user/getById/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ` + localStorage.getItem('accessToken') // Include the bearer token in the request headers
                        }
                    });
                setUserDetails(response.data);

                setEditedDetails({
                    name: response.data.name,
                    address: response.data.address,
                    email: response.data.email,
                    phonenumber: response.data.phonenumber,
                    password: response.data.password,
                });
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedDetails({
            ...editedDetails,
            [name]: value,
        });
    };

    const saveChanges = async () => {
        try {
            // Assuming there's an API endpoint to update user details
            const userId = localStorage.getItem('id');
            if (userId) {
                await axios.put(`http://localhost:8082/user/update/${userId}`, editedDetails,


                    {
                        headers: {
                            Authorization: `Bearer ` + localStorage.getItem('accessToken') // Include the bearer token in the request headers
                        }
                    });
                // Optionally, you can refetch the updated details
                fetchUserDetails();
                console.log('Changes saved successfully!');
            }
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    // if (!userDetails) {
    //     return <div>Loading...</div>;
    // }


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
                            <a href>Show Applied Jobs</a>
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

        <div className="big" style={{
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            top: '50px',
            bottom: 0,
            right: 0,
            left: 0,
            display: 'flex',
            position: 'relative',
        }}>

            <div className="container" style={{
                display:'grid',

                padding: '1.5em',
                height: '700px', // Wrap the value in quotes as it is a string
                width: '450px', // Wrap the value in quotes as it is a string
                borderRadius: '10px', // Use camelCase for CSS properties with hyphens
                backgroundColor: '#E5989B',
                boxShadow: '5px 5px 0px 5px var(--darktwo)', // Wrap the value in quotes as it is a string
                position: 'relative',
            }}>
<span>
                <div className="your-component" style={{
                    maxWidth: '400px',
                    margin: 'auto',
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
                >

                        <label>
                            Name:
                            <input
                                type="text"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    fontSize: '16px',
                                    border: '1px solid #E5989B',
                                    borderRadius: '20px',
                                    marginBottom: '10px',
                                    backgroundColor: '#F0B4A4',
                                }}
                                value={editedDetails.name}
                                onChange={(e) => setEditedDetails((prevDetails) => ({ ...prevDetails, name: e.target.value }))}
                            />

                        </label>
                        <br />


                        <label>
                            Address:
                            <input type="text"
                                   style={{
                                       width: '100%',
                                       padding: '8px',
                                       fontSize: '16px',
                                       border: '1px solid #E5989B',
                                       borderRadius: '20px',
                                       marginBottom: '10px',
                                       backgroundColor: '#F0B4A4',
                                   }}
                                   value={editedDetails.address}
                                   onChange={(e) => setEditedDetails((prevDetails) => ({ ...prevDetails, address: e.target.value }))}
                            />
                        </label>
                        <br />

                        <label>
                            Phonenumber:
                            <input type="text"
                                   style={{
                                       width: '100%',
                                       padding: '8px',
                                       fontSize: '16px',
                                       border: '1px solid #E5989B',
                                       borderRadius: '20px',
                                       marginBottom: '10px',
                                       backgroundColor: '#F0B4A4',
                                   }}
                                   value={editedDetails.phonenumber}
                                   onChange={(e) => setEditedDetails((prevDetails) => ({ ...prevDetails, phonenumber: e.target.value }))}
                            />
                        </label>
                        <br />

                        <label>
                            Email:
                            <input type="email"
                                   style={{
                                       width: '100%',
                                       padding: '8px',
                                       fontSize: '16px',
                                       border: '1px solid #E5989B',
                                       borderRadius: '20px',
                                       marginBottom: '10px',
                                       backgroundColor: '#F0B4A4',
                                   }}
                                   value={editedDetails.email}
                                   onChange={(e) => setEditedDetails({ ...editedDetails, email: e.target.value })}/>
                        </label>
                        <br />

                        <label>
                            Password:
                            <input type="password"
                                   style={{
                                       width: '100%',
                                       padding: '8px',
                                       fontSize: '16px',
                                       border: '1px solid #E5989B',
                                       borderRadius: '20px',
                                       marginBottom: '10px',
                                       backgroundColor: '#F0B4A4',
                                   }}
                                   value={editedDetails.password}
                                   onChange={(e) => setEditedDetails((prevDetails) => ({ ...prevDetails, password: e.target.value }))}
                                    />
                        </label>
                        <br />







                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '20px', // Adjust the margin as needed
                        }}>
                            <button onClick={saveChanges} className="btn" style={{

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
                            }} >UPDATE</button>
                        </div>

                </div>
</span>
                <div style={{
                    textAlign: "center",
                    marginLeft: "auto",
                    marginRight:"auto"

                }}><button   >

                    <a href="/" onClick={() => { localStorage.removeItem("accessToken"); localStorage.removeItem("id"); localStorage.removeItem("name"); }}>
                        <img style={{  height:"75px" ,  width:"75px" ,marginLeft: "55px" }} src="src/images/logout.png" alt="Home Icon" />
                    </a>
                </button></div>
            </div>
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

export default Profile;
