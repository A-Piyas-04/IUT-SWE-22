import Image from "next/image";
import profileImage from "./image.png";

export default function AboutPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section 
        aria-labelledby="about-hero-title"
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-dark via-surface to-dark p-8 md:p-12"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/20 via-accent-magenta/20 to-accent-lime/20 animate-pulse" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-magenta/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 text-center space-y-4">
          <h1 
            id="about-hero-title" 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-magenta to-accent-lime"
          >
            About Me
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Software Engineering student passionate about building innovative solutions 
            and exploring the intersection of technology and creativity.
          </p>
        </div>
      </section>

      {/* Profile Card */}
      <section aria-labelledby="profile-title" className="space-y-6">
        <h2 id="profile-title" className="text-2xl font-semibold text-glow-cyan">Profile</h2>
        
        <div className="flex flex-col md:flex-row items-start gap-8 bg-surface/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 hover:border-accent-cyan/30 transition-all duration-300">
          <div className="shrink-0 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/50 to-accent-magenta/50 rounded-full blur-xl opacity-50" />
            <Image
              src={profileImage}
              alt="Profile photo"
              width={160}
              height={160}
              className="relative rounded-full ring-4 ring-accent-cyan/30 shadow-neon-cyan object-cover"
              priority
            />
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Your Name</h3>
              <p className="text-slate-300 leading-relaxed">
                Software Engineering student at IUT with a strong passion for web development 
                and systems design. I enjoy creating elegant solutions to complex problems and 
                continuously learning new technologies to stay at the forefront of innovation.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30 text-sm font-medium">
                Web Development
              </span>
              <span className="px-3 py-1 rounded-full bg-accent-magenta/10 text-accent-magenta border border-accent-magenta/30 text-sm font-medium">
                Systems Design
              </span>
              <span className="px-3 py-1 rounded-full bg-accent-lime/10 text-accent-lime border border-accent-lime/30 text-sm font-medium">
                Full Stack
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Technologies */}
      <section aria-labelledby="skills-title" className="space-y-6">
        <h2 id="skills-title" className="text-2xl font-semibold text-glow-magenta">Skills & Technologies</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { category: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"], colorClass: "cyan", textColor: "text-accent-cyan", borderHover: "hover:border-accent-cyan/30", shadowHover: "hover:shadow-neon-cyan", bgColor: "bg-accent-cyan" },
            { category: "Backend", skills: ["Node.js", "Express", "MongoDB", "REST APIs"], colorClass: "magenta", textColor: "text-accent-magenta", borderHover: "hover:border-accent-magenta/30", shadowHover: "hover:shadow-neon-magenta", bgColor: "bg-accent-magenta" },
            { category: "Tools", skills: ["Git", "Docker", "VS Code", "Figma"], colorClass: "lime", textColor: "text-accent-lime", borderHover: "hover:border-accent-lime/30", shadowHover: "hover:shadow-neon-lime", bgColor: "bg-accent-lime" },
          ].map((group) => (
            <div
              key={group.category}
              className={`bg-surface/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 ${group.borderHover} transition-all duration-300 ${group.shadowHover} group`}
            >
              <h3 className={`text-lg font-semibold mb-4 ${group.textColor}`}>
                {group.category}
              </h3>
              <ul className="space-y-2">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-slate-300">
                    <span className={`w-1.5 h-1.5 rounded-full ${group.bgColor} opacity-60`} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section aria-labelledby="education-title" className="space-y-6">
        <h2 id="education-title" className="text-2xl font-semibold text-glow-lime">Education</h2>
        
        <div className="bg-surface/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-lime/5 rounded-full blur-3xl" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-accent-lime/20 to-accent-cyan/20 flex items-center justify-center border border-accent-lime/30">
                <svg className="w-6 h-6 text-accent-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">Bachelor of Science in Software Engineering</h3>
                <p className="text-accent-cyan font-medium mb-2">Islamic University of Technology (IUT)</p>
                <p className="text-slate-400 text-sm">Currently pursuing degree with focus on web development and software architecture</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section aria-labelledby="connect-title" className="space-y-6">
        <h2 id="connect-title" className="text-2xl font-semibold text-glow-cyan">Connect With Me</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[
            { 
              label: "Facebook", 
              href: "https://www.facebook.com/ahnafshahriar.pias/", 
              textColor: "text-accent-cyan",
              borderHover: "hover:border-accent-cyan/40",
              shadowHover: "hover:shadow-neon-cyan",
              gradientFrom: "from-accent-cyan/5",
              icon: (
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              )
            },
            { 
              label: "LinkedIn", 
              href: "https://linkedin.com/in/ah-pias", 
              textColor: "text-accent-magenta",
              borderHover: "hover:border-accent-magenta/40",
              shadowHover: "hover:shadow-neon-magenta",
              gradientFrom: "from-accent-magenta/5",
              icon: (
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
              )
            },
            { 
              label: "Email", 
              href: "mailto:ahnafpias@iut-dhaka.edu", 
              textColor: "text-accent-lime",
              borderHover: "hover:border-accent-lime/40",
              shadowHover: "hover:shadow-neon-lime",
              gradientFrom: "from-accent-lime/5",
              icon: (
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              )
            },
            { 
              label: "GitHub", 
              href: "https://github.com/A-Piyas-04", 
              textColor: "text-accent-cyan",
              borderHover: "hover:border-accent-cyan/40",
              shadowHover: "hover:shadow-neon-cyan",
              gradientFrom: "from-accent-cyan/5",
              icon: (
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              )
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className={`group relative flex flex-col items-center gap-3 p-6 rounded-xl border border-white/10 bg-surface/50 backdrop-blur-sm hover:bg-surface/70 transition-all duration-300 ${item.borderHover} ${item.shadowHover} hover:-translate-y-1`}
              aria-label={item.label}
            >
              <div className={`w-10 h-10 ${item.textColor} group-hover:scale-110 transition-transform`}>
                <svg 
                  className="w-full h-full" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth={2} 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  viewBox="0 0 24 24"
                >
                  {item.icon}
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                {item.label}
              </span>
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${item.gradientFrom} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
