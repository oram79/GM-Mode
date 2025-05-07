import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHockeyPuck, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { PlayerContext } from '../context/PlayerContext';

const TeamLineup = ({ team, lineup, addPlayerToLineup, removePlayerFromLineup }) => {
  const { players } = useContext(PlayerContext);
  const [showPlayerSelector, setShowPlayerSelector] = useState(false);
  const [currentSelection, setCurrentSelection] = useState({
    section: '',
    line: '',
    position: ''
  });

  const handleAddPlayer = (section, line, position) => {
    setCurrentSelection({ section, line, position });
    setShowPlayerSelector(true);
  };

  const handlePlayerSelect = (playerId) => {
    const { section, line, position } = currentSelection;
    addPlayerToLineup(playerId, section, line, position);
    setShowPlayerSelector(false);
  };

  const handleRemovePlayer = (section, line, position) => {
    removePlayerFromLineup(section, line, position);
  };

  // Filter available players by position compatibility
  const getCompatiblePlayers = (position) => {
    // Define position compatibility
    const positionMap = {
      lw: ['LW'],
      c: ['C'],
      rw: ['RW'],
      ld: ['LD'],
      rd: ['RD'],
      starter: ['G'],
      backup: ['G']
    };

    const compatiblePositions = positionMap[position] || [];
    return players.filter(player => compatiblePositions.includes(player.position));
  };

  const renderPlayer = (player, section, line, position) => {
    if (!player) {
      return (
        <div className="empty-position" onClick={() => handleAddPlayer(section, line, position)}>
          <FontAwesomeIcon icon={faUserPlus} className="add-icon" />
          <span>Add Player</span>
        </div>
      );
    }

    return (
      <div className="lineup-player">
        <div className="player-info">
          <span className="player-number">#{player.number}</span>
          <div className="player-name-container">
            <h4 className="player-name">{player.lastName}</h4>
            <div className="player-details">
              <span className="player-overall">{player.overall}</span>
              <span className="player-position">{player.position}</span>
            </div>
          </div>
        </div>
        <button 
          className="remove-player" 
          onClick={() => handleRemovePlayer(section, line, position)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    );
  };

  return (
    <div className="team-lineup">
      <div className="team-header">
        <h2 className="team-title">
          <FontAwesomeIcon icon={faHockeyPuck} className="team-icon" />
          {team} Lineup
        </h2>
      </div>

      <div className="lineup-section">
        <h3 className="section-title">Forward Lines</h3>
        <div className="lines-container">
          {/* Line 1 */}
          <div className="line">
            <div className="line-label">Line 1</div>
            <div className="line-players">
              {renderPlayer(lineup.forwards.line1.lw, 'forwards', 'line1', 'lw')}
              {renderPlayer(lineup.forwards.line1.c, 'forwards', 'line1', 'c')}
              {renderPlayer(lineup.forwards.line1.rw, 'forwards', 'line1', 'rw')}
            </div>
          </div>
          
          {/* Line 2 */}
          <div className="line">
            <div className="line-label">Line 2</div>
            <div className="line-players">
              {renderPlayer(lineup.forwards.line2.lw, 'forwards', 'line2', 'lw')}
              {renderPlayer(lineup.forwards.line2.c, 'forwards', 'line2', 'c')}
              {renderPlayer(lineup.forwards.line2.rw, 'forwards', 'line2', 'rw')}
            </div>
          </div>
          
          {/* Line 3 */}
          <div className="line">
            <div className="line-label">Line 3</div>
            <div className="line-players">
              {renderPlayer(lineup.forwards.line3.lw, 'forwards', 'line3', 'lw')}
              {renderPlayer(lineup.forwards.line3.c, 'forwards', 'line3', 'c')}
              {renderPlayer(lineup.forwards.line3.rw, 'forwards', 'line3', 'rw')}
            </div>
          </div>
          
          {/* Line 4 */}
          <div className="line">
            <div className="line-label">Line 4</div>
            <div className="line-players">
              {renderPlayer(lineup.forwards.line4.lw, 'forwards', 'line4', 'lw')}
              {renderPlayer(lineup.forwards.line4.c, 'forwards', 'line4', 'c')}
              {renderPlayer(lineup.forwards.line4.rw, 'forwards', 'line4', 'rw')}
            </div>
          </div>
        </div>
      </div>

      <div className="lineup-section">
        <h3 className="section-title">Defense Pairs</h3>
        <div className="lines-container">
          {/* Pair 1 */}
          <div className="line">
            <div className="line-label">Pair 1</div>
            <div className="line-players defense">
              {renderPlayer(lineup.defense.pair1.ld, 'defense', 'pair1', 'ld')}
              {renderPlayer(lineup.defense.pair1.rd, 'defense', 'pair1', 'rd')}
            </div>
          </div>
          
          {/* Pair 2 */}
          <div className="line">
            <div className="line-label">Pair 2</div>
            <div className="line-players defense">
              {renderPlayer(lineup.defense.pair2.ld, 'defense', 'pair2', 'ld')}
              {renderPlayer(lineup.defense.pair2.rd, 'defense', 'pair2', 'rd')}
            </div>
          </div>
          
          {/* Pair 3 */}
          <div className="line">
            <div className="line-label">Pair 3</div>
            <div className="line-players defense">
              {renderPlayer(lineup.defense.pair3.ld, 'defense', 'pair3', 'ld')}
              {renderPlayer(lineup.defense.pair3.rd, 'defense', 'pair3', 'rd')}
            </div>
          </div>
        </div>
      </div>

      <div className="lineup-section">
        <h3 className="section-title">Goalies</h3>
        <div className="lines-container">
          <div className="line goalies">
            <div className="line-players goalies">
              <div className="goalie-position">
                <div className="position-label">Starter</div>
                {renderPlayer(lineup.goalies.starter, 'goalies', null, 'starter')}
              </div>
              <div className="goalie-position">
                <div className="position-label">Backup</div>
                {renderPlayer(lineup.goalies.backup, 'goalies', null, 'backup')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPlayerSelector && (
        <div className="player-selector-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Select Player</h3>
              <button className="close-btn" onClick={() => setShowPlayerSelector(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="player-selector-list">
              {getCompatiblePlayers(currentSelection.position).length === 0 ? (
                <div className="no-players">
                  <p>No compatible players available. Add players to your roster first.</p>
                </div>
              ) : (
                getCompatiblePlayers(currentSelection.position).map(player => (
                  <div 
                    key={player.id} 
                    className="selectable-player"
                    onClick={() => handlePlayerSelect(player.id)}
                  >
                    <span className="player-number">#{player.number}</span>
                    <span className="player-name">{player.firstName} {player.lastName}</span>
                    <span className="player-overall">{player.overall}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamLineup;