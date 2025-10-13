import AllInvoices from "../../components/Invoices/allInvoices/AllInvoices";
import InvoiceStats from "../../components/Invoices/invoiceStats/InvoiceStats";

const Invoices = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <InvoiceStats />
      <AllInvoices />
    </div>
  );
};

export default Invoices;
