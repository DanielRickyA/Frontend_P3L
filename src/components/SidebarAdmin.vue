<template>
  <div class="wrapper d-flex align-items-stretch">
    <nav id="sidebar" ref="sidebar" style="height: auto">
      <div class="custom-menu">
        <button
          type="button"
          id="sidebarCollapse"
          class="btn btn-primary"
          @click="toggleSidebar"
        >
          <i class="fa fa-bars"></i>
          <span class="sr-only">Toggle Menu</span>
        </button>
      </div>
      <div class="p-4">
        <h1>
          <router-link :to="{ name: 'indexInstrukturView' }" class="logo"
            >GOFIT <span>Atma Agency</span></router-link
          >
        </h1>
        <ul class="list-unstyled components mb-5">
          <li class="active">
            <router-link :to="{ name: 'indexInstrukturView' }"
              ><span class="fa-solid fa-person mr-3"></span> Instruktur
            </router-link>
          </li>
          <li>
            <a href="#"><span class="fa fa-home mr-3"></span> About</a>
          </li>
          <li>
            <a href="#"><span class="fa fa-briefcase mr-3"></span> Works</a>
          </li>
          <li>
            <a href="#"><span class="fa fa-sticky-note mr-3"></span> Blog</a>
          </li>
          <li>
            <a href="#"><span class="fa fa-suitcase mr-3"></span> Gallery</a>
          </li>
          <li>
            <a href="#"><span class="fa fa-cogs mr-3"></span> Services</a>
          </li>
          <li>
            <a href="#"
              ><span class="fa fa-paper-plane mr-3"></span> Contacts</a
            >
          </li>
        </ul>

          <form action="#" class="subscribe-form" @submit.prevent="logout">
            <div class="form-group d-flex justify-content-center">
              <!-- <RouterLink :to="{ name: 'Login' }"> -->
                <button
                  type="text"
                  id="btnLogout"
                  class="form-control btn btn-lg w-100"
                  placeholder="Logout"
                >
                  Logout <i class="fa-solid fa-right-from-bracket"></i>
              </button>
              <!-- </RouterLink> -->
            </div>
          </form>
        <div class="footer">
          <!-- <p>
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="icon-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib.com</a>
</p> -->
        </div>
      </div>
    </nav>

    <div id="content" class="p-4 p-md-5 pt-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: poppins, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.8;
  font-weight: 400;
  background: #fafafa;
  color: gray;
}

a {
  -webkit-transition: 0.3s all ease;
  -o-transition: 0.3s all ease;
  transition: 0.3s all ease;
  color: #3445b4;
}

a:hover,
a:focus {
  text-decoration: none !important;
  outline: none !important;
  -webkit-box-shadow: none;
  box-shadow: none;
}

button {
  -webkit-transition: 0.3s all ease;
  -o-transition: 0.3s all ease;
  transition: 0.3s all ease;
}

button:hover,
button:focus {
  text-decoration: none !important;
  outline: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}

h1,
h2,
h3,
h4,
h5,
.h1,
.h2,
.h3,
.h4,
.h5 {
  line-height: 1.5;
  font-weight: 400;
  font-family: poppins, Arial, sans-serif;
  color: #000;
}

.ftco-section {
  padding: 7em 0;
}

.ftco-no-pt {
  padding-top: 0;
}

.ftco-no-pb {
  padding-bottom: 0;
}

.heading-section {
  font-size: 28px;
  color: #000;
}

.heading-section small {
  font-size: 18px;
}

.img {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.wrapper {
  width: 100%;
}

#sidebar {
  min-width: 270px;
  max-width: 270px;
  background: radial-gradient(
      650px circle at 0% 0%,
      hsl(218, 41%, 35%) 15%,
      hsl(218, 41%, 30%) 35%,
      hsl(218, 41%, 20%) 75%,
      hsl(218, 41%, 19%) 80%,
      transparent 100%
    ),
    radial-gradient(
      1250px circle at 100% 100%,
      hsl(218, 41%, 45%) 15%,
      hsl(218, 41%, 30%) 35%,
      hsl(218, 41%, 20%) 75%,
      hsl(218, 41%, 19%) 80%,
      transparent 100%
    );
  color: #fff;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  position: relative;
}

#sidebar .h6 {
  color: #fff;
}

#sidebar.active {
  margin-left: -270px;
}

#sidebar h1 {
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 30px;
}

#sidebar h1 .logo {
  color: #fff;
}

#sidebar h1 .logo span {
  font-size: 14px;
  color: #44bef1;
  display: block;
}

#sidebar ul.components {
  padding: 0;
}

#sidebar ul li {
  font-size: 16px;
}

#sidebar ul li > ul {
  margin-left: 10px;
}

#sidebar ul li > ul li {
  font-size: 14px;
}

#sidebar ul li a {
  padding: 10px 0;
  display: block;
  color: rgba(255, 255, 255, 0.6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

#sidebar ul li a span {
  color: #44bef1;
}

#sidebar ul li a:hover {
  color: #fff;
}

#sidebar ul li.active > a {
  background: 0 0;
  color: #fff;
}

@media (max-width: 991.98px) {
  #sidebar {
    margin-left: -270px;
  }

  #sidebar.active {
    margin-left: 0;
  }
}

#sidebar .custom-menu {
  display: inline-block;
  position: absolute;
  top: 20px;
  right: 0;
  margin-right: -20px;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}

@media (prefers-reduced-motion: reduce) {
  #sidebar .custom-menu {
    -webkit-transition: none;
    -o-transition: none;
    transition: none;
  }
}

#sidebar .custom-menu .btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: relative;
}

#sidebar .custom-menu .btn i {
  margin-right: -40px;
  font-size: 14px;
}

#sidebar .custom-menu .btn.btn-primary {
  background: 0 0;
  border-color: transparent;
}

#sidebar .custom-menu .btn.btn-primary:after {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  content: "";
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  background: hsl(218, 41%, 30%) 35%;
  border-radius: 10px;
}

#sidebar .custom-menu .btn.btn-primary:hover,
#sidebar .custom-menu .btn.btn-primary:focus {
  background: 0 0 !important;
  border-color: transparent !important;
}

a[data-toggle="collapse"] {
  position: relative;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

@media (max-width: 991.98px) {
  #sidebarCollapse span {
    display: none;
  }
}

#content {
  width: 100%;
  padding: 0;
  min-height: 100vh;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.btn.btn-primary {
  background: #3445b4;
  border-color: #3445b4;
}

.btn.btn-primary:hover,
.btn.btn-primary:focus {
  background: #3445b4 !important;
  border-color: #3445b4 !important;
}

.footer p {
  color: rgba(255, 255, 255, 0.5);
}

.form-control {
  height: 40px !important;
  background: #fff;
  color: #000;
  font-size: 13px;
  border-radius: 4px;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  border: transparent;
}

.form-control:focus,
.form-control:active {
  border-color: #000;
}

.form-control::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.form-control::-moz-placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.form-control:-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.form-control:-moz-placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.subscribe-form .form-control {
  background: #3d5283;
}

#btnLogout{
  width: auto;
}
</style>

<script>
import { RouterLink } from "vue-router";
import axios from "axios";
import * as Api from "../views/ApiHelper";

export default {
  methods: {
    toggleSidebar() {
      this.$refs.sidebar.classList.toggle("active");
    },
    logout() {
      axios
        .post(
          Api.BASE_URL + "/LogoutPegawai",
          {},
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          console.log("logout");
          localStorage.removeItem("token");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: { RouterLink },
};
</script>
