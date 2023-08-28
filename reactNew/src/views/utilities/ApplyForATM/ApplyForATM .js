import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import api from 'src/api/api';

const validationSchema = yup.object({
    aadhaarNumber: yup
        .string()
        .required('Aadhaar Number is required')
             .matches(/^\d{12}$/, 'Aadhaar Number must be exactly 12 digits'),
    panNumber: yup
        .string()
        .required('PAN Number is required')
        .matches(/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/, 'Invalid PAN Number'),
});

const ApplyForATM = ({ accountId, onApplySuccess }) => {
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});

    const handleApplyButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setErrors({});
    };

    const handleApplyForATM = async () => {
        try {
            await validationSchema.validate({
                aadhaarNumber: formData.aadhaarNumber,
                panNumber: formData.panNumber,
            }, { abortEarly: false });

            await api.post(`/applyForATM/${accountId}`, formData);
            onApplySuccess();
            handleCloseModal();
        } catch (error) {
            if (error.name === 'ValidationError') {
                const newErrors = {};
                error.inner.forEach(e => {
                    newErrors[e.path] = e.message;
                });
                setErrors(newErrors);
            } else {
                console.error('Error applying for ATM card:', error);
            }
        }
    };

    const [formData, setFormData] = useState({
        aadhaarNumber: '',
        panNumber: '',
    });

    const handleFormChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <>
            <Button variant="primary" size="sm" onClick={handleApplyButtonClick}>
                Apply for ATM
            </Button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Apply for ATM Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="aadhaar">
                            <Form.Label>Aadhaar Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="aadhaarNumber"
                                value={formData.aadhaarNumber}
                                onChange={handleFormChange}
                                isInvalid={!!errors.aadhaarNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.aadhaarNumber}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="panNumber">
                            <Form.Label>PAN Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="panNumber"
                                value={formData.panNumber}
                                onChange={handleFormChange}
                                isInvalid={!!errors.panNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.panNumber}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleApplyForATM}>
                        Apply
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ApplyForATM;
