import React, { useState, useEffect } from 'react';
import { auth } from '../../lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function PhoneAuth() {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: 'invisible',
            });
            window.recaptchaVerifier.render();
        }
    }, []);

    const handleAddPhoneNumber = async () => {
        setLoading(true);
        setError('');

        const normalizedPhone = `+${phone}`;
        if (!normalizedPhone.trim() || !normalizedPhone.startsWith('+')) {
            setError("Please enter a valid phone number with country code (e.g., +1234567890).");
            setLoading(false);
            return;
        }

        try {
            const appVerifier = window.recaptchaVerifier;
            const confirmationResult = await signInWithPhoneNumber(auth, normalizedPhone, appVerifier);
            window.confirmationResult = confirmationResult;
            console.log("OTP sent.");
            window.location.href = '/otp-verify';
        } catch (error) {
            console.error('Failed to send OTP:', error);
            setError("Failed to send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Add Your Phone Number</h2>
            <PhoneInput
                country={'us'}
                value={phone}
                onChange={(phone) => setPhone(phone)}
                inputStyle={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                }}
            />
            <button onClick={handleAddPhoneNumber} disabled={loading}>
                Send OTP
            </button>
            <div id="recaptcha-container"></div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default PhoneAuth;

