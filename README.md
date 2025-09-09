# TravelBuddy - Your Travel Companion

A modern, responsive travel planning and expense management application built with React. Plan your perfect trips and manage expenses with friends effortlessly.

## 🚀 Features

### ✈️ Trip Planning
- **Smart Itinerary Generation**: AI-powered itinerary creation based on your preferences, budget, and travel dates
- **Interactive Trip Form**: Easy-to-use form with destination input, budget slider, and date pickers
- **Budget Tracking**: Real-time budget monitoring with detailed cost breakdowns

### 💰 Expense Management
- **Group Expense Tracking**: Split bills easily with friends and track who owes what
- **Automatic Calculations**: Smart settlement calculations to eliminate "who owes whom" confusion
- **Category-based Organization**: Organize expenses by categories (food, accommodation, transport, etc.)
- **Real-time Settlements**: Instant settlement reports showing who needs to pay whom

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Beautiful Animations**: Smooth transitions and hover effects for enhanced user experience
- **Clean Interface**: Intuitive and user-friendly design with modern aesthetics
- **Accessibility**: Built with accessibility best practices in mind

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router, Styled Components
- **UI Components**: Custom components with modern CSS
- **Date Handling**: React DatePicker
- **Icons**: React Icons (Font Awesome)
- **Notifications**: React Toastify
- **Styling**: CSS3 with modern features (Grid, Flexbox, Gradients)

## 📁 Project Structure

```
Travel Buddy/
├── client/                 # React frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Header/    # Navigation header
│   │   │   ├── Hero/      # Hero section with trip form
│   │   │   ├── Features/  # Features showcase
│   │   │   └── Footer/    # Footer component
│   │   ├── pages/         # Page components
│   │   │   ├── ItineraryPage.js
│   │   │   └── ExpenseManagerPage.js
│   │   ├── App.js         # Main app component
│   │   ├── App.css        # Global styles
│   │   ├── index.js       # App entry point
│   │   └── index.css      # Base styles
│   └── package.json       # Frontend dependencies
├── server/                # Backend server (for future implementation)
└── package.json           # Root package.json with scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Travel Buddy"
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   npm run install-client
   ```

3. **Start the development server**
   ```bash
   # Start only the frontend
   npm run client
   
   # Or start both frontend and backend (when backend is implemented)
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## 📱 Pages & Features

### 🏠 Home Page
- **Hero Section**: Trip planning form with destination, budget, and date inputs
- **Features Section**: Showcase of key features with animated cards
- **Responsive Design**: Optimized for all screen sizes

### ✈️ Itinerary Page
- **Generated Itineraries**: AI-powered day-by-day travel plans
- **Activity Details**: Time, location, cost, and category for each activity
- **Budget Summary**: Real-time budget tracking and remaining balance
- **Interactive Timeline**: Easy-to-follow daily schedule

### 💰 Expense Manager Page
- **Add Expenses**: Simple form to add new expenses with category selection
- **Group Management**: Track expenses across multiple group members
- **Settlement Reports**: Clear breakdown of who owes whom
- **Expense History**: Complete list of all expenses with edit/delete options

## 🎨 Design Features

### Color Palette
- **Primary**: Blue gradients (#3b82f6 to #1d4ed8)
- **Secondary**: Orange gradients (#ff6b35 to #f7931e)
- **Success**: Green (#10b981)
- **Background**: Light grays (#f8fafc, #e2e8f0)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Responsive**: Scales appropriately across devices

### Animations
- **Hover Effects**: Subtle transforms and shadows
- **Loading States**: Smooth spinners and transitions
- **Page Transitions**: Fade-in animations for better UX

## 🔧 Available Scripts

- `npm run client` - Start React development server
- `npm run build` - Build the app for production
- `npm run install-client` - Install frontend dependencies
- `npm run install-all` - Install all dependencies (when backend is added)

## 🌟 Key Components

### Header Component
- Responsive navigation with mobile menu
- Logo with brand identity
- Active route highlighting
- Login button (ready for authentication)

### Hero Component
- Trip planning form with validation
- Interactive budget slider
- Date picker integration
- Form submission handling

### Features Component
- Animated feature cards
- Icon integration
- Responsive grid layout
- Hover effects

### Expense Manager
- Modal-based expense addition
- Real-time settlement calculations
- Category-based organization
- Group member management

## 🚧 Future Enhancements

- **Backend Integration**: Express.js server with MongoDB
- **User Authentication**: JWT-based login system
- **Real-time Updates**: WebSocket integration
- **Payment Integration**: Stripe/PayPal integration
- **Mobile App**: React Native version
- **Advanced Analytics**: Spending insights and reports
- **Social Features**: Share itineraries and expenses

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support or questions, please open an issue in the repository.

---

**TravelBuddy** - Your complete travel companion for seamless adventures! ✈️

