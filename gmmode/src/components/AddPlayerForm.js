import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { PlayerContext } from '../context/PlayerContext';

const AddPlayerForm = ({ onClose }) => {
  const { addPlayer } = useContext(PlayerContext);
  const [player, setPlayer] = useState({
    firstName: '',
    lastName: '',
    number: '',
    position: '',
    overall: '',
    contractTerm: '',
    salary: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer({
      ...player,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a copy for validation
    const validatedPlayer = { ...player };
    
    // Validate form fields and set defaults if empty
    if (!validatedPlayer.firstName || !validatedPlayer.lastName) {
      alert('Please enter both first and last name');
      return;
    }
    
    // Handle number validation (1-99)
    if (!validatedPlayer.number) {
      validatedPlayer.number = '1';
    } else {
      const numValue = parseInt(validatedPlayer.number);
      if (isNaN(numValue) || numValue < 1) {
        validatedPlayer.number = '1';
      } else if (numValue > 99) {
        validatedPlayer.number = '99';
      } else {
        validatedPlayer.number = numValue.toString();
      }
    }
    
    // Handle position default
    if (!validatedPlayer.position) {
      validatedPlayer.position = 'C';
    }
    
    // Handle overall validation (50-99)
    if (!validatedPlayer.overall) {
      validatedPlayer.overall = '75';
    } else {
      const numValue = parseInt(validatedPlayer.overall);
      if (isNaN(numValue) || numValue < 50) {
        validatedPlayer.overall = '50';
      } else if (numValue > 99) {
        validatedPlayer.overall = '99';
      } else {
        validatedPlayer.overall = numValue.toString();
      }
    }
    
    // Handle contract term (1-8 years)
    if (!validatedPlayer.contractTerm) {
      validatedPlayer.contractTerm = '1';
    } else {
      const numValue = parseInt(validatedPlayer.contractTerm);
      if (isNaN(numValue) || numValue < 1) {
        validatedPlayer.contractTerm = '1';
      } else if (numValue > 8) {
        validatedPlayer.contractTerm = '8';
      } else {
        validatedPlayer.contractTerm = numValue.toString();
      }
    }
    
    // Handle salary validation (0.825M - 15.00M)
    if (!validatedPlayer.salary) {
      validatedPlayer.salary = '0.825';
    } else {
      const numericValue = validatedPlayer.salary.replace(/[^0-9.]/g, '');
      const floatValue = parseFloat(numericValue);
      
      if (isNaN(floatValue) || floatValue < 0.825) {
        validatedPlayer.salary = '0.825';
      } else if (floatValue > 15) {
        validatedPlayer.salary = '15.00';
      } else {
        validatedPlayer.salary = floatValue.toFixed(3);
      }
    }
    
    // Add the validated player
    addPlayer(validatedPlayer);
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
              <label htmlFor="number">Number</label>
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
                <option value="" disabled>Select position</option>
                <option value="C">Center (C)</option>
                <option value="LW">Left Wing (LW)</option>
                <option value="RW">Right Wing (RW)</option>
                <option value="LD">Left Defense (LD)</option>
                <option value="RD">Right Defense (RD)</option>
                <option value="G">Goalie (G)</option>
              </select>
            </div>
            
            <div className="form-group small">
              <label htmlFor="overall">Overall</label>
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
              <label htmlFor="contractTerm">Contract Term</label>
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
              <label htmlFor="salary">Salary </label>
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