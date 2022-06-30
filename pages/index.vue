<template>
  <div class="flex flex-col gap-4">
    <ContentList v-slot="{ list }">
      <Card v-for="article in list" :key="article._path" :article="article" />
    </ContentList>
  </div>
</template>

<script setup>
  useHead({
    title: "Posts | andyjjrt's blog"
  })
</script>