<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" />
    <BlogPost
      v-for="(post, index) in sampleBlogPost"
      :key="index"
      :post="post"
    />

    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard v-for="(post, index) in sampleBlogCards" :key="index" :post="post" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogCard from "../components/BlogCard.vue";
import BlogPost from "../components/BlogPost.vue";
export default {
  name: "Home",
  components: { BlogPost, BlogCard },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogPost:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ligula massa, volutpat ac pulvinar et, convallis et ex. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc ullamcorper quis enim sit amet bibendum. Aenean aliquam odio non quam aliquam pretium. Etiam tempor venenatis ullamcorper. Donec quis molestie neque. Aenean convallis lorem nec sem efficitur aliquet maximus eget quam. Morbi eros quam, semper ut dui nec, viverra facilisis nisi.",
        welcomeScreen: true,
        photo: "coding",
      },
      sampleBlogPost: [
        {
          title: "this is a filler title",
          blogHTML: "hello oejgdhvspogjsligkjhvnakjbkv",
          blogCoverPhoto: "beautiful-stories",
        },
        {
          title: "this is a filler title 22",
          blogHTML: "hello oejgdhvspogjsligkjhvnakjbkv",
          blogCoverPhoto: "designed-for-everyone",
        },
      ],
      sampleBlogCards: [
        {
          blogTitle: "hello boy",
          blogCoverPhoto: "stock-1",
          blogDate: "May 1, 2021",
        },
        {
          blogTitle: "hello boy",
          blogCoverPhoto: "stock-2",
          blogDate: "May 1, 2021",
        },
        {
          blogTitle: "hello boy",
          blogCoverPhoto: "stock-3",
          blogDate: "May 1, 2021",
        },
        {
          blogTitle: "hello boy",
          blogCoverPhoto: "stock-4",
          blogDate: "May 1, 2021",
        },
      ],
    };
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
</style>
