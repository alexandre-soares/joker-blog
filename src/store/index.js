import Vue from "vue";
import Vuex from "vuex";

import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blogPosts: [],
    postLoaded: [],
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
  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0, 2);
    },
    blogPostsCards(state) {
      return state.blogPosts.slice(2, 6);
    },
  },
  mutations: {
    NEW_BLOG_POST(state, payload) {
      state.blogHTML = payload;
    },
    UPDATE_BLOG_TITLE(state, payload) {
      state.blogTitle = payload;
    },
    FILENAME_CHANGE(state, payload) {
      state.blogPhotoName = payload;
    },
    CREATE_FILE_URL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    OPEN_PHOTO_PREVIEW(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    TOGGLE_EDIT_POST(state, payload) {
      state.editPost = payload;
    },
    FILTER_BLOG_POST(state, payload) {
      state.blogPosts = state.blogPosts.filter(
        (post) => post.blogID !== payload
      );
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
    SET_BLOG_STATE(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogHTML = payload.blogHTML;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
      state.blogPhotoName = payload.blogCoverPhotoName;
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
    async getPosts({ state }) {
      const dataBase = await db.collection("blogPosts").orderBy("date", "desc");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        // check if post doesn't exist
        if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,
          };

          state.blogPosts.push(data);
        }
      });

      state.postLoaded = true;
    },
    async updatePost({ commit, dispatch }, payload) {
      commit("FILTER_BLOG_POST", payload);
      await dispatch('getPosts')
    },
    async deletePost({ commit }, payload) {
      const getPost = await db.collection("blogPosts").doc(payload);
      await getPost.delete();
      commit("FILTER_BLOG_POST", payload);
    },
  },
  modules: {},
});
