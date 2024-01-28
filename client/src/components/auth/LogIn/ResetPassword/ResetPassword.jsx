import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email) {
            setError('Please provide your email.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please provide a valid email.');
            return;
        }

        try {
            const response = await fetch('/api/auth/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                setError('Password reset link has been sent to your email!');
                navigate('/');
            } else {
                switch (response.status) {
                    case 400:
                        setError('Invalid email.');
                        break;
                    case 500:
                        setError('Server error. Please try again later.');
                        break;
                    default:
                        setError('Password reset failed.');
                }
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <main className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md space-y-6 text-gray-600 sm:px-4">
                    <div className="mt-5 space-y-2 text-center">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Account Recovery</h3>
                    </div>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="emailAddress">Please enter your Email address</label>
                            <input type="email" id="emailAddress" name="emailAddress" placeholder='yourmail@email.com' required onChange={(e) => setEmail(e.target.value)} className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
                        </div>
                        {error && <p>{error}</p>}
                        <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150" type="submit">
                            Submit
                        </button>
                    </form>
                    <p className='text-left'>If you do not have an account, please <Link to={'/signup'} className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link> </p>
                </div>

            </main>
        </>

    )
}

export default ResetPassword