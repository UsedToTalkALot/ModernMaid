import "../assets/css/Login.css";

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
interface DecodedToken {
    roles?: string[];
    // other token properties
}

const LoginForm: React.FC = () => {
    useEffect(() => {
        // Your JavaScript code here
        let switchCtn = document.querySelector("#switch-cnt") as HTMLElement;
        let switchC1 = document.querySelector("#switch-c1") as HTMLElement;
        let switchC2 = document.querySelector("#switch-c2") as HTMLElement;
        let switchCircle = document.querySelectorAll(
            ".switch__circle"
        ) as NodeListOf<HTMLElement>;
        let switchBtn = document.querySelectorAll(
            ".switch-btn"
        ) as NodeListOf<HTMLElement>;
        let aContainer = document.querySelector("#a-container") as HTMLElement;
        let bContainer = document.querySelector("#b-container") as HTMLElement;
        let allButtons = document.querySelectorAll(
            ".submit"
        ) as NodeListOf<HTMLElement>;

        const getButtons = (e: Event) => e.preventDefault();

        const changeForm = (e: Event) => {
            switchCtn.classList.add("is-gx");
            setTimeout(function () {
                switchCtn.classList.remove("is-gx");
            }, 1500);

            switchCtn.classList.toggle("is-txr");
            switchCircle[0].classList.toggle("is-txr");
            switchCircle[1].classList.toggle("is-txr");

            switchC1.classList.toggle("is-hidden");
            switchC2.classList.toggle("is-hidden");
            aContainer.classList.toggle("is-txl");
            bContainer.classList.toggle("is-txl");
            bContainer.classList.toggle("is-z200");
        };

        const mainF = () => {
            for (let i = 0; i < allButtons.length; i++)
                allButtons[i].addEventListener("click", getButtons);
            for (let i = 0; i < switchBtn.length; i++)
                switchBtn[i].addEventListener("click", changeForm);
        };

        mainF();

        // Cleanup event listeners on component unmount
        return () => {
            for (let i = 0; i < allButtons.length; i++)
                allButtons[i].removeEventListener("click", getButtons);
            for (let i = 0; i < switchBtn.length; i++)
                switchBtn[i].removeEventListener("click", changeForm);
        };
    });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');

    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const count =0;
    const review =0;

    const handleSignUp = async () => {
        // if (setName==null)
        try {
            const response = await axios.post('http://localhost:8082/maid/save', {
                name,
                email,
                phonenumber,
                password,
                count,
                review
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error signing up:', error.response.data);
        }
    };
    const handleLogin = async () => {
        try {
            // const response = await axios.post('http://localhost:8082/authenticate', {
            //   // const response = await axios.post('http://localhost:8082/login', {
            //   email,
            //   password
            // });

            const response = await fetch('http://localhost:8082/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,

                }),
            });

            // if (response.status === 200) {
            //     console.log(response.data);
            //     localStorage.setItem('accessToken', response.data.token);
            //     localStorage.setItem('id', response.data.id);
            //     localStorage.setItem('name', response.data.name);
            //   window.location.href="/admin-dashboard"
            //   }

            if (response.status === 200) {
                const { token, id: maid_id } = await response.json();
                localStorage.setItem('accessToken', token);
                localStorage.setItem('id', maid_id);

                // Decode the token to get user roles
                const decodedToken: DecodedToken = parseJwt(token);
                console.log('Decoded Token:', decodedToken);

                // Check if the user has the 'admin' role
                if (decodedToken.roles && decodedToken.roles.includes("admin")) {
                    // User has admin role, navigate to admin dashboard with user_id
                    window.location.href = "/admin-dashboard"

                } else {
                    navigate(`/modernmaid`);
                }

                // Show success message
                toast.success('Login successful!');
            } else {
                // Handle unsuccessful login (e.g., show an error message)
                console.error('Login failed');
                toast.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            window.alert('Invalid username and password');

            console.error('Error logging in:', error.response.data);
        }
    };
    // Function to decode JWT token without external libraries
    const parseJwt = (token: string) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
                .join('')
        );

        return JSON.parse(jsonPayload) as DecodedToken;
    };
    // axios.interceptors.request.use(
    //   (config) => {
    //     const token = localStorage.getItem('accessToken');
    //     if (token) {
    //       config.headers.Authorization = `Bearer ${token}`;
    //     }
    //     return config;
    //   },
    //   (error) => {
    //     return Promise.reject(error);
    //   }
    // );


    return (
        <>

            <div className="exclude-tailwind">
                <header id="topHeader">
                    <nav>
                        <ul id="topInfo">
                            <li>+977 9876543210</li>
                            <li>info@red_panda_inc.com</li>
                        </ul>
                        <span className="logo" >
            <a href="/">
              <img style={{  height:"50px" ,  width:"50px" ,marginLeft: "55px" }} src="src/images/icon.png" alt="Home Icon" />


            modernMaid</a></span>
                        <div className="menu-btn-3" onClick="menuBtnFunction(this)">
                            <span />
                        </div>
                        <div className="mainMenu">

                            <a href><span>About Us</span></a>

                            {/*<a href><span>Blog</span></a>*/}
                            <a href>Work With Us</a>
                        </div>
                    </nav>
                </header>
                <div className="bodyy">

                    <meta charSet="UTF-8" />

                    <title>modernMaid</title>

                    <meta
                        name="login"
                        content="width=device-width, user-scalable=no, initial-scale=1.0"
                    />
                    <meta charSet="utf-8" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800&display=swap"
                        rel="stylesheet"
                    />
                    <div className="label">
                        <div className="marking">
                    <span className="logo" >Login as Maid!</span>
                        </div>
                        <div className="main">
                        <div className="container a-container" id="a-container">
                            <form className="form" id="a-form" method="" action="">
                                <h2 className="form_title title">Create Account</h2>

                                <span className="form__span">                      </span>
                                <input className="form__input" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                                <input
                                    className="form__input"
                                    type="text"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    className="form__input"
                                    type="text"
                                    placeholder="Phonenumber"
                                    onChange={(e) => setPhonenumber(e.target.value)}
                                />

                                <input


                                    className="form__input"
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className="form__span">                      </span>
                                <button className="form__button brand-btn submit" onClick={handleSignUp}>SIGN UP</button>
                            </form>
                        </div>
                        <div className="container b-container" id="b-container">
                            <div className="form" id="b-form" method="" action="">
                                <h2 className="form_title title">Start applying for jobs</h2>

                                <span className="form__span">                      </span>
                                <input
                                    className="form__input"
                                    type="text"
                                    placeholder="Email"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />

                                <input
                                    className="form__input"
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}

                                    // value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className="form__span">                      </span>
                                {/*<a className="form__link">Forgot your password?</a>*/}
                                <a href="/modernmaid">
                                <button className="form__button brand-btn "  >SIGN IN</button>
                                </a>
                            </div>

                        </div>
                        <div className="switch" id="switch-cnt">
                            <div className="switch__circle" />
                            <div className="switch__circle switch__circle--t" />
                            <div className="switch__container" id="switch-c1">
                                <h2 className="switch__title title">Already have an account?</h2>
                                <p className="switch__description description">
                                    Please sign in to continue
                                </p>
                                <span className="form__span">                      </span>
                                <button className="switch__button brand-btn switch-btn" >
                                    SIGN IN
                                </button>
                            </div>
                            <div className="switch__container is-hidden" id="switch-c2">
                                <h2 className="switch__title title">Don't have an account yet?</h2>

                                <p className="switch__description description">
                                    Enter your personal details and start journey
                                </p>
                                <span className="form__span">                      </span>
                                <button className="switch__button brand-btn  switch-btn">
                                    SIGN UP
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
                </footer>
            </div>
        </>
    );
};

export default LoginForm;
