<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">Presensi Member Kelas</h1>
  </div>
  <div class="mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <div class="d-flex align-item-center justify-content-between mb-3">
              <h3 class="mb-0">Data Presensi Kelas</h3>
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
              :items="PresensiKelasMembers"
              :headers="headers"
              :search-value="search"
            >
              <template #item-actions="PresensiKelasMember">
                <button
                  class="btn btn-sm btn-primary me-1"
                  @click="cetakStruk(PresensiKelasMember.id)"
                >
                  <i class="fa-solid fa-print"></i>
                  Cetak Struk
                </button>

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
// import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Vue3EasyDataTable from "vue3-easy-data-table";
// import bootstrapMin from "bootstrap/dist/js/bootstrap.min";
import { useRouter } from 'vue-router'

export default {
  components: {
    EasyDataTable: Vue3EasyDataTable,
  },

  setup() {
    let PresensiKelasMembers = ref([]);
    let PresensiKelasMember = reactive({
      id: "",
      id_member: "",
      id_jadwal_harian: "",
      tanggal_booking: "",
      waktu_presensi: "",
      jenis_pembayaran: "",
      tarif: "",
      f_member: {
        id: "",
        nama: "",
      },
      f_jadwal_harian:{
        id: "",
        tanggal_jadwal_harian: "",
      }
    });
    let router = useRouter()
    let search = ref("");

    let headers = ref([
      { text: "ID", value: "id", sortable: true },
      { text: "Nama Member", value: "f_member.id", sortable: true },
      { text: "Tanggal Booking Kelas",value: "tanggal_yang_dibooking",sortable: true, },
      { text: "Tanggal Booking", value: "tanggal_booking", sortable: true },
      { text: "Waktu Presensi", value: "waktu_presensi", sortable: true },
      { text: "Jenis Pembayaran", value: "jenis_pembayaran", sortable: true },
      { text: "Actions", value: "actions" },
    ]);

    function getPresensiKelas() {
      axios
        .get(Api.BASE_URL + "/PresensiBookingKelasToday", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          PresensiKelasMembers.value = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }


    function cetakStruk(id) {
      router.push({
        name: "StrukPresensiView",
        params: {
          id: id,
          strukType: 1  ,
        },
      });
    }

    onMounted(() => {
      getPresensiKelas();
    });

    return {
      PresensiKelasMembers,
      PresensiKelasMember,
      search,
      headers,
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
