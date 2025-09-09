import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaDollarSign, FaCalendarAlt, FaPlane, FaReceipt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: '',
    budget: 1000,
    checkIn: null,
    checkOut: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const handleGenerateItinerary = () => {
    if (!formData.destination || !formData.checkIn || !formData.checkOut) {
      alert('Please fill in all required fields');
      return;
    }
    navigate('/itinerary', { state: { formData } });
  };

  const handleExpenseManager = () => {
    navigate('/expense-manager');
  };

  return (
    <section className="hero-background">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Plan Your Perfect <span className="highlight">Adventure</span>
          </h1>
          <p className="hero-subtitle">
            Generate personalized itineraries and manage expenses with friends. 
            Your ultimate travel companion for unforgettable journeys.
          </p>
          
          <div className="trip-form">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  <FaMapMarkerAlt className="form-icon" />
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Where to?"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <FaDollarSign className="form-icon" />
                  Budget
                </label>
                <div className="budget-container">
                  <input
                    type="range"
                    name="budget"
                    min="100"
                    max="10000"
                    step="100"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="budget-slider"
                  />
                  <div className="budget-display">
                    ${formData.budget.toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <FaCalendarAlt className="form-icon" />
                  Check-in
                </label>
                <DatePicker
                  selected={formData.checkIn}
                  onChange={(date) => handleDateChange(date, 'checkIn')}
                  className="form-input date-picker"
                  placeholderText="dd-mm-yyyy"
                  dateFormat="dd-MM-yyyy"
                  minDate={new Date()}
                  showPopperArrow={false}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <FaCalendarAlt className="form-icon" />
                  Check-out
                </label>
                <DatePicker
                  selected={formData.checkOut}
                  onChange={(date) => handleDateChange(date, 'checkOut')}
                  className="form-input date-picker"
                  placeholderText="dd-mm-yyyy"
                  dateFormat="dd-MM-yyyy"
                  minDate={formData.checkIn || new Date()}
                  showPopperArrow={false}
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                className="btn btn-primary"
                onClick={handleGenerateItinerary}
              >
                <FaPlane />
                Generate Itinerary
              </button>
              <button 
                className="btn btn-secondary"
                onClick={handleExpenseManager}
              >
                <FaReceipt />
                Expense Manager
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

