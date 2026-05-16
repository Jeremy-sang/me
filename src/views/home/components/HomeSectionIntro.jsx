export default function HomeSectionIntro({
  body,
  className = '',
  id,
  tall = false,
  theme = 'light',
  title,
  ...props
}) {
  const classes = `fh-section-intro is-${theme}${tall ? ' is-tall' : ''}${className ? ` ${className}` : ''}`

  return (
    <section id={id} className={classes} {...props}>
      <div className="fh-section-intro__inner">
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </section>
  )
}
