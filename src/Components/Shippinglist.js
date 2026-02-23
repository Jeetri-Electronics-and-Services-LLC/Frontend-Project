import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Shippinglist.css';

const Shippinglist = ({isOpen}) => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.post('http://localhost:8080/invoices/getsomeinvoicedetailswithlistofproducts');
                setInvoices(response.data);
            } catch (error) {
                console.error('Error fetching invoice data:', error);
            }
        };

        fetchInvoices();
    }, []);

    return (

        <div className={`shipping-list ${isOpen ? 'open' : ''}`}>
            <h1>Invoice List</h1>
            {invoices.length > 0 ? (
                invoices.map((invoice) => (
                    <div key={invoice.invoiceid} className='shipping-list-div'>
                        <div className="invoice-details">
                            <div className="invoice-detail">
                                <strong>INVOICE ID:</strong>
                            </div>
                            <div className="invoice-detail">
                                {invoice.invoiceid}
                            </div>
                            <div className="invoice-detail">
                                <strong>CUSTOMER NAME:</strong>
                            </div>
                            <div className="invoice-detail">
                                {invoice.customerdisplayname_id}
                            </div>
                            <div className="invoice-detail">
                                <strong>INVOICE DATE:</strong>
                            </div>
                            <div className="invoice-detail">
                                {invoice.invoicedate}
                            </div>
                            <div className="invoice-detail">
                                <strong>STATUS:</strong>
                            </div>
                            <div className="invoice-detail">
                                {invoice.status_id}
                            </div>
                            <div className="invoice-detail">
                                <strong>TOTAL AMOUNT:</strong>
                            </div>
                            <div className="invoice-detail">
                                {invoice.total}
                            </div>
                        </div>
                        <h4>Product Details:</h4>
                        <ul>
                            {invoice.productDetails.map((product, index) => (
                                <li key={index}>
                                    {product.name} - Qty: {product.qty}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No invoices available.</p>
            )}
        </div>
    );
};

export default Shippinglist;
