import contactDot from '../../../assets/images/figma-home/contact-dot.png'
import logo from '../../../assets/images/figma-home/jeremy-logo-light.svg'

const contacts = ['微信', 'QQ', '邮箱', 'Figma']

export default function HomeFooter() {
  return (
    <footer className="fh-footer">
      <div className="fh-footer__brand">
        <img src={logo} alt="Jeremy" />
        <p>可通过右侧方式与我联系</p>
      </div>

      <div className="fh-footer__contacts">
        {contacts.map((item) => (
          <a key={item} href="#/about" aria-label={item}>
            <img src={contactDot} alt="" />
          </a>
        ))}
      </div>

      <p className="fh-footer__credit">此页面由Jeremy&Codex联合开发</p>
    </footer>
  )
}
