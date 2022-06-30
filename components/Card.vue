<template>
  <div class="card bg-base-100 shadow-lg transition-all">
    <div class="card-body">
      <h2 class="card-title">{{ article.title }}</h2>
      <p>{{ article.description }}</p>
      <div class="card-actions justify-end">
        <NuxtLink class="btn btn-primary" :to="'/post' + article._path">View</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  article: Object
})
</script>