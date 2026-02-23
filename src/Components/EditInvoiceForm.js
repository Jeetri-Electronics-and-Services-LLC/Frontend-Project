
// import React, { useState, useEffect, useCallback } from 'react';

// import { useNavigate } from 'react-router-dom';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import InvoicePDFDocument from './InvoicePDFDocument';

// import { useLocation } from 'react-router-dom';

// import axios from 'axios';
// import './InvoiceForm.css';

// const InvoiceForm = () => {
//       const locations = useLocation();
//       const customerData = locations.state || {};
//       console.log("Received customer data in InvoiceForm:", customerData);
//       const ordertype = customerData.ordertype || 'Invoice';

//       // Retrieve passed customer data

//       const [invoice, setInvoice] = useState({
//             customerdisplayname_id: '',
//             email: '',
//             billto: '',
//             shipto: '',
//             status_id: '',
//             franchiseowner_id: '',
//             createddate: new Date().toISOString().split('T')[0], // Set today's date as default
//             city_id: '',
//             state_id: '',
//             terms_id: '',
//             taxrates_id: '',

            
//             ordertype: '', // New field added
//             deposit: '',
//             subtotal: '0.00',
//             discount: '',
//             discountMode: true, // true for percentage, false for fixed amount
//             taxablesubtotal: '',
//             salestax: '',
//             total: '',
//             balanceamount: '',
//             cc: '',
//             bcc: '',
//             shipvia: '',
//             shippingdate: '',
//             trackingno: '',
//             invoicedate: '',
//             duedate: '',
//             processedon: '',
//             paycheckto: '',
//             termsandconditions: '',
//             notetocustomer: '',
//             internalcustomernotes: '',
//             memoonstatement: '',
//             customRate: '', // New field for custom rate
//       });

//       const [orderTypes, setOrderTypes] = useState([]); // New state for order types

//       const navigate = useNavigate();

//       const handleNavigateToSendEmail = () => {
//             navigate('/sendemailpage', { state: { ordertype: invoice.ordertype, id: invoice.id } });
//         };

//       useEffect(() => {
//             fetchOrderTypes();
//       }, []);

//       const fetchOrderTypes = async () => {
//             try {
//                   const orderTypesResponse = await axios.post('http://localhost:8080/ordertype/ordertypelist');
//                   setOrderTypes(orderTypesResponse.data);
//             } catch (error) {
//                   console.error('Error fetching order types:', error);
//             }
//       };

//       const [productDetails, setProductDetails] = useState([
//             {
//                   productid: '',
//                   name: '',
//                   description: '',
//                   qty: 1,
//                   salesprice: '0.00',
//                   amount: '0.00',
//                   salestaxes_id: localStorage.getItem('salestaxes_id'),
//                   salestaxes_checked: true,
//                   isBundle: false // Default as false for standalone products
//             }
//       ]);



//       const [products, setProducts] = useState([]);
//       const [filteredProducts, setFilteredProducts] = useState([]);
//       const [activeSearchIndex, setActiveSearchIndex] = useState(null);

//       const [terms, setTerms] = useState([]);
//       const [status, setStatus] = useState([]);
//       const [franchiseOwners, setFranchiseOwners] = useState([]);
//       const [location, setLocation] = useState([]);
//       const [taxRates, setTaxRates] = useState([]);
//       const [customer, setCustomer] = useState([]);
//       const [locationData, setLocations] = useState([]);
//       const [cities, setCities] = useState([]);
//       const [states, setStates] = useState([]);
//       const [invoiceWithoutTax, setInvoiceWithoutTax] = useState([]);
//       const [showInvoiceWithoutTax, setShowInvoiceWithoutTax] = useState(false);

//       const username = localStorage.getItem('username') || 'default';

//       useEffect(() => {
//             if (customerData) {
//                 setInvoice((prev) => ({
//                     ...prev,
//                     ...customerData,
//                 }));
        
//                 if (customerData.products && customerData.products.length > 0) {
//                     const mappedProducts = customerData.products.map((product) => ({
//                         productid: product.productid,  // Ensure productid is correctly assigned
//                         name: product.name,
//                         description: product.description,
//                         qty: parseInt(product.qty, 10) || 1,
//                         salesprice: parseFloat(product.salesprice).toFixed(2),
//                         amount: parseFloat(product.amount).toFixed(2),
//                         salestaxes_id: product.salestaxes_id,
//                         salestaxes_checked: product.salestaxes_id !== "0",
//                         isBundle: false,
//                     }));
//                     setProductDetails(mappedProducts);
//                 }
        
//                 if (customerData.invoicewithouttax && customerData.invoicewithouttax.length > 0) {
//                     setInvoiceWithoutTax(customerData.invoicewithouttax);
//                 }
//             }
//         }, [customerData]);
        
        



//       useEffect(() => {
//             fetchProducts();
//             fetchDropdownData();

//             fetchFranchiseOwners();
//       }, []);


//       useEffect(() => {
//             // Calculate subtotal, excluding bundle headers
//             const subtotal = productDetails
//                   .filter((product) => !product.isBundle) // Exclude bundle headers
//                   .reduce((acc, product) => acc + parseFloat(product.amount || 0), 0);

//             // Update subtotal in the invoice state
//             setInvoice((prev) => ({ ...prev, subtotal: subtotal.toFixed(2) }));
//       }, [productDetails]); // Run this whenever productDetails changes

//       // Add this useEffect in your component
//       useEffect(() => {
//             // Calculate taxable subtotal by excluding bundle headers and unchecked products
//             const filteredProducts = productDetails
//                   .filter((product) => !product.isBundle && product.salestaxes_checked); // Exclude bundle headers and unchecked products

//             // Sum the amounts of the filtered products
//             const subtotal = filteredProducts.reduce((acc, product) => acc + parseFloat(product.amount || 0), 0);

//             // Calculate discount
//             const discountValue = parseFloat(invoice.discount) || 0;
//             const discountAmount = invoice.discountMode
//                   ? (subtotal * (discountValue / 100)).toFixed(2) // Percentage discount
//                   : discountValue.toFixed(2); // Fixed amount discount

//             // Calculate taxable subtotal
//             const taxableSubtotal = (subtotal - discountAmount).toFixed(2);

//             // Update taxable subtotal in the invoice state
//             setInvoice((prev) => ({ ...prev, taxablesubtotal: taxableSubtotal }));
//       }, [productDetails, invoice.discount, invoice.discountMode]); // Dependencies to re-trigger calculation



//       const fetchProducts = async () => {
//             try {
//                   const productResponse = await axios.post('http://localhost:8080/productbundle/productbundlenameslist');
//                   setProducts(productResponse.data);
//                   setFilteredProducts(productResponse.data);
//             } catch (error) {
//                   console.error('Error fetching products:', error);
//             }
//       };

//       const fetchDropdownData = async () => {
//             try {
//                   const customerResponse = await axios.post('http://localhost:8080/customers/displaynames');
//                   setCustomer(customerResponse.data.map((name, index) => ({ id: index + 1, customerdisplayname: name })));

//                   const locationResponse = await axios.post('http://localhost:8080/locations/getalllocations');
//                   setLocation(locationResponse.data);

//                   const taxRatesResponse = await axios.post('http://localhost:8080/taxratess/getalltaxratess');
//                   const processedTaxRates = taxRatesResponse.data.map(rate => ({
//                         ...rate,
//                         percentage: rate.percentage ? parseFloat(rate.percentage.replace('%', '')) : 0
//                   }));
//                   setTaxRates(processedTaxRates);

//                   const termsResponse = await axios.post('http://localhost:8080/terms/getallterms');
//                   setTerms(termsResponse.data);

//                   const statusResponse = await axios.post('http://localhost:8080/invoicestatus/invoicestatusgetAll');
//                   setStatus(statusResponse.data);

//                   const response = await axios.post('http://localhost:8080/franchiseowners/getallfranchise');
//                   setFranchiseOwners(response.data);

//                   const cityResponse = await axios.post('http://localhost:8080/cities/getallcity');
//                   setCities(cityResponse.data);

//                   const stateResponse = await axios.post('http://localhost:8080/states/getallstates');
//                   setStates(stateResponse.data);
//             } catch (error) {
//                   console.error('Error fetching dropdown data:', error);
//             }
//       };
//       const fetchFranchiseOwners = async () => {
//             try {
//                   const response = await axios.post('http://localhost:8080/franchiseowners/getallfranchise');
//                   setFranchiseOwners(response.data); // Assumes response data is an array of franchise owners
//             } catch (error) {
//                   console.error('Error fetching franchise owners:', error);
//             }
//       };

//       useEffect(() => {
//             const fetchDefaultSalesTax = async () => {
//                   const defaultSalesTaxRate = await fetchSalesTaxId();
//                   setInvoice((prev) => ({ ...prev, salestaxes_id: defaultSalesTaxRate }));
//                   localStorage.setItem('salestaxes_id', defaultSalesTaxRate);
//                   updateCalculations();
//             };

//             fetchDefaultSalesTax();
//       }, []);


//       const fetchSalesTaxId = async (city = "", state = "") => {
//             try {
//                 if (!city || !state) return 0; // Ensure city and state are selected
        
//                 const response = await axios.post('http://localhost:8080/salestaxes/findsalestax', {
//                     city,
//                     state,
//                 });
        
//                 console.log("Fetched Sales Tax Response:", response.data); // Debugging log
        
//                 const salesTaxPercentage = parseFloat(response.data.replace('%', ''));
//                 return salesTaxPercentage / 100; // Convert to decimal format
//             } catch (error) {
//                 console.error('Error fetching sales tax:', error);
//                 return 0;
//             }
//         };
        



//       const handleCityOrStateChange = async (e) => {
//             const { name, value } = e.target;
//             setInvoice((prev) => ({ ...prev, [name]: value }));

//             // Check if both city and state are selected
//             const selectedCity = name === 'city_id' ? value : invoice.city_id;
//             const selectedState = name === 'state_id' ? value : invoice.state_id;

//             // Fetch sales tax rate based on selected city and state, or get default value
//             const salesTaxRate = await fetchSalesTaxId(selectedCity, selectedState);

//             // Store in local storage and update invoice state
//             localStorage.setItem('salestaxes_id', salesTaxRate);
//             setInvoice((prev) => ({ ...prev, salestaxes_id: salesTaxRate }));

//             // Trigger recalculation of sales tax based on new rate
//             updateCalculations();
//       };






//       const [isSalesTaxChecked, setIsSalesTaxChecked] = useState(false);
//       const salesTaxId = localStorage.getItem('salestaxes_id');

//       const handleSalesTaxCheckbox = (index) => {
//             setProductDetails((prevDetails) =>
//                   prevDetails.map((product, i) =>
//                         i === index
//                               ? { ...product, isSalesTaxChecked: !product.isSalesTaxChecked }
//                               : product
//                   )
//             );
//       };

//       // const handleCheckboxChange = (index) => {
//       //       setProductDetails((prevDetails) => {
//       //           const updatedDetails = [...prevDetails];
//       //           updatedDetails[index].salestaxes_checked = !updatedDetails[index].salestaxes_checked;
//       //           return updatedDetails;
//       //       });
//       //   };


//       const handleCheckboxChange = (index) => {
//             setProductDetails((prevDetails) => {
//                 return prevDetails.map((product, i) => 
//                     i === index 
//                         ? { ...product, salestaxes_checked: !product.salestaxes_checked } 
//                         : product
//                 );
//             });
//         };
        







//       const handleCustomerChange = async (e) => {
//             const selectedName = e.target.value;
//             setInvoice((prev) => ({ ...prev, customerdisplayname_id: selectedName }));

//             if (selectedName) {
//                   try {
//                         const response = await axios.get(`http://localhost:8080/customers/customers/displayname/${selectedName}`);
//                         const customerData = response.data;

//                         setInvoice((prev) => ({
//                               ...prev,
//                               email: customerData.emailid,
//                               billto: customerData.billingaddress,
//                               shipto: customerData.shippingaddress

//                         }));
//                   } catch (error) {
//                         console.error('Error fetching customer details:', error);
//                   }
//             }
//       };

//       // Function to handle changes in input fields and dropdowns
//       // Function to handle changes in input fields and dropdowns
//       const handleChange = (e) => {
//             const { name, value } = e.target;
//             setInvoice((prev) => ({
//                   ...prev,
//                   [name]: value,
//                   ...(name === 'taxrates_id' && value === 'custom rates' ? { customRate: '' } : {}),
//             }));

//             // Trigger calculation whenever tax rate, discount, or deposit changes
//             if (name === 'taxrates_id' || name === 'discount' || name === 'deposit' || name === 'customRate') {
//                   updateCalculations();
//             }
//       };


//       const handleProductChange = (e, index) => {
//             const { name, value } = e.target;
//             const updatedProductDetails = [...productDetails];

//             // Update the field that was changed (either qty or salesprice)
//             updatedProductDetails[index][name] = value;

//             // Recalculate the amount as qty * salesprice
//             const qty = parseFloat(updatedProductDetails[index].qty) || 0;
//             const salesprice = parseFloat(updatedProductDetails[index].salesprice) || 0;
//             const amount = (qty * salesprice).toFixed(2);
//             updatedProductDetails[index].amount = amount;

//             setProductDetails(updatedProductDetails);
//             updateCalculations(); // Recalculate totals if needed
//       };




//       const fetchProductOrBundleDetails = async (productName, index) => {
//             try {
//                   const response = await axios.post('http://localhost:8080/productbundle/displaydetailsbasedonname', { 
//                       bundleproductName: productName 
//                   });
//                   const productData = response.data;
                  
//                   setProductDetails((prevDetails) => {
//                       const updatedDetails = [...prevDetails];



//                   // Determine the cost field based on username
//                   let costField = '';
//                   switch (username.toLowerCase().replace(/\s+/g, '')) {
//                         case 'directdealer':
//                               costField = 'directdealerprice';
//                               break;
//                         case 'promotionaldealer':
//                               costField = 'promotionaldealerprice';
//                               break;
//                         case 'indirectdealer':
//                               costField = 'indirectdealerprice';
//                               break;
//                         case 'promotionalindirectdealer':
//                               costField = 'promotionalindirectdelarprice';
//                               break;
//                         case 'distributor':
//                               costField = 'distributorprice';
//                               break;
//                         case 'promotionaldistributor':
//                               costField = 'promotionaldistributorprice';
//                               break;
//                         default:
//                               costField = 'salesprice';
//                               break;
//                   }



//                   if (productData.products) {
//                         // Handling product bundle
//                         const bundlePrice = productData.products.reduce(
//                             (total, bundleProduct) => total + parseFloat(bundleProduct.productSalesprice || 0), 0
//                         );
        
//                         updatedDetails[index] = {
//                             productid: productData.bundleId,
//                             name: productData.bundleName,
//                             description: productData.bundleDescription || '',
//                             salesprice: bundlePrice.toFixed(2),
//                             amount: bundlePrice.toFixed(2),
//                             isBundle: true,
//                             bundleId: `bundle-${index}`,
//                             salestaxes_checked: false,
//                             salestaxes_id: 0,
//                         };
        
//                         // Add bundle items
//                         productData.products.forEach((bundleProduct) => {
//                             updatedDetails.push({
//                                 productid: bundleProduct.productId,
//                                 name: bundleProduct.productName,
//                                 description: bundleProduct.productDescription,
//                                 qty: 1,
//                                 salesprice: bundleProduct.productSalesprice,
//                                 amount: bundleProduct.productSalesprice,
//                                 salestaxes_id: localStorage.getItem('salestaxes_id'),
//                                 salestaxes_checked: true,
//                                 isBundle: false,
//                                 bundleId: `bundle-${index}`,
//                             });
//                         });
        
//                     } else {
//                         // Handling standalone product
//                         updatedDetails[index] = {
//                             productid: productData.id, 
//                             name: productData.name || productName,
//                             description: productData.description || '',
//                             salesprice: productData.salesprice || '0.00',
//                             amount: (1 * parseFloat(productData.salesprice || 0)).toFixed(2),
//                             isBundle: false,
//                             salestaxes_id: productData.salestaxes_id || localStorage.getItem('salestaxes_id') || 0,
//                             salestaxes_checked: productData.salestaxes_id !== "0",
//                         };
//                     }
//                     return updatedDetails;
//                 });
//             } catch (error) {
//                 console.error('Error fetching product or bundle details:', error);
//             }
//         };

//       // const handleAddProductRow = () => {
//       //   setProductDetails([...productDetails, { name: '', description: '', qty: '', salesprice: '', amount: '0.00', salestaxes_id:'' }]);
//       // };


//       const handleAddProductRow = async (isBundle = false) => {
//             let salesTaxId = localStorage.getItem('salestaxes_id');
        
//             if (!salesTaxId && invoice.city_id && invoice.state_id) {
//                 salesTaxId = await fetchSalesTaxId(invoice.city_id, invoice.state_id);
//                 localStorage.setItem('salestaxes_id', salesTaxId);
//             }
        
//             setProductDetails((prevDetails) => [
//                 ...prevDetails,
//                 {
//                     productid: '',
//                     name: '',
//                     description: '',
//                     qty: 1,
//                     salesprice: '0.00',
//                     amount: '0.00',
//                     salestaxes_id: isBundle ? 0 : salesTaxId,
//                     salestaxes_checked: true
//                 }
//             ]);
//         };


//       const handleDeleteProduct = (index) => {
//             const updatedProducts = [...productDetails];
//             const productToDelete = updatedProducts[index];

//             // Check if this product is part of a bundle by looking at bundleId
//             if (productToDelete.bundleId) {
//                   // Locate the bundle heading (parent) by bundleId
//                   const bundleIndex = updatedProducts.findIndex(
//                         (product) => product.isBundle && product.bundleId === productToDelete.bundleId
//                   );

//                   if (bundleIndex !== -1) {
//                         // Get the bundle heading product
//                         const bundleProduct = updatedProducts[bundleIndex];

//                         // Subtract the deleted product's price from the bundle's total price
//                         const newBundlePrice = parseFloat(bundleProduct.salesprice) - parseFloat(productToDelete.salesprice);

//                         // Update the bundle price and recalculate the amount
//                         const qty = parseFloat(bundleProduct.qty) || 1; // Assuming quantity is at least 1
//                         const updatedAmount = (qty * newBundlePrice).toFixed(2);

//                         updatedProducts[bundleIndex] = {
//                               ...bundleProduct,
//                               salesprice: newBundlePrice.toFixed(2),
//                               amount: updatedAmount, // amount = qty * updated bundle price
//                         };
//                   }
//             }

//             // Remove the product from the list
//             updatedProducts.splice(index, 1);

//             setProductDetails(updatedProducts);
//             updateCalculations(); // Recalculate the invoice totals after deletion
//       };


//       const handleAddInvoiceWithoutTaxRow = () => {
//             setInvoiceWithoutTax((prev) => [
//               ...prev,
//               { descriptionwot: '', pricewot: '0.00' },
//             ]);
//           };
          
//           const handleInvoiceWithoutTaxChange = (index, field, value) => {
//             setInvoiceWithoutTax((prev) => {
//                 const updatedRows = [...prev];
//                 updatedRows[index] = {
//                     ...updatedRows[index],
//                     [field]: value
//                 };
//                 return updatedRows;
//             });
        
//             if (field === 'pricewot') {
//                 const pricewotSum = invoiceWithoutTax.reduce(
//                     (acc, row) => acc + parseFloat(row.pricewot || 0), 0
//                 );
//                 setInvoice((prev) => ({
//                     ...prev,
//                     taxablesubtotal: (parseFloat(prev.taxablesubtotal || 0) + pricewotSum).toFixed(2)
//                 }));
//             }
//         };


//       const updateCalculations = useCallback(() => {
//             // Calculate subtotal excluding bundle headers
//             const subtotal = productDetails
//                   .filter((product) => !product.isBundle) // Exclude bundle headers
//                   .reduce((acc, product) => acc + parseFloat(product.amount || 0), 0);
//             setInvoice((prev) => ({ ...prev, subtotal: subtotal.toFixed(2) }));

//             // Calculate taxable subtotal by excluding unchecked products and bundle headers
//             const taxableSubtotal = productDetails
//                   .filter((product) => !product.isBundle && product.salestaxes_checked) // Exclude unchecked and bundle headers
//                   .reduce((acc, product) => acc + parseFloat(product.amount || 0), 0);

//             // Apply discount
//             const discountValue = parseFloat(invoice.discount) || 0;
//             const discountAmount = invoice.discountMode
//                   ? (taxableSubtotal * (discountValue / 100)).toFixed(2) // Percentage discount
//                   : discountValue.toFixed(2); // Fixed amount discount

//             const finalTaxableSubtotal = (taxableSubtotal - discountAmount).toFixed(2);
//             setInvoice((prev) => ({ ...prev, taxablesubtotal: finalTaxableSubtotal }));

//             // Determine the sales tax rate
//             let salesTaxRate = 0;

//             if (invoice.taxrates_id === 'custom rates') {
//                   // Use customRate if "custom rates" is selected
//                   salesTaxRate = parseFloat(invoice.customRate) / 100 || 0;
//             } else if (invoice.taxrates_id === '' || invoice.taxrates_id === 'Automatic Calculation') {
//                   // Use the salestaxes_id from the invoice state
//                   // salesTaxRate = invoice.salestaxes_id || 0;
//                   salesTaxRate = 0.0825;
//             } else {
//                   const selectedTaxRate = taxRates.find((taxrate) => String(taxrate.name) === invoice.taxrates_id);
//                   salesTaxRate = selectedTaxRate ? selectedTaxRate.percentage / 100 : 0;
//             }

//             const salesTax = (finalTaxableSubtotal * salesTaxRate).toFixed(2);
//             setInvoice((prev) => ({ ...prev, salestax: salesTax }));


//             // Calculate invoice total
//             const Total = (parseFloat(subtotal) + parseFloat(salesTax)).toFixed(2);
//             setInvoice((prev) => ({ ...prev, total: Total }));

//             // Calculate balance amount
//             const deposit = parseFloat(invoice.deposit) || 0;
//             const balanceAmount = (parseFloat(Total) - deposit).toFixed(2);
//             setInvoice((prev) => ({ ...prev, balanceamount: balanceAmount }));
//       }, [productDetails, invoice.discount, invoice.discountMode, invoice.taxrates_id, invoice.salestaxes_id, invoice.customRate, invoice.deposit]);
//       useEffect(() => {
//             updateCalculations();
//       }, [productDetails, invoice.discount, invoice.discountMode, invoice.taxrates_id, invoice.deposit, updateCalculations]);


      
//       const handleSubmit = async (e) => {
//             e.preventDefault();
        
//             if (productDetails.length === 0) {
//                 alert("Cannot submit invoice without products!");
//                 return;
//             }
        
//             try {
//                 const updatedSalesTaxId = await fetchSalesTaxId(invoice.city_id, invoice.state_id);
        
//                 const invoiceData = {
//                     ...invoice,
//                     salestaxes_id: updatedSalesTaxId,
//                     subtotal: parseFloat(invoice.subtotal) || 0.00,
//                     discount: parseFloat(invoice.discount) || 0.00,
//                     taxablesubtotal: parseFloat(invoice.taxablesubtotal) || 0.00,
//                     taxrates_id: invoice.taxrates_id || null,
//                     salestax: parseFloat(invoice.salestax) || 0.00,
//                     total: parseFloat(invoice.total) || 0.00,
//                     deposit: parseFloat(invoice.deposit) || 0.00,
//                     paycheckto: invoice.paycheckto || "",
//                     balanceamount: parseFloat(invoice.balanceamount) || 0.00,
//                     products: productDetails.map((product) => ({
//                         productid: product.productid || null, // Ensure ID is included
//                         name: product.name,
//                         description: product.description || "",
//                         qty: Number(product.qty) || 1,
//                         salesprice: parseFloat(product.salesprice) || 0.00,
//                         amount: parseFloat(product.amount) || 0.00,
//                         salestaxes_id: product.isBundle ? 0 : updatedSalesTaxId,
//                     })),
//                     invoicewithouttax: invoiceWithoutTax.map((item, index) => ({
//                         id: item.id || index + 1,
//                         descriptionwot: item.descriptionwot || "",
//                         pricewot: parseFloat(item.pricewot) || 0.00,
//                     }))
//                 };
        
//                 const response = await axios.post('http://localhost:8080/invoices/updateinvoicewithpro', invoiceData);
//                 console.log("Server Response:", response.data);
//                 alert('Invoice saved successfully!');
//             } catch (error) {
//                 console.error('Error saving invoice:', error);
//                 if (error.response) {
//                     console.error('Server Response:', error.response.data);
//                 }
//                 alert('Failed to save invoice.');
//             }
//         };
        
        
        

//       const handleToggleDiscountMode = () => {
//             setInvoice((prev) => ({
//                   ...prev,
//                   discountMode: !prev.discountMode,
//                   discount: '',
//             }));
//       };

//       const handleProductSearch = (e, index) => {
//             const searchTerm = e.target.value.toLowerCase();
//             setActiveSearchIndex(index);
        
//             // Ensure filtering is done on the 'name' property
//             const filtered = products.filter((product) =>
//                   product.name && product.name.toLowerCase().startsWith(searchTerm)
//               );
//               setFilteredProducts(filtered);
              
              
        
//             const updatedProductDetails = [...productDetails];
//             updatedProductDetails[index].name = searchTerm;  // Update name in the productDetails state
//             setProductDetails(updatedProductDetails);
//         };
        

//         const handleSelectProduct = (selectedProductName, index) => {
//             const selectedProductData = products.find(p => p.name === selectedProductName);
//             if (!selectedProductData) return;
        
//             setProductDetails((prevDetails) => {
//                 const updatedDetails = [...prevDetails];
//                 updatedDetails[index] = {
//                     ...updatedDetails[index],
//                     productid: selectedProductData.id, // Ensure productid is assigned
//                     name: selectedProductData.name,
//                     description: selectedProductData.description || '',
//                     salesprice: selectedProductData.salesprice || '0.00',
//                     qty: 1,
//                     amount: (1 * parseFloat(selectedProductData.salesprice || 0)).toFixed(2),
//                     salestaxes_id: selectedProductData.salestaxes_id || localStorage.getItem('salestaxes_id') || 0,
//                     salestaxes_checked: selectedProductData.salestaxes_id !== "0",
//                 };
//                 return updatedDetails;
//             });
        
//             fetchProductOrBundleDetails(selectedProductData.name, index);
//             setActiveSearchIndex(null);
//         };
        

      


//       return (
//             <form onSubmit={handleSubmit} className="invoice-form-container">
//                   <h2>EDIT INVOICE FORM</h2>

//                   <div className="invoice-form-first-section">
//                         <div>
//                               <label>Order Type:</label>
//                               <input type="text" value={invoice.ordertype} readOnly />
//                         </div>
//                         <div>
//                               <label htmlFor="customerdisplayname_id">Customer Name:</label>
//                               <input
//                                     type="text"
//                                     id="customerdisplayname_id"
//                                     name="customerdisplayname_id"
//                                     value={invoice.customerdisplayname_id}
//                                     onChange={handleChange}
//                                     readOnly
//                               />
//                         </div>
//                         <div>
//                               <label htmlFor="email">Email:</label>
//                               <input
//                                     type="email"
//                                     id="email"
//                                     name="email"
//                                     value={invoice.email}
//                                     onChange={handleChange}
//                                     required
//                               />
//                         </div>
//                         <div>
//                               <label>CC:</label>
//                               <input type="text" name="cc" value={invoice.cc} onChange={handleChange} />
//                         </div>
//                         <div>
//                               <label>BCC:</label>
//                               <input type="text" name="bcc" value={invoice.bcc} onChange={handleChange} />

//                         </div>
//                   </div>


//                   <div className="invoice-form-second-section">
//                         <div className='invoice-form-second-left'>
//                               <label htmlFor="billto">Bill To:</label>
//                               <input
//                                     type="text"
//                                     id="billto"
//                                     name="billto"
//                                     value={invoice.billto}
//                                     onChange={handleChange}
//                               />
//                         </div>
//                         <div className='invoice-form-second-left'>
//                               <label htmlFor="shipto">Ship To:</label>
//                               <input
//                                     type="text"
//                                     id="shipto"
//                                     name="shipto"
//                                     value={invoice.shipto}
//                                     onChange={handleChange}
//                               />
//                         </div>
//                         <div className='invoice-form-second-right'>

//                               <label>Ship Via:</label>
//                               <input type="text" name="shipvia" value={invoice.shipvia} onChange={handleChange} />


//                               <label>Shipping Date:</label>
//                               <input type="date" name="shippingdate" value={invoice.shippingdate} onChange={handleChange} />


//                               <label>Tracking No:</label>
//                               <input type="text" name="trackingno" value={invoice.trackingno} onChange={handleChange} />


//                         </div>
//                         <div className='invoice-form-second-right'>

//                               <label htmlFor="terms_id">Terms:</label>
//                               <select name="terms_id" value={invoice.terms_id} onChange={handleChange}>
//                                     <option value="">Select Terms</option>
//                                     {terms.map(terms => (
//                                           <option key={terms.id} value={terms.name}>{terms.name}</option>
//                                     ))}
//                               </select>


//                               <label>Invoice Date:</label>
//                               <input type="date" name="invoicedate" value={invoice.invoicedate} onChange={handleChange} />


//                               <label>Due Date:</label>
//                               <input type="date" name="duedate" value={invoice.duedate} onChange={handleChange} />


//                         </div>

//                   </div>


//                   <div className='invoice-form-third-section'>

//                         <label htmlFor="status_id">Status:</label>
//                         <select name="status_id" value={invoice.status_id} onChange={handleChange}>
//                               <option value="">Select Status</option>
//                               {status.map(s => (
//                                     <option key={s.id} value={s.name}>{s.name}</option>
//                               ))}
//                         </select>


                       
//                         <label htmlFor="franchiseowner_id">Franchise Owner:</label>
//                 <input
//                     type="text"
//                     id="franchiseowner_id"
//                     name="franchiseowner_id"
//                     value={invoice.franchiseowner_id}
//                     readOnly // Make the field read-only
//                 />


//                         <label>Processed On:</label>
//                         <input type="date" name="processedon" value={invoice.processedon} onChange={handleChange} />


//                         <label>Terms and Conditions:</label>
//                         <textarea name="termsandconditions" value={invoice.termsandconditions} onChange={handleChange}></textarea>


//                         <label htmlFor="state_id">State:</label>
//                         <select name="state_id" value={invoice.state_id} onChange={handleCityOrStateChange}>
//                               <option value="">Select State</option>
//                               {states.map(state => (
//                                     <option key={state.id} value={state.name}>{state.name}</option>
//                               ))}
//                         </select>


//                         <label htmlFor="city_id">City:</label>
//                         <select name="city_id" value={invoice.city_id} onChange={handleCityOrStateChange}>
//                               <option value="">Select City</option>
//                               {cities.map(city => (
//                                     <option key={city.id} value={city.name}>{city.name}</option>
//                               ))}
//                         </select>


                        



//                         <label htmlFor="createddate">Created Date:</label>
//                         <input
//                               type="date"
//                               id="createddate"
//                               name="createddate"
//                               value={invoice.createddate}
//                               onChange={handleChange}
//                               readOnly // Use readOnly if it should not be edited
//                         />


//                   </div>


//                   <div className="invoice-form-section-product-table">
//                         <table>
//                               <thead>
//                                     <tr>
//                                           <th>ProductID</th>
//                                           <th>Product</th>
//                                           <th>Description</th>
//                                           <th>Qty</th>
//                                           <th>Price</th>
//                                           <th>Sales Taxes ID</th>
//                                           <th>Amount</th>

//                                           <th>Actions</th>
//                                     </tr>
//                               </thead>
//                               <tbody>
//                                     {productDetails.map((product, index) => (
//                                           <tr key={index}>
//                                                 <td>
//     <input
//         type="number"
//         name="productid"
//         value={product.productid || ''} // Ensure productid is displayed
//         readOnly
//     />
// </td>


//                                                 <td>
//                                                       <input
//                                                             type="text"
//                                                             value={product.name}
//                                                             onChange={(e) => handleProductSearch(e, index)}
//                                                             placeholder="Search Product"
//                                                       />
//                                                       {index === activeSearchIndex && (
//                                                             <div className="product-search-results">
//                                                                  <ul>
//                                                                   {filteredProducts.map((filteredProduct, idx) => (
//     <li key={idx} onClick={() => handleSelectProduct(filteredProduct.name, index)}>
//         {filteredProduct.id} - {filteredProduct.name} {/* Display ID for clarity */}
//     </li>
// ))}


//                                                                   </ul>

//                                                             </div>
//                                                       )}
//                                                 </td>
//                                                 <td>
//                                                       <input
//                                                             type="text"
//                                                             name="description"
//                                                             value={product.description}
//                                                             onChange={(e) => handleProductChange(e, index)}
//                                                             readOnly
//                                                       />
//                                                 </td>
//                                                 <td>
//                                                       <input
//                                                             type="number"
//                                                             name="qty"
//                                                             value={product.qty}
//                                                             onChange={(e) => handleProductChange(e, index)}
//                                                       />
//                                                 </td>
//                                                 <td>
//                                                       <input
//                                                             type="text"
//                                                             name="salesprice"
//                                                             value={product.salesprice}
//                                                             onChange={(e) => handleProductChange(e, index)}
//                                                       />
//                                                 </td>
//                                                 <td>
//                                                       <input
//                                                             type="checkbox"
//                                                             checked={product.salestaxes_checked}
//                                                             onChange={() => handleCheckboxChange(index)}
//                                                             disabled={product.isBundle} // Disable for bundle rows
//                                                       />
//                                                       {/* <label>{product.salestaxes_id}</label> */}

//                                                 </td>
//                                                 <td>
//                                                       <input
//                                                             type="text"
//                                                             value={product.amount}
//                                                             readOnly
//                                                       />
//                                                 </td>



//                                                 <td>
//                                                       <button className='invoice-form-product-button' type="button" onClick={() => handleDeleteProduct(index)}>
//                                                             Delete
//                                                       </button>
//                                                 </td>
//                                           </tr>
//                                     ))}
//                               </tbody>
//                         </table>
//                         <button className='invoice-form-product-button' type="button" onClick={handleAddProductRow}>Add Product</button>
//                   </div>

//                   <div className="invoice-form-fourth-section">

//                         <div>
//                               <div className='invoice-form-fourth-left'>
//                                     <label>Paycheck To:</label>
//                                     <input type="text" name="paycheckto" value={invoice.paycheckto} onChange={handleChange} />
//                               </div>
//                               <div className='invoice-form-fourth-left'>
//                                     <label>Note to Customer:</label>
//                                     <textarea name="notetocustomer" value={invoice.notetocustomer} onChange={handleChange}></textarea>
//                               </div>
//                               <div className='invoice-form-fourth-left'>
//                                     <label>Internal Customer Notes:</label>
//                                     <textarea name="internalcustomernotes" value={invoice.internalcustomernotes} onChange={handleChange}></textarea>
//                               </div>
//                               <div className='invoice-form-fourth-left'>
//                                     <label>Memo on Statement:</label>
//                                     <textarea name="memoonstatement" value={invoice.memoonstatement} onChange={handleChange}></textarea>
//                               </div>
//                         </div>

//                         <div className='invoice-form-fourth-right'>

//                               <label>Subtotal:</label>
//                               <input type="text" value={invoice.subtotal} readOnly />

//                               <label>Discount Mode:</label>
//                               <div className="invoice-form-toggle-switch">
//                                     <label className="invoice-form-switch">
//                                           <input
//                                                 type="checkbox"
//                                                 checked={invoice.discountMode}
//                                                 onChange={handleToggleDiscountMode}
//                                           />
//                                           <span className="invoice-form-slider"></span>
//                                     </label>
//                                     <span>{invoice.discountMode ? 'Discount (%)' : 'Amount'}</span>
//                               </div>


//                               <label htmlFor="discount">{invoice.discountMode ? 'Discount (%)' : 'Discount (Amount)'}:</label>
//                               <input
//                                     type="text"
//                                     id="discount"
//                                     name="discount"
//                                     value={invoice.discount}
//                                     onChange={handleChange}
//                               />





// {/* <div>
//   <button
//     type="button"
//     onClick={() => setShowInvoiceWithoutTax((prev) => !prev)}
//   >
//     Add
//   </button>
// </div> */}




// {/* {showInvoiceWithoutTax && ( */}
// <div>
//     <table>
//         <thead>
//             <tr>
//                 <th>Description</th>
//                 <th>Price</th>
//                 <th>Actions</th>
//             </tr>
//         </thead>
//         <tbody>
//             {invoiceWithoutTax.map((row, index) => (
//                 <tr key={index}>
//                     <td>
//                         <input
//                             type="text"
//                             value={row.descriptionwot}
//                             onChange={(e) =>
//                                 handleInvoiceWithoutTaxChange(index, 'descriptionwot', e.target.value)
//                             }
//                         />
//                     </td>
//                     <td>
//                         <input
//                             type="number"
//                             value={row.pricewot}
//                             onChange={(e) =>
//                                 handleInvoiceWithoutTaxChange(index, 'pricewot', e.target.value)
//                             }
//                         />
//                     </td>
//                     <td>
//                         <button
//                             type="button"
//                             onClick={() =>
//                                 setInvoiceWithoutTax((prev) =>
//                                     prev.filter((_, i) => i !== index)
//                                 )
//                             }
//                         >
//                             Delete
//                         </button>
//                     </td>
//                 </tr>
//             ))}
//         </tbody>
//     </table>
//     <button type="button" onClick={handleAddInvoiceWithoutTaxRow}>
//         Add Row
//     </button>
// </div>

//   {/* )} */}



//                               <label>Taxable Subtotal:</label>
//                               <input type="text" value={invoice.taxablesubtotal} readOnly />





//                               <label>Tax Rate:</label>
//                               <div style={{ gridColumn: 'span 2' }}>
//                                     <select name="taxrates_id" value={invoice.taxrates_id} onChange={handleChange}>
//                                           <option value="">Select Tax Rate</option>
//                                           {taxRates.map(tax => (
//                                                 <option key={tax.id} value={tax.name}>{tax.name} ({tax.percentage}%)</option>
//                                           ))}
//                                           <option className="invoice-form-custom-rates" value="custom rates">Custom Rates</option>
//                                     </select>

//                                     {invoice.taxrates_id === 'custom rates' && (
//                                           <input
//                                                 type="number"
//                                                 name="customRate"
//                                                 value={invoice.customRate}
//                                                 onChange={handleChange}
//                                                 placeholder="Enter custom rate"
//                                           />
//                                     )}
//                               </div>


//                               <label>Sales Tax:</label>
//                               <input type="text" value={invoice.salestax} readOnly />


//                               <label>Total:</label>
//                               <input type="text" value={invoice.total} readOnly />


//                               <label htmlFor="deposit">Deposit:</label>
//                               <input
//                                     type="text"
//                                     id="deposit"
//                                     name="deposit"
//                                     value={invoice.deposit}
//                                     onChange={handleChange}
//                               />



//                               <label>Balance Amount:</label>
//                               <input type="text" value={invoice.balanceamount} readOnly />


//                         </div>

//                   </div>

//                   <div className='invoice-form-submit-button'>
//                         <button type="submit">Submit Invoice</button>
//                   </div>

//                   <form>
//             {/* Existing form fields here */}
//             <button type="button" onClick={handleNavigateToSendEmail}>Send Email</button>
//         </form>

//             </form>
//       );
// };

// export default InvoiceForm;



import React, { useState, useEffect, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDFDocument from './InvoicePDFDocument';

import { useLocation } from 'react-router-dom';

import axios from 'axios';
import './EditInvoiceForm.css';

const InvoiceForm = ({isOpen}) => {
      const locations = useLocation();
      const customerData = locations.state || {};
      console.log("Received customer data in InvoiceForm:", customerData);
      const ordertype = customerData.ordertype || 'Invoice';

      // Retrieve passed customer data

      const [invoice, setInvoice] = useState({
            customerdisplayname_id: '',
            email: '',
            billto: '',
            shipto: '',
            status_id: '',
            franchiseowner_id: '',
            createddate: new Date().toISOString().split('T')[0], // Set today's date as default
            city_id: '',
            state_id: '',
            terms_id: '',
            taxrates_id: '',


            ordertype: '', // New field added
            deposit: '',
            subtotal: '0.00',
            discount: '',
            discountMode: true, // true for percentage, false for fixed amount
            taxablesubtotal: '',
            salestax: '',
            total: '',
            balanceamount: '',
            cc: '',
            bcc: '',
            shipvia: '',
            shippingdate: '',
            trackingno: '',
            invoicedate: '',
            duedate: '',
            processedon: '',
            paycheckto: '',
            termsandconditions: '',
            notetocustomer: '',
            internalcustomernotes: '',
            memoonstatement: '',
            customRate: '', // New field for custom rate
      });

      const [orderTypes, setOrderTypes] = useState([]); // New state for order types

      const navigate = useNavigate();

      const handleNavigateToSendEmail = () => {
            navigate('/sendemailpage', { state: { ordertype: invoice.ordertype, id: invoice.id } });
      };

      useEffect(() => {
            fetchOrderTypes();
      }, []);

      const fetchOrderTypes = async () => {
            try {
                  const orderTypesResponse = await axios.post('http://localhost:8080/ordertype/ordertypelist');
                  setOrderTypes(orderTypesResponse.data);
            } catch (error) {
                  console.error('Error fetching order types:', error);
            }
      };

      const [productDetails, setProductDetails] = useState([
            {
                  productid: '',
                  name: '',
                  description: '',
                  qty: 1,
                  salesprice: '0.00',
                  amount: '0.00',
                  salestaxes_id: localStorage.getItem('salestaxes_id'),
                  salestaxes_checked: true,
                  isBundle: false // Default as false for standalone products
            }
      ]);



      const [products, setProducts] = useState([]);
      const [filteredProducts, setFilteredProducts] = useState([]);
      const [activeSearchIndex, setActiveSearchIndex] = useState(null);

      const [terms, setTerms] = useState([]);
      const [status, setStatus] = useState([]);
      const [franchiseOwners, setFranchiseOwners] = useState([]);
      const [location, setLocation] = useState([]);
      const [taxRates, setTaxRates] = useState([]);
      const [customer, setCustomer] = useState([]);
      const [locationData, setLocations] = useState([]);
      const [cities, setCities] = useState([]);
      const [states, setStates] = useState([]);
      const [invoiceWithoutTax, setInvoiceWithoutTax] = useState([]);
      const [showInvoiceWithoutTax, setShowInvoiceWithoutTax] = useState(false);

      const username = localStorage.getItem('username') || 'default';

      useEffect(() => {
            if (customerData) {
                  setInvoice((prev) => ({
                        ...prev,
                        ...customerData,
                  }));

                  if (customerData.products && customerData.products.length > 0) {
                        const mappedProducts = customerData.products.map((product) => ({
                              productid: product.productid,  // Ensure productid is correctly assigned
                              name: product.name,
                              description: product.description,
                              qty: parseInt(product.qty, 10) || 1,
                              salesprice: parseFloat(product.salesprice).toFixed(2),
                              amount: parseFloat(product.amount).toFixed(2),
                              salestaxes_id: product.salestaxes_id,
                              salestaxes_checked: product.salestaxes_id !== "0",
                              isBundle: false,
                        }));
                        setProductDetails(mappedProducts);
                  }

                  if (customerData.invoicewithouttax && customerData.invoicewithouttax.length > 0) {
                        setInvoiceWithoutTax(customerData.invoicewithouttax);
                  }
            }
      }, [customerData]);





      useEffect(() => {
            fetchProducts();
            fetchDropdownData();

            fetchFranchiseOwners();
      }, []);


      useEffect(() => {
            // Calculate subtotal, excluding bundle headers
            const subtotal = productDetails
                  .filter((product) => !product.isBundle) // Exclude bundle headers
                  .reduce((acc, product) => acc + parseFloat(product.amount || 0), 0);

            // Update subtotal in the invoice state
            setInvoice((prev) => ({ ...prev, subtotal: subtotal.toFixed(2) }));
      }, [productDetails]); // Run this whenever productDetails changes

      // Add this useEffect in your component
      useEffect(() => {
            // Calculate taxable subtotal by excluding bundle headers and unchecked products
            const filteredProducts = productDetails
                  .filter((product) => !product.isBundle && product.salestaxes_checked); // Exclude bundle headers and unchecked products

            // Sum the amounts of the filtered products
            const subtotal = filteredProducts.reduce((acc, product) => acc + parseFloat(product.amount || 0), 0);

            // Calculate discount
            const discountValue = parseFloat(invoice.discount) || 0;
            const discountAmount = invoice.discountMode
                  ? (subtotal * (discountValue / 100)).toFixed(2) // Percentage discount
                  : discountValue.toFixed(2); // Fixed amount discount

            // Calculate taxable subtotal
            const taxableSubtotal = (subtotal - discountAmount).toFixed(2);

            // Update taxable subtotal in the invoice state
            setInvoice((prev) => ({ ...prev, taxablesubtotal: taxableSubtotal }));
      }, [productDetails, invoice.discount, invoice.discountMode]); // Dependencies to re-trigger calculation



      const fetchProducts = async () => {
            try {
                  const productResponse = await axios.post('http://localhost:8080/productbundle/productbundlenameslist');
                  setProducts(productResponse.data);
                  setFilteredProducts(productResponse.data);
            } catch (error) {
                  console.error('Error fetching products:', error);
            }
      };

      const fetchDropdownData = async () => {
            try {
                  const customerResponse = await axios.post('http://localhost:8080/customers/displaynames');
                  setCustomer(customerResponse.data.map((name, index) => ({ id: index + 1, customerdisplayname: name })));

                  const locationResponse = await axios.post('http://localhost:8080/locations/getalllocations');
                  setLocation(locationResponse.data);

                  const taxRatesResponse = await axios.post('http://localhost:8080/taxratess/getalltaxratess');
                  const processedTaxRates = taxRatesResponse.data.map(rate => ({
                        ...rate,
                        percentage: rate.percentage ? parseFloat(rate.percentage.replace('%', '')) : 0
                  }));
                  setTaxRates(processedTaxRates);

                  const termsResponse = await axios.post('http://localhost:8080/terms/getallterms');
                  setTerms(termsResponse.data);

                  const statusResponse = await axios.post('http://localhost:8080/invoicestatus/invoicestatusgetAll');
                  setStatus(statusResponse.data);

                  const response = await axios.post('http://localhost:8080/franchiseowners/getallfranchise');
                  setFranchiseOwners(response.data);

                  const cityResponse = await axios.post('http://localhost:8080/cities/getallcity');
                  setCities(cityResponse.data);

                  const stateResponse = await axios.post('http://localhost:8080/states/getallstates');
                  setStates(stateResponse.data);
            } catch (error) {
                  console.error('Error fetching dropdown data:', error);
            }
      };
      const fetchFranchiseOwners = async () => {
            try {
                  const response = await axios.post('http://localhost:8080/franchiseowners/getallfranchise');
                  setFranchiseOwners(response.data); // Assumes response data is an array of franchise owners
            } catch (error) {
                  console.error('Error fetching franchise owners:', error);
            }
      };

      useEffect(() => {
            const fetchDefaultSalesTax = async () => {
                  const defaultSalesTaxRate = await fetchSalesTaxId();
                  setInvoice((prev) => ({ ...prev, salestaxes_id: defaultSalesTaxRate }));
                  localStorage.setItem('salestaxes_id', defaultSalesTaxRate);
                  updateCalculations();
            };

            fetchDefaultSalesTax();
      }, []);


      const fetchSalesTaxId = async (city = "", state = "") => {
            try {
                  if (!city || !state) return 0; // Ensure city and state are selected

                  const response = await axios.post('http://localhost:8080/salestaxes/findsalestax', {
                        city,
                        state,
                  });

                  console.log("Fetched Sales Tax Response:", response.data); // Debugging log

                  const salesTaxPercentage = parseFloat(response.data.replace('%', ''));
                  return salesTaxPercentage / 100; // Convert to decimal format
            } catch (error) {
                  console.error('Error fetching sales tax:', error);
                  return 0;
            }
      };




      const handleCityOrStateChange = async (e) => {
            const { name, value } = e.target;
            setInvoice((prev) => ({ ...prev, [name]: value }));

            // Check if both city and state are selected
            const selectedCity = name === 'city_id' ? value : invoice.city_id;
            const selectedState = name === 'state_id' ? value : invoice.state_id;

            // Fetch sales tax rate based on selected city and state, or get default value
            const salesTaxRate = await fetchSalesTaxId(selectedCity, selectedState);

            // Store in local storage and update invoice state
            localStorage.setItem('salestaxes_id', salesTaxRate);
            setInvoice((prev) => ({ ...prev, salestaxes_id: salesTaxRate }));

            // Trigger recalculation of sales tax based on new rate
            updateCalculations();
      };






      const [isSalesTaxChecked, setIsSalesTaxChecked] = useState(false);
      const salesTaxId = localStorage.getItem('salestaxes_id');

      const handleSalesTaxCheckbox = (index) => {
            setProductDetails((prevDetails) =>
                  prevDetails.map((product, i) =>
                        i === index
                              ? { ...product, isSalesTaxChecked: !product.isSalesTaxChecked }
                              : product
                  )
            );
      };

      // const handleCheckboxChange = (index) => {
      //       setProductDetails((prevDetails) => {
      //           const updatedDetails = [...prevDetails];
      //           updatedDetails[index].salestaxes_checked = !updatedDetails[index].salestaxes_checked;
      //           return updatedDetails;
      //       });
      //   };


      const handleCheckboxChange = (index) => {
            setProductDetails((prevDetails) => {
                  return prevDetails.map((product, i) =>
                        i === index
                              ? { ...product, salestaxes_checked: !product.salestaxes_checked }
                              : product
                  );
            });
      };








      const handleCustomerChange = async (e) => {
            const selectedName = e.target.value;
            setInvoice((prev) => ({ ...prev, customerdisplayname_id: selectedName }));

            if (selectedName) {
                  try {
                        const response = await axios.get(`http://localhost:8080/customers/customers/displayname/${selectedName}`);
                        const customerData = response.data;

                        setInvoice((prev) => ({
                              ...prev,
                              email: customerData.emailid,
                              billto: customerData.billingaddress,
                              shipto: customerData.shippingaddress

                        }));
                  } catch (error) {
                        console.error('Error fetching customer details:', error);
                  }
            }
      };

      // Function to handle changes in input fields and dropdowns
      // Function to handle changes in input fields and dropdowns
      const handleChange = (e) => {
            const { name, value } = e.target;
            setInvoice((prev) => ({
                  ...prev,
                  [name]: value,
                  ...(name === 'taxrates_id' && value === 'custom rates' ? { customRate: '' } : {}),
            }));

            // Trigger calculation whenever tax rate, discount, or deposit changes
            if (name === 'taxrates_id' || name === 'discount' || name === 'deposit' || name === 'customRate') {
                  updateCalculations();
            }
      };


      const handleProductChange = (e, index) => {
            const { name, value } = e.target;
            const updatedProductDetails = [...productDetails];

            // Update the field that was changed (either qty or salesprice)
            updatedProductDetails[index][name] = value;

            // Recalculate the amount as qty * salesprice
            const qty = parseFloat(updatedProductDetails[index].qty) || 0;
            const salesprice = parseFloat(updatedProductDetails[index].salesprice) || 0;
            const amount = (qty * salesprice).toFixed(2);
            updatedProductDetails[index].amount = amount;

            setProductDetails(updatedProductDetails);
            updateCalculations(); // Recalculate totals if needed
      };




      const fetchProductOrBundleDetails = async (productName, index) => {
            try {
                  const response = await axios.post('http://localhost:8080/productbundle/displaydetailsbasedonname', {
                        bundleproductName: productName
                  });
                  const productData = response.data;

                  setProductDetails((prevDetails) => {
                        const updatedDetails = [...prevDetails];



                        // Determine the cost field based on username
                        let costField = '';
                        switch (username.toLowerCase().replace(/\s+/g, '')) {
                              case 'directdealer':
                                    costField = 'directdealerprice';
                                    break;
                              case 'promotionaldealer':
                                    costField = 'promotionaldealerprice';
                                    break;
                              case 'indirectdealer':
                                    costField = 'indirectdealerprice';
                                    break;
                              case 'promotionalindirectdealer':
                                    costField = 'promotionalindirectdelarprice';
                                    break;
                              case 'distributor':
                                    costField = 'distributorprice';
                                    break;
                              case 'promotionaldistributor':
                                    costField = 'promotionaldistributorprice';
                                    break;
                              default:
                                    costField = 'salesprice';
                                    break;
                        }



                        if (productData.products) {
                              // Handling product bundle
                              const bundlePrice = productData.products.reduce(
                                    (total, bundleProduct) => total + parseFloat(bundleProduct.productSalesprice || 0), 0
                              );

                              updatedDetails[index] = {
                                    productid: productData.bundleId,
                                    name: productData.bundleName,
                                    description: productData.bundleDescription || '',
                                    salesprice: bundlePrice.toFixed(2),
                                    amount: bundlePrice.toFixed(2),
                                    isBundle: true,
                                    bundleId: `bundle-${index}`,
                                    salestaxes_checked: false,
                                    salestaxes_id: 0,
                              };

                              // Add bundle items
                              productData.products.forEach((bundleProduct) => {
                                    updatedDetails.push({
                                          productid: bundleProduct.productId,
                                          name: bundleProduct.productName,
                                          description: bundleProduct.productDescription,
                                          qty: 1,
                                          salesprice: bundleProduct.productSalesprice,
                                          amount: bundleProduct.productSalesprice,
                                          salestaxes_id: localStorage.getItem('salestaxes_id'),
                                          salestaxes_checked: true,
                                          isBundle: false,
                                          bundleId: `bundle-${index}`,
                                    });
                              });

                        } else {
                              // Handling standalone product
                              updatedDetails[index] = {
                                    productid: productData.id,
                                    name: productData.name || productName,
                                    description: productData.description || '',
                                    salesprice: productData.salesprice || '0.00',
                                    amount: (1 * parseFloat(productData.salesprice || 0)).toFixed(2),
                                    isBundle: false,
                                    salestaxes_id: productData.salestaxes_id || localStorage.getItem('salestaxes_id') || 0,
                                    salestaxes_checked: productData.salestaxes_id !== "0",
                              };
                        }
                        return updatedDetails;
                  });
            } catch (error) {
                  console.error('Error fetching product or bundle details:', error);
            }
      };

      // const handleAddProductRow = () => {
      //   setProductDetails([...productDetails, { name: '', description: '', qty: '', salesprice: '', amount: '0.00', salestaxes_id:'' }]);
      // };


      const handleAddProductRow = async (isBundle = false) => {
            let salesTaxId = localStorage.getItem('salestaxes_id');

            if (!salesTaxId && invoice.city_id && invoice.state_id) {
                  salesTaxId = await fetchSalesTaxId(invoice.city_id, invoice.state_id);
                  localStorage.setItem('salestaxes_id', salesTaxId);
            }

            setProductDetails((prevDetails) => [
                  ...prevDetails,
                  {
                        productid: '',
                        name: '',
                        description: '',
                        qty: 1,
                        salesprice: '0.00',
                        amount: '0.00',
                        salestaxes_id: isBundle ? 0 : salesTaxId,
                        salestaxes_checked: true
                  }
            ]);
      };


      const handleDeleteProduct = (index) => {
            const updatedProducts = [...productDetails];
            const productToDelete = updatedProducts[index];

            // Check if this product is part of a bundle by looking at bundleId
            if (productToDelete.bundleId) {
                  // Locate the bundle heading (parent) by bundleId
                  const bundleIndex = updatedProducts.findIndex(
                        (product) => product.isBundle && product.bundleId === productToDelete.bundleId
                  );

                  if (bundleIndex !== -1) {
                        // Get the bundle heading product
                        const bundleProduct = updatedProducts[bundleIndex];

                        // Subtract the deleted product's price from the bundle's total price
                        const newBundlePrice = parseFloat(bundleProduct.salesprice) - parseFloat(productToDelete.salesprice);

                        // Update the bundle price and recalculate the amount
                        const qty = parseFloat(bundleProduct.qty) || 1; // Assuming quantity is at least 1
                        const updatedAmount = (qty * newBundlePrice).toFixed(2);

                        updatedProducts[bundleIndex] = {
                              ...bundleProduct,
                              salesprice: newBundlePrice.toFixed(2),
                              amount: updatedAmount, // amount = qty * updated bundle price
                        };
                  }
            }

            // Remove the product from the list
            updatedProducts.splice(index, 1);

            setProductDetails(updatedProducts);
            updateCalculations(); // Recalculate the invoice totals after deletion
      };


      const handleAddInvoiceWithoutTaxRow = () => {
            setInvoiceWithoutTax((prev) => [
                  ...prev,
                  { descriptionwot: '', pricewot: '0.00' },
            ]);
      };

      const handleInvoiceWithoutTaxChange = (index, field, value) => {
            setInvoiceWithoutTax((prev) => {
                  const updatedRows = [...prev];
                  updatedRows[index] = {
                        ...updatedRows[index],
                        [field]: value
                  };
                  return updatedRows;
            });

            if (field === 'pricewot') {
                  const pricewotSum = invoiceWithoutTax.reduce(
                        (acc, row) => acc + parseFloat(row.pricewot || 0), 0
                  );
                  setInvoice((prev) => ({
                        ...prev,
                        taxablesubtotal: (parseFloat(prev.taxablesubtotal || 0) + pricewotSum).toFixed(2)
                  }));
            }
      };


      const updateCalculations = useCallback(() => {
            // Calculate subtotal excluding bundle headers
            const subtotal = productDetails
                  .filter((product) => !product.isBundle) // Exclude bundle headers
                  .reduce((acc, product) => acc + parseFloat(product.amount || 0), 0);
            setInvoice((prev) => ({ ...prev, subtotal: subtotal.toFixed(2) }));

            // Calculate taxable subtotal by excluding unchecked products and bundle headers
            const taxableSubtotal = productDetails
                  .filter((product) => !product.isBundle && product.salestaxes_checked) // Exclude unchecked and bundle headers
                  .reduce((acc, product) => acc + parseFloat(product.amount || 0), 0);

            // Apply discount
            const discountValue = parseFloat(invoice.discount) || 0;
            const discountAmount = invoice.discountMode
                  ? (taxableSubtotal * (discountValue / 100)).toFixed(2) // Percentage discount
                  : discountValue.toFixed(2); // Fixed amount discount

            const finalTaxableSubtotal = (taxableSubtotal - discountAmount).toFixed(2);
            setInvoice((prev) => ({ ...prev, taxablesubtotal: finalTaxableSubtotal }));

            // Determine the sales tax rate
            let salesTaxRate = 0;

            if (invoice.taxrates_id === 'custom rates') {
                  // Use customRate if "custom rates" is selected
                  salesTaxRate = parseFloat(invoice.customRate) / 100 || 0;
            } else if (invoice.taxrates_id === '' || invoice.taxrates_id === 'Automatic Calculation') {
                  // Use the salestaxes_id from the invoice state
                  // salesTaxRate = invoice.salestaxes_id || 0;
                  salesTaxRate = 0.0825;
            } else {
                  const selectedTaxRate = taxRates.find((taxrate) => String(taxrate.name) === invoice.taxrates_id);
                  salesTaxRate = selectedTaxRate ? selectedTaxRate.percentage / 100 : 0;
            }

            const salesTax = (finalTaxableSubtotal * salesTaxRate).toFixed(2);
            setInvoice((prev) => ({ ...prev, salestax: salesTax }));


            // Calculate invoice total
            const Total = (parseFloat(subtotal) + parseFloat(salesTax)).toFixed(2);
            setInvoice((prev) => ({ ...prev, total: Total }));

            // Calculate balance amount
            const deposit = parseFloat(invoice.deposit) || 0;
            const balanceAmount = (parseFloat(Total) - deposit).toFixed(2);
            setInvoice((prev) => ({ ...prev, balanceamount: balanceAmount }));
      }, [productDetails, invoice.discount, invoice.discountMode, invoice.taxrates_id, invoice.salestaxes_id, invoice.customRate, invoice.deposit]);
      useEffect(() => {
            updateCalculations();
      }, [productDetails, invoice.discount, invoice.discountMode, invoice.taxrates_id, invoice.deposit, updateCalculations]);



      const handleSubmit = async (e) => {
            e.preventDefault();

            if (productDetails.length === 0) {
                  alert("Cannot submit invoice without products!");
                  return;
            }

            try {
                  const updatedSalesTaxId = await fetchSalesTaxId(invoice.city_id, invoice.state_id);

                  const invoiceData = {
                        ...invoice,
                        salestaxes_id: updatedSalesTaxId,
                        subtotal: parseFloat(invoice.subtotal) || 0.00,
                        discount: parseFloat(invoice.discount) || 0.00,
                        taxablesubtotal: parseFloat(invoice.taxablesubtotal) || 0.00,
                        taxrates_id: invoice.taxrates_id || null,
                        salestax: parseFloat(invoice.salestax) || 0.00,
                        total: parseFloat(invoice.total) || 0.00,
                        deposit: parseFloat(invoice.deposit) || 0.00,
                        paycheckto: invoice.paycheckto || "",
                        balanceamount: parseFloat(invoice.balanceamount) || 0.00,
                        products: productDetails.map((product) => ({
                              productid: product.productid || null, // Ensure ID is included
                              name: product.name,
                              description: product.description || "",
                              qty: Number(product.qty) || 1,
                              salesprice: parseFloat(product.salesprice) || 0.00,
                              amount: parseFloat(product.amount) || 0.00,
                              salestaxes_id: product.isBundle ? 0 : updatedSalesTaxId,
                        })),
                        invoicewithouttax: invoiceWithoutTax.map((item, index) => ({
                              id: item.id || index + 1,
                              descriptionwot: item.descriptionwot || "",
                              pricewot: parseFloat(item.pricewot) || 0.00,
                        }))
                  };

                  const response = await axios.post('http://localhost:8080/invoices/updateinvoicewithpro', invoiceData);
                  console.log("Server Response:", response.data);
                  alert('Invoice saved successfully!');
            } catch (error) {
                  console.error('Error saving invoice:', error);
                  if (error.response) {
                        console.error('Server Response:', error.response.data);
                  }
                  alert('Failed to save invoice.');
            }
      };




      const handleToggleDiscountMode = () => {
            setInvoice((prev) => ({
                  ...prev,
                  discountMode: !prev.discountMode,
                  discount: '',
            }));
      };

      const handleProductSearch = (e, index) => {
            const searchTerm = e.target.value.toLowerCase();
            setActiveSearchIndex(index);

            // Ensure filtering is done on the 'name' property
            const filtered = products.filter((product) =>
                  product.name && product.name.toLowerCase().startsWith(searchTerm)
            );
            setFilteredProducts(filtered);



            const updatedProductDetails = [...productDetails];
            updatedProductDetails[index].name = searchTerm;  // Update name in the productDetails state
            setProductDetails(updatedProductDetails);
      };


      const handleSelectProduct = (selectedProductName, index) => {
            const selectedProductData = products.find(p => p.name === selectedProductName);
            if (!selectedProductData) return;

            setProductDetails((prevDetails) => {
                  const updatedDetails = [...prevDetails];
                  updatedDetails[index] = {
                        ...updatedDetails[index],
                        productid: selectedProductData.id, // Ensure productid is assigned
                        name: selectedProductData.name,
                        description: selectedProductData.description || '',
                        salesprice: selectedProductData.salesprice || '0.00',
                        qty: 1,
                        amount: (1 * parseFloat(selectedProductData.salesprice || 0)).toFixed(2),
                        salestaxes_id: selectedProductData.salestaxes_id || localStorage.getItem('salestaxes_id') || 0,
                        salestaxes_checked: selectedProductData.salestaxes_id !== "0",
                  };
                  return updatedDetails;
            });

            fetchProductOrBundleDetails(selectedProductData.name, index);
            setActiveSearchIndex(null);
      };





      return (
            <form onSubmit={handleSubmit} className={`edit-invoice-form-container ${isOpen ? 'open' : ''}`}>
                  <h2>EDIT INVOICE FORM</h2>

                  <div className="edit-invoice-form-first-section">
                        <div>
                              <label>Order Type:</label>
                              <input type="text" value={invoice.ordertype} readOnly />
                        </div>
                        <div>
                              <label htmlFor="customerdisplayname_id">Customer Name:</label>
                              <input
                                    type="text"
                                    id="customerdisplayname_id"
                                    name="customerdisplayname_id"
                                    value={invoice.customerdisplayname_id}
                                    onChange={handleChange}
                                    readOnly
                              />
                        </div>
                        <div>
                              <label htmlFor="email">Email:</label>
                              <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={invoice.email}
                                    onChange={handleChange}
                                    required
                              />
                        </div>
                        <div>
                              <label>CC:</label>
                              <input type="text" name="cc" value={invoice.cc} onChange={handleChange} />
                        </div>
                        <div>
                              <label>BCC:</label>
                              <input type="text" name="bcc" value={invoice.bcc} onChange={handleChange} />

                        </div>
                  </div>


                  <div className="edit-invoice-form-second-section">
                        <div className='edit-invoice-form-second-left'>
                              <label htmlFor="billto">Bill To:</label>
                              <input
                                    type="text"
                                    id="billto"
                                    name="billto"
                                    value={invoice.billto}
                                    onChange={handleChange}
                              />
                        </div>
                        <div className='edit-invoice-form-second-left'>
                              <label htmlFor="shipto">Ship To:</label>
                              <input
                                    type="text"
                                    id="shipto"
                                    name="shipto"
                                    value={invoice.shipto}
                                    onChange={handleChange}
                              />
                        </div>
                        <div className='edit-invoice-form-second-right'>

                              <label>Ship Via:</label>
                              <input type="text" name="shipvia" value={invoice.shipvia} onChange={handleChange} />


                              <label>Shipping Date:</label>
                              <input type="date" name="shippingdate" value={invoice.shippingdate} onChange={handleChange} />


                              <label>Tracking No:</label>
                              <input type="text" name="trackingno" value={invoice.trackingno} onChange={handleChange} />


                        </div>
                        <div className='edit-invoice-form-second-right'>

                              <label htmlFor="terms_id">Terms:</label>
                              <select name="terms_id" value={invoice.terms_id} onChange={handleChange}>
                                    <option value="">Select Terms</option>
                                    {terms.map(terms => (
                                          <option key={terms.id} value={terms.name}>{terms.name}</option>
                                    ))}
                              </select>


                              <label>Invoice Date:</label>
                              <input type="date" name="invoicedate" value={invoice.invoicedate} onChange={handleChange} />


                              <label>Due Date:</label>
                              <input type="date" name="duedate" value={invoice.duedate} onChange={handleChange} />


                        </div>

                  </div>


                  <div className='edit-invoice-form-third-section'>

                        <label htmlFor="status_id">Status:</label>
                        <select name="status_id" value={invoice.status_id} onChange={handleChange}>
                              <option value="">Select Status</option>
                              {status.map(s => (
                                    <option key={s.id} value={s.name}>{s.name}</option>
                              ))}
                        </select>



                        <label htmlFor="franchiseowner_id">Franchise Owner:</label>
                        <input
                              type="text"
                              id="franchiseowner_id"
                              name="franchiseowner_id"
                              value={invoice.franchiseowner_id}
                              readOnly // Make the field read-only
                        />


                        <label>Processed On:</label>
                        <input type="date" name="processedon" value={invoice.processedon} onChange={handleChange} />


                        <label>Terms and Conditions:</label>
                        <textarea name="termsandconditions" value={invoice.termsandconditions} onChange={handleChange}></textarea>


                        <label htmlFor="state_id">State:</label>
                        <select name="state_id" value={invoice.state_id} onChange={handleCityOrStateChange}>
                              <option value="">Select State</option>
                              {states.map(state => (
                                    <option key={state.id} value={state.name}>{state.name}</option>
                              ))}
                        </select>


                        <label htmlFor="city_id">City:</label>
                        <select name="city_id" value={invoice.city_id} onChange={handleCityOrStateChange}>
                              <option value="">Select City</option>
                              {cities.map(city => (
                                    <option key={city.id} value={city.name}>{city.name}</option>
                              ))}
                        </select>






                        <label htmlFor="createddate">Created Date:</label>
                        <input
                              type="date"
                              id="createddate"
                              name="createddate"
                              value={invoice.createddate}
                              onChange={handleChange}
                              readOnly // Use readOnly if it should not be edited
                        />


                  </div>


                  <div className="edit-invoice-form-section-product-table">
                        <table>
                              <thead>
                                    <tr>
                                          <th>ProductID</th>
                                          <th>Product</th>
                                          <th>Description</th>
                                          <th>Qty</th>
                                          <th>Price</th>
                                          <th>Sales Taxes ID</th>
                                          <th>Amount</th>

                                          <th>Actions</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {productDetails.map((product, index) => (
                                          <tr key={index}>
                                                <td>
                                                      <input
                                                            type="number"
                                                            name="productid"
                                                            value={product.productid || ''} // Ensure productid is displayed
                                                            readOnly
                                                      />
                                                </td>


                                                <td>
                                                      <input
                                                            type="text"
                                                            value={product.name}
                                                            onChange={(e) => handleProductSearch(e, index)}
                                                            placeholder="Search Product"
                                                      />
                                                      {index === activeSearchIndex && (
                                                            <div className="product-search-results">
                                                                  <ul>
                                                                        {filteredProducts.map((filteredProduct, idx) => (
                                                                              <li key={idx} onClick={() => handleSelectProduct(filteredProduct.name, index)}>
                                                                                    {filteredProduct.id} - {filteredProduct.name} {/* Display ID for clarity */}
                                                                              </li>
                                                                        ))}


                                                                  </ul>

                                                            </div>
                                                      )}
                                                </td>
                                                <td>
                                                      <input
                                                            type="text"
                                                            name="description"
                                                            value={product.description}
                                                            onChange={(e) => handleProductChange(e, index)}
                                                            readOnly
                                                      />
                                                </td>
                                                <td>
                                                      <input
                                                            type="number"
                                                            name="qty"
                                                            value={product.qty}
                                                            onChange={(e) => handleProductChange(e, index)}
                                                      />
                                                </td>
                                                <td>
                                                      <input
                                                            type="text"
                                                            name="salesprice"
                                                            value={product.salesprice}
                                                            onChange={(e) => handleProductChange(e, index)}
                                                      />
                                                </td>
                                                <td>
                                                      <input
                                                            type="checkbox"
                                                            checked={product.salestaxes_checked}
                                                            onChange={() => handleCheckboxChange(index)}
                                                            disabled={product.isBundle} // Disable for bundle rows
                                                      />
                                                      {/* <label>{product.salestaxes_id}</label> */}

                                                </td>
                                                <td>
                                                      <input
                                                            type="text"
                                                            value={product.amount}
                                                            readOnly
                                                      />
                                                </td>



                                                <td>
                                                      <button className='edit-invoice-form-product-button' type="button" onClick={() => handleDeleteProduct(index)}>
                                                            Delete
                                                      </button>
                                                </td>
                                          </tr>
                                    ))}
                              </tbody>
                        </table>
                        <button className='edit-invoice-form-product-button' type="button" onClick={handleAddProductRow}>Add Product</button>
                  </div>

                  <div className="edit-invoice-form-fourth-section">

                        <div>
                              <div className='edit-invoice-form-fourth-left'>
                                    <label>Paycheck To:</label>
                                    <input type="text" name="paycheckto" value={invoice.paycheckto} onChange={handleChange} />
                              </div>
                              <div className='edit-invoice-form-fourth-left'>
                                    <label>Note to Customer:</label>
                                    <textarea name="notetocustomer" value={invoice.notetocustomer} onChange={handleChange}></textarea>
                              </div>
                              <div className='edit-invoice-form-fourth-left'>
                                    <label>Internal Customer Notes:</label>
                                    <textarea name="internalcustomernotes" value={invoice.internalcustomernotes} onChange={handleChange}></textarea>
                              </div>
                              <div className='edit-invoice-form-fourth-left'>
                                    <label>Memo on Statement:</label>
                                    <textarea name="memoonstatement" value={invoice.memoonstatement} onChange={handleChange}></textarea>
                              </div>
                        </div>

                        <div className='edit-invoice-form-fourth-right'>

                              <label>Subtotal:</label>
                              <input type="text" value={invoice.subtotal} readOnly />

                              <label>Discount Mode:</label>
                              <div className="edit-invoice-form-toggle-switch">
                                    <label className="edit-invoice-form-switch">
                                          <input
                                                type="checkbox"
                                                checked={invoice.discountMode}
                                                onChange={handleToggleDiscountMode}
                                          />
                                          <span className="edit-invoice-form-slider"></span>
                                    </label>
                                    <span>{invoice.discountMode ? 'Discount (%)' : 'Amount'}</span>
                              </div>


                              <label htmlFor="discount">{invoice.discountMode ? 'Discount (%)' : 'Discount (Amount)'}:</label>
                              <input
                                    type="text"
                                    id="discount"
                                    name="discount"
                                    value={invoice.discount}
                                    onChange={handleChange}
                              />





                              {/* <div>
  <button
    type="button"
    onClick={() => setShowInvoiceWithoutTax((prev) => !prev)}
  >
    Add
  </button>
</div> */}




                              {/* {showInvoiceWithoutTax && ( */}
                              <div>
                                    <table>
                                          <thead>
                                                <tr>
                                                      <th>Description</th>
                                                      <th>Price</th>
                                                      <th>Actions</th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {invoiceWithoutTax.map((row, index) => (
                                                      <tr key={index}>
                                                            <td>
                                                                  <input
                                                                        type="text"
                                                                        value={row.descriptionwot}
                                                                        onChange={(e) =>
                                                                              handleInvoiceWithoutTaxChange(index, 'descriptionwot', e.target.value)
                                                                        }
                                                                  />
                                                            </td>
                                                            <td>
                                                                  <input
                                                                        type="number"
                                                                        value={row.pricewot}
                                                                        onChange={(e) =>
                                                                              handleInvoiceWithoutTaxChange(index, 'pricewot', e.target.value)
                                                                        }
                                                                  />
                                                            </td>
                                                            <td>
                                                                  <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                              setInvoiceWithoutTax((prev) =>
                                                                                    prev.filter((_, i) => i !== index)
                                                                              )
                                                                        }
                                                                  >
                                                                        Delete
                                                                  </button>
                                                            </td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                                    <button type="button" onClick={handleAddInvoiceWithoutTaxRow}>
                                          Add Row
                                    </button>
                              </div>

                              {/* )} */}



                              <label>Taxable Subtotal:</label>
                              <input type="text" value={invoice.taxablesubtotal} readOnly />





                              <label>Tax Rate:</label>
                              <div style={{ gridColumn: 'span 2' }}>
                                    <select name="taxrates_id" value={invoice.taxrates_id} onChange={handleChange}>
                                          <option value="">Select Tax Rate</option>
                                          {taxRates.map(tax => (
                                                <option key={tax.id} value={tax.name}>{tax.name} ({tax.percentage}%)</option>
                                          ))}
                                          <option className="edit-invoice-form-custom-rates" value="custom rates">Custom Rates</option>
                                    </select>

                                    {invoice.taxrates_id === 'custom rates' && (
                                          <input
                                                type="number"
                                                name="customRate"
                                                value={invoice.customRate}
                                                onChange={handleChange}
                                                placeholder="Enter custom rate"
                                          />
                                    )}
                              </div>


                              <label>Sales Tax:</label>
                              <input type="text" value={invoice.salestax} readOnly />


                              <label>Total:</label>
                              <input type="text" value={invoice.total} readOnly />


                              <label htmlFor="deposit">Deposit:</label>
                              <input
                                    type="text"
                                    id="deposit"
                                    name="deposit"
                                    value={invoice.deposit}
                                    onChange={handleChange}
                              />



                              <label>Balance Amount:</label>
                              <input type="text" value={invoice.balanceamount} readOnly />


                        </div>

                  </div>

                  <div className='edit-invoice-form-submit-button'>
                        <button type="submit">Submit Invoice</button>
                        <button type="button" onClick={handleNavigateToSendEmail}>Send Email</button>
                  </div>

                  <form>

                  </form>

            </form>
      );
};

export default InvoiceForm;