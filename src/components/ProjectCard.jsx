export default function ProjectCard({ project }) {
  return (
    <a className={`project-card ${project.tone}`} href={project.href}>
      <img src={project.image} alt="" />
      <div>
        <p className="project-category">{project.category}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </a>
  )
}
