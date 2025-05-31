<template>
  <div class="flip-card" :class="[cardClass, { 'manual-flip': isFlipped }]" @click="handleClick">
    <div class="flip-card-inner" :class="{ 'flipped': isFlipped }">
      <!-- Front Side -->
      <div class="flip-card-front" :style="frontCardStyle">
        <div class="front-top">
          <div class="card-icon" v-if="icon">
            <span :style="{ color: iconColor || color }">{{ icon }}</span>
          </div>
          <div class="card-image" v-else-if="image">
            <img :src="image" :alt="title" />
          </div>
        </div>

        <div class="front-content">
          <h5 class="card-title" :style="{ color: color }">{{ title }}</h5>
          <p class="card-subtitle" v-if="subtitle">{{ subtitle }}</p>
        </div>

        <div class="front-bottom">
          <div class="card-meta" v-if="meta && meta.length">
            <span
              class="meta-item"
              v-for="item in meta"
              :key="item"
              :style="{
                backgroundColor: color + '20',
                color: color,
                borderColor: color + '40'
              }"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>

      <!-- Back Side -->
      <div class="flip-card-back" :style="backCardStyle">
        <div class="back-content">
          <div class="back-header">
            <h6 class="back-title">{{ backTitle || title }}</h6>
            <p class="back-subtitle" v-if="subtitle">{{ subtitle }}</p>
          </div>

          <div class="back-main">
            <p class="back-description" v-if="description">{{ description }}</p>
            <p class="back-description" v-else>No description available</p>

            <!-- Features List -->
            <ul class="features-list" v-if="features && features.length">
              <li v-for="feature in features" :key="feature">
                ✅ {{ feature }}
              </li>
            </ul>
          </div>

          <div class="back-footer">
            <!-- Action Buttons -->
            <div class="card-actions" v-if="actions && actions.length">
              <button
                v-for="action in actions"
                :key="action.label"
                class="btn btn-action"
                :class="action.class"
                @click.stop="handleAction(action)"
              >
                {{ action.icon }} {{ action.label }}
              </button>
            </div>

            <!-- Link -->
            <a
              v-if="link"
              :href="link"
              target="_blank"
              rel="noopener noreferrer"
              class="card-link"
              @click.stop
            >
              🔗 Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  backTitle: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  iconColor: {
    type: String,
    default: '#6366f1'
  },
  color: {
    type: String,
    default: '#6366f1'
  },
  image: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: ''
  },
  meta: {
    type: Array,
    default: () => []
  },
  features: {
    type: Array,
    default: () => []
  },
  actions: {
    type: Array,
    default: () => []
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'gradient', 'glass', 'solid'].includes(value)
  },
  autoFlip: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['flip', 'action'])

// Reactive data
const isFlipped = ref(false)

// Computed properties
const cardClass = computed(() => {
  return [
    `flip-card--${props.size}`,
    `flip-card--${props.variant}`,
    { 'flip-card--auto': props.autoFlip }
  ]
})

const frontCardStyle = computed(() => {
  if (props.variant === 'default' || props.variant === 'glass') {
    return {
      background: `rgba(255, 255, 255, 0.1)`,
      backdropFilter: 'blur(10px)',
      border: `1px solid ${props.color}20`,
      boxShadow: `0 10px 15px -3px ${props.color}20`
    }
  }
  return {}
})

const backCardStyle = computed(() => {
  // Create a lighter version of the color for gradient
  const color = props.color
  const lighterColor = adjustColorBrightness(color, 20)

  return {
    background: `linear-gradient(135deg, ${color} 0%, ${lighterColor} 100%)`,
    boxShadow: `0 0 30px ${color}40`
  }
})

// Helper function to adjust color brightness
const adjustColorBrightness = (color, percent) => {
  const num = parseInt(color.replace("#", ""), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
}

// Methods
const handleClick = () => {
  isFlipped.value = !isFlipped.value
  emit('flip', isFlipped.value)
}

const handleAction = (action) => {
  emit('action', action)
  if (action.handler) {
    action.handler()
  }
}
</script>

<style scoped>
.flip-card {
  background-color: transparent;
  perspective: 1000px;
  cursor: pointer;

  /* Size variants */
  &--small {
    height: 200px;
  }

  &--medium {
    height: 300px;
  }

  &--large {
    height: 450px;
  }
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s ease-in-out;
  transform-style: preserve-3d;
}

/* Hover flip behavior */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Manual flip state */
.flip-card-inner.flipped {
  transform: rotateY(180deg) !important;
}

/* Prevent double flip on hover when manually flipped */
.flip-card.manual-flip:hover .flip-card-inner.flipped {
  transform: rotateY(0deg) !important;
}

/* Ensure flip works on large screens */
@media (min-width: 1024px) {
  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-inner.flipped {
    transform: rotateY(180deg) !important;
  }
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.flip-card-front {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1;
}

.flip-card-back {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  transform: rotateY(180deg);
  color: white;
  padding: 1.5rem;
  z-index: 2;
}

/* Variant styles */
.flip-card--gradient .flip-card-front {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
}

.flip-card--glass .flip-card-front {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
}

.flip-card--solid .flip-card-front {
  background: #334155;
  border: 1px solid #475569;
}

.flip-card:hover .flip-card-front,
.flip-card:hover .flip-card-back {
  box-shadow: 0 0 30px rgba(99, 102, 241, 0.4);
}

/* Front card layout */
.front-top {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.front-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0.5rem 0;
}

.front-bottom {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Front card content */
.card-icon {
  font-size: 3rem;
  line-height: 1;
}

.card-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #f8fafc;
  line-height: 1.2;
}

.card-subtitle {
  font-size: 0.9rem;
  color: #94a3b8;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  text-align: center;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.meta-item {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(99, 102, 241, 0.2);
  white-space: nowrap;
}

/* Back card content */
.back-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}

.back-header {
  flex-shrink: 0;
  text-align: center;
  margin-bottom: 1rem;
}

.back-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
}

.back-subtitle {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0;
}

.back-main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.back-description {
  font-size: 0.5rem;
  line-height: 1.1;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.95);
  text-align: center;
  padding: 0 0.5rem;
  font-weight: 400;
}

.back-footer {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
}

.features-list li {
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.btn-action {
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
}

.btn-action:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.3);
}

.card-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.card-link:hover {
  color: rgba(255, 255, 255, 0.8);
  transform: translateX(4px);
}

/* Large screen optimizations */
@media (min-width: 1024px) {
  .flip-card--large {
    height: 480px;
  }

  .back-description {
    font-size: 0.9rem;
    line-height: 1.4;
    padding: 0 1rem;
    color: rgba(255, 255, 255, 1) !important;
    font-weight: 500;
  }

  .back-title {
    font-size: 1.4rem;
    color: white !important;
  }

  .flip-card-back {
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .flip-card--small { height: 180px; }
  .flip-card--medium { height: 250px; }
  .flip-card--large { height: 380px; }

  .card-icon {
    font-size: 2.5rem;
  }

  .card-title {
    font-size: 1.1rem;
  }

  .flip-card-front,
  .flip-card-back {
    padding: 1rem;
  }

  .back-description {
    font-size: 0.9rem;
    line-height: 1.5;
  }
}
</style>
