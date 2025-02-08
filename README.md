# Uni-traffic Mobile Frontend

## Prerequisites

Before you start, ensure you have the following tools installed:

- **[pnpm](https://pnpm.io/)**: A fast, disk space-efficient package manager. Install it globally by running:
  ```bash
  npm install -g pnpm
  ```
- **[Android Studio](https://developer.android.com/studio)** or **[Expo Go](https://expo.dev/client)**:
   - If you're testing on an Android device, you need to either install Android Studio or use the Expo Go app.
   - For iOS, use Expo Go (available on the App Store).

## Setting Up the Project

1. **Install dependencies**:
   In the project directory, run the following command to install all required dependencies:
   ```bash
   pnpm install
   ```

2. **Start the development server**:
   After installing dependencies, start the project by running:
   ```bash
   pnpm start
   ```
   This will open the Expo development server in your browser.

3. **Run on your device**:
   - **For Android**: If you have Android Studio installed, you can run the app directly on your Android emulator or connected device with:
     ```bash
     pnpm android
     ```
   - **For iOS**: If you are on macOS and have Xcode installed, you can run the app on an iOS simulator or connected device with:
     ```bash
     pnpm ios
     ```

4. **Scan the QR code**:
   If you're using Expo Go on your mobile device, scan the QR code displayed in the terminal or on the webpage opened by `pnpm start` to view the app.