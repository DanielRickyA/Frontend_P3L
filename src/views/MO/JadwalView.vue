<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">MO</h1>
    <router-link
      :to="{ name: 'createJadwalView' }"
      class="btn btn-md"
      id="btn-create-member"
      >Create New Jadwal</router-link
    >
  </div>
  <div class="mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h3 style="text-align: left">Data Jadwal </h3>
            <table class="table table-striped table-bordered mt4">
              <thead class="thead-dark">
                <tr class="text-dark table-secondary">
                  <th scope="col">Nama Kelas</th>
                  <th scope="col">Nama Instruktur</th>
                  <th scope="col">Hari</th>
                  <th scope="col">Jam</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(jadwal, id) in jadwals" :key="id">
                  <td>{{ jadwal.f_kelas.nama }}</td>
                  <td>{{ jadwal.f_instruktur.nama }}</td>
                  <td>{{ jadwal.hari_kelas}}</td>
                  <td>{{ jadwal.jam_kelas }}</td>
                  <td class="text-center">
                    <!-- Btn Update -->
                    <button
                      class="btn btn-sm btn-success me-1"
                      data-bs-toggle="modal"
                      @click="OpenUpdateModal(jadwal)"
                      data-bs-target="#UpdateModal"
                    >
                      <i class="fa-solid fa-pencil"></i>
                    </button>
                    <!--  -->

                    <!-- Btn Delete -->
                    <button
                      class="btn btn-sm btn-danger me-1"
                      data-bs-toggle="modal"
                      data-bs-target="#DeleteModal"
                      @click="openDeleteModal(jadwal)"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <!--  -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Update Modal -->
   <div
    class="modal fade"
    id="UpdateModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <form @submit.prevent="updateJadwal" class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Update Kelas {{ jadwal.f_kelas.nama }} | Insturktur {{ jadwal.f_instruktur.nama }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h3 style="text-align: left">Input Member</h3>
            <form style="text-align: left">
              <div class="form-group mb-3">
                <label class="form-label" 
                  >Nama Kelas</label
                >
                <select
                  class="form-control"
                  v-model="jadwal.id_kelas"
                  required
                >
                  <option
                    v-for="kls in kelas"
                    :value="kls.id"
                    v-bind:key="kls.id"
                  >
                    {{ kls.nama }}
                  </option>
                </select>
                <!-- validation -->
                <!-- <div v-if="validation.nama" class="mt-2 alert alert-danger">
                  {{ validation.nama[0] }}
                </div> -->
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label">Nama Instruktur</label>
                <select
                  class="form-control"
                  v-model="jadwal.id_instruktur"
                  required
                >
                  <option
                    v-for="ins in instruktur"
                    :value="ins.id"
                    v-bind:key="ins.id"
                  >
                    {{ ins.nama }}
                  </option>
                </select>
                <!-- validation -->
                <!-- <div
                  v-if="validation.tanggal_lahir"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.tanggal_lahir[0] }}
                </div> -->
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Hari Kelas</label>
                <select
                  class="form-select"
                  v-model="jadwal.hari_kelas"
                  placeholder="Masukkan Hari Kelas"
                  required
                >
                  <option hidden disabled selected value="">Pilih Hari</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
                <!-- validation -->
               
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label">Jam Kelas</label>
                <select
                  class="form-select"
                  v-model="jadwal.jam_kelas"
                  placeholder="Masukkan Jam Kelas"
                  required
                >
                  <option hidden disabled selected value="">
                    Pilih Jam Kelas
                  </option>
                  <option value="07.00 - 08.00">07.00 - 08.00</option>
                  <option value="08.00 - 09.00">08.00 - 09.00</option>
                  <option value="09.00 - 10.00">09.00 - 10.00</option>
                  <option value="11.00 - 12.00">11.00 - 12.00</option>
                  <option value="12.00 - 13.00">12.00 - 13.00</option>
                  <option value=" 13.00 - 14.00">13.00 - 14.00</option>
                  <option value="14.00 - 15.00">14.00 - 15.00</option>
                  <option value="15.00 - 16.00">15.00 - 16.00</option>
                  <option value=" 16.00 - 17.00">16.00 - 17.00</option>
                  <option value="17.00 - 18.00">17.00 - 18.00</option>
                  <option value="18.00 - 19.00">18.00 - 19.00</option>
                  <option value="19.00 - 20.00">19.00 - 20.00</option>
                  <option value="20.00 - 21.00">20.00 - 21.00</option>
                </select>
                <!-- validation -->
              </div>
            </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" class="btn btn-primary">
            Save changes
          </button>
        </div>
      </form>
    </div>
  </div>
  <!--  -->

  <!-- Delete Modal -->
  <div
    class="modal fade"
    id="DeleteModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    
  >
    <div class="modal-dialog modal-sm modal-dialog-centered">
      <div class="modal-content ">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            Delete {{ jadwal.f_kelas.nama }} || {{ jadwal.f_instruktur.nama }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-footer border-0">
          <button
            type="button"
            class="btn"
            data-bs-dismiss="modal"
            style="color:white; background-color: #e8b5b5;"
          >
            Batal
          </button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteJadwal(jadwal)">Delete</button>
        </div>
      </div>
    </div>
  </div>
  <!--  -->
  
</template>

<script>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import * as Api from "../ApiHelper";
// import { useRouter } from 'vue-router'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import bootstrapMin from "bootstrap/dist/js/bootstrap.min";

export default {

  methods:{
   
  },
  setup() {

    const kelas = ref([]);
    const instruktur = ref([]);

    let jadwals = ref([]);
    let jadwal = reactive({
      id: "",
      id_kelas: "",
      id_instruktur: "",
      hari_kelas: "",
      jam_kelas: "",
      f_kelas: {
        nama: "",
      },
      f_instruktur: {
        nama: "",
      },

    });
    // let router = useRouter()
    function showData(jadwalObj) {
      jadwal.id = jadwalObj.id;
      jadwal.hari_kelas = jadwalObj.hari_kelas;
      jadwal.jam_kelas = jadwalObj.jam_kelas;
      jadwal.f_kelas.nama = jadwalObj.f_kelas.nama;
      jadwal.f_instruktur.nama = jadwalObj.f_instruktur.nama;
    }

    function OpenUpdateModal(jadwalObj) {
      jadwal.id = jadwalObj.id;
      jadwal.id_kelas = jadwalObj.id_kelas;
      jadwal.id_instruktur = jadwalObj.id_instruktur;
      jadwal.hari_kelas = jadwalObj.hari_kelas;
      jadwal.jam_kelas = jadwalObj.jam_kelas;
      jadwal.f_kelas.nama = jadwalObj.f_kelas.nama;
      jadwal.f_instruktur.nama = jadwalObj.f_instruktur.nama;
    }

    function openDeleteModal(jadwalObj) {
      jadwal.id = jadwalObj.id;
      jadwal.f_kelas.nama = jadwalObj.f_kelas.nama;
      jadwal.f_instruktur.nama = jadwalObj.f_instruktur.nama;
    }

    // Get Jadwal UMUM 
    function getJadwalUmum() {
      axios
        .get(Api.BASE_URL + "/JadwalUmum", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          jadwals.value = response.data.data;
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

    function updateJadwal() {
      const date = new Date(jadwal.tanggal);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);

      let tanggal = `${year}-${month}-${day}`;
      axios
        .put(
          Api.BASE_URL + "/JadwalUmum/" + jadwal.id,
          {
            id_kelas: jadwal.id_kelas,
            id_instruktur: jadwal.id_instruktur,
            tanggal: tanggal,
            hari_kelas: jadwal.hari_kelas,
            jam_kelas: jadwal.jam_kelas,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          toastr.success('Jadwal Berhasil Diubah')
          let modal = document.getElementById("UpdateModal");
          bootstrapMin.Modal.getInstance(modal).hide();
          getJadwalUmum();
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
          toastr.error(error.response.data.message);
        });
    }

    function deleteJadwal(){
        axios.delete(Api.BASE_URL + "/JadwalUmum/" + jadwal.id, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response) => {
        toastr.success('Jadwal Berhasil Dihapus')
        getJadwalUmum();
        console.log(response);
      }).catch((error) => {
        console.log(error.response.data);
      });
    }


      onMounted(() => {
        getJadwalUmum();
        getKelas();
        getInstruktur();  
      });
      
    

    return {
      jadwals,
      jadwal,
      Api,
      kelas,
      instruktur,
      toastr,
      showData,
      OpenUpdateModal,
      openDeleteModal,
      updateJadwal,
      deleteJadwal,
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
#tableMember td:first-child {
  white-space: nowrap;
  width: 200px;
}
</style>
