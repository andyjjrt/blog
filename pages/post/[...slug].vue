<template>
  <main class="grid grid-cols-3 gap-20">
    <div class="col-span-3 lg:col-span-2">
      <ContentRenderer class="prose dark:prose-invert lg:prose-base prose-sm" :value="blog">
        <template #not-found>
          <h1>Document not found</h1>
        </template>
      </ContentRenderer>
    </div>
    <div class="hidden lg:block">
      <div v-if="blog.excerpt" class="card glass sticky top-28">
        <div class="card-body">
          <h2 class="card-title font-bold">Table Of Contents</h2>
          <ul class="space-y-2">
            <template v-for="(t, k) in toc" :key="`toc-item-${k}`">
              <li>
                <NuxtLink :class="{
                  'text-sm ml-4': t.depth == 2,
                  'text-[13px] ml-6': t.depth > 2,
                }" class="capitalize" :to="`#${t.id}`">{{ t.title }}</NuxtLink>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>

  </main>
</template>

<script setup>
const slug = useRoute().params.slug.toString().replace(/,/g, "/");
const { data: blog } = await useAsyncData(slug, () => {
  return queryContent(slug).findOne();
});
const toc = computed(() => {
  if (!blog.value) return [];
  const items = blog.value.excerpt?.children;
  if (!items) return [];
  const toc = [];
  const tags = ["h2", "h3", "h4", "h5", "h6"];
  items.forEach((item) => {
    if (tags.includes(item.tag)) {
      toc.push({
        id: item.props.id,
        title: item.props.id.toString().replace(/-/g, " "),
        depth: Number(item.tag.replace(/h/g, "")),
      });
    }
  });
  return toc;
});
</script>

<style scoped>
.prose {
  @apply max-w-none;
}
</style>