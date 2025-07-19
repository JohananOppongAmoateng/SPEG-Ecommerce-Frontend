import hero from "../assets/img/hero/Pineapple 2.jpg";
function Hero() {
    return (
        <>
            <div className="ot-hero-wrapper hero-1 hero-4">
                <div
                    className="hero-slider ot-carousel"
                    data-fade="true"
                    data-adaptive-height="true"
                >
                    <div className="ot-hero-slide">
                        <div
                            className="ot-hero-bg"
                            style={{
                                backgroundImage: `url(${hero})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize:" cover"
                            }}
                        ></div>
                        <div className="container z-index-common">
                            <div className="hero-style1">
                                <h3 className="hero-title">
                                    <span
                                        className="title1"
                                        data-ani="slideinup"
                                        data-ani-delay="0.3s"
                                    >
                                        Production Inputs
                                    </span>
                                </h3>

                                <div
                                    className="btn-group"
                                    data-ani="slideinup"
                                    data-ani-delay="0.7s"
                                >
                                    <a
                                        href="/about_us"
                                        className="ot-btn style3"
                                    >
                                        Learn More
                                        <i className="fas fa-chevrons-right ms-2"></i>
                                    </a>
                                    <a
                                        href="/contact_us"
                                        className="ot-btn style4"
                                    >
                                        Contact Us
                                        <i className="fas fa-chevrons-right ms-2"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;
