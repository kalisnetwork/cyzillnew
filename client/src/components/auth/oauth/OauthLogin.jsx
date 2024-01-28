import React from 'react';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { app } from '../../../firebase.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../../redux/user/userSlice.js';
import { BASE_URL } from '../../../config.js';

const OauthLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(app);
    const providerGoogle = new GoogleAuthProvider();
    const providerApple = new OAuthProvider('apple.com');
    const providerFacebook = new FacebookAuthProvider();
    const analytics = getAnalytics(app);

    const handleLoginGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, providerGoogle);
            const { user } = result;
            const res = await fetch(`${BASE_URL}/api/auth/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: user.displayName, email: user.email, photo: user.photoURL }),
            });
            const data = await res.json();
            dispatch(loginSuccess(data));
            navigate('/');
            logEvent(analytics, 'login_success', { method: providerGoogle.providerId });
        } catch (error) {
            console.log('Could not sign in with Google', error);
            logEvent(analytics, 'login_failure', { method: providerGoogle.providerId });
        }
    };

    const handleLoginFacebook = async () => {
        try {
            const result = await signInWithPopup(auth, providerFacebook);
            const { user } = result;
            const res = await fetch(`${BASE_URL}/api/auth/facebook`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: user.displayName, email: user.email, photo: user.photoURL }),
            });
            const data = await res.json();
            dispatch(loginSuccess(data));
            navigate('/');
            logEvent(analytics, 'login_success', { method: providerFacebook.providerId });
        } catch (error) {
            console.log('Could not sign in with Facebook', error);
            logEvent(analytics, 'login_failure', { method: providerFacebook.providerId });
        }
    };

    const handleLoginApple = async () => {
        try {
            const result = await signInWithPopup(auth, providerApple);
            const { user } = result;
            const res = await fetch(`${BASE_URL}/api/auth/apple`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: user.displayName, email: user.email, photo: user.photoURL }),
            });
            const data = await res.json();
            dispatch(loginSuccess(data));
            navigate('/');
            logEvent(analytics, 'login_success', { method: providerApple.providerId });
        } catch (error) {
            console.log('Could not sign in with Apple', error);
            logEvent(analytics, 'login_failure', { method: providerApple.providerId });
        }
    };

    return (
        <div className="grid grid-cols-3 gap-x-3">
            <button type='button' onClick={handleLoginGoogle} className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
                <img src="/google.svg" alt="Google-Logo" width={20} />
            </button>
            <button type='button' onClick={handleLoginApple} className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
                <img src="/apple.svg" alt="Apple-Logo" width={20} />
            </button>
            <button type='button' onClick={handleLoginFacebook} className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
                <img src="/facebook.svg" alt="Facebook-Logo" width={20} />
            </button>
        </div>
    );
};

export default OauthLogin;
