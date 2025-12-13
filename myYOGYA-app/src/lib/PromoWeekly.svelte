<script>
  const promoItems = [
    {
      id: 1,
      title: 'PASTI HEMAT',
      subtitle: '♥ YOMAET',
      bgColor: 'linear-gradient(135deg, #c62828 0%, #e53935 100%)',
      image: '💰'
    },
    {
      id: 2,
      title: 'BUMINTEN',
      subtitle: 'BELANJA MURAH MINGGU TENTEN',
      bgColor: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
      image: '🛍️'
    }
  ];
</script>

<div class="promo-container">
  <h2 class="promo-title">Promo Nasional Mingguan</h2>
  
  <div class="promo-grid">
    {#each promoItems as promo (promo.id)}
      <button class="promo-card" style="background: {promo.bgColor}">
        <div class="promo-icon">{promo.image}</div>
        <div class="promo-text">
          <h3>{promo.title}</h3>
          {#if promo.subtitle}
            <p>{promo.subtitle}</p>
          {/if}
        </div>
      </button>
    {/each}
  </div>
</div>

<style>
  .promo-container {
    padding: 20px;
    background-color: #f5f5f5;
  }

  .promo-title {
    font-size: 18px;
    font-weight: 700;
    color: #333;
    margin: 0 0 16px 0;
  }

  .promo-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .promo-card {
    background: linear-gradient(135deg, #d32f2f 0%, #f44336 100%);
    border: none;
    border-radius: 12px;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    min-height: 140px;
    position: relative;
    overflow: hidden;
  }

  .promo-card::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }

  .promo-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  .promo-card:active {
    transform: translateY(-2px);
  }

  .promo-icon {
    font-size: 48px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }

  .promo-text {
    text-align: center;
    color: white;
    position: relative;
    z-index: 1;
  }

  .promo-text h3 {
    margin: 0;
    font-size: 24px;
    font-weight: 900;
    letter-spacing: 1px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    line-height: 1.2;
  }

  .promo-text p {
    margin: 4px 0 0 0;
    font-size: 11px;
    font-weight: 600;
    opacity: 0.95;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }
</style>
