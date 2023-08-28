import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import './ATMCard.css'; // Import your custom CSS for styling

const ATMCard = ({ account }) => {
    return (
        <Card className="atm-card">
            <Card.Body>
                <Card.Title>RS Bank</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">ATM Card</Card.Subtitle>
                <Card.Text>
                    <Badge variant="info" className="account-type-badge">{account.accountType}</Badge>
                    <div className="account-number">Account Number: {account.accountNumber}</div>
                    <div className="balance">Balance: Rs {account.balance}</div>
                    <div className="dates">
                        <div className="start-date">Start Date: {account.startDate}</div>
                        <div className="expiration-date">Expiration Date: {account.expirationDate}</div>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ATMCard;
