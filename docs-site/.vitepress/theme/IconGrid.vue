<script setup lang="ts">
import codepoints from '../../../uni_modules/nax-icon/icons/codepoints.json'

const props = defineProps<{ names: string[] }>()

function glyph(name: string): string {
  const cp = codepoints[name as keyof typeof codepoints]
  return cp ? String.fromCodePoint(cp) : ''
}
</script>

<template>
  <div class="nax-icon-grid">
    <div v-for="n in props.names" :key="n" class="nax-icon-grid__item">
      <span class="nax-icon-grid__glyph">{{ glyph(n) }}</span>
      <span class="nax-icon-grid__name">{{ n }}</span>
    </div>
  </div>
</template>

<style scoped>
.nax-icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(118px, 1fr));
  gap: 4px 8px;
  margin: 16px 0;
}

.nax-icon-grid__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 4px;
}

.nax-icon-grid__glyph {
  font-family: 'nax-icon', sans-serif;
  font-size: 24px;
  line-height: 1;
  color: var(--vp-c-text-1);
}

.nax-icon-grid__name {
  font-size: 12px;
  color: var(--vp-c-text-2);
  word-break: break-all;
  text-align: center;
}
</style>
