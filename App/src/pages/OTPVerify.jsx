import React, { useState } from 'react';
import { auth, db } from '../../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

function OTPVerify() {
    const [otpCode, setOtpCode] = useState('');
    const [error, setError] = useState('');

    const handleVerifyOTP = async () => {
        try {
            const result = await window.confirmationResult.confirm(otpCode);
            const user = auth.currentUser;
            console.log('User is verified:', user);

            // Save phone number to Firestore or to the user's auth profile
            const userDoc = doc(db, "users", user.uid);
            await updateDoc(userDoc, { phone: user.phoneNumber });

            alert('Phone number successfully added and verified.');
            setOtpCode('');
        } catch (error) {
            console.error('Error while verifying OTP:', error);
            setError("Invalid OTP. Please try again.");
        }
    };

    return (
        <div>
            <h2>Verify Your OTP</h2>
            <label htmlFor="otp">Enter OTP:</label>
            <input
                type="text"
                id="otp"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="Enter OTP"
                style={{
                    padding: '10px',
                    width: '100%',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    marginBottom: '10px'
                }}
            />
            <button onClick={handleVerifyOTP}>Verify OTP</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default OTPVerify;
