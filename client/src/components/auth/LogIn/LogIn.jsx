import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../../redux/user/userSlice';
import OauthLogin from '../oauth/OauthLogin';
import { BASE_URL } from '../../../config';
import { Input, Button, Link } from '@nextui-org/react';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons';

const Login = () => {
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const toggleVisibility = () => setIsVisible(!isVisible);
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!identifier || !password) {
            setError('Please provide both email/phone number and password.');
            return;
        }

        try {
            setLoading(true);
            dispatch(loginStart());
            const response = await fetch(`${BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setUser(data);
                dispatch(loginSuccess(data));
                navigate('/');
            } else {
                switch (response.status) {
                    case 401:
                        setError('Invalid email/phone number or password.');
                        break;
                    case 500:
                        setError('Server error. Please try again later.');
                        break;
                    default:
                        setError('Login failed.');
                }
                dispatch(loginFailure(error));
            }
        } catch (error) {
            setError(error.message || 'Login failed.');
            dispatch(loginFailure(error.message || 'Login failed.'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const isEmail = inputValue.includes('@');
        const identifier = isEmail ? inputValue : inputValue.startsWith('+91') ? inputValue : '+91' + inputValue;
        setIdentifier(identifier);
    }, [inputValue]);

    return (
        <main className="min-h-screen flex justify-center items-center">
            <div className="w-full max-w-md space-y-6 text-gray-600 px-4 sm:px-8 text-center">
                <div className="text-center">
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 font-bold sm:text-3xl">Log in to your account</h3>
                        <p className="text-sm">Don't have an account? <Link color="primary" href="/signup">Sign up</Link></p>
                    </div>
                </div>
                {error && (
                    <div className=" border border-danger text-danger px-4 py-3 rounded-md mb-4 w-full max-w-xs mx-auto text-center">
                        <p>{error}</p>
                    </div>
                )}
                <div className="rounded-md mb-4 w-full max-w-xs mx-auto text-center">
                    <OauthLogin />
                </div>
                <form className="space-y-5 flex flex-col items-center" onSubmit={handleSubmit}>
                    <div className="w-full">
                        <Input
                            value={inputValue}
                            id='identifier'
                            name="identifier"
                            label="Email or Phone"
                            variant="bordered"
                            color={"primary"}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="max-w-xs mx-auto"
                        />
                    </div>
                    <div className="w-full">
                        <Input
                            id="password"
                            name="password"
                            label="Password"
                            variant="bordered"
                            placeholder="Enter your password"
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            className="max-w-xs mx-auto"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button loading={loading} className="max-w-xs" type="submit" color="primary" auto fullWidth>
                        Log In
                    </Button>
                </form>
                <div className="forgot-password font-medium">
                    <p className="login-action-text">Forgot password? <Link color="primary" href="/reset-password">Reset it here</Link></p>
                </div>
            </div>
        </main>
    );
};

export default Login;