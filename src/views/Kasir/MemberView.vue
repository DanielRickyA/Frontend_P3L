<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">KASIR</h1>
    <router-link
      :to="{ name: 'createMemberView' }"
      class="btn btn-md"
      id="btn-create-member"
      >Create New Member</router-link
    >
  </div>
  <div class="mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h3 style="text-align: left">Data Member</h3>
            <table class="table table-striped table-bordered mt4">
              <thead class="thead-dark">
                <tr class="text-dark table-secondary">
                  <th scope="col">ID Member</th>
                  <th scope="col">Nama Member</th>
                  <th scope="col">Status</th>
                  <th scope="col">Tanggal Expired</th>
                  <th scope="col">Jumlah Deposit</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, id) in members" :key="id">
                  <td>{{ member.id }}</td>
                  <td>{{ member.nama }}</td>
                  <td>{{ member.status }}</td>
                  <td>{{ member.tanggal_expired || "—————" }}</td>
                  <td>{{ member.deposit_uang || "—————" }}</td>
                  <td class="text-center">
                    <!-- Btn ShowByID -->
                    <button
                      class="btn btn-sm btn-primary me-1"
                      data-bs-toggle="modal"
                      @click="showData(member)"
                      data-bs-target="#ShowIDMemberModal"
                    >
                      <i class="fa-solid fa-eye"></i>
                    </button>
                    <!--  -->

                    <!-- Btn Update -->
                    <button
                      class="btn btn-sm btn-success me-1"
                      data-bs-toggle="modal"
                      @click="OpenUpdateModal(member)"
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
                      @click="openDeleteModal(member)"
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
            {{ member.id }}/{{ member.nama }}
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
              <td>Tanggal Lahir</td>
              <td style="width: 20px">:</td>
              <td>{{ member.tanggal_lahir }}</td>
            </tr>
            <tr>
              <td>Alamat</td>
              <td>:</td>
              <td>{{ member.alamat }}</td>
            </tr>
            <tr>
              <td>No.Telp</td>
              <td>:</td>
              <td>{{ member.no_telp }}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>:</td>
              <td>{{ member.status }}</td>
            </tr>
            <tr>
              <td>Tanggal Expired</td>
              <td>:</td>
              <td>{{ member.tanggal_expired || "—" }}</td>
            </tr>
            <tr>
              <td>Jumlah Deposit</td>
              <td>:</td>
              <td>{{ member.deposit_uang || "—"}}</td>
            </tr>
          </table>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="resetPassword(member.id)"
          >
            Reset Password
          </button>
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
      <form @submit.prevent="updateMember" class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Update {{ member.id }}
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
              <label class="form-label" bis_skin_checked="1">Nama Member</label>
              <input
                bis_skin_checked="1"
                type="text"
                class="form-control"
                placeholder="Masukkan nama member"
                v-model="member.nama"
                required
              />
              <!-- validation -->
              <!-- <div v-if="validation.nama" class="mt-2 alert alert-danger">
                  {{ validation.nama[0] }}
                </div> -->
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
              <!-- <div
                  v-if="validation.tanggal_lahir"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.tanggal_lahir[0] }}
                </div> -->
            </div>
            <div class="form-group mb-3">
              <label for="content" class="form-label">Alamat Member</label>
              <textarea
                class="form-control"
                type="text"
                v-model="member.alamat"
                placeholder="Masukkan jumlah pegawai"
                required
              />
              <!-- validation -->
              <!-- <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                  {{ validation.alamat[0] }}
                </div> -->
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
              <!-- <div v-if="validation.no_telp" class="mt-2 alert alert-danger">
                  {{ validation.no_telp[0] }}
                </div> -->
            </div>

            <div class="form-group mb-3">
              <label for="content" class="form-label">Password</label>
              <input
                class="form-control"
                type="password"
                v-model="member.password"
                placeholder="Masukkan jumlah pegawai"
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
            Delete {{ member.id }}
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
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteMember()">Delete</button>
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
    let members = ref([]);
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
    // let router = useRouter()
    function showData(memberObj) {
      member.id = memberObj.id;
      member.nama = memberObj.nama;
      member.tanggal_lahir = memberObj.tanggal_lahir;
      member.alamat = memberObj.alamat;
      member.no_telp = memberObj.no_telp;
      member.status = memberObj.status;
      member.tanggal_expired = memberObj.tanggal_expired;
      member.deposit_uang = memberObj.deposit_uang;
    }
    function OpenUpdateModal(memberObj) {
      member.id = memberObj.id;
      member.nama = memberObj.nama;
      member.tanggal_lahir = memberObj.tanggal_lahir;
      member.alamat = memberObj.alamat;
      member.no_telp = memberObj.no_telp;
      member.password = memberObj.password;
    }

    function openDeleteModal(memberObj) {
      member.id = memberObj.id;
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

    function resetPassword(id) {
      axios
        .patch(
          Api.BASE_URL + "/Member/" + id,
          {},
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response);
          toastr.success("Password berhasil direset");
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    function updateMember() {
      axios
        .put(
          Api.BASE_URL + "/Member/" + member.id,
          {
            nama: member.nama,
            tanggal_lahir: member.tanggal_lahir,
            alamat: member.alamat,
            no_telp: member.no_telp,
            password: member.password,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          GetMember();
          toastr.success("Member berhasil diupdate");
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    function deleteMember(){
        axios.delete(Api.BASE_URL + "/Member/" + member.id, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then(() => {
        toastr.success("Member berhasil dihapus");
        GetMember();
      }).catch((error) => {
        console.log(error.response.data);
      });
    }
      onMounted(() => {
        GetMember();
      });
    

    return {
      members,
      Api,
      member,
      toastr,
      showData,
      resetPassword,
      OpenUpdateModal,
      openDeleteModal,
      updateMember,
      deleteMember,
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
