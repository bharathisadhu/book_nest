# BookNest E-commerce Website


Website Live Link: [BookNest](https://booknest-self.vercel.app/)


Welcome to **BookNest**, an e-commerce website designed specifically for book lovers. This project leverages modern web development technologies to deliver a seamless shopping experience, featuring user-friendly design and essential functionalities for managing a book store.

## Features

- 📚 **Browse Books**: Explore a diverse collection of books with robust sorting and filtering options.
- 🛒 **Shopping Cart**: Easily add books to your cart and proceed to checkout.
- 🔍 **Search**: Quickly locate books using the integrated search functionality.
- 💖 **Wishlist**: Save your favorite books for later.
- 🔐 **User Authentication**: Users can sign up, log in, and manage their accounts securely.
- 📱 **Responsive Design**: The website is optimized for both desktop and mobile devices.
- 🛍️ **Admin Panel**: Manage books, users, and orders (Coming Soon).

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS, React Icons
- **Backend**: Node.js, Mongoose
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Others**: React Hook Form, Axios, SocketIO

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js**: [Download and Install Node.js](https://nodejs.org/)
- **Git**: [Download and Install Git](https://git-scm.com/)
- **MongoDB**: A MongoDB instance or account with [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/your-username/booknest-ecommerce.git
cd booknest-ecommerce
```
Install dependencies for both frontend and backend:
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
Create environment variables:
For frontend: Create a .env.local file in the frontend directory and add the following:

```bash
NEXT_PUBLIC_MONGODB_URI
DB_USER
DB_PASS
NEXT_PUBLIC_AUTH_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
AUTH_SECRET
JWT_SIGNING_PRIVATE_KEY
MONGODB_URI
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLIC_KEY
NEXT_PUBLIC_API_URL

STRIPE_PRO_PLAN_ID
STRIPE_FREE_PLAN_ID

NEXT_PUBLIC_IMAGE_UPLOAD_KEY
```

For backend: Create a .env file in the backend directory and add the following:

```bash
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```
Run the project:
Frontend:

```bash
cd frontend
npm run dev
```
Backend:

```bash
cd backend
npm run dev
Open your browser and go to http://localhost:3000.
```


Folder Structure
```bash

booknest-ecommerce/
├── backend/           # Backend server code
│   ├── controllers/   # API controllers
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   └── app.js         # Express app setup
├── frontend/          # Frontend Next.js app
│   ├── src/           # Next.js source files
│   │   ├── components/ # UI components
│   │   ├── pages/      # Page components
│   │   ├── context/    # Context API for state management
│   │   └── App.js      # Main React App component
└── README.md          # Project documentation
```
How to Contribute
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

Fork the repository.
Create a branch for your feature or bug fix:
```bash
git checkout -b feature-name
```
Commit your changes:
```bash
git commit -m "Add new feature"
```
Push to the branch:
```bash
git push origin feature-name
```
Create a pull request and describe your changes.
Contact
For any questions or suggestions, feel free to contact me.

```markdown
### Notes:
- Replace `your-username` in the clone URL with your actual GitHub username.
- Update the Firebase and MongoDB connection strings in the environment variables section as needed.
- Adjust any sections according to your project's specific features or details.

This README provides a clear and organized overview of your project, making it easy for others to understand and contact
```
