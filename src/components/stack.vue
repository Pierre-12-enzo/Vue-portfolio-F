<script setup>
import { defineProps } from 'vue';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { setupCustomjs } from '@/assets/js/custom';

const route = useRoute();

// Call the function on mount
onMounted(() => {
  setupCustomjs();
});

// Watch for route changes to reinitialize the script
watch(route, () => {
  setupCustomjs();
});
defineProps({
    stack: Object
});
</script>
<template>
    
     <div class="col-lg-4 col-md-6 flip-container" onclick="this.querySelector('.stack-item').classList.toggle('flipped')">
                <div class="stack-item">
                    <div class="stack-item__front-side">
                            <p class="pt-1 h5">{{ stack.name }}</p>
                            <img :src="stack.link"/>
                       
                    </div>
                    <div class="stack-item__back-side p-3">
                        <p class="h2">{{ stack.name }}</p>
                        <p class="stack-text">{{ stack.description }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="custom-cursor">Tap to read</div>
</template>
<style scoped>
/* stack section */
.flip-container {
            perspective: 1000px;
            margin: 20px;
            transition: .5s ease-in;
        }
.flip-container:hover {
     cursor: pointer;
    transform: translateY(-20px);
    transition: .5s ease-in;
        }
.flip-container:hover .custom-cursor  {
    display: block;
}

        .stack-item {
            position: relative;
            width: 100%;
            height: 400px;
            transform-style: preserve-3d;
            transition: transform 0.6s;
        }

        .flipped {
            transform: rotateX(180deg);
        }

        .stack-item__front-side,
        .stack-item__back-side {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 10px;
            box-shadow: 4px 12px 40px rgba(0, 0, 0, 0.1);
        }

        .stack-item__front-side {
            background-color: #f9f9f9;
            display: block;
            align-items: center;
            justify-content: center;
        }

        .stack-item__back-side {
            background-color: #f9f9f9;
            color: #000;
            align-items: center;
            justify-content: center;
            transform: rotateX(180deg);
        }
/* Custom Cursor */
.custom-cursor {
            position: fixed;
            width: 100px;
            height: 40px;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            font-size: 14px;
            text-align: center;
            line-height: 40px;
            border-radius: 20px;
            pointer-events: none;
            mix-blend-mode: difference;
            transform: translate(-50%, -50%);
            display: none;
            z-index: 1000;
        }
</style>
<script>
 const customCursor = document.querySelector('.custom-cursor');
        const flipContainers = document.querySelectorAll('.flip-container');

        document.addEventListener('mousemove', (e) => {
            customCursor.style.left = `${e.pageX}px`;
            customCursor.style.top = `${e.pageY}px`;
        });

        flipContainers.forEach((container) => {
            container.addEventListener('mouseenter', () => {
                customCursor.style.display = 'block';
            });

            container.addEventListener('mouseleave', () => {
                customCursor.style.display = 'none';
            });
        });
</script>