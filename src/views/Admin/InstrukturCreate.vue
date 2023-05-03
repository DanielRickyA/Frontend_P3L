<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <router-link
      :to="{ name: 'indexInstrukturView' }"
      class="btn btn-md"
      id="btn-create-member"
      ><i class="fa-solid fa-arrow-left pe-2"></i>Back</router-link
    >
    <h1 class="h2">Create Instruktur</h1>
  </div>
  <div class="mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h3 style="text-align: left">Input Instruktur</h3>
            <form @submit.prevent="createInstruktur" style="text-align: left">
              <div class="form-group mb-3">
                <label class="form-label" 
                  >Nama Instruktur</label
                >
                <input
                  
                  type="text"
                  class="form-control"
                  placeholder="Masukkan nama Instruktur"
                  v-model="instruktur.nama"
                  required
                />
                <!-- validation -->
                <!-- <div v-if="validation.nama" class="mt-2 alert alert-danger">
                  {{ validation.nama[0] }}
                </div> -->
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label">Email Instruktur</label>
                <input
                  class="form-control"
                  type="email"
                  v-model="instruktur.email"
                  placeholder="Masukkan Email Instruktur"
                  required
                />
                <!-- validation -->
                <!-- <div
                  v-if="validation.tanggal_lahir"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.tanggal_lahir[0] }}
                </div> -->
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label">Alamat Instruktur</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="instruktur.alamat"
                  placeholder="Masukkan Alamat Instruktur"
                  required
                />
                <!-- validation -->
                <!-- <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                  {{ validation.alamat[0] }}
                </div> -->
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Tanggal Lahir</label>
                <input
                  class="form-control"
                  type="date"
                  v-model="instruktur.tanggal_lahir"
                  required
                />
                <!-- validation -->
                <!-- <div v-if="validation.no_telp" class="mt-2 alert alert-danger">
                  {{ validation.no_telp[0] }}
                </div> -->
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Nomor Telepon</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="instruktur.no_telp"
                  placeholder="Masukkan jumlah pegawai"
                  required
                />
                <!-- validation -->
                <!-- <div v-if="validation.no_telp" class="mt-2 alert alert-danger">
                  {{ validation.no_telp[0] }}
                </div> -->
              </div>

               <div class="form-group mb-3">
                <label for="content" class="form-label">Pasword</label>
                <input
                  class="form-control"
                  type="password"
                  v-model="instruktur.password"
                  placeholder="Masukkan Password"
                  required
                />
                <!-- validation -->
                <!-- <div v-if="validation.no_telp" class="mt-2 alert alert-danger">
                  {{ validation.no_telp[0] }}
                </div> -->
              </div>
              
              <button type="submit" class="btn btn-primary">SIMPAN</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive, ref } from "vue";
import * as Api from "../ApiHelper";
import { useRouter } from "vue-router";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

export default {
  setup() {
    const instruktur = reactive({
      nama: "",
      email: "",
      alamat: "",
      tanggal_lahir: "",
      no_telp: "",
      password: "",
    });

    let router = useRouter();
    let validation = ref({});

    function createInstruktur() {

      let nama = instruktur.nama;
      let email = instruktur.email;
      let alamat = instruktur.alamat;
      let tanggal_lahir = instruktur.tanggal_lahir;
      let no_telp = instruktur.no_telp;
      let password = instruktur.password;
      axios
        .post(
          Api.BASE_URL + "/Instruktur",
          {
            nama: nama,
            email: email,
            tanggal_lahir: tanggal_lahir,
            alamat: alamat,
            no_telp: no_telp,
            password: password,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response);
          router.push({
            name: "indexInstrukturView",
          });
        })
        .catch((error) => {
          console.log(error);
          validation.value = error.response.data;
        });
    }

    return {
      instruktur,
      Api,
      toastr,
      createInstruktur,
      validation,
    };
  },
};
</script>

<style>
#btn-create-member {
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
}



.form-label {
  color: black;
  font-weight: medium;
}
</style>
