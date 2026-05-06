# Certificate Generator - Complete System

A full-stack certificate generation and management system built with React, Express.js, MongoDB, and Node.js. Create, manage, verify, and download professional certificates with QR code verification.

## Features

### Core Features
- ✅ **User Authentication**: Secure admin registration and login with JWT
- ✅ **Certificate Generation**: Create certificates with recipient details
- ✅ **PDF Download**: Generate and download certificates as PDF files
- ✅ **QR Code Verification**: Each certificate includes a unique QR code for verification
- ✅ **Admin Dashboard**: Manage all issued certificates with search and filter
- ✅ **Certificate Verification**: Public verification page to check certificate authenticity
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile devices

### Technical Features
- Input validation and error handling
- Protected routes for authenticated users
- RESTful API architecture
- Database persistence with MongoDB
- Real-time certificate preview
- Professional certificate templates

## Project Structure

```
certificate-generator/
├── client/                  # React Frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # Auth context
│   │   ├── services/        # API service
│   │   └── assets/          # Static assets
│   ├── .env                 # Frontend environment variables
│   └── vite.config.js       # Vite configuration
│
└── server/                  # Express Backend
    ├── controllers/         # Route controllers
    ├── models/              # MongoDB models
    ├── routes/              # API routes
    ├── middleware/          # Express middleware
    ├── utils/               # Utility functions
    ├── config/              # Configuration files
    ├── .env                 # Backend environment variables
    └── server.js            # Entry point
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## Installation & Setup

### 1. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your MongoDB URI and JWT secret
# MONGO_URI=mongodb://localhost:27017/certificate-generator
# JWT_SECRET=your_secret_key

# Start the server
npm run dev    # Development mode (with nodemon)
npm start      # Production mode
```

The backend will run on `http://localhost:3000`

### 2. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Configure environment variables (already set to use proxy)
# .env file is pre-configured for development

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin
- `POST /api/auth/login` - Login admin
- `GET /api/auth/me` - Get admin profile (Protected)

### Certificates
- `POST /api/certificates` - Create certificate (Protected)
- `GET /api/certificates` - Get all certificates by admin (Protected)
- `GET /api/certificates/:certificateId` - Get certificate details
- `GET /api/certificates/verify/:certificateId` - Verify certificate
- `GET /api/certificates/:certificateId/download` - Download PDF
- `DELETE /api/certificates/:id` - Delete certificate (Protected)

## Usage Guide

### For Admin Users

1. **Register/Login**
   - Go to `http://localhost:5173/register` to create an account
   - Or login at `http://localhost:5173/login`

2. **Create Certificates**
   - Navigate to Generate page
   - Fill in recipient details (name, role, event, date)
   - Click "Generate Certificate"
   - Review the preview
   - Download as PDF

3. **Manage Certificates**
   - Go to Admin Dashboard
   - View all created certificates
   - Search and filter certificates
   - Download certificates
   - Delete certificates

### For Public Users

1. **Verify Certificate**
   - Use the unique URL provided with the certificate
   - Or visit `/verify/{certificateId}`
   - Scan the QR code to verify authenticity

## Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/certificate-generator
JWT_SECRET=your_jwt_secret_key_change_this
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=/api
```

## Technologies Used

### Frontend
- React 19
- React Router DOM v7
- Framer Motion (animations)
- Tailwind CSS (styling)
- QR Code React (QR generation)
- html2canvas (HTML to image)
- jsPDF (PDF generation)
- Lucide React (icons)

### Backend
- Node.js / Express.js
- MongoDB / Mongoose
- JSON Web Tokens (JWT)
- bcryptjs (password hashing)
- PDFKit (PDF generation)
- qrcode (QR code generation)
- CORS

## Development

### Run Both Frontend and Backend

Open two terminals:

**Terminal 1 (Backend)**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend)**
```bash
cd client
npm run dev
```

### Build for Production

**Backend**
- Already ready for production with `npm start`

**Frontend**
```bash
npm run build
npm run preview
```

## Features Breakdown

### Authentication System
- Secure JWT-based authentication
- Bcrypt password hashing
- Protected API routes
- Automatic token storage and retrieval
- Logout functionality

### Certificate Management
- Generate unique certificate IDs
- Store certificate data in MongoDB
- Track certificate creation date
- Associate certificates with admin users
- Search and filter by name, event, or ID

### PDF Generation
- Professional certificate layout
- Includes QR code
- Automatic file naming
- Server-side PDF generation
- Client-side PDF generation for non-logged-in users

### Verification System
- Public verification page
- QR code scanning support
- Certificate authenticity check
- Admin information display
- Issued date tracking

## Error Handling

The application includes comprehensive error handling:
- Input validation for all forms
- API error responses with meaningful messages
- Try-catch blocks for async operations
- User-friendly error messages
- Form field validation with error display

## Security Features

- JWT authentication for protected routes
- Password hashing with bcryptjs
- CORS enabled for secure cross-origin requests
- Protected API endpoints
- Database query validation
- Error message sanitization

## Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running
- Check MONGO_URI in .env file
- Verify database credentials

### Port Already in Use
- Backend: Change PORT in .env
- Frontend: Change port in vite.config.js

### API Connection Failed
- Ensure backend is running on port 3000
- Check proxy configuration in vite.config.js
- Verify VITE_API_URL in .env

### Package Installation Issues
- Delete node_modules and package-lock.json
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## Future Enhancements

- Multiple certificate templates
- Bulk certificate generation
- Email notifications
- Advanced analytics dashboard
- Certificate expiration dates
- Template customization
- Integration with payment systems
- Certificate revocation system

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository or contact the development team.
