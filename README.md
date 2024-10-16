## Mini TuneIn - A React-powered Mini Music Player

This is a simple React application that allows you to browse and play radio stations using the TuneIn API.

### Features:

- **Station List:** View a list of popular radio stations from the TuneIn API.
- **Audio Player:** Play and control audio from selected stations.
- **Error Handling:**  The application gracefully handles errors and provides a fallback UI.

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/m-dokupil/tunein.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd tunein
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

### Project Structure:

- **`src/App.tsx`:**  The main component of the application.
- **`src/components/`:**  Contains reusable UI components.
- **`src/store/`:** Manages application state using Zustand.
- **`index.html`:** The entry point for the HTML.
- **`package.json`:**  Defines project dependencies and scripts.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### License

This project is licensed under the MIT License.
