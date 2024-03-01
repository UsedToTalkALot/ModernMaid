import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import  "../assets/css/Post.css";
import axios from 'axios';


const YourComponent: React.FC = () => {



    const [address, setAddress] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [salary, setSalary] = useState<number | string>('');
    const [numberOfMaids, setNumberOfMaids] = useState<number | string>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [userData, setUserData] = useState<any | null>(null);
    const [isUserExists, setIsUserExists] = useState<boolean>(false);
    const userId = localStorage.getItem('id');

    const getNameById = async (id: number): Promise<string | null> => {
        try {
            const response = await axios.get(`http://localhost:8082/user/getName/${id}`);
            return response.data.name;
        } catch (error) {
            console.error(`Error fetching name for user with id ${id}:`, error);
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



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const postData = {
            start: startDate?.toISOString(),
            finish: endDate?.toISOString(),
            salary: Number(salary),
            discription: description,
            noOfMaids: Number(numberOfMaids),
            address: address,
            userId: 2
        };


        try {
            const response = await axios.post('http://localhost:8082/post/save', postData, {
                headers: {

                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error making post request:', error);
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

                padding: '1.5em',
                height: 'auto',
                width: 'auto',
                // height: '700px',
                // width: '450px',
                borderRadius: '10px',
                backgroundColor: '#E5989B',
                boxShadow: '5px 5px 0px 5px var(--darktwo)', // Wrap the value in quotes as it is a string
                position: 'relative',
            }}>
                <div className="your-component" style={{
                    maxWidth: '400px',
                    margin: 'auto',
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
                >
                    <form onSubmit={handleSubmit}>
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
                                   value={address} onChange={(e) => setAddress(e.target.value)} />
                        </label>
                        <br />

                        <label>
                            Description:
                            <textarea   style={{
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
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="description-input"
                            />
                        </label>
                        <br />

                        <label>
                            Salary:
                            <input type="number" value={salary}
                                   style={{
                                       width: '100%',
                                       padding: '8px',
                                       fontSize: '16px',
                                       border: '1px solid #E5989B',
                                       borderRadius: '20px',
                                       marginBottom: '10px',
                                       backgroundColor: '#F0B4A4',
                                   }}
                                   onChange={(e) => setSalary(e.target.value)} />
                        </label>
                        <br />

                        <label>
                            Number of Maids:
                            <input type="number"
                                   style={{
                                       width: '100%',
                                       padding: '8px',
                                       fontSize: '16px',
                                       border: '1px solid #E5989B',
                                       borderRadius: '20px',
                                       marginBottom: '10px',
                                       backgroundColor: '#F0B4A4',
                                   }}
                                   value={numberOfMaids} onChange={(e) => setNumberOfMaids(e.target.value)} />

                        </label>
                        <br />

                        <label >
                            Start Date:
                                <div style={{
                                    height: '40px',
                                    width: '100%',
                                    padding: '8px',
                                    fontSize: '16px',

                                    border: '1px solid #E5989B',
                                    borderRadius: '20px',
                                    marginBottom: '10px',
                                    backgroundColor: '#F0B4A4',
                                }}>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                </div>
                        </label>


                        <label>
                            End Date:
                            <div style={{
                                height: '40px',
                                width: '100%',
                                padding: '8px',
                                fontSize: '16px',
                                border: '1px solid #E5989B',
                                borderRadius: '20px',
                                marginBottom: '10px',
                                backgroundColor: '#F0B4A4',
                            }}>
                            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}/>
                            </div>
                        </label>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '20px', // Adjust the margin as needed
                        }}>
                        <button type="submit" className="btn" style={{

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
                        }} >POST</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );

};

export default YourComponent;
