import { useState } from "react";
import axios from "axios";

function FormContact() {
    // State for form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        subject: "",
        message: ""
    });

    // State for submission messages
    const [formMessage, setFormMessage] = useState("");

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            // Send form data to API using Axios
            const response = await axios.post(
                "https://your-api-endpoint.com/submit",
                formData
            );

            // Handle successful response
            setFormMessage("Message sent successfully!");
        } catch (error) {
            // Handle errors
            setFormMessage("Failed to send the message. Please try again.");
        }
    };

    return (
        <>
            <div className="">
                <div className="container">
                    <form
                        onSubmit={handleSubmit}
                        className="contact-form input-white ajax-contact"
                    >
                        <h3 className="sec-title text-center mb-35">
                            Send Us a Message
                        </h3>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    id="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <i className="fal fa-user"></i>
                            </div>
                            <div className="form-group col-md-6">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                <i className="fal fa-envelope"></i>
                            </div>
                            <div className="form-group col-md-6">
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="number"
                                    id="number"
                                    placeholder="Phone Number"
                                    value={formData.number}
                                    onChange={handleInputChange}
                                    required
                                />
                                <i className="fal fa-phone"></i>
                            </div>
                            <div className="form-group col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="subject"
                                    id="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                />
                                <i className="fal fa-file-invoice"></i>
                            </div>
                            <div className="form-group col-12">
                                <textarea
                                    name="message"
                                    id="message"
                                    cols="30"
                                    rows="3"
                                    className="form-control"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                                <i className="fal fa-pencil"></i>
                            </div>
                            <div className="form-btn col-12 text-center">
                                <button type="submit" className="ot-btn">
                                    Send Message
                                    <i className="fas fa-chevrons-right ms-2"></i>
                                </button>
                            </div>
                        </div>
                        {formMessage && (
                            <p className="form-messages mb-0 mt-3">
                                {formMessage}
                            </p>
                        )}
                    </form>
                </div>
            </div>
            <div className="" id="mapSec">
                <div className="contact-map">
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15883.039461953702!2d-0.2003447!3d5.6024494!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a4cbd8d6231%3A0xc4cc2383621c3292!2sSea-Freight%20Pineapple%20Exporters%20of%20Ghana%20(SPEG)!5e0!3m2!1sen!2sgh!4v1732556300769!5m2!1sen!2sgh" 
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </>
    );
}

export default FormContact;
