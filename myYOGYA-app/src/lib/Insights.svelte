<script>
  const insights = [
    {
      id: 1,
      title: 'Mager Perpanjang MEMBER?',
      subtitle: 'Perpanjang di MyYOGYA aja!',
      bgColor: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
      image: '🛍️'
    },
    {
      id: 2,
      title: 'Sudah Saatnya',
      subtitle: 'ke Member MyYOGYA',
      bgColor: 'linear-gradient(135deg, #d32f2f 0%, #c62828 100%)',
      image: '🎁'
    }
  ];

  let currentSlide = 0;

  function nextSlide() {
    currentSlide = (currentSlide + 1) % insights.length;
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + insights.length) % insights.length;
  }
</script>

<div class="insights-container">
  <h2 class="insights-title">Insights</h2>
  
  <div class="carousel">
    <div class="carousel-track" style="transform: translateX(-{currentSlide * 100}%)">
      {#each insights as insight (insight.id)}
        <div class="insight-card" style="background: {insight.bgColor}">
          <div class="insight-content">
            <div class="insight-icon">{insight.image}</div>
            <div class="insight-text">
              <h3>{insight.title}</h3>
              <p>{insight.subtitle}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="carousel-dots">
    {#each insights as _, index}
      <button 
        class="dot" 
        class:active={currentSlide === index}
        on:click={() => currentSlide = index}
      ></button>
    {/each}
  </div>
</div>

<style>
  .insights-container {
    padding: 20px;
    background-color: #f5f5f5;
  }

  .insights-title {
    font-size: 18px;
    font-weight: 700;
    color: #333;
    margin: 0 0 16px 0;
  }

  .carousel {
    overflow: hidden;
    border-radius: 16px;
    position: relative;
  }

  .carousel-track {
    display: flex;
    transition: transform 0.3s ease-in-out;
  }

  .insight-card {
    min-width: 100%;
    border-radius: 16px;
    padding: 24px;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .insight-content {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .insight-icon {
    font-size: 48px;
    flex-shrink: 0;
  }

  .insight-text h3 {
    margin: 0 0 4px 0;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.3;
  }

  .insight-text p {
    margin: 0;
    font-size: 14px;
    opacity: 0.95;
  }

  .carousel-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ccc;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: all 0.3s ease;
  }

  .dot.active {
    background-color: #d32f2f;
    width: 24px;
    border-radius: 4px;
  }
</style>
