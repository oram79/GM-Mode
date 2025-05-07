import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import Player from './Player';
import AddPlayerForm from './AddPlayerForm';
import { PlayerContext } from '../context/PlayerContext';

const PlayerList = () => {
  const { players, getPlayerLineupStatus } = useContext(PlayerContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('All');
  const [lineupFilter, setLineupFilter] = useState('All');

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const filteredPlayers = players.filter(player => {
    // Search term filter
    const nameMatches = (
      player.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.number.toString().includes(searchTerm)
    );
    
    // Position filter
    const positionMatches = positionFilter === 'All' || player.position === positionFilter;
    
    // Lineup filter
    const lineupStatus = getPlayerLineupStatus(player.id);
    const lineupMatches = lineupFilter === 'All' || lineupStatus === lineupFilter;
    
    return nameMatches && positionMatches && lineupMatches;
  });

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    // Sort by overall rating (highest first)
    return parseInt(b.overall) - parseInt(a.overall);
  });

  return (
    <div className="player-list-container">
      <div className="player-list-header">
        <h2>Players Roster</h2>
        <button className="btn-add-player" onClick={toggleAddForm}>
          <FontAwesomeIcon icon={faPlus} /> Add Player
        </button>
      </div>
      
      <div className="filter-bar">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <div className="filter-group">
            <FontAwesomeIcon icon={faFilter} className="filter-icon" />
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Positions</option>
              <option value="C">Centers</option>
              <option value="LW">Left Wings</option>
              <option value="RW">Right Wings</option>
              <option value="LD">Left Defense</option>
              <option value="RD">Right Defense</option>
              <option value="G">Goalies</option>
            </select>
          </div>
          
          <div className="filter-group">
            <select
              value={lineupFilter}
              onChange={(e) => setLineupFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Lineups</option>
              <option value="NHL">NHL Lineup</option>
              <option value="AHL">AHL Lineup</option>
              <option value="None">Not Assigned</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="player-list">
        {sortedPlayers.length === 0 ? (
          <div className="no-players">
            <p>No players found. Add new players to your roster.</p>
          </div>
        ) : (
          sortedPlayers.map(player => (
            <Player key={player.id} player={player} />
          ))
        )}
      </div>
      
      {showAddForm && <AddPlayerForm onClose={() => setShowAddForm(false)} />}
    </div>
  );
};

export default PlayerList;