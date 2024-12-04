import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useUserStore } from "../lib/userStore.js";
import { getUserbyId } from "../lib/fetchData.js";
import { updateUserDetails } from '../lib/pushData.js';
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { storage } from "../lib/firebase.js";
import { useNavigate } from 'react-router-dom';
import Avatar from "../components/Avatar.jsx";

function EditProfile() {
    const { userId, updateAvatar } = useUserStore();
    const { id } = useParams();
    const [userDoc, setUserDoc] = useState({});
    const [userDetails, setUserDetails] = useState({});
    const [message, setMessage] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function getUser() {
            const user = (await getUserbyId(id || userId)).data;
            setUserDoc(user);
            setUserDetails(user.details);
        }
        getUser();
    }, [userId, id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserDetails({
            ...userDetails,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await updateUserDetails(userId, userDetails);
            setMessage('Profile has been updated successfully. Redirecting in 3 seconds...');
            setUserDoc({ ...userDoc });
            // console.log(userDetails.avatar);
            updateAvatar(userDetails.avatar);
            setTimeout(() => {
                navigate('/profile');
            }, 3000);

        } catch (error) {
            console.error('An error occurred: ', error);
            setMessage('An error occured when attempting to update profile. See console for details.');
        }
    };

    return (
        <div 
            className="flex flex-col justify-center items-center border rounded gap-4 w-max m-auto p-4"
        >
            <h2 className='text-lg'>Update Profile Information</h2>
            <span className='text-m text-red-400'>This information is viewable to other users!</span>
            {message && <p className='text-red'>{message}</p>}
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <div className='grid items-center grid-cols-4 gap-1 m-auto p-2'>
                    <label>
                        <input type="radio" name="avatar" value="src/avatars/m1.png" onChange={handleInputChange}/>
                        <img
                        src="src/avatars/m1.png"
                        className="justify-center items-center"
                        value="src/avatars/m1.png"
                        alt="Male 1"
                        width="50"
                        height="50" />
                    </label>
                    <label>
                    <input type="radio" name="avatar" value="src/avatars/m2.png" onChange={handleInputChange}/>
                        <img
                        src="src/avatars/m2.png"
                        className="justify-center items-center"
                        value="src/avatars/m2.png"
                        alt="Male 1"
                        width="50"
                        height="50"/>
                    </label>
                    <label>
                    <input type="radio" name="avatar" value="src/avatars/m3.png" onChange={handleInputChange}/>
                        <img
                        src="src/avatars/m3.png"
                        className="justify-center items-center"
                        value="src/avatars/m3.png"
                        alt="Male 1"
                        width="50"
                        height="50"/>
                    </label>
                    <label>
                    <input type="radio" name="avatar" value="src/avatars/m4.png" onChange={handleInputChange}/>
                        <img
                        src="src/avatars/m4.png"
                        className="justify-center items-center"
                        value="src/avatars/m4.png"
                        alt="Male 1"
                        width="50"
                        height="50" />
                    </label>
                    <label>
                    <input type="radio" name="avatar" value="src/avatars/w1.png" onChange={handleInputChange}/>
                        <img
                        src="src/avatars/w1.png"
                        className="justify-center items-center"
                        value="src/avatars/w1.png"
                        alt="Male 1"
                        width="50"
                        height="50" />
                    </label>
                    <label>
                    <input type="radio" name="avatar" value="src/avatars/w2.png" onChange={handleInputChange}/>
                        <img
                        src="src/avatars/w2.png"
                        className="justify-center items-center"
                        value="src/avatars/w2.png"
                        alt="Male 1"
                        width="50"
                        height="50"/>
                    </label>
                    <label>
                    <input type="radio" name="avatar" value="src/avatars/w3.png" onChange={handleInputChange}/>
                        <img
                        src="src/avatars/w3.png"
                        className="justify-center items-center"
                        value="src/avatars/w3.png"
                        alt="Male 1"
                        width="50"
                        height="50" />
                    </label>
                    <label>
                    <input type="radio" name="avatar" value="src/avatars/w4.png" onChange={handleInputChange}/>
                        <img
                        src="src/avatars/w4.png"
                        className="justify-center items-center"
                        value="src/avatars/w4.png"
                        alt="Male 1"
                        width="50"
                        height="50" />
                    </label>
                </div>
                {/* <button className="flex items-center justify-center rounded bg-gray-500 w-1/4 mb-2 ">Save Avatar</button> */}

                <div className='grid grid-cols-[auto_1fr] gap-1 m-auto'>
                    <label className='text-right'>Preferred Email:</label>
                    <input 
                        className='text-black w-5/6 m-auto' 
                        type="text"
                        name="email"
                        value={userDetails.email} 
                        onChange={handleInputChange}
                        defaultValue={userDetails.email}
                        placeholder='Enter your email...'
                    />
                    <label className='text-right'><span className='text-red-400'>*</span>Name:</label>
                    <input 
                        className='text-black w-5/6 m-auto' 
                        type="text"
                        name="name"
                        value={userDetails.name}
                        onChange={handleInputChange}
                        defaultValue={userDetails.name}
                        placeholder='Enter your name...'
                        required
                    />
                    <label className='text-right'>Prefix:</label>
                    <input 
                        className='text-black w-5/6 m-auto' 
                        type="text"
                        name="prefix"
                        value={userDetails.prefix}
                        onChange={handleInputChange}
                        defaultValue={userDetails.prefix}
                        placeholder='Enter your prefix...'
                    />
                    <label className='text-right'>Organization:</label>
                    <input 
                        className='text-black w-5/6 m-auto' 
                        type="text"
                        name="organization"
                        value={userDetails.organization}
                        onChange={handleInputChange}
                        defaultValue={userDetails.organization}
                        placeholder='Enter your organization...'
                    />
                    <label className='text-right'>Phone Number:</label>
                    <input 
                        className='text-black w-5/6 m-auto' 
                        type="text"
                        name="phone"
                        value={userDetails.phone}
                        onChange={handleInputChange}
                        defaultValue={userDetails.phone}
                        placeholder='Enter a phone number...'
                    />
                    <label className='text-right'>Job Title/Occupation:</label>
                    <input 
                        className='text-black w-5/6 m-auto' 
                        type="text"
                        name="title"
                        value={userDetails.title}
                        onChange={handleInputChange}
                        defaultValue={userDetails.title}
                        placeholder='Enter your job title...'
                    />
                    <h6 className='text-xs text-center col-span-2 p-2'><span className='text-red-400'>*</span> - field is required.</h6>
                </div>
                <button type='submit' className='rounded text-white bg-blue-400 w-fit m-auto' onSubmit={handleSubmit}>Update</button>
            </form>
        </div>
    );
}

export default EditProfile;