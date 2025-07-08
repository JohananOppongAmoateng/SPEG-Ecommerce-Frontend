import pine1 from "../assets/img/normal/Pineapple 4.jpeg"
import ico1 from "../assets/img/theme-img/subtitle_icon.svg"
import assets from "../assets/img/icon/about_feature_1.svg"
function Topic() {
    return (
        <>
            <div className="space">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-7 mb-40 mb-xl-0">
                            <div className="img-box1">
                                <img
                                    src={pine1}
                                    alt="About"
                                />
                            </div>
                        </div>
                        <div className="col-xl-5 text-center text-xl-start">
                            <div className="title-area mb-34">
                                <span className="sub-title">
                                    <img
                                        src={ico1}
                                        alt="icon"
                                    />
                                    About Company
                                </span>
                                <h2 className="sec-title">SPEG</h2>
                                <p className="sec-desc">
                                    SPEG Pineapple Producers and Exporters of Ghana(SPEG) 
                                    was formed in 1994 as a spin-off from
                                    the Horticultural Association of Ghana. SPEG
                                    is a professional organized body with
                                    specialization in the export of high quality
                                    pineapples produced under good agricultural
                                    practice. Our reputation has long been
                                    established. We believe in stringent
                                    standards of hygiene and process control
                                    which allow us to provide a consistent and
                                    reliable selection of high quality products.
                                    We are committed to using up to date
                                    technology in the export of produce for
                                    sales.
                                </p>
                            </div>
                            {/* <div className="mb-40">
                                <div className="about-feature-wrap">
                                    <div className="about-feature">
                                        <div className="box-icon">
                                            <img
                                                src={assets}
                                                alt="Icon"
                                            />
                                        </div>
                                        <h3 className="box-title">
                                            30+ Members
                                        </h3>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Topic;
