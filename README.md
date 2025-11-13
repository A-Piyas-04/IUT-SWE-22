# IUT SWE 22

A modern, dark-themed academic dashboard web application built for the Software Engineering batch of 2022 at the Islamic University of Technology (IUT). This Next.js application provides students with an intuitive interface to view class schedules, track upcoming classes, and access academic resources with a sleek cyberpunk-inspired design.

![IUT SWE 22](https://img.shields.io/badge/IUT-SWE%2022-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-6.6-47A248?style=for-the-badge&logo=mongodb)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Key Components](#-key-components)
- [Styling & Theming](#-styling--theming)
- [Development](#-development)
- [Testing](#-testing)
- [Performance](#-performance)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🎯 Core Functionality

- **📅 Interactive Class Routine**: 
  - Dynamic weekly schedule display with support for multiple time slots
  - Group A/B toggle for viewing group-specific classes
  - 90-degree rotation feature for better viewing on different screen orientations
  - Automatic detection of lab courses with bi-weekly indicators
  - Support for multi-slot courses and slot ranges
  - Responsive grid layout that adapts to different screen sizes

- **⏰ Upcoming Class Reminder**:
  - Real-time detection of the next upcoming class
  - Timezone-aware (Asia/Dhaka) scheduling
  - Automatic updates every 60 seconds
  - Special handling for bi-weekly lab courses with group-specific information
  - Displays course name, day, and room information

- **🚨 Urgent Notices Box**:
  - Dedicated section for urgent announcements
  - Placeholder ready for future integration with notice board system

- **👥 Student & Faculty Management**:
  - Student list page (ready for future implementation)
  - Faculty contacts page (ready for future implementation)

- **📝 Academic Resources**:
  - Notice board page for announcements
  - Quizzes page for quiz schedules and past papers

- **👤 About Page**:
  - Personal profile showcase
  - Skills and technologies display
  - Education information
  - Social media links (Facebook, LinkedIn, Email, GitHub)

### 🎨 Design Features

- **Dark Neon Theme**: 
  - Calm, futuristic cyberpunk-inspired color palette
  - Soft neon accents (cyan, magenta, lime) for visual appeal
  - High contrast for excellent readability
  - Smooth animations and transitions

- **Responsive Design**:
  - Mobile-first approach
  - Adaptive layouts for tablets and desktops
  - Touch-friendly navigation
  - Optimized for various screen sizes

- **Accessibility**:
  - ARIA labels and semantic HTML
  - Keyboard navigation support
  - Screen reader friendly
  - Respects `prefers-reduced-motion` settings

- **Performance Optimizations**:
  - Smooth page transitions using Framer Motion
  - Hardware-accelerated animations
  - Optimized font loading with Next.js font optimization
  - Efficient state management
  - Performance monitoring component (dev mode)

## 🛠 Tech Stack

### Frontend
- **Next.js 14** (App Router) - React framework with server-side rendering
- **React 18** - UI library
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth transitions
- **Space Grotesk** - Modern sans-serif font (Google Fonts)
- **Orbitron** - Futuristic display font for special elements

### Backend & Database
- **MongoDB 6.6** - NoSQL database (configured for future use)
- **Next.js API Routes** - Serverless API endpoints

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
SWE22/
├── app/                      # Next.js App Router pages
│   ├── about/               # About page with profile
│   ├── faculty-contacts/    # Faculty contacts page
│   ├── notice-board/        # Notice board page
│   ├── quizzes/             # Quizzes page
│   ├── student-list/        # Student list page
│   ├── layout.js            # Root layout component
│   ├── loading.js           # Loading UI component
│   └── page.js              # Homepage
│
├── components/               # Reusable React components
│   ├── ClassRoutine.js      # Main schedule display component
│   ├── CyberLogo/           # Animated logo component
│   ├── Footer.js            # Footer component
│   ├── Header.js            # Site header with navigation
│   ├── Navbar/              # Navigation bar component
│   ├── PageTransition.js    # Page transition animations
│   ├── PerfMonitor.js       # Performance monitoring (dev)
│   ├── RouteTransition.js   # Route-level transitions
│   ├── SectionDivider.js    # Decorative divider component
│   ├── UpcomingReminder.js  # Next class reminder
│   └── UrgentBox.js         # Urgent notices display
│
├── lib/                     # Utility functions and helpers
│   ├── mongodb.js           # MongoDB client configuration
│   ├── nav.test.js          # Navigation helper tests
│   ├── rafDebounce.js       # RequestAnimationFrame debounce
│   ├── schedule.js          # Schedule parsing utilities
│   └── schedule.test.js     # Schedule utility tests
│
├── public/                  # Static assets
│   ├── data/
│   │   └── routine.json     # Class schedule data
│   └── logo/                # Logo SVG files
│
├── docs/                    # Documentation
│   ├── logo-redesign.md
│   ├── style-guide.md
│   ├── transition.md
│   ├── transition-performance.md
│   └── transition-testing.md
│
├── globals.css              # Global styles and utilities
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies and scripts
├── postcss.config.js        # PostCSS configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **MongoDB** (optional, for future database features)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/SWE22.git
   cd SWE22
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables** (optional, for MongoDB):
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

### Routine Data

The class schedule is stored in `public/data/routine.json`. The structure includes:

- **Institution information**: Name, department, program details
- **Teachers map**: Teacher IDs mapped to full names
- **Time slots**: Defined time ranges for each class period
- **Routine data**: Weekly schedule organized by days

Example structure:
```json
{
  "institution": {
    "name": "Islamic University of Technology (IUT)",
    "department": "Computer Science and Engineering",
    "program": "BSc in Software Engineering (SWE)"
  },
  "time_slots": {
    "1": "08:00 - 09:15",
    "2": "09:15 - 10:30",
    ...
  },
  "routine": {
    "Monday": [
      {
        "course": "Math 4544",
        "slot_range": [1, 2],
        "room": "L-4",
        "section": "A"
      }
    ]
  }
}
```

### Tailwind Configuration

Custom theme colors and utilities are defined in `tailwind.config.js`:

- **Dark background**: `#0d0221`
- **Accent colors**: Cyan (`#67e8f9`), Magenta (`#f472b6`), Lime (`#a3e635`)
- **Surface color**: `#140a33` for elevated cards
- **Custom shadows**: Neon glow effects for accent colors

## 📖 Usage

### Viewing Class Schedule

1. Navigate to the homepage
2. The **Weekly Class Routine** section displays the full schedule
3. Toggle between **Group A** and **Group B** to view group-specific classes
4. Use the **Rotate** button to rotate the schedule 90 degrees for better viewing
5. Lab courses are automatically detected and marked with "Bi-Weekly" labels

### Upcoming Class Reminder

The homepage displays the next upcoming class in the **Upcoming Class** box:
- Automatically updates based on current time (Asia/Dhaka timezone)
- Shows course name, day, and room number
- For bi-weekly labs, displays both Group A and Group B information

### Navigation

- Use the navigation bar at the top to switch between pages
- On mobile devices, use the hamburger menu to access navigation
- Active page is highlighted with accent colors

## 🧩 Key Components

### ClassRoutine

The main schedule display component with features:
- Dynamic data loading from JSON
- Group filtering (A/B)
- Rotation capability
- Responsive grid layout
- Lab course detection
- Multi-slot course support

### UpcomingReminder

Real-time class reminder that:
- Fetches schedule data
- Calculates next class based on current time
- Updates every 60 seconds
- Handles bi-weekly lab courses
- Displays in Asia/Dhaka timezone

### RouteTransition

Smooth page transitions using Framer Motion:
- Direction-aware animations (forward/backward)
- Scroll restoration on back navigation
- Respects reduced motion preferences
- Hardware-accelerated animations

### Navbar

Responsive navigation component:
- Desktop horizontal menu
- Mobile hamburger menu
- Active route highlighting
- Smooth transitions

## 🎨 Styling & Theming

### Color Palette

The application uses a carefully crafted dark neon theme:

- **Background**: Deep dark (`#0d0221`)
- **Surface**: Elevated cards (`#140a33`)
- **Accent Cyan**: `#67e8f9` (cyan-300)
- **Accent Magenta**: `#f472b6` (pink-400)
- **Accent Lime**: `#a3e635` (lime-500)
- **Text Primary**: `#e2e8f0` (slate-200)
- **Text Secondary**: `#94a3b8` (slate-400)

### Typography

- **Body Font**: Space Grotesk (400, 500, 700)
- **Display Font**: Orbitron (700) for special elements
- **Line Height**: 1.6 for optimal readability

### Custom Utilities

Global CSS utilities include:
- `.text-glow-cyan`, `.text-glow-magenta`, `.text-glow-lime` - Text glow effects
- `.futuristic-divider` - Animated section divider
- `.page-transition` - Page transition classes
- `.loading-bar` - Loading animation

### Responsive Breakpoints

Tailwind's default breakpoints are used:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Run ESLint with auto-fix
npm run lint:eslint

# Test schedule utilities
npm run test:schedule

# Test navigation helpers
npm run test:nav
```

### Code Style

- Follow ESLint configuration
- Use functional components with hooks
- Prefer named exports for components
- Use TypeScript-style JSDoc comments
- Maintain consistent indentation (2 spaces)

### Adding New Pages

1. Create a new directory in `app/` with `page.js`
2. Add navigation item in `components/Navbar/nav.helpers.js`
3. Follow the existing page structure and styling patterns

### Modifying Schedule Data

1. Edit `public/data/routine.json`
2. Follow the existing JSON structure
3. Ensure time slots are properly formatted
4. Test with both Group A and Group B views

## 🧪 Testing

The project includes utility tests for core functions:

```bash
# Test schedule parsing and next class detection
npm run test:schedule

# Test navigation helpers
npm run test:nav
```

Test files are located in the `lib/` directory and use simple assertion-based testing without external test frameworks.

## ⚡ Performance

### Optimizations Implemented

- **Font Optimization**: Next.js automatic font optimization
- **Image Optimization**: Next.js Image component for optimized images
- **Code Splitting**: Automatic code splitting by Next.js
- **Animation Performance**: Hardware-accelerated CSS transforms
- **State Management**: Efficient React hooks and memoization
- **Lazy Loading**: Dynamic imports where appropriate

### Performance Monitoring

A `PerfMonitor` component is available in development mode to track:
- Component render times
- Animation performance
- Memory usage

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following the code style
4. **Test your changes** thoroughly
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style and patterns
- Add comments for complex logic
- Update documentation as needed
- Test on multiple screen sizes
- Ensure accessibility standards
- Respect the dark neon theme

## 📄 License

This project is private and intended for use by IUT SWE 22 students. All rights reserved.

## 👥 Authors

- **Ahnaf Shahriar Pias** - [GitHub](https://github.com/A-Piyas-04) | [LinkedIn](https://linkedin.com/in/ah-pias)

## 🙏 Acknowledgments

- Islamic University of Technology (IUT) - Computer Science and Engineering Department
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Contact: ahnafpias@iut-dhaka.edu

---

**Built with ❤️ for IUT SWE 22**

*Last updated: 2024*

