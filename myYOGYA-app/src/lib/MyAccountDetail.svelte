<script>
  import { navigateToSubPage } from '../stores/navigation.js';

  // Form data
  let formData = {
    namaLengkap: 'FENDI PRAMUDITO',
    jenisKelamin: 'Male',
    nomorKartu: '3277010706920022',
    email: 'fendipramu92@gmail.com',
    nomorHandphone: '083840616716',
    provinsi: 'JAWA BARAT',
    kota: 'BANDUNG, KAB.',
    kecamatan: 'ARJASARI',
    kelurahan: 'BAROS, 40379',
    alamat: 'CISEGEL'
  };

  let isEditing = false;

  function handleBack() {
    navigateToSubPage(null); // Go back to account page
  }

  function handleEdit() {
    isEditing = true;
  }

  function handleSave() {
    isEditing = false;
    // Here you would typically save to backend
    alert('Data berhasil diubah!');
  }

  function handleCancel() {
    isEditing = false;
    // Reset form data to original values
    formData = {
      namaLengkap: 'FENDI PRAMUDITO',
      jenisKelamin: 'Male',
      nomorKartu: '3277010706920022',
      email: 'fendipramu92@gmail.com',
      nomorHandphone: '083840616716',
      provinsi: 'JAWA BARAT',
      kota: 'BANDUNG, KAB.',
      kecamatan: 'ARJASARI',
      kelurahan: 'BAROS, 40379',
      alamat: 'CISEGEL'
    };
  }
</script>

<div class="account-detail-page">
  <!-- Header -->
  <div class="account-header">
    <button class="back-button" on:click={handleBack}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="#333"/>
      </svg>
    </button>
    <h1 class="header-title">Akun</h1>
    <div class="header-spacer"></div>
  </div>

  <!-- Form Content -->
  <div class="form-container">
    <!-- Nama Lengkap -->
    <div class="form-group">
      <label class="form-label">Nama Lengkap</label>
      {#if isEditing}
        <input 
          type="text" 
          class="form-input" 
          bind:value={formData.namaLengkap}
        />
      {:else}
        <div class="form-value">{formData.namaLengkap}</div>
      {/if}
    </div>

    <!-- Jenis Kelamin -->
    <div class="form-group">
      <label class="form-label">Jenis Kelamin</label>
      {#if isEditing}
        <select class="form-input" bind:value={formData.jenisKelamin}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      {:else}
        <div class="form-value">{formData.jenisKelamin}</div>
      {/if}
    </div>

    <!-- Nomor Kartu Tanda Pengenal -->
    <div class="form-group">
      <label class="form-label">Nomor Kartu Tanda Pengenal</label>
      {#if isEditing}
        <input 
          type="text" 
          class="form-input" 
          bind:value={formData.nomorKartu}
          maxlength="16"
        />
      {:else}
        <div class="form-value">{formData.nomorKartu}</div>
      {/if}
    </div>

    <!-- Alamat Email -->
    <div class="form-group">
      <label class="form-label">Alamat Email</label>
      {#if isEditing}
        <input 
          type="email" 
          class="form-input" 
          bind:value={formData.email}
        />
      {:else}
        <div class="form-value">{formData.email}</div>
      {/if}
    </div>

    <!-- Nomor Handphone -->
    <div class="form-group">
      <label class="form-label">Nomor Handphone</label>
      {#if isEditing}
        <input 
          type="tel" 
          class="form-input" 
          bind:value={formData.nomorHandphone}
        />
      {:else}
        <div class="form-value">{formData.nomorHandphone}</div>
      {/if}
    </div>

    <!-- Provinsi -->
    <div class="form-group">
      <label class="form-label">Provinsi</label>
      {#if isEditing}
        <input 
          type="text" 
          class="form-input" 
          bind:value={formData.provinsi}
        />
      {:else}
        <div class="form-value">{formData.provinsi}</div>
      {/if}
    </div>

    <!-- Kota -->
    <div class="form-group">
      <label class="form-label">Kota</label>
      {#if isEditing}
        <input 
          type="text" 
          class="form-input" 
          bind:value={formData.kota}
        />
      {:else}
        <div class="form-value">{formData.kota}</div>
      {/if}
    </div>

    <!-- Kecamatan -->
    <div class="form-group">
      <label class="form-label">Kecamatan</label>
      {#if isEditing}
        <input 
          type="text" 
          class="form-input" 
          bind:value={formData.kecamatan}
        />
      {:else}
        <div class="form-value">{formData.kecamatan}</div>
      {/if}
    </div>

    <!-- Kelurahan -->
    <div class="form-group">
      <label class="form-label">Kelurahan</label>
      {#if isEditing}
        <input 
          type="text" 
          class="form-input" 
          bind:value={formData.kelurahan}
        />
      {:else}
        <div class="form-value">{formData.kelurahan}</div>
      {/if}
    </div>

    <!-- Alamat -->
    <div class="form-group">
      <label class="form-label">Alamat</label>
      {#if isEditing}
        <textarea 
          class="form-input form-textarea" 
          bind:value={formData.alamat}
          rows="3"
        ></textarea>
      {:else}
        <div class="form-value">{formData.alamat}</div>
      {/if}
    </div>

    <!-- Action Buttons -->
    <div class="button-container">
      {#if isEditing}
        <button class="btn-secondary" on:click={handleCancel}>
          BATAL
        </button>
        <button class="btn-primary" on:click={handleSave}>
          SIMPAN
        </button>
      {:else}
        <button class="btn-primary full-width" on:click={handleEdit}>
          UBAH
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
  .account-detail-page {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding-bottom: 80px;
  }

  /* Header */
  .account-header {
    background: white;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .back-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .back-button:active {
    opacity: 0.6;
  }

  .header-title {
    color: #333;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }

  .header-spacer {
    width: 40px;
  }

  /* Form Container */
  .form-container {
    padding: 20px 16px;
  }

  .form-group {
    margin-bottom: 24px;
  }

  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }

  .form-value {
    font-size: 14px;
    color: #999;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .form-input {
    width: 100%;
    padding: 12px 0;
    font-size: 14px;
    color: #333;
    background: transparent;
    border: none;
    border-bottom: 2px solid #e0e0e0;
    outline: none;
    transition: border-color 0.3s ease;
    font-family: inherit;
  }

  .form-input:focus {
    border-bottom-color: #ff6347;
  }

  .form-input::placeholder {
    color: #ccc;
  }

  .form-textarea {
    resize: vertical;
    min-height: 60px;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  select.form-input {
    padding-right: 24px;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0 center;
    appearance: none;
    cursor: pointer;
  }

  /* Buttons */
  .button-container {
    margin-top: 40px;
    display: flex;
    gap: 12px;
  }

  .btn-primary,
  .btn-secondary {
    flex: 1;
    padding: 16px 24px;
    border: none;
    border-radius: 28px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.5px;
  }

  .btn-primary {
    background: #ff6347;
    color: white;
    box-shadow: 0 4px 12px rgba(255, 99, 71, 0.3);
  }

  .btn-primary:hover {
    background: #ff5533;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 99, 71, 0.4);
  }

  .btn-primary:active {
    transform: translateY(0);
  }

  .btn-primary.full-width {
    flex: 1;
  }

  .btn-secondary {
    background: white;
    color: #666;
    border: 2px solid #e0e0e0;
    box-shadow: none;
  }

  .btn-secondary:hover {
    background: #f8f8f8;
    border-color: #ccc;
  }

  .btn-secondary:active {
    background: #f0f0f0;
  }

  /* Responsive adjustments */
  @media (max-width: 360px) {
    .form-container {
      padding: 16px 12px;
    }

    .form-label {
      font-size: 13px;
    }

    .form-input,
    .form-value {
      font-size: 13px;
    }

    .btn-primary,
    .btn-secondary {
      font-size: 14px;
      padding: 14px 20px;
    }
  }
</style>
