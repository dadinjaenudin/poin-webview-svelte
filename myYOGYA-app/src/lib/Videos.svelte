<script>
  const videos = [
    {
      id: 1,
      thumbnail: '🎬',
      title: 'Bolen Lilit udah mendarat di...',
      duration: '4:00ms (Satisfied)',
      bgColor: '#e0e0e0'
    },
    {
      id: 2,
      thumbnail: '🎥',
      title: 'Desember D nya adalah DUARR Bentar lagi...',
      duration: '3:30ms',
      bgColor: '#d0d0d0'
    }
  ];

  function handleVideoClick(video) {
    alert(`Playing video: ${video.title}`);
  }
</script>

<div class="videos-container">
  <h2 class="videos-title">Videos</h2>
  
  <div class="videos-grid">
    {#each videos as video (video.id)}
      <button class="video-card" on:click={() => handleVideoClick(video)}>
        <div class="video-thumbnail" style="background-color: {video.bgColor}">
          <div class="play-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="rgba(0,0,0,0.6)"/>
              <path d="M10 8l6 4-6 4V8z" fill="white"/>
            </svg>
          </div>
          <div class="thumbnail-emoji">{video.thumbnail}</div>
        </div>
        <div class="video-info">
          <h3 class="video-title">{video.title}</h3>
          {#if video.duration}
            <p class="video-duration">{video.duration}</p>
          {/if}
        </div>
      </button>
    {/each}
  </div>
</div>

<style>
  .videos-container {
    padding: 20px;
    background-color: white;
  }

  .videos-title {
    font-size: 18px;
    font-weight: 700;
    color: #333;
    margin: 0 0 16px 0;
  }

  .videos-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .video-card {
    background: white;
    border: none;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: left;
    padding: 0;
  }

  .video-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .video-card:active {
    transform: translateY(-2px);
  }

  .video-thumbnail {
    width: 100%;
    aspect-ratio: 16 / 10;
    background-color: #e0e0e0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .thumbnail-emoji {
    font-size: 48px;
    position: absolute;
    z-index: 1;
  }

  .play-icon {
    position: absolute;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .video-card:hover .play-icon {
    opacity: 1;
  }

  .video-info {
    padding: 12px;
  }

  .video-title {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 38px;
  }

  .video-duration {
    margin: 4px 0 0 0;
    font-size: 12px;
    color: #666;
  }
</style>
