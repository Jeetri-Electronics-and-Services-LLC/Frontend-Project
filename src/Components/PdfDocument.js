// import React from 'react';
// import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
// import logo from '../Images/logo.png';

// const styles = StyleSheet.create({
//     page: { padding: 30 },
//     header: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     companyDetails: { fontSize: 10, textAlign: 'right' },
//     title: { fontSize: 18, marginBottom: 10, fontWeight: 'bold' },
//     text: { fontSize: 12, marginBottom: 5 },
//     table: { display: 'flex', flexDirection: 'column', marginTop: 10, width: '100%' },
//     tableHeader: { flexDirection: 'row', borderBottom: '1px solid black', marginBottom: 5 },
//     tableRow: { flexDirection: 'row', borderBottom: '1px solid #ccc', paddingVertical: 5 },
//     tableCellHeader: { flex: 1, fontSize: 12, fontWeight: 'bold', padding: 5 },
//     tableCell: { flex: 1, fontSize: 12, padding: 5 },
//     footer: { marginTop: 20, textAlign: 'right' },
//     footerRow: { flexDirection: 'row', justifyContent: 'flex-end', fontSize: 12, marginBottom: 5 },
//     footerLabel: { width: '50%', textAlign: 'right', paddingRight: 10, fontWeight: 'bold' },
//     footerValue: { width: '50%', textAlign: 'right', paddingRight: 10 },
// });

// const PdfDocument = ({ data }) => {
//     const {
//         id,
//         ordertype,
//         customerdisplayname_id,
//         createddate,
//         billto,
//         subtotal,
//         salestax,
//         total,
//         balanceamount,
//         estimateProductDetails,
//         products,
//         notetocustomer,
//     } = data || {};

//     const productList = estimateProductDetails || products;

//     return (
//         <Document>
//             <Page style={styles.page}>
//                 {/* Header Section */}
//                 <View style={styles.header}>
//                     <Image source={logo} style={{ width: 50, height: 50 }} />
//                     <View style={styles.companyDetails}>
//                         <Text>Jeetri Electronics and Services</Text>
//                         <Text>123 Business St, Tech City</Text>
//                         <Text>Phone: (123) 456-7890</Text>
//                         <Text>Email: info@jeetrielectronics.com</Text>
//                         <Text>Website: www.jeetrielectronics.com</Text>
//                     </View>
//                 </View>

//                 {/* Order Details Section */}
//                 <View>
//                     <Text style={styles.title}>{ordertype} Details</Text>
//                     <Text style={styles.text}>Id: {id}</Text>
//                     <Text style={styles.text}>CustomerName: {customerdisplayname_id}</Text>
//                     <Text style={styles.text}>CreatedDate: {createddate}</Text>
//                     <Text style={styles.text}>Bill To: {billto}</Text>
//                 </View>

//                 {/* Products Table */}
//                 <View style={styles.section}>
//                     <Text style={styles.title}>Products</Text>
//                     <View style={styles.table}>
//                         <View style={styles.tableHeader}>
//                             <Text style={styles.tableCellHeader}>Name</Text>
//                             <Text style={styles.tableCellHeader}>Description</Text>
//                             <Text style={styles.tableCellHeader}>Quantity</Text>
//                             <Text style={styles.tableCellHeader}>Price</Text>
//                             <Text style={styles.tableCellHeader}>Amount</Text>
//                         </View>
//                         {productList && productList.length > 0 ? (
//                             productList.map((product, index) => (
//                                 <View style={styles.tableRow} key={index}>
//                                     <Text style={styles.tableCell}>{product.name}</Text>
//                                     <Text style={styles.tableCell}>{product.description}</Text>
//                                     <Text style={styles.tableCell}>{product.qty}</Text>
//                                     <Text style={styles.tableCell}>{product.salesprice}</Text>
//                                     <Text style={styles.tableCell}>{product.amount}</Text>
//                                 </View>
//                             ))
//                         ) : (
//                             <Text>No Products Available</Text>
//                         )}
//                     </View>
//                 </View>

//                 {/* Subtotal, Sales Tax, and Total Section */}
//                 <View style={styles.footer}>
//                     <View style={styles.footerRow}>
//                         <Text style={styles.footerLabel}>Subtotal:</Text>
//                         <Text style={styles.footerValue}>{subtotal}</Text>
//                     </View>
//                     <View style={styles.footerRow}>
//                         <Text style={styles.footerLabel}>Sales Tax:</Text>
//                         <Text style={styles.footerValue}>{salestax}</Text>
//                     </View>
//                     <View style={styles.footerRow}>
//                         <Text style={styles.footerLabel}>Total:</Text>
//                         <Text style={styles.footerValue}>{total}</Text>
//                     </View>
//                     {balanceamount !== undefined && ( // Conditionally display balanceamount
//                         <View style={styles.footerRow}>
//                             <Text style={styles.footerLabel}>Balance Amount:</Text>
//                             <Text style={styles.footerValue}>{balanceamount}</Text>
//                         </View>
//                     )}
//                     <View style={styles.footerRow}>
//                         <Text style={styles.footerLabel}>Terms And Conditions</Text>
//                         <Text style={styles.footerValue}>{notetocustomer}</Text>
//                     </View>
//                 </View>
//             </Page>
//         </Document>
//     );
// };

// export default PdfDocument;








// import React from 'react';
// import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
// import logo from '../Images/logo.png';

// const styles = StyleSheet.create({
//     page: { padding: 30 },
//     header: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     companyDetails: { fontSize: 10, textAlign: 'right' },
//     title: { fontSize: 18, marginBottom: 10, fontWeight: 'bold' },
//     text: { fontSize: 12, marginBottom: 5 },
//     table: { display: 'flex', flexDirection: 'column', marginTop: 10, width: '100%' },
//     tableHeader: { flexDirection: 'row', borderBottom: '1px solid black', marginBottom: 5 },
//     tableRow: { flexDirection: 'row', borderBottom: '1px solid #ccc', paddingVertical: 5 },
//     tableCellHeader: { flex: 1, fontSize: 12, fontWeight: 'bold', padding: 5 },
//     tableCell: { flex: 1, fontSize: 12, padding: 5 },
//     footer: { marginTop: 20, textAlign: 'right' },
//     footerRow: { flexDirection: 'row', justifyContent: 'flex-end', fontSize: 12, marginBottom: 5 },
//     footerLabel: { width: '50%', textAlign: 'right', paddingRight: 10, fontWeight: 'bold' },
//     footerValue: { width: '50%', textAlign: 'right', paddingRight: 10 },
// });

// const PdfDocument = ({ data }) => {
//     const {
//         id,
//         ordertype,
//         customerdisplayname_id,
//         createddate,
//         billto,
//         subtotal,
//         salestax,
//         total,
//         balanceamount,
//         estimateProductDetails,
//         products,
//         notetocustomer,
//     } = data || {};

//     const productList = estimateProductDetails || products;

//     return (
//         <Document>
//             <Page style={styles.page}>
//                 {/* Header Section */}
//                 <View style={styles.header}>
//                     <Image source={logo} style={{ width: 50, height: 50 }} />
//                     <View style={styles.companyDetails}>
//                         <Text>Jeetri Electronics and Services</Text>
//                         <Text>123 Business St, Tech City</Text>
//                         <Text>Phone: (123) 456-7890</Text>
//                         <Text>Email: info@jeetrielectronics.com</Text>
//                         <Text>Website: www.jeetrielectronics.com</Text>
//                     </View>
//                 </View>

//                 {/* Order Details Section */}
//                 <View>
//                     <Text style={styles.title}>{ordertype} Details</Text>
//                     <Text style={styles.text}>Id: {id}</Text>
//                     <Text style={styles.text}>CustomerName: {customerdisplayname_id}</Text>
//                     <Text style={styles.text}>CreatedDate: {createddate}</Text>
//                     <Text style={styles.text}>Bill To: {billto}</Text>
//                 </View>

//                 {/* Products Table */}
//                 <View style={styles.section}>
//                     <Text style={styles.title}>Products</Text>
//                     <View style={styles.table}>
//                         <View style={styles.tableHeader}>
//                             <Text style={styles.tableCellHeader}>Name</Text>
//                             <Text style={styles.tableCellHeader}>Description</Text>
//                             <Text style={styles.tableCellHeader}>Quantity</Text>
//                             <Text style={styles.tableCellHeader}>Price</Text>
//                             <Text style={styles.tableCellHeader}>Amount</Text>
//                         </View>
//                         {productList && productList.length > 0 ? (
//                             productList.map((product, index) => (
//                                 <View style={styles.tableRow} key={index}>
//                                     <Text style={styles.tableCell}>{product.name}</Text>
//                                     <Text style={styles.tableCell}>{product.description}</Text>
//                                     <Text style={styles.tableCell}>{product.qty}</Text>
//                                     <Text style={styles.tableCell}>{product.salesprice}</Text>
//                                     <Text style={styles.tableCell}>{product.amount}</Text>
//                                 </View>
//                             ))
//                         ) : (
//                             <Text>No Products Available</Text>
//                         )}
//                     </View>
//                 </View>

//                 {/* Subtotal, Sales Tax, and Total Section */}
//                 <View style={styles.footer}>
//                     <View style={styles.footerRow}>
//                         <Text style={styles.footerLabel}>Subtotal:</Text>
//                         <Text style={styles.footerValue}>{subtotal}</Text>
//                     </View>
//                     <View style={styles.footerRow}>
//                         <Text style={styles.footerLabel}>Sales Tax:</Text>
//                         <Text style={styles.footerValue}>{salestax}</Text>
//                     </View>
//                     <View style={styles.footerRow}>
//                         <Text style={styles.footerLabel}>Total:</Text>
//                         <Text style={styles.footerValue}>{total}</Text>
//                     </View>
//                     {ordertype === "Invoice" && (
//         <View style={styles.footerRow}>
//             <Text style={styles.footerLabel}>Balance Amount:</Text>
//             <Text style={styles.footerValue}>{data.balanceamount}</Text>
//         </View>
//     )}
//                     <View style={styles.footerRow}>
//                         <Text style={styles.footerLabel}>Terms And Conditions</Text>
//                         <Text style={styles.footerValue}>{notetocustomer}</Text>
//                     </View>
//                 </View>
//             </Page>
//         </Document>
//     );
// };

// export default PdfDocument;




// import React from 'react';
// import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
// import logo from '../Images/logo.png';

// const styles = StyleSheet.create({
//     page: { padding: 30 },
//     header: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
//     logoSection: { textAlign: 'right', flex: 1, alignItems: 'flex-end' },
//     companyDetails: { fontSize: 10, textAlign: 'right' },
//     title: { fontSize: 18, marginBottom: 10, fontWeight: 'bold' },
//     text: { fontSize: 12, marginBottom: 5 },
//     table: { display: 'flex', flexDirection: 'column', marginTop: 10, width: '100%' },
//     tableHeader: { flexDirection: 'row', borderBottom: '1px solid black', marginBottom: 5 },
//     tableRow: { flexDirection: 'row', borderBottom: '1px solid #ccc', paddingVertical: 5 },
//     tableCellHeader: { flex: 1, fontSize: 12, fontWeight: 'bold', padding: 5 },
//     tableCell: { flex: 1, fontSize: 12, padding: 5 },
//     footer: { marginTop: 40, textAlign: 'center', padding: 30, fontSize: 10, position: 'absolute', bottom: 30, left: 0, right: 0 },
//     footerText: { marginBottom: 5 },
//     footerRow: { flexDirection: 'row', justifyContent: 'flex-end', fontSize: 12, marginBottom: 5 },
//     footerLabel: { width: '50%', textAlign: 'right', paddingRight: 10, fontWeight: 'bold' },
//     footerValue: { fontSize: 12, textAlign: 'right' },
//     foot: { marginTop: 20 },
// });

// const Footer = () => (
//     <View style={styles.footer} fixed>
//         <Text style={styles.footerText}>
//             This email and any attachments are confidential Jeetri Electronics and Services property intended solely for the recipients. If you received this message in error, please notify corporation @978-953-3874 and immediately delete this message from your computer. Any retention, distribution or other use of this email is strictly prohibited.
//         </Text>
//     </View>
// );

// const PdfDocument = ({ data }) => {
//     const {
//         id,
//         ordertype,
//         customerdisplayname_id,
//         createddate,
//         billto,
//         subtotal,
//         salestax,
//         total,
//         balanceamount,
//         estimateProductDetails,
//         products,
//         notetocustomer,
//     } = data || {};

//     const productList = estimateProductDetails || products;

//     return (
//         <Document>
//             <Page style={styles.page}>
//                 {/* Header Section */}
//                 <View style={styles.header}>
//                     <Image source={{ uri: logo }} style={{ width: 50, height: 50, alignItems: 'right' }} />
//                     <View style={styles.companyDetails}>
//                         <Text>Jeetri Electronics and Services</Text>
//                         <Text>123 Business St, Tech City</Text>
//                         <Text>Phone: (123) 456-7890</Text>
//                         <Text>Email: info@jeetrielectronics.com</Text>
//                         <Text>Website: www.jeetrielectronics.com</Text>
//                     </View>
//                 </View>
//                 {/* Order Details Section */}
//                 <View>
//                     <Text style={styles.title}>{ordertype} Details</Text>
//                     <Text style={styles.text}>Id: {id}</Text>
//                     <Text style={styles.text}>CustomerName: {customerdisplayname_id}</Text>
//                     <Text style={styles.text}>CreatedDate: {createddate}</Text>
//                     <Text style={styles.text}>Bill To: {billto}</Text>
//                 </View>
//                 {/* Products Table */}
//                 <View style={styles.section}>
//                     <Text style={styles.title}>Products</Text>
//                     <View style={styles.table}>
//                         <View style={styles.tableHeader}>
//                             <Text style={styles.tableCellHeader}>Name</Text>
//                             <Text style={styles.tableCellHeader}>Description</Text>
//                             <Text style={styles.tableCellHeader}>Quantity</Text>
//                             <Text style={styles.tableCellHeader}>Price</Text>
//                             <Text style={styles.tableCellHeader}>Amount</Text>
//                         </View>
//                         {productList && productList.length > 0 ? (
//                             productList.map((product, index) => (
//                                 <View style={styles.tableRow} key={index}>
//                                     <Text style={styles.tableCell}>{product.name}</Text>
//                                     <Text style={styles.tableCell}>{product.description}</Text>
//                                     <Text style={styles.tableCell}>{product.qty}</Text>
//                                     <Text style={styles.tableCell}>{product.salesprice}</Text>
//                                     <Text style={styles.tableCell}>{product.amount}</Text>
//                                 </View>
//                             ))
//                         ) : (
//                             <Text>No Products Available</Text>
//                         )}
//                     </View>
//                 </View>
//                 {/* Subtotal, Sales Tax, and Total Section */}
//                 <View style={styles.foot}>
//                     <View style={styles.footerRow}>
//                         <Text style={styles.footerLabel}>Subtotal:</Text>
//                         <Text style={styles.footerValue}>{subtotal}</Text>
//                     </View>
//                     <View style={styles.footerRow}>
//                         <Text style={styles.footerLabel}>Sales Tax:</Text>
//                         <Text style={styles.footerValue}>{salestax}</Text>
//                     </View>
//                     <View style={styles.footerRow}>
//                         <Text style={styles.footerLabel}>Total:</Text>
//                         <Text style={styles.footerValue}>{total}</Text>
//                     </View>
//                     {ordertype === "Invoice" && (
//                         <View style={styles.footerRow}>
//                             <Text style={styles.footerLabel}>Balance Amount:</Text>
//                             <Text style={styles.footerValue}>{balanceamount}</Text>
//                         </View>
//                     )}
//                 </View>
//                 <Footer />
//             </Page>
//             <Page style={styles.page}>
//                 <View>
//                     <Text style={styles.title}>Terms And Conditions</Text>
//                     <Text style={styles.text}>{notetocustomer}</Text>
//                 </View>
//                 <Footer />
//             </Page>
//         </Document>
//     );
// };

// export default PdfDocument;





import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../Images/logo.png';

const styles = StyleSheet.create({
    page: { padding: 30 },
    header: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    logoSection: { textAlign: 'right', flex: 1, alignItems: 'flex-end' },
    companyDetails: { fontSize: 10, textAlign: 'right' },
    title: { fontSize: 18, marginBottom: 10, fontWeight: 'bold' },
    text: { fontSize: 12, marginBottom: 5 },
    text1: { fontSize: 14, marginBottom: 5, fontWeight: 'bolder' },
    table: { display: 'flex', flexDirection: 'column', marginTop: 10, width: '100%' },
    tableHeader: { flexDirection: 'row', marginBottom: 5, fontWeight: 'bold', backgroundColor: 'green' },
    tableRow: { flexDirection: 'row', paddingVertical: 5 },
    tableCellHeader: { flex: 1, fontSize: 12, fontWeight: 'bold', padding: 5 },
    tableCell: { flex: 1, fontSize: 12, padding: 5 },
    footer: { marginTop: 40, textAlign: 'center', padding: 30, fontSize: 10, position: 'absolute', bottom: 30, left: 0, right: 0 },
    footerText: { marginBottom: 5 },
    footerRow: { flexDirection: 'row', justifyContent: 'flex-end', fontSize: 12, marginBottom: 5 },
    footerLabel: { width: '50%', textAlign: 'right', paddingRight: 10, },
    footerLabel1: { width: '50%', textAlign: 'right', paddingRight: 10, fontWeight: 'bolder', fontSize: '14' },
    footerValue: { fontSize: 12, textAlign: 'right' },
    foot: { marginTop: 20 },
    line: { borderBottom: '1px solid black', marginBottom: '10' },
});

const Footer = () => (
    <View style={styles.footer} fixed>
        <Text style={styles.footerText}>
            This email and any attachments are confidential Jeetri Electronics and Services property intended solely for the recipients. If you received this message in error, please notify corporation @978-953-3874 and immediately delete this message from your computer. Any retention, distribution or other use of this email is strictly prohibited.
        </Text>
    </View>
);

const PdfDocument = ({ data }) => {
    const {
        id,
        ordertype,
        customerdisplayname_id,
        createddate,
        billto,
        subtotal,
        salestax,
        total,
        balanceamount,
        estimateProductDetails,
        products,
        invoicewithouttax,
        estimateWithoutTax,
        notetocustomer,
    } = data || {};

    const productList = estimateProductDetails || products;
    const productListWithoutTax = invoicewithouttax || estimateWithoutTax;

    return (
        <Document>
            <Page style={styles.page}>
                {/* Header Section */}
                <View style={styles.header}>

                    <View style={styles.companyDetails}>
                        <Text style={styles.text1}>Jeetri Electronics and Services</Text>
                        <Text>123 Business St, Tech City</Text>
                        <Text>Phone: (123) 456-7890</Text>
                        <Text>Email: info@jeetrielectronics.com</Text>
                        <Text>Website: www.jeetrielectronics.com</Text>
                    </View>
                    <Image source={{ uri: logo }} style={{ width: 50, height: 50, alignItems: 'right' }} />
                </View>
                {/* Order Details Section */}
                <View style={styles.header}>
                    <View>
                        {/* <Text style={styles.title}>{ordertype} Details</Text> */}
                        <Text style={styles.title}>{ordertype} </Text>
                        <Text style={styles.text}>CustomerName: {customerdisplayname_id}</Text>

                        <Text style={styles.text}>Bill To: {billto}</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>{ordertype}# {id}</Text>
                        <View style={styles.footerRow}>
                            <Text style={styles.text1}>Date: </Text>
                            <Text style={styles.text}>{createddate}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.line}></View>   
                {/* Products Table */}
                <View style={styles.section}>
                    <Text style={styles.title}>Products</Text>
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableCellHeader}>Name</Text>
                            <Text style={styles.tableCellHeader}>Description</Text>
                            <Text style={styles.tableCellHeader}>Quantity</Text>
                            <Text style={styles.tableCellHeader}>Price</Text>
                            <Text style={styles.tableCellHeader}>Amount</Text>
                        </View>
                        {productList && productList.length > 0 ? (
                            productList.map((product, index) => (
                                <View style={styles.tableRow} key={index}>
                                    <Text style={styles.tableCell}>{product.name}</Text>
                                    <Text style={styles.tableCell}>{product.description}</Text>
                                    <Text style={styles.tableCell}>{product.qty}</Text>
                                    <Text style={styles.tableCell}>{product.salesprice}</Text>
                                    <Text style={styles.tableCell}>{product.amount}</Text>
                                </View>
                            ))
                        ) : (
                            <Text>No Products Available</Text>
                        )}
                        {productListWithoutTax && productListWithoutTax.length > 0 ? (
                            productListWithoutTax.map((withouttax, index) => (
                                <View style={styles.tableRow} key={index}>
                                    <Text style={styles.tableCell}>{withouttax.descriptionwot}</Text>
                                    <Text style={styles.tableCell}>{withouttax.pricewot}</Text>
                                    
                                </View>
                            ))
                        ) : (
                            <Text>No Products Available</Text>
                        )}
                    </View>
                </View>
                {/* Subtotal, Sales Tax, and Total Section */}
                <View style={styles.foot}>
                    <View style={styles.footerRow}>
                        <Text style={styles.footerLabel}>Subtotal:</Text>
                        <Text style={styles.footerValue}>{subtotal}</Text>
                    </View>
                    <View style={styles.footerRow}>
                        <Text style={styles.footerLabel}>Sales Tax:</Text>
                        <Text style={styles.footerValue}>{salestax}</Text>
                    </View>
                    <View style={styles.footerRow}>
                        <Text style={styles.footerLabel}>Total:</Text>
                        <Text style={styles.footerValue}>{total}</Text>
                    </View>
                    {ordertype === "Invoice" && (
                        <View style={styles.footerRow}>
                            <Text style={styles.footerLabel1}>Balance Amount:</Text>
                            <Text style={styles.footerValue}>{balanceamount}</Text>
                        </View>
                    )}
                </View>
                <Footer />
            </Page>
            <Page style={styles.page}>
                <View>
                    <Text style={styles.title}>Terms And Conditions</Text>
                    <Text style={styles.text}>{notetocustomer}</Text>
                </View>
                <Footer />
            </Page>
        </Document>
    );
};

export default PdfDocument;