import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY_VIMEO_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('play', onPlay);

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onPlay() {
  if (localStorage.getItem(STORAGE_KEY_VIMEO_TIME)) {
    player.setCurrentTime(localStorage.getItem(STORAGE_KEY_VIMEO_TIME));
  }
}

function onTimeUpdate() {
  player.getCurrentTime().then(currentTime => {
    localStorage.setItem(STORAGE_KEY_VIMEO_TIME, currentTime);
  });
}
