<style>
@import "datatables.net-dt";
/* @import 'datatables.net-bs5'; */
</style>

<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">KASIR</h1>
    <h1 class="h2">Transaksi Deposit Kelas</h1>
  </div>
  <div class="mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <div class="d-flex align-item-center justify-content-between mb-3">
              <h3 class="mb-0">Data Member</h3>
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
              :items="depositKelasS"
              :headers="headers"
              :search-value="search"
              table-class="table table-striped table-bordered mt4"
            >
              <template #item-actions="depositKelas">
                <!-- Cetak Struk -->
                <button
                  class="btn btn-sm btn-primary me-1"
                  @click="cetakStruk(depositKelas.id)"
                >
                  <i class="fa-solid fa-print"></i>
                  Cetak Struk
                </button>
                <!--  -->
              </template>
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

import { useRouter } from "vue-router";

export default {
  // memakai component DataTables, caranya:
  components: {
    EasyDataTable: Vue3EasyDataTable,
  },
  setup() {
    let depositKelasS = ref([]);
    let depositKelas = reactive({
      id: "",
      id_pegawai: "",
      id_member: "",
      id_kelas: "",
      tanggal_depo: "",
      masa_berlaku: "",
      bonus: "",
      jumlah_depo: "",
      total_depo: "",
      jumlah_pembayaran: "",
      f_member: {
        id: "",
        nama: "",
      },
      f_pegawai: {
        id: "",
        nama: "",
      },
      f_promo: {
        id: "",
        nama: "",
      },
      f_kelas: {
        id: "",
        nama: "",
      },
    });

    let headers = ref([
      { text: "ID Transaksi", value: "id", sortable: true },
      { text: "Nama Pegawai", value: "f_pegawai.nama", sortable: true },
      { text: "Nama Member", value: "f_member.nama", sortable: true },
      { text: "Jenis Promo", value: "f_promo.nama", sortable: true },
      { text: "Nama Kelas", value: "f_kelas.nama", sortable: true },
      { text: "Tanggal Depo", value: "tanggal_depo", sortable: true },
      { text: "Total Depo", value: "total_depo", sortable: true },
      { text: "Jumlah bayar", value: "jumlah_pembayaran", sortable: true },
      { text: "Actions", value: "actions" },
    ]);

    let search = ref("");
    let router = useRouter();

    function GetTransaksiKelasUang() {
      axios
        .get(Api.BASE_URL + "/TransaksiDepositKelas", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          depositKelasS.value = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    function cetakStruk(id) {
      router.push({
        name: "StrukTransaksiView",
        params: {
          id: id,
          strukType: 3,
        },
      });
    }

    onMounted(() => {
      GetTransaksiKelasUang();
    });

    return {
      depositKelasS,
      depositKelas,
      Api,
      toastr,
      search,
      headers,
      useRouter,
      cetakStruk,
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
