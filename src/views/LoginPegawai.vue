<template>
  <section class="background-radial-gradient overflow-hidden">
    <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
      <div class="row gx-lg-5 align-items-center mb-5">
        <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
          <h1 class="my-5 display-5 fw-bold ls-tight" style="color: hsl(218, 81%, 95%)">
            Gofit Indonesia<br />
            <span style="color: hsl(218, 81%, 75%)">Make Your Body Perfect</span>
          </h1>
          <p class="mb-4 opacity-70 justify-content-center" style="color: hsl(218, 81%, 85%); text-align: justify">
            Are you tired of feeling sluggish and out of shape? Do you want to
            improve your health and fitness level? Look no further than your
            local gym!
          </p>
          <p class="mb-4 opacity-70 " style="color: hsl(218, 81%, 85%); text-align: justify;">
            At the gym, you'll have access to state-of-the-art equipment and a
            variety of fitness classes to help you reach your fitness goals.
            Whether you're looking to build muscle, lose weight, or simply
            improve your overall health, our gym has everything you need to
            succeed. Our experienced and knowledgeable trainers are on hand to
            provide guidance and support every step of the way. They can help
            you develop a personalized workout plan that's tailored to your
            specific needs and goals, and they'll be there to encourage and
            motivate you to push yourself to new heights. And with a community
            of like-minded individuals, you'll have the support and
            encouragement you need to stay motivated and committed to your
            fitness journey. You'll make new friends, have fun, and most
            importantly, see results.
          </p>
        </div>

        <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
          <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>

          <div class="card bg-glass">
            <div class="card-body px-4 py-5 px-md-5">
              <form class="form" @submit.prevent="loginPegawai">
                <div>
                  <h4 class="mb-3 text-center">Login</h4>
                </div>

                <!-- <MDBRow tag="form" class="g-3">
                  <MDBInput label="Username" v-model="input1" />
                  <MDBInput label="Password input" type="password" />
                  <MDBInput inputGroup :formOutline="false" wrapperClass="mb-3" class="rounded" v-model="input12"
                    aria-describedby="search-addon" aria-label="Search" placeholder="Search"/>
                </MDBRow> -->

                <!-- Email input -->
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Nama Pegawai"
                    v-model="Pegawai.nama"
                  />
                  <label for="floatingInput">Nama Pegawai</label>
                </div>
                <div class="form-floating">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    v-model="Pegawai.password"
                  />
                  <label for="floatingPassword">Password</label>
                </div>

                <!-- <div class="form-outline" bis_skin_checked="1">
                  <input type="text" id="formControlLg" class="form-control form-control-lg">
                  <label class="form-label" for="formControlLg" style="margin-left: 0px;">Form control lg</label>
                  <div class="form-notch" bis_skin_checked="1">
                    <div class="form-notch-leading" style="width: 9px;" bis_skin_checked="1"></div>
                    <div class="form-notch-middle" style="width: 94.4px;" bis_skin_checked="1"></div>
                    <div class="form-notch-trailing" bis_skin_checked="1"></div>
                  </div>
                </div> -->

                <!-- Submit button -->
                <button type="submit" class="btn btn-primary btn-block mb-2 mt-3">
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import { MDBInput } from 'mdb-vue-ui-kit';
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import * as Api from "./ApiHelper";
// toastr
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
export default {
  setup() {
    const Pegawai = reactive({
      nama: "",
      password: "",
      role: "",
    });

    // components: {
    //   MDBInput
    // }

    const validation = ref([]);

    const router = useRouter();

    function loginPegawai() {
      axios
        .post(Api.BASE_URL + "/loginPegawai", {
          nama: Pegawai.nama,
          password: Pegawai.password,
        })
        .then((result) => {
          console.log(result);
          let token = result.data.access_token;
          localStorage.setItem("token", token);
          localStorage.setItem("role", result.data.user.role);
          if (result.data.user.role == "Admin") {
            toastr.success('Berhasil Login Admin')
            router.push({
              name: "indexInstrukturView",
            });
          } else if (result.data.user.role == "Kasir") {
            toastr.success('Berhasil Login Kasir')
            router.push({
              name: "indexMemberView",
            });
          } else if (result.data.user.role == "MO") {
            toastr.success('Berhasil Login MO')
            router.push({
              name: "indexJadwalView",
            });
          }
        })
        .catch((error) => {
          //assign state validation with error
          console.log(error.response);
          toastr.error(error.response.data.message)
          // validation.value = error.response.data.data;
        });
    }

    return {
      Pegawai,
      validation,
      router,
      loginPegawai,
      toastr,
    };
  },
};
</script>

<style>
section {
  width: 100%;
  min-height: 100vh;
}

.background-radial-gradient {
  background-color: hsl(218, 41%, 15%);
  background-image: radial-gradient(650px circle at 0% 0%,
      hsl(218, 41%, 35%) 15%,
      hsl(218, 41%, 30%) 35%,
      hsl(218, 41%, 20%) 75%,
      hsl(218, 41%, 19%) 80%,
      transparent 100%),
    radial-gradient(1250px circle at 100% 100%,
      hsl(218, 41%, 45%) 15%,
      hsl(218, 41%, 30%) 35%,
      hsl(218, 41%, 20%) 75%,
      hsl(218, 41%, 19%) 80%,
      transparent 100%);
}

#radius-shape-1 {
  height: 220px;
  width: 220px;
  top: -60px;
  left: -130px;
  background: radial-gradient(#44006b, #ad1fff);
  overflow: hidden;
}

#radius-shape-2 {
  border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
  bottom: -60px;
  right: -110px;
  width: 300px;
  height: 300px;
  background: radial-gradient(#44006b, #ad1fff);
  overflow: hidden;
}

.bg-glass {
  background-color: hsla(0, 11%, 95%, 0.9) !important;
  backdrop-filter: saturate(200%) blur(25px);
}
</style>
