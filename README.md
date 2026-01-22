# 🚀 Modern Portfolio - Devies Ade Irawan

A premium, interactive portfolio website built with **Next.js 15**, **Three.js**, and **Framer Motion**. Featuring a sleek dark-themed design, real-time GitHub activity integration, and immersive 3D elements.

## ✨ Features

- **Dynamic Hero Section**: Interactive 3D Lanyard component and rotating text animations.
- **GitHub Integration**: Real-time contribution graph and repository activity visualization using GitHub API.
- **Interactive Project Showcase**: Bento-style grid with detailed project modals and folder-style previews.
- **Multilingual Support**: Professional loading screen with multi-language greetings.
- **Experience Timeline**: Vertical timeline highlighting professional and academic milestones.
- **Tech Stack Visualization**: Dynamic icons and categorized skill highlights.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop experiences.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/)
- **3D Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)

### Utilities
- **HTTP Client**: Axios
- **Date Handling**: Day.js
- **Color Extraction**: ColorThief (for dynamic project card backgrounds)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm / yarn / pnpm / bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/deviesAde/portofolio.git
   cd portofolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory and add your GitHub credentials:
   ```env
   NEXT_PUBLIC_GITHUB_USERNAME=your_username
   NEXT_PUBLIC_GITHUB_TOKEN=your_personal_access_token
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `app/`: Next.js App Router pages and global styles.
- `components/`: Core UI components (About, Projects, GitHub, etc.).
- `components/ui/`: Reusable primitive components and specialized animations.
- `public/`: Static assets like images and resumes.

## 📄 License

This project is personal and used as a portfolio. Feel free to explore the code for inspiration!

---
Built with ❤️ by [Devies Ade Irawan](https://github.com/deviesAde)
