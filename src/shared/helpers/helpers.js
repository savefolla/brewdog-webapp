
export function onBeerStarClick(beerId) {
  let favoriteBeersIds = JSON.parse(localStorage.getItem('favoriteBeersIds'));
  if (favoriteBeersIds) {
    const index = favoriteBeersIds.indexOf(beerId);
    if (index === -1) favoriteBeersIds.push(beerId);
    else favoriteBeersIds.splice(index, 1);
    localStorage.setItem('favoriteBeersIds', JSON.stringify(favoriteBeersIds));
  } else {
    localStorage.setItem('favoriteBeersIds', JSON.stringify([beerId]));
  }
}