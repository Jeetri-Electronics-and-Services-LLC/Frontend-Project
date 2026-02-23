// import React, { useState } from 'react'; 
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// const Login = ({ setIsAuthenticated, setPermissions }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isUsernameValid, setIsUsernameValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleUsernameSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8080/users/checkusername', { username });
//       if (response.status === 200) {
//         setIsUsernameValid(true);
//         setErrorMessage('');
//       }
//     } catch (error) {
//       setErrorMessage('Invalid username');
//     }
//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const loginResponse = await axios.post('http://localhost:8080/users/login', { username, password });
//       if (loginResponse.status === 200) {
//         localStorage.setItem('username', username);
        
//         const userIdResponse = await axios.post('http://localhost:8080/users/getuserid', { username });
//         const userId = userIdResponse.data.userId;

//         if (userId) {
//           localStorage.setItem('userId', userId);
//         } else {
//           throw new Error('User ID not found');
//         }

//         const userDetailsResponse = await axios.post('http://localhost:8080/users/user/details', { userId });
//         const { rolePermissions } = userDetailsResponse.data;

//         if (!rolePermissions || Object.keys(rolePermissions).length === 0) {
//           throw new Error('Invalid or missing rolePermissions');
//         }

//         const roleIds = Object.keys(rolePermissions);
//         if (roleIds.length === 0) {
//           throw new Error('Invalid or missing role ID');
//         }
//         const roleId = roleIds[0]; 

//         const permissions = rolePermissions[roleId];
//         if (!permissions) {
//           throw new Error('Invalid or missing permissions for the role ID');
//         }

//         console.log('Permissions:', permissions);

//         setPermissions(permissions);
//         setIsAuthenticated(true);
//         setErrorMessage('');

//         navigate('/');
//       }
//     } catch (error) {
//       console.error(error);
//       setErrorMessage('Invalid credentials or error fetching details');
//     }
//   };

//   return (
//     <div className='login-container'>
//       <h2>Login</h2>
//       {!isUsernameValid ? (
//         <form onSubmit={handleUsernameSubmit}>
//           <div className='login-name'>
//             <label>Username:</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => {
//                 setUsername(e.target.value);
//                 setErrorMessage(''); 
//               }}
//               required
//             />
//           </div>
//           <div className='login-button'>
//             <button type="submit">Next</button>
//           </div>
//           {errorMessage && <p>{errorMessage}</p>}
//         </form>
//       ) : (
//         <form onSubmit={handlePasswordSubmit}>
//           <div className='login-password'>
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 setErrorMessage('');
//               }}
//               required
//             />
//           </div>
//           <div className='login-submit'>
//             <button type="submit">Login</button>
//           </div>
//           {errorMessage && <p>{errorMessage}</p>}
//         </form>
//       )}
//     </div>
//   );
// };

// export default Login;






// Multifactor authentication
// import React, { useState } from 'react';   
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// const Login = ({ setIsAuthenticated, setPermissions }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isUsernameValid, setIsUsernameValid] = useState(false);
//   const [isPasswordValid, setIsPasswordValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleUsernameSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8080/users/checkusername', { username });
//       if (response.status === 200) {
//         setIsUsernameValid(true);
//         setErrorMessage('');
//       }
//     } catch (error) {
//       setErrorMessage('Invalid username');
//     }
//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const loginResponse = await axios.post('http://localhost:8080/users/login', { username, password });
//       if (loginResponse.status === 200) {
//         setIsPasswordValid(true);
//         setErrorMessage('');

//         // Generate OTP
//         await axios.post('http://localhost:8080/otp/generateotp', { username, password });
//       }
//     } catch (error) {
//       setErrorMessage('Invalid credentials');
//     }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Validate OTP
//       const otpResponse = await axios.post('http://localhost:8080/otp/validateotp', { otp });
//       const responseMessage = otpResponse.data;

//       if (responseMessage === 'OTP validated successfully') {
//         // Fetch and store user details
//         const userIdResponse = await axios.post('http://localhost:8080/users/getuserid', { username });
//         const userId = userIdResponse.data.userId;

//         if (userId) {
//           localStorage.setItem('userId', userId);
//         } else {
//           throw new Error('User ID not found');
//         }

//         const userDetailsResponse = await axios.post('http://localhost:8080/users/user/details', { userId });
//         const { rolePermissions } = userDetailsResponse.data;

//         if (!rolePermissions || Object.keys(rolePermissions).length === 0) {
//           throw new Error('Invalid or missing rolePermissions');
//         }

//         const roleId = Object.keys(rolePermissions)[0];
//         const permissions = rolePermissions[roleId];

//         if (!permissions) {
//           throw new Error('Invalid or missing permissions for the role ID');
//         }

//         setPermissions(permissions);
//         setIsAuthenticated(true);
//         setErrorMessage('');

//         navigate('/');
//       } else {
//         setErrorMessage(responseMessage);
//       }
//     } catch (error) {
//       setErrorMessage(error.response?.data || 'Error validating OTP');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       {!isUsernameValid ? (
//         <form onSubmit={handleUsernameSubmit}>
//           <div className="login-name">
//             <label>Username:</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => {
//                 setUsername(e.target.value);
//                 setErrorMessage('');
//               }}
//               required
//             />
//           </div>
//           <div className="login-button">
//             <button type="submit">Next</button>
//           </div>
//           {errorMessage && <p>{errorMessage}</p>}
//         </form>
//       ) : !isPasswordValid ? (
//         <form onSubmit={handlePasswordSubmit}>
//           <div className="login-password">
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 setErrorMessage('');
//               }}
//               required
//             />
//           </div>
//           <div className="login-submit">
//             <button type="submit">Login</button>
//           </div>
//           {errorMessage && <p>{errorMessage}</p>}
//         </form>
//       ) : (
//         <form onSubmit={handleOtpSubmit}>
//           <div className="login-otp">
//             <label>OTP:</label>
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => {
//                 setOtp(e.target.value);
//                 setErrorMessage('');
//               }}
//               required
//             />
//           </div>
//           <div className="otp-submit">
//             <button type="submit">Verify OTP</button>
//           </div>
//           {errorMessage && <p>{errorMessage}</p>}
//         </form>
//       )}
//     </div>
//   );
// };

// export default Login;




//sahithi
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setIsAuthenticated, setPermissions }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/users/checkusername/${username}`);
      if (response.status === 200) {
        setIsUsernameValid(true);
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('Invalid username');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await axios.post('http://localhost:8080/users/login', { username, password });
      if (loginResponse.status === 200) {
        localStorage.setItem('username', username);
  
        const userIdResponse = await axios.get(`http://localhost:8080/users/getuserid/${username}`);
        const userId = userIdResponse.data.userId;
        localStorage.setItem('userId', userId);
  
        const userDetailsResponse = await axios.get(`http://localhost:8080/users/user/${userId}/details`);
        const { role, rolePermissions } = userDetailsResponse.data;
        localStorage.setItem('role', role);
  
        // Apply trim() to all permissions
        const roleIds = Object.keys(rolePermissions);
        let permissions = rolePermissions[roleIds[0]] || [];
        permissions = permissions.map(permission => permission.trim()); 
  
        localStorage.setItem('permissions', JSON.stringify(permissions));
        setPermissions(permissions);
        setIsAuthenticated(true);
        navigate('/'); // Redirect to home/dashboard
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Invalid credentials or error fetching details');
    }
  };
  
  

  return (
    <div className='login-container'>
      <h2>Login</h2>
      {!isUsernameValid ? (
        <form onSubmit={handleUsernameSubmit}>
          <div className='login-name'>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrorMessage(''); // Clear error message when typing
              }}
              required
            />
          </div>
          <div className='login-button'>
            <button type="submit">Next</button>

          </div>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit}>
          <div className='login-password'>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage(''); // Clear error message when typing
              }}
              required
            />
          </div>
          <div className='login-submit'>
            <button type="submit">Login</button>
          </div>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      )}
    </div>
  );
};

export default Login;