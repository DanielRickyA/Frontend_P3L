<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">ADMIN</h1>
    <router-link
      :to="{ name: 'createInstrukturView' }"
      class="btn btn-md"
      id="btn-create-member"
      >Create New Instruktur</router-link
    >
  </div>
  <div class="mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h3 style="text-align: left">Data Instruktur</h3>
           <table class="table table-striped table-bordered mt4">
              <thead class="thead-dark">
                <tr class="text-dark table-secondary">
                  <th scope="col">ID Instruktur</th>
                  <th scope="col">Nama Insturktur</th>
                  <th scope="col">Email</th>
                  <th scope="col">No Telepon</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(instruktur, id) in instrukturs" :key="id">
                  <td>{{ instruktur.id }}</td>
                  <td>{{ instruktur.nama }}</td>
                  <td>{{ instruktur.email }}</td>
                  <td>{{ instruktur.no_telp }}</td>
                  <td class="text-center">
                    <!-- Btn ShowByID -->
                    <button
                      class="btn btn-sm btn-primary me-1"
                      data-bs-toggle="modal"
                      @click="showData(instruktur)"
                      data-bs-target="#ShowIDMemberModal"
                    >
                      <i class="fa-solid fa-eye"></i>
                    </button>
                    <!--  -->

                    <!-- Btn Update -->
                    <button
                      class="btn btn-sm btn-success me-1"
                      data-bs-toggle="modal"
                      @click="OpenUpdateModal(instruktur)"
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
                      @click="openDeleteModal(instruktur)"
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

  <!-- Modal ShowByID -->
  <div
    class="modal fade"
    id="ShowIDMemberModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Instruktur : {{ instruktur.id }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-start">
          <table id="tableMember">
            <tr>
              <td>Nama</td>
              <td style="width: 10px">:</td>
              <td>{{ instruktur.nama }}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>:</td>
              <td>{{ instruktur.email }}</td>
            </tr>
            <tr>
              <td>Alamat</td>
              <td>:</td>
              <td>{{ instruktur.alamat }}</td>
            </tr>
            <tr>
              <td>Tanggal Lahir</td>
              <td style="width: 20px">:</td>
              <td>{{ instruktur.tanggal_lahir }}</td>
            </tr>
            <tr>
              <td>No.Telp</td>
              <td>:</td>
              <td>{{ instruktur.no_telp }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!--  -->

   <!-- Update Modal -->
  <div
    class="modal fade"
    id="UpdateModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <form @submit.prevent="updateInstruktur" class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Update Instruktur {{ instruktur.nama }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div style="text-align: left">
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
                <textarea
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
                />
                <!-- validation -->
                <!-- <div v-if="validation.no_telp" class="mt-2 alert alert-danger">
                  {{ validation.no_telp[0] }}
                </div> -->
              </div>
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
          <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
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
            Delete {{ instruktur.nama }}
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
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteInstruktur(instruktur)">Delete</button>
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
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
// import { useRouter } from 'vue-router'

export default {
  setup() {
    let instrukturs = ref([]);
    let instruktur = reactive({
      id: "",
      nama: "",
      email: "",
      tanggal_lahir: "",
      no_telp: "",
      password: "",
    });

    // let router = useRouter()
    function showData(instrukturObj) {
      instruktur.id = instrukturObj.id;
      instruktur.nama = instrukturObj.nama;
      instruktur.email = instrukturObj.email;
      instruktur.alamat = instrukturObj.alamat;
      instruktur.tanggal_lahir = instrukturObj.tanggal_lahir;
      instruktur.no_telp = instrukturObj.no_telp;
    }
    function OpenUpdateModal(instrukturObj) {
      instruktur.id = instrukturObj.id;
      instruktur.nama = instrukturObj.nama;
      instruktur.email = instrukturObj.email;
      instruktur.alamat = instrukturObj.alamat;
      instruktur.tanggal_lahir = instrukturObj.tanggal_lahir;
      instruktur.no_telp = instrukturObj.no_telp;
      instruktur.password = instrukturObj.password;
    }
    function openDeleteModal(instrukturObj) {
      instruktur.id = instrukturObj.id;
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
          
          instrukturs.value = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
    function updateInstruktur() {
      axios
        .put(
          Api.BASE_URL + "/Instruktur/" + instruktur.id,
          {
            nama: instruktur.nama,
            email: instruktur.email,
            tanggal_lahir: instruktur.tanggal_lahir,
            alamat: instruktur.alamat,
            no_telp: instruktur.no_telp,
            password: instruktur.password,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          toastr.success('Instruktur berhasil diupdate')
          getInstruktur();
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    function deleteInstruktur(){
      axios.delete(Api.BASE_URL + "/Instruktur/" + instruktur.id, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then(() => {
        toastr.success('Instruktur berhasil dihapus')
        getInstruktur();
      }).catch((error) => {
        console.log(error.response.data);
      });
    }


    onMounted(() => {
      getInstruktur();
    });

    return {
      instrukturs,
      instruktur,
      Api,
      showData,
      OpenUpdateModal,
      updateInstruktur,
      openDeleteModal,
      deleteInstruktur,
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
  width: 150px;
}
</style>
