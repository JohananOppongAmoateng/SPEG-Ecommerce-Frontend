import sub from "../assets//img/theme-img/subtitle_icon.svg"
import feature1 from "../assets/img/icon/about_feature_1.svg"
import feature2 from "../assets/img/icon/about_feature_2.svg"
import imgPine from "../assets/img/pineapples-top-view-fruit-scenery.jpg"

function About() {
    return (
        <>
            <div className="space">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-7 mb-40 mb-xl-0">
                            <div className="img-box1">
                                <img
                                    src={imgPine}
                                    alt="About"
                                />
                            </div>
                        </div>
                        <div className="col-xl-5 text-center text-xl-start">
                            <div className="title-area mb-34">
                                <span className="sub-title">
                                    <img
                                        src={sub}
                                        alt="icon"
                                    />
                                    About SPEG
                                </span>
                                <h2 className="sec-title">SPEG</h2>
                                <p className="sec-desc">
                                    SPEG stands for SEA-FREIGHT PINEAPPLE
                                    EXPORTERS OF GHANA. A professional organized
                                    body with specialization in the export of
                                    high-quality pineapples produced with good
                                    agricultural practice and under an excellent
                                    hygienic environment
                                </p>
                            </div>
                            <div className="mb-40">
                                <div className="about-feature-wrap">
                                    <div className="about-feature">
                                        <div className="box-icon">
                                            <img
                                                src={feature1}
                                                alt="Icon"
                                            />
                                        </div>
                                        <h3 className="box-title">
                                            Shipping Assistance
                                        </h3>
                                    </div>
                                    <div className="about-feature">
                                        <div className="box-icon">
                                            <img
                                                src={feature2}
                                                alt="Icon"
                                            />
                                        </div>
                                        <h3 className="box-title">
                                            Collective Welfare
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-group">
                                <a href="about.html" className="ot-btn">
                                    Learn more
                                    <i className="fas fa-chevrons-right ms-2"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
