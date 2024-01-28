import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';


export default function App() {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate()
    const [confirmationResult, setConfirmationResult] = useState(null);

    const handleVerifyOTP = async () => {
        try {
            const result = await confirmationResult.confirm(otp);
            // User signed in successfully.
            const user = result.user;
            console.log(user);
            // Redirect to home page
            navigate('/home');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <main className="min-h-screen flex">
            <div className="flex-1 flex items-center justify-center h-screen">
                <div className="w-full max-w-md space-y-6 text-gray-600 sm:px-4">
                    <div className="text-center">
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl my-10 font-bold sm:text-3xl">OTP Verification</h3>
                        </div>
                    </div>
                    <form className="space-y-5">
                        <div className=' flex items-center justify-center'>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span></span>}
                                renderInput={(props) => (
                                    <input
                                        {...props}
                                        type="number"
                                        className="w-16 h-16 text-black bg-white border-2 border-blue-500 rounded-xl text-center mx-1 text-2xl"
                                        style={{ boxSizing: 'border-box' }}
                                    />
                                )}
                            />
                        </div>
                        <button onClick={handleVerifyOTP} className="w-full px-4 py-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">Verify OTP</button>
                    </form>
                    <div className="font-medium">
                        <p className="login-action-text">Didn't receive code? <a className="font-medium text-center text-indigo-600 hover:text-indigo-500" href="#">Resend</a></p>
                    </div>
                </div>
            </div>
            <div className="relative flex-1 hidden items-center justify-center bg-slate-300 h-screen lg:flex">
                <div className="relative z-10 w-full max-w-md">
                    <img src="/otp-house.png" className="w-full" draggable={false} alt="House" />
                </div>
            </div>
        </main>
    );
}
