import Vue from "vue";
import Vuex from "vuex";

import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    blogHTML: "Write your blog title here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUserName: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
    TOGGLE_EDIT_POST(state, payload) {
      state.editPost = payload;
    },
    UPDATE_USER(state, payload) {
      state.user = payload;
    },
    SET_PROFILE_ADMIN(state, payload) {
      state.profileAdmin = payload;
    },
    SET_PROFILE_INFO(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUserName = doc.data().userName;
    },
    SET_PROFILE_INITIALS(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
    CHANGE_FIRSTNAME(state, payload) {
      state.profileFirstName = payload;
    },
    CHANGE_LASTNAME(state, payload) {
      state.profileLastName = payload;
    },
    CHANGE_USERNAME(state, payload) {
      state.profileUserName = payload;
    },
  },
  actions: {
    async getCurrentUser({ commit }, user) {
      const dataBase = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid);

      const dbResults = await dataBase.get();
      commit("SET_PROFILE_INFO", dbResults);
      commit("SET_PROFILE_INITIALS");

      const token = await user.getIdTokenResult();
      const admin = await token.claims.admin;
      commit("SET_PROFILE_ADMIN", admin);
    },
    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection("users").doc(state.profileId);
      await dataBase.update({
        fistName: state.profileFirstName,
        lastName: state.profileLastName,
        userName: state.profileUserName,
      });
      // update the initials
      commit("SET_PROFILE_INITIALS");
    },
  },
  modules: {},
});
