<div align="center">

# ✨ Sajad Noori — Portfolio

**A fast, animated personal portfolio built with React 19, Vite and Framer Motion.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](https://my-portfolio-one-eosin-25.vercel.app)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-7-007FFF?style=flat-square&logo=mui&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat-square&logo=framer&logoColor=white)

[**🌐 Live Site**](https://my-portfolio-one-eosin-25.vercel.app) ·
[**🐛 Report a Bug**](https://github.com/sajad-noori/my_portfolio/issues) ·
[**💡 Request a Feature**](https://github.com/sajad-noori/my_portfolio/issues)

</div>

---

## 📖 About

This is my personal portfolio: a single place to showcase who I am, the projects I've built, and how to get in touch. It's a single-page application with client-side routing, smooth animations, and a build pipeline tuned for performance (compression, image optimization, and bundle analysis).

> 📸 **Tip:** add a screenshot or GIF of the site at `public/preview.png` and uncomment the line below.

<!-- ![Portfolio preview](public/preview.png) -->

## 🚀 Features

- ⚡ **Fast by default**: Vite 7 dev server and optimized production builds
- 🎞️ **Smooth animations**: page and element transitions powered by Framer Motion
- 🧭 **Client-side routing**: React Router 7 for instant navigation
- 🎨 **Modern UI**: Tailwind CSS 4 utilities combined with Material UI components
- 🖼️ **Optimized assets**: automatic image optimization and gzip/brotli compression at build time
- 📦 **Bundle insight**: `rollup-plugin-visualizer` to keep the bundle lean
- ☁️ **One-click deploys**: configured for Vercel (`vercel.json`)

## 🛠️ Tech Stack

| Area | Tools |
| --- | --- |
| **Framework** | React 19, React Router 7 |
| **Build tool** | Vite 7 |
| **Styling** | Tailwind CSS 4, Material UI 7, Emotion |
| **Animation** | Framer Motion |
| **Icons** | Lucide React, React Icons, MUI Icons |
| **Optimization** | vite-plugin-compression, vite-plugin-image-optimizer, rollup-plugin-visualizer |
| **Quality** | ESLint 9 (react-hooks, react-refresh) |
| **Hosting** | Vercel |

## 📂 Project Structure

```text
my_portfolio/
├── .vscode/            # Editor settings
├── public/             # Static assets served as-is
├── src/                # Application source (components, pages, styles)
├── eslint.config.js    # ESLint flat config
├── index.html          # App entry HTML
├── vercel.json         # Vercel deployment config
├── vite.config.js      # Vite + plugin configuration
└── package.json
```

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer (20+ recommended)
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/sajad-noori/my_portfolio.git

# 2. Move into the project
cd my_portfolio

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

The app will be available at **http://localhost:5173**.

### Available Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite dev server with hot reload |
| `npm run build` | Creates an optimized production build in `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint across the project |

## ☁️ Deployment

The site is deployed on **Vercel**. To deploy your own copy:

1. Fork this repository.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Vercel detects Vite automatically: build command `npm run build`, output directory `dist`.
4. Click **Deploy**.

## 🗺️ Roadmap

- [ ] Add project screenshots and case studies
- [ ] Add a contact form
- [ ] Dark / light theme toggle
- [ ] Multi-language support (including RTL)
- [ ] Accessibility and Lighthouse audit pass

## 🤝 Contributing

This is a personal project, but suggestions are welcome. Open an issue to discuss a change, or fork the repo and submit a pull request.

## 📬 Contact

- 🌐 Portfolio: [my-portfolio-one-eosin-25.vercel.app](https://my-portfolio-one-eosin-25.vercel.app)
- 💻 GitHub: [@sajad-noori](https://github.com/sajad-noori)
- 💼 LinkedIn: _add your link_
- ✉️ Email: _add your email_

## 📄 License

Add a license file (for example [MIT](https://choosealicense.com/licenses/mit/)) and reference it here.

---

<div align="center">

Built with ❤️ by **Sajad Noori**

⭐ If you like this project, consider giving it a star!

</div>
