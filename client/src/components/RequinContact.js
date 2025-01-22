import React, { useEffect } from 'react';

const RequinContact = () => {
    useEffect(() => {
        // Load the Visme forms script
        const script = document.createElement('script');
        script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
        script.async = true;
        document.body.appendChild(script);

        // Cleanup function to remove the script if the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <div
                id="contact"
                className="bg-cover bg-center bg-no-repeat bg-white py-12 border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 mx-4"
                // style={{ backgroundImage: 'url(images/background.jpg)' }}
            >
                <h2 className="flex justify-center mb-6 text-5xl font-extrabold text-[#2A3E4C] transition-all duration-300 ease-in-out hover:text-[#00ABE4]">Lets Get In Touch</h2>
                <div className="container mx-auto flex flex-col lg:flex-row">
                    {/* Left Section: Contact Information */}
                    <div className="lg:w-1/3 flex flex-col space-y-8 justify-center items-center lg:items-start p-6 lg:pl-[108px]">
                        <div className="w-full max-w-xs bg-blue-300 backdrop-filter backdrop-blur-md bg-opacity-20 shadow-md rounded-lg p-6 text-center hover:scale-110 transition duration-300">
                            <div className="text-blue-500 text-3xl mb-2">📞</div>
                            <p className="text-lg font-medium">
                                <a href="https://wa.me/+917976084711">+91 - 7976084711</a>
                            </p>
                        </div>
                        <div className="w-full max-w-xs bg-blue-300 backdrop-filter backdrop-blur-md bg-opacity-20 shadow-md rounded-lg p-6 text-center hover:scale-110 transition duration-300">
                            <div className="text-blue-500 text-3xl mb-2">📍</div>
                            <p className="text-lg font-medium">
                                <a href="https://maps.app.goo.gl/UPk8Qy96BwrrnY5f8">
                                    Plot no 6/397, 1st Floor, Sec-6, Malviya Nagar, Jaipur, Rajasthan
                                    (302017)
                                </a>
                            </p>
                        </div>
                        <div className="w-full max-w-xs bg-blue-300 backdrop-filter backdrop-blur-md bg-opacity-20 shadow-md rounded-lg p-6 text-center hover:scale-110 transition duration-300 overflow-hidden">
                            <div className="text-blue-500 text-3xl mb-2 ">✉️</div>
                            <p className="text-lg font-medium">
                                <a href="mailto:Info@requinsolutions.com">
                                    Info@requinsolutions.com
                                </a>
                            </p>
                            <p className="text-lg font-medium">
                                <a href="mailto:Hr@requinsolutions.com">
                                    Hr@requinsolutions.com
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Right Section: Contact Form */}

                    <div className="w-full max-w-full bg-white  p-6">
                        <div
                            className="visme_d"
                            data-title="Business Contact Form"
                            data-url="eprjmqd1-business-contact-form"
                            data-domain="forms"
                            data-full-page="false"
                            data-min-height="500px"
                            data-form-id="74352"
                        ></div>
                    </div>

                </div>
            </div>

            {/* 
            <div className="bg-cover bg-center bg-no-repeat bg-white py-12 border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 mx-4 my-8">
                <h2 className="flex justify-center mb-6 text-5xl font-extrabold text-[#2A3E4C] transition-all duration-300 ease-in-out hover:text-[#00ABE4]">Reach Out To Us</h2>
                <div className="mt-12 lg:mx-auto mx-4 max-w-screen-lg border-2 rounded-lg border-gray-300 ">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.703110976086!2d75.8163574148513!3d26.84939368315485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db66c82889ff3%3A0x84819a30be0867b1!2sRequin%20solutions%20pvt.%20ltd!5e0!3m2!1sen!2sin!4v1673590511141!5m2!1sen!2sin"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map Location"
                    ></iframe>
                </div>
            </div> */}
        </>
    );
};

export default RequinContact;
