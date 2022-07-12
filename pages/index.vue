<template>
  <div class="flex flex-col gap-4">
    <ContentList v-slot="{ list }" :query="{
      sort: {
        'order': 1
      }
    }">
      <Card v-for="article in list" :key="article._path" :article="article" />
    </ContentList>
  </div>
</template>

<script setup>
useHead({
  title: "Posts | andyjjrt's blog"
})
</script>