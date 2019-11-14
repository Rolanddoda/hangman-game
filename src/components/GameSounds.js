const sounds = {
  correct: new Audio(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/goodbell.mp3"
  ),
  wrong: new Audio(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/bad.mp3"
  ),
  won: new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/win.mp3"),
  lost: new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/lose.mp3")
};

sounds.correct.volume = 0.4;
sounds.wrong.volume = 0.4;
sounds.won.volume = 0.4;
sounds.lost.volume = 0.4;

export function stopSound(sound) {
  sounds[sound].pause();
  sounds[sound].currentTime = 0;
}

// sound: correct, wrong, won, lost
export function playSound(sound) {
  stopSound(sound);
  sounds[sound].play();
}
