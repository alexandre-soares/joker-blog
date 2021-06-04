<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen" />
    <BlogPost
      v-for="(post, index) in blogPostsFeed"
      :key="index"
      :post="post"
    />

    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard
            v-for="(post, index) in blogPostsCards"
            :key="index"
            :post="post"
          />
        </div>
      </div>
    </div>

    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Never miss a psot. Register for your free account today!</h2>
        <router-link class="router-button" to="#"
          >Register for Joker's Blog <Arrow class="arrow arrow-light"
        /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Arrow from "@/assets/Icons/arrow-right-light.svg";
import BlogCard from "../components/BlogCard.vue";
import BlogPost from "../components/BlogPost.vue";
export default {
  name: "Home",
  components: { BlogPost, BlogCard, Arrow },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogPost:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ligula massa, volutpat ac pulvinar et, convallis et ex. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc ullamcorper quis enim sit amet bibendum. Aenean aliquam odio non quam aliquam pretium. Etiam tempor venenatis ullamcorper. Donec quis molestie neque. Aenean convallis lorem nec sem efficitur aliquet maximus eget quam. Morbi eros quam, semper ut dui nec, viverra facilisis nisi.",
        welcomeScreen: true,
        photo: "coding",
      },
    };
  },
  computed: {
    blogPostsCards() {
      return this.$store.getters.blogPostsCards;
    },
    blogPostsFeed() {
      return this.$store.getters.blogPostsFeed;
    },
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;

      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;

      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
