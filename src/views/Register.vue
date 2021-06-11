<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }"
          >Login</router-link
        >
      </p>
      <h2>Create your Joker's Blog Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" v-model="firstName" placeholder="First Name*" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" v-model="lastName" placeholder="Last Name*" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" v-model="userName" placeholder="UserName*" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" v-model="email" placeholder="Email*" />
          <Email class="icon" />
        </div>
        <div class="input">
          <input type="password" v-model="password" placeholder="Password*" />
          <Password class="icon" />
        </div>
        <div class="error" v-show="error">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent="register" class="btn btn--primary">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import Email from "@/assets/Icons/envelope-regular.svg";
import Password from "@/assets/Icons/lock-alt-solid.svg";
import User from "@/assets/Icons/user-alt-light.svg";

import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

export default {
  name: "Register",
  components: {
    Email,
    Password,
    User,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      error: null,
      errorMsg: "",
    };
  },
  methods: {
    async register() {
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.userName !== ""
      ) {
        this.error = false;
        this.errorMsg = "";

        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );

        const result = await createUser;
        const dataBase = db.collection("users").doc(result.user.uid);

        await dataBase.set({
          firstName: this.firstName,
          lastName: this.lastName,
          userName: this.userName,
          email: this.email,
        });

        // push the user to homepage
        this.$router.push({ name: "Home" });
        return;
      }

      this.error = true;
      this.errorMsg = "Please fill out all the fields!";
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
