<template>
  <div class="new-homepage">
    <Hero />
    <Currently-playing />
    <Articles />
  </div>
</template>

<script>
import Articles from '../components/Home/Articles.vue';
import CurrentlyPlaying from "../components/Home/CurrentlyPlaying.vue";
import Hero from "../components/Home/Hero.vue";
export default {
  name: "New Homepage",
  components: { Hero, CurrentlyPlaying, Articles },
};
</script>

<style>
.new-homepage {
  background: #14112ee3;
}
</style>
