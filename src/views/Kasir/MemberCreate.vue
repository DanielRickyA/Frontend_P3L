<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <router-link
      :to="{ name: 'indexMemberView' }"
      class="btn btn-md"
      id="btn-create-member"
      ><i class="fa-solid fa-arrow-left pe-2"></i>Back</router-link
    >
    <h1 class="h2">Create Member</h1>
  </div>
  <div class="mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h3 style="text-align: left">Input Member</h3>
            <form @submit.prevent="createMember" style="text-align: left">
              <div class="form-group mb-3">
                <label class="form-label" bis_skin_checked="1"
                  >Nama Member</label
                >
                <input
                  bis_skin_checked="1"
                  type="text"
                  class="form-control"
                  placeholder="Masukkan nama member"
                  v-model="member.nama"
                  required
                />
                <!-- validation -->
                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                  {{ validation.nama[0] }}
                </div>
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label">Tanggal Lahir</label>
                <input
                  class="form-control"
                  type="date"
                  v-model="member.tanggal_lahir"
                  placeholder="Masukkan nama manager"
                  required
                />
                <!-- validation -->
                <div
                  v-if="validation.tanggal_lahir"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.tanggal_lahir[0] }}
                </div>
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label">Alamat Member</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="member.alamat"
                  placeholder="Masukkan jumlah pegawai"
                  required
                />
                <!-- validation -->
                <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                  {{ validation.alamat[0] }}
                </div>
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label">Nomor Telepon</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="member.no_telp"
                  placeholder="Masukkan jumlah pegawai"
                  required
                />
                <!-- validation -->
                <div v-if="validation.no_telp" class="mt-2 alert alert-danger">
                  {{ validation.no_telp[0] }}
                </div>
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
    const member = reactive({
      nama: "",
      tanggal_lahir: "",
      alamat: "",
      no_telp: "",
    });

    let router = useRouter();
    let validation = ref({});

    function createMember() {
      const date = new Date(member.tanggal_lahir);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);

      let nama = member.nama;
      let tanggal_lahir = `${year}-${month}-${day}`;
      let alamat = member.alamat;
      let no_telp = member.no_telp;
      axios
        .post(
          Api.BASE_URL + "/Member",
          {
            nama: nama,
            tanggal_lahir: tanggal_lahir,
            alamat: alamat,
            no_telp: no_telp,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          toastr.success("Member berhasil ditambahkan");
          console.log(response);
          router.push({
            name: "indexMemberView",
          });
        })
        .catch((error) => {
          console.log(error);
          validation.value = error.response.data;
        });
    }

    return {
      member,
      Api,
      toastr,
      createMember,
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
