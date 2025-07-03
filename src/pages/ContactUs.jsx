import Breadcrumb from "../components/Breadcrumb";
import ContactIcon from "../components/ContactIcon";
import FormContact from "../components/FormContact";

function ContactUs() {
    return (
        <>
            <Breadcrumb pageName="Contact Us" />
            <ContactIcon />
            <FormContact/>
        </>
    );
}

export default ContactUs;
