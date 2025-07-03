import Breadcrumb from "../components/Breadcrumb";
import OrderTable from "../components/OrderTable";

function Orders() {
    return (
        <div>
            <Breadcrumb pageName="Orders" />
            <OrderTable />
        </div>
    );
}

export default Orders;
