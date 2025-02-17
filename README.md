# ERPNext Electron App

## Overview
This is an **Electron.js-based desktop application** that fetches data from **ERPNext** and displays it in a simple table view. It supports fetching **Tasks, Users, and Sales Invoices** from ERPNext and provides a cross-platform desktop experience.

## Features
- 🚀 **Multi-Platform Support** (Windows, macOS, Linux)
- 🔄 **Real-time ERPNext Data Fetching**
- 📊 **Simple Table View for Tasks, Users, and Sales Invoices**
- 🎨 **Custom Icons for Each Platform**
- 🛠 **Easy Build & Deployment**

## Installation
### Prerequisites
- **Node.js** (v16 or later)
- **npm** (v8 or later)

### Clone the Repository
```sh
git clone git@github.com:irfanzahoor/erpnext-to-electron-.git
cd erpnext-electron-app
```

### Install Dependencies
```sh
npm install
```

## Running the App
```sh
npm start
```
This will start the Electron application.

## Development Mode
For live-reloading during development:
```sh
npm run dev
```

## Building for Production
To create executable installers for different platforms:
- **Windows**: `npm run build:win`
- **macOS**: `npm run build:mac`
- **Linux**: `npm run build:linux`
- **All Platforms**: `npm run build:all`

After building, the output will be available in the **`dist/`** directory.

## Configuration
Modify the `main.js` file to set up the correct API endpoints for fetching data from ERPNext.

## License
This project is licensed under the **MIT License**.

## Author
Developed by **NexTash** 🚀

