import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

const FAQ = () => {
    return (
        <div className="py-4 max-w-screen-lg mx-auto">
            <div className="text-center mb-16">
                <p className="mt-4 text-sm leading-7 text-gray-500 font-regular">
                    F.A.Q
                </p>
                <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                    Frequently Asked <span className="text-indigo-600">Questions</span>
                </h3>
            </div>

            <div className="px-10 sm:px-16 sm:flex items-start mb-10">

                <h3 className="py-3 font-bold text-lg text-gray-900 w-3/12">
                    Technical
                </h3>
                <div className="w-9/12">
                    <div className="flex items-start mb-8">
                        <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                            <FaQuestionCircle />
                        </div>
                        <div className="text-md">
                            <h1 className="text-gray-900 font-semibold mb-2">How can I enhance my property's curb appeal?</h1>
                            <p className="text-gray-500 text-sm">Boost your property's charm with simple landscaping ideas and vibrant outdoor decor. A welcoming exterior sets the tone for a delightful living experience.</p>
                        </div>
                    </div>

                    {/* Add more positive and engaging questions and answers */}
                </div>
            </div>

            <div className="px-10 sm:px-16 sm:flex items-start mb-10">

                <h3 className="py-3 font-bold text-lg text-gray-900 w-3/12">
                    Billing
                </h3>
                <div className="w-9/12">
                    <div className="flex items-start mb-8">
                        <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                            <FaQuestionCircle />
                        </div>
                        <div className="text-md">
                            <h1 className="text-gray-900 font-semibold mb-2">How does the billing process work?</h1>
                            <p className="text-gray-500 text-sm">Our transparent billing process ensures clarity and ease. You receive detailed invoices, and our customer support is always ready to assist you with any billing-related queries.</p>
                        </div>
                    </div>

                    {/* Add more positive and engaging questions and answers */}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
