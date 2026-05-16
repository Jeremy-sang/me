import contactDot from '../../../assets/images/figma-home/contact-dot.png'
import portrait from '../../../assets/images/大头精修 1.png'

const contacts = ['微信', 'QQ', '邮箱', 'Figma']
const tiles = ['tile-1', 'tile-2', 'tile-3', 'tile-4', 'tile-5', 'tile-6', 'tile-7', 'tile-8', 'tile-9']

export default function HomeHero({ className = '', ...props }) {
  return (
    <section className={`fh-hero${className ? ` ${className}` : ''}`} {...props}>
      <div className="fh-hero__inner">
        {tiles.map((tile) => (
          <span key={tile} className={`fh-float-tile ${tile}`} />
        ))}

        <div className="fh-hero__copy">
          <p className="fh-hero__hello">欢迎光临🎉</p>
          <h1>我是Jeremy</h1>
          <div className="fh-blue-line" />
          <p className="fh-hero__en">A user experience designer pursuing full-stack design</p>
          <p className="fh-hero__cn">
            一个在极客世界不断探索体验设计师
            <br />
            对设计的热爱是驱使我不断探索的动力，对极客的追求是我不断努力的方向
          </p>
        </div>

        <img className="fh-hero__portrait" src={portrait} alt="Jeremy portrait" />

        <div className="fh-hero__contacts">
          {contacts.map((item) => (
            <a key={item} href="#/about" aria-label={item}>
              <img src={contactDot} alt="" />
              <span>{item}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
