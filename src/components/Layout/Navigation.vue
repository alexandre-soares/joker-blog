<template>
  <div class="container-fluid">
    <div class="nav">
      <router-link class="nav__logo-container" :to="{ name: 'Home' }">
        <Logo class="nav__logo"
      /></router-link>
      <ul class="nav__items" v-show="!mobile">
        <router-link tag="li" class="link" :to="{ name: 'Home' }"
          >Home</router-link
        >
        <router-link tag="li" class="link" :to="{ name: 'Blogs' }"
          >Blogs</router-link
        >
        <router-link
          v-if="admin"
          tag="li"
          class="link"
          :to="{ name: 'CreatePost' }"
          >Create Post</router-link
        >
      </ul>
      <div class="nav__actions">
        <router-link v-if="!user" :to="{ name: 'Login' }"
          ><button class="btn btn--secondary">Log In</button></router-link
        >
        <router-link v-if="!user" :to="{ name: 'Register' }"
          ><button class="btn btn--primary">Sign Up</button></router-link
        >
      </div>
      <div v-if="user" class="profile" ref="profile">
        <span @click="toggleProfileMenu">{{
          this.$store.state.profileInitials
        }}</span>
        <div class="profile-menu" v-show="profileMenu">
          <div class="info">
            <p class="initials">{{ this.$store.state.profileInitials }}</p>
            <div class="right">
              <p>
                {{ this.$store.state.profileFirstName }}
                {{ this.$store.state.profileLastName }}
              </p>
              <p>{{ this.$store.state.profileUserName }}</p>
              <p>{{ this.$store.state.profileEmail }}</p>
            </div>
          </div>
          <div class="options" @click="toggleProfileMenu">
            <div class="option">
              <router-link
                @click="toggleProfileMenu"
                :to="{ name: 'Profile' }"
                class="option"
              >
                <UserIcon class="icon" />
                <p>Profile</p>
              </router-link>
            </div>
            <div v-if="admin" class="option">
              <router-link :to="{ name: 'Admin' }" class="option">
                <AdminIcon class="icon" />
                <p>Admin</p>
              </router-link>
            </div>
            <div @click="signOut" class="option">
              <SignOutIcon class="icon" />
              <p>Sign Out</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MenuIcon
      class="menu-icon menu-icon--burger"
      @click="toggleMobileNav"
      v-show="mobile"
    />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav" @click="toggleMobileNav">
        <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
        <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
        <router-link class="link" v-if="admin" :to="{ name: 'CreatePost' }"
          >Create Post</router-link
        >
        <router-link class="link" v-if="!user" :to="{ name: 'Login' }"
          >Login/Register</router-link
        >
      </ul>
    </transition>
  </div>
</template>

<script>
import Logo from "@/assets/Icons/logo.svg";
import MenuIcon from "@/assets/Icons/bars-regular.svg";
import UserIcon from "@/assets/Icons/user-alt-light.svg";
import AdminIcon from "@/assets/Icons/user-crown-light.svg";
import SignOutIcon from "@/assets/Icons/sign-out-alt-regular.svg";

import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Navigation",
  components: {
    MenuIcon,
    UserIcon,
    AdminIcon,
    SignOutIcon,
    Logo,
  },
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      profileMenu: null,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreenSize);
    this.checkScreenSize();
  },
  methods: {
    checkScreenSize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    toggleProfileMenu() {
      this.profileMenu = !this.profileMenu;
    },
    signOut() {
      firebase.auth().signOut();
      window.location.reload();
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    admin() {
      return this.$store.state.profileAdmin;
    },
  },
};
</script>

<style lang="scss" scoped>
.container-fluid {
  background-color: #14112e;
}

.nav {
  display: flex;
  align-items: center;
  padding: 20px 30px;

  @media (max-width: 800px) {
    padding: 20px 15px;
  }

  &__logo-container {
    width: 60px;
    height: 60px;

    & svg {
      width: 100%;
      height: 100%;
    }
  }

  &__items {
    display: flex;
    list-style-type: none;
    margin: 0 auto 0 20px;

    & li {
      margin: 0 10px;
      color: white;
    }
  }

  &__actions {
    @media (max-width: 800px) {
      display: none;
    }
  }
}

.profile {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: auto;
  margin-right: 20px;
  border-radius: 50%;
  color: #fff;
  background-color: #303030;

  .profile-menu {
    z-index: 999;
    position: absolute;
    top: 65px;
    right: 0;
    width: 300px;
    background-color: #303030;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    .info {
      display: flex;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #fff;

      .initials {
        position: initial;
        width: 40px;
        height: 40px;
        background-color: #fff;
        color: #303030;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .right {
        flex: 1;
        margin-left: 24px;

        p:nth-child(1) {
          font-size: 14px;
        }

        p:nth-child(2),
        p:nth-child(3) {
          font-size: 12px;
        }
      }
    }

    .options {
      padding: 15px;

      .option {
        text-decoration: none;
        color: #fff;
        display: flex;
        align-items: center;
        margin-bottom: 12px;

        .icon {
          width: 18px;
          height: auto;
        }

        p {
          font-size: 14px;
          margin-left: 12px;
        }

        &:last-child {
          margin-bottom: 0px;
        }
      }
    }
  }
}

.menu-icon {
  cursor: pointer;
  position: absolute;
  top: 37px;
  right: 25px;
  height: 25px;
  width: auto;

  &--burger {
    & path {
      fill: #fff;
    }
  }
}

.mobile-nav {
  padding: 20px;
  width: 70%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  background-color: #303030;
  top: 0;
  left: 0;
  z-index: 999;

  .link {
    padding: 15px 0;
    color: #fff;
  }
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 1s ease;
}

.mobile-nav-enter {
  transform: translateX(-250px);
}

.mobile-nav-enter-to {
  transform: translateX(0);
}

.mobile-nav-leave-to {
  transform: translateX(-250px);
}
</style>
