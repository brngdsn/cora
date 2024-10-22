function chill(seconds) {
  return new Promise(r => setTimeout(r, seconds * 1000));
}

export default { chill };
