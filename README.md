# Welcome! 👋

**My monorepo for fast, efficient and bundled project management** 🚀

Welcome to my monorepo! This README guide will walk you through the steps to get the project up and running. Before you begin, make sure you have [Docker](https://www.docker.com/products/docker-desktop/) and [Node.js](https://nodejs.org/en/download) v20+ installed on your system.

## Getting Started

### **1. Clone the Repository** 

```
git clone https://github.com/sjoerdvanbommel/monorepo.git
cd monorepo
```

### **2. Install Dependencies** 

Using npm or yarn? This project uses pnpm workspaces, so make sure to install pnpm globally first:

```
npm i -g pnpm
# OR
yarn global add pnpm
```

Once pnpm is installed, run:

```
pnpm i
```


### **3. Initialize Project Settings**

```
pnpm run setup
```

The setup script will synchronously run the following scripts in all repos:

- `docker-compose` to make sure all docker containers are running
- `db:generate` to generate the database clients
- `db:migrate:dev` to run existing migrations (`db:push` can be used later to prototype schema changes)
- `db:seed` to fill the database with example data

**You only have to execute this on initial installation!**

> [!NOTE]
> If you run into compile errors in VS Code after this step, you might need to restart the TypeScript server:
> 
> Open a TypeScript file and run `Ctrl/Cmd + Shift + P` -> `TypeScript: Restart TS Server`

### **4. Start the Development Server**

```
pnpm run dev
```

This command will launch the development server for all projects inside of this monorepo, allowing you to start developing a project immediately. Once this monorepo becomes bigger, this command will be split up in separate commands to prevent.

### **Lint Codebase**

```
pnpm run lint
```
Check your code for potential issues and maintain a consistent coding style using ESLint.

### **Build the Project**

TODO: Building locally & releasing (preview, staging & prd)

### **Run Tests**

TODO: setup tests

### Help

Need Help or Found a Bug?
If you encounter any issues or have questions, feel free to open an issue on the GitHub repository.

### Contribute

We welcome contributions from the community. If you'd like to contribute to this monorepo, please follow our [Contribution Guidelines](./CONTRIBUTING.md) and submit a pull request. Happy coding! 🚀
