









// import React, { useState, useEffect } from 'react'; 
// import { useLocation } from 'react-router-dom';
// import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
// import PdfDocument from './PdfDocument'; // PDF rendering component
// import axios from 'axios';
// import './SendEmailPage.css';

// const SendEmailPage = () => {
//     const location = useLocation();
//     const { ordertype, id } = location.state || {};
//     const [fetchedData, setFetchedData] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // Email details
//     const [emailDetails, setEmailDetails] = useState({
//         to: '',
//         subject: `${ordertype} Details Attached`,
//         body: '',
//     });

//     // Fetch order details based on ordertype and id
//     useEffect(() => {
//         const fetchOrderDetails = async () => {
//             const apiUrl =
//                 ordertype === 'Estimate'
//                     ? 'http://localhost:8080/estimates/estimateparticularprod'
//                     : 'http://localhost:8080/invoices/getinvoiceparticularpr';

//             try {
//                 const requestBody =
//                     ordertype === 'Estimate' ? { estimateId: id } : { invoiceId: id };

//                 const response = await axios.post(apiUrl, requestBody);
//                 setFetchedData(response.data);

//                 // Set email body with conditional balanceamount for invoices
//                 const balanceAmountText =
//                     ordertype === 'Invoice'
//                         ? `Balance Amount: ${response.data.balanceamount || 'N/A'}\n`
//                         : '';

//                 setEmailDetails((prev) => ({
//                     ...prev,
//                     body:  `Id : ${response.data.id || 'Id'},\n` +
//                         `Dear ${response.data.customerdisplayname_id || 'Customer'},\n` +
//                         `${balanceAmountText}` +
//                         `Please find your attached ${ordertype.toLowerCase()} details. Feel free to contact us if you have any questions.\n\n` +
//                         `We look forward to working with you!\n\n` +
//                         `Have a Great Day,\n\nJeetri Electronics and Services`,
//                 }));
//             } catch (error) {
//                 console.error('Error fetching order details:', error);
//                 alert('Failed to fetch order details.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrderDetails();
//     }, [ordertype, id]);

//     // Handle email form changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEmailDetails((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     // Send email with PDF attachment
//     const handleSendEmail = async () => {
//         try {
//             const payload = {
//                 to: emailDetails.to,
//                 subject: emailDetails.subject,
//                 body: emailDetails.body,
//                 invoiceDetails: {
//                     id: fetchedData.id,
//                     customer: fetchedData.customerdisplayname_id,
//                     createddate: fetchedData.createddate,
//                     billTo: fetchedData.billto,
//                     products: fetchedData.products,
//                     estimateProductDetails: fetchedData.estimateProductDetails,
//                     subtotal: fetchedData.subtotal,
//                     salesTax: fetchedData.salestax,
//                     total: fetchedData.total,
//                     balanceamount: fetchedData.balanceamount, // Include balanceamount
//                     notetocustomer: fetchedData.notetocustomer,
//                 },
//             };

//             const response = await axios.post(
//                 'http://localhost:8080/api/email/send',
//                 payload,
//                 { headers: { 'Content-Type': 'application/json' } }
//             );

//             alert(response.data);
//         } catch (error) {
//             console.error('Error sending email:', error);
//             alert('Failed to send email.');
//         }
//     };

//     if (loading) return <div>Loading...</div>;

//     return (
//         <div className="email-page-container">
//             <h2>Send {ordertype} Details via Email</h2>
//             <div className="email-pdf-wrapper">
//                 {/* Email Form */}
//                 <div className="email-form-container">
//                     <form onSubmit={(e) => e.preventDefault()}>
//                         <label>To:</label>
//                         <input
//                             type="email"
//                             name="to"
//                             value={emailDetails.to}
//                             onChange={handleChange}
//                             required
//                         />
//                         <br />
//                         <label>Subject:</label>
//                         <input
//                             type="text"
//                             name="subject"
//                             value={emailDetails.subject}
//                             onChange={handleChange}
//                         />
//                         <br />
//                         <label>Body:</label>
//                         <textarea
//                             name="body"
//                             value={emailDetails.body}
//                             onChange={handleChange}
//                         />
//                         <br />
//                         <button type="button" onClick={handleSendEmail}>
//                             Send Email
//                         </button>
//                     </form>
//                 </div>

//                 {/* PDF Viewer */}
//                 <div className="pdf-preview-container">
//                     <h3>{ordertype} Preview</h3>
//                     <div className="pdf-container">
//                         <PDFViewer style={{ width: '100%', height: '100%' }}>
//                             <PdfDocument data={fetchedData} />
//                         </PDFViewer>
//                     </div>
//                     <PDFDownloadLink
//                         document={<PdfDocument data={fetchedData} />}
//                         fileName={`${ordertype}_${id}.pdf`}
//                     >
//                         {({ blob, url, loading, error }) =>
//                             loading ? 'Generating PDF...' : <button>Download PDF</button>
//                         }
//                     </PDFDownloadLink>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SendEmailPage;












import React, { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from './PdfDocument'; // PDF rendering component
import axios from 'axios';
import './SendEmailPage.css';

const SendEmailPage = () => {
    const location = useLocation();
    const { ordertype, id } = location.state || {};
    const [fetchedData, setFetchedData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Email details
    const [emailDetails, setEmailDetails] = useState({
        to: '',
        subject: `${ordertype} Details Attached`,
        body: '',
    });

    // Fetch order details based on ordertype and id
    useEffect(() => {
        const fetchOrderDetails = async () => {
            const apiUrl =
                ordertype === 'Estimate'
                    ? 'http://localhost:8080/estimates/estimateparticularprod'
                    : 'http://localhost:8080/invoices/getinvoiceparticularpr';

            try {
                const requestBody =
                    ordertype === 'Estimate' ? { estimateId: id } : { invoiceId: id };

                const response = await axios.post(apiUrl, requestBody);
                setFetchedData(response.data);

                // Set email body with conditional balanceamount for invoices
                const balanceAmountText =
    ordertype === 'Invoice'
        ? `Balance Amount: ${response.data.balanceamount || 'N/A'}\n`
        : '';


                setEmailDetails((prev) => ({
                    ...prev,
                    body:  `Id : ${response.data.id || 'Id'},\n` +
                        `Dear ${response.data.customerdisplayname_id || 'Customer'},\n` +
                        `${balanceAmountText}` +
                        `Please find your attached ${ordertype.toLowerCase()} details. Feel free to contact us if you have any questions.\n\n` +
                        `We look forward to working with you!\n\n` +
                        `Have a Great Day,\n\nJeetri Electronics and Services`,
                }));
            } catch (error) {
                console.error('Error fetching order details:', error);
                alert('Failed to fetch order details.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [ordertype, id]);

    // Handle email form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmailDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Send email with PDF attachment
    const handleSendEmail = async () => {
        try {
            const payload = {
                to: emailDetails.to,
                subject: emailDetails.subject,
                body: emailDetails.body,
                invoiceDetails: {
                    id: fetchedData.id,
                    customer: fetchedData.customerdisplayname_id,
                    createddate: fetchedData.createddate,
                    billTo: fetchedData.billto,
                    products: fetchedData.products,
                    estimateProductDetails: fetchedData.estimateProductDetails,
                    invoicewithouttax: fetchedData.invoicewithouttax,
                    estimateWithoutTax:fetchedData.estimateWithoutTax,
                    subtotal: fetchedData.subtotal,
                    salesTax: fetchedData.salestax,
                    total: fetchedData.total,
                    ...(ordertype === "Invoice" && { balanceamount: fetchedData.balanceamount }),
                    notetocustomer: fetchedData.notetocustomer,
                    ordertype: ordertype,  // Ensure ordertype is passed
                },
            };
            

           
           

            const response = await axios.post(
                'http://localhost:8080/api/email/send',
                payload,
                { headers: { 'Content-Type': 'application/json' } }
            );

            alert(response.data);
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email.');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="email-page-container">
            <h2>Send {ordertype} Details via Email</h2>
            <div className="email-pdf-wrapper">
                {/* Email Form */}
                <div className="email-form-container">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <label>To:</label>
                        <input
                            type="email"
                            name="to"
                            value={emailDetails.to}
                            onChange={handleChange}
                            required
                        />
                        <br />
                        <label>Subject:</label>
                        <input
                            type="text"
                            name="subject"
                            value={emailDetails.subject}
                            onChange={handleChange}
                        />
                        <br />
                        <label>Body:</label>
                        <textarea
                            name="body"
                            value={emailDetails.body}
                            onChange={handleChange}
                        />
                        <br />
                        <button type="button" onClick={handleSendEmail}>
                            Send Email
                        </button>
                    </form>
                </div>

                {/* PDF Viewer */}
                <div className="pdf-preview-container">
                    <h3>{ordertype} Preview</h3>
                    <div className="pdf-container">
                        <PDFViewer style={{ width: '100%', height: '100%' }}>
                            <PdfDocument data={fetchedData} />
                        </PDFViewer>
                    </div>
                    <PDFDownloadLink
                        document={<PdfDocument data={fetchedData} />}
                        fileName={`${ordertype}_${id}.pdf`}
                    >
                        {({ blob, url, loading, error }) =>
                            loading ? 'Generating PDF...' : <button>Download PDF</button>
                        }
                    </PDFDownloadLink>
                </div>
            </div>
        </div>
    );
};

export default SendEmailPage;







