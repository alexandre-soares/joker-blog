<template>
  <div class="app-wrapper">
    <div id="app" v-if="this.$store.state.postLoaded">
      <Navigation v-if="!navigation" />
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Layout/Navigation.vue";
import Footer from "./components/Layout/Footer.vue";

import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "app",
  components: {
    Navigation,
    Footer,
  },
  data() {
    return {
      navigation: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(async (user) => {
      this.$store.commit("UPDATE_USER", user);
      if (user) {
        this.$store.dispatch("getCurrentUser", user);
      }
    });
    this.checkRoute();
    this.$store.dispatch("getPosts");
  },
  methods: {
    checkRoute() {
      if (
        this.$route.name === "Login" ||
        this.$route.name === "Register" ||
        this.$route.name === "ForgotPassword"
      ) {
        this.navigation = true;
        return;
      }

      this.navigation = false;
    },
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.arrow {
  margin-bottom: -2px;
  margin-left: 8px;
  width: 12px;

  path {
    fill: #fff;
  }
}

.arrow-light {
  path {
    fill: #fff;
  }
}

// UTILITIES

.hide {
  visibility: hidden;
}

// IMG

img {
  width: 100%;
  height: 100%;
}

// HEADLINE

.headline {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    color: white;
    font-size: 30px;
    letter-spacing: 1px;
  }
}

// BUTTONS

.btn,
.router-button {
  position: relative;
  transition: all 500ms ease;
  cursor: pointer;
  padding: 12px 24px;
  color: #fff;
  margin: 0 10px;
  border-radius: 10px;
  border: none;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }

  &--primary {
    background: rgb(71, 92, 248);
    background: linear-gradient(
      90deg,
      rgba(71, 92, 248, 1) 0%,
      rgba(30, 68, 219, 1) 100%
    );
    z-index: 1;

    &::before {
      position: absolute;
      content: "";
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 10px;
      background: rgb(40, 57, 185);
      background: linear-gradient(
        90deg,
        rgb(49, 64, 173) 0%,
        rgb(15, 31, 97) 100%
      );
      z-index: -1;
      transition: opacity 0.5s linear;
      opacity: 0;
    }

    &:hover::before {
      opacity: 1;
    }
  }

  &--secondary {
    background-color: #444557;

    &:hover {
      background-color: #2f303b;
    }
  }
}

.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;

  @media (min-width: 700px) {
    margin-top: 0;
    margin-left: auto;
  }

  i {
    margin-left: 8px;
  }
}

.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.button-inactive {
  border: none;
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}

.blog-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;

  @media (min-width: 500px) {
    padding: 100px 16px;
  }

  .blog-cards {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;

    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

.error {
  text-align: center;
  font-size: 12px;
  color: red;
}

// BOOTSTRAP CONTAINER
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}
@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
.container-fluid,
.container-sm,
.container-md,
.container-lg,
.container-xl {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 576px) {
  .container,
  .container-sm {
    max-width: 540px;
  }
}
@media (min-width: 768px) {
  .container,
  .container-sm,
  .container-md {
    max-width: 720px;
  }
}
@media (min-width: 992px) {
  .container,
  .container-sm,
  .container-md,
  .container-lg {
    max-width: 960px;
  }
}
@media (min-width: 1200px) {
  .container,
  .container-sm,
  .container-md,
  .container-lg,
  .container-xl {
    max-width: 1140px;
  }
}
</style>
