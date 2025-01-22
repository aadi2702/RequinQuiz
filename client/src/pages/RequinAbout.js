import gsap from 'gsap';
import React, { useEffect } from 'react';
import image1 from '../images/4.jpg'
import image2 from '../images/61.jpg';
import image3 from '../images/IMG_0434.jpg';
import image5 from '../images/IMG_0955.jpg';
import image6 from '../images/IMG_0969.jpg';
import image7 from '../images/IMG_1306.jpg';
import image8 from '../images/IMG_1395.jpg';
import image9 from '../images/IMG_1399.jpg';
import image10 from '../images/IMG_1414.jpg';
 
const RequinAbout = () => {
    useEffect(() => {
        gsap.fromTo(
            '.LeftTextBox',
            { x: -200, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                scrollTrigger: {
                    trigger: '.LeftTextBox',
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 1,
                },
            }
        );
        gsap.fromTo(
            '.RightTextBox',
            { x: 200, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                scrollTrigger: {
                    trigger: '.RightTextBox',
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 1,
                },
            }
        );
        // gsap.fromTo(
        //     '.ImgBox1',
        //     { y: 200, opacity: 0 },
        //     {
        //         y: 0,
        //         opacity: 1,
        //         scrollTrigger: {
        //             trigger: '.ImgBox1',
        //             start: 'top 80%',
        //             end: 'top 50%',
        //             scrub: 1,
        //         },
        //     }
        // );
        // gsap.fromTo(
        //     '.ImgBox2',
        //     { y: 200, opacity: 0 },
        //     {
        //         y: 0,
        //         opacity: 1,
        //         scrollTrigger: {
        //             trigger: '.ImgBox2',
        //             start: 'top 80%',
        //             end: 'top 50%',
        //             scrub: 1,
        //         },
        //     }
        // );
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-16 font-body font-sans">
            {/* Text Content */}
            <div className="flex flex-col md:flex-row md:items-center overflow-hidden">
                <div className="LeftTextBox md:w-1/2 space-y-6 p-8">
                    <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#86B3D1] to-[#00A9FF] bg-clip-text text-transparent font-display">
                        Our Story
                    </h2>
                    <p className="text-xl text-[#222629] font-sans">
                        At Requin Solutions, founded in 2019, we are a passionate IT company that offers innovative solutions across multiple industries.
                    </p>
                    <p className="text-xl text-[#222629] font-sans">
                        We specialize in Java and Node.js development, offering exceptional technical solutions and comprehensive academic assistance. We are driven by a commitment to continuous learning, fostering a collaborative environment that encourages growth for both budding talents and experienced professionals.
                    </p>
                </div>
                {/* Image Grid */}
                <div className="ImgBox1 md:w-1/2 mt-8 md:mt-0 grid grid-cols-3 gap-4 p-4 overflow-hidden">
                    <img
                        src={image1}
                        alt="Our Story 1"
                        className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-110 transition duration-300"
                    />
                    <img
                        src={image5}
                        alt="Our Story 3"
                        className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-110 transition duration-300"
                    />
                    <img
                        src={image3}
                        alt="Our Story 2"
                        className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-110 transition duration-300"
                    />
                    <img
                        src={image6}
                        alt="Our Story 4"
                        className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-110 transition duration-300"
                    />
                    <img
                        src={image2}
                        alt="Our Story 5"
                        className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-110 transition duration-300"
                    />
                    <img
                        src={image10}
                        alt="Our Story 6"
                        className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-110 transition duration-300"
                    />
                </div>
            </div>

            {/* Growing Since Section */}
            <div className="mt-16 flex flex-col md:flex-row md:items-center overflow-hidden">
                <div className="RightTextBox md:w-1/2 md:order-2 space-y-6 p-8">
                    <h3 className="text-4xl font-extrabold bg-gradient-to-r from-[#86B3D1] to-[#00A9FF] bg-clip-text text-transparent font-display">Growing Since 2020</h3>
                    <p className="text-xl text-[#222629]">
                        We have experienced tremendous growth since our inception in 2019, expanding our expertise and services.
                    </p>
                    <p className="text-xl text-[#222629]">
                        Our team of experts spans multiple fields, ensuring that we provide cutting-edge solutions to both our clients and academic partners.
                    </p>
                </div>
                <div className="ImgBox2 md:w-1/2 grid grid-cols-3 gap-4 mt-8 md:mt-0 p-4 overflow-hidden">
                    <img
                        src={image7}
                        alt="Our Story 7"
                        className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-110 transition duration-300"
                    />
                    <img
                        src={image8}
                        alt="Our Story 8"
                        className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-110 transition duration-300"
                    />
                    <img
                        src={image9}
                        alt="Our Story 9"
                        className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-110 transition duration-300"
                    />
                </div>
            </div>

            {/* Explore Button Section */}
            <div className="text-center mt-16">
                <a
                    href="/life-at-requin"
                    className="text-2xl font-semibold py-3 px-6 bg-accent text-white rounded-lg shadow-lg hover:bg-[#86B3D1] transition duration-300"
                >
                    Explore Life at Requin
                </a>
            </div>
        </div>
    );
};

export default RequinAbout;
