const AI = {
  aiMove: () => {
    return {
      tile: Math.floor(Math.random() * 25),
      move: Math.floor(Math.random() * 3),
    };
  },

  aiTie: () => {
    return Math.floor(Math.random() * 3);
  },
};
export default AI;
