import bread1 from "../assets/img/grass-surface-pine.webp";

function Breadcrumb({ pageName }) {
    return (
        <>
            <div 
                className="breadcumb-wrapper" 
                style={{ backgroundImage: `url(${bread1})`,
                    backgroundSize:"cover",
                 }}
            >
                <div className="container z-index-common">
                    <div className="breadcumb-content">
                        <h1 className="breadcumb-title">{pageName}</h1>
                        <ul className="breadcumb-menu">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>{pageName}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Breadcrumb;
