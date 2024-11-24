# Aqua Mate

Aqua Mate is a mobile-only app designed specifically for smartphone screen sizes. It offers a seamless experience tailored to small devices, ensuring smooth performance and intuitive navigation. Aqua Mate helps you track your water consumption directly from your mobile device.

## Features
- Track your daily water consumption.
- Optimized for smartphone screen sizes.
- Easily view and manage your water intake.

## Installation

Follow these steps to get Aqua Mate up and running locally on your machine.

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Node.js** (and npm): You can download and install it from [nodejs.org](https://nodejs.org/).

To check if Node.js is installed, run:

```bash
node -v
npm -v
```

If you don’t have Node.js installed, download the installer and follow the instructions.

- **TypeScript**: Since Aqua Mate uses TypeScript, you'll need to have it installed. Install it globally using npm:

```bash
npm install -g typescript
```

### Setup

Clone the repository:

```bash
git clone https://github.com/bico37/Aqua-Mate.git
```

Navigate to the project directory:

```bash
cd Aqua-Mate
```

Install dependencies:

```bash
npm install
```

Compile TypeScript: Since the project uses TypeScript, you need to compile it before running the app. Run the following command:

```bash
tsc
```

Start the application:

```bash
npm start
```

The app should now be running locally. Open your browser and go to [http://localhost:3000](http://localhost:3000) to view it.

### Using ngrok for mobile access

In the code, ngrok is commented out. If you want to access the app on your phone, you can enable ngrok and provide your own API key. Here's how to do it:

1. Uncomment the ngrok-related lines in the code.
2. Replace the placeholder for the API key with your own key.
3. Run ngrok, and it will provide a public URL that you can open on your mobile device.

This will allow you to view and use the web application on your phone.

## Usage

Aqua Mate is designed to be used on smartphones, so it’s optimized for smaller screen sizes. Simply open it on a mobile device to experience the app as intended.
