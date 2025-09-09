import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaPlane, FaUtensils, FaCamera, FaBed, FaReceipt } from 'react-icons/fa';
import './ItineraryPage.css';

const ItineraryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
      generateItinerary(location.state.formData);
    }
  }, [location.state]);

  const generateItinerary = async (data) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockItinerary = {
        destination: data.destination,
        budget: data.budget,
        duration: Math.ceil((new Date(data.checkOut) - new Date(data.checkIn)) / (1000 * 60 * 60 * 24)),
        days: [
          {
            day: 1,
            date: data.checkIn,
            activities: [
              { time: '09:00', type: 'arrival', title: 'Arrive at destination', icon: <FaPlane />, cost: 0 },
              { time: '11:00', type: 'hotel', title: 'Check-in at hotel', icon: <FaBed />, cost: 150 },
              { time: '13:00', type: 'food', title: 'Lunch at local restaurant', icon: <FaUtensils />, cost: 45 },
              { time: '15:00', type: 'sightseeing', title: 'Explore city center', icon: <FaCamera />, cost: 25 },
              { time: '19:00', type: 'food', title: 'Dinner at rooftop restaurant', icon: <FaUtensils />, cost: 80 }
            ]
          },
          {
            day: 2,
            date: new Date(data.checkIn).setDate(new Date(data.checkIn).getDate() + 1),
            activities: [
              { time: '08:00', type: 'food', title: 'Breakfast at hotel', icon: <FaUtensils />, cost: 20 },
              { time: '10:00', type: 'sightseeing', title: 'Visit historical museum', icon: <FaCamera />, cost: 30 },
              { time: '13:00', type: 'food', title: 'Lunch at street market', icon: <FaUtensils />, cost: 25 },
              { time: '15:00', type: 'sightseeing', title: 'Guided city tour', icon: <FaCamera />, cost: 60 },
              { time: '18:00', type: 'food', title: 'Dinner at local bistro', icon: <FaUtensils />, cost: 55 }
            ]
          }
        ]
      };
      setItinerary(mockItinerary);
      setLoading(false);
    }, 2000);
  };

  const getActivityTypeColor = (type) => {
    const colors = {
      arrival: '#3b82f6',
      hotel: '#8b5cf6',
      food: '#f59e0b',
      sightseeing: '#10b981',
      transport: '#ef4444'
    };
    return colors[type] || '#6b7280';
  };

  const calculateTotalCost = () => {
    if (!itinerary) return 0;
    return itinerary.days.reduce((total, day) => {
      return total + day.activities.reduce((dayTotal, activity) => dayTotal + activity.cost, 0);
    }, 0);
  };

  const handleTravelExpenses = () => {
    // Navigate to trip page with itinerary data
    navigate('/trip', { 
      state: { 
        itinerary: itinerary,
        formData: formData 
      } 
    });
  };

  if (loading) {
    return (
      <div className="itinerary-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <h2>Generating your perfect itinerary...</h2>
            <p>This may take a few moments</p>
          </div>
        </div>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="itinerary-page">
        <div className="container">
          <div className="no-itinerary">
            <h2>No Itinerary Found</h2>
            <p>Please go back to the home page and fill out the trip planning form.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="itinerary-page">
      <div className="container">
        {/* Header */}
        <div className="itinerary-header">
          <h1>Your {itinerary.destination} Itinerary</h1>
          <div className="trip-summary">
            <div className="summary-item">
              <FaMapMarkerAlt />
              <span>{itinerary.destination}</span>
            </div>
            <div className="summary-item">
              <FaCalendarAlt />
              <span>{itinerary.duration} days</span>
            </div>
            <div className="summary-item">
              <FaDollarSign />
              <span>${calculateTotalCost().toLocaleString()} / ${itinerary.budget.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Itinerary Days */}
        <div className="itinerary-days">
          {itinerary.days.map((day, index) => (
            <div key={index} className="day-card">
              <div className="day-header">
                <h3>Day {day.day}</h3>
                <span className="day-date">
                  {new Date(day.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              
              <div className="activities">
                {day.activities.map((activity, activityIndex) => (
                  <div key={activityIndex} className="activity">
                    <div className="activity-time">{activity.time}</div>
                    <div 
                      className="activity-icon"
                      style={{ backgroundColor: getActivityTypeColor(activity.type) }}
                    >
                      {activity.icon}
                    </div>
                    <div className="activity-content">
                      <h4>{activity.title}</h4>
                      <span className="activity-cost">${activity.cost}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Budget Summary */}
        <div className="budget-summary">
          <h3>Budget Summary</h3>
          <div className="budget-breakdown">
            <div className="budget-item">
              <span>Total Estimated Cost</span>
              <span>${calculateTotalCost().toLocaleString()}</span>
            </div>
            <div className="budget-item">
              <span>Your Budget</span>
              <span>${itinerary.budget.toLocaleString()}</span>
            </div>
            <div className="budget-item total">
              <span>Remaining Budget</span>
              <span>${(itinerary.budget - calculateTotalCost()).toLocaleString()}</span>
            </div>
          </div>
          
          {/* Travel Expenses Button */}
          <div className="travel-expenses-section">
            <button 
              className="btn btn-secondary travel-expenses-btn"
              onClick={handleTravelExpenses}
            >
              <FaReceipt />
              Travel Expenses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;
