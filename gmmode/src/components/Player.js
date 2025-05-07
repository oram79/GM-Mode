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
    editPlayer(player.id, editedPlayer);
    setIsEditing(false);
  };

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

    setEditedPlayer({
      ...editedPlayer,
      [name]: processedValue
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