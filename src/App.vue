<template>
  <div id="app">
    <!-- <router-link :to="{name: 'Login'}">Login</router-link> -->
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase';
import Navbar from '@/components/Navbar'
import Login from '@/components/Login'
import NotesPanel from '@/components/NotesPanel'

export default {
  name: 'App',
  components: {
    Login,
    Navbar
  }
}
</script>

<style>
body {
  background: #F6F8F9;
}
.at-menu--inline {
  border: 1px solid #ECECEC;
}
.at-dropdown__popover {
  text-align: center;
}
#app {
  width: 900px;
  margin: 60px auto;
  /* text-align: center; */
}
.logo {
  width: 100px;
  margin: 0 auto;
}
.login .at-btn__text, .login .at-btn__icon, .login .at-btn__loading {
    font-size: 18px !important;
}
.login .at-btn__icon, .login .at-btn__loading {
    padding-right: 10px !important;
}
.at-input__original {border-color: #ccc !important;}
.at-card__head {border-bottom: none !important;}
.ql-snow .ql-toolbar button svg, .quillWrapper .ql-snow.ql-toolbar button svg, .ql-picker.ql-color-picker svg {width: 16px !important;}
.quillWrapper .ql-picker-label {font-size: 13px !important;}
</style>
