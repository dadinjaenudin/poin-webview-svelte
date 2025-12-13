<script>
  let showNotifications = false;
</script>

<header>
  <div class="header-content">
    <h1 class="logo">
      <span class="my">My</span><span class="yogya">YOGYA</span>
    </h1>
    <button class="notification-btn" on:click={() => showNotifications = !showNotifications}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="white"/>
      </svg>
    </button>
  </div>
</header>

<style>
  header {
    background: linear-gradient(135deg, #d32f2f 0%, #ff6b35 100%);
    padding: 12px 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: white;
    font-style: italic;
  }

  .my {
    font-weight: 400;
  }

  .yogya {
    font-weight: 700;
  }

  .notification-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.3s;
  }

  .notification-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .notification-btn:active {
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>
