# IUT SWE 22

A dark-themed academic dashboard for Software Engineering batch 2022 at IUT. Built with Next.js, featuring class schedules, upcoming class reminders, and academic resources.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)

## Features

- **Interactive Class Routine** - Weekly schedule with Group A/B toggle and 90° rotation
- **Upcoming Class Reminder** - Real-time next class detection (Asia/Dhaka timezone)
- **Urgent Notices** - Placeholder for announcements
- **About Page** - Profile, skills, and social links
- **Dark Neon Theme** - Cyberpunk-inspired design with smooth animations
- **Responsive Design** - Mobile-first, accessible, keyboard navigation

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS 3.4
- Framer Motion
- MongoDB (configured, optional)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables (Optional)

Create `.env.local`:
```env
MONGODB_URI=your_mongodb_connection_string
```

## Project Structure

```
app/              # Next.js pages
components/       # React components
lib/              # Utilities and helpers
public/data/      # Schedule data (routine.json)
```

## Development

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # Run ESLint
npm run test:schedule  # Test schedule utilities
```

## Configuration

Schedule data is in `public/data/routine.json`. Edit this file to update class schedules.

## License

Private project for IUT SWE 22 students.

## Contact

- **Author**: Ahnaf Shahriar Pias
- **Email**: ahnafpias@iut-dhaka.edu
- **GitHub**: [A-Piyas-04](https://github.com/A-Piyas-04)

---

**Built for IUT SWE 22**
