import React from 'react';

const SuccessStories = () => {
    const stories = [
        {
            id: 1,
            name: 'John Doe',
            story: 'Thanks to ChariFlow, I was able to raise funds for my community project and make a real difference!',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 2,
            name: 'Jane Smith',
            story: 'ChariFlow connected me with amazing donors who believed in my cause. Forever grateful!',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 3,
            name: 'Michael Johnson',
            story: 'With ChariFlow, I turned my dream into reality. Highly recommend it to anyone with a vision!',
            image: 'https://via.placeholder.com/150',
        },
    ];

    return (
        <div className="py-28 px-6 min-h-[100vh] bg-gray-50">
            <h1 className="text-4xl font-bold text-center text-indigo-600 mb-12">Success Stories</h1>
            <div className="flex flex-wrap justify-center gap-6">
                {stories.map((story) => (
                    <div
                        key={story.id}
                        className="bg-white shadow-md rounded-xl p-6 max-w-xs text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        <img
                            src={story.image}
                            alt={story.name}
                            className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                        />
                        <h3 className="text-xl font-semibold text-gray-700">{story.name}</h3>
                        <p className="text-gray-600 text-sm mt-2">{story.story}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuccessStories;
