import DarkVeil from '../../../components/effects/DarkVeil/DarkVeil.jsx'
import photo01 from '../../../assets/images/home-hero-photos/photo-01.jpg'
import photo02 from '../../../assets/images/home-hero-photos/photo-02.jpg'
import photo03 from '../../../assets/images/home-hero-photos/photo-03.jpg'
import photo04 from '../../../assets/images/home-hero-photos/photo-04.jpg'
import photo05 from '../../../assets/images/home-hero-photos/photo-05.jpg'
import photo06 from '../../../assets/images/home-hero-photos/photo-06.jpg'
import photo07 from '../../../assets/images/home-hero-photos/photo-07.jpg'
import photo08 from '../../../assets/images/home-hero-photos/photo-08.jpg'
import photo09 from '../../../assets/images/home-hero-photos/photo-09.jpg'
import TextType from '../../../components/effects/TextType/TextType.jsx'

const contacts = [
  { label: 'QQ', icon: 'qq' },
  { label: '微信', icon: 'wechat' },
  { label: '邮箱', icon: 'email' },
  { label: 'Figma', icon: 'figma' },
]

const visualCards = [
  { className: 'is-prompt', image: photo01 },
  { className: 'is-chatgpt', image: photo02 },
  { className: 'is-sketch', image: photo03 },
  { className: 'is-codex', image: photo04 },
  { className: 'is-figma', image: photo05 },
  { className: 'is-small-icon', image: photo06 },
  { className: 'is-code', image: photo07 },
  { className: 'is-bottom-prompt', image: photo08 },
  { className: 'is-ratio', image: photo09 },
]

export default function HomeHero({ className = '', ...props }) {
  return (
    <section className={`fh-hero${className ? ` ${className}` : ''}`} {...props}>
      <div className="fh-hero__veil" aria-hidden="true">
        <DarkVeil
          hueShift={12}
          noiseIntensity={0.04}
          scanlineIntensity={0.08}
          scanlineFrequency={0.7}
          speed={0.55}
          warpAmount={0.45}
          resolutionScale={0.9}
        />
      </div>
      <div className="fh-hero__inner">
        <div className="fh-hero__content">
          <div className="fh-hero__left">
            <div className="fh-hero__copy">
              <p className="fh-hero__hello">欢迎光临🎉</p>
              <h1>
                <span className="fh-hero__name-prefix">我是</span>
                <span className="fh-hero__name-mark">Jeremy</span>
              </h1>
              <div className="fh-blue-line" />
              <p className="fh-hero__en">Design × AI × Product × Tools</p>
              <p className="fh-hero__cn">
                我擅长设计、AI工具、产品、内容表达和从0到1的创造
                <br />
                让我们一起把模糊的想法，做成好看、好用、能传播的东西
              </p>
            </div>

            <div className="fh-hero__contacts">
              {contacts.map((item) => (
                <a key={item.label} href="#/about" aria-label={item.label} title={item.label}>
                  <span aria-hidden="true" className={`fh-hero__contact-icon is-${item.icon}`} />
                </a>
              ))}
            </div>
          </div>

          <div className="fh-hero__visual" aria-label="Jeremy creative workflow">
            {visualCards.map((card) => (
              <span key={card.className} className={`fh-visual-card ${card.className}`} aria-hidden="true">
                <img src={card.image} alt="" loading="eager" />
              </span>
            ))}

            <TextType
              as="p"
              className="fh-hero__dynamic"
              cursorCharacter="_"
              initialDelay={280}
              loop={false}
              showCursor
              text={'我站在混沌里\n把东西组织成作品'}
              typingSpeed={86}
              variableSpeed={{ min: 42, max: 118 }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
