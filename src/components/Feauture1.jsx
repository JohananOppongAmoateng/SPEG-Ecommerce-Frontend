import feature1 from "../assets/img/icon/front_replace.png";
import feature2 from "../assets/img/icon/feature_card.png";

function Feature1() {
    return (
        <>
            <section className="space-top">
                <div className="container">
                    <div className="row gy-4 justify-content-center">
                        <div className="col-xl-4 col-sm-6">
                            <div
                                className="feature-card"
                                style={{ backgroundImage: `url('assets/img/bg/feature_card_bg.png')` }}
                            >
                                <div className="box-icon">
                                    <img
                                        src={feature1}
                                        alt="icon"
                                    />
                                </div>
                                <div className="media-body">
                                    <p className="box-subtitle"></p>
                                    <h3 className="box-title">
                                        The best quality pineapples
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-6">
                            <div
                                className="feature-card"
                                style={{ backgroundImage: `url('assets/img/bg/feature_card_bg.png')` }}
                            >
                                <div className="box-icon">
                                    <img
                                        src={feature2}
                                        alt="icon"
                                    />
                                </div>
                                <div className="media-body">
                                    <p className="box-subtitle"></p>
                                    <h3 className="box-title">
                                        Quality Fertilizers
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-6">
                            <div
                                className="feature-card"
                                style={{ backgroundImage: `url('assets/img/bg/feature_card_bg.png')` }}
                            >
                                <div className="box-icon">
                                    <img
                                        src={feature1}
                                        alt="icon"
                                    />
                                </div>
                                <div className="media-body">
                                    <p className="box-subtitle"></p>
                                    <h3 className="box-title">
                                        Natural healthy pineapples
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Feature1;
