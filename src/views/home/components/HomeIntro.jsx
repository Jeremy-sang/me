import aiImage from '../../../assets/images/figma-home/ai-3d.png'
import businessImage from '../../../assets/images/figma-home/business-3d.png'
import cardBase from '../../../assets/images/figma-home/card-base.png'
import cardC from '../../../assets/images/figma-home/card-c.png'
import iconImage from '../../../assets/images/figma-home/icon-3d.png'
import photoImage from '../../../assets/images/figma-home/photo-3d.png'

const imageMap = {
  c: cardC,
  business: businessImage,
  ai: aiImage,
  photo: photoImage,
  icon: iconImage,
}

export default function HomeIntro({ cards, className = '', ...props }) {
  return (
    <section className={`fh-intro${className ? ` ${className}` : ''}`} {...props}>
      <div className="fh-intro__inner">
        <div className="fh-intro__text">
          <h2>虽素未谋面，相信我，仅需几分钟，即可「胜似相见」</h2>
          <p>这是我的创造系统，谈不上有趣但还算有用</p>
        </div>

        <p className="fh-intro__hint">灵光一现固然重要，但持之以恒才方的始终</p>

        <div className="fh-skill-grid">
          {cards.map((card) => (
            <a key={card.title} className="fh-skill-card" href="#projects">
              <img className="fh-skill-card__base" src={cardBase} alt="" />
              <img className={`fh-skill-card__icon is-${card.kind}`} src={imageMap[card.kind]} alt="" />
              <span>{card.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
