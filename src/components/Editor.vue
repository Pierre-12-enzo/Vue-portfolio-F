<template>
  <div :style="{ width: width }">
    <div ref="editorRef" :style="{ height, width: '100%' }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: { type: String, default: '' }, // Bind v-model correctly
  width: { type: String, default: '100%' },
  height: { type: String, default: '200px' }
});

const emit = defineEmits(["update:modelValue"]);

const editorRef = ref(null);
let editorInstance = null; // Store the Quill instance

onMounted(() => {
  if (window.Quill) {
    const Font = window.Quill.import('formats/font');
    Font.whitelist = ['serif', 'monospace'];
    window.Quill.register(Font, true);

    editorInstance = new window.Quill(editorRef.value, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline'],
          [{ color: [] }, { background: [] }],
          [{ header: [1, 2, 3, false] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean']
        ],
      },
    });

    // Set initial content correctly
    editorInstance.root.innerHTML = props.modelValue;

    // Emit updates correctly
    editorInstance.on('text-change', () => {
      const content = editorInstance.root.innerHTML;
      emit('update:modelValue', content);
    });
  } else {
    console.error('Quill is not loaded!');
  }
});

// Watch for external changes and update Quill editor
watch(() => props.modelValue, (newValue) => {
  if (editorInstance && editorInstance.root.innerHTML !== newValue) {
    editorInstance.root.innerHTML = newValue;
  }
});
</script>

<style scoped>
.ql-font-serif {
  font-family: 'Georgia', serif;
}
.ql-font-monospace {
  font-family: 'Courier New', monospace;
}
</style>
