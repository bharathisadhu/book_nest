# BookNest E-commerce Website

Welcome to **BookNest**, an e-commerce website for book lovers. This project is designed using modern web development technologies, offering a seamless shopping experience. It includes features such as a responsive design, product searching, user authentication, and a functional cart system.

## Features

- 📚 **Browse Books**: Explore a wide variety of books with sorting and filtering options.
- 🛒 **Shopping Cart**: Add books to the cart and proceed to checkout.
- 🔍 **Search**: Quickly find books using the search functionality.
- 💖 **Wishlist**: Save books to your wishlist.
- 🔐 **User Authentication**: Sign up, log in, and manage your account.
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices.
- 🛍️ **Admin Panel**: Manage books, users, and orders (Coming Soon).

## Technologies Used

- **Frontend**: React.js, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase Authentication
- **Icons**: React Icons
- **Others**: React Router DOM, Context API

## Setup Instructions

### Prerequisites

Make sure you have the following installed on your local machine:

- **Node.js**: [Download and Install Node.js](https://nodejs.org/)
- **Git**: [Download and Install Git](https://git-scm.com/)
- **MongoDB**: A MongoDB instance or account with [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Installation

1. **Clone the repository**:

```bash
   git clone https://github.com/your-username/booknest-ecommerce.git
   cd booknest-ecommerce
```

2. **Install dependencies for both frontend and backend**:

Frontend:

```bash
    cd frontend
    npm install
```

Backend:

```bash
    cd backend
    npm install
```

3.**Create environment variables**:

**For frontend: Create a .env file in the frontend directory and add the following**:

```bash
    REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
    REACT_APP_FIREBASE_PROJECT_ID=your-project-id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
    REACT_APP_FIREBASE_APP_ID=your-app-id
```

**For backend: Create a .env file in the backend directory and add the following**:

```bash
    MONGO_URI=your-mongodb-connection-string
    JWT_SECRET=your-secret-key
```

4.**Run the project**:

**Frontend**:

```bash

cd frontend
npm start
```

**Backend**:

```bash

cd backend
npm start
```

5.**Open your browser and go to http://localhost:3000**.

**Website live link: https://booknest-self.vercel.app

Folder Structure

```bash
    booknest-ecommerce/
    ├── backend/           # Backend server code
    │   ├── controllers/   # API controllers
    │   ├── models/        # Mongoose models
    │   ├── routes/        # API routes
    │   └── app.js         # Express app setup
    ├── frontend/          # Frontend React app
    │   ├── src/           # React source files
    │   │   ├── components/ # UI components
    │   │   ├── pages/      # Page components
    │   │   ├── context/    # Context API for state management
    │   │   └── App.js      # Main React App component
    └── README.md          # Project documentation
```

**How to Contribute**
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.

2. Create a branch for your feature or bug fix:

```bash
git checkout -b feature-name
```

3. Commit your changes:

```bash
git commit -m "Add new feature"
```

4. Push to the branch:

```bash
git push origin feature-name
```

5. Create a pull request and describe your changes.

**Contact**
For any questions or suggestions, feel free to contact me.
