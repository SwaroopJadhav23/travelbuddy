import React, { useState } from 'react';
import { FaPlus, FaUsers, FaDollarSign, FaReceipt, FaTrash, FaEdit } from 'react-icons/fa';
import './ExpenseManagerPage.css';

const ExpenseManagerPage = () => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: 'Hotel booking',
      amount: 450,
      paidBy: 'John Doe',
      splitBetween: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      date: new Date('2024-01-15'),
      category: 'accommodation'
    },
    {
      id: 2,
      description: 'Dinner at restaurant',
      amount: 120,
      paidBy: 'Jane Smith',
      splitBetween: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      date: new Date('2024-01-15'),
      category: 'food'
    },
    {
      id: 3,
      description: 'Taxi to airport',
      amount: 45,
      paidBy: 'Mike Johnson',
      splitBetween: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      date: new Date('2024-01-16'),
      category: 'transport'
    }
  ]);

  const [members, setMembers] = useState(['John Doe', 'Jane Smith', 'Mike Johnson']);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    paidBy: '',
    splitBetween: [],
    category: 'food'
  });

  const categories = [
    { value: 'food', label: 'Food & Dining', icon: '🍽️' },
    { value: 'accommodation', label: 'Accommodation', icon: '🏨' },
    { value: 'transport', label: 'Transportation', icon: '🚗' },
    { value: 'activities', label: 'Activities', icon: '🎯' },
    { value: 'shopping', label: 'Shopping', icon: '🛍️' },
    { value: 'other', label: 'Other', icon: '📝' }
  ];

  const calculateSettlements = () => {
    const balances = {};
    members.forEach(member => {
      balances[member] = 0;
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
      
      if (settlementAmount > 0.01) { // Avoid tiny amounts due to floating point
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

  const toggleMemberSplit = (member) => {
    setNewExpense(prev => ({
      ...prev,
      splitBetween: prev.splitBetween.includes(member)
        ? prev.splitBetween.filter(m => m !== member)
        : [...prev.splitBetween, member]
    }));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const settlements = getSettlements();

  return (
    <div className="expense-manager-page">
      <div className="container">
        <div className="page-header">
          <h1>Expense Manager</h1>
          <p>Track and split expenses with your travel companions</p>
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
              <h3>Total Transactions</h3>
              <p>{expenses.length} expenses</p>
            </div>
          </div>
        </div>

        {/* Add Expense Button */}
        <div className="add-expense-section">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddExpense(true)}
          >
            <FaPlus />
            Add New Expense
          </button>
        </div>

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
                    <option key={member} value={member}>{member}</option>
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
                    <label key={member} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newExpense.splitBetween.includes(member)}
                        onChange={() => toggleMemberSplit(member)}
                      />
                      <span>{member}</span>
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

export default ExpenseManagerPage;

