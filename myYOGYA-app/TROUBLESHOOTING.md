# 🔧 Troubleshooting Guide - Scanner Button

## Issue: Scanner Button Tidak Berfungsi

Jika tombol "Scan Member" tidak membuka scanner saat diklik, ikuti langkah troubleshooting berikut:

---

## ✅ Quick Fixes

### 1. **Hard Refresh Browser**
Kadang browser cache menyebabkan masalah.

**Cara:**
- **Windows/Linux**: `Ctrl + Shift + R` atau `Ctrl + F5`
- **Mac**: `Cmd + Shift + R`
- **Mobile**: Settings → Clear browsing data → Cache

### 2. **Buka di Tab Baru**
Buka aplikasi di incognito/private mode:

**Cara:**
- **Desktop**: `Ctrl + Shift + N` (Chrome) atau `Ctrl + Shift + P` (Firefox)
- **Mobile**: Gunakan private/incognito mode

### 3. **Restart Server (Developer)**
```bash
cd /home/user/webapp/myYOGYA-app

# Kill server
pkill -f "vite"

# Start fresh
npm run dev -- --host
```

---

## 🔍 Diagnostic Steps

### Step 1: Check Console
Buka Developer Tools dan lihat Console:

**Cara:**
- **Desktop**: `F12` atau `Ctrl + Shift + I`
- **Mobile**: Use Remote Debugging

**Expected Logs:**
```
Scanner isOpen changed: false
Menu clicked: Scan scan
Opening scanner...
Scanner isOpen changed: true
```

### Step 2: Check Network Tab
1. Buka DevTools → Network tab
2. Reload page
3. Pastikan semua files ter-load tanpa error (404/500)

### Step 3: Check Button Element
1. Buka DevTools → Elements/Inspector
2. Find button dengan class "menu-item"
3. Check if `on:click` handler attached
4. Try clicking from DevTools console:
```javascript
document.querySelector('.menu-grid button:nth-child(2)').click()
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Button Tidak Ada Event Handler
**Symptom:** Click tidak trigger apapun

**Solution:**
```bash
# Restart server
cd /home/user/webapp/myYOGYA-app
npm run dev -- --host
```

### Issue 2: Scanner Component Tidak Load
**Symptom:** Console shows "Scanner is not defined"

**Check:**
```bash
# Pastikan file ada
ls -la src/lib/Scanner.svelte

# Check import di MenuGrid.svelte
grep "import Scanner" src/lib/MenuGrid.svelte
```

### Issue 3: State Tidak Update
**Symptom:** `showScanner` tetap false

**Test in Console:**
```javascript
// Should show true when button clicked
console.log('showScanner:', showScanner);
```

### Issue 4: Camera Permission
**Symptom:** Scanner terbuka tapi camera tidak aktif

**Solution:**
1. Check browser camera permission
2. Allow camera access when prompted
3. HTTPS required for camera (not localhost)

---

## 🧪 Manual Testing

### Test 1: Direct State Change
Buka Console dan run:
```javascript
// This should open scanner
showScanner = true;
```

### Test 2: Click via Console
```javascript
// Find and click button
const buttons = document.querySelectorAll('.menu-item');
buttons[1].click(); // Scan Member is 2nd button (index 1)
```

### Test 3: Check Component Mount
```javascript
// Should exist
document.querySelector('.scanner-overlay');
```

---

## 📱 Browser Compatibility

### Supported Browsers:
- ✅ Chrome 90+ (Desktop & Mobile)
- ✅ Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+ (iOS/Mac)
- ⚠️ Opera 76+
- ❌ IE (Not supported)

### Camera API Support:
- Requires HTTPS in production
- localhost works without HTTPS
- Some browsers need permission manually

---

## 🔄 Reset Application

### Full Reset:
```bash
cd /home/user/webapp/myYOGYA-app

# 1. Stop server
pkill -f "vite"

# 2. Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# 3. Start fresh
npm run dev -- --host
```

### Clear Browser Data:
1. Open Settings
2. Privacy & Security
3. Clear browsing data
4. Select: Cookies, Cache, Site data
5. Clear
6. Reload app

---

## 📞 Get Help

If issue persists:

1. **Check Console Errors**
   - Open DevTools
   - Look for red errors
   - Copy error message

2. **Verify Setup**
   ```bash
   # Check if server running
   curl http://localhost:5174
   
   # Check Scanner component
   cat src/lib/Scanner.svelte | head -10
   ```

3. **Test with Simple Button**
   Create test file:
   ```html
   <button onclick="alert('Works!')">Test</button>
   ```

---

## 🎯 Expected Behavior

When working correctly:

1. **Click "Scan Member" button**
   → Console: "Menu clicked: Scan scan"
   → Console: "Opening scanner..."
   → Console: "Scanner isOpen changed: true"

2. **Scanner Modal Opens**
   → Full-screen overlay appears
   → Camera permission requested (first time)
   → Live camera preview shows

3. **Scan QR/Barcode**
   → Auto-detection happens
   → Success message appears
   → Auto-close after 2 seconds

---

## 💡 Alternative Testing

If scanner button still not working, test with:

### Direct URL Access:
```
https://5174-ihgvy8prmtiz9nb3otr5u-583b4d74.sandbox.novita.ai
```

### Test Scanner Component Separately:
```javascript
// In browser console
import Scanner from './lib/Scanner.svelte';
// Test component mounting
```

---

## 📋 Checklist

Before reporting issue, verify:

- [ ] Browser is up to date
- [ ] Hard refresh done (Ctrl+Shift+R)
- [ ] Console shows no errors
- [ ] Server is running
- [ ] Button element exists in DOM
- [ ] Scanner.svelte file exists
- [ ] MenuGrid imports Scanner
- [ ] Camera permission granted (for actual scanning)

---

**Last Updated:** 2025-12-13
**Version:** 1.2.0
