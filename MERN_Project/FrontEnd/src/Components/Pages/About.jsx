import React from 'react'

function About() {
    return (
        <div className="bg-gray-100 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-semibold text-gray-800">
                        Welcome to Kabari Hotel
                    </h1>
                    <p className="mt-2 text-xl text-gray-600">
                        A place where tea is brewed with love and tradition.
                    </p>
                    {/* SVG Decoration */}
                    <div className="mt-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-12 h-12 mx-auto text-green-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 10h18M3 14h18M9 4h6M9 8h6M12 16v4m-3-2h6"
                            />
                        </svg>
                    </div>
                </div>

                {/* About Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-semibold text-gray-800">Our Story</h2>
                        <p className="text-lg text-gray-700">
                            At Kabari Hotel, we have been serving the finest tea to our
                            guests for over a decade. What started as a small tea stall has
                            now grown into a beloved local establishment. Our goal is to
                            provide a warm and welcoming environment where everyone can enjoy
                            a cup of freshly brewed tea, made with the best leaves and
                            ingredients.
                        </p>
                        <p className="text-lg text-gray-700">
                            Our team of passionate tea lovers work hard to create an
                            unforgettable experience for our customers. Whether you're looking
                            for a peaceful place to relax or a lively spot to catch up with
                            friends, Kabari Hotel is the perfect destination.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-3xl font-semibold text-gray-800">Our Special Tea</h2>
                        <p className="text-lg text-gray-700">
                            At Kabari Hotel, we pride ourselves on our special blend of tea.
                            We source our leaves from the best tea gardens, ensuring a unique
                            and authentic taste in every cup. Our tea is prepared fresh and
                            served with love, offering a variety of flavors to suit every taste.
                        </p>
                        <p className="text-lg text-gray-700">
                            From traditional masala chai to refreshing iced teas, our
                            menu features something for everyone. Whether you're a tea
                            enthusiast or a first-timer, we guarantee you'll find something
                            that suits your preferences.
                        </p>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mt-12 text-center">
                    <h3 className="text-2xl font-semibold text-gray-800">Our Values</h3>
                    <p className="mt-2 text-lg text-gray-700">
                        At Kabari Hotel, we believe in quality, service, and tradition. Our
                        mission is to provide the best tea experience in a cozy and friendly
                        environment. We believe that a great cup of tea can bring people
                        together, spark conversations, and create memories that last a lifetime.
                    </p>

                    {/* SVG Icon for Tea */}
                    <div className="mt-8">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-20 h-20 mx-auto text-teal-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M18 8a6 6 0 00-12 0v6a6 6 0 0012 0V8zM6 10h12v4H6z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About
