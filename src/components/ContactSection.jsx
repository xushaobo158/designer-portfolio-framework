import { ArrowUpRight } from './Icons'
import GradientText from './GradientText'

const titleGradient = ['#69cdff', '#4bacff', '#ffffff']

function ContactSection({ copy }) {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-grid" />
      <div className="contact-aurora" />
      <div className="contact-rings"><i /><i /><i /></div>

      <div className="contact-content">
        <div className="contact-status" data-contact-status><i /> {copy.status}</div>
        <div className="contact-title-clip"><h2 data-contact-title>{copy.title[0]}<br /><GradientText colors={titleGradient} animationSpeed={2.6} showBorder={false}>{copy.title[1]}</GradientText></h2></div>
        <p data-contact-description>{copy.description}</p>
        <div className="contact-actions" data-contact-actions>
          <a className="button button-primary button-large" href="mailto:hello@yourname.com">{copy.primaryAction} <ArrowUpRight /></a>
          <a className="button button-ghost button-large" href="#home">{copy.secondaryAction} <span>↑</span></a>
        </div>
      </div>

      <div className="contact-details" data-contact-details>
        <div className="contact-item">
          <span>{copy.email}</span>
          <a href="mailto:hello@yourname.com">hello@yourname.com</a>
        </div>
        <div className="contact-item">
          <span>{copy.wechatPhone}</span>
          <p>your_wechat · +86 138 0000 0000</p>
        </div>
        <div className="contact-socials">
          {copy.socials.map((link) => <a href="#contact" key={link}>{link}<ArrowUpRight size={14} /></a>)}
        </div>
      </div>

      <footer className="site-footer" data-contact-footer>
        <span>{copy.copyright}</span>
        <span>{copy.built}</span>
      </footer>
    </section>
  )
}

export default ContactSection
