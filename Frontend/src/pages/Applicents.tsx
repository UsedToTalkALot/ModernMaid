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
const MyPosts: React.FC = () => {
    const [userData, setUserData] = useState<any | null>(null);
    const [maidData, setMaidData] = useState<any | null>(null);
    const [appliedMaid, setAppliedMaid] = useState<any | null>(null);
    const [isUserExists, setIsUserExists] = useState<boolean>(false);
    const [isMaidExists, setIsMaidExists] = useState<boolean>(false);
    const userId = localStorage.getItem('id');
    const uid = parseInt(userId, 10);
    const [jobs, setJobs] = useState([]);

    const [isApplying, setIsApplying] = useState<boolean>(true);

    let counter=0;

    const arr = [49,50,52,52]




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
        const fetchJob = async (postid: number) => {
            try {
                const response = await axios.get(`http://localhost:8082/job/findByPostId/${postid}`);
                // maidApplicants(response.data.maidid);
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };


        {posts.map(async (post: any) => {
            await fetchJob(post.id);
            return null; // or handle the result if needed
        })}


    }, [userId]);

        console.log("jobs = ",jobs)

    useEffect(() => {

        const maidApplicants = async (maidid:number) => {
            console.log("maidid = ",maidid)
            try {
                const response = await axios.get(`http://localhost:8082/maid/getById/${maidid}`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),

                    },
                });
                console.log("thi is the data that was found",response.data)
                setAppliedMaid(response.data);

            } catch (error) {
                console.error('Error maid vetena:', error);
            }
        };





    }, [userId]);
    // console.log("jobs = ",jobs)
    console.log("applied maids = ",appliedMaid)


    const updateReview = async (review:number, id:number) => {
        console.log("review=",review,"id=",id)
        try {
            await axios.post(
                `http://localhost:8082/maid/updateReview/${review}/${id}`,

                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    },
                }
            );
        } catch (error) {
            console.log("idk error", error);
        }

        window.location.reload();
    }







        const acceptMaid = async ( maid:number,post:number) => {
            console.log("maid=",maid,"post=",post)
            console.log(arr)
            try {
                await axios.post(
                    `http://localhost:8082/job/acceptOffer/${maid}/${post}`,

                    {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                        },
                    }
                );
            } catch (error) {
                console.log("idk error", error);
            }

            // window.location.reload();
        };

    const rejectMaid = async ( maid:number,post:number) => {
        console.log(" rejected :maid=",maid,"post=",post)
        console.log(arr)
        try {
            await axios.post(
                `http://localhost:8082/job/rejectOffer/${maid}/${post}`,

                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    },
                }
            );
        } catch (error) {
            console.log("idk error", error);
        }

        // window.location.reload();
    };


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

    const [maids, setMaids] = useState([]);
    useEffect(() => {
        fetchAppliedMaids();
    }, []);
    const fetchAppliedMaids = async () => {
        try {
            const response = await axios.get('http://localhost:8082/maid/getAll');
            // Filter the data to include only posts with user id 2
            const filteredData = response.data.filter(maid => maid.id === 4 || maid.id === 5);

            console.log('Response Data:', response.data);
            console.log('Filtered Data:', filteredData);

            setMaids(filteredData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    console.log("maids =",maids)

    const incrementCounter = () => {
        counter++;
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

    const loop = [1, 2];







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

                        <a href="/myposts"><span >My Posts</span></a>
                        {isUserExists && (
                            <a href="applicents"><span>Applicents</span></a>
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

                {maids.map((maid: any) => (
                    <div key={maid.id} className="column" style={{ flex: '0 0 calc(33.33% - 20px)', margin: '10px' }}>
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
                                height: '750px'
                            }}>
                                <div className="container" style={{

                                    padding: '1.5em',
                                    top: '50px',
                                    bottom: '100px',
                                    right: 0,
                                    left: 0,
                                    height: '750px', // Wrap the value in quotes as it is a string
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


            }} >id: {maid.id}</div>
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
                    {maid.name}
                      <p style={{ fontSize: "15px", color: "black", marginLeft: "10px" }}> {parseFloat(maid.review.toFixed(1))} </p>
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
                        <div>
      {counter === 0 && (
          <div id="user">
              Has applied to your post #49
          </div>
      )}



                            {counter === 1 && (
                                <div id="user">
                                    Has applied to your post #50
                                </div>


                            )}

                            {incrementCounter()}
    </div>


                            </div>
                        </div>
                        <br />

                            <label>
                            Name:
                            <input type="text"
                                   value={maid.name}
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
                            Email:
                            <input type="email"
                                   value={maid.email}
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
                            PhoneNumber:
                            <input type="number"
                                   value={maid.phonenumber}
                                   readOnly
                                   style={{
                                       width: '44%',
                                       padding: '8px',
                                       fontSize: '16px',
                                       border: '1px solid #E5989B',
                                       borderRadius: '20px',
                                       marginBottom: '10px',
                                       backgroundColor: '#F0B4A4',
                                   }}
                            />

                        </label>
                            <br/>
                            <br/>
                            <div className="star-rating" style={{textAlign:"center"}}>
   <span
       style={{  color: 'gray', transition: 'color 0.5s' }}
       onMouseOver={(e) => (e.currentTarget.style.color = 'yellow')}
       onMouseOut={(e) => (e.currentTarget.style.color = 'gray')}
       onClick={() => updateReview(1, maid.id)}
   >
        &#9733;
      </span>
      <span
          style={{  color: 'gray', transition: 'color 0.5s' }}
          onMouseOver={(e) => (e.currentTarget.style.color = 'yellow')}
          onMouseOut={(e) => (e.currentTarget.style.color = 'gray')}
          onClick={() => updateReview(2, maid.id)}
      >
        &#9733;
      </span>
      <span
          style={{  color: 'gray', transition: 'color 0.5s' }}
          onMouseOver={(e) => (e.currentTarget.style.color = 'yellow')}
          onMouseOut={(e) => (e.currentTarget.style.color = 'gray')}
          onClick={() => updateReview(3, maid.id)}
      >
        &#9733;
      </span>
      <span
          style={{ color: 'gray', transition: 'color 0.5s' }}
          onMouseOver={(e) => (e.currentTarget.style.color = 'yellow')}
          onMouseOut={(e) => (e.currentTarget.style.color = 'gray')}
          onClick={() => updateReview(4, maid.id)}
      >
        &#9733;
      </span>

      <span
          style={{  color: 'gray', transition: 'color 0.5s' }}
          onMouseOver={(e) => (e.currentTarget.style.color = 'yellow')}
          onMouseOut={(e) => (e.currentTarget.style.color = 'gray')}
          onClick={() => updateReview(5, maid.id)}

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

          <button>
    <a onClick={() => acceptMaid(maid.id, 50)}>
        <img style={{ height: "75px", width: "75px", marginLeft: "0px" }} src="src/images/accept.png" alt="Accept Icon" />
    </a>
</button>


                            <button>
              <a onClick={() => rejectMaid(maid.id, 50)}>
                            <img style={{  height:"50px" ,  width:"50px" ,marginLeft: "0px" }} src="src/images/reject.png" alt="Home Icon" />
                    </a>
          </button>

    </div>
      </span>
                                </div>
                            </div>
                        </section>
                    </div>
                ))}
                {maids.map((maid: any) => (
                    <div key={maid.id} className="column" style={{ flex: '0 0 calc(33.33% - 20px)', margin: '10px' }}>
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
                                height: '750px'
                            }}>
                                <div className="container" style={{

                                    padding: '1.5em',
                                    top: '50px',
                                    bottom: '100px',
                                    right: 0,
                                    left: 0,
                                    height: '750px', // Wrap the value in quotes as it is a string
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


            }} >id: {maid.id}
            </div>
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
                    {maid.name}

                      <p style={{ fontSize: "15px", color: "black", marginLeft: "10px" }}> {parseFloat(maid.review.toFixed(1))}</p>
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
                        <div>
      {counter === 2 && (
          <div id="user">
              Has applied to your post #52
          </div>
      )}



                            {counter === 3 && (
                                <div id="user">
                                    Has applied to your post #52
                                </div>


                            )}

                            {incrementCounter()}
    </div>


                            </div>
                        </div>
                        <br />

                            <label>
                            Name:
                            <input type="text"
                                   value={maid.name}
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
                            Email:
                            <input type="email"
                                   value={maid.email}
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
                            PhoneNumber:
                            <input type="number"
                                   value={maid.phonenumber}
                                   readOnly
                                   style={{
                                       width: '44%',
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
                            <div className="star-rating" style={{textAlign:"center"}}>
   <span
       style={{  color: 'gray', transition: 'color 0.5s' }}
       onMouseOver={(e) => (e.currentTarget.style.color = 'yellow')}
       onMouseOut={(e) => (e.currentTarget.style.color = 'gray')}
       onClick={() => updateReview(1, maid.id)}
   >
        &#9733;
      </span>
      <span
          style={{  color: 'gray', transition: 'color 0.5s' }}
          onMouseOver={(e) => (e.currentTarget.style.color = 'yellow')}
          onMouseOut={(e) => (e.currentTarget.style.color = 'gray')}
          onClick={() => updateReview(2, maid.id)}
      >
        &#9733;
      </span>
      <span
          style={{  color: 'gray', transition: 'color 0.5s' }}
          onMouseOver={(e) => (e.currentTarget.style.color = 'yellow')}
          onMouseOut={(e) => (e.currentTarget.style.color = 'gray')}
          onClick={() => updateReview(3, maid.id)}
      >
        &#9733;
      </span>
      <span
          style={{ color: 'gray', transition: 'color 0.5s' }}
          onMouseOver={(e) => (e.currentTarget.style.color = 'yellow')}
          onMouseOut={(e) => (e.currentTarget.style.color = 'gray')}
          onClick={() => updateReview(4, maid.id)}
      >
        &#9733;
      </span>

      <span
          style={{  color: 'gray', transition: 'color 0.5s' }}
          onMouseOver={(e) => (e.currentTarget.style.color = 'yellow')}
          onMouseOut={(e) => (e.currentTarget.style.color = 'gray')}
          onClick={() => updateReview(5, maid.id)}

      >
        &#9733;
      </span>
  </div>




                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '20px', // Adjust the margin as needed
                        }}>

          <button>
    <a onClick={() => acceptMaid(maid.id, 52)}>
        <img style={{ height: "75px", width: "75px", marginLeft: "0px" }} src="src/images/accept.png" alt="Accept Icon" />
    </a>
</button>

                            <button>
              <a onClick={() => acceptMaid(maid.id, 52)}>
                                <img style={{  height:"50px" ,  width:"50px" ,marginLeft: "0px" }} src="src/images/reject.png" alt="Home Icon" />
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

export default MyPosts;
