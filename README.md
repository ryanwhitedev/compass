# Compass

Reddit does not currently provide a way to efficiently search through your saved posts. Compass provides this missing search interface. Post fetching, storage, indexing and searching all occur in directly your browser, so that you are always in control of your own data. Try the [demo](https://compass.ryanwhite.dev/).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Create a Reddit [Client ID and Redirect URI](https://www.reddit.com/prefs/apps)

### Installing

- Fork and clone the repo
- `cd` to the newly created directory and run `npm install` or `yarn install`
- Update `/src/utils/config.js` with your Client ID and Redirect URI
- In the project directory, run `npm start` or `yarn start`
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Testing

Start the test runner in interactive watch mode

- In the project directory, run `npm run test` or `yarn test`

## Deploying

Build the app for production into the `build` folder. Correctly bundles React in production mode and optimizes the build.

- In the project directory, run `npm run build` or `yarn build`

## Built With

- [React](https://reactjs.org/) - UI library
- [Redux](https://redux.js.org/) - State management
- [React Router](https://reactrouter.com/) - Client-side routing
- [Lunr](https://lunrjs.com/) - Client-side search
- [tailwindcss](https://tailwindcss.com/) - CSS utility framework
- [Jest](https://jestjs.io/) - JS testing framework
- [React Testing Library](https://testing-library.com/) - UI component testing
