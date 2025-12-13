<script>
  export let userName = "ANDRI CAHYANTI";
  export let checkInCount = 16;
  export let points = 725;
</script>

<div class="greeting-container">
  <div class="greeting-card">
    <div class="greeting-text">
      <span class="hi-text">Hi, {userName}</span>
      <span class="emoji">🤗</span>
    </div>
    <div class="stats">
      <div class="stat-item">
        <div class="stat-icon green">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="white"/>
          </svg>
        </div>
        <div class="stat-value">{checkInCount}</div>
      </div>
      <div class="stat-item">
        <div class="stat-icon yellow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white"/>
          </svg>
        </div>
        <div class="stat-value">{points}</div>
      </div>
    </div>
  </div>
</div>

<style>
  .greeting-container {
    padding: 20px;
    background: linear-gradient(135deg, #d32f2f 0%, #ff6b35 100%);
  }

  .greeting-card {
    background: white;
    border-radius: 16px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .greeting-text {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .hi-text {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .emoji {
    font-size: 20px;
  }

  .stats {
    display: flex;
    gap: 16px;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .stat-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stat-icon.green {
    background: linear-gradient(135deg, #4caf50 0%, #81c784 100%);
  }

  .stat-icon.yellow {
    background: linear-gradient(135deg, #ffc107 0%, #ffd54f 100%);
  }

  .stat-value {
    font-size: 16px;
    font-weight: 700;
    color: #333;
  }
</style>
