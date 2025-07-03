const Footer = () => {
    return (
        <>
            <footer
                className="footer-wrapper footer-layout1"
                data-bg-src="assets/img/bg/footer_bg_1.jpg"
            >
                <div
                    className="copyright-wrap bg-style1"
                    data-bg-src="assets/img/bg/copyright_bg_1.png"
                >
                    <div className="container">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-lg-6">
                                <p className="copyright-text">
                                    <i className="fal fa-copyright"></i>{" "}
                                    Copyright {new Date().getFullYear()} by{" "}
                                    <a href="/">SPEG</a>. Developed by Junior
                                    Consultants. All rights reserved.
                                </p>
                            </div>
                            <div className="col-lg-6 text-end d-none d-lg-block">
                                <div className="footer-links">
                                    <ul>
                                        <li>
                                            <a href="https://spegpine.com/privacy-policy/">
                                                Privacy & Policy
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="scroll-top">
                <svg
                    className="progress-circle svg-content"
                    width="100%"
                    height="100%"
                    viewBox="-1 -1 102 102"
                >
                    <path
                        d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
                        style={{
                            transition: "stroke-dashoffset 10ms linear 0s",
                            strokeDasharray: "307.919, 307.919",
                            strokeDashoffset: "307.919"
                        }}
                    ></path>
                </svg>
            </div>
        </>
    );
};

export default Footer;
