import React, { useState, useEffect } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import OauthLogin from '../oauth/OauthLogin';
import { BASE_URL } from '../../../config';
import { Input, Button, Checkbox, Link } from '@nextui-org/react';
import PhoneInput from './PhoneInput';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons';

const SignUp = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [isSelected, setIsSelected] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [state, setState] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
        error: null,
        passwordErrors: { length: true, lowercase: true, uppercase: true, number: true, specialChar: true, },
        showPasswordSuggestions: false,
    });

    const setPhoneNumber = (phoneNumber) => {
        setState(prevState => ({ ...prevState, phoneNumber }));
    };
    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            phoneNumber: '',
            password: '',
            passwordErrors: {
                length: true,
                lowercase: true,
                uppercase: true,
                number: true,
                specialChar: true,
            },
            phoneNumberError: false,
            passwordsMatch: true,
        }));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: state.username,
                    email: state.email,
                    phoneNumber: state.phoneNumber,
                    password: state.password,
                    termsAccepted: state.termsAccepted ? 'ok' : '',
                }),
            });
            if (response.ok) {
                setState((prevState) => ({ ...prevState, error: 'User created successfully!' }));
                navigate('/login');
            } else {
                const errorData = await response.json();
                setState((prevState) => ({ ...prevState, error: errorData.message || 'Registration failed.' }));
            }
        } catch (error) {
            setState((prevState) => ({ ...prevState, error: 'An error occurred. Please try again.' }));
        }
    };

    const handlePasswordChange = (event) => {
        const password = event.target.value;
        const passwordErrors = validatePassword(password);
        const passwordSuggestions = Object.values(passwordErrors);

        setState(prevState => ({
            ...prevState,
            password,
            showPasswordSuggestions: true,
            passwordErrors: passwordSuggestions.reduce((acc, curr) => ({ ...acc, [curr]: true }), {}),
            passwordSuggestions,
        }));
    };


    const handleConfirmPasswordChange = (event) => {
        const confirmPassword = event.target.value;
        setState(prevState => ({
            ...prevState,
            confirmPassword,
            passwordsMatch: confirmPassword === prevState.password,
        }));
    };

    const validatePassword = (password) => {
        const errors = {
            length: 'At least 8 characters',
            lowercase: 'At least one lowercase letter',
            uppercase: 'At least one uppercase letter',
            number: 'At least one number',
            specialChar: 'At least one special character',
        };

        if (password.length >= 8) delete errors.length;
        if (/[a-z]/.test(password)) delete errors.lowercase;
        if (/[A-Z]/.test(password)) delete errors.uppercase;
        if (/\d/.test(password)) delete errors.number;
        if (/[^A-Za-z0-9]/.test(password)) delete errors.specialChar;

        return errors;
    };
    const { passwordsMatch, error, passwordErrors } = state;
    return (
        <>
            <main className="min-h-screen flex justify-center items-center">
                <div className="w-full max-w-md space-y-6 text-gray-600 px-4 sm:px-8 text-center">
                    <div className="text-center">
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Register Now</h3>
                            <p className=""> Already have an account? <Link href='/login' color="primary">Log in </Link > </p>
                        </div>
                    </div>
                    <div className="rounded-md mb-4 w-full max-w-xs mx-auto text-center">
                        <OauthLogin />
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5 flex flex-col items-center">
                        <div className="w-full">
                            <Input
                                id='username'
                                name="text"
                                label="Username"
                                variant="bordered"
                                color={"primary"}
                                className="max-w-xs mx-auto"
                                required value={state.username} onChange={e => setState(prevState => ({ ...prevState, username: e.target.value.trim() }))}
                            />
                        </div>
                        <div className="rounded-md mb-4 w-full max-w-xs mx-auto text-center">
                            <PhoneInput setPhoneNumber={setPhoneNumber} />
                        </div>
                        <div className="w-full">
                            <Input
                                label="Email"
                                variant="bordered"
                                color={"primary"}
                                className="max-w-xs mx-auto"
                                id='email' type="email" required value={state.email} onChange={e => setState(prevState => ({ ...prevState, email: e.target.value.trim() }))}
                            />
                        </div>
                        <div className="w-full">
                            <Input
                                id="password"
                                name="password"
                                label="Password"
                                variant="bordered"
                                color={"primary"}
                                placeholder="Enter your password"
                                required value={state.password} onChange={handlePasswordChange}
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
                            />
                            {state.showPasswordSuggestions && (
                                <ul className=' text-danger'>
                                    {state.passwordSuggestions.map((suggestion, index) => (
                                        <li key={index} className={state.passwordErrors[suggestion]}>{suggestion}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="w-full">
                            <Input
                                id="confirmPassword"
                                type='password'
                                name="confirmPassword"
                                label="Password"
                                variant="bordered"
                                color={"primary"}
                                placeholder="Enter your password"
                                required onChange={handleConfirmPasswordChange}
                                className="max-w-xs mx-auto"
                            />
                            {!passwordsMatch && <div className='text-danger'>Passwords do not match</div>}
                        </div>
                        <Checkbox isSelected={isSelected} onValueChange={setIsSelected} id='termsAccepted' name='termsAccepted' required onChange={e => setState(prevState => ({ ...prevState, termsAccepted: e.target.checked }))} >
                            I agree to cyzill's <Link href='/terms-and-conditions' >terms and conditions.</Link>
                        </Checkbox>
                        {error && (
                            <div className=" border border-danger text-danger px-4 py-3 rounded-md mb-4 w-full max-w-xs mx-auto text-center">
                                <p>{error}</p>
                            </div>
                        )}
                        <Button type="submit" color='primary' className="rounded-md mb-4 w-full max-w-xs mx-auto text-center duration-150">Create account</Button>
                    </form>
                </div>
            </main >
        </>
    );
}

export default SignUp;
