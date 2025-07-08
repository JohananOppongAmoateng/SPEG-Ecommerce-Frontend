import cont1 from "../assets/img/icon/contact_feature_1.svg"
import cont2 from "../assets/img/icon/contact_feature_2.svg"
import cont3 from "../assets/img/icon/contact_feature_3.svg"
import cont4 from "../assets/img/icon/contact_feature_4.svg"
function ContactIcon() {
    return (
        <>
            <div className="space">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-xl-3 col-sm-6">
                            <div className="contact-feature">
                                <div className="box-icon">
                                    <img
                                        src={cont1}
                                        alt="Icon"
                                    />
                                </div>
                                <h4 className="box-title">Phone Number</h4>
                                <p className="box-text">
                                    <a href="tel:+233302244357">
                                        (+233) 302 244 357
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="contact-feature">
                                <div className="box-icon">
                                    <img
                                        src={cont2}
                                        alt="Icon"
                                    />
                                </div>
                                <h4 className="box-title">Email Address</h4>
                                <p className="box-text">
                                    <a href="mailto:spegpine@gmail.com">
                                        spegpine@gmail.com
                                    </a>
                                    <a href="mailto:speg@spegpine.com">
                                        admin@spegpine.com
                                    </a>
                                    <a href="mailto:spegpine@yahoo.co.uk">
                                        spegpine@yahoo.co.uk
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="contact-feature">
                                <div className="box-icon">
                                    <img
                                        src={cont3}
                                        alt="Icon"
                                    />
                                </div>
                                <h4 className="box-title">Our Address</h4>
                                <p className="box-text">
                                    P. O. Box 5196, Accra North
                                    <br />
                                    1st Floor Ampomah House
                                    <br />
                                    Olusegun Obasanjo Highway
                                    <br />
                                    Accra, Ghana.
                                    <br />
                                    GPS Address: GA-062-39052
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="contact-feature">
                                <div className="box-icon">
                                    <img
                                        src={cont4}
                                        alt="Icon"
                                    />
                                </div>
                                <h4 className="box-title">Working Hours</h4>
                                <p className="box-text">
                                    Mon - Fri: 08:00 AM - 04:00 PM
                                    <br />
                                    Sat - Sun: Closed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactIcon;
