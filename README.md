# Core Plugin for WordPress

A Vite-powered boilerplate for creating modern WordPress plugins with Vue 3 interfaces. This setup streamlines development and produces a ready-to-deploy plugin folder with a single JS and CSS bundle.

## Features

- Fully integrates Vue 3 with WordPress.
- Supports hot module replacement (HMR) during development.
- Generates one JavaScript and one CSS file for production.
- Supports parent and child plugin structure.
- Produces a clean, deployable plugin folder with minimal configuration.

## Development Environment Requirements

To work on this project, you will need the following tools installed:

- **Node.js v18+**  
  Node.js is required to run Vite, Vue, and other build tools.  
  [Download Node.js](https://nodejs.org/) — choose the LTS version (v18 or higher).

- **npm**  
  Comes bundled with Node.js and is used to install packages.  
  [npm Documentation](https://www.npmjs.com/)

- **Git**  
  Needed for cloning repositories and version control.  
  [Download Git](https://git-scm.com/)

- **IDE (Recommended: Visual Studio Code or Zed)**  
  Ideal for JavaScript/TypeScript and Vue development.  
  [Download VS Code](https://code.visualstudio.com/)  
  [Download Zed](https://zed.dev/)

## Environment Variables

Create a `.env` file in your project root to configure your plugin.

### Core Plugin Settings

| Variable                       | Description                                            | Default                  |
| :----------------------------- | :----------------------------------------------------- | :----------------------- |
| `VITE_PLUGIN_NAME`             | Plugin name as shown in WordPress Plugins list         | My Plugin                |
| `VITE_PLUGIN_SLUG`             | URL-friendly ID, used in slugs, handles, and filenames | my-plugin                |
| `VITE_PLUGIN_VERSION`          | Plugin version for cache-busting assets                | 1.0.0                    |
| `VITE_PLUGIN_DESCRIPTION`      | Description shown in the Plugins list                  | No description provided. |
| `VITE_PLUGIN_TEXT_DOMAIN`      | Text domain for translations                           | my-plugin                |
| `VITE_PLUGIN_DOMAIN_PATH`      | Relative path to translation files                     | /languages               |
| `VITE_PLUGIN_MENU_NAME`        | Name shown in admin menu                               | my-plugin-menu           |
| `VITE_PLUGIN_PARENT_MENU_SLUG` | Slug of parent menu if plugin is a submenu             | null                     |
| `VITE_PLUGIN_MENU_CAPABILITY`  | Capability required to access plugin page              | manage_options           |
| `VITE_PLUGIN_MENU_POSITION`    | Position in admin menu (important for top-level menus) | 25                       |
| `VITE_PLUGIN_PORT`             | Port for Vite dev server                               | 3000                     |
| `VITE_PLUGIN_URI`              | URL to the plugin homepage                             |                          |
| `VITE_PLUGIN_AUTHOR`           | Plugin author name (appears in plugin list)            |                          |
| `VITE_PLUGIN_AUTHOR_URI`       | Author website URL                                     |                          |

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
