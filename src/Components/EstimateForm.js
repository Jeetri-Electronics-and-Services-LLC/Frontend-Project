import React, { useState, useEffect, useCallback } from 'react';


import { useLocation } from 'react-router-dom';


import axios from 'axios';
import './EstimateForm.css';


const EstimateForm = ({isOpen}) => {
  const locations = useLocation();
  const customerData = locations.state || {};
  console.log("Received customer data in EstimateForm:", customerData);
  const ordertype = customerData.ordertype || 'estimate';


  // Retrieve passed customer data


  const [estimate, setEstimate] = useState({
    ordertype: '', // New field added
    customerdisplayname_id: '',
    email: '',
    cc: '',
    bcc: '',
    billto: '',
    shipto: '',
    acceptedby: '',
    estimatedate: '',
    status_id: '',
    franchiseowner_id: localStorage.getItem('username'),

    createddate: new Date().toISOString().split('T')[0], // Set today's date as default
    city_id: '',
    state_id: '',

    subtotal: '0.00',
    discount: '',
    discountMode: true, // true for percentage, false for fixed amount
    taxablesubtotal: '',
    taxrates_id: '',
    salestax: '',
    total: '',
    paycheckto: '',
    notetocustomer: '',
    internalcustomernotes: '',
    memoonstatement: '',
    customRate: '', // New field for custom rate
  });

  useEffect(() => {
    // Update the franchiseowner_id if the username in localStorage changes
    const storedUsername = localStorage.getItem('username') || 'default';
    setEstimate((prev) => ({ ...prev, franchiseowner_id: storedUsername }));
  }, []);

  const [orderTypes, setOrderTypes] = useState([]); // New state for order types




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


  const [estimateProductDetails, setestimateProductDetails] = useState([
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
  const [estimateWithoutTax, setEstimateWithoutTax] = useState([]);
  const [showEstimateWithoutTax, setShowEstimateWithoutTax] = useState(false);


  const username = localStorage.getItem('username') || 'default';


  useEffect(() => {
    if (customerData) {
      setEstimate((prev) => ({
        ...prev,
        customerdisplayname_id: customerData.customerdisplayname,
        email: customerData.emailid,
        billto: customerData.billto,
        shipto: customerData.shipto,
        ordertype: customerData.ordertype || 'Estimate'


      }));
    }
  }, [customerData]);



  useEffect(() => {
    fetchProducts();
    fetchDropdownData();


    fetchFranchiseOwners();
  }, []);



  useEffect(() => {
    // Fetch recent "Note to Customer" description from backend
    const fetchNoteToCustomer = async () => {
      try {
        const response = await axios.post('http://localhost:8080/termsandconditions/get-recent-description');
        const recentDescription = response.data.description || ''; // Adjust based on API response structure
        setEstimate((prev) => ({ ...prev, notetocustomer: recentDescription }));
      } catch (error) {
        console.error('Error fetching note to customer:', error);
      }
    };

    fetchNoteToCustomer();
  }, []);




  useEffect(() => {
    // Calculate subtotal, excluding bundle headers
    const subtotal = estimateProductDetails
      .filter((product) => !product.isBundle) // Exclude bundle headers
      .reduce((acc, product) => acc + parseFloat(product.amount || 0), 0);


    // Update subtotal in the invoice state
    setEstimate((prev) => ({ ...prev, subtotal: subtotal.toFixed(2) }));
  }, [estimateProductDetails]); // Run this whenever productDetails changes


  // Add this useEffect in your component
  useEffect(() => {
    // Calculate taxable subtotal by excluding bundle headers and unchecked products
    const filteredProducts = estimateProductDetails
      .filter((product) => !product.isBundle && product.salestaxes_checked); // Exclude bundle headers and unchecked products


    // Sum the amounts of the filtered products
    const subtotal = filteredProducts.reduce((acc, product) => acc + parseFloat(product.amount || 0), 0);


    // Calculate discount
    const discountValue = parseFloat(estimate.discount) || 0;
    const discountAmount = estimate.discountMode
      ? (subtotal * (discountValue / 100)).toFixed(2) // Percentage discount
      : discountValue.toFixed(2); // Fixed amount discount


    // Calculate taxable subtotal
    const taxableSubtotal = (subtotal - discountAmount).toFixed(2);


    // Update taxable subtotal in the invoice state
    setEstimate((prev) => ({ ...prev, taxablesubtotal: taxableSubtotal }));
  }, [estimateProductDetails, estimate.discount, estimate.discountMode]); // Dependencies to re-trigger calculation




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


      const statusResponse = await axios.post('http://localhost:8080/estimatestatuses/getAllestimatestatuses');
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
      setEstimate((prev) => ({ ...prev, salestaxes_id: defaultSalesTaxRate }));
      localStorage.setItem('salestaxes_id', defaultSalesTaxRate);
      updateCalculations();
    };


    fetchDefaultSalesTax();
  }, []);




  const fetchSalesTaxId = async (city = "", state = "") => {
    try {
      const response = await axios.post('http://localhost:8080/salestaxes/findsalestax', {
        city,
        state,
      });
      const salesTaxPercentage = parseFloat(response.data.replace('%', ''));
      return salesTaxPercentage / 100; // Convert to decimal format (e.g., 8.25% -> 0.0825)
    } catch (error) {
      console.error('Error fetching sales tax:', error);
      return 0;
    }
  };




  const handleCityOrStateChange = async (e) => {
    const { name, value } = e.target;
    setEstimate((prev) => ({ ...prev, [name]: value }));


    // Check if both city and state are selected
    const selectedCity = name === 'city_id' ? value : estimate.city_id;
    const selectedState = name === 'state_id' ? value : estimate.state_id;


    // Fetch sales tax rate based on selected city and state, or get default value
    const salesTaxRate = await fetchSalesTaxId(selectedCity, selectedState);


    // Store in local storage and update invoice state
    localStorage.setItem('salestaxes_id', salesTaxRate);
    setEstimate((prev) => ({ ...prev, salestaxes_id: salesTaxRate }));


    // Trigger recalculation of sales tax based on new rate
    updateCalculations();
  };



  const [isSalesTaxChecked, setIsSalesTaxChecked] = useState(false);
  const salesTaxId = localStorage.getItem('salestaxes_id');


  const handleSalesTaxCheckbox = (index) => {
    setestimateProductDetails((prevDetails) =>
      prevDetails.map((product, i) =>
        i === index
          ? { ...product, isSalesTaxChecked: !product.isSalesTaxChecked }
          : product
      )
    );
  };


  const handleCheckboxChange = (index) => {
    setestimateProductDetails((prevDetails) =>
      prevDetails.map((product, i) =>
        i === index ? { ...product, salestaxes_checked: !product.salestaxes_checked } : product
      )
    );
  };



  const handleCustomerChange = async (e) => {
    const selectedName = e.target.value;
    setEstimate((prev) => ({ ...prev, customerdisplayname_id: selectedName }));


    if (selectedName) {
      try {
        const response = await axios.get(`http://localhost:8080/customers/customers/displayname/${selectedName}`);
        const customerData = response.data;


        setEstimate((prev) => ({
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
    setEstimate((prev) => ({
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
    const updatedestimateProductDetails = [...estimateProductDetails];


    // Update the field that was changed (either qty or salesprice)
    updatedestimateProductDetails[index][name] = value;


    // Recalculate the amount as qty * salesprice
    const qty = parseFloat(updatedestimateProductDetails[index].qty) || 0;
    const salesprice = parseFloat(updatedestimateProductDetails[index].salesprice) || 0;
    const amount = (qty * salesprice).toFixed(2);
    updatedestimateProductDetails[index].amount = amount;


    setestimateProductDetails(updatedestimateProductDetails);
    updateCalculations(); // Recalculate totals if needed
  };




  const fetchProductOrBundleDetails = async (productName, index) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/productbundle/displaydetailsbasedonname',
        { bundleproductName: productName }
      );
      const productData = response.data;
      const updatedestimateProductDetails = [...estimateProductDetails];




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
        // Calculate the initial bundle price
        const bundlePrice = productData.products.reduce(
          (total, bundleProduct) => total + parseFloat(bundleProduct.productSalesprice || 0), 0
        );



        // Set up the bundle heading as a "parent" item
        updatedestimateProductDetails[index] = {
          productid: productData.bundleId,
          name: productData.bundleName,  // ✅ Ensure name is set
          description: productData.bundleDescription || '',
          salesprice: bundlePrice.toFixed(2),
          amount: bundlePrice.toFixed(2),
          isBundle: true,
          bundleId: `bundle-${index}`,
          salestaxes_checked: false,
        };




        // Add each product within the bundle with a reference to the bundle ID
        productData.products.forEach((bundleProduct) => {

          updatedestimateProductDetails.push({
            productid: bundleProduct.productId,
            name: bundleProduct.productName,  // ✅ Ensure name is set
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
        updatedestimateProductDetails[index] = {
          productid: productData.id,  // ✅ Ensure productId is stored
          name: productData.name || productName,  // ✅ Ensure name is stored
          description: productData.description || '',
          salesprice: productData.salesprice || '0.00',
          amount: (1 * parseFloat(productData.salesprice || 0)).toFixed(2),
          isBundle: false,
        };
      }



      setestimateProductDetails(updatedestimateProductDetails);
    } catch (error) {
      console.error('Error fetching product or bundle details:', error);
    }
  };

  const handleAddProductRow = async () => {
    let salesTaxId = localStorage.getItem('salestaxes_id');


    // Fetch salestaxes_id based on city/state if it's not available in local storage
    if (!salesTaxId && estimate.city_id && estimate.state_id) {
      salesTaxId = await fetchSalesTaxId(estimate.city_id, estimate.state_id);
      localStorage.setItem('salestaxes_id', salesTaxId); // Store in local storage for future use
    }


    setestimateProductDetails((prevDetails) => [
      ...prevDetails,
      {
        productid: '',
        name: '',
        description: '',
        qty: 1,
        salesprice: '0.00',
        amount: '0.00',
        salestaxes_id: salesTaxId,
        salestaxes_checked: true, // Default to checked
      },
    ]);
  };




  const handleDeleteProduct = (index) => {
    const updatedProducts = [...estimateProductDetails];
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


    setestimateProductDetails(updatedProducts);
    updateCalculations(); // Recalculate the invoice totals after deletion
  };



  const handleAddEstimateWithoutTaxRow = () => {
    setEstimateWithoutTax((prev) => [
      ...prev,
      { descriptionwot: '', pricewot: '0.00' },
    ]);
  };

  const handleEstimateWithoutTaxChange = (index, field, value) => {
    const updatedRows = [...estimateWithoutTax];
    updatedRows[index][field] = value;

    if (field === 'pricewot') {
      const pricewotSum = updatedRows.reduce(
        (acc, row) => acc + parseFloat(row.pricewot || 0),
        0
      );
      const updatedTaxableSubtotal = (
        parseFloat(estimate.taxablesubtotal || 0) + pricewotSum
      ).toFixed(2);
      setEstimate((prev) => ({
        ...prev,
        taxablesubtotal: updatedTaxableSubtotal,
      }));
    }

    setEstimateWithoutTax(updatedRows);
  };



  const updateCalculations = useCallback(() => {
    // Calculate subtotal excluding bundle headers
    const subtotal = estimateProductDetails
      .filter((product) => !product.isBundle) // Exclude bundle headers
      .reduce((acc, product) => acc + parseFloat(product.amount || 0), 0);
    setEstimate((prev) => ({ ...prev, subtotal: subtotal.toFixed(2) }));


    // Calculate taxable subtotal by excluding unchecked products and bundle headers
    const taxableSubtotal = estimateProductDetails
      .filter((product) => !product.isBundle && product.salestaxes_checked) // Exclude unchecked and bundle headers
      .reduce((acc, product) => acc + parseFloat(product.amount || 0), 0);


    // Apply discount
    const discountValue = parseFloat(estimate.discount) || 0;
    const discountAmount = estimate.discountMode
      ? (taxableSubtotal * (discountValue / 100)).toFixed(2) // Percentage discount
      : discountValue.toFixed(2); // Fixed amount discount


    const finalTaxableSubtotal = (taxableSubtotal - discountAmount).toFixed(2);
    setEstimate((prev) => ({ ...prev, taxablesubtotal: finalTaxableSubtotal }));


    // Determine the sales tax rate
    let salesTaxRate = 0;


    if (estimate.taxrates_id === 'custom rates') {
      // Use customRate if "custom rates" is selected
      salesTaxRate = parseFloat(estimate.customRate) / 100 || 0;
    } else if (estimate.taxrates_id === '' || estimate.taxrates_id === 'Automatic Calculation') {
      // Use the salestaxes_id from the estimate state
      salesTaxRate = estimate.salestaxes_id || 0;
    } else {
      const selectedTaxRate = taxRates.find((taxrate) => String(taxrate.name) === estimate.taxrates_id);
      salesTaxRate = selectedTaxRate ? selectedTaxRate.percentage / 100 : 0;
    }


    const salesTax = (finalTaxableSubtotal * salesTaxRate).toFixed(2);
    setEstimate((prev) => ({ ...prev, salestax: salesTax }));




    // Calculate invoice total
    const Total = (parseFloat(subtotal) + parseFloat(salesTax)).toFixed(2);
    setEstimate((prev) => ({ ...prev, total: Total }));


    // Calculate balance amount
    const deposit = parseFloat(estimate.deposit) || 0;
    const balanceAmount = (parseFloat(Total) - deposit).toFixed(2);
    setEstimate((prev) => ({ ...prev, balanceamount: balanceAmount }));
  }, [estimateProductDetails, estimate.discount, estimate.discountMode, estimate.taxrates_id, estimate.salestaxes_id, estimate.customRate, estimate.deposit]);
  useEffect(() => {
    updateCalculations();
  }, [estimateProductDetails, estimate.discount, estimate.discountMode, estimate.taxrates_id, estimate.deposit, updateCalculations]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure estimateProductDetails is never null
    const estimateData = {
      ...estimate,
      subtotal: parseFloat(estimate.subtotal) || 0.00,
      discount: parseFloat(estimate.discount) || 0.00,
      taxablesubtotal: parseFloat(estimate.taxablesubtotal) || 0.00,
      taxrates_id: estimate.taxrates_id || null,
      salestax: parseFloat(estimate.salestax) || 0.00,
      total: parseFloat(estimate.total) || 0.00,
      deposit: parseFloat(estimate.deposit) || 0.00,
      paycheckto: estimate.paycheckto || "",
      balanceamount: parseFloat(estimate.balanceamount) || 0.00,
      estimateProductDetails: estimateProductDetails.map((product) => ({
        productid: product.productid || null,
        name: product.name || '',
        description: product.description || '',
        qty: Number(product.qty) || 1,
        salesprice: parseFloat(product.salesprice) || 0.00,
        amount: parseFloat(product.amount) || 0.00,
        salestaxes_id: product.isBundle ? 0 : (product.salestaxes_id ? parseFloat(product.salestaxes_id) : parseFloat(localStorage.getItem('salestaxes_id')) || 0)

      })),
      estimateWithoutTax: estimateWithoutTax.map((row, index) => ({
        id: index + 1,
        descriptionwot: row.descriptionwot || '',
        pricewot: parseFloat(row.pricewot) || 0.00
      })),
    };

    console.log("Submitting estimate data:", estimateData);

    try {
      const response = await axios.post("http://localhost:8080/estimates/addestimate", estimateData);
      alert("Estimate saved successfully!");
      console.log("Estimate saved:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.data);
        alert(`Error: ${error.response.data.message || "Failed to save estimate"}`);
      } else if (error.request) {
        console.error("Request error:", error.request);
        alert("Error: No response received from the server.");
      } else {
        console.error("General error:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };



  const handleToggleDiscountMode = () => {
    setEstimate((prev) => ({
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


    const updatedestimateProductDetails = [...estimateProductDetails];
    updatedestimateProductDetails[index].name = searchTerm;  // Update name in the productDetails state
    setestimateProductDetails(updatedestimateProductDetails);
  };


  const handleSelectProduct = (selectedProductName, index) => {
    const selectedProductData = products.find(p => p.name === selectedProductName);
    if (!selectedProductData) return;

    // Define and copy the existing state before modifying it
    const updatedestimateProductDetails = [...estimateProductDetails];

    updatedestimateProductDetails[index] = {
      ...updatedestimateProductDetails[index],
      productid: selectedProductData.id || `temp-${Date.now()}`,
      name: selectedProductData.name || selectedProductName,  // ✅ Ensure name is set
      description: selectedProductData.description || '',
    };

    setestimateProductDetails(updatedestimateProductDetails);
    fetchProductOrBundleDetails(selectedProductName, index);  // Fetch and update the details
    setActiveSearchIndex(null);  // Hide the search list
  };




  return (
    <form onSubmit={handleSubmit} className={`estimate-form-container ${isOpen ? 'open' : ''}`}>
      <h2>Estimate Form</h2>


      <div className='estimate-form-first-section'>
        <div>
          <label>Order Type:</label>
          <input type="text" value={estimate.ordertype} readOnly />
        </div>
        <div>
          <label htmlFor="customerdisplayname_id">Customer Name:</label>
          <input
            type="text"
            id="customerdisplayname_id"
            name="customerdisplayname_id"
            value={estimate.customerdisplayname_id}
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
            value={estimate.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>CC:</label>
          <input type="text" name="cc" value={estimate.cc} onChange={handleChange} />
        </div>
        <div>
          <label>BCC:</label>
          <input type="text" name="bcc" value={estimate.bcc} onChange={handleChange} />
        </div>
      </div>




      <div className='estimate-form-second-section'>
        <div className='estimate-form-second-left'>
          <label htmlFor="billto">Bill To:</label>
          <input
            type="text"
            id="billto"
            name="billto"
            value={estimate.billto}
            onChange={handleChange}
          />
        </div>
        <div className='estimate-form-second-left'>
          <label htmlFor="shipto">Ship To:</label>
          <input
            type="text"
            id="shipto"
            name="shipto"
            value={estimate.shipto}
            onChange={handleChange}
          />
        </div>
        <div className='estimate-form-second-right'>


          <label>Acceptedby:</label>
          <input type="text" name="acceptedby" value={estimate.acceptedby} onChange={handleChange} />


          <label>Estimate Date:</label>
          <input type="date" name="estimatedate" value={estimate.estimatedate} onChange={handleChange} />
        </div>
      </div>



      <div className='estimate-form-third-section'>


        <label htmlFor="status_id">Status:</label>
        <select name="status_id" value={estimate.status_id} onChange={handleChange}>
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
          value={estimate.franchiseowner_id}
          readOnly // Make the field read-only
        />



        <label htmlFor="createddate">Created Date:</label>
        <input
          type="date"
          id="createddate"
          name="createddate"
          value={estimate.createddate}
          onChange={handleChange}
          readOnly // Use readOnly if it should not be edited
        />


        <label htmlFor="state_id">State:</label>
        <select name="state_id" value={estimate.state_id} onChange={handleCityOrStateChange}>
          <option value="">Select State</option>
          {states.map(state => (
            <option key={state.id} value={state.name}>{state.name}</option>
          ))}
        </select>



        <label htmlFor="city_id">City:</label>
        <select name="city_id" value={estimate.city_id} onChange={handleCityOrStateChange}>
          <option value="">Select City</option>
          {cities.map(city => (
            <option key={city.id} value={city.name}>{city.name}</option>
          ))}
        </select>





      </div>


      <div className="estimate-form-section-product-table">
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
            {estimateProductDetails.map((product, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="number"
                    name="productid"
                    value={product.productid} // Ensure this field displays the correct product ID
                    onChange={(e) => handleProductChange(e, index)}
                    readOnly // Prevent manual editing since it's selected from the list
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
                            {filteredProduct.name}
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
                  <button className='estimate-form-product-button' type="button" onClick={() => handleDeleteProduct(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className='estimate-form-product-button' type="button" onClick={handleAddProductRow}>Add Product</button>
      </div>


      <div className="estimate-form-fourth-section">


        <div>
          <div className='estimate-form-fourth-left'>
            <label>Paycheck To:</label>
            <input type="text" name="paycheckto" value={estimate.paycheckto} onChange={handleChange} />
          </div>


          <div className='estimate-form-fourth-left'>
            <label>Note to Customer:</label>
            <textarea
              name="notetocustomer"
              value={estimate.notetocustomer}
              onChange={(e) => setEstimate({ ...estimate, notetocustomer: e.target.value })}
            />
          </div>


          <div className='estimate-form-fourth-left'>
            <label>Internal Customer Notes:</label>
            <textarea name="internalcustomernotes" value={estimate.internalcustomernotes} onChange={handleChange}></textarea>
          </div>


          <div className='estimate-form-fourth-left'>
            <label>Memo on Statement:</label>
            <textarea name="memoonstatement" value={estimate.memoonstatement} onChange={handleChange}></textarea>
          </div>


        </div>


        <div className='estimate-form-fourth-right'>


          <label>Subtotal:</label>
          <input type="text" value={estimate.subtotal} readOnly />


          <label>Discount Mode:</label>
          <div className="estimate-form-toggle-switch">
            <label className="estimate-form-switch">
              <input
                type="checkbox"
                checked={estimate.discountMode}
                onChange={handleToggleDiscountMode}
              />
              <span className="estimate-form-slider"></span>
            </label>
            <span>{estimate.discountMode ? 'Discount (%)' : 'Amount'}</span>
          </div>


          <label htmlFor="discount">{estimate.discountMode ? 'Discount (%)' : 'Discount (Amount)'}:</label>
          <input
            type="text"
            id="discount"
            name="discount"
            value={estimate.discount}
            onChange={handleChange}
          />
          <div>
            <button
              type="button"
              onClick={() => setShowEstimateWithoutTax((prev) => !prev)}
            >
              Add
            </button>
          </div>


          {showEstimateWithoutTax && (
            <div>

              <tbody>
                {estimateWithoutTax.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={row.descriptionwot}
                        onChange={(e) =>
                          handleEstimateWithoutTaxChange(index, 'descriptionwot', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.pricewot}
                        onChange={(e) =>
                          handleEstimateWithoutTaxChange(index, 'pricewot', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          setEstimateWithoutTax((prev) =>
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

              <button type="button" onClick={handleAddEstimateWithoutTaxRow}>
                Add Row
              </button>
            </div>
          )}


          <label>Taxable Subtotal:</label>
          <input type="text" value={estimate.taxablesubtotal} readOnly />


          <label>Tax Rate:</label>
          <div style={{ gridColumn: 'span 2' }}>
            <select name="taxrates_id" value={estimate.taxrates_id} onChange={handleChange}>
              <option value="">Select Tax Rate</option>
              {taxRates.map(tax => (
                <option key={tax.id} value={tax.name}>{tax.name} ({tax.percentage}%)</option>
              ))}
              <option className="estimate-form-custom-rates" value="custom rates">Custom Rates</option>
            </select>

            {estimate.taxrates_id === 'custom rates' && (
              <input
                type="number"
                name="customRate"
                value={estimate.customRate}
                onChange={handleChange}
                placeholder="Enter custom rate"
              />
            )}
          </div>

          <label>Sales Tax:</label>
          <input type="text" value={estimate.salestax} readOnly />


          <label>Total:</label>
          <input type="text" value={estimate.total} readOnly />


        </div>


      </div>


      <div className='estimate-form-submit-button'>
        <button type="submit">Submit Estimate</button>
      </div>


    </form>
  );
};


export default EstimateForm;