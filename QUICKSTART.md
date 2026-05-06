# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js installed
- MongoDB running locally or MongoDB Atlas connection string

### Step 1: Configure Backend

```bash
cd server

# Install dependencies
npm install

# Edit .env file with your MongoDB connection
# Copy .env.example to .env and update MONGO_URI
```

**Sample .env:**
```
MONGO_URI=mongodb://localhost:27017/certificate-generator
JWT_SECRET=super_secret_key_change_in_production
PORT=3000
CLIENT_URL=http://localhost:5173
```

### Step 2: Start Backend

```bash
npm run dev
```

Backend ready at: http://localhost:3000

### Step 3: Start Frontend

```bash
cd client
npm install
npm run dev
```

Frontend ready at: http://localhost:5173

### Step 4: Create Admin Account

1. Open http://localhost:5173
2. Click "Register"
3. Create your admin account
4. Login with your credentials

### Step 5: Start Creating Certificates

1. Go to "Generate" page
2. Fill in certificate details
3. Preview certificate
4. Download as PDF
5. View all certificates in Admin Dashboard

## 📝 Example Certificate Data

```json
{
  "name": "John Doe",
  "role": "Full Stack Developer",
  "event": "Advanced Web Development Bootcamp",
  "duration": "12 weeks",
  "date": "2026-05-06"
}
```

## 🔐 First Time Setup Checklist

- [ ] MongoDB is running
- [ ] Backend .env configured
- [ ] Backend server started (http://localhost:3000)
- [ ] Frontend server started (http://localhost:5173)
- [ ] Admin account created
- [ ] Can generate a test certificate
- [ ] Can download PDF
- [ ] Can verify certificate via QR code

## 🆘 Common Issues

**Backend not connecting to MongoDB?**
```bash
# Check your MongoDB connection string in .env
# Make sure MongoDB service is running
# For local MongoDB: mongod --dbpath C:\data\db (Windows)
```

**Port 3000 already in use?**
```bash
# Change PORT in server/.env to another port like 3001
# Then update client vite.config.js proxy target accordingly
```

**Frontend can't connect to API?**
```bash
# Check that backend is running on http://localhost:3000
# Ensure vite.config.js has correct proxy setup
# Clear browser cache and restart dev server
```

## 📚 API Testing

Use Postman or curl to test APIs:

```bash
# Register admin
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'

# Create certificate (use token from login response)
curl -X POST http://localhost:3000/api/certificates \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"John","role":"Dev","event":"Bootcamp","date":"2026-05-06"}'

# Verify certificate
curl http://localhost:3000/api/certificates/verify/CERT-2026-XXXXX
```

## 📦 Build for Production

```bash
# Backend
cd server
npm start

# Frontend
cd client
npm run build
# Use nginx or similar to serve dist/ folder
```

## 🎉 You're All Set!

Enjoy creating certificates! For more details, see README_COMPLETE.md
