import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { PlayerContext } from '../context/PlayerContext';

const AddPlayerForm = ({ onClose }) => {
  const { addPlayer } = useContext(PlayerContext);
  const [player, setPlayer] = useState({
    firstName: '',
    lastName: '',
    number: '1',
    position: 'C',
    overall: '75',
    contractTerm: '1',
    salary: '0.825',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // Handle special formatting for salary
    if (name === 'salary') {
      // Remove any non-numeric characters except the decimal point
      const numericValue = value.replace(/[^0-9.]/g, '');
      const floatValue = parseFloat(numericValue);
      
      // Validate the range (0.825M to 15.00M)
      if (!isNaN(floatValue)) {
        if (floatValue < 0.825) {
          processedValue = '0.825';
        } else if (floatValue > 15) {
          processedValue = '15.00';
        } else {
          processedValue = floatValue.toFixed(3);
        }
      } else {
        processedValue = '0.825';
      }
    }
    
    // Process overall rating (50-99)
    if (name === 'overall') {
      const numValue = parseInt(value);
      if (isNaN(numValue)) {
        processedValue = '50';
      } else if (numValue < 50) {
        processedValue = '50';
      } else if (numValue > 99) {
        processedValue = '99';
      } else {
        processedValue = numValue.toString();
      }
    }
    
    // Process jersey number (1-99)
    if (name === 'number') {
      const numValue = parseInt(value);
      if (isNaN(numValue)) {
        processedValue = '1';
      } else if (numValue < 1) {
        processedValue = '1';
      } else if (numValue > 99) {
        processedValue = '99';
      } else {
        processedValue = numValue.toString();
      }
    }

    setPlayer({
      ...player,
      [name]: processedValue
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!player.firstName || !player.lastName) {
      alert('Please enter both first and last name');
      return;
    }
    
    addPlayer(player);
    onClose();
  };

  return (
    <div className="add-player-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Player</h2>
          <button className="close-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="add-player-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={player.firstName}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={player.lastName}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group small">
              <label htmlFor="number">Number (1-99)</label>
              <input
                type="number"
                id="number"
                name="number"
                min="1"
                max="99"
                value={player.number}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <select
                id="position"
                name="position"
                value={player.position}
                onChange={handleChange}
                className="form-input"
              >
                <option value="C">Center (C)</option>
                <option value="LW">Left Wing (LW)</option>
                <option value="RW">Right Wing (RW)</option>
                <option value="LD">Left Defense (LD)</option>
                <option value="RD">Right Defense (RD)</option>
                <option value="G">Goalie (G)</option>
              </select>
            </div>
            
            <div className="form-group small">
              <label htmlFor="overall">Overall (50-99)</label>
              <input
                type="number"
                id="overall"
                name="overall"
                min="50"
                max="99"
                value={player.overall}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contractTerm">Contract Term (Years)</label>
              <input
                type="number"
                id="contractTerm"
                name="contractTerm"
                min="1"
                max="8"
                value={player.contractTerm}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="salary">Salary ($M)</label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={player.salary}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn-add">
              <FontAwesomeIcon icon={faUserPlus} /> Add Player
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlayerForm;