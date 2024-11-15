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
        <div className="flex flex-col border p-4 mb-4 text-center">
            <h2>Update Profile Information</h2>
            {message && <p className='text-red'>{message}</p>}
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className='flex flex-col'>
                    <label>Preferred Email:</label>
                    <input 
                        className='text-black w-3/5 m-auto' 
                        type="text"
                        name="email"
                        value={userDetails.email || ''} 
                        onChange={handleInputChange}
                        defaultValue={userDetails.email}
                        />
                </div>
                <div className='flex flex-col'>
                    <label>Name:</label>
                    <input 
                        className='text-black w-3/5 m-auto' 
                        type="text"
                        name="name"
                        value={userDetails.name || ''}
                        onChange={handleInputChange}
                        defaultValue={userDetails.name}
                        />
                </div>
                <div className='flex flex-col'>
                    <label>Prefix:</label>
                    <input 
                        className='text-black w-3/5 m-auto' 
                        type="text"
                        name="prefix"
                        value={userDetails.prefix || ''}
                        onChange={handleInputChange}
                        defaultValue={userDetails.prefix}
                        />
                </div>
                <div className='flex flex-col'> 
                    <label>Organization:</label>
                    <input 
                        className='text-black w-3/5 m-auto' 
                        type="text"
                        name="organization"
                        value={userDetails.organization || ''}
                        onChange={handleInputChange}
                        defaultValue={userDetails.organization}
                        />
                </div>
                <div className='flex flex-col'>
                <label>Phone Number:</label>
                <input 
                    className='text-black w-3/5 m-auto' 
                    type="text"
                    name="phone"
                    value={userDetails.phone || ''}
                    onChange={handleInputChange}
                    defaultValue={userDetails.phone}
                    />
                </div>
                <div className='flex flex-col'>
                <label>Job Title/Occupation:</label>
                <input 
                    className='text-black w-3/5 m-auto' 
                    type="text"
                    name="title"
                    value={userDetails.title || ''}
                    onChange={handleInputChange}
                    defaultValue={userDetails.title}
                    />
                </div>
                <button type='submit' className='rounded text-white bg-blue-400'>Update</button>
            </form>
        </div>
    );
}

export default EditProfile;