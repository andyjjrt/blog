<template>
  <main v-if="blog">
    <article class="grid grid-cols-3 gap-20">
      <div class="col-span-3 lg:col-span-2">
        <h1 class="text-5xl font-bold">{{ blog.title }}</h1>
        <div class="py-5 gap-2 flex">
          <span v-for="tag in tags" :key="tag" class="badge badge-primary">{{ tag }}</span>
        </div>
        <ContentRenderer class="prose dark:prose-invert lg:prose-base prose-sm blog-link" :value="blog">
          <template #not-found>
            <h1>Document not found</h1>
          </template>
        </ContentRenderer>
      </div>
      <div class="hidden lg:block">
        <div v-if="blog.excerpt" class="card glass sticky top-28">
          <div class="card-body">
            <h2 class="card-title font-bold">Contents</h2>
            <ul class="space-y-2">
              <template v-for="(t, k) in toc" :key="`toc-item-${k}`">
                <li>
                  <button @click="scrollTo(t.id)" :class="{
                    'text-sm ml-4': t.depth == 2,
                    'text-[13px] ml-6': t.depth > 2,
                  }" class="capitalize">{{ t.title }}</button>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </article>
  </main>
</template>

<script setup>
const slug = useRoute().params.slug.toString().replace(/,/g, "/");
const { data: blog } = await useAsyncData(slug, () => {
  return queryContent(slug).findOne();
});

const tags = computed(() => {
  if (!blog.value) return [];
  const tags = blog.value.tag
  if (!tags) return [];
  return tags
})

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

const scrollTo = (id) => {
  window.scrollTo({
    behavior: 'smooth',
    top:
      document.getElementById(id).getBoundingClientRect().top -
      document.body.getBoundingClientRect().top -
      64,
  })
}

onMounted(() => {
  window.scrollTo(0, 0);
  useHead({
    title: blog.value.title + " | andyjjrt's blog",
    meta: {
      keywords: blog.value.tag,
      meta: [
        { name: 'keywords', content: blog.value.tag },
        { name: 'description', content: blog.value.description }
      ]
    }
  })
})

watch(blog, (val) => {
  useHead({
    title: val.title + " | andyjjrt's blog",
    meta: [
      { name: 'keywords', content: blog.value.tag },
      { name: 'description', content: blog.value.description }
    ]
  })
})
</script>

<style scoped>
.prose {
  @apply max-w-none;
}

.blog-link {
  @apply prose-a:text-primary before:prose-headings:content-['#'] before:prose-headings:mr-1 before:prose-headings:text-primary before:prose-h1:content-[''];
}
</style>