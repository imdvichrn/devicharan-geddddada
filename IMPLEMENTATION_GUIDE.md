# Quick Implementation Guide - Launch Features & Performance Fixes

## 🚀 Getting Started (5 minutes)

### Step 1: Set Up Environment Variables
```bash
cp .env.example .env
```

Edit `.env` and add:
```env
RESEND_API_KEY=re_your_key_here        # Get from https://resend.com
MONGODB_URI=mongodb+srv://...          # MongoDB Atlas connection string
ADMIN_SECRET=your_very_secure_string   # Use: $(openssl rand -base64 32)
```

### Step 2: Start the Development Server
```bash
npm run dev:server  # Terminal 1 - Start backend
npm run dev         # Terminal 2 - Start frontend
```

### Step 3: Test the Subscribe Endpoint
```bash
curl -X POST http://localhost:5174/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Successfully subscribed! Check your email for confirmation."
}
```

## 📧 Testing Email Subscription

1. Go to your website and look for a subscription form (or create one)
2. Enter a test email address
3. Check your inbox for confirmation email from "Perfect Pack Launch"
4. Email should have professional branding and confirmation message

## 🔐 Accessing Admin Dashboard

1. Navigate to: `http://localhost:3000/admin` (or your dev server port)
2. Enter your `ADMIN_SECRET` value
3. Click "Authenticate"
4. You'll see a table of all subscribers
5. Use "Refresh" to see new subscribers in real-time

## 📊 Integration Points

### Frontend Subscription Form
Add this to your Contact or Footer component:
```typescript
const handleSubscribe = async (email: string) => {
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  
  if (response.ok) {
    toast.success('You\'re on the list!');
  } else {
    const error = await response.json();
    toast.error(error.error);
  }
};
```

### Admin Dashboard Usage
```typescript
// Already implemented - just visit /admin in your browser
// No additional code needed!
```

## 🎯 Performance Verification

### Check Code Splitting (DevTools)
1. Open DevTools > Network tab
2. Filter by `.js` files
3. Reload page - initial bundle should be smaller (~376 KiB vs ~470 KiB before)
4. Scroll to Chatbot - new chunk loads on demand

### Check Cache Headers
1. Open DevTools > Network tab
2. Check any `.png`, `.js`, or `.css` file
3. Look at Headers > Response Headers
4. Should see: `Cache-Control: public, max-age=31536000, immutable`

## 🗄️ Database Schema Reference

### Subscriber Collection
```typescript
{
  _id: ObjectId,
  email: string,           // Unique, lowercase, trimmed
  subscribedAt: Date,      // Auto-set to current date
  confirmationSent: boolean // Tracks if email was sent
}
```

## 🔧 Production Deployment Checklist

- [ ] Set strong `ADMIN_SECRET` (use: `openssl rand -base64 32`)
- [ ] Test `RESEND_API_KEY` with sandbox domain
- [ ] Verify `MONGODB_URI` connects to production database
- [ ] Test subscription from production URL
- [ ] Verify confirmation emails arrive
- [ ] Test admin dashboard with VPN/firewall (if applicable)
- [ ] Set up backup for MongoDB database
- [ ] Enable email bounce handling in Resend
- [ ] Add rate limiting to `/api/subscribe` endpoint (if needed)

## 📱 Rate Limiting (Optional)

If you want to prevent spam, add to `server/index.ts`:
```typescript
import rateLimit from 'express-rate-limit';

const subscribeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many subscription attempts, please try again later'
});

app.post('/api/subscribe', subscribeLimiter, async (req, res) => {
  // ... existing code
});
```

Then install: `npm install express-rate-limit`

## 🐛 Troubleshooting

### Emails not sending
- Check `RESEND_API_KEY` is valid in `.env`
- Resend starts in sandbox mode - verify email address
- Check browser console for errors
- Check server logs for "[email]" errors

### Admin dashboard shows 401
- Verify `ADMIN_SECRET` is set in `.env`
- Check header: `x-admin-secret` matches environment variable exactly
- Confirm MongoDB connection works: `GET /metrics` endpoint

### Chatbot not loading
- Check browser DevTools Console for chunk loading errors
- Verify Vite build succeeded: `npm run build`
- Clear browser cache and reload

### High initial page load
- Ensure production build is used (not dev mode)
- Check DevTools Network tab for large `.js` files
- Verify cache headers are present on assets

## 📚 Resources

- **Resend Docs**: https://resend.com/docs
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **React.lazy Docs**: https://react.dev/reference/react/lazy
- **Express Cache Control**: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control

## 💬 API Reference

### POST /api/subscribe
Subscribe to launch list
```
Request:
  {
    "email": "user@example.com"
  }

Response (200):
  {
    "success": true,
    "message": "Successfully subscribed! Check your email for confirmation."
  }

Response (400):
  {
    "error": "Invalid email address"
    // or "Email already subscribed"
  }
```

### GET /api/admin/subscribers
Get all subscribers (requires authentication)
```
Headers:
  x-admin-secret: your_admin_secret

Response (200):
  {
    "count": 42,
    "subscribers": [
      {
        "_id": "...",
        "email": "user@example.com",
        "subscribedAt": "2026-03-05T10:30:00.000Z",
        "confirmationSent": true
      },
      ...
    ]
  }

Response (401):
  {
    "error": "Unauthorized"
  }
```

---

**Last Updated**: March 5, 2026
**Status**: ✅ Ready for Testing & Deployment
