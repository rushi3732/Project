import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import api from 'src/api/api';

const AccountList = () => {
    const [rowData, setRowData] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [actionTitle, setActionTitle] = useState("Create");
    const [formData, setFormData] = useState({
        accountType: '',
        accountHolder: {
            firstName: '',
            lastName: '',
            contactInfo: {
                email: '',
                phone: ''
            },
            accountNumber: '',
        },
        balance: 0,
    });

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await api.get('/accounts');
            const accountsAll = response.data.data; 
            setRowData(accountsAll)
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };
 
    
    const close = () => {
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
        });

    }

    const deleteAccount = async (accountId) => {
        try {
            await api.delete(`/accountdeleteById/${accountId}`);
            fetchAccounts();
        } catch (error) {
            console.error('Error deleting account :', error);
        }
    };

    const handleUpdateButtonClick = (account) => {
        setFormData({
            accountType: account.accountType,
            accountId: account._id,
            accountHolder: {
                firstName: account.accountHolder?.firstName,
                lastName: account.accountHolder?.lastName,
                contactInfo: {
                    email: account.accountHolder?.contactInfo?.email,
                    phone: account.accountHolder?.contactInfo?.phone,
                },
                accountNumber: account.accountHolder?.accountNumber,
            },
            balance: account.balance,
        });
        setShowCreateModal(true); 
        setActionTitle("Update");

    };

    const ShowCreateModal = () => {
        setShowCreateModal(true)
        setActionTitle("Create");
    }
    
    const handleCreateOrUpdateAccount = async () => {
        try {
            if (formData.accountId) {
               await api.put(`/accountupdate/${formData.accountId}`, formData);
                fetchAccounts();
            } else {
              await api.post('/saveaccounts', formData);
                fetchAccounts();
            }
            setShowCreateModal(false);
            setFormData({
                accountType: '',
                accountHolder: {
                    firstName: '',
                    lastName: '',
                    contactInfo: {
                        email: '',
                        phone: '',
                    },
                },
                balance: 0,
            });
        } catch (error) {
            console.error('Error creating/updating account:', error);
        }
    };


    return (
        <div>
            <Button variant="primary" size="sm" onClick={ShowCreateModal}>
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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rowData.map((account, index) => (
                        <tr key={account._id}>
                            <td>{account.accountNumber}</td>
                            <td>{account.accountType}</td>
                            <td>{account.accountHolder?.firstName}</td>
                            <td>{account.accountHolder?.lastName}</td>
                            <td>{account.accountHolder?.contactInfo?.email}</td>
                            <td>{account.accountHolder?.contactInfo?.phone}</td>
                            <td>{account.balance}</td>
                            <td style={{ display: 'flex', justifyContent: "space-evenly" }}>
                                <Button variant="primary" size="sm" className="g-5" onClick={() => handleUpdateButtonClick(account)}>Update</Button>
                                <Button variant="danger" size="sm" onClick={() => deleteAccount(account._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showCreateModal} onHide={close}  backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title className="text-muted">{actionTitle} Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
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
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        {actionTitle === 'Create' ? 'Cancel' : 'Discard'}
                    </Button>
                    <Button variant="primary" onClick={handleCreateOrUpdateAccount}>
                        {actionTitle === 'Create' ? 'Create' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AccountList;