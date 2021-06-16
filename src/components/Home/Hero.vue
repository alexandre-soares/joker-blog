<template>
  <div class="hero">
    <div class="container">
      <span class="hero__slogan">Discover Games you will love</span>
      <h1 class="hero__title">
        Welcome to Requiem's <br />
        Streaming Blog
      </h1>
      <div class="hero__img-container">
        <img class="hero__img" src="../../assets/imgs/hero img.png" alt="img" />
      </div>
      <router-link
        tag="button"
        :to="{ name: 'Blogs' }"
        class="btn btn--primary"
      >
        Start Exploring <Arrow class="arrow" />
      </router-link>
    </div>
  </div>
</template>

<script>
import Arrow from "@/assets/Icons/arrow-right-light.svg";

export default {
  name: "Hero",
  components: {
    Arrow,
  },
};
</script>

<style lang="scss" scoped>
.hero {
  width: 100%;
  height: 90vh;
  position: relative;
  background: url("../../assets/backgrounds/hero.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    background: #14112ebd;
    box-shadow: inset 90px 70px 200px #14112e, inset -90px -70px 200px #14112e;
  }

  & .container {
    z-index: 2;
    position: relative;
  }

  &__slogan {
    color: rgb(71, 92, 248);
    font-size: 20px;
    font-weight: 600;
    z-index: 2;

      @media (max-width: 800px) {
      font-size: 15px;
    }
  }

  &__title {
    color: white;
    z-index: 5;
    margin: 30px 0 50px;
    font-size: 60px;

    @media (max-width: 800px) {
      font-size: 40px;
    }
  }

  &__img-container {
    height: 300px;
    width: 230px;
    z-index: 2;

    position: absolute;
    top: 50%;
    right: 10%;
    transform: translate(-50%, -50%);

    @media (max-width: 800px) {
      display: none;
    }

    & img {
      z-index: 2;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  & .btn--primary {
    z-index: 2;

    @media (max-width: 800px) {
      text-align: center;
      display: block;
      margin: 0 auto;
      width: 70%;
    }
  }
}
</style>
