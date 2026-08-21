<script setup lang="ts">
interface Contributor {
  nickname: string
  avatar: string
}

const contributors: Contributor[] = [{
  nickname: 'loy',
  avatar: '/contributors/loy.jpg'
}, {
  nickname: '小梁',
  avatar: '/contributors/xiaoliang.png'
}]
</script>

<template>
  <section class="nax-contributors" aria-labelledby="contributors-title">
    <div class="nax-contributors__heading">
      <h2 id="contributors-title" class="nax-contributors__title">贡献者</h2>
      <p class="nax-contributors__intro">感谢每一位让 nax-ui 变得更好的贡献者。</p>
    </div>

    <ul v-if="contributors.length > 0" class="nax-contributors__list" aria-label="项目贡献者">
      <li v-for="contributor in contributors" :key="contributor.nickname">
        <article class="nax-contributors__item">
          <img
            class="nax-contributors__avatar"
            :src="contributor.avatar"
            :alt="`${contributor.nickname} 的头像`"
            width="48"
            height="48"
          >
          <span class="nax-contributors__name">{{ contributor.nickname }}</span>
        </article>
      </li>
    </ul>
    <p v-else class="nax-contributors__empty">期待你的贡献</p>
  </section>
</template>

<style scoped>
.nax-contributors {
  max-width: 1152px;
  margin: 80px auto 0;
  padding: 0 32px;
}

.nax-contributors__heading {
  max-width: 520px;
}

.nax-contributors__title {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 28px;
  line-height: 1.3;
}

.nax-contributors__intro {
  margin: 10px 0 0;
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.7;
}

.nax-contributors__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(156px, 180px));
  gap: 10px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

/* 重置 VitePress 全局 .vp-doc li + li 的 margin-top，保证卡片在网格中对齐 */
.nax-contributors__list > li {
  margin: 0;
}

.nax-contributors__item {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 72px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-elv);
  padding: 10px 12px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition:
    border-color var(--nax-dur-fast) var(--nax-ease-out),
    box-shadow var(--nax-dur-mid) var(--nax-ease-out),
    transform var(--nax-dur-mid) var(--nax-ease-out);
}

.nax-contributors__avatar {
  width: 48px;
  height: 48px;
  flex: 0 0 auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 50%;
  object-fit: cover;
}

.nax-contributors__name {
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.nax-contributors__empty {
  margin: 28px 0 0;
  color: var(--vp-c-text-3);
  font-size: 14px;
}

@media (hover: hover) and (pointer: fine) {
  .nax-contributors__item:hover {
    border-color: var(--vp-c-brand-2);
    box-shadow: var(--nax-shadow-2);
    transform: translateY(-2px);
  }
}

@media (max-width: 767px) {
  .nax-contributors {
    margin-top: 56px;
    padding: 0 24px;
  }

  .nax-contributors__title {
    font-size: 24px;
  }
}
</style>
