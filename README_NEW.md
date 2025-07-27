# TravelSim - Travel SIM Card Website

A modern, responsive React application for purchasing travel SIM cards with 7-day unlimited talk, text, and data plans for $30, designed specifically for travelers in the United States.

## Features

### 🌐 Multi-Language Support
- English, Spanish, French, German, and Chinese
- Easy language switching with top navigation bar
- Complete UI translation support

### 📱 Responsive Design
- Mobile-first design approach
- Tailwind CSS for responsive layouts
- Optimized for all screen sizes

### 🛒 SIM Card Purchase
- Simple 7-day plan: $30 for unlimited everything
- Clear pricing and feature breakdown
- Easy purchase flow

### 🗺️ Network Coverage Map
- Interactive US coverage visualization
- Coverage statistics and reliability metrics
- State-by-state coverage information

### 📊 Provider Comparison Tool
- Compare features across different providers
- Filter by specific features
- Rating and pricing comparisons
- Clear visual comparison table

### 🔐 User Authentication
- Login/Signup functionality in navigation
- User account management ready

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling and responsive design
- **Lucide React** for icons
- **React Context API** for state management

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd travelsim
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── LanguageSelector.tsx
│   ├── ComparisonTool.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── NetworkMap.tsx
│   └── PlansSection.tsx
├── context/
│   └── LanguageContext.tsx
├── types/
│   └── translations.ts
├── App.tsx
└── main.tsx
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is licensed under the MIT License.
