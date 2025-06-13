import React from 'react';

const AboutUsPage = () => {
    return (
        <div className="min-h-screen bg-black py-16 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg px-6 py-10 mt-20">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-indigo-600">About Us</h1>
                </header>

                <section className="text-gray-700 space-y-6 text-lg leading-relaxed">
                    <p>
                        Welcome to <span className="font-semibold text-indigo-500">ChariFlow</span>! We're dedicated to making the world a better place by connecting people with causes they care about.
                    </p>
                    <p>
                        Our mission is to empower individuals and organizations to create meaningful change through innovative solutions and collaboration. Whether you're here to give or to ask for support, ChariFlow is your trusted platform for real impact.
                    </p>
                </section>

                <footer className="mt-10 border-t pt-6 text-center text-sm text-gray-500">
                    <p>Contact us at: <a href="mailto:support@chariflow.com" className="text-indigo-500 hover:underline">support@chariflow.com</a></p>
                </footer>
            </div>
        </div>
    );
};

export default AboutUsPage;
