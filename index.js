// < playerId - id DOM элемента для встраивания iframe > < videoId - id видео с youtube.com >
const allVideoAndPlayerId = [
  {playerId : 'player1', videoId:  'qVMGlkcRqhg'},
  {playerId : 'player2', videoId: 'QilIBl6W3B0'},
  {playerId : 'player3', videoId: '2wACPQFjWSk'}
]

// Создаем кнопку для управления видео
function createVideoControl(text) {
  let btnContainer = document.createElement('div')
  btnContainer.classList.add('btn-control', `btn-control-${text}`)
  btnContainer.innerHTML = `<svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28 16L0.249999 31.5885L0.25 0.411542L28 16Z" fill="white"/></svg>`

  return btnContainer
}


// Асинхронная загрузка API IFrame Player
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Создает <iframe> (и проигрыватель YouTube) после загрузки кода API.
function createVideo(playerId, videoId, playBtn/*, stopBtn*/) {
  let player = new YT.Player(playerId, {
    width: '100%',
    videoId: videoId,
    playerVars: {
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      origin: 'https://itop55.github.io'
    },
    events: {
      'onStateChange': onPlayerStateChange
    }
  })

  // Статус воспроизведения видео ( <0 - видео закончилось >, <1 - воспроизведение видео>, <2 - видео остановлено>)
  function onPlayerStateChange(event) {
    switch(event.data) {
      case 0:
        //видео закончилось
        playBtn.classList.remove('hide')
        videoPoster.classList.remove('hide')
        break;
      case 1:
        //воспроизведение видео
        playBtn.classList.add('hide')
        videoPoster.classList.add('hide')
        break;
      case 2:
        //видео остановлено
        break;
    }
  }

  // Запуск видео
  playBtn.onclick = () => {
    player.playVideo()
  }

 /* // Остановка видео
  stopBtn.onclick = () => {
    player.stopVideo()
  }*/

  // Добавляем кнопки для управления
  let btnContainer = document.createElement('div')
  btnContainer.classList.add('btn-control-container')
  btnContainer.appendChild(playBtn)
  /*btnContainer.appendChild(stopBtn)*/
  let videoContainer = document.querySelector(`.${playerId}`);
  let videoPoster = videoContainer.querySelector('.video-poster');
  videoContainer.appendChild(btnContainer)
}

// Перебираем массив allVideoAndPlayerId и создаем для каждего элемента Iframe
function createAllIframe(arrVideoId) {
  arrVideoId.forEach(el => {
    createVideo(el.playerId, el.videoId, createVideoControl('Play')/*, createVideoControl('Stop')*/)
  })
}

// Запускае функцию после загрузки страницы
document.onreadystatechange = function(){
    if(document.readyState === 'complete'){
      createAllIframe(allVideoAndPlayerId)
    }
}
