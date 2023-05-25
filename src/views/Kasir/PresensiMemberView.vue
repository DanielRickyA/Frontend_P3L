<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">Presensi Member Gym</h1>
  </div>
  <div class="mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <div class="d-flex align-item-center justify-content-between mb-3">
              <h3 class="mb-0">Data Presensi Gym</h3>
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
              :items="PresensiMembers"
              :headers="headers"
              :search-value="search"
            >
              <template #item-actions="PresensiMember">
                <button
                  v-if="PresensiMember.jam_presensi != null"
                  class="btn btn-sm btn-primary me-1"
                  @click="cetakStruk(PresensiMember.id)"
                >
                  <i class="fa-solid fa-print"></i>
                  Cetak Struk
                </button>

                <button
                  v-if="PresensiMember.jam_presensi == null"
                  class="btn btn-sm btn-success me-1"
                  data-bs-toggle="modal"
                  data-bs-target="#setPresensiMemberModal"
                  @click="presensiMember(PresensiMember)"
                >
                  <i class="fa-solid fa-check"> </i>
                  Masuk
                </button>
              </template>
            </EasyDataTable>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="setPresensiMemberModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-sm modal-dialog-centered">
      <form @submit.prevent="setPresensiMember" class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title fs-5" id="staticBackdropLabel">
            Member {{ PresensiMember.f_member.nama }}
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn" data-bs-dismiss="modal">
            Batal
          </button>
          <button type="submit" class="btn btn-primary">Datang</button>
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
import { useRouter } from 'vue-router'

export default {
  components: {
    EasyDataTable: Vue3EasyDataTable,
  },

  setup() {
    let PresensiMembers = ref([]);
    let PresensiMember = reactive({
      id: "",
      id_member: "",
      tanggal_yang_dibooking: "",
      tanggal_booking: "",
      slot_waktu: "",
      jam_presensi: "",
      f_member: {
        id: "",
        nama: "",
      },
    });
    let router = useRouter()
    let search = ref("");

    let headers = ref([
      { text: "ID", value: "id", sortable: true },
      { text: "Nama Member", value: "f_member.id", sortable: true },
      {
        text: "Tanggal Booking Tempat",
        value: "tanggal_yang_dibooking",
        sortable: true,
      },
      { text: "Tanggal Booking", value: "tanggal_booking", sortable: true },
      { text: "Sesi", value: "slot_waktu", sortable: true },
      { text: "Jam Presensi", value: "jam_presensi", sortable: true },
      { text: "Actions", value: "actions" },
    ]);

    function presensiMember(PresensiMemberObj) {
      PresensiMember.id = PresensiMemberObj.id;
      PresensiMember.f_member.nama = PresensiMemberObj.f_member.nama;
    }

    function getPresensiGymMember() {
      axios
        .get(Api.BASE_URL + "/PresensiBookingGymToday", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          PresensiMembers.value = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    function setPresensiMember(){
        axios.patch(Api.BASE_URL + "/PresensiBookingGymToday/" + PresensiMember.id, {}, {
            headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).then((response) => {
            console.log(response);
            let modal = document.getElementById("setPresensiMemberModal");
            bootstrapMin.Modal.getInstance(modal).hide();
            toastr.success("Presensi Berhasil");
            getPresensiGymMember();
        }).catch((error) => {
            console.log(error.response.data);
        })
    }
    function cetakStruk(id) {
      router.push({
        name: "StrukPresensiView",
        params: {
          id: id,
          strukType: 2,
        },
      });
    }

    onMounted(() => {
      getPresensiGymMember();
    });

    return {
      PresensiMembers,
      PresensiMember,
      search,
      headers,
      presensiMember,
      setPresensiMember,
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
