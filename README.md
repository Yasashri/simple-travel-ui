# Smart Travel Companion

Smart Travel Companion is a modern travel tech web application built with React and Vite. It helps users plan and book flights, hotels, and vehicles, and provides travel guides for popular destinations. The platform features a user-friendly interface, admin dashboard, and real-time booking management. 

This is an undergraduate level implementation.

## This link is for the API for this frontend project
API : https://github.com/Yasashri/smart-travel-api


## Features

- **User Authentication:** Register, login, and manage your profile.
- **Flight Booking:** Search and book flights with multiple classes and payment simulation.
- **Hotel Booking:** Browse hotels, select room types, and book stays.
- **Vehicle Rental:** Rent vehicles for your trips with flexible options.
- **Admin Dashboard:** Manage users, flights, hotels, and vehicles.
- **Travel Guide:** Explore curated guides for Australia, England, and New Zealand.
- **Contact Page:** Reach out for support or inquiries.
- **Responsive Design:** Optimized for desktop and mobile devices.

## Project Structure

## Project Structure

```
smart-travel-ui/
├── public/
│   └── (static assets, images, favicon, etc.)
├── src/
│   ├── assets/
│   │   ├── components/      # Reusable UI components (Navbar, Footer, Cards, etc.)
│   │   ├── pages/           # Main application pages (Home, Login, Booking, Admin, etc.)
│   │   ├── services/        # API service modules
│   │   └── styles/          # CSS and styling files
│   ├── config/
│   │   └── constant.js      # API endpoints and constants
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

1. Clone the repository: git clone <your-repo-url> cd smart-travel-ui
2. Install dependencies: npm install
3. Start the development server: npm run dev
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Configuration

API endpoints are configured in [`src/config/constant.js`](src/config/constant.js). Update the `BASE_URL` as needed to match your backend server.

## Main Dependencies

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [React Router](https://reactrouter.com/)
- [Lottie-react](https://lottiereact.com/) (for animations)
- [Moment.js](https://momentjs.com/) (for date formatting)

## Folder Highlights

- **`src/assets/components/`**: Reusable UI components (Navbar, Footer, Cards, etc.)
- **`src/assets/pages/`**: Main application pages (Home, Login, Booking, Admin, etc.)
- **`src/assets/services/`**: API service modules.
- **`src/assets/styles/`**: CSS and styling files.
- **`src/config/constant.js`**: API endpoints and constants.

## Customization

- Update images in the `public/` folder for branding.
- Modify styles in `src/assets/styles/` to match your theme.
- Extend or adjust API endpoints in `src/config/constant.js`.

## License

This project is for educational/demo purposes. Please update with your own license as needed.

---

© 2025 Smart Travel Companion. All rights reserved.