import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useUserStore } from "../lib/userStore.js";
import { getUserbyId } from "../lib/fetchData.js";
import Avatar from "../components/Avatar.jsx";

function EditProfile() {
    const { userId } = useUserStore();
    const { id } = useParams();
    const [userDoc, setUserDoc] = useState({});
    const [userDetails, setUserDetails] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function getUser() {
            const user = await getUserbyId(id || userId);
            setUserDoc(user);
            setUserDetails(user.details);
        }
        getUser();
        console.log(userDetails);
    }, [userId, id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await updateUserDetails(id || userId, userDetails);
            if (response.ok) {
                setMessage('Profile has been updated successfully.');
            } else {
                setMessage('Failed to update profile.');
            }
        } catch (error) {
            console.error('An error occurred: ', error);
            setMessage('An error occured when attempting to update profile. See console for details.');
        }
    };

    return (
        <div 
            className="flex flex-col items-center border rounded gap-4 w-max m-auto p-4"
        >
            <h2 className='text-lg'>Update Profile Information</h2>
            {message && <p className='text-red'>{message}</p>}
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className='grid grid-cols-[auto_1fr] gap-1'>
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
                        value={userDetails.namePrefix}
                        onChange={handleInputChange}
                        defaultValue={userDetails.namePrefix}
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
                <button type='submit' className='rounded text-white bg-blue-400 w-fit m-auto'>Update</button>
            </form>
        </div>
    );
}

export default EditProfile;