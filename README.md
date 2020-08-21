# GraphQL API Server Boilerplate

This is a boilerplate for a [Node.js](https://nodejs.org/) application written in [TypeScript](https://www.typescriptlang.org/) that uses [Apollo Server](https://www.apollographql.com/docs/apollo-server/) to create a GraphQL server.

While the boilerplate currently uses [restify](http://restify.com/) to create the API endpoints, it should be simple enough to change it to use [Express](https://expressjs.com/) or any other Node.js middleware library if that is more to your taste. Check out the [Apollo Server documentation](https://www.apollographql.com/docs/apollo-server/integrations/middleware/) to see how to do that.

## Getting started

To use this repository as a base for a new repository, and to get it up and running, you will need to:

1. Clone this repository
2. Delete the local git history for this repository
3. Change the application details in package.json
4. Initiate git with your new repository in mind
5. Add your first commit
6. Install npm packages
7. Run the project and/or build the app

### Cloning this repository and removing history

To clone this repository and remove its history locally in order to start a new repository from scratch, use the following commands, substituting `my-application` for the name of your application:

```bash
mkdir my-application
git clone git@github.com:ceottaki/graphql-api-server-boilerplate.git ./my-application
cd my-application
rm -r -f ./.git/
```

### Changing the application details in package.json

Now that you have the files locally, open the application with your favourite code editor (we recommend [VS Code](https://code.visualstudio.com/)) and edit the file `app/package.json`.

You should edit at least the following fields:

- name: you should change this to the name of your application, i.e. `my-application`
- version: you should probably change this to `0.0.1` if your application is brand new
- description: enter a suitable description for your application here
- repository: change the URL to the one of your application's repository
- author: change this to your own details

### Initiating git with a new repository and adding your first commit

Removing the `.git/` folder removed any trace of a repository, so we now want to add git to the application again. To do so, and to add the first commit, run the following commands:

```bash
git init
git add .
git commit -m "First commit - boilerplate set up."
```

If you already have a remote repository set up, you may wish to add it here and push your code (please substitute the example URL below with your own):

```bash
git remote add origin git@github.com:example/my-application.git
git push -u origin master
```

### Installing npm packages

To run your project for the first time, you will need to download the relevant npm packages. To do so, from the root folder of your application, run the following commands:

```bash
cd app
npm install
```

### Running the project and building the app

To run the project, from the app folder inside of the root folder of your application, you can one of the following commands:

```bash
cd app
npm run dev # runs the application in development mode
npm run build ; npm start # runs the application in production mode
```

Running the application in development mode allows you to see the GraphiQL interface by default on http://localhost:5050/graphiql and includes hot-reloading so any changes made are reflected within a few seconds.

Running the application in production mode is faster but there is no hot-reloading available. During the build process, a distributable application is created in the `./app/dist/` folder of the application. The `npm start` script will run the application from this folder.

Linting is also set up to indicate any coding or code styling bad practices. To check for lint errors, run `npm run lint`.

## The structure of the app

The app has its configuration files in its root folder, but the actual application is inside the `app` folder, and the source code you will spend most of your time on is inside the `src` folder within the `app` folder.

Looking inside the `src` folder, you will see:

- `types`: this is where TypeScript interfaces that represent types that can be used by the entire application should sit.
- `weather`: this includes an example query field collection that allows weather data to be queried through GraphQL, using [ClimaCell](https://www.climacell.co/)'s free API. This is also used to demonstrate how to pass secret values to the query field collections as the API needs a key, which can be passed to the application through environment variables or as a [Docker secret](https://docs.docker.com/engine/swarm/secrets/), if the application is deployed with Docker. More on this [below](#configuring-the-example)
- `app.ts`: this is the class that represents the application itself, where the restify server is initialised and where the Apollo Server is configured. It is also used to add query field collections to the Apollo Server configuration
- `main.ts`: this is the entry point of the application and it is where the configuration is read and the app initialised
- `utils.ts`: this is a class of static utility functions that may be used throughout the app. It includes the function that is used to read configuration (`readSecret`) which can be altered if you decide not to use Docker secrets or environment variables.

## Configuring the example

To run the example weather query you will need a developer key from ClimaCell which you can obtain at https://developer.climacell.co/. Developer keys are [free for up to 1,000 calls / day](https://www.climacell.co/pricing/). This project is in no way affiliated or endorsed by ClimaCell. For development purposes this key should be set to an environment variable named `weatherApiToken` and this can be done in a few different ways:

- by creating a file named `.env` inside your `app` folder and adding a line with `weatherApiToken=your-key-here` to that file (highly recommended for development)
- when initiating the `dev` npm script in a shell by adding the variable before the command: `weatherApiToken=your-key-here npm run dev` for bash, `$env:weatherApiToken="your-key-here" ; npm run dev` for PowerShell
- by setting the environment variable globally on your development machine (see [this excellent answer on SuperUser](https://superuser.com/a/284351) to see how it is done in your OS)
- by setting the value in the property `weatherApiToken` of the `env` object in the `.vscode/launch.json` file and using VS Code Debugger to run the project (not recommended as your key could accidentally end up being committed to your repository)

## Debugging

The app has been configured to be easy to debug using VS Code, a launch configuration is already present and breakpoints can be set and the configuration "Launch via NPM" can be selected in VS Code's Debugger to hit those breakpoints. If using a different debugger, be aware that the [Node inspect port](https://nodejs.org/en/docs/guides/debugging-getting-started/) has been changed from the default `9229` to `9339`.

## License

MIT https://ceottaki.mit-license.org/
