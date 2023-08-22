import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import CardItem from './CardItem';

const Card = () => {
    const cardDataList = [
        {
            title: 'Card 1',
            text: 'This is the first card.',
            imageUrl: 'https://via.placeholder.com/150',
            buttonText: 'Button 1'
        },
        {
            title: 'Card 2',
            text: 'This is the second card.',
            imageUrl: 'https://via.placeholder.com/150',
            buttonText: 'Button 2'
        }
    ];

    return (
        <PageContainer title="Card" description="this is Card">
            <DashboardCard title="Card">
                <div className="container">
                    <div className="row">
                        {cardDataList.map((cardData, index) => (
                            <div key={index} className="col-md-4">
                                <CardItem
                                    title={cardData.title}
                                    text={cardData.text}
                                    imageUrl={cardData.imageUrl}
                                    buttonText={cardData.buttonText}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </DashboardCard>
        </PageContainer>
    );
};

export default Card;
