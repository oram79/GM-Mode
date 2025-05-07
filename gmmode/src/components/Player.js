import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { PlayerContext } from '../context/PlayerContext';

const Player = ({ player }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlayer, setEditedPlayer] = useState({ ...player });
  const { deletePlayer, editPlayer, getPlayerLineupStatus } = useContext(PlayerContext);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedPlayer({ ...player });
  };

  const handleSave = () => {
    // Create a copy for validation
    const validatedPlayer = { ...editedPlayer };
    
    // Validate the required fields
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
    
    // Save the validated player
    editPlayer(player.id, validatedPlayer);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPlayer({
      ...editedPlayer,
      [name]: value
    });
  };

  const lineupStatus = getPlayerLineupStatus(player.id);
  const statusClass = `status-indicator ${lineupStatus.toLowerCase()}`;

  if (isEditing) {
    return (
      <div className="player-item editing">
        <div className="player-edit-form">
          <div className="edit-row">
            <div className="edit-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={editedPlayer.firstName}
                onChange={handleChange}
                className="edit-input"
                required
              />
            </div>
            <div className="edit-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={editedPlayer.lastName}
                onChange={handleChange}
                className="edit-input"
                required
              />
            </div>
          </div>

          <div className="edit-row">
            <div className="edit-group">
              <label>Number</label>
              <input
                type="number"
                name="number"
                min="1"
                max="99"
                value={editedPlayer.number}
                onChange={handleChange}
                className="edit-input small"
                placeholder="1-99"
              />
            </div>
            <div className="edit-group">
              <label>Position</label>
              <select
                name="position"
                value={editedPlayer.position}
                onChange={handleChange}
                className="edit-input"
              >
                <option value="C">Center (C)</option>
                <option value="LW">Left Wing (LW)</option>
                <option value="RW">Right Wing (RW)</option>
                <option value="LD">Left Defense (LD)</option>
                <option value="RD">Right Defense (RD)</option>
                <option value="G">Goalie (G)</option>
              </select>
            </div>
            <div className="edit-group">
              <label>Overall</label>
              <input
                type="number"
                name="overall"
                min="50"
                max="99"
                value={editedPlayer.overall}
                onChange={handleChange}
                className="edit-input small"
                placeholder="50-99"
              />
            </div>
          </div>

          <div className="edit-row">
            <div className="edit-group">
              <label>Contract Term</label>
              <input
                type="number"
                name="contractTerm"
                min="1"
                max="8"
                value={editedPlayer.contractTerm}
                onChange={handleChange}
                className="edit-input small"
                placeholder="1-8"
              />
            </div>
            <div className="edit-group">
              <label>Salary ($M)</label>
              <input
                type="text"
                name="salary"
                value={editedPlayer.salary}
                onChange={handleChange}
                className="edit-input"
                placeholder="0.825-15.00"
              />
            </div>
          </div>

          <div className="edit-actions">
            <button className="btn-save" onClick={handleSave}>
              <FontAwesomeIcon icon={faCheck} /> Save
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="player-item">
      <div className="player-info">
        <div className="player-main-info">
          <span className="player-number">#{player.number}</span>
          <h3 className="player-name">
            {player.firstName} {player.lastName}
          </h3>
          <span className={statusClass}>{lineupStatus}</span>
        </div>
        <div className="player-details">
          <div className="player-detail">
            <span className="detail-label">POS:</span>
            <span className="detail-value">{player.position}</span>
          </div>
          <div className="player-detail">
            <span className="detail-label">OVR:</span>
            <span className="detail-value">{player.overall}</span>
          </div>
          <div className="player-detail">
            <span className="detail-label">Contract:</span>
            <span className="detail-value">{player.contractTerm} yrs @ ${player.salary}M</span>
          </div>
        </div>
      </div>
      <div className="player-actions">
        <button className="btn-edit" onClick={handleEdit}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className="btn-delete" onClick={() => deletePlayer(player.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default Player;