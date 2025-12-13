# 📷 Scanner Feature Guide

## Overview

Fitur Scanner QR Code dan Barcode telah ditambahkan ke aplikasi MyYOGYA. Scanner terintegrasi dengan menu "Scan Member" dan mendukung berbagai format barcode.

---

## 🎯 Features

### Supported Formats:
- ✅ **QR Code** - Most common 2D barcode
- ✅ **EAN-13** - International Article Number (13 digits)
- ✅ **EAN-8** - European Article Number (8 digits)
- ✅ **UPC-A** - Universal Product Code (12 digits)
- ✅ **UPC-E** - Compact UPC (6 digits)
- ✅ **Code 39** - Alphanumeric barcode
- ✅ **Code 93** - Enhanced Code 39
- ✅ **Code 128** - High-density barcode
- ✅ **ITF** - Interleaved 2 of 5
- ✅ **Codabar** - Old format still used in logistics

---

## 🚀 How to Use

### Method 1: From Menu Grid
1. Open the MyYOGYA app
2. Click on **"Scan Member"** button (orange QR icon)
3. Allow camera permission when prompted
4. Point camera at QR Code or Barcode
5. Scanner will automatically detect and process the code
6. Result will be displayed and scanner closes after 2 seconds

### Method 2: Programmatic Usage
```javascript
import Scanner from './lib/Scanner.svelte';

let showScanner = false;

function handleScanSuccess(decodedText, decodedResult) {
  console.log('Scanned:', decodedText);
  // Process the result
}

// In template:
<Scanner 
  isOpen={showScanner}
  onScanSuccess={handleScanSuccess}
  onClose={() => showScanner = false}
/>
```

---

## 🔧 Technical Details

### Library Used:
**html5-qrcode** v2.x
- Lightweight (~100KB)
- No external dependencies
- Works on all modern browsers
- Mobile-friendly

### Camera Configuration:
```javascript
{
  fps: 10,                    // Frames per second
  qrbox: { width: 250, height: 250 },  // Scan area
  aspectRatio: 1.0,          // Square aspect ratio
  formatsToSupport: [...]    // Multiple formats
}
```

### Performance:
- Scan Rate: 10 FPS
- Detection Time: ~1-2 seconds (depending on code quality)
- Auto-close: 2 seconds after successful scan

---

## 📱 User Experience

### Success Flow:
1. Click "Scan Member" → Scanner opens
2. Camera activates with scanning box overlay
3. Point at QR/Barcode → Automatic detection
4. Success animation with green checkmark
5. Display scanned result
6. Auto-close after 2 seconds

### Error Handling:
- **Camera Permission Denied**: Shows error message with instructions
- **No Camera Available**: Shows error message
- **Invalid Code**: Continues scanning (doesn't show error for every frame)
- **Poor Quality**: Keeps trying until successful

### UI Elements:
- **Header**: Title and close button (X)
- **Camera View**: Live camera feed with scanning box
- **Success Overlay**: Green background with checkmark
- **Error Overlay**: Red background with error icon
- **Instructions**: Help text at bottom

---

## 🎨 Design Details

### Colors:
```css
Primary: #d32f2f (Red)
Success: #4caf50 (Green)
Error: #f44336 (Red)
Overlay: rgba(0, 0, 0, 0.9)
```

### Animations:
- Fade in: Overlay entrance (0.3s)
- Slide up: Container entrance (0.3s)
- Scale in: Success/Error message (0.3s)

### Responsive:
- Mobile: Full screen
- Desktop: Centered modal (max 480px width)
- Adaptive scanning box size

---

## 🔐 Security & Permissions

### Camera Permission:
- Requested on first scan attempt
- Browser-level permission (HTTPS required for production)
- Clear error message if denied

### Privacy:
- No data stored locally
- No video recording
- Only scanned text is captured
- Camera released when scanner closes

---

## 💻 Code Structure

### Scanner Component (`src/lib/Scanner.svelte`)
```
Scanner.svelte (7.3 KB)
├── Props:
│   ├── isOpen (boolean) - Show/hide scanner
│   ├── onScanSuccess (function) - Success callback
│   └── onClose (function) - Close callback
├── State:
│   ├── scanner (Html5QrcodeScanner instance)
│   ├── scanResult (string) - Last scanned text
│   ├── scanError (string) - Error message
│   └── isScanning (boolean) - Scanning status
└── Methods:
    ├── initScanner() - Initialize camera and scanner
    ├── handleScanSuccess() - Process successful scan
    ├── handleScanError() - Handle scan errors
    └── handleClose() - Clean up and close
```

### Integration in MenuGrid:
```javascript
// State
let showScanner = false;

// Click handler
function handleMenuClick(item) {
  if (item.icon === 'scan') {
    showScanner = true;
  }
}

// Success handler
function handleScanSuccess(decodedText) {
  console.log('Scanned:', decodedText);
  alert(`Member Code: ${decodedText}`);
}
```

---

## 🧪 Testing

### Manual Testing:
1. **QR Code Test**: Use any QR code generator
2. **Barcode Test**: Use product barcodes (EAN/UPC)
3. **Error Test**: Deny camera permission
4. **Close Test**: Click X or overlay

### Test Codes:
- QR: "MEMBER123456"
- EAN-13: "5901234123457"
- UPC-A: "012345678905"

### Browser Compatibility:
- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari (iOS 11+)
- ✅ Mobile browsers

---

## 🚧 Limitations

1. **HTTPS Required**: Camera access requires secure connection in production
2. **Browser Support**: Older browsers may not support camera API
3. **Lighting**: Poor lighting affects scan quality
4. **Code Quality**: Damaged or low-quality codes may fail
5. **Distance**: Camera needs to be at proper distance from code

---

## 🔄 Future Enhancements

### Planned Features:
- [ ] Flash/torch control for low light
- [ ] Image upload as alternative to camera
- [ ] Scan history log
- [ ] Multiple code scanning in one session
- [ ] Vibration feedback on successful scan
- [ ] Sound effects
- [ ] Offline mode with cached processing
- [ ] Advanced code analysis and validation

### Possible Integrations:
- [ ] API call to verify member code
- [ ] Automatic point redemption
- [ ] Member profile display
- [ ] Transaction history
- [ ] Loyalty program integration

---

## 🐛 Troubleshooting

### Scanner not opening:
- Check browser permissions
- Ensure HTTPS connection
- Try different browser

### Camera not working:
- Grant camera permission
- Check if camera is available
- Close other apps using camera

### Scan not detecting:
- Improve lighting
- Hold camera steady
- Adjust distance from code
- Clean camera lens

### Performance issues:
- Reduce FPS in config
- Close other browser tabs
- Use modern browser

---

## 📦 Dependencies

```json
{
  "html5-qrcode": "^2.3.8"
}
```

Installation:
```bash
npm install html5-qrcode
```

---

## 📄 License

Part of MyYOGYA Landing Page project.
Scanner implementation uses html5-qrcode (Apache 2.0 License).

---

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Verify camera permissions
3. Test with different codes
4. Check documentation above

---

**Last Updated:** 2025-12-13
**Version:** 1.0.0
**Status:** ✅ Production Ready
