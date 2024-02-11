- /public: the HTML host page template and other static files like icons
- /src
  - index.js: the entry point file for the application. It renders the React-Redux <Provider> component and the main <App> component.
  - App.js: the main application component. Renders the top navbar and handles client-side routing for the other content.
  - index.css: styles for the complete application
  - `/api`
    - client.js: a small AJAX request client that allows us to make GET and POST requests
    - server.js: provides a fake REST API for our data. Our app will fetch data from these fake endpoints later.
  - `/app`
    - Navbar.js: renders the top header and nav content
    - store.js: creates the Redux store instance

**match props**
