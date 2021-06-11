<template>
  <div class="currently-playing">
    <div class="container">
      <div class="headline">
        <h2>Currently Playing Games</h2>
        <button class="btn btn--secondary">See All</button>
      </div>
      <div class="cards">
        <div class="card" v-for="(game, index) in currentGames" :key="index">
          <div class="card__img-container">
            <img :src="game.img" alt="game" />
          </div>
          <span class="card__title">{{ game.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Currently Playing",
  data() {
    return {
      currentGames: [
        {
          name: "Zelda - Breath of the Wild",
          img: require("../../assets/imgs/current-games/botw.jpeg"),
        },
        {
          name: "Persona 5 Royal",
          img: require("../../assets/imgs/current-games/persona 5 royal.jpeg"),
        },
        {
          name: "Bloodborne",
          img: require("../../assets/imgs/current-games/bloodborne.jpeg"),
        },
        {
          name: "Monster Hunter Rise",
          img: require("../../assets/imgs/current-games/mh-rise.jpeg"),
        },
        {
          name: "Super Mario Odyssey",
          img: require("../../assets/imgs/current-games/mario odyssey.jpeg"),
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.currently-playing {
  padding: 40px 0;
}

.cards {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
  width: 100%;
  overflow: scroll;
}

.card {
  display: flex;
  flex-direction: column;
  margin: 0 5px;
  text-align: center;

  &__img-container {
    border-radius: 10px;
    overflow: hidden;
    height: 250px;
    width: 214px;
   
    & img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  &__title {
    text-align: center;
    color: white;
    font-size: 16px;
    margin-top: 20px;
  }
}
</style>
