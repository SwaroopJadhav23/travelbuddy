import React from 'react';
import { FaPen, FaUsers, FaChartLine } from 'react-icons/fa';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: <FaPen />,
      iconClass: 'orange',
      title: 'Smart Itineraries',
      description: 'AI-powered itinerary generation based on your preferences, budget, and travel dates.'
    },
    {
      icon: <FaUsers />,
      iconClass: 'green',
      title: 'Group Expenses',
      description: 'Split bills easily with friends and track who owes what with automatic calculations.'
    },
    {
      icon: <FaChartLine />,
      iconClass: 'blue',
      title: 'Budget Tracking',
      description: 'Real-time expense monitoring with detailed breakdowns and spending insights.'
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h2 className="features-title">Why Choose TravelBuddy?</h2>
        <p className="features-subtitle">
          Everything you need for the perfect trip, from planning to expense tracking
        </p>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card card">
              <div className={`feature-icon ${feature.iconClass}`}>
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

