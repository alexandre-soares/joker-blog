<template>
  <router-link
    tag="div"
    class="article"
    :to="{ name: 'ViewBlog', params: { blogid: this.post.blogID } }"
    v-bind:style="{
      'background-image': 'url(' + post.blogCoverPhoto + ')',
    }"
  >
    <div class="article__info">
      <img class="article__img--icon" :src="post.blogIcon" alt="game" />
      <div>
        <h3 class="article__title">
          {{ post.blogTitle }}
        </h3>
        <p class="article__paragraph" v-html="post.blogHTML"></p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "Articles",
  props: {
    post: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.article {
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-size: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: all 200ms ease-in;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 9;
    background: #14112e4d;
  }

  &:hover {
    background-size: 105%;
  }

  &__info {
    margin-top: auto;
    display: flex;
    align-items: flex-end;
    width: 100%;
    z-index: 999;
  }

  &__img--icon {
    object-fit: cover;
    width: 100px;
    height: 130px;
    margin-right: 10px;
    border-radius: 10px 10px 0 10px;
  }

  &__title {
    color: #fff;
    font-size: 16px;
    margin-bottom: 10px;
  }

  &__paragraph {
    color: rgb(216, 216, 216);
    font-size: 14px;
    margin-bottom: 10px;
  }
}
</style>
