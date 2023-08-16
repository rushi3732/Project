import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import api from 'src/api/api';

const AccountList = () => {
  const [rowData, setRowData] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    accountType: '',
    accountHolder: {
      firstName: '',
      lastName: '',
      contactInfo: {
        email: '',
        phone: ''
      }
    },
    balance: 0,
    // Add more properties here
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await api.get('/accounts');
      const accounts = response.data.data; // Extract the array of accounts
      setRowData(accounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const deleteAccount = async (accountId) => {
    try {
      await api.delete(`/accounts/${accountId}`);
      fetchAccounts();
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleCreateAccount = async () => {
    try {
      const response = await api.post('/saveaccounts', formData);
      fetchAccounts();
      setRowData((prevData) => [...prevData, response.data]);
      setShowCreateModal(false);
      setFormData({
        accountType: '',
        accountHolder: {
          firstName: '',
          lastName: '',
          contactInfo: {
            email: '',
            phone: ''
          }
        },
        balance: 0,
        // Add more properties here
      });
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };
  
  return (
    <div>
      <h2>Account List</h2>
      <Button variant="primary" onClick={() => setShowCreateModal(true)}>
        Create Account
      </Button>
      <Table className='mt-2' striped bordered hover>
        <thead>
          <tr>
            <th>Account Number</th>
            <th>Account Type</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Balance</th>
            {/* Add more columns here */}
          </tr>
        </thead>
        <tbody>
          {rowData.map((account, index) => (
            <tr key={account._id}>
              <td>{account.accountNumber}</td>
              <td>{account.accountType}</td>
              <td>{account.accountHolder.firstName}</td>
              <td>{account.accountHolder.lastName}</td>
              <td>{account.accountHolder.contactInfo.email}</td>
              <td>{account.accountHolder.contactInfo.phone}</td>
              <td>{account.balance}</td>
              {/* Add more cells for other properties */}
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Account Type */}
            <Form.Group controlId="accountType">
              <Form.Label>Account Type</Form.Label>
              <Form.Control
                type="text"
                name="accountType"
                value={formData.accountType}
                onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                required
              />
            </Form.Group>
            {/* Account Holder */}
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.accountHolder.firstName}
                onChange={(e) => setFormData({
                  ...formData,
                  accountHolder: { ...formData.accountHolder, firstName: e.target.value }
                })}
                required
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.accountHolder.lastName}
                onChange={(e) => setFormData({
                  ...formData,
                  accountHolder: { ...formData.accountHolder, lastName: e.target.value }
                })}
                required
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.accountHolder.contactInfo.email}
                onChange={(e) => setFormData({
                  ...formData,
                  accountHolder: {
                    ...formData.accountHolder,
                    contactInfo: { ...formData.accountHolder.contactInfo, email: e.target.value }
                  }
                })}
                required
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.accountHolder.contactInfo.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  accountHolder: {
                    ...formData.accountHolder,
                    contactInfo: { ...formData.accountHolder.contactInfo, phone: e.target.value }
                  }
                })}
                required
              />
            </Form.Group>
            {/* Other account properties */}
            {/* ... */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateAccount}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AccountList;



// import React, { useState, useEffect } from 'react';
// import { Button, Modal, Form,Table } from 'react-bootstrap';
// import api from 'src/api/api';

// const AccountList = () => {
//   const [rowData, setRowData] = useState([]);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [formData, setFormData] = useState({
//     userName: '',
//     businessName: '',
//     email: '',
//     zip: '',
//   });

//   useEffect(() => {
//     fetchAccounts();
//   }, []);

//   const fetchAccounts = async () => {
//     try {
//       const response = await api.get('/accounts');
//       const accounts = response.data.data; // Extract the array of accounts
//       setRowData(accounts);
//     } catch (error) {
//       console.error('Error fetching accounts:', error);
//     }
//   };

//   const deleteAccount = async (accountId) => {
//     try {
//       await api.delete(`/accounts/${accountId}`);
//       fetchAccounts();
//     } catch (error) {
//       console.error('Error deleting account:', error);
//     }
//   };

//   const handleCreateAccount = async () => {
//     try {
//       const response = await api.post('/saveaccounts', formData);
//       fetchAccounts();
//         setRowData((prevData) => [...prevData, response.data]);
//       setShowCreateModal(false);
//       setFormData({
//         userName: '',
//         businessName: '',
//         email: '',
//         zip: '',
//       });
//     } catch (error) {
//       console.error('Error creating account:', error);
//     }
//   };
  
//   return (
//     <div>
//       <h2>Account List</h2>
//       <Button variant="primary" onClick={() => setShowCreateModal(true)}>
//         Create Account
//       </Button>
//       <Table className='mt-2' striped bordered hover>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Business Name</th>
//             <th>Email</th>
//             <th>Zip</th>
//             {/* Add more columns here */}
//           </tr>
//         </thead>
//         <tbody>
//           {rowData.map((account, index) => (
//             <tr key={account._id}>
//               <td>{index + 1}</td>
//               <td>{account.businessName}</td>
//               <td>{account.email}</td>
//               <td>{account.zip}</td>
//               {/* Add more cells for other properties */}
//             </tr>
//           ))}
//         </tbody>
//         </Table>
//       <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Create Account</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="userName">
//               <Form.Label>Username</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="userName"
//                 value={formData.userName}
//                 onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="businessName">
//               <Form.Label>Business Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="businessName"
//                 value={formData.businessName}
//                 onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="zip">
//               <Form.Label>Zip</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="zip"
//                 value={formData.zip}
//                 onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
//                 required
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleCreateAccount}>
//             Create
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default AccountList;
