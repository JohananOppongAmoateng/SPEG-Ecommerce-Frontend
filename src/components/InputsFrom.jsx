import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "../assets/img/fertilizer.jpg";
import ico from "../assets/img/theme-img/subtitle_icon.svg";


const InputsFrom = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const products = [
        {
            image: "/api/placeholder/400/300",
            title: "NPK",
            iconSrc: "/api/placeholder/24/24"
        },
        {
            image: "/api/placeholder/400/300",
            title: "Plastic Mulch",
            iconSrc: "/api/placeholder/24/24"
        },
        {
            image: "/api/placeholder/400/300",
            title: "Iron Sulphate",
            iconSrc: "/api/placeholder/24/24"
        },
        {
            image: "/api/placeholder/400/300",
            title: "Urea",
            iconSrc: "/api/placeholder/24/24"
        },
        {
            image: "/api/placeholder/400/300",
            title: "Magnesium Sulphate",
            iconSrc: "/api/placeholder/24/24"
        }
    ];

    const itemsPerPage = 4;
    const totalSlides = Math.ceil(products.length / itemsPerPage);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const visibleProducts = products.slice(
        currentSlide * itemsPerPage,
        (currentSlide + 1) * itemsPerPage
    );

    const ServiceCard = ({ title}) => (
        <div className="w-full sm:w-1/2 lg:w-1/4 px-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="relative h-48">
                    <img
                        src={img1}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-6 relative">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        {/* <div className="bg-white rounded-full p-4 shadow-lg">
                            <img
                                src={service1}
                                alt="Icon"
                                className="w-6 h-6"
                            />
                        </div> */}
                    </div>
                    <h3 className="text-xl font-bold text-center mt-4 mb-4">
                        <a
                            href="#"
                            className="text-gray-800 hover:text-blue-600"
                        >
                            {title}
                        </a>
                    </h3>
                    <a
                        href="/shop"
                        className="block text-center text-blue-600 hover:text-blue-800 font-semibold"
                    >
                        Read More
                        <ChevronRight className="inline ml-2" size={16} />
                    </a>
                </div>
            </div>
        </div>
    );

    return (
        <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-end justify-between mb-8">
                    <div className="w-full md:w-2/3 mb-6 md:mb-0">
                        <div className="title-area text-center text-md-start">
                            <span className="sub-title flex flex-col relative">
                                <img src={ico} alt="icon" />
                                Top Picks
                            </span>
                            <h2 className="sec-title">We offer best inputs</h2>
                        </div>
                    </div>
                    <div className="w-auto">
                        <div className="flex space-x-2">
                            <button
                                onClick={prevSlide}
                                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-4 transition-all duration-300 ease-in-out">
                    {visibleProducts.map((product, index) => (
                        <ServiceCard key={index} {...product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InputsFrom;
