import React from 'react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-black py-16 px-6 md:px-20 mt-10">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12 grid md:grid-cols-2 gap-10">
                
                {/* Left - Contact Info */}
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold text-indigo-600">Contact Us</h1>
                    <p className="text-gray-700">
                        Have questions, suggestions, or just want to say hello? We’d love to hear from you.
                    </p>
                    <div className="space-y-4 text-gray-600">
                        <p><strong>Email:</strong> support@chariflow.com</p>
                        <p><strong>Phone:</strong> +92 300 1234567</p>
                        <p><strong>Location:</strong> Sukkur, Pakistan</p>
                    </div>
                </div>

                {/* Right - Contact Form */}
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            placeholder="Your Message"
                            rows="4"
                            className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
