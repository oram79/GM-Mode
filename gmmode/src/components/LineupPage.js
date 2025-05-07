import React, { useContext } from 'react';
import TeamLineup from './TeamLineup';
import { PlayerContext } from '../context/PlayerContext';

const LineupPage = () => {
  const { 
    nhlLineup, 
    ahlLineup, 
    addPlayerToNhlLineup, 
    addPlayerToAhlLineup, 
    removePlayerFromNhlLineup, 
    removePlayerFromAhlLineup 
  } = useContext(PlayerContext);

  return (
    <div className="lineup-page">
      <div className="lineups-container">
        <div className="lineup-column">
          <TeamLineup 
            team="NHL" 
            lineup={nhlLineup} 
            addPlayerToLineup={addPlayerToNhlLineup}
            removePlayerFromLineup={removePlayerFromNhlLineup}
          />
        </div>
        <div className="lineup-column">
          <TeamLineup 
            team="AHL" 
            lineup={ahlLineup} 
            addPlayerToLineup={addPlayerToAhlLineup}
            removePlayerFromLineup={removePlayerFromAhlLineup}
          />
        </div>
      </div>
    </div>
  );
};

export default LineupPage;