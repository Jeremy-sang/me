export default function HomeProjectBlock({
  items = [],
  layout = 'feature',
  subtitle = '',
  tag = '',
  theme = 'light',
  title,
  className = '',
  ...props
}) {
  return (
    <section className={`fh-project is-${theme} layout-${layout}${className ? ` ${className}` : ''}`} {...props}>
      <div className="fh-project__inner">
        <h3>{title}</h3>

        {layout === 'feature' && (
          <>
            <div className="fh-feature-copy">
              <p>{subtitle}</p>
              <span>{tag}</span>
            </div>
            <div className="fh-feature-card">
              <div>
                <p>B端业务</p>
                <span>Business design case</span>
              </div>
              <div className="fh-feature-media" />
            </div>
            <div className="fh-side-card top" />
            <div className="fh-side-card bottom" />
          </>
        )}

        {layout === 'phones' && (
          <div className="fh-phone-stage">
            {items.map((item, index) => (
              <div key={item} className={`fh-phone${index === 1 || index === 2 ? ' is-main' : ''}`}>
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        {layout === 'placeholder' && <div className="fh-placeholder-panel" />}

        {!['feature', 'phones', 'placeholder'].includes(layout) && (
          <div className="fh-card-row">
            {items.map((item) => (
              <article key={item} className="fh-gray-card">
                <span>{item}</span>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
