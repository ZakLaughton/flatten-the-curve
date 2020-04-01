const movePeople = peopleArray => {
  const newPeople = peopleArray.map(person => {
    return {
      location: [
        person.location[0] + Math.floor(Math.random() * 3 - 1),
        person.location[1] + Math.floor(Math.random() * 3 - 1)
      ]
    };
  });
  return newPeople;
};

const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PEOPLE':
      return {
        ...state,
        people: action.payload
      };
    case 'MOVE_PEOPLE':
      return {
        ...state,
        people: movePeople(state.people)
      };
    default:
      return state;
  }
};

export default Reducer;
