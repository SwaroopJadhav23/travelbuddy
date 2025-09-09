import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPlus, FaUsers, FaDollarSign, FaReceipt, FaTrash, FaEdit, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaUserPlus } from 'react-icons/fa';
import './TripPage.css';

const TripPage = () => {
  const location = useLocation();
  const [itinerary, setItinerary] = useState(null);
  const [formData, setFormData] = useState(null);
  const [members, setMembers] = useState([
    { id: 1, name: 'John Doe', mobile: '+1 234-567-8900' },
    { id: 2, name: 'Jane Smith', mobile: '+1 234-567-8901' },
    { id: 3, name: 'Mike Johnson', mobile: '+1 234-567-8902' }
  ]);
  const [expenses, setExpenses] = useState([]);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    paidBy: '',
    splitBetween: [],
    category: 'food'
  });
  const [newMember, setNewMember] = useState({
    name: '',
    mobile: ''
  });

  useEffect(() => {
    if (location.state?.itinerary) {
      setItinerary(location.state.itinerary);
    }
    if (location.state?.formData) {
      setFormData(location.state.formData);
    }
  }, [location.state]);

  const categories = [
    { value: 'food', label: 'Food & Dining', icon: '🍽️' },
    { value: 'accommodation', label: 'Accommodation', icon: '🏨' },
    { value: 'transport', label: 'Transportation', icon: '🚗' },
    { value: 'activities', label: 'Activities', icon: '🎯' },
    { value: 'shopping', label: 'Shopping', icon: '🛍️' },
    { value: 'other', label: 'Other', icon: '📝' }
  ];

  const addMember = () => {
    if (!newMember.name || !newMember.mobile) {
      alert('Please fill in both name and mobile number');
      return;
    }

    const member = {
      id: Date.now(),
      name: newMember.name,
      mobile: newMember.mobile
    };

    setMembers([...members, member]);
    setNewMember({ name: '', mobile: '' });
    setShowAddMember(false);
  };

  const deleteMember = (id) => {
    setMembers(members.filter(member => member.id !== id));
    // Remove from expenses if they were involved
    setExpenses(expenses.map(expense => ({
      ...expense,
      splitBetween: expense.splitBetween.filter(name => 
        members.find(m => m.id === id)?.name !== name
      )
    })));
  };

  const addExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.paidBy || newExpense.splitBetween.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    const expense = {
      id: Date.now(),
      ...newExpense,
      amount: parseFloat(newExpense.amount),
      date: new Date()
    };

    setExpenses([...expenses, expense]);
    setNewExpense({
      description: '',
      amount: '',
      paidBy: '',
      splitBetween: [],
      category: 'food'
    });
    setShowAddExpense(false);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const toggleMemberSplit = (memberName) => {
    setNewExpense(prev => ({
      ...prev,
      splitBetween: prev.splitBetween.includes(memberName)
        ? prev.splitBetween.filter(m => m !== memberName)
        : [...prev.splitBetween, memberName]
    }));
  };

  const calculateSettlements = () => {
    const balances = {};
    members.forEach(member => {
      balances[member.name] = 0;
    });

    expenses.forEach(expense => {
      const amountPerPerson = expense.amount / expense.splitBetween.length;
      
      // Person who paid gets credited
      balances[expense.paidBy] += expense.amount;
      
      // People who owe get debited
      expense.splitBetween.forEach(person => {
        balances[person] -= amountPerPerson;
      });
    });

    return balances;
  };

  const getSettlements = () => {
    const balances = calculateSettlements();
    const settlements = [];
    
    const creditors = Object.entries(balances)
      .filter(([_, balance]) => balance > 0)
      .sort((a, b) => b[1] - a[1]);
    
    const debtors = Object.entries(balances)
      .filter(([_, balance]) => balance < 0)
      .sort((a, b) => a[1] - b[1]);

    let i = 0, j = 0;
    while (i < creditors.length && j < debtors.length) {
      const [creditor, creditAmount] = creditors[i];
      const [debtor, debtAmount] = debtors[j];
      
      const settlementAmount = Math.min(creditAmount, Math.abs(debtAmount));
      
      if (settlementAmount > 0.01) {
        settlements.push({
          from: debtor,
          to: creditor,
          amount: settlementAmount
        });
      }
      
      creditors[i][1] -= settlementAmount;
      debtors[j][1] += settlementAmount;
      
      if (creditors[i][1] < 0.01) i++;
      if (Math.abs(debtors[j][1]) < 0.01) j++;
    }
    
    return settlements;
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const settlements = getSettlements();

  if (!itinerary) {
    return (
      <div className="trip-page">
        <div className="container">
          <div className="no-trip">
            <h2>No Trip Found</h2>
            <p>Please go back to the itinerary page and click "Travel Expenses" to manage this trip.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="trip-page">
      <div className="container">
        {/* Trip Header */}
        <div className="trip-header">
          <div className="trip-info">
            <h1>{itinerary.destination} Trip Expenses</h1>
            <div className="trip-details">
              <div className="detail-item">
                <FaMapMarkerAlt />
                <span>{itinerary.destination}</span>
              </div>
              <div className="detail-item">
                <FaCalendarAlt />
                <span>{itinerary.duration} days</span>
              </div>
              <div className="detail-item">
                <FaDollarSign />
                <span>Budget: ${itinerary.budget.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card">
            <div className="summary-icon">
              <FaDollarSign />
            </div>
            <div className="summary-content">
              <h3>Total Expenses</h3>
              <p>${totalExpenses.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon">
              <FaUsers />
            </div>
            <div className="summary-content">
              <h3>Group Members</h3>
              <p>{members.length} people</p>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon">
              <FaReceipt />
            </div>
            <div className="summary-content">
              <h3>Transactions</h3>
              <p>{expenses.length} expenses</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddExpense(true)}
          >
            <FaPlus />
            Add Expense
          </button>
          <button 
            className="btn btn-outline"
            onClick={() => setShowAddMember(true)}
          >
            <FaUserPlus />
            Add Member
          </button>
        </div>

        {/* Add Member Modal */}
        {showAddMember && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add New Member</h3>
              
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  className="form-input"
                  value={newMember.mobile}
                  onChange={(e) => setNewMember({...newMember, mobile: e.target.value})}
                  placeholder="+1 234-567-8900"
                />
              </div>

              <div className="modal-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => setShowAddMember(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={addMember}
                >
                  Add Member
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Expense Modal */}
        {showAddExpense && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add New Expense</h3>
              
              <div className="form-group">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-input"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  placeholder="What was this expense for?"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Amount ($)</label>
                <input
                  type="number"
                  className="form-input"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  placeholder="0.00"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Paid By</label>
                <select
                  className="form-input"
                  value={newExpense.paidBy}
                  onChange={(e) => setNewExpense({...newExpense, paidBy: e.target.value})}
                >
                  <option value="">Select person</option>
                  {members.map(member => (
                    <option key={member.id} value={member.name}>{member.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-input"
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.icon} {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Split Between</label>
                <div className="member-checkboxes">
                  {members.map(member => (
                    <label key={member.id} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newExpense.splitBetween.includes(member.name)}
                        onChange={() => toggleMemberSplit(member.name)}
                      />
                      <span>{member.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => setShowAddExpense(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={addExpense}
                >
                  Add Expense
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Members Section */}
        <div className="members-section">
          <h2>Group Members</h2>
          <div className="members-list">
            {members.map(member => (
              <div key={member.id} className="member-card">
                <div className="member-info">
                  <div className="member-avatar">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="member-details">
                    <h4>{member.name}</h4>
                    <p>
                      <FaPhone />
                      {member.mobile}
                    </p>
                  </div>
                </div>
                <button 
                  className="action-btn delete"
                  onClick={() => deleteMember(member.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Expenses List */}
        <div className="expenses-section">
          <h2>Recent Expenses</h2>
          <div className="expenses-list">
            {expenses.map(expense => (
              <div key={expense.id} className="expense-card">
                <div className="expense-info">
                  <div className="expense-category">
                    {categories.find(cat => cat.value === expense.category)?.icon}
                  </div>
                  <div className="expense-details">
                    <h4>{expense.description}</h4>
                    <p>Paid by {expense.paidBy} • {expense.date.toLocaleDateString()}</p>
                    <p>Split between: {expense.splitBetween.join(', ')}</p>
                  </div>
                </div>
                <div className="expense-amount">
                  <span>${expense.amount.toFixed(2)}</span>
                  <div className="expense-actions">
                    <button className="action-btn edit">
                      <FaEdit />
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => deleteExpense(expense.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settlements */}
        {settlements.length > 0 && (
          <div className="settlements-section">
            <h2>Who Owes Whom</h2>
            <div className="settlements-list">
              {settlements.map((settlement, index) => (
                <div key={index} className="settlement-card">
                  <div className="settlement-info">
                    <span className="settlement-from">{settlement.from}</span>
                    <span className="settlement-arrow">→</span>
                    <span className="settlement-to">{settlement.to}</span>
                  </div>
                  <span className="settlement-amount">${settlement.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPage;

