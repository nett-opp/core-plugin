# Plugin Core

This Vite configuration streamlines the creation of WordPress plugins with **Vue-powered interfaces** that can run on both the **frontend and backend**.

**Features:**

- Supports **development** (with hot module replacement) and **production** (generates a deployable plugin folder) workflows.
- Handles PHP files and optional assets automatically, including assets used by child plugins.
- Allows **plugin customization** via environment variables.
- Generates a **single JavaScript bundle** for your plugin and can optionally include the Vue runtime.
- Produces a **clean, ready-to-use plugin structure** suitable for WordPress.

# Requirements

Before using this plugin setup, make sure your system has the following installed:

- **Git** – required to clone the repository and manage version control.
- **Node.js** – used to run Vite and build the plugin. (Recommended version: 18.x or higher)
- **npm** – package manager to install dependencies and run scripts. (Comes with Node.js)

# Environment Variables

This plugin uses environment variables prefixed with `VITE_` to customize its behavior. The main variables include:

| Variable                              | Description                                                                            | Default     |
| ------------------------------------- | -------------------------------------------------------------------------------------- | ----------- |
| `VITE_PLUGIN_NAME`                    | Sets the name of the plugin. This is used to rename the main PHP file and JS bundle.   | `my-plugin` |
| `VITE_PLUGIN_PORT`                    | Sets the port for the development server.                                              | `3000`      |
| `VITE_PLUGIN_INCLUDE_OPTIONAL_ASSETS` | If `true`, includes optional assets like the standalone Vue runtime for child plugins. | `false`     |

> **Note:** All environment variables should be defined in a `.env` file at the root of your project.

# Installation

Clone the repository

```bash
git clone https://github.com/nett-opp/core-plugin.git
```

Go to the directory of the plugin

```bash
cd core-plugin
```

Install dependencies

```bash
npm install
```

Run the development server

```
npm run dev
```

Build for production (After building, your plugin folder will be ready to deploy to WordPress.)

```
npm run build
```
