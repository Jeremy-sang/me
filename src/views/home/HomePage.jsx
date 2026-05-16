import HomeFooter from './components/HomeFooter.jsx'
import HomeHero from './components/HomeHero.jsx'
import HomeIntro from './components/HomeIntro.jsx'
import HomeProjectBlock from './components/HomeProjectBlock.jsx'
import HomeScrollStage from './components/HomeScrollStage.jsx'
import HomeSectionIntro from './components/HomeSectionIntro.jsx'
import './home.css'

const skillCards = [
  { title: 'C端业务', kind: 'c' },
  { title: 'B端业务', kind: 'business' },
  { title: 'AI技术应用', kind: 'ai' },
  { title: '摄影摄像', kind: 'photo' },
  { title: '图标设计', kind: 'icon' },
]

const bProjects = [
  { title: 'WMS系统', subtitle: '扫描收货功能重构', tag: 'B端业务' },
  { title: '看板系统', subtitle: '经营数据可视化搭建', tag: 'B端业务' },
]

const cProjects = ['汪师傅APP', '京东服务+', '京寄卡', '满单返礼']
const aiProjects = ['AI做可用性测试Demo', 'AI文案助手', 'AI做网页', 'AI生图']

export default function HomePage() {
  return (
    <div className="figma-home">
      <HomeScrollStage>
        <HomeHero className="fh-scroll-panel" data-scroll-mode="normal" />
        <div className="figma-home__divider" />
        <HomeIntro className="fh-scroll-panel" data-scroll-mode="normal" cards={skillCards} />

        <HomeSectionIntro
          id="projects"
          className="fh-scroll-panel"
          data-scroll-mode="normal"
          theme="dark"
          title="B端设计"
          body="我做过许多B端相关的设计，例如常见的仓储管理系统WMS、看板类web系统、工具型操作系统等。无论它的形态是PC端还是移动端，都有涉猎，B端的设计教会我克制和冷静，同时又学会如何通过客观+主观的方式去抽丝剥茧分析问题。"
        />
        <HomeProjectBlock className="fh-scroll-panel" data-scroll-mode="feature-sequence" theme="dark" title="WMS系统" subtitle="扫描收货功能重构" tag="B端业务" items={bProjects} />

        <HomeSectionIntro
          className="fh-scroll-panel"
          data-scroll-mode="normal"
          theme="light"
          title="C端设计"
          body="C端的设计往往需要共情能力。以用户为中心，找到真正关键的那部分用户，在 0-1 的阶段为他们建立清晰、好用、可持续扩展的体验。"
        />
        <HomeProjectBlock className="fh-scroll-panel" data-scroll-mode="horizontal-sequence" theme="light" title="C端业务" items={cProjects} layout="phones" />

        <HomeSectionIntro
          className="fh-scroll-panel"
          data-scroll-mode="normal"
          theme="dark"
          title="AI技术落地"
          body="近几年无疑是AI井喷式发展的几年。从 ChatGPT 开始我就在持续关注，寻求 AI 在设计中的真实落地场景，也尝试搭建本地 ComfyUI 与 AI Agent 产品。"
        />
        <HomeProjectBlock className="fh-scroll-panel" data-scroll-mode="horizontal-sequence" theme="dark" title="AI应用" items={aiProjects} layout="cards" />

        <HomeSectionIntro
          className="fh-scroll-panel"
          data-scroll-mode="normal"
          theme="light"
          title="图标设计"
          body="虽然实际工作中由于各种规范的完备，绘制图标的机会较少，但我仍会通过不同风格与质感的练习保持技法敏感度。"
        />
        <HomeProjectBlock className="fh-scroll-panel" data-scroll-mode="horizontal-sequence" theme="light" title="图标设计" layout="placeholder" />

        <HomeSectionIntro
          className="fh-scroll-panel"
          data-scroll-mode="normal"
          theme="dark"
          title="摄影摄像"
          body="学生时代便对摄影表现出极大的兴趣。无论是风景、人文、纪实还是商业摄影，我都喜欢去尝试，也因此磨练了构图思维和对光影的理解。"
        />
        <HomeProjectBlock className="fh-scroll-panel" data-scroll-mode="horizontal-sequence" theme="dark" title="摄影摄像" items={aiProjects} layout="cards" />

        <HomeSectionIntro
          id="contact"
          className="fh-scroll-panel"
          data-scroll-mode="normal"
          theme="light"
          title="关于我"
          body="感谢您能看到最后。容我重新简单介绍一下：我是一名用户体验设计师，也是一个极具探索精神的人。我喜欢新鲜的事物、前沿的设计、新型的工具和有趣的交互，希望有朝一日成为真正的全栈设计师。"
          tall
        />
      </HomeScrollStage>

      <HomeFooter />
    </div>
  )
}
