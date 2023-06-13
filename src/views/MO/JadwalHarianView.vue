<style>
@import "datatables.net-dt";
/* @import 'datatables.net-bs5'; */
</style>

<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">Jadwal Harian</h1>
    <form @submit.prevent="generateJadwal()">
        <Button class="btn btn-sm btn-primary" type="submit">
            <i class="fa-solid fa-calendar"></i>
            Generate Jadwal 
        </Button>
    </form>
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
              :items="jadwalHarians"
              :headers="headers"
              :search-value="search"
              :search-field="['f_jadwal_umum.id_kelas', 'f_instruktur.nama', 'f_jadwal_umum.f_kelas.nama', 'f_jadwal_umum.jam_kelas', 'tanggal_jadwal_harian', 'f_jadwal_umum.hari_kelas']"
              table-class="table table-striped table-bordered mt4"
              :loading="loading"
            >
            
              
            </EasyDataTable>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import * as Api from "../ApiHelper";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Vue3EasyDataTable from "vue3-easy-data-table";



import { useRouter } from 'vue-router'

export default {

  components: {
    EasyDataTable: Vue3EasyDataTable,
  },
  setup() {
    let jadwalHarians = ref([]);
    let jadwalHarian = reactive({
      id: "",
      tanggal_jadwal_harian: "",
      id_kelas: "",
      id_member: "",
      tanggal_transaksi: "",
      jenis_pembayaran: "",
    });
    const loading = ref(false);
    let headers = ref([
      { text: "Tanggal Jadwal Harian", value: "tanggal_jadwal_harian", sortable: true },
      { text: "Nama Kelas", value: "f_jadwal_umum.f_kelas.nama", sortable: true },
      { text: "Nama Instruktur", value: "f_instruktur.nama", sortable: true },
      { text: "Hari Kelas", value: "f_jadwal_umum.hari_kelas", sortable: true },
      { text: "Jam_kelas", value: "f_jadwal_umum.jam_kelas", sortable: true },
    ]);

    let search = ref("");
    const router = useRouter();
    function GetJadwalH() {
      loading.value = true;
      axios
        .get(Api.BASE_URL + "/JadwalHarian", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          loading.value = false;
          jadwalHarians.value = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          loading.value = false;
          console.log(error.response.data);
        });
    }

    function generateJadwal(){
        axios.post(Api.BASE_URL + '/JadwalHarian', {}, {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then((response) => {
            toastr.success(response.data.message);
            GetJadwalH();
        }).catch((error) => {
            toastr.error(error.response.data.message);
        })
    }

    onMounted(() => {
      GetJadwalH();
    });

    function cetakStruk(id) {
      router.push({
        name: "StrukTransaksiView",
        params: {
          id: id,
          strukType: 1,
        },
      });
    }

    return {
      jadwalHarians,
      jadwalHarian,
      Api,
      toastr,
      search,
      headers,
      cetakStruk,
      GetJadwalH,
      generateJadwal,
      useRouter,
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
