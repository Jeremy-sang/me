import ProjectCard from '../components/ProjectCard.jsx'

const projects = [
  { title: 'AI 工作台', category: 'Intelligence', description: '面向业务流程的人工智能应用开发。', image: 'https://via.placeholder.com/420/f5f5f7/1d1d1f?text=AI', href: '#', tone: 'tone-pearl' },
  { title: '移动体验', category: 'Mobile', description: '以任务完成效率为核心的移动应用设计。', image: 'https://via.placeholder.com/420/272729/ffffff?text=App', href: '#', tone: 'tone-dark' },
  { title: '网页系统', category: 'Web', description: '响应式网页设计与前端工程实现。', image: 'https://via.placeholder.com/420/fafafc/1d1d1f?text=Web', href: '#', tone: 'tone-light' },
  { title: '数据可视化', category: 'Insight', description: '把复杂数据转化为可判断的清晰界面。', image: 'https://via.placeholder.com/420/2a2a2c/ffffff?text=Data', href: '#', tone: 'tone-dark' },
  { title: '链上应用', category: 'Blockchain', description: '探索资产、身份与交互的新型产品界面。', image: 'https://via.placeholder.com/420/f5f5f7/1d1d1f?text=Chain', href: '#', tone: 'tone-pearl' },
]

export default function ProjectsView() {
  return (
    <>
      <section className="page-hero parchment">
        <p className="eyebrow">Selected Work</p>
        <h1>我的项目</h1>
        <p>以产品展示的方式呈现作品，让每个项目都有独立的呼吸空间。</p>
      </section>

      <section className="section projects-section">
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>
    </>
  )
}
