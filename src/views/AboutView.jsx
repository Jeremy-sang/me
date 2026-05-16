import { lazy, Suspense } from 'react'

const Lanyard = lazy(() => import('../components/effects/Lanyard/Lanyard.jsx'))

const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'UI设计']
const socialLinks = [
  { label: 'GitHub', icon: 'fab fa-github', href: 'https://github.com/Jeremy-sang' },
  { label: 'LinkedIn', icon: 'fab fa-linkedin', href: '#' },
  { label: 'Twitter', icon: 'fab fa-twitter', href: '#' },
  { label: 'Email', icon: 'fas fa-envelope', href: 'mailto:hello@example.com' },
]

export default function AboutView() {
  return (
    <>
      <section className="page-hero dark about-hero">
        <div className="about-hero__copy">
          <p className="eyebrow">About</p>
          <h1>关于我</h1>
          <p>我关注清晰的信息结构、稳定的技术实现，以及让用户少费力的界面细节。</p>
        </div>

        <div className="about-hero__lanyard" aria-label="交互式联系卡片">
          <Suspense fallback={<div className="about-hero__lanyard-fallback" />}>
            <Lanyard cameraDistance={16} sceneOffset={[0.7, 0, 0]} />
          </Suspense>
        </div>
      </section>

      <section className="section about-section">
        <div className="about-container">
          <div className="about-content">
            <p>我是一名充满激情的全栈开发工程师，专注于创建优秀的用户体验和高效的技术解决方案。</p>
            <div className="skills">
              <h3>技能专长</h3>
              <div className="skill-tags">
                {skills.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            <div className="contact-info">
              <h3>联系方式</h3>
              <div className="social-links">
                {socialLinks.map((link) => (
                  <a key={link.label} href={link.href} className="social-link" aria-label={link.label}>
                    <i className={link.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
