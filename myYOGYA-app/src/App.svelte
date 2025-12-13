<script>
  import Header from './lib/Header.svelte';
  import UserGreeting from './lib/UserGreeting.svelte';
  import MenuGrid from './lib/MenuGrid.svelte';
  import Insights from './lib/Insights.svelte';
  import PromoWeekly from './lib/PromoWeekly.svelte';
  import Videos from './lib/Videos.svelte';
  import BottomNav from './lib/BottomNav.svelte';
</script>

<main>
  <div class="app-container">
    <Header />
    <div class="content">
      <UserGreeting />
      <MenuGrid />
      <Insights />
      <PromoWeekly />
      <Videos />
    </div>
    <BottomNav />
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: #f5f5f5;
  }

  :global(*) {
    box-sizing: border-box;
  }

  .app-container {
    max-width: 480px;
    margin: 0 auto;
    background-color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .content {
    flex: 1;
    padding-bottom: 80px;
    overflow-y: auto;
  }

  main {
    width: 100%;
    height: 100vh;
  }
</style>
