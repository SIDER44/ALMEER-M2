// Audio player
let audio = new Audio();
let currentPlaylist = [];
let currentIndex = 0;
let isPlaying = false;

// Sample music data (using royalty-free demo songs)
const sampleSongs = [
    { title: "Summer Vibes", artist: "ALMEER Beats", duration: "3:45", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Midnight Groove", artist: "ALMEER Beats", duration: "4:20", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { title: "Urban Flow", artist: "ALMEER Beats", duration: "3:15", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { title: "Chill Morning", artist: "ALMEER Beats", duration: "5:30", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
    { title: "Night Ride", artist: "ALMEER Beats", duration: "3:55", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
    { title: "Electric Dreams", artist: "ALMEER Beats", duration: "4:10", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
    { title: "Ocean Waves", artist: "ALMEER Beats", duration: "6:15", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
    { title: "City Lights", artist: "ALMEER Beats", duration: "3:40", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
    { title: "Sunset Drive", artist: "ALMEER Beats", duration: "4:50", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
    { title: "Morning Coffee", artist: "ALMEER Beats", duration: "3:25", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
    { title: "Dance Floor", artist: "ALMEER Beats", duration: "4:45", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
    { title: "Rainy Day", artist: "ALMEER Beats", duration: "5:20", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" }
];

// Search function
function searchMusic() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        displayResults(sampleSongs);
        return;
    }

    // Show loading
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '<div class="loading"><i class="fas fa-spinner"></i><p>Searching...</p></div>';

    // Simulate search delay
    setTimeout(() => {
        // Filter songs based on search term
        const results = sampleSongs.filter(song => 
            song.title.toLowerCase().includes(searchTerm) || 
            song.artist.toLowerCase().includes(searchTerm)
        );
        
        displayResults(results.length > 0 ? results : sampleSongs);
    }, 500);
}

// Display search results
function displayResults(songs) {
    const resultsDiv = document.getElementById('searchResults');
    
    if (!songs || songs.length === 0) {
        resultsDiv.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No results found. Try a different search.</p>
            </div>
        `;
        return;
    }

    resultsDiv.innerHTML = '';
    songs.forEach((song, index) => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.onclick = () => playSong(song);
        item.innerHTML = `
            <div class="result-thumb">
                <i class="fas fa-play-circle"></i>
            </div>
            <div class="result-info">
                <div class="result-title">${song.title}</div>
                <div class="result-artist">${song.artist}</div>
            </div>
            <div class="result-duration">${song.duration}</div>
        `;
        resultsDiv.appendChild(item);
    });
}

// Play selected song
function playSong(song) {
    currentPlaylist = [song];
    currentIndex = 0;
    
    // Update UI
    document.getElementById('nowPlayingTitle').textContent = song.title;
    document.getElementById('nowPlayingArtist').textContent = song.artist;
    
    // Play audio
    audio.src = song.audioUrl;
    audio.play();
    isPlaying = true;
    document.getElementById('playIcon').className = 'fas fa-pause';
}

// Toggle play/pause
function togglePlay() {
    if (audio.src) {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        isPlaying = !isPlaying;
        document.getElementById('playIcon').className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }
}

// Next song
function nextSong() {
    if (sampleSongs.length > 0) {
        const randomIndex = Math.floor(Math.random() * sampleSongs.length);
        playSong(sampleSongs[randomIndex]);
    }
}

// Previous song
function prevSong() {
    if (sampleSongs.length > 0) {
        const randomIndex = Math.floor(Math.random() * sampleSongs.length);
        playSong(sampleSongs[randomIndex]);
    }
}

// Update progress bar
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        document.getElementById('progress').style.width = progress + '%';
        document.getElementById('currentTime').textContent = formatTime(audio.currentTime);
        document.getElementById('duration').textContent = formatTime(audio.duration);
    }
});

// Click on progress bar
document.getElementById('progressBar').addEventListener('click', function(e) {
    if (audio.duration) {
        const rect = this.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        audio.currentTime = clickPosition * audio.duration;
    }
});

// Format time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Handle audio end
audio.addEventListener('ended', nextSong);

// Initialize with sample songs
displayResults(sampleSongs);

// Add enter key support
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchMusic();
    }
});
