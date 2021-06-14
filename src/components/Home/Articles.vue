<template>
  <div class="articles">
    <div class="container">
      <div class="headline">
        <h2>Recommended Articles</h2>
        <router-link
          tag="button"
          class="btn btn--secondary"
          :to="{ name: 'Blogs' }"
          >See All</router-link
        >
      </div>
      <div class="article__grid">
        <Article v-for="(post, index) in blogPosts" :key="index" :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
import Article from "../../components/Home/Article.vue";

export default {
  name: "Articles",
  components: {
    Article,
  },
  computed: {
    blogPosts() {
      return this.$store.state.blogPosts.slice(0, 4);
    },
  },
};
</script>

<style lang="scss" scoped>
.article__grid {
  padding: 20px 0;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);

  & div:nth-child(1) {
    grid-column: 1 / 3;
    grid-row: 1 / 4;
  }

  & div:nth-child(2) {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
  }

  & div:nth-child(3) {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
  }

  & div:nth-child(4) {
    grid-column: 3 / 4;
    grid-row: 3 / 3;
  }

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
}
</style>
