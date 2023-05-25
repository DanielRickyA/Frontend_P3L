<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 v-if="strukType == 2" class="h2">Cetak Struk Presensi Gym</h1>
    <h1 v-if="PresensiBooking.jenis_pembayaran == 'Deposit Kelas'" class="h2">Cetak Struk Presensi Kelas Paket</h1>
    <h1 v-if="PresensiBooking.jenis_pembayaran == 'Deposit Uang'" class="h2">Cetak Struk Presensi Kelas</h1>
    <router-link
      :to="{ name: 'PresensiMemberGymView' }"
      class="btn btn-md btn-primary"
      id="btn-create-member"
      >Back</router-link
    >
  </div>
  <div class="container content">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-start mb-1">
          <div>
            <p class="mb-0"><strong>Gofit</strong></p>
            <p>Jl. Centralpark No. 10 Yogyakarta</p>
          </div>
        </div>

        <!-- Tampilan Struk Presensi Gym -->
        <div v-if="strukType==2" class="mb-3">
          <p class="mb-0"><strong>STRUK PRESENSI GYM</strong></p>
          <table class="table_p0" style="width: 300px">
            <tr>
              <td style="width: 85px">No Struk</td>
              <td>:</td>
              <td>{{ PresensiBooking.id }}</td>
            </tr>
            <tr>
              <td>Tanggal</td>
              <td>:</td>
              <!-- <td v-if="strukType == 1">{{ transaksi.tanggal_transaksi }}</td> -->
              <td>{{ PresensiBooking.jam_presensi }}</td>
            </tr>
          </table>
        </div>

        <!--  -->

        <!-- Tampilan Struk Presensi Kelas -->
        <div v-if="strukType==1" class="mb-3">
          <p v-if="PresensiBooking.jenis_pembayaran == 'Deposit Uang'" class="mb-0"><strong>STRUK PRESENSI KELAS</strong></p>
          <p v-if="PresensiBooking.jenis_pembayaran == 'Deposit Kelas'" class="mb-0"><strong>STRUK PRESENSI KELAS PAKET</strong></p>
          <table class="table_p0" style="width: 300px">
            <tr>
              <td style="width: 85px">No Struk</td>
              <td>:</td>
              <td>{{ PresensiBooking.id }}</td>
            </tr>
            <tr>
              <td>Tanggal</td>
              <td>:</td>
              <!-- <td v-if="strukType == 1">{{ transaksi.tanggal_transaksi }}</td> -->
              <td>{{ PresensiBooking.waktu_presensi }}</td>
            </tr>
          </table>
        </div>



        <!-- Tampilan Bawah Presensi Gym -->
        <div v-if="strukType == 2">
          <table class="table_p0" style="width: 350px">
            <tr>
              <td style="width: 95px"><strong>Member</strong></td>
              <td>:</td>
              <td>{{ f_member.id }} / {{f_member.nama}}</td>
            </tr>
            <tr>
              <td>Slot Waktu</td>
              <td>:</td>
              <!-- <td v-if="strukType == 1">{{ transaksi.tanggal_transaksi }}</td> -->
              <td>{{ PresensiBooking.slot_waktu }}</td>
            </tr>
          </table>
        </div>

        <!-- Tampilan Bawah Untuk Deposit Kelas -->
        <div v-if="PresensiBooking.jenis_pembayaran == 'Deposit Uang'" class="mb-0">
          <table class="table_p0" style="width: 350px">
            <tr>
              <td style="width: 95px"><strong>Member</strong></td>
              <td>:</td>
              <td>{{ f_member.id }} / {{f_member.nama}}</td>
            </tr>

            <tr>
              <td>Kelas</td>
              <td>:</td>
              <td>{{ f_kelas.nama }}</td>
            </tr>

            <tr>
              <td>Instruktur</td>
              <td>:</td>
              <td>{{ f_instruktur.nama }}</td>
            </tr>
            
            <tr>
              <td>Tariff </td>
              <td>:</td>
              <td>Rp.{{ PresensiBooking.tarif }}</td>
            </tr>
            
            <tr>
              <td>Sisa Deposit </td>
              <td>:</td>
              <td>Rp.{{ f_member.deposit_uang }}</td>
            </tr>

          </table>
        </div>

        <div v-if="PresensiBooking.jenis_pembayaran == 'Deposit Kelas'" class="mb-0">
          <table class="table_p0" style="width: 400px">
            <tr>
              <td style="width: 100px"><strong>Member</strong></td>
              <td>:</td>
              <td>{{ f_member.id }} / {{f_member.nama}}</td>
            </tr>

            <tr>
              <td>Kelas</td>
              <td>:</td>
              <td>{{ f_kelas.nama }}</td>
            </tr>

            <tr>
              <td>Instruktur</td>
              <td>:</td>
              <td>{{ f_instruktur.nama }}</td>
            </tr>
        
            <tr>
              <td>Sisa Deposit </td>
              <td>:</td>
              <td>{{ f_sisa_deposit.sisa_deposit }}</td>
            </tr>
  
            <tr>
              <td>Masa Berlaku </td>
              <td>:</td>
              <td>{{ f_sisa_deposit.masa_berlaku_depo  }}</td>
            </tr>
            

          </table>
        </div>

      </div>
    </div>
    <div class="d-flex justify-content-end mt-2 " @click="cetak()">
      <button class="btn btn-success">
        <i class="fas fa-print"></i> Print Cetak
      </button>
    </div>
  </div>
</template>
<style>
.table_p0 td {
  padding: 0;
}
.content {
  width: 50%;
}
@media print {
  .btn {
    display: none;
  }
  
}

@media (max-width: 750px) {
  .content {
    width: 100%;
  }
}
</style>
<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import * as Api from "../ApiHelper";
import toastr from "toastr";

export default {
  setup() {
    const PresensiBooking = ref([]);
    const f_member = ref([]);
    const f_jadwal_harian = ref([]);
    const f_instruktur = ref([]);
    const f_jadwal_umum = ref([]);
    const f_kelas = ref([]);
    const f_sisa_deposit = ref([]);
    const route = useRoute();
    const strukType = route.params.strukType;

    onMounted(() => {

      if(strukType == 2){
        axios.get(Api.BASE_URL + "/PresensiBookingGym/" + route.params.id, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).then((response) => {
          PresensiBooking.value = response.data.data;
          f_member.value = PresensiBooking.value.f_member;
          console.log(response);
        }).catch((error) => {
          toastr.error(error.response.data.message);
          console.log(error.response);
        });
        
      }else if(strukType == 1){
        axios.get(Api.BASE_URL + "/PresensiBookingKelas/" + route.params.id, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).then((response) => {
          PresensiBooking.value = response.data.data;
          f_sisa_deposit.value = response.data.sisa_deposit;
          f_member.value = PresensiBooking.value.f_member;
          f_jadwal_harian.value = PresensiBooking.value.f_jadwal_harian;
          f_instruktur.value = f_jadwal_harian.value.f_instruktur;
          f_jadwal_umum.value = f_jadwal_harian.value.f_jadwal_umum;
          f_kelas.value = f_jadwal_umum.value.f_kelas;
          console.log(response);
        }).catch((error) => {
          toastr.error(error.response.data.message);
          console.log(error.response);
        });
      }


    });

    function cetak() {
      window.print();
    }

    return {
      PresensiBooking,
      f_member,
      f_jadwal_harian,
      f_instruktur,
      f_jadwal_umum,
      f_kelas,
      f_sisa_deposit,
      strukType,
      cetak,
    };
  },
};
</script>
