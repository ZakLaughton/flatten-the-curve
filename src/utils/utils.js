export function shuffleArray(arrayToShuffle) {
  for (
    var j, x, i = arrayToShuffle.length;
    i;
    j = parseInt(Math.random() * i),
      x = arrayToShuffle[--i],
      arrayToShuffle[i] = arrayToShuffle[j],
      arrayToShuffle[j] = x
  );
  return arrayToShuffle;
}

export function getInfectedPeopleCount(people) {
  return people.filter((person) => !person.isCured && person.infectedDay >= 0).length;
}
