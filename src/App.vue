<script setup>
import { computed, ref } from 'vue'

const sections = [
  { id: 'home', label: '首页' },
  { id: 'projects', label: '项目' },
  { id: 'about', label: '关于我' },
]

const projects = [
  { title: '项目一', description: '人工智能应用开发', image: 'https://via.placeholder.com/300', href: '#' },
  { title: '项目二', description: '移动应用设计', image: 'https://via.placeholder.com/300', href: '#' },
  { title: '项目三', description: '网页设计与开发', image: 'https://via.placeholder.com/300', href: '#' },
  { title: '项目四', description: '数据可视化', image: 'https://via.placeholder.com/300', href: '#' },
  { title: '项目五', description: '区块链应用', image: 'https://via.placeholder.com/300', href: '#' },
]

const skills = ['JavaScript', 'Vue 3', 'Node.js', 'Python', 'UI设计']
const socialLinks = [
  { label: 'GitHub', icon: 'fab fa-github', href: 'https://github.com/Jeremy-sang' },
  { label: 'LinkedIn', icon: 'fab fa-linkedin', href: '#' },
  { label: 'Twitter', icon: 'fab fa-twitter', href: '#' },
  { label: 'Email', icon: 'fas fa-envelope', href: 'mailto:hello@example.com' },
]

const activeSection = ref('home')
const isDarkMode = ref(false)

const themeIcon = computed(() => (isDarkMode.value ? 'fas fa-sun' : 'fas fa-moon'))
const animatedTitle = computed(() => '你好，我是你的名字'.split(''))

function switchSection(sectionId) {
  activeSection.value = sectionId
}

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value
}
</script>

<template>
  <div :class="{ 'dark-mode': isDarkMode }">
    <nav class="navbar">
      <div class="nav-brand">
        <span class="logo">YourName</span>
      </div>

      <ul class="nav-links">
        <li v-for="section in sections" :key="section.id">
          <a
            :href="`#${section.id}`"
            :class="{ active: activeSection === section.id }"
            @click.prevent="switchSection(section.id)"
          >
            {{ section.label }}
          </a>
        </li>
      </ul>

      <button class="theme-toggle" type="button" aria-label="切换主题" @click="toggleTheme">
        <i :class="themeIcon"></i>
      </button>
    </nav>

    <main>
      <section id="home" class="section" :class="{ active: activeSection === 'home' }">
        <div class="hero">
          <div class="hero-content">
            <h1 class="animate-text" aria-label="你好，我是你的名字">
              <span
                v-for="(letter, index) in animatedTitle"
                :key="`${letter}-${index}`"
                class="letter"
                :style="{ animationDelay: `${300 + index * 30}ms` }"
              >
                {{ letter }}
              </span>
            </h1>
            <p class="subtitle">全栈开发工程师 / UI设计师 / 创意工作者</p>
            <div class="cta-buttons">
              <a href="#projects" class="btn primary" @click.prevent="switchSection('projects')">查看作品</a>
              <a href="#about" class="btn secondary" @click.prevent="switchSection('about')">了解更多</a>
            </div>
          </div>
          <div class="hero-image">
            <img src="https://via.placeholder.com/500" alt="Profile">
          </div>
        </div>
      </section>

      <section id="projects" class="section" :class="{ active: activeSection === 'projects' }">
        <h2>我的项目</h2>
        <div class="projects-grid">
          <a v-for="project in projects" :key="project.title" class="project-card" :href="project.href">
            <img :src="project.image" :alt="project.title">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
          </a>
        </div>
      </section>

      <section id="about" class="section" :class="{ active: activeSection === 'about' }">
        <div class="about-container">
          <div class="about-content">
            <h2>关于我</h2>
            <p>我是一名充满激情的全栈开发工程师，专注于创建优秀的用户体验和高效的技术解决方案。</p>
            <div class="skills">
              <h3>技能专长</h3>
              <div class="skill-tags">
                <span v-for="skill in skills" :key="skill" class="skill-tag">{{ skill }}</span>
              </div>
            </div>
            <div class="contact-info">
              <h3>联系方式</h3>
              <div class="social-links">
                <a
                  v-for="link in socialLinks"
                  :key="link.label"
                  :href="link.href"
                  class="social-link"
                  :aria-label="link.label"
                >
                  <i :class="link.icon"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <p>&copy; 2026 你的名字. All rights reserved.</p>
    </footer>
  </div>
</template>
