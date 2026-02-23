// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Sidebar.css';


// const Sidebar = ({ isOpen, toggleSidebar, permissions }) => {
//   const [customerReportsOpen, setCustomerReportsOpen] = useState(false);
//   const [adminOpen, setAdminOpen] = useState(false);
//   const hasPermission = (permission) => {
//     return permissions && permissions.includes(permission);
//   };

//   return (
//     <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
//       {/* <button className="close-btn" onClick={toggleSidebar}>✖</button> */}
//       <nav className="sidebar-nav">

//         <div className="dropdown">
//           {/* Toggle dropdown visibility when clicked */}
//           <button
//             className="dropdown-btn"
//             onClick={() => setAdminOpen(!adminOpen)}
//           >
//             Admin {adminOpen ? "▲" : "▼"}
//           </button>

//           {adminOpen && (
//             <div className="dropdown-content">
//               {/* {hasPermission('customerinvoices') && <Link to="/customerinvoices">CustomerList</Link>} */}
//               {hasPermission('customerform') && <Link to="/customerform">CustomerPage</Link>}
//               {hasPermission('termsandconditions') && <Link to="/termsandconditions">TermsAndConditions</Link>}
//               {hasPermission('termsandconditionslist') && <Link to="/termsandconditionslist">TermsAndConditionsList</Link>}
//               {hasPermission('customerlist') && <Link to="/customerlist">CustomerList</Link>}
//               {hasPermission('invoiceform') && <Link to="/invoiceform">InvoicePage</Link>}
//               {hasPermission('viewhistory') && <Link to="/viewhistory">ViewHistory</Link>}
//               {hasPermission('historyform') && <Link to="/historyform">HistoryForm</Link>}
//               {hasPermission('invoicelist') && <Link to="/invoicelist">InvoiceList</Link>}
//               {hasPermission('brandaccessform') && <Link to="/brandaccessform">BrandAccessForm</Link>}
//               {hasPermission('categoryaccessform') && <Link to="/categoryaccessform">CategoryAccessForm</Link>}
//               {hasPermission('product') && <Link to="/product">ProductForm</Link>}
//               {hasPermission('inventoryquantity') && <Link to="/inventoryquantity">Inventoryquantity</Link>}
//               {hasPermission('inventoryquantityhistory') && <Link to="/inventoryquantityhistory">InventoryQuantityHistory</Link>}
//               {hasPermission('inventorylist') && <Link to="/inventorylist">Inventory List</Link>}
//               {hasPermission('noninventorylist') && <Link to="/noninventorylist">Non-Inventory List</Link>}
//               {hasPermission('list') && <Link to="/list">List</Link>}
//               {hasPermission('service') && <Link to="/service">Service</Link>}
//               {hasPermission('serviceslist') && <Link to="/serviceslist">ServicesList</Link>}
//               {hasPermission('customerinvoicelist') && <Link to="/customerinvoicelist">CustomerInvoiceList</Link>}
//               {hasPermission('bundle') && <Link to="/bundle">Bundle</Link>}
//               {hasPermission('dropdowns') && <Link to="/dropdowns">Dropdown Manager</Link>}
//               {hasPermission('adminusermanagement') && <Link to="/adminusermanagement">AdminUserManagement</Link>}
//               {hasPermission('companylist') && <Link to="/companylist">CompanyList</Link>}
//               {hasPermission('customerinvoices') && <Link to="/customerinvoices">CustomerInvoices</Link>}
//               {hasPermission('estimateform') && <Link to="/estimateform">EstimateForm</Link>}
//               {hasPermission('receiptform') && <Link to="/receiptform">ReceiptForm</Link>}
//               {hasPermission('shipmentform') && <Link to="/shipmentform">ShipmentForm</Link>}
//               {hasPermission('userlist') && <Link to="/userlist">UserList</Link>}
//               {hasPermission('brandlist') && <Link to="/brandlist">BrandList</Link>}
//               {hasPermission('productlist') && <Link to="/productlist">Productlist</Link>}
//               {hasPermission('shippinglist') && <Link to="/shippinglist">Shippinglist</Link>}
//               {hasPermission('categorylist') && <Link to="/categorylist">CategoryList</Link>}
//               {hasPermission('emailform') && <Link to="/emailform">EmailForm</Link>}
//               {hasPermission('invoicepdfdocument') && <Link to="/invoicepdfdocument">InvoicePDFDocument</Link>}
//               {hasPermission('addrolewithuser') && <Link to="/addrolewithuser">AddRoleWithUser</Link>}
//               {/* {hasPermission('showrecieptpaymentlist') && <Link to="/showrecieptpaymentlist">ShowrecieptpaymentList</Link>} */}
//             </div>
//           )}
//         </div>


//         {/* {hasPermission('customerreports') && <Link to="/customerreports">CustomerReports</Link>} */}
//         {hasPermission('customerreports') && (
//           <div className="dropdown">
//             {/* Toggle dropdown visibility when clicked */}
//             <button
//               className="dropdown-btn"
//               onClick={() => setCustomerReportsOpen(!customerReportsOpen)}
//             >
//               CustomerReports {customerReportsOpen ? "▲" : "▼"}
//             </button>

//             {customerReportsOpen && (
//               <div className="dropdown-content">
//                 {/* {hasPermission('customerinvoices') && <Link to="/customerinvoices">CustomerList</Link>} */}
//                 {hasPermission('customerslist') && <Link to="/customerslist">CustomersList</Link>}
//                 {hasPermission('estimatelist') && <Link to="/estimatelist">EstimateList</Link>}
//                 {hasPermission('invoiceslist') && <Link to="/invoiceslist">InvoicesList</Link>}
//                 {hasPermission('receiptpaymentlist') && <Link to="/receiptpaymentlist">ReceiptPaymentList</Link>}
//                 {hasPermission('paymentbalancelist') && <Link to="/paymentbalancelist">PaymentBalanceList</Link>}
//                 {/* {hasPermission('showrecieptpaymentlist') && <Link to="/showrecieptpaymentlist">ShowrecieptpaymentList</Link>} */}
//               </div>
//             )}
//           </div>
//         )}

//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';


const Sidebar = ({ isOpen, toggleSidebar, permissions }) => {
  const [customerReportsOpen, setCustomerReportsOpen] = useState(false);
  const [adminreportingOpen, setAdminreportingOpen] = useState(false);
  const [administrationOpen, setAdministrationOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);
  const [dealerOpen, setdealerOpen] = useState(false);
  const hasPermission = (permission) => {
    return permissions && permissions.includes(permission);
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav className="sidebar-nav">
        
    
        {hasPermission('customer') && (
          <div className="dropdown">
            {/* Toggle dropdown visibility when clicked */}
            <button 
              className="dropdown-btn" 
              onClick={() => setCustomerOpen(!customerOpen)}
            >
             Customer Activities {customerOpen ? "▲" : "▼"}
            </button>
            
            {customerOpen && (
              <div className="dropdown-content">
                
          
                {hasPermission('customerform') && <Link to="/customerform">Create Customer</Link>}
                
                {hasPermission('customerlist') && <Link to="/customerlist">CustomerList</Link>}
                {hasPermission('shippinglist') && <Link to="/shippinglist">Shippinglist</Link>}
              </div>
            )}
          </div>
        )}

{hasPermission('adminreporting') && (
          <div className="dropdown">
            {/* Toggle dropdown visibility when clicked */}
            <button 
              className="dropdown-btn" 
              onClick={() => setAdminreportingOpen(!adminreportingOpen)}
            >
             Admin Reporting {adminreportingOpen ? "▲" : "▼"}
            </button>
            
            {adminreportingOpen && (
              <div className="dropdown-content">
                { hasPermission('customerslist') && <Link to="/customerslist">CustomersList</Link>}
                {hasPermission('brandlist') && <Link to="/brandlist">BrandList</Link>}
                {hasPermission('userlist') && <Link to="/userlist">UserList</Link>}
                {/* {hasPermission('categorylist') && <Link to="/categorylist">CategoryList</Link>} */}
                {hasPermission('categorieslist') && <Link to="/categorieslist">CategorieslistForm</Link>}
              </div>
            )}
          </div>
        )}


        {hasPermission('administration') && (
          <div className="dropdown">
            {/* Toggle dropdown visibility when clicked */}
            <button 
              className="dropdown-btn" 
              onClick={() => setAdministrationOpen(!administrationOpen)}
            >
              Administration {administrationOpen ? "▲" : "▼"}
            </button>
            
            {administrationOpen && (
              <div className="dropdown-content">
                
                {hasPermission('product') && <Link to="/product">ProductForm</Link>}
                {hasPermission('categoryaccessform') && <Link to="/categoryaccessform">CategoryAccessForm</Link>}
                {hasPermission('customerlist') && <Link to="/customerlist">CustomerList</Link>}
                {hasPermission('bundle') && <Link to="/bundle">Bundle</Link>}
                {hasPermission('categoriesdd') && <Link to="/categoriesdd">Create Categories</Link>}
                {hasPermission('brandaccessform') && <Link to="/brandaccessform">BrandAccessForm</Link>}
                {hasPermission('productlist') && <Link to="/productlist">Productlist</Link>}
                {hasPermission('companylist') && <Link to="/companylist">CompanyList</Link>}
                {/* {hasPermission('inventoryquantity') && <Link to="/inventoryquantity">Inventoryquantity</Link>} */}
                {hasPermission('inventoryquantityhistory') && <Link to="/inventoryquantityhistory">InventoryQuantityHistory</Link>}
                {hasPermission('addrolewithuser') && <Link to="/addrolewithuser">Add Role To User</Link>}
                {hasPermission('userlist') && <Link to="/userlist">UserList</Link>} 
                {hasPermission('adminusermanagement') && <Link to="/adminusermanagement">AdminUserManagement</Link>}
                {hasPermission('termsandconditions') && <Link to="/termsandconditions">TermsAndConditions</Link>}
                {hasPermission('termsandconditionslist') && <Link to="/termsandconditionslist">TermsAndConditionsList</Link>}
                {hasPermission('custservicess') && <Link to="/custservicess">Custservicess</Link>}
                {hasPermission('tenantinvoice') && <Link to="/tenantinvoice">Tenantinvoice</Link>}
                {hasPermission('tenantestimate') && <Link to="/tenantestimate">Tenantestimate</Link>}
                {hasPermission('tenantpayment') && <Link to="/tenantpayment">Tenantpayment</Link>}
              </div>
            )}
          </div>
        )}


        {hasPermission('customerreports') && (
          <div className="dropdown">
            {/* Toggle dropdown visibility when clicked */}
            <button 
              className="dropdown-btn" 
              onClick={() => setCustomerReportsOpen(!customerReportsOpen)}
            >
              CustomerReports {customerReportsOpen ? "▲" : "▼"}
            </button>
            
            {customerReportsOpen && (
              <div className="dropdown-content">
                {/* {hasPermission('customerinvoices') && <Link to="/customerinvoices">CustomerList</Link>} */}
                { hasPermission('customerslist') && <Link to="/customerslist">CustomersList</Link>}
                {hasPermission('estimatelist') && <Link to="/estimatelist">EstimateList</Link>}
                {hasPermission('invoiceslist') && <Link to="/invoiceslist">InvoicesList</Link>}
                {hasPermission('receiptpaymentlist') && <Link to="/receiptpaymentlist">ReceiptPaymentList</Link>}
                {hasPermission('paymentbalancelist') && <Link to="/paymentbalancelist">PaymentBalanceList</Link>}
                {hasPermission('userlist') && <Link to="/userlist">UserList</Link>}
                
              </div>
            )}
          </div>
        )}

{hasPermission('dealer') && (
          <div className="dropdown">
            {/* Toggle dropdown visibility when clicked */}
            <button 
              className="dropdown-btn" 
              onClick={() => setdealerOpen(!dealerOpen)}
            >
              Dealer {dealerOpen ? "▲" : "▼"}
            </button>
            
            {dealerOpen && (
              <div className="dropdown-content">
                
                {hasPermission('dealer') && <Link to="/dealer">Dealer Customer List</Link>}
                {hasPermission('dealerform') && <Link to="/dealerform">Dealer Order Form</Link>}
              </div>
            )}
          </div>
        )}
      
    
      </nav>
    </aside >
  );
};

export default Sidebar;



