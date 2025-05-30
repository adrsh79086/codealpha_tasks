const songs = [
    {
      name: "song1",
      title: "Dreamer",
      cover: "images/cover1.png",
      file: "songs/song1.mp3",
      description: "An uplifting track that inspires dreams and possibilities."
    },
    {
      name: "song2",
      title: "Chill Vibes",
      cover: "images/cover2.png",
      file: "songs/song2.mp3",
      description: "Smooth chillhop beats perfect for relaxing or studying."
    },
    {
      name: "song3",
      title: "Ocean Deep",
      cover: "images/cover3.jpg",
      file: "songs/song3.mp3",
      description: "A soothing melody that echoes the calmness of the ocean."
    }
  ];
  
  let currentSongIndex = 0;
  let isPlaying = false;
  let isFavorite = false;
  
  // Elements
  const audio = document.getElementById("audio");
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const cover = document.getElementById("cover");
  const playPause = document.getElementById("playPause");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const favBtn = document.getElementById("fav");
  const progressBar = document.getElementById("progressBar");
  const currentTimeEl = document.getElementById("currentTime");
  const durationEl = document.getElementById("duration");
  
  // Load a song
  function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    description.textContent = song.description;
    cover.src = song.cover;
    audio.src = song.file;
    progressBar.value = 0;
    currentTimeEl.textContent = "0:00";
    durationEl.textContent = "4:00";
    playPause.textContent = "▶️";
    isPlaying = false;
    isFavorite = false;
    favBtn.classList.remove("favorited");
    favBtn.textContent = "🤍";
  }
  
  // Format time MM:SS
  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  }
  
  // Play or pause
  playPause.addEventListener("click", () => {
    if (!isPlaying) {
      audio.play();
      playPause.textContent = "⏸️";
    } else {
      audio.pause();
      playPause.textContent = "▶️";
    }
    isPlaying = !isPlaying;
  });
  
  // Next / Prev
  nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) audio.play();
  });
  
  prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) audio.play();
  });
  
  // Toggle favorite
  favBtn.addEventListener("click", () => {
    isFavorite = !isFavorite;
    favBtn.classList.toggle("favorited", isFavorite);
    favBtn.textContent = isFavorite ? "❤️" : "🤍";
  });
  
  // Load metadata
  audio.addEventListener("loadedmetadata", () => {
    progressBar.max = audio.duration;
    durationEl.textContent = formatTime(audio.duration);
  });
  
  // Update progress/time
  audio.addEventListener("timeupdate", () => {
    progressBar.value = audio.currentTime;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });
  
  // Seek
  progressBar.addEventListener("input", () => {
    audio.currentTime = progressBar.value;
  });
  
  // Load initial song
  loadSong(currentSongIndex);
  