<script>
  import { navigateToSubPage } from '../stores/navigation.js';

  function goBack() {
    navigateToSubPage(null);
  }

  // Sample transaction data
  let currentPage = 1;
  let totalPages = 2;

  const transactions = [
    {
      id: 1,
      date: '11 Dec 2025',
      store: 'XPRESS YOGYA CENTER',
      amount: 10000,
      paymentType: 'Pembayaran tunai',
      category: 'F&B',
      categoryColor: '#FFD700'
    },
    {
      id: 2,
      date: '08 Dec 2025',
      store: 'XPRESS YOGYA CENTER',
      amount: 50500,
      paymentType: 'Pembayaran Local Currency',
      category: 'F&B',
      categoryColor: '#FFD700'
    },
    {
      id: 3,
      date: '29 Nov 2025',
      store: 'YOGYA SOREANG',
      amount: 49000,
      paymentType: 'Pembayaran tunai',
      category: 'F&B',
      categoryColor: '#FFD700'
    },
    {
      id: 4,
      date: '29 Nov 2025',
      store: 'YOGYA SOREANG',
      amount: 299956,
      paymentType: 'Pembayaran Credit Card',
      category: 'Supermarket',
      categoryColor: '#28A745'
    },
    {
      id: 5,
      date: '25 Nov 2025',
      store: 'XPRESS YOGYA CENTER',
      amount: 28500,
      paymentType: 'Pembayaran tunai',
      category: 'F&B',
      categoryColor: '#FFD700'
    }
  ];

  function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('IDR', 'Rp');
  }

  function handleTransactionClick(transactionId) {
    // Navigate to transaction detail
  }
</script>

<div class="transaction-history-page">
  <!-- Header -->
  <div class="header">
    <button class="back-button" on:click={goBack}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <h1 class="title">Riwayat Transaksi</h1>
  </div>

  <!-- Transaction List -->
  <div class="transaction-list">
    {#each transactions as transaction (transaction.id)}
      <div class="transaction-card" on:click={() => handleTransactionClick(transaction.id)}>
        <div class="transaction-content">
          <div class="transaction-left">
            <div class="transaction-date">
              <div class="date-day">{transaction.date.split(' ')[0]}</div>
              <div class="date-month">{transaction.date.split(' ')[1]}</div>
              <div class="date-year">{transaction.date.split(' ')[2]}</div>
            </div>
          </div>

          <div class="transaction-main">
            <div class="store-name">{transaction.store}</div>
            <div class="amount">{formatCurrency(transaction.amount)}</div>
            <div class="payment-type">{transaction.paymentType}</div>
            <div class="category-badge" style="background-color: {transaction.categoryColor}">
              {transaction.category}
            </div>
          </div>

          <div class="transaction-right">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#FF6B35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Pagination -->
  <div class="pagination">
    <span>{currentPage} dari {totalPages}</span>
  </div>
</div>

<style>
  .transaction-history-page {
    min-height: 100vh;
    background: #F5F5F5;
    padding-bottom: 80px;
  }

  .header {
    background: white;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .back-button {
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
  }

  .back-button:hover {
    opacity: 0.7;
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .transaction-list {
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .transaction-card {
    background: white;
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .transaction-card:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transform: translateY(-2px);
  }

  .transaction-content {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  .transaction-left {
    flex-shrink: 0;
  }

  .transaction-date {
    text-align: center;
    min-width: 45px;
  }

  .date-day {
    font-size: 32px;
    font-weight: 700;
    color: #666;
    line-height: 1;
  }

  .date-month {
    font-size: 14px;
    font-weight: 500;
    color: #666;
    margin-top: 2px;
  }

  .date-year {
    font-size: 12px;
    color: #999;
    margin-top: 2px;
  }

  .transaction-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .store-name {
    font-size: 16px;
    font-weight: 700;
    color: #FF6B35;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .amount {
    font-size: 15px;
    font-weight: 600;
    color: #333;
  }

  .payment-type {
    font-size: 13px;
    color: #666;
    margin-bottom: 4px;
  }

  .category-badge {
    display: inline-block;
    padding: 6px 20px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    color: white;
    text-align: center;
    max-width: 150px;
  }

  .transaction-right {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .pagination {
    text-align: center;
    padding: 20px;
    font-size: 14px;
    color: #666;
    font-weight: 500;
  }

  /* Responsive */
  @media (max-width: 480px) {
    .transaction-card {
      padding: 12px;
    }

    .transaction-content {
      gap: 12px;
    }

    .date-day {
      font-size: 28px;
    }

    .store-name {
      font-size: 14px;
    }

    .amount {
      font-size: 14px;
    }
  }
</style>
