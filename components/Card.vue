<template>
  <NuxtLink :to="'/post' + article._path">
    <div class="card card-bg shadow-lg transition-all cursor-pointer">
      <div class="card-body">
        <h2 class="card-title">{{ article.title }}</h2>
        <p>{{ article.description }}</p>
        <div class="flex gap-2 py-1" v-if="article.tag">
          <span v-for="tag in article.tag" :key="tag" class="badge badge-primary">{{ tag }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  article: Object
})
const router = useRouter();
</script>

<style scoped>
.card-bg {
  @apply bg-base-100;
}

[data-theme="dark"] .card-bg {
  @apply bg-base-300;
}
</style>