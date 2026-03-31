# sdi-project3-fullstack

## ⚠️ Instructions on how to run this thing! ⚠️
- (1). First make sure docker desktop is running in the background.
- (2). Go into the api directory and install dependencies
  - $`cd api`
  - $`npm init -y`
  - $`npm install express knex pg cors`

- (3). Use the `docker-compose` file to set up 3 microservices
  - Make sure your 🐳 docker desktop is up and running!!!
  - $`cd ..` if you are in the api directory
  - $`docker-compose up`
    - on baby this also should database called `countries`!

- (4).Migrate and Seed data into the database, steps:
  - $`cd api`
  - $`npx knex migrate:latest`
    - This message should display in console to sanity check.
  - $`mpx knex seed:run`
  - This message should display in console to sanity check.
   ``` bash
      164 entries were seeded to the 'countries' db
      250 entries were seeded to the 'unfiltered_countries' db
  ```
- Endpoints for tables
    | Method | Endpoint | Description |
    | :--- | :--- | :--- |
    | **GET** | `http://localhost:8080/countries/all` | List all countries, having gini |
    | **GET** | `http://localhost:8080/unfiltered/all` | List all countries, minimal filters |
    | **GET** | `http://localhost:8080/countries/id/:id`| Find a country by id |
    | **GET** | `http://localhost:8080/countries/name/:name`| Find a country by name (e.g. `countries/name/japan`) |
    | **GET** | `http://localhost:8080/countries/cca2/:cca2`| Find a country by cca2 'US' |
    | **GET** | `http://localhost:8080/countries/region/:region`| List of countries by region |



- (5). The app should now be running on 3 seperate containers
  - Go to `localhost:5173` to open the vite site.
  - there should be a main menu for the game.

This is how its supposed to look if it works correctly
<img src="ui/public/Screenshot menu.png" width="500" />
---

# Game Instructions
- how the home screen is supposed to look like:
<img src="ui/public/Screenshot 2026-03-09 141719.png" width="500" />
## Rouge Like Game instructions
- Select your country from 3 random selections:
<img src="ui/public//Screenshot 2026-03-09 141801.png" width="500" />
- Everything is based on RNG
- Low energy reduces your probability
- Watch your GINI — hitting 60 ends the game
<img src="ui/public/Screenshot 2026-03-09 141828.png" width="500" />
<img src="ui/public/Screenshot 2026-03-09 141859.png" width="500" />
- There are 67 rounds per game
<img src="ui/public/Screenshot 2026-03-09 141920.png" width="500" />

## Country Guessing Game
- Basically just at the top of the screen you need to find the country that the game is asking for by clicking on the map.
- Here you get a clean slate and your goal is to guess as many countries correctly.
<img src="ui/public/Screenshot guess start.png" width="500" />
- This is how the mid-game should look like as you struggle through it.
<img src="ui/public/Screenshot guess mid game.png" width="500" />

*This conludes my awsome game of sorts...
<img src="ui/public/fish.gif" width="500" />
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.