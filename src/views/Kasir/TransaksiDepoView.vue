<style>
@import "datatables.net-dt";
/* @import 'datatables.net-bs5'; */
</style>

<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">KASIR</h1>
    <h1 class="h2">Transaksi</h1>
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
              :items="members"
              :headers="headers"
              :search-value="search"
              
            >
              <template #item-actions="member">
                <!-- Btn Update -->
                <button
                  class="btn btn-sm btn-primary me-1"
                  data-bs-toggle="modal"
                  @click="setDepoUang(member)"
                  data-bs-target="#openDepoUangModal"
                >
                <i class="fa-solid fa-wallet"></i>
                  
                </button>
                <!--  -->

                <!-- Tambah Depo Kelas -->
                <button
                  class="btn btn-sm btn-success me-1"
                  data-bs-toggle="modal"
                  @click="setDepoKelas(member)"
                  data-bs-target="#openDepoKelasModal"
                >
                 <i class="fa-solid fa-calendar-check"></i>
                </button>
                <!--  -->
              </template>
            </EasyDataTable>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Tambah Deposit Kelas -->
  <div
    class="modal fade"
    id="openDepoKelasModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <Form @submit.prevent="tambahDepoKelas" class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Transaksi Deposit Kelas</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!--  -->
          <div class="form-group mb-3">
            <label class="form-label">ID Member</label>
            <input
              type="text"
              class="form-control"
              placeholder="Masukkan nama member"
              v-model="member.id"
              required
              disabled
            />
          </div>

          <div class="form-group mb-3">
            <label class="form-label">Nama Kelas</label>
            <select
              class="form-select"
              placeholder="Masukkan nama member"
              v-model="depositKelas.id_kelas"
              required
            >
              <option selected disabled value="">Pilih Kelas</option>
              <option v-for="kls in kelas" :value="kls.id" v-bind:key="kls.id">
                {{ kls.nama }}
              </option>
            </select>
          </div>

          <div class="form-group mb-3">
            <label for="validationCustom04" class="form-label"
              >Jenis Promo</label
            >
            <select
              class="form-select"
              id="validationCustom04"
              v-model="depositKelas.id_promo"
            >
              <option value="3">Tidak Pakai Promo</option>
              <option value="2">Promo Kelas Paket</option>
            </select>
          </div>

          <div class="form-group mb-3">
            <label class="form-label">Total Depo</label>
            <input
              type="number"
              class="form-control"
              min="1"
              placeholder="Masukkan Jumlah Pembayaran"
              v-model="depositKelas.jumlah_depo"
              required
            />
          </div>

          <div class="form-group mb-3">
            <label class="form-label">Jumlah Pembayaran</label>
            <input
              type="number"
              class="form-control"
              min="0"
              placeholder="Masukkan Jumlah Pembayaran"
              v-model="depositKelas.jumlah_pembayaran"
              required
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" class="btn btn-primary">Save changes</button>
        </div>
      </Form>
    </div>
  </div>

  
  <!-- Tambah Deposit Uang -->
  <div
    class="modal fade"
    id="openDepoUangModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <Form @submit.prevent="tambahDepoUang" class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Transaksi Deposit Uang</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!--  -->
          <div class="form-group mb-3">
            <label class="form-label">ID Member</label>
            <input
              type="text"
              class="form-control"
              placeholder="Masukkan nama member"
              v-model="member.id"
              required
              disabled
            />
          </div>

          <div class="form-group mb-3">
            <label for="validationCustom04" class="form-label"
              >Jenis Promo</label
            >
            <select
              class="form-select"
              id="validationCustom04"
              v-model="depositUang.id_promo"
            >
              <option value="3">Tidak Pakai Promo</option>
              <option value="1">Promo Kelas Reguler</option>
            </select>
          </div>

          <div class="form-group mb-3">
            <label class="form-label">Jumlah Pembayaran</label>
            <input
              type="number"
              class="form-control"
              placeholder="Masukkan Jumlah Pembayaran"
              v-model="depositUang.jumlah_depo"
              required
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" class="btn btn-primary">Save changes</button>
        </div>
      </Form>
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
import bootstrapMin from "bootstrap/dist/js/bootstrap.min";
// import { RouterLink } from "vue-router";

// DataTable.use(DataTablesCore);

import { useRouter } from 'vue-router'

export default {
  // memakai component DataTables, caranya:
  components: {
    EasyDataTable: Vue3EasyDataTable,
  },
  setup() {
    let members = ref([]);
    let kelas = ref([]);
    let member = reactive({
      id: "",
      nama: "",
      tanggal_lahir: "",
      alamat: "",
      no_telp: "",
      status: "",
      tanggal_expired: "",
      deposit_uang: "",
      password: "",
    });

    let depositKelas = reactive({
      id: "",
      id_pegawai: "",
      id_member: "",
      id_kelas: "",
      id_promo: "3",
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

    let depositUang = reactive({
      id: "",
      id_pegawai: "",
      id_member: "",
      id_promo: "3",
      tanggal_depo: "",
      masa_berlaku: "",
      bonus: "",
      total_depo: "",
      jumlah_depo: "",
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
    });

    let headers = ref([
      { text: "ID Member", value: "id", sortable: true },
      { text: "Nama Member", value: "nama", sortable: true },
      { text: "Status", value: "status", sortable: true },
      { text: "Tanggal Expired", value: "tanggal_expired", sortable: true },
      { text: "jumlah Deposit", value: "deposit_uang", sortable: true },
      { text: "Actions", value: "actions" },
    ]);

    let search = ref("");
    const router = useRouter();
    function setDepoKelas(memberObj) {
      member.id = memberObj.id;

      depositKelas.nama = '';
      depositKelas.id_promo = '3';
      depositKelas.id_kelas = '';
      depositKelas.jumlah_depo = '';
      depositKelas.jumlah_pembayaran = '';
    }

    function setDepoUang(memberObj) {
      member.id = memberObj.id;

      depositUang.id_promo = '3';
      depositUang.jumlah_depo = '';
    }
    function GetMember() {
      axios
        .get(Api.BASE_URL + "/Member", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          members.value = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    function getKelas() {
      axios
        .get(Api.BASE_URL + "/Kelas", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          kelas.value = response.data.data;
          console.log(kelas);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function tambahDepoKelas() {
      axios
        .post(
          Api.BASE_URL + "/TransaksiDepositKelas",
          {
            id_pegawai: localStorage.getItem("id"),
            id_member: member.id,
            id_kelas: depositKelas.id_kelas,
            id_promo: depositKelas.id_promo,
            jumlah_pembayaran: depositKelas.jumlah_pembayaran,
            jumlah_depo: depositKelas.jumlah_depo ,
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
          let modal = document.getElementById("openDepoKelasModal");
          bootstrapMin.Modal.getInstance(modal).hide();
          toastr.success("Berhasil Menambahkan Deposit Kelas");
          if(response.data.kembalian > 0){
            toastr.success("Kembalian : " + response.data.kembalian);
          }
          router.push({ name: "DepoKelasView" });
        })
        .catch((error) => {
          console.log(error);
          toastr.error(error.response.data.message);
        });
    }

    function tambahDepoUang(){
      axios.post(Api.BASE_URL + '/TransaksiDepositUang', {
        id_pegawai: localStorage.getItem("id"),
        id_member: member.id,
        id_promo: depositUang.id_promo,
        jumlah_depo: depositUang.jumlah_depo,
      },{
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response) => {
          console.log(response);
          let modal = document.getElementById("openDepoUangModal");
          bootstrapMin.Modal.getInstance(modal).hide();
          toastr.success("Berhasil Menambahkan Deposit Uang");
          router.push({ name: "DepoUangView" });
        })
        .catch((error) => {
          console.log(error);
          toastr.error(error.response.data.message);
        });
    }

    onMounted(() => {
      GetMember();
      getKelas();
    });

    return {
      Api,
      members,
      member,
      kelas,
      toastr,
      search,
      headers,
      depositUang,
      depositKelas,
      useRouter,
      GetMember,
      setDepoKelas,
      setDepoUang,
      getKelas,
      tambahDepoKelas,
      tambahDepoUang,
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
