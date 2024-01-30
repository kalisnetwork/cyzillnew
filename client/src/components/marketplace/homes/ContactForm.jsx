import React from 'react';

const ContactForm = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50" onClick={onClose}>
            <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 md:p-5 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Contact Us
                    </h3>
                    <div className="relative bg-white rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] overflow-hidden">
                        <div className="grid md:grid-cols-2">
                            <div className="text-center p-6 xl:p-10 flex flex-col items-center justify-center">
                                <h2 className="text-3xl text-blue-500 font-bold">Contact Us</h2>
                                <img src="https://readymadeui.com/contact.webp" alt="Contact" className="mt-4 shrink-0 w-full" />
                            </div>
                            <form className="p-6 xl:p-10 flex flex-col space-y-4">
                                <input type='text' placeholder='Name'
                                    className="bg-gray-100 rounded-full py-3 px-6 text-sm outline-none" />
                                <input type='email' placeholder='Email'
                                    className="bg-gray-100 rounded-full py-3 px-6 text-sm outline-none" />
                                <input type='email' placeholder='Phone No.'
                                    className="bg-gray-100 rounded-full py-3 px-6 text-sm outline-none" />
                                <textarea placeholder='Message' rows="6"
                                    className="bg-gray-100 rounded-3xl px-6 text-sm pt-3 outline-none"></textarea>
                                <button type='button'
                                    className="text-white bg-blue-500 hover:bg-blue-600 font-semibold rounded-full text-sm px-6 py-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill='#fff' className="mr-2 inline" viewBox="0 0 548.244 548.244">
                                        <path fillRule="evenodd" d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z" clipRule="evenodd" data-original="#000000" />
                                    </svg>
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
