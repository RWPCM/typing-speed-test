# Typing Speed Test

A modern web application built with React and TypeScript that helps you measure and improve your typing speed.

## Features

- Real-time WPM (Words Per Minute) calculation
- Error tracking and accuracy measurement
- Interactive typing test interface
- Progress visualization with Chart.js
- Multiple text options for practice
- Session history tracking

## Tech Stack

- React 18
- TypeScript
- Chart.js for visualizations
- React Router for navigation
- Docker for containerization

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd typing-speed-test
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

The application will open automatically in your default browser at `http://localhost:3062`

## Building for Production

```bash
npm run build
# or
yarn build
```

This will create a `build` directory with optimized files ready for deployment.

## Docker Deployment

The project includes Docker configuration for easy deployment:

```bash
docker-compose up --build
```

This will build and run the application in a Docker container.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to the React and TypeScript communities
- Special thanks to Chart.js for the visualization components
