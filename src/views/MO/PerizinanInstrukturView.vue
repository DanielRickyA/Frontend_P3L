<style>
@import "datatables.net-dt";
/* @import 'datatables.net-bs5'; */
</style>

<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    
  >
    <h1 class="h2">Perizinan Instruktur</h1>
     <router-link
      :to="{ name: 'indexAllPerizinanView' }"
      class="btn btn-md"
      id="btn-create-member"
      >List Instruktur dikonfirm</router-link
    >
  </div>
  <div class="mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <div class="d-flex align-item-center justify-content-between mb-3">
              <h3 class="mb-0">History Aktivasi Transaksi</h3>
              <div class="d-flex">
                <input
                  type="search"
                  class="form-control"
                  placeholder="search"
                  v-model="search"
                />
              </div>
            </div>
            <EasyDataTable
              :items="perizinanInstrukturs"
              :headers="headers"
              :search-value="search"
              :search-field="['f_instruktur.nama']"
              table-class="table table-striped table-bordered mt4"
              :loading="loading"
            >
              <template #item-status="perizinanInstrukturs">
                <div v-if="perizinanInstrukturs.status == null">
                  <span class=" ">———————</span>
                </div>
              </template>

              <template #item-actions="perizinanInstrukturs">
                <button
                  class="btn btn-sm btn-success me-1"
                  @click="btnKonfirmasi(perizinanInstrukturs)"
                  data-bs-toggle="modal"
                  data-bs-target="#setAktifModal"
                >
                  <i class="fa-solid fa-check"> </i>
                </button>

                <button
                  class="btn btn-sm btn-danger me-1"
                  @click="btnKonfirmasi(perizinanInstrukturs)"
                  data-bs-toggle="modal"
                  data-bs-target="#setTolakIzin"
                >
                  <i class="fa-solid fa-x"></i>
                </button>
              </template>
            </EasyDataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  -->
  <!-- Konfirm Izin -->
  <div
    class="modal fade"
    id="setAktifModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <form @submit.prevent="konfirmIzin()" class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            Konfirmasi Ijin
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
  <!--  -->

    <!-- Tolak Izin -->
  <div
    class="modal fade"
    id="setTolakIzin"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <form @submit.prevent="tolakIzin()" class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            Konfirmasi Ijin
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
  <!--  -->

</template>

<script>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import * as Api from "../ApiHelper";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Vue3EasyDataTable from "vue3-easy-data-table";
import bootstrapMin from "bootstrap/dist/js/bootstrap.min";

import { useRouter } from "vue-router";

export default {
  components: {
    EasyDataTable: Vue3EasyDataTable,
  },
  setup() {
    let perizinanInstrukturs = ref([]);
    let perizinanInstruktur = reactive([
      {
        id: "",
        id_instruktur: "",
        tanggal_izin: "",
        tanggal_buat_izin: "",
        status: "",
        keterangan: "",
        f_instruktur: {
          id: "",
          nama: "",
        },
      },
    ]);
    let instrukturPenampung = reactive([
      {
        id: "",
        nama: "",
      },
    ]);
    const instruktur = ref([]);
    const loading = ref(false);

    let headers = ref([
      { text: "Nama Instruktur", value: "f_instruktur.nama", sortable: true },
      { text: "Instruktur Pengganti", value: "f_pengganti.nama", sortable: true },
      { text: "Tanggal Izin", value: "tanggal_izin", sortable: true },
      { text: "Tanggal_buat_izin", value: "tanggal_buat_izin", sortable: true },
      { text: "Status", value: "status", sortable: true },
      { text: "Keterangan", value: "keterangan", sortable: true },
      { text: "Actions", value: "actions" },
    ]);

    let search = ref("");

    function getPerizinan() {
      loading.value = true;
      axios
        .get(Api.BASE_URL + "/PerizinanInstruktur", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          loading.value = false;
          perizinanInstrukturs.value = response.data.data;

          console.log(response);
        })
        .catch((error) => {
          loading.value = false;
          console.log(error.response.data);
        });
    }

    function getInstruktur() {
      axios
        .get(Api.BASE_URL + "/Instruktur", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          instruktur.value = response.data.data;
          console.log(instruktur);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function btnKonfirmasi(objPerizinanInstruktur) {
      perizinanInstruktur.id = objPerizinanInstruktur.id;
    }

    function konfirmIzin() {
      axios.put(
        Api.BASE_URL + "/PerizinanInstrukturK/" + perizinanInstruktur.id,
        {
          id_instruktur: instrukturPenampung.id,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).then((response) => {
          console.log(response);
          toastr.success("Berhasil Konfirmasi Ijin");
          let modal = document.getElementById("setAktifModal");
          bootstrapMin.Modal.getInstance(modal).hide();
          getPerizinan();
        }).catch((error) => {
          console.log(error);
          toastr.error("Gagal Konfirmasi Ijin");
        });
    }

    function tolakIzin(){
      axios.put(
        Api.BASE_URL + "/PerizinanInstrukturT/" + perizinanInstruktur.id,
        {
           id_instruktur: instrukturPenampung.id,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).then((response) => {
          console.log(response);
          toastr.success("Ijin Ditolak");
          let modal = document.getElementById("setTolakIzin");
          bootstrapMin.Modal.getInstance(modal).hide();
          getPerizinan();
        }).catch((error) => {
          console.log(error);
          toastr.error("Gagal Konfirmasi Ijin");
        });
    }

    

    onMounted(() => {
      getPerizinan();
      getInstruktur();
    });

    return {
      perizinanInstrukturs,
      perizinanInstruktur,
      instrukturPenampung,
      instruktur,
      Api,
      toastr,
      search,
      headers,
      getPerizinan,
      getInstruktur,
      useRouter,
      btnKonfirmasi,
      konfirmIzin,
      tolakIzin,
      loading,
    };
  },
};
</script>

<style>
@import "vue3-easy-data-table/dist/style.css";

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
#tableMember td:first-child {
  white-space: nowrap;
  width: 200px;
}
</style>
