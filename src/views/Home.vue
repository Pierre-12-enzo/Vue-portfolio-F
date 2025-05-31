<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section id="hero" class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <i class="icon">💻</i>
            <span>Full Stack Developer</span>
          </div>

          <h1 class="hero-title">
            Hi, I'm <span class="gradient-text">Dusenge Enzo</span>
          </h1>

          <h2 class="hero-subtitle">
            Building Amazing Digital Experiences with
            <span class="typing-text" ref="typingText">MEVN Stack</span>
          </h2>

          <p class="hero-description">
            Passionate full-stack developer specializing in modern web technologies.
            I create beautiful, responsive, and performant applications.
          </p>

          <div class="hero-actions">
            <a href="#contact" class="btn btn-primary hover-lift">
              📧 Get In Touch
            </a>
            <a href="#works" class="btn btn-outline hover-lift">
              👁️ View My Work
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- About Me Section with True Sticky Layout -->
    <section id="about" class="about-section">
      <!-- Left Panel - Sticky -->
      <div class="about-left-panel">
        <div class="about-content-wrapper">
          <div class="about-content active" data-section="1">
            <div class="section-badge">
              <i class="icon">👋</i>
              <span>Hello, I'm Enzo</span>
            </div>
            <h2 class="about-title">
              Passionate <span class="gradient-text">Full-Stack Developer</span>
            </h2>
            <div class="about-line"></div>
            <p class="about-description">
              I'm a dedicated full-stack developer with a passion for creating innovative digital solutions.
              With expertise in modern web technologies, I transform ideas into powerful, user-friendly applications
              that make a real impact. My journey in tech is driven by curiosity, creativity, and a commitment to excellence.
            </p>
          </div>

          <div class="about-content" data-section="2">
            <div class="section-badge">
              <i class="icon">🚀</i>
              <span>My Expertise</span>
            </div>
            <h2 class="about-title">
              Building <span class="gradient-text">Modern Solutions</span>
            </h2>
            <div class="about-line"></div>
            <p class="about-description">
              I specialize in the MEVN stack (MongoDB, Express.js, Vue.js, Node.js) and love creating
              seamless user experiences with beautiful, responsive designs. From concept to deployment,
              I handle every aspect of web development with attention to detail and performance optimization.
            </p>
          </div>

          <div class="about-content" data-section="3">
            <div class="section-badge">
              <i class="icon">🎯</i>
              <span>My Vision</span>
            </div>
            <h2 class="about-title">
              Creating <span class="gradient-text">Digital Impact</span>
            </h2>
            <div class="about-line"></div>
            <p class="about-description">
              I believe technology should solve real problems and enhance people's lives. My goal is to build
              applications that are not just functional, but delightful to use. I'm constantly learning new
              technologies and best practices to stay at the forefront of web development innovation.
            </p>
          </div>

          <div class="about-content" data-section="4">
            <div class="section-badge">
              <i class="icon">🏆</i>
              <span>Achievements</span>
            </div>
            <h2 class="about-title">
              Building <span class="gradient-text">Success Stories</span>
            </h2>
            <div class="about-line"></div>
            <p class="about-description">
              From successful client projects to innovative personal ventures, I've built a track record of delivering
              exceptional results. My focus on quality, performance, and user experience has led to satisfied clients
              and impactful digital solutions that drive real business value.
            </p>
          </div>
        </div>
      </div>

      <!-- Right Panel - Scrolling Content -->
      <div class="about-right-panel">
        <!-- Section 1: Stats -->
        <div class="about-section-item" data-section="1">
          <div class="about-stats">
            <div class="stat-item">
              <span class="stat-number">3+</span>
              <span class="stat-label">Years Experience</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">50+</span>
              <span class="stat-label">Projects Completed</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">10+</span>
              <span class="stat-label">Technologies Mastered</span>
            </div>
          </div>
        </div>

        <!-- Section 2: Expertise -->
        <div class="about-section-item" data-section="2">
          <div class="expertise-grid">
            <div class="expertise-item">
              <div class="expertise-icon">🎨</div>
              <h4>Frontend Development</h4>
              <p>Vue.js, React, TypeScript, CSS3</p>
            </div>
            <div class="expertise-item">
              <div class="expertise-icon">⚙️</div>
              <h4>Backend Development</h4>
              <p>Node.js, Express.js, Python, APIs</p>
            </div>
            <div class="expertise-item">
              <div class="expertise-icon">🗄️</div>
              <h4>Database Design</h4>
              <p>MongoDB, MySQL, Data Modeling</p>
            </div>
            <div class="expertise-item">
              <div class="expertise-icon">🚀</div>
              <h4>DevOps & Deployment</h4>
              <p>Docker, Git, CI/CD, Cloud Services</p>
            </div>
          </div>
        </div>

        <!-- Section 3: Vision -->
        <div class="about-section-item" data-section="3">
          <div class="vision-points">
            <div class="vision-item">
              <div class="vision-icon">💡</div>
              <div class="vision-content">
                <h4>Innovation First</h4>
                <p>Always exploring cutting-edge technologies and creative solutions</p>
              </div>
            </div>
            <div class="vision-item">
              <div class="vision-icon">🤝</div>
              <div class="vision-content">
                <h4>Collaboration</h4>
                <p>Working closely with teams to deliver exceptional results</p>
              </div>
            </div>
            <div class="vision-item">
              <div class="vision-icon">📈</div>
              <div class="vision-content">
                <h4>Continuous Growth</h4>
                <p>Committed to lifelong learning and professional development</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 4: Achievements -->
        <div class="about-section-item" data-section="4">
          <div class="achievements-grid">
            <div class="achievement-item">
              <div class="achievement-icon">🎯</div>
              <div class="achievement-content">
                <h4>Project Success Rate</h4>
                <div class="achievement-metric">98%</div>
                <p>Successful project delivery with client satisfaction</p>
              </div>
            </div>
            <div class="achievement-item">
              <div class="achievement-icon">⚡</div>
              <div class="achievement-content">
                <h4>Performance Optimization</h4>
                <div class="achievement-metric">40%</div>
                <p>Average improvement in application load times</p>
              </div>
            </div>
            <div class="achievement-item">
              <div class="achievement-icon">🚀</div>
              <div class="achievement-content">
                <h4>Code Quality</h4>
                <div class="achievement-metric">A+</div>
                <p>Maintainable, scalable, and well-documented code</p>
              </div>
            </div>
            <div class="achievement-item">
              <div class="achievement-icon">🌟</div>
              <div class="achievement-content">
                <h4>Client Retention</h4>
                <div class="achievement-metric">95%</div>
                <p>Long-term partnerships and repeat business</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stacks Section with Flipping Cards -->
    <section id="stacks" class="stacks-section">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">
            <i class="icon">🛠️</i>
            <span>My Technology Stack</span>
          </div>
          <h2 class="section-title">
            Technologies I <span class="gradient-text">Master</span>
          </h2>
          <p class="section-description">
            A comprehensive overview of the technologies and tools I use to build amazing digital experiences.
          </p>
          <div v-if="showPagination" class="pagination-info">
            Page {{ currentPage }} of {{ totalPages }} ({{ stacks?.length || 0 }} total stacks)
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading-container">
          <div class="spinner">⏳</div>
          <p>Loading stacks...</p>
        </div>

        <!-- Stacks Grid with Flipping Cards -->
        <div v-else class="stacks-grid">
          <div
            v-for="stack in paginatedStacks"
            :key="stack._id"
            class="stack-item"
          >
            <FlippingCard
              :title="stack.name"
              :subtitle="stack.category"
              :description="stack.description"
              :icon="getStackIcon(stack.category)"
              :icon-color="stack.color || '#6366f1'"
              :color="stack.color || '#6366f1'"
              :link="stack.link"
              :meta="getStackMeta(stack)"
              size="large"
              variant="glass"
            />
          </div>
        </div>

        <!-- Pagination Controls -->
        <div v-if="showPagination && !loading" class="pagination-controls">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="pagination-btn prev-btn"
          >
            ← Previous
          </button>

          <div class="pagination-numbers">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              :class="['pagination-number', { active: currentPage === page }]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="pagination-btn next-btn"
          >
            Next →
          </button>
        </div>
      </div>
    </section>

    <!-- Works Section -->
    <section id="works" class="works-section">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">
            <i class="icon">💼</i>
            <span>My Portfolio</span>
          </div>
          <h2 class="section-title">
            Featured <span class="gradient-text">Projects</span>
          </h2>
          <p class="section-description">
            Explore some of my recent work and projects that showcase my skills and creativity.
          </p>
        </div>

        <!-- Works Grid -->
        <div class="works-grid">
          <div
            v-for="work in works"
            :key="work._id"
            class="work-item"
          >
            <div class="work-card glass-effect hover-lift">
              <div class="work-image">
                <img
                  :src="work.mainImage?.url || 'https://via.placeholder.com/400x250'"
                  :alt="work.title"
                />
                <div class="work-overlay">
                  <div class="work-actions">
                    <button
                      v-if="work.links?.live"
                      class="action-btn"
                      @click="openLink(work.links.live)"
                    >
                      👁️
                    </button>
                    <button
                      v-if="work.links?.github"
                      class="action-btn"
                      @click="openLink(work.links.github)"
                    >
                      🔗
                    </button>
                  </div>
                </div>
              </div>

              <div class="work-content">
                <div class="work-meta">
                  <span class="work-category">{{ work.category }}</span>
                  <span class="work-status">{{ work.status }}</span>
                </div>

                <h4 class="work-title">{{ work.title }}</h4>
                <p class="work-description">
                  {{ work.shortDescription || (work.description ? work.description.substring(0, 120) + '...' : 'No description available') }}
                </p>

                <div class="work-technologies" v-if="work.technologies && work.technologies.length">
                  <span
                    v-for="tech in work.technologies.slice(0, 3)"
                    :key="tech._id"
                    class="tech-tag"
                    :style="{ backgroundColor: tech.color + '20', color: tech.color }"
                  >
                    {{ tech.name }}
                  </span>
                  <span
                    v-if="work.technologies.length > 3"
                    class="tech-tag more-tech"
                  >
                    +{{ work.technologies.length - 3 }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Game Section -->
    <section id="game" class="game-section">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">
            <i class="icon">🎮</i>
            <span>Interactive Demo</span>
          </div>
          <h2 class="section-title">Vue.js <span class="gradient-text">Memory Game</span></h2>
          <p class="section-description">Test your memory with this interactive Vue.js game showcasing reactive data and event handling!</p>
        </div>

        <div class="game-container">
          <div class="game-board">
            <div class="game-header">
              <div class="game-stats">
                <div class="stat-item">
                  <span class="stat-label">Score</span>
                  <span class="stat-value">{{ gameScore }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Level</span>
                  <span class="stat-value">{{ gameLevel }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Lives</span>
                  <span class="stat-value">{{ gameLives }}</span>
                </div>
              </div>
              <div class="game-controls">
                <button
                  @click="startGame"
                  :disabled="gameActive"
                  class="game-btn start-btn"
                >
                  {{ gameActive ? 'Playing...' : 'Start Game' }}
                </button>
                <button
                  @click="resetGame"
                  class="game-btn reset-btn"
                >
                  Reset
                </button>
              </div>
            </div>

            <div class="game-grid">
              <div
                v-for="(tile, index) in gameTiles"
                :key="index"
                class="game-tile"
                :class="{
                  'active': tile.active,
                  'correct': tile.correct,
                  'wrong': tile.wrong,
                  'disabled': !gameActive || showingSequence
                }"
                @click="handleTileClick(index)"
              >
                <div class="tile-content">
                  <i class="fas fa-star"></i>
                </div>
              </div>
            </div>

            <div class="game-message">
              <p v-if="gameMessage" class="message-text">{{ gameMessage }}</p>
              <p v-if="!gameActive && gameScore > 0" class="final-score">
                Final Score: {{ gameScore }} | Best: {{ bestScore }}
              </p>
            </div>
          </div>

          <div class="game-instructions">
            <h3>How to Play</h3>
            <ul>
              <li>🎯 Watch the sequence of tiles that light up</li>
              <li>🔄 Repeat the sequence by clicking the tiles in order</li>
              <li>⬆️ Each level adds one more tile to remember</li>
              <li>❤️ You have 3 lives - don't make mistakes!</li>
              <li>🏆 Try to beat your best score</li>
            </ul>

            <div class="tech-showcase">
              <h4>Vue.js Features Demonstrated:</h4>
              <div class="tech-tags">
                <span class="tech-tag">Reactive Data</span>
                <span class="tech-tag">Event Handling</span>
                <span class="tech-tag">Computed Properties</span>
                <span class="tech-tag">Lifecycle Hooks</span>
                <span class="tech-tag">Conditional Rendering</span>
                <span class="tech-tag">Dynamic Classes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">
            <i class="icon">📧</i>
            <span>Get In Touch</span>
          </div>
          <h2 class="section-title">
            Let's Work <span class="gradient-text">Together</span>
          </h2>
          <p class="section-description">
            Have a project in mind? Let's discuss how we can bring your ideas to life.
          </p>
        </div>

        <div class="contact-content">
          <div class="contact-form-container">
            <form @submit.prevent="handleContact" class="contact-form glass-effect">
              <div class="form-group">
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div class="form-group">
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="Your Email"
                  required
                />
              </div>

              <div class="form-group">
                <input
                  v-model="form.subject"
                  type="text"
                  placeholder="Subject"
                  required
                />
              </div>

              <div class="form-group">
                <textarea
                  v-model="form.message"
                  placeholder="Your Message"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" class="btn btn-primary" :disabled="submitting">
                {{ submitting ? '📤 Sending...' : '🚀 Send Message' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import FlippingCard from '@/components/ui/FlippingCard.vue'
import { api } from '@/utils/api'

// Reactive data
const loading = ref(true)
const submitting = ref(false)
const stacks = ref([])
const works = ref([])

// Pagination for stacks
const currentPage = ref(1)
const stacksPerPage = 6
const typingText = ref(null)

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Game state
const gameActive = ref(false)
const gameScore = ref(0)
const gameLevel = ref(1)
const gameLives = ref(3)
const gameMessage = ref('')
const showingSequence = ref(false)
const bestScore = ref(parseInt(localStorage.getItem('memoryGameBestScore') || '0'))

const gameTiles = ref(Array.from({ length: 9 }, () => ({
  active: false,
  correct: false,
  wrong: false
})))

const gameSequence = ref([])
const playerSequence = ref([])
const currentStep = ref(0)

// Computed properties for pagination
const totalPages = computed(() => {
  if (!stacks.value || stacks.value.length === 0) return 1
  return Math.ceil(stacks.value.length / stacksPerPage)
})

const paginatedStacks = computed(() => {
  if (!stacks.value || stacks.value.length === 0) return []
  const start = (currentPage.value - 1) * stacksPerPage
  const end = start + stacksPerPage
  return stacks.value.slice(start, end)
})

const showPagination = computed(() => {
  return stacks.value && stacks.value.length > stacksPerPage
})

// Methods
const fetchStacks = async () => {
  try {
    // Fetch all stacks to enable pagination
    const data = await api.getStacks()
    stacks.value = data
  } catch (error) {
    console.error('Error fetching stacks:', error)
  }
}

const fetchWorks = async () => {
  try {
    const data = await api.getWorks({ featured: 'true', limit: '6' })
    works.value = data
  } catch (error) {
    console.error('Error fetching works:', error)
  }
}

const getStackIcon = (category) => {
  const iconMap = {
    'Frontend': '🎨',
    'Backend': '⚙️',
    'Database': '🗄️',
    'DevOps': '🚀',
    'Mobile': '📱',
    'Design': '✨',
    'Other': '🛠️'
  }
  return iconMap[category] || '💻'
}

const getStackMeta = (stack) => {
  const meta = []
  if (stack.proficiencyLevel) meta.push(stack.proficiencyLevel)
  if (stack.yearsOfExperience) meta.push(`${stack.yearsOfExperience}+ years`)
  return meta
}

const openLink = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const handleContact = async () => {
  try {
    submitting.value = true

    await api.contact(form)
    alert('✅ Message sent successfully!')
    Object.keys(form).forEach(key => form[key] = '')

  } catch (error) {
    console.error('Contact form error:', error)
    alert('❌ Failed to send message. Please try again.')
  } finally {
    submitting.value = false
  }
}

// Pagination methods
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // Smooth scroll to stacks section
    const stacksSection = document.getElementById('stacks')
    if (stacksSection) {
      stacksSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    goToPage(currentPage.value + 1)
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1)
  }
}

// Game methods
const startGame = () => {
  gameActive.value = true
  gameScore.value = 0
  gameLevel.value = 1
  gameLives.value = 3
  gameMessage.value = 'Watch the sequence!'
  resetTiles()
  nextLevel()
}

const resetGame = () => {
  gameActive.value = false
  gameScore.value = 0
  gameLevel.value = 1
  gameLives.value = 3
  gameMessage.value = ''
  gameSequence.value = []
  playerSequence.value = []
  currentStep.value = 0
  resetTiles()
}

const resetTiles = () => {
  gameTiles.value.forEach(tile => {
    tile.active = false
    tile.correct = false
    tile.wrong = false
  })
}

const nextLevel = () => {
  gameSequence.value.push(Math.floor(Math.random() * 9))
  playerSequence.value = []
  currentStep.value = 0
  showSequence()
}

const showSequence = async () => {
  showingSequence.value = true
  resetTiles()

  for (let i = 0; i < gameSequence.value.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 600))
    const tileIndex = gameSequence.value[i]
    gameTiles.value[tileIndex].active = true

    await new Promise(resolve => setTimeout(resolve, 400))
    gameTiles.value[tileIndex].active = false
  }

  showingSequence.value = false
  gameMessage.value = 'Your turn! Click the sequence.'
}

const handleTileClick = (index) => {
  if (!gameActive.value || showingSequence.value) return

  playerSequence.value.push(index)

  // Check if the clicked tile is correct
  if (index === gameSequence.value[currentStep.value]) {
    // Correct tile
    gameTiles.value[index].correct = true
    setTimeout(() => {
      gameTiles.value[index].correct = false
    }, 300)

    currentStep.value++

    // Check if sequence is complete
    if (currentStep.value === gameSequence.value.length) {
      // Level complete
      gameScore.value += gameLevel.value * 10
      gameLevel.value++
      gameMessage.value = `Level ${gameLevel.value - 1} complete! +${(gameLevel.value - 1) * 10} points`

      setTimeout(() => {
        nextLevel()
      }, 1500)
    }
  } else {
    // Wrong tile
    gameTiles.value[index].wrong = true
    setTimeout(() => {
      gameTiles.value[index].wrong = false
    }, 300)

    gameLives.value--

    if (gameLives.value <= 0) {
      // Game over
      gameActive.value = false
      gameMessage.value = 'Game Over! Try again.'

      // Update best score
      if (gameScore.value > bestScore.value) {
        bestScore.value = gameScore.value
        localStorage.setItem('memoryGameBestScore', gameScore.value.toString())
        gameMessage.value = 'Game Over! New best score!'
      }
    } else {
      // Try again
      gameMessage.value = `Wrong! ${gameLives.value} lives left. Watch again.`
      playerSequence.value = []
      currentStep.value = 0

      setTimeout(() => {
        showSequence()
      }, 1500)
    }
  }
}

// Smooth & Responsive Sticky Scroll Effect
let currentPanelState = 'hidden'
let isTransitioning = false

const handleStickyScroll = () => {
  // Skip sticky effect on mobile
  if (window.innerWidth <= 768) {
    const leftPanel = document.querySelector('.about-left-panel')
    if (leftPanel) {
      leftPanel.style.display = 'none'
    }
    return
  }

  const aboutSection = document.querySelector('.about-section')
  const leftPanel = document.querySelector('.about-left-panel')
  const leftContents = document.querySelectorAll('.about-content')
  const rightSections = document.querySelectorAll('.about-section-item')

  if (!aboutSection || !leftPanel || !leftContents.length || !rightSections.length) return

  const scrollY = window.scrollY
  const windowHeight = window.innerHeight
  const aboutTop = aboutSection.offsetTop
  const aboutHeight = aboutSection.offsetHeight

  // Check if we're in the about section
  const inAboutSection = scrollY >= aboutTop - windowHeight * 0.1 &&
                        scrollY <= aboutTop + aboutHeight + windowHeight * 0.1

  if (!inAboutSection) {
    if (currentPanelState !== 'hidden') {
      leftPanel.style.opacity = '0'
      setTimeout(() => {
        leftPanel.style.display = 'none'
        leftPanel.style.position = 'fixed'
        leftPanel.style.top = '0'
      }, 300)
      currentPanelState = 'hidden'
    }
    return
  }

  // Show panel if hidden
  if (currentPanelState === 'hidden') {
    leftPanel.style.display = 'flex'
    leftPanel.style.opacity = '1'
  }

  // Calculate active section with better logic
  let activeSection = 0
  let bestMatch = -1

  rightSections.forEach((section, index) => {
    const rect = section.getBoundingClientRect()
    const sectionCenter = rect.top + rect.height / 2
    const viewportCenter = windowHeight / 2
    const distance = Math.abs(sectionCenter - viewportCenter)

    if (bestMatch === -1 || distance < bestMatch) {
      bestMatch = distance
      activeSection = index
    }
  })

  // Smooth state transitions for 4 sections
  const newState = (activeSection === 1 || activeSection === 2) ? 'fixed' : 'moving'

  if (currentPanelState !== newState && !isTransitioning) {
    isTransitioning = true

    if (newState === 'fixed') {
      // Transition to fixed (sections 1 and 2)
      leftPanel.style.position = 'fixed'
      leftPanel.style.top = '0'
      currentPanelState = 'fixed'
    } else {
      // Transition to moving (sections 0 and 3)
      leftPanel.style.position = 'absolute'
      const targetSection = activeSection === 0 ? rightSections[0] : rightSections[3]
      leftPanel.style.top = `${targetSection.offsetTop}px`
      currentPanelState = 'moving'
    }

    setTimeout(() => {
      isTransitioning = false
    }, 600)
  }

  // Update content
  leftContents.forEach((content, index) => {
    if (index === activeSection) {
      content.classList.add('active')
    } else {
      content.classList.remove('active')
    }
  })
}

// Throttle function for better performance
const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Throttled scroll handler
const throttledStickyScroll = throttle(handleStickyScroll, 16) // ~60fps

// Lifecycle hooks
onMounted(async () => {
  await Promise.all([fetchStacks(), fetchWorks()])
  loading.value = false

  // Add scroll listener for sticky effect
  window.addEventListener('scroll', throttledStickyScroll, { passive: true })

  // Add resize listener for responsiveness
  window.addEventListener('resize', throttle(() => {
    handleStickyScroll()
  }, 250))

  handleStickyScroll() // Initial call
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledStickyScroll)
  window.removeEventListener('resize', handleStickyScroll)
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  position: relative;
  overflow: hidden;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  color: #6366f1;
  font-weight: 500;
  margin-bottom: 2rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 400;
  color: #94a3b8;
  margin-bottom: 1.5rem;
}

.typing-text {
  color: #6366f1;
  font-weight: 600;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #94a3b8;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 2rem;
  font-weight: 600;
  border-radius: 0.75rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
}

.btn-outline {
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  background: transparent;
}

.btn:hover {
  transform: translateY(-2px);
}

/* About Section - Perfect Fit Layout */
.about-section {
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  margin: 0;
  padding: 0;
}

/* No extra spacing - section starts immediately */

/* Left Panel - Smooth & Responsive */
.about-left-panel {
  position: fixed;
  left: 0;
  top: 0;
  width: 40%;
  height: 100vh;
  display: none;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 3vw, 2rem);
  z-index: 10;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform, opacity, top;
  transform: translateZ(0); /* Force hardware acceleration */
}

.about-content-wrapper {
  width: 100%;
  max-width: clamp(300px, 80%, 500px);
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: clamp(1rem, 2vw, 1.5rem);
  padding: clamp(2rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2rem);
  height: clamp(70vh, 80vh, 90vh);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.about-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  text-align: center;
  opacity: 0;
  transition: all 0.6s ease;
}

.about-content.active {
  opacity: 1;
}

.about-title {
  font-size: 2.125rem;
  font-weight: 700;
  line-height: 1.05;
  color: white;
  margin-bottom: 1rem;
}

.about_line {
  width: 100%;
  height: 1px;
  background-color: #737373;
  margin: 1rem 0;
}

.about-description {
  font-size: 1rem;
  color: #a3a3a3;
  line-height: 1.6;
}

/* Right Panel - Responsive Scrolling */
.about-right-panel {
  margin-left: 40%;
  width: 60%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 5;
  padding-top: 0;
}

.about-section-item {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: clamp(1rem, 2vw, 1.5rem);
  margin-right: clamp(1rem, 3vw, 2rem);
  margin-bottom: 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.about-section-item:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-5px) scale(1.02);
}

.about-section-item:last-child {
  margin-bottom: 0;
}

/* Stats Grid */
.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.stat-item {
  text-align: center;
  padding: 2rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-number {
  display: block;
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: #cbd5e1;
  font-weight: 500;
}

/* Expertise Grid */
.expertise-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.expertise-item {
  text-align: center;
  padding: 2rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.expertise-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.expertise-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.expertise-item h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.expertise-item p {
  color: #cbd5e1;
  font-size: 0.9rem;
}

/* Vision Points */
.vision-points {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
}

.vision-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.vision-item:hover {
  transform: translateX(10px);
  background: rgba(255, 255, 255, 0.15);
}

.vision-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.vision-content h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.vision-content p {
  color: #cbd5e1;
  font-size: 1rem;
  line-height: 1.6;
}

/* Section Styles */
.stacks-section,
.works-section,
.contact-section {
  padding: 100px 0;
  margin: 0;
}

/* Remove gaps between sections */
.section_about + .stacks-section {
  margin-top: 0;
  padding-top: 100px;
}

.stacks-section {
  background: #1e293b;
}

.works-section {
  background: #0f172a;
}

.contact-section {
  background: #1e293b;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  color: #6366f1;
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.section-description {
  font-size: 1.1rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Loading */
.loading-container {
  text-align: center;
  padding: 4rem 2rem;
}

.spinner {
  font-size: 2rem;
  margin-bottom: 1rem;
}

/* Grids */
.stacks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* Pagination Styles */
.pagination-info {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #94a3b8;
  font-weight: 500;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.pagination-btn {
  padding: 0.75rem 1.5rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: #6366f1;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-btn:hover:not(:disabled) {
  background: rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.5);
  transform: translateY(-2px);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.pagination-numbers {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.pagination-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(99, 102, 241, 0.3);
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-number:hover {
  background: rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.5);
  transform: scale(1.1);
}

.pagination-number.active {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border-color: #6366f1;
  transform: scale(1.1);
}

.pagination-number.active:hover {
  transform: scale(1.15);
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

/* Work Cards */
.work-card {
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.work-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.work-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.work-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.work-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.action-btn:hover {
  background: #6366f1;
  border-color: #6366f1;
  transform: scale(1.1);
}

.work-card:hover .work-overlay {
  opacity: 1;
}

.work-card:hover img {
  transform: scale(1.1);
}

.work-content {
  padding: 1.5rem;
}

.work-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.work-category,
.work-status {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.work-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #f8fafc;
}

.work-description {
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.work-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.more-tech {
  background: rgba(255, 255, 255, 0.1);
  color: #94a3b8;
}

/* Contact Form */
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  color: #f8fafc;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #94a3b8;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
  border-color: #6366f1;
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
}

/* Section Spacing - Fix Gaps */
.hero-section {
  margin-bottom: 0;
}

.about-section {
  margin-top: 0;
  margin-bottom: 0;
}

.stacks-section,
.works-section,
.game-section,
.contact-section {
  padding: 100px 0;
  margin: 0;
}

/* Remove gaps between sections */
.about-section + .stacks-section {
  margin-top: 0;
  padding-top: 100px;
}

/* Game Section */
.game-section {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  position: relative;
}

.game-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: start;
}

.game-board {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.game-stats {
  display: flex;
  gap: 2rem;
}

.game-stats .stat-item {
  text-align: center;
}

.game-stats .stat-label {
  display: block;
  font-size: 0.875rem;
  color: #94a3b8;
  margin-bottom: 0.25rem;
}

.game-stats .stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #6366f1;
}

.game-controls {
  display: flex;
  gap: 1rem;
}

.game-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.start-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.start-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.start-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reset-btn {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

.reset-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.game-tile {
  aspect-ratio: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.game-tile:hover:not(.disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.game-tile.active {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-color: #6366f1;
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.6);
  animation: pulse 0.4s ease;
}

.game-tile.correct {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-color: #10b981;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
}

.game-tile.wrong {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  border-color: #ef4444;
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.6);
  animation: shake 0.5s ease;
}

.game-tile.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.tile-content {
  font-size: 1.5rem;
  color: white;
}

.game-message {
  text-align: center;
  min-height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.message-text {
  font-size: 1.1rem;
  color: #e2e8f0;
  margin-bottom: 0.5rem;
}

.final-score {
  font-size: 1rem;
  color: #94a3b8;
}

.game-instructions {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  padding: 2rem;
}

.game-instructions h3 {
  color: #e2e8f0;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.game-instructions ul {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.game-instructions li {
  color: #94a3b8;
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.tech-showcase h4 {
  color: #e2e8f0;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tags .tech-tag {
  background: rgba(99, 102, 241, 0.2);
  color: #a5b4fc;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Game Animations */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* Achievements Grid */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.achievement-item {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.achievement-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.achievement-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.achievement-content h4 {
  color: #e2e8f0;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.achievement-metric {
  font-size: 2rem;
  font-weight: 800;
  color: #6366f1;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.achievement-content p {
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Achievements Grid */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.achievement-item {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.achievement-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.achievement-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.achievement-content h4 {
  color: #e2e8f0;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.achievement-metric {
  font-size: 2rem;
  font-weight: 800;
  color: #6366f1;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.achievement-content p {
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Achievements Grid */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(1rem, 3vw, 2rem);
  max-width: 600px;
  margin: 0 auto;
}

.achievement-item {
  text-align: center;
  padding: clamp(1rem, 3vw, 1.5rem);
  background: rgba(255, 255, 255, 0.05);
  border-radius: clamp(0.75rem, 2vw, 1rem);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.achievement-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.achievement-icon {
  font-size: clamp(2rem, 4vw, 2.5rem);
  margin-bottom: 1rem;
}

.achievement-content h4 {
  color: #e2e8f0;
  font-size: clamp(0.875rem, 2vw, 1rem);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.achievement-metric {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 800;
  color: #6366f1;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.achievement-content p {
  color: #94a3b8;
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  line-height: 1.5;
}

/* Enhanced About Section Responsiveness */
.about-left-panel {
  width: clamp(35%, 40%, 45%);
  padding: clamp(1rem, 3vw, 2rem);
}

.about-right-panel {
  margin-left: clamp(35%, 40%, 45%);
  width: clamp(55%, 60%, 65%);
}

.about-content-wrapper {
  max-width: clamp(300px, 90%, 500px);
  padding: clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem);
  height: clamp(60vh, 80vh, 90vh);
}

.about-title {
  font-size: clamp(1.5rem, 4vw, 2.125rem);
  margin-bottom: clamp(0.5rem, 2vw, 1rem);
}

.about-description {
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  line-height: clamp(1.4, 1.6, 1.8);
}

.about-section-item {
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem);
  margin-right: clamp(1rem, 3vw, 2rem);
  border-radius: clamp(1rem, 2vw, 1.5rem);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .stacks-grid,
  .works-grid {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  /* Responsive Pagination */
  .pagination-controls {
    gap: 0.5rem;
    margin-top: 2rem;
  }

  .pagination-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .pagination-number {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
  }

  .pagination-info {
    font-size: 0.8rem;
  }

  /* About Section Responsive */
  .sticky-panel {
    height: auto;
    min-height: 100vh;
    position: relative;
  }

  .panel-content {
    padding: 3rem 1rem;
  }

  .about-title {
    font-size: 2.5rem;
  }

  .about-description {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .about-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .stat-item {
    padding: 1.5rem 1rem;
  }

  .stat-number {
    font-size: 2.5rem;
  }

  .expertise-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .expertise-item {
    padding: 1.5rem 1rem;
  }

  .expertise-icon {
    font-size: 2.5rem;
  }

  .vision-item {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.5rem 1rem;
  }

  .vision-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  /* Achievements Grid Responsive */
  .achievements-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .achievement-item {
    padding: 1rem;
  }

  .achievement-icon {
    font-size: 2rem;
  }

  .achievement-metric {
    font-size: 1.5rem;
  }

  /* Mobile About Stats and Grids */
  .about-stats {
    grid-template-columns: 1fr !important;
    gap: 1rem !important;
  }

  .expertise-grid {
    grid-template-columns: 1fr !important;
    gap: 1rem !important;
  }

  .vision-points {
    display: flex !important;
    flex-direction: column !important;
    gap: 1rem !important;
  }

  .achievements-grid {
    grid-template-columns: 1fr !important;
    gap: 1rem !important;
  }

  .vision-item:hover {
    transform: translateY(-5px);
  }

  .vision-icon {
    font-size: 2rem;
  }

  /* About Section Mobile - Complete Redesign */
  .about-section {
    position: static !important;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    padding: 2rem 0 !important;
    display: block !important;
  }

  .about-left-panel {
    position: static !important;
    width: 100% !important;
    height: auto !important;
    display: flex !important;
    flex-direction: column !important;
    padding: 1rem !important;
    background: transparent !important;
    opacity: 1 !important;
    transform: none !important;
    left: auto !important;
    top: auto !important;
    align-items: stretch !important;
    justify-content: flex-start !important;
  }

  .about-content-wrapper {
    height: auto !important;
    min-height: auto !important;
    max-width: 100% !important;
    margin-bottom: 0 !important;
    padding: 0 !important;
    background: transparent !important;
    backdrop-filter: none !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 2rem !important;
  }

  .about-content {
    position: static !important;
    transform: none !important;
    opacity: 1 !important;
    margin-bottom: 0 !important;
    top: auto !important;
    left: auto !important;
    width: 100% !important;
    height: auto !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    background: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(15px) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    border-radius: 1rem !important;
    padding: 2rem 1.5rem !important;
    text-align: center !important;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2) !important;
  }

  .about-content:last-child {
    margin-bottom: 0 !important;
  }

  .about-right-panel {
    width: 100% !important;
    margin-left: 0 !important;
    display: block !important;
    margin-top: 2rem;
  }

  .about-section-item {
    height: auto !important;
    margin-right: 0 !important;
    margin-bottom: 2rem !important;
    padding: 2rem 1rem !important;
  }

  .about-title {
    font-size: 1.5rem !important;
    margin-bottom: 1rem !important;
    line-height: 1.2 !important;
  }

  .about-description {
    font-size: 1rem !important;
    line-height: 1.6 !important;
    margin-bottom: 1rem !important;
  }

  .section-badge {
    margin-bottom: 1rem !important;
  }

  .about_line {
    margin: 1rem 0 !important;
  }

  /* Mobile section spacing */
  .stacks-section,
  .works-section,
  .game-section,
  .contact-section {
    padding: clamp(30px, 8vw, 50px) 0;
  }

  /* Game Section Mobile */
  .game-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .game-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }

  .game-stats {
    justify-content: space-around;
    gap: 1rem;
  }

  .game-controls {
    justify-content: center;
  }

  .game-grid {
    max-width: 250px;
  }

  .game-instructions {
    order: -1;
  }

  .tech-tags .tech-tag {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }
}
</style>