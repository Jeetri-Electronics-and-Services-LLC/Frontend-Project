// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Header from './Components/Header';
// import Sidebar from './Components/Sidebar';
// import Product from './Components/Product';
// import Service from './Components/Service';
// import CustomerInvoiceList from './Components/CustomerInvoiceList';
// import Dropdowns from './Components/DropdownManager';
// import List from './Components/List';
// import InventoryList from './Components/InventoryList';
// import NonInventoryList from './Components/NonInventoryList';
// import Bundle from './Components/Bundle';
// import Footer from './Components/Footer';
// import ViewHistory from './Components/ViewHistory';
// import AdminUserManagement from './Components/AdminUserManagement';
// import Login from './Components/Login';
// import InvoiceForm from './Components/InvoiceForm';
// import CustomerForm from './Components/CustomerForm';
// import HistoryForm from './Components/HistoryForm';
// import CustomerList from './Components/CustomerList';
// import InvoiceList from './Components/InvoiceList';
// import CompanyList from './Components/CompanyList';
// import CustomerInvoices from './Components/CustomerInvoices';
// import ServicesList from './Components/ServicesList';
// import './App.css';
// import EditCustomer from './Components/EditCustomerForm';
// import EditInvoice from './Components/EditInvoiceForm';
// import EditEstimate from './Components/EditEstimate';
// import EditExpense from './Components/EditExpenseForm';
// import EditReceiptPayment from './Components/EditReceiptPayment'
// import EstimateForm from './Components/EstimateForm';
// import ReceiptForm from './Components/ReceiptForm';

// import InvoicePDFDocument from './Components/InvoicePDFDocument';
// import ExpenseForm from './Components/ExpenseForm';
// import SendEmailPage from './Components/SendEmailPage';
// import PdfDocument from './Components/PdfDocument';
// import NotesForm from './Components/NotesForm';
// import ShowNotesForm from './Components/ShowNotesForm';
// import AddTermsAndConditionsForm from './Components/TermsAndConditions';
// import TermsAndConditionsList from './Components/TermsAndConditionsList';
// import AddRoleWithUser from './Components/AddRoleWithUser';
// import BrandAccessForm from './Components/BrandAccess';
// import CategoryAccessForm from './Components/CategoryAccessForm';
// import UserList from './Components/UsersList';
// import CategoryList from './Components/CategoryList';
// import BrandList from './Components/BrandList';
// import Productlist from './Components/Productlist';
// import Shippinglist from './Components/Shippinglist';
// import Inventoryquantity from './Components/Inventoryquantity';
// import InventoryQuantityHistory from './Components/InventoryQuantityHistory';
// import ShipmentForm from './Components/ShipmentForm';
// import CustomerReports from './Components/CustomerReports';
// import Customerslist from './Components/Customerslist';
// import Estimatelist from './Components/Estimatelist';
// import Invoiceslist from './Components/Invoiceslist';
// import Receiptpaymentlist from './Components/Receiptpaymentslist';
// import Paymentbalance from './Components/Paymentbalance';
// import Paymentbalancelist from './Components/Paymentbalancelist';
// import Showrecieptpaymentslist from './Components/Showrecieptpaymentslist';

// const App = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [permissions, setPermissions] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Fetch stored permissions and authentication status on mount
//   useEffect(() => {
//     const storedPermissions = JSON.parse(localStorage.getItem('permissions')) || [];
//     const userId = localStorage.getItem('user_id');
    
//     if (storedPermissions.length > 0 && userId) {
//       setPermissions(storedPermissions);
//       setIsAuthenticated(true);
//       console.log('User authenticated, permissions:', storedPermissions);
//     } else {
//       console.log('No permissions found or user not authenticated');
//     }
//   }, []);

//   const toggleSidebar = () => {
//     setIsOpen((prev) => !prev);
//   };

//   const hasPermission = (permission) => {
//     const result = permissions.includes(permission);
//     console.log(`Checking permission for ${permission}:`, result);
//     return result;
//   };

//   return (
//     <Router>
//       <div className="app">
//         <Header toggleSidebar={toggleSidebar} isAuthenticated={isAuthenticated} />
//         {isAuthenticated && (
//           <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} permissions={permissions} />
//         )}
        
//         <div className="main-content">
//           <Routes>
//             {/* Authentication and Route Protection */}
//             <Route
//               path="/login"
//               element={<Login setIsAuthenticated={setIsAuthenticated} setPermissions={setPermissions} />}
//             />
//             {!isAuthenticated && <Route path="*" element={<Navigate to="/login" />} />}

//             {/* Authenticated Routes */}
//             {isAuthenticated && hasPermission('product') && <Route path="/product" element={<Product isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('inventoryquantity') && <Route path="/inventoryquantity" element={<Inventoryquantity isOpen={isOpen}/>} />}
//             {isAuthenticated && hasPermission('inventoryquantityhistory') && <Route path="/inventoryquantityhistory" element={<InventoryQuantityHistory isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('service') && <Route path="/service" element={<Service isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('serviceslist') && <Route path="/serviceslist" element={<ServicesList isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('dropdowns') && <Route path="/dropdowns" element={<Dropdowns isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('list') && <Route path="/list" element={<List isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('inventorylist') && <Route path="/inventorylist" element={<InventoryList isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('noninventorylist') && <Route path="/noninventorylist" element={<NonInventoryList isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('bundle') && <Route path="/bundle" element={<Bundle isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('adminusermanagement') && <Route path="/adminusermanagement" element={<AdminUserManagement isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('invoiceform') && <Route path="/invoiceform/:id" element={<InvoiceForm isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('invoiceform') && <Route path="/invoiceform" element={<InvoiceForm isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('historyform') && <Route path="/historyform" element={<HistoryForm isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('customerform') && <Route path="/customerform" element={<CustomerForm isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('termsandconditions') && <Route path="/termsandconditions" element={<AddTermsAndConditionsForm isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('customerlist') && <Route path="/customerlist" element={<CustomerList isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('invoicelist') && <Route path="/invoicelist" element={<InvoiceList isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('companylist') && <Route path="/companylist" element={<CompanyList isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('viewhistory') && <Route path="/viewhistory" element={<ViewHistory isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('customerinvoices') && <Route path="/customerinvoices/:customerdisplayname" element={<CustomerInvoices isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('customerinvoicelist') && <Route path="/customerinvoicelist" element={<CustomerInvoiceList isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('editcustomer') && <Route path="/editcustomer/:customerId" element={<EditCustomer isOpen={isOpen} />} />} 
//             {isAuthenticated && hasPermission('editinvoice') && <Route path="/editinvoice/:invoiceId" element={<EditInvoice isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('editestimate') && <Route path="/editestimate/:estimateId" element={<EditEstimate isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('editexpense') &&<Route path="/editexpense/:id" element={<EditExpense isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('editreceiptpayment') &&<Route path="/editreceiptpayment/:id" element={<EditReceiptPayment isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('addrolewithuser') &&<Route path="/addrolewithuser" element={<AddRoleWithUser isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('estimateform') && <Route path="/estimateform" element={<EstimateForm isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('receiptform') && <Route path="/receiptform" element={<ReceiptForm isOpen={isOpen} />} />}
            
//             {isAuthenticated && hasPermission('userlist') && <Route path="/userlist" element={<UserList isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('brandlist') && <Route path="/brandlist" element={<BrandList isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('productlist') && <Route path="/productlist" element={<Productlist isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('shippinglist') && <Route path="/shippinglist" element={<Shippinglist isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('categorylist') && <Route path="/categorylist" element={<CategoryList isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('expenseform') && <Route path="/expenseform" element={<ExpenseForm isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('shipmentform') && <Route path="/shipmentform/:invoiceId" element={<ShipmentForm isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('sendemailpage') && <Route path="/sendemailpage" element={<SendEmailPage isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('pdfdocument') && <Route path="/pdfdocument" element={<PdfDocument isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('notesform') && <Route path="/notesform" element={<NotesForm isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('categoryaccessform') && <Route path="/categoryaccessform" element={<CategoryAccessForm isOpen={isOpen}/>} />}
//             {isAuthenticated && hasPermission('brandaccessform') && <Route path="/brandaccessform" element={<BrandAccessForm isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('shownotesform') && <Route path="/shownotesform" element={<ShowNotesForm isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('invoicepdfdocument') && <Route path="/invoicepdfdocument" element={<InvoicePDFDocument isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('termsandconditionslist') && <Route path="/termsandconditionslist" element={<TermsAndConditionsList isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('customerreports') && <Route path="/customerreports" element={<CustomerReports isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('customerslist') && <Route path="/customerslist" element={<Customerslist isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('estimatelist') && <Route path="/estimatelist" element={<Estimatelist isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('invoiceslist') && <Route path="/invoiceslist" element={<Invoiceslist isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('receiptpaymentlist') && <Route path="/receiptpaymentlist" element={<Receiptpaymentlist isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('paymentbalance') && <Route path="/paymentbalance" element={<Paymentbalance isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('paymentbalancelist') && <Route path="/paymentbalancelist" element={<Paymentbalancelist isOpen={isOpen} />} />}
//             {isAuthenticated && hasPermission('showrecieptpaymentslist') && <Route path="/showrecieptpaymentslist" element={<Showrecieptpaymentslist isOpen={isOpen} />} />}
            
//             {/* Default Redirect */}
//             {isAuthenticated && <Route path="/" element={<Navigate to="/product" />} />}
//             <Route path="*" element={<Navigate to="/login" />} />
//           </Routes>
//         </div>

//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;






import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Product from './Components/Product';
import Bundle from './Components/Bundle';
import Footer from './Components/Footer';
import AdminUserManagement from './Components/AdminUserManagement';
import Login from './Components/Login';
import InvoiceForm from './Components/InvoiceForm';
import CustomerForm from './Components/CustomerForm';
import CustomerList from './Components/CustomerList';
import InvoiceList from './Components/InvoiceList';
import CompanyList from './Components/CompanyList';
import CustomerInvoices from './Components/CustomerInvoices';
import './App.css';
import EditCustomer from './Components/EditCustomerForm';
import EditInvoice from './Components/EditInvoiceForm';
import EditEstimate from './Components/EditEstimate';
import EditExpense from './Components/EditExpenseForm';
import EditReceiptPayment from './Components/EditReceiptPayment'
import EstimateForm from './Components/EstimateForm';
import ReceiptForm from './Components/ReceiptForm';
import InvoicePDFDocument from './Components/InvoicePDFDocument';
import ExpenseForm from './Components/ExpenseForm';
import SendEmailPage from './Components/SendEmailPage';
import PdfDocument from './Components/PdfDocument';
import NotesForm from './Components/NotesForm';
import ShowNotesForm from './Components/ShowNotesForm';
import AddTermsAndConditionsForm from './Components/TermsAndConditions';
import TermsAndConditionsList from './Components/TermsAndConditionsList';
import AddRoleWithUser from './Components/AddRoleWithUser';
import BrandAccessForm from './Components/BrandAccess';
import CategoryAccessForm from './Components/CategoryAccessForm';
import UserList from './Components/UsersList';
import Edituserlist from './Components/Edituserlist';
import CategoryList from './Components/CategoryList';
import BrandList from './Components/BrandList';
import Productlist from './Components/Productlist';
import Shippinglist from './Components/Shippinglist';
import Inventoryquantity from './Components/Inventoryquantity';
import InventoryQuantityHistory from './Components/InventoryQuantityHistory';
import ShipmentForm from './Components/ShipmentForm';
import Customerslist from './Components/Customerslist';
import Estimatelist from './Components/Estimatelist';
import Invoiceslist from './Components/Invoiceslist';
import Receiptpaymentlist from './Components/Receiptpaymentslist';
import Paymentbalance from './Components/Paymentbalance';
import Paymentbalancelist from './Components/Paymentbalancelist';
import Showrecieptpaymentslist from './Components/Showrecieptpaymentslist';
import Categoriesdd from './Components/Categoriesdd';
import Categorieslist from './Components/Categorieslist';
import Dealer from './Components/Dealer';
import DealerForm from './Components/DealerForm';
import Custservicess from './Components/Custservicess';
import Tenantinvoice from './Components/Tenantinvoice';
import Tenantestimate from './Components/Tenantestimate';
import Tenantpayment from './Components/Tenantepayment';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch stored permissions and authentication status on mount
  useEffect(() => {
    const storedPermissions = JSON.parse(localStorage.getItem('permissions')) || [];
    const userId = localStorage.getItem('userId');
    
    if (storedPermissions.length > 0 && userId) {
      setPermissions(storedPermissions);
      setIsAuthenticated(true);
      console.log('User authenticated, permissions:', storedPermissions);
    } else {
      console.log('No permissions found or user not authenticated');
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const hasPermission = (permission) => {
    const result = permissions.includes(permission);
    console.log(`Checking permission for ${permission}:`, result);
    return result;
  };

  return (
    <Router>
      <div className="app">
        <Header toggleSidebar={toggleSidebar} isAuthenticated={isAuthenticated} />
        {isAuthenticated && (
          <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} permissions={permissions} />
        )}
        
        <div className="main-content">
          <Routes>
            {/* Authentication and Route Protection */}
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} setPermissions={setPermissions} />}
            />
            {!isAuthenticated && <Route path="*" element={<Navigate to="/login" />} />}

            {/* Authenticated Routes */}
            {isAuthenticated && hasPermission('product') && <Route path="/product" element={<Product isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('inventoryquantity') && <Route path="/inventoryquantity" element={<Inventoryquantity isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('inventoryquantityhistory') && <Route path="/inventoryquantityhistory" element={<InventoryQuantityHistory isOpen={isOpen} />} />}
            
            {isAuthenticated && hasPermission('bundle') && <Route path="/bundle" element={<Bundle isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('adminusermanagement') && <Route path="/adminusermanagement" element={<AdminUserManagement isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('invoiceform') && <Route path="/invoiceform/:id" element={<InvoiceForm isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('invoiceform') && <Route path="/invoiceform" element={<InvoiceForm isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('customerform') && <Route path="/customerform" element={<CustomerForm isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('termsandconditions') && <Route path="/termsandconditions" element={<AddTermsAndConditionsForm isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('customerlist') && <Route path="/customerlist" element={<CustomerList isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('invoicelist') && <Route path="/invoicelist" element={<InvoiceList isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('companylist') && <Route path="/companylist" element={<CompanyList isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('customerinvoices') && <Route path="/customerinvoices/:customerdisplayname" element={<CustomerInvoices isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('customerlist') && <Route path="/customerlist" element={<CustomerList isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('editcustomer') && <Route path="/editcustomer/:customerId" element={<EditCustomer isOpen={isOpen} />} />} 
            {isAuthenticated && hasPermission('editinvoice') && <Route path="/editinvoice/:invoiceId" element={<EditInvoice isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('editestimate') && <Route path="/editestimate/:estimateId" element={<EditEstimate isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('editexpense') &&<Route path="/editexpense/:id" element={<EditExpense isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('editreceiptpayment') &&<Route path="/editreceiptpayment/:id" element={<EditReceiptPayment isOpen={isOpen}/>} />}
            {isAuthenticated && hasPermission('addrolewithuser') &&<Route path="/addrolewithuser" element={<AddRoleWithUser isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('estimateform') && <Route path="/estimateform" element={<EstimateForm isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('receiptform') && <Route path="/receiptform" element={<ReceiptForm isOpen={isOpen} />} />}
            
            {isAuthenticated && hasPermission('userlist') && <Route path="/userlist" element={<UserList isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('edituserlist') && <Route path="/edituserlist" element={<Edituserlist isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('brandlist') && <Route path="/brandlist" element={<BrandList isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('productlist') && <Route path="/productlist" element={<Productlist isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('shippinglist') && <Route path="/shippinglist" element={<Shippinglist isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('categorylist') && <Route path="/categorylist" element={<CategoryList isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('expenseform') && <Route path="/expenseform" element={<ExpenseForm isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('shipmentform') && <Route path="/shipmentform/:invoiceId" element={<ShipmentForm isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('sendemailpage') && <Route path="/sendemailpage" element={<SendEmailPage isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('pdfdocument') && <Route path="/pdfdocument" element={<PdfDocument isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('notesform') && <Route path="/notesform" element={<NotesForm isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('categoryaccessform') && <Route path="/categoryaccessform" element={<CategoryAccessForm isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('brandaccessform') && <Route path="/brandaccessform" element={<BrandAccessForm isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('shownotesform') && <Route path="/shownotesform" element={<ShowNotesForm isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('invoicepdfdocument') && <Route path="/invoicepdfdocument" element={<InvoicePDFDocument isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('termsandconditionslist') && <Route path="/termsandconditionslist" element={<TermsAndConditionsList isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('customerslist') && <Route path="/customerslist" element={<Customerslist isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('estimatelist') && <Route path="/estimatelist" element={<Estimatelist isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('invoiceslist') && <Route path="/invoiceslist" element={<Invoiceslist isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('receiptpaymentlist') && <Route path="/receiptpaymentlist" element={<Receiptpaymentlist isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('paymentbalance') && <Route path="/paymentbalance" element={<Paymentbalance isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('categoriesdd') && <Route path="/categoriesdd" element={<Categoriesdd isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('categorieslist') && <Route path="/categorieslist" element={<Categorieslist isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('paymentbalancelist') && <Route path="/paymentbalancelist" element={<Paymentbalancelist isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('showrecieptpaymentslist') && <Route path="/showrecieptpaymentslist" element={<Showrecieptpaymentslist isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('dealer') && <Route path="/dealer" element={<Dealer isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('dealerform') && <Route path="/dealerform" element={<DealerForm isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('custservicess') && <Route path="/custservicess" element={<Custservicess isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('tenantinvoice') && <Route path="/tenantinvoice" element={<Tenantinvoice isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('tenantestimate') && <Route path="/tenantestimate" element={<Tenantestimate isOpen={isOpen} />} />}
            {isAuthenticated && hasPermission('tenantpayment') && <Route path="/tenantpayment" element={<Tenantpayment isOpen={isOpen} />} />}
            
            {/* Default Redirect */}
            {/* {isAuthenticated && <Route path="/" element={<Navigate to="/product" isOpen={isOpen} />} />}
            <Route path="*" element={<Navigate to="/login" />} /> */}
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;

	







