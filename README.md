# Core+ React Native App

A modern React Native application built with Expo that runs seamlessly on Expo Go.

## 🚀 Features

- **Cross-Platform**: Runs on iOS, Android, and Web
- **Expo Go Compatible**: Easy testing and development
- **Modern UI**: Clean, responsive design with modern styling
- **Interactive Counter**: Simple demonstration of React state management
- **Hot Reload**: Fast development with Expo's hot reload feature

## 📱 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Expo Go app on your mobile device

### Installation

1. Clone or navigate to this repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

#### Option 1: Expo Go (Recommended for Testing)
1. Start the development server:
   ```bash
   npm start
   ```
2. Scan the QR code with your phone's camera (iOS) or the Expo Go app (Android)
3. The app will load on your device

#### Option 2: Simulators/Emulators
- **iOS Simulator** (macOS only):
  ```bash
  npm run ios
  ```
- **Android Emulator**:
  ```bash
  npm run android
  ```
- **Web Browser**:
  ```bash
  npm run web
  ```

## 🛠 Development

### Project Structure
```
Core+/
├── App.js              # Main application component
├── app.json            # Expo configuration
├── package.json        # Dependencies and scripts
├── assets/             # Images, icons, and other assets
└── .github/            # GitHub and Copilot configurations
```

### Key Files

- **App.js**: Main component with the app's core functionality
- **app.json**: Expo configuration including app name, icons, and platform settings
- **package.json**: Project dependencies and scripts

## 🎨 Customization

### Styling
The app uses React Native's StyleSheet for styling with:
- Modern color scheme
- Clean typography
- Consistent spacing
- Subtle shadows and elevations

### Adding Features
This is a basic starter template. You can extend it by:
- Adding navigation with React Navigation
- Integrating with APIs
- Adding more screens and components
- Including state management (Redux, Context API)

## 📦 Dependencies

- **expo**: Expo SDK for React Native
- **react**: React library
- **react-native**: React Native framework
- **expo-status-bar**: Status bar management

## 🔧 Scripts

- `npm start`: Start Expo development server
- `npm run android`: Run on Android emulator
- `npm run ios`: Run on iOS simulator (macOS only)
- `npm run web`: Run in web browser

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ using React Native and Expo
