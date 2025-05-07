import React, { createContext, useState, useEffect } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  // Load data from localStorage or use empty arrays as default
  const [players, setPlayers] = useState(() => {
    const savedPlayers = localStorage.getItem('players');
    return savedPlayers ? JSON.parse(savedPlayers) : [];
  });

  const [nhlLineup, setNhlLineup] = useState(() => {
    const savedLineup = localStorage.getItem('nhlLineup');
    return savedLineup ? JSON.parse(savedLineup) : {
      forwards: {
        line1: { lw: null, c: null, rw: null },
        line2: { lw: null, c: null, rw: null },
        line3: { lw: null, c: null, rw: null },
        line4: { lw: null, c: null, rw: null },
      },
      defense: {
        pair1: { ld: null, rd: null },
        pair2: { ld: null, rd: null },
        pair3: { ld: null, rd: null },
      },
      goalies: {
        starter: null,
        backup: null,
      }
    };
  });

  const [ahlLineup, setAhlLineup] = useState(() => {
    const savedLineup = localStorage.getItem('ahlLineup');
    return savedLineup ? JSON.parse(savedLineup) : {
      forwards: {
        line1: { lw: null, c: null, rw: null },
        line2: { lw: null, c: null, rw: null },
        line3: { lw: null, c: null, rw: null },
        line4: { lw: null, c: null, rw: null },
      },
      defense: {
        pair1: { ld: null, rd: null },
        pair2: { ld: null, rd: null },
        pair3: { ld: null, rd: null },
      },
      goalies: {
        starter: null,
        backup: null,
      }
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('nhlLineup', JSON.stringify(nhlLineup));
  }, [nhlLineup]);

  useEffect(() => {
    localStorage.setItem('ahlLineup', JSON.stringify(ahlLineup));
  }, [ahlLineup]);

  // Add a new player to the roster
  const addPlayer = (player) => {
    setPlayers([...players, { ...player, id: Date.now() }]);
  };

  // Delete a player from the roster
  const deletePlayer = (id) => {
    // Remove player from roster
    setPlayers(players.filter(player => player.id !== id));

    // Also remove player from any lineup positions
    removePlayerFromLineups(id);
  };

  // Edit a player's information
  const editPlayer = (id, updatedPlayer) => {
    setPlayers(players.map(player => 
      player.id === id ? { ...updatedPlayer, id } : player
    ));
  };

  // Helper to check if a player is in a lineup
  const findPlayerInLineup = (lineup, playerId) => {
    // Check forwards
    for (const line in lineup.forwards) {
      for (const position in lineup.forwards[line]) {
        if (lineup.forwards[line][position]?.id === playerId) {
          return { section: 'forwards', line, position };
        }
      }
    }
    
    // Check defense
    for (const pair in lineup.defense) {
      for (const position in lineup.defense[pair]) {
        if (lineup.defense[pair][position]?.id === playerId) {
          return { section: 'defense', line: pair, position };
        }
      }
    }
    
    // Check goalies
    for (const position in lineup.goalies) {
      if (lineup.goalies[position]?.id === playerId) {
        return { section: 'goalies', position };
      }
    }
    
    return null;
  };

  // Remove player from all lineups
  const removePlayerFromLineups = (playerId) => {
    // Check NHL lineup
    const nhlPosition = findPlayerInLineup(nhlLineup, playerId);
    if (nhlPosition) {
      const { section, line, position } = nhlPosition;
      const updatedLineup = { ...nhlLineup };
      
      if (section === 'goalies') {
        updatedLineup[section][position] = null;
      } else {
        updatedLineup[section][line][position] = null;
      }
      
      setNhlLineup(updatedLineup);
    }
    
    // Check AHL lineup
    const ahlPosition = findPlayerInLineup(ahlLineup, playerId);
    if (ahlPosition) {
      const { section, line, position } = ahlPosition;
      const updatedLineup = { ...ahlLineup };
      
      if (section === 'goalies') {
        updatedLineup[section][position] = null;
      } else {
        updatedLineup[section][line][position] = null;
      }
      
      setAhlLineup(updatedLineup);
    }
  };

  // Add player to NHL lineup
  const addPlayerToNhlLineup = (playerId, section, line, position) => {
    const player = players.find(p => p.id === playerId);
    if (!player) return;

    // First, remove the player from any other position in any lineup
    removePlayerFromLineups(playerId);

    // Then add them to the specified position
    const updatedLineup = { ...nhlLineup };
    
    if (section === 'goalies') {
      updatedLineup[section][position] = player;
    } else {
      updatedLineup[section][line][position] = player;
    }
    
    setNhlLineup(updatedLineup);
  };

  // Add player to AHL lineup
  const addPlayerToAhlLineup = (playerId, section, line, position) => {
    const player = players.find(p => p.id === playerId);
    if (!player) return;

    // First, remove the player from any other position in any lineup
    removePlayerFromLineups(playerId);

    // Then add them to the specified position
    const updatedLineup = { ...ahlLineup };
    
    if (section === 'goalies') {
      updatedLineup[section][position] = player;
    } else {
      updatedLineup[section][line][position] = player;
    }
    
    setAhlLineup(updatedLineup);
  };

  // Remove player from NHL lineup
  const removePlayerFromNhlLineup = (section, line, position) => {
    const updatedLineup = { ...nhlLineup };
    
    if (section === 'goalies') {
      updatedLineup[section][position] = null;
    } else {
      updatedLineup[section][line][position] = null;
    }
    
    setNhlLineup(updatedLineup);
  };

  // Remove player from AHL lineup
  const removePlayerFromAhlLineup = (section, line, position) => {
    const updatedLineup = { ...ahlLineup };
    
    if (section === 'goalies') {
      updatedLineup[section][position] = null;
    } else {
      updatedLineup[section][line][position] = null;
    }
    
    setAhlLineup(updatedLineup);
  };

  // Check if player is in any lineup
  const isPlayerInLineup = (playerId) => {
    return (
      findPlayerInLineup(nhlLineup, playerId) !== null ||
      findPlayerInLineup(ahlLineup, playerId) !== null
    );
  };

  // Get player lineup status (NHL, AHL, or None)
  const getPlayerLineupStatus = (playerId) => {
    if (findPlayerInLineup(nhlLineup, playerId)) {
      return 'NHL';
    } else if (findPlayerInLineup(ahlLineup, playerId)) {
      return 'AHL';
    } else {
      return 'None';
    }
  };

  // Get available players (not in any lineup)
  const getAvailablePlayers = () => {
    return players.filter(player => !isPlayerInLineup(player.id));
  };

  // Get players by position
  const getPlayersByPosition = (position) => {
    return players.filter(player => player.position === position);
  };

  return (
    <PlayerContext.Provider value={{
      players,
      nhlLineup,
      ahlLineup,
      addPlayer,
      deletePlayer,
      editPlayer,
      addPlayerToNhlLineup,
      addPlayerToAhlLineup,
      removePlayerFromNhlLineup,
      removePlayerFromAhlLineup,
      isPlayerInLineup,
      getPlayerLineupStatus,
      getAvailablePlayers,
      getPlayersByPosition
    }}>
      {children}
    </PlayerContext.Provider>
  );
};