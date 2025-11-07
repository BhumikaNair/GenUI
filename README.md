# ✨ GenUI - Generate what you imagine, instantly

<div align="center">
  <img src="public/logo.svg" alt="GenUI Logo" width="200"> <br/><br/>
  
  **An AI-powered UI component generator that transforms your ideas into beautiful, responsive web components instantly with modern frameworks and real-time preview.**
  
  [![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF.svg)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-06B6D4.svg)](https://tailwindcss.com/)
  [![Google AI](https://img.shields.io/badge/Google%20AI-Gemini%202.5-4285F4.svg)](https://ai.google.dev/)
  [![Monaco Editor](https://img.shields.io/badge/Monaco-4.7.0-2C2C32.svg)](https://microsoft.github.io/monaco-editor/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

---

## ✨ Key Features

- **🤖 AI-Powered Generation** - Uses Google Gemini 2.5 Flash to transform natural language into beautiful UI components
- **⚡ Instant Component Building** - Generate fully functional, responsive components in seconds
- **🎨 Live Code Editor** - Monaco Editor with real-time syntax highlighting and code editing
- **👁️ Live Preview** - See your component render in real-time with iframe preview
- **🔧 Multiple Framework Support** - Generate components with HTML+CSS, Tailwind, Bootstrap, or JavaScript
- **🎯 Smart Presets** - Quick-start templates for common components (Pricing Cards, Hero Sections, Forms, etc.)
- **🌓 Dark/Light Theme** - Toggle between dark and light modes with smooth transitions
- **📥 Export & Download** - Copy code to clipboard or download as HTML file
- **🔄 Refresh & Open in New Tab** - Full preview controls for better testing

## 🏗️ Architecture

```
ai-component-generator/
├── 📁 public/
│   ├── logo.svg                     # 🎨 Application logo
│   └── favicon.ico                  # 🏷️ Favicon
│
├── 📁 src/
│   ├── App.jsx                      # 🎯 Main app component with routing
│   ├── App.css                      # 🎨 Global styles with theme variables
│   ├── index.css                    # 🎨 Tailwind directives
│   ├── main.jsx                     # 🚀 Application entry point
│   │
│   ├── 📁 components/
│   │   └── Navbar.jsx               # 📋 Navigation with theme toggle & GitHub link
│   │
│   └── 📁 pages/
│       ├── Home.jsx                 # 🏠 Main component generator interface
│       └── NoPage.jsx               # 🚫 404 error page
│
├── 📁 config files/
│   ├── vite.config.js               # ⚡ Vite configuration
│   ├── tailwind.config.js           # 🎨 Tailwind CSS configuration
│   ├── postcss.config.js            # 🔧 PostCSS configuration
│   └── eslint.config.js             # 🧹 ESLint configuration
│
├── index.html                       # 📄 HTML entry point
├── package.json                     # 📦 Dependencies and scripts
└── README.md                        # 📖 Project documentation
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **npm/yarn/pnpm**
- **Google AI API Key** (Gemini 2.5 Flash)

### 1. Clone & Setup

```bash
# Clone the repository
git clone https://github.com/BhumikaNair/GenUI
cd GenUI

# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
```

**Note:** Environment variables in Vite must be prefixed with `VITE_` to be exposed to the client.

### 3. Start Development Server

```bash
# Start the Vite development server
npm run dev
```

### 4. Access the Application

- **Frontend**: [http://localhost:5173](http://localhost:5173)

### 5. Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🛠️ Tech Stack

- **⚡ Vite 7** - Next-generation frontend tooling
- **⚛️ React 19** - Modern UI library with hooks
- **🎨 Tailwind CSS 3** - Utility-first CSS framework
- **🤖 Google Gemini AI 2.5** - Advanced language model for component generation
- **💻 Monaco Editor** - VS Code-powered code editor
- **🔀 React Router** - Client-side routing
- **🎯 React Select** - Beautiful dropdown component
- **🎨 React Icons** - Popular icon library
- **🔔 React Toastify** - Elegant notifications
- **⚡ React Spinners** - Loading indicators

## 🔑 Required API Keys

### 🧠 Google Gemini AI API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key for Gemini 2.5 Flash model
3. Copy the API key to your `.env` file
4. [Documentation](https://ai.google.dev/docs)

## 🎯 Supported Frameworks

GenUI can generate components with:

- **HTML + CSS** - Pure HTML with custom CSS
- **HTML + Tailwind CSS** - Modern utility-first styling
- **HTML + Bootstrap** - Popular CSS framework
- **HTML + CSS + JavaScript** - Interactive components
- **HTML + Tailwind + Bootstrap** - Combined framework power

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for instant UI component creation**

[🌟 Star this repo](../../stargazers) • [🐛 Report Bug](../../issues) • [💡 Request Feature](../../issues)

Made by [Bhumika Nair](https://github.com/BhumikaNair)

</div>
