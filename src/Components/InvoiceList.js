import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InvoiceList.css'; // Import the CSS file

const InvoicesList = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedInvoiceId, setExpandedInvoiceId] = useState(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            setError(null);
            try {
                const response = await axios.get('http://localhost:8080/invoices/details');
                setInvoices(response.data);
            } catch (err) {
                setError('Failed to fetch invoices');
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    const handleExpand = async (invoiceId) => {
        try {
            const response = await axios.get(`http://localhost:8080/invoices/getinvoice/${invoiceId}`);
            const fullInvoice = response.data;

            setInvoices(prevInvoices =>
                prevInvoices.map(invoice =>
                    invoice.id === invoiceId ? { ...invoice, ...fullInvoice, expanded: true } : invoice
                )
            );
            setExpandedInvoiceId(invoiceId);
        } catch (err) {
            setError('Failed to fetch full invoice details');
        }
    };

    const handleCollapse = (invoiceId) => {
        setExpandedInvoiceId(null);
    };

    const handleDelete = async (invoiceId) => {
        try {
            await axios.delete(`http://localhost:8080/invoices/deleteinvoice/${invoiceId}`);
            setInvoices(prevInvoices => prevInvoices.filter(invoice => invoice.id !== invoiceId));
        } catch (err) {
            setError('Failed to delete invoice');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <h1>Invoices List</h1>
            {invoices.length === 0 ? (
                <p>No invoices found</p>
            ) : (
                invoices.map(invoice => (
                    <div key={invoice.id} className="invoice">
                        <div className="invoice-header">
                            <h2>Invoice ID: {invoice.id}</h2>
                            <div className="button-group">
                                {expandedInvoiceId === invoice.id ? (
                                    <>
                                        <button onClick={() => handleCollapse(invoice.id)} className="button button-collapse">
                                            Collapse
                                        </button>
                                        <button onClick={() => handleDelete(invoice.id)} className="button button-delete">
                                            Delete
                                        </button>
                                    </>
                                ) : (
                                    <button onClick={() => handleExpand(invoice.id)} className="button button-more">
                                        More
                                    </button>
                                )}
                            </div>
                        </div>

                        <table className="table">
                            <tbody>
                                <tr><th>Customer ID</th><td>{invoice.customer_id}</td></tr>
                                <tr><th>Email</th><td>{invoice.email}</td></tr>
                                <tr><th>Subtotal</th><td>{invoice.subtotal}</td></tr>
                            </tbody>
                        </table>

                        {expandedInvoiceId === invoice.id && (
                            <>
                                <h3>Full Invoice Details</h3>
                                <table className="table">
                                    <tbody>
                                        <tr><th>Customer ID</th><td>{invoice.customer_id}</td></tr>
                                        <tr><th>Email</th><td>{invoice.email}</td></tr>
                                        <tr><th>CC</th><td>{invoice.cc}</td></tr>
                                        <tr><th>BCC</th><td>{invoice.bcc}</td></tr>
                                        <tr><th>Bill To</th><td>{invoice.billto}</td></tr>
                                        <tr><th>Ship To</th><td>{invoice.shipto}</td></tr>
                                        <tr><th>Ship Via</th><td>{invoice.shipvia}</td></tr>
                                        <tr><th>Shipping Date</th><td>{invoice.shippingdate}</td></tr>
                                        <tr><th>Tracking No</th><td>{invoice.trackingno}</td></tr>
                                        <tr><th>Terms ID</th><td>{invoice.terms_id}</td></tr>
                                        <tr><th>Invoice Date</th><td>{invoice.invoicedate}</td></tr>
                                        <tr><th>Due Date</th><td>{invoice.duedate}</td></tr>
                                        <tr><th>Status ID</th><td>{invoice.status_id}</td></tr>
                                        <tr><th>Franchise Owner ID</th><td>{invoice.franchiseowner_id}</td></tr>
                                        <tr><th>Processed On</th><td>{invoice.processedon}</td></tr>
                                        
                                        <tr><th>Terms and Conditions</th><td>{invoice.termsandconditions}</td></tr>
                                       
                                        <tr><th>Subtotal</th><td>{invoice.subtotal}</td></tr>
                                        <tr><th>Discount</th><td>{invoice.discount}</td></tr>
                                        <tr><th>Taxable Subtotal</th><td>{invoice.taxablesubtotal}</td></tr>
                                        <tr><th>Tax Rates ID</th><td>{invoice.taxrates_id}</td></tr>
                                        <tr><th>Sales Tax</th><td>{invoice.salestax}</td></tr>
                                        <tr><th>Invoice Total</th><td>{invoice.invoicetotal}</td></tr>
                                        <tr><th>Deposit</th><td>{invoice.deposit}</td></tr>
                                        <tr><th>Paycheck To</th><td>{invoice.paycheckto}</td></tr>
                                        <tr><th>Balance Amount</th><td>{invoice.balanceamount}</td></tr>
                                        <tr><th>Note To Customer</th><td>{invoice.notetocustomer}</td></tr>
                                        <tr><th>Internal Customer Notes</th><td>{invoice.internalcustomernotes}</td></tr>
                                        <tr><th>Menu On Statement</th><td>{invoice.menuonstatement}</td></tr>
                                    </tbody>
                                </table>

                                <h3>Products</h3>
                                {invoice.products && invoice.products.length > 0 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Product Name</th>
                                                <th>Description</th>
                                                <th>Qty</th>
                                                <th>Cost</th>
                                                <th>Amount</th>
                                                <th>Indirect Dealer Cost</th>
                                                <th>Prom Indirect Dealer Cost</th>
                                                <th>Direct Dealer Cost</th>
                                                <th>Prom Direct Dealer Cost</th>
                                                <th>Distributor Cost</th>
                                                <th>Prom Distributor Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invoice.products.map(product => (
                                                <tr key={product.id}>
                                                    <td>{product.id}</td>
                                                    <td>{product.product || 'N/A'}</td>
                                                    <td>{product.description || 'N/A'}</td>
                                                    <td>{product.qty || 0}</td>
                                                    <td>{product.cost || 0}</td>
                                                    <td>{product.amount || 0}</td>
                                                    <td>{product.indirectdealercost || 'N/A'}</td>
                                                    <td>{product.promindirectdealercost || 'N/A'}</td>
                                                    <td>{product.directdealercost || 'N/A'}</td>
                                                    <td>{product.promdirectdealercost || 'N/A'}</td>
                                                    <td>{product.distributorcost || 'N/A'}</td>
                                                    <td>{product.promdistributorcost || 'N/A'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No products found for this invoice</p>
                                )}

                                <div className="button-group">
                                    <button onClick={() => handleCollapse(invoice.id)} className="button button-collapse">
                                        Collapse
                                    </button>
                                    <button onClick={() => handleDelete(invoice.id)} className="button button-delete">
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default InvoicesList;




