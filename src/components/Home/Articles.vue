<template>
  <div class="articles">
    <div class="container">
      <div class="headline">
        <h2>Recommended Articles</h2>
        <button class="btn btn--secondary">See All</button>
      </div>
      <div class="article__grid">
        <div
          class="article"
          v-bind:style="{
            backgroundImage: `url('${mainArticle.background}')`,
          }"
        >
          <div class="article__info">
            <img
              class="article__img--icon"
              :src="mainArticle.icon"
              alt="game"
            />
            <div>
              <h3 class="article__title">
                {{ mainArticle.title }}
              </h3>
              <p class="article__paragraph">
                {{ mainArticle.paragraph }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="article"
          v-for="(article, index) in otherArticles"
          :key="index"
          v-bind:style="{
            'background-image': article.background,
          }"
        >
          <div class="article__info">
            <img class="article__img--icon" :src="article.icon" alt="game" />
            <div>
              <h3 class="article__title">
                {{ article.title }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Articles",
  data() {
    return {
      mainArticle: {
        title: "Why Super Mario Odyssey Controls are so good?",
        background: '../../assets/imgs/wallpapers/odyssey.png',
        icon: require("../../assets/imgs/current-games/mario odyssey.jpeg"),
        paragraph: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Tenetur magnam hic sit quisquam eius nemo molestias sequi
                possimus quis ad ipsa praesentium sed soluta error assumenda
                perferendis ducimus, adipisci minus.`,
      },
      otherArticles: [
        {
          title: "Are open worlds a good thing?",
          background: require("../../assets/imgs/wallpapers/botw.jpeg"),
          icon: require("../../assets/imgs/current-games/botw.jpeg"),
        },
        {
          title: "Why I felt Monster Hunter Rise (a little bit) disappointing",
          background: require("../../assets/imgs/wallpapers/mh rise.jpeg"),
          icon: require("../../assets/imgs/current-games/mh rise.jpeg"),
        },
      ],
    };
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
  cursor: pointer;
  transition: all 200ms ease-in;

  &:hover {
    background-size: 105%;
  }

  &__grid {
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
  }

  &__info {
    margin-top: auto;
    display: flex;
    align-items: flex-end;
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
    color: rgb(139, 139, 139);
    font-size: 14px;
    margin-bottom: 10px;
  }
}
</style>
