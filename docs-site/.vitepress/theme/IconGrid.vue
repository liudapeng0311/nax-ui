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
  gap: 8px;
  margin: 16px 0;
}

.nax-icon-grid__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 18px 4px;
  border: 1px solid transparent;
  border-radius: var(--nax-radius-md, 10px);
  transition:
    background-color 160ms cubic-bezier(0.23, 1, 0.32, 1),
    border-color 160ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
}

.nax-icon-grid__glyph {
  font-family: 'nax-icon', sans-serif;
  font-size: 26px;
  line-height: 1;
  color: var(--vp-c-text-1);
  transition: color 160ms cubic-bezier(0.23, 1, 0.32, 1);
}

.nax-icon-grid__name {
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  color: var(--vp-c-text-3);
  word-break: break-all;
  text-align: center;
}

@media (hover: hover) and (pointer: fine) {
  .nax-icon-grid__item:hover {
    background-color: var(--vp-c-bg-soft);
    border-color: var(--vp-c-divider);
    transform: translateY(-2px);
  }

  .nax-icon-grid__item:hover .nax-icon-grid__glyph {
    color: var(--vp-c-brand-2);
  }
}
</style>
