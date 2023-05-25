<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">HISTORY TRANSAKSI MEMBER</h1>
  </div>
  <div class="container content">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between mb-2">
          <div>
            <p class="mb-0"><strong>Gofit</strong></p>
            <p>Jl. Centralpark No. 10 Yogyakarta</p>
          </div>
          <div>
            <table class="table_p0" style="width: 250px">
              <tr>
                <td>No Struk</td>
                <td>:</td>
                <td>{{ transaksi.id }}</td>
              </tr>
              <tr>
                <td>Tanggal</td>
                <td>:</td>
                <td v-if="strukType == 1">{{ transaksi.tanggal_transaksi }}</td>
                <td v-else>{{ transaksi.tanggal_depo }}</td>
              </tr>
            </table>
          </div>
        </div>

        <div v-if="strukType == 1">
          <table>
            <tr>
              <td><strong>Member</strong></td>
              <td>:</td>
              <td>{{ f_member.id }} /{{ f_member.nama }}</td>
            </tr>
            <tr>
              <td>Aktivasi Tahunan</td>
              <td>:</td>
              <td>Rp.{{ transaksi.jumlah_bayar }},-</td>
            </tr>
            <tr>
              <td>Masa aktif member</td>
              <td>:</td>
              <td>{{ f_member.tanggal_expired }}</td>
            </tr>
          </table>
        </div>

        <div v-else-if="strukType == 2">
          <table>
            <tr>
              <td><strong>Member</strong></td>
              <td>:</td>
              <td>{{ f_member.id }} /{{ f_member.nama }}</td>
            </tr>
            <tr>
              <td>Deposit</td>
              <td>:</td>
              <td>Rp.{{ transaksi.jumlah_depo }},-</td>
            </tr>
            <tr>
              <td>Bonus deposit</td>
              <td>:</td>
              <td>Rp.{{ transaksi.bonus }},-</td>
            </tr>
            <tr>
              <td>Sisa deposit</td>
              <td>:</td>
              <td>Rp.{{ transaksi.sisa_saldo }},-</td>
            </tr>
            <tr>
              <td>Total deposit</td>
              <td>:</td>
              <td>Rp.{{ transaksi.total_depo }},-</td>
            </tr>
          </table>
        </div>

        <div v-else>
          <table>
            <tr>
              <td><strong>Member</strong></td>
              <td>:</td>
              <td>{{ f_member.id }} /{{ f_member.nama }}</td>
            </tr>
            <tr>
              <td>
                Deposit (bayar {{ transaksi.jumlah_depo }} gratis
                {{ transaksi.bonus }})
              </td>
              <td>:</td>
              <td>
                Rp.{{ transaksi.jumlah_pembayaran }},- ({{
                  transaksi.jumlah_depo
                }}
                x {{ f_kelas.harga }})
              </td>
            </tr>
            <tr>
              <td>Jenis Kelas</td>
              <td>:</td>
              <td>{{ f_kelas.nama }}</td>
            </tr>
            <tr>
              <td>Total Deposit {{ f_kelas.nama }}</td>
              <td>:</td>
              <td>{{ transaksi.total_depo }}</td>
            </tr>
            <tr>
              <td>Berlaku sampai dengan</td>
              <td>:</td>
              <td>{{ transaksi.masa_berlaku }}</td>
            </tr>
          </table>
        </div>

        <div class="d-flex justify-content-end">
          <table style="width: 250px">
            <tr>
              <td>Kasir</td>
              <td>:</td>
              <td>P0{{ f_pegawai.id }}/ {{ f_pegawai.nama }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end mt-2" @click="cetak()">
      <button class="btn btn-success">
        <i class="fas fa-print"></i> Print
        Cetak
      </button>
    </div>
  </div>
</template>

<style>
.table_p0 td {
  padding: 0;
}
.content {
  width: 75%;
}

@media print{
    .btn{
        display: none;
    }
    .card{
        box-shadow: none;
    }
}

@media(max-width: 750px){
    .content{
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
    const transaksi = ref([]);
    const f_member = ref([]);
    const f_pegawai = ref([]);
    const f_kelas = ref([]);
    const route = useRoute();
    const strukType = route.params.strukType;

    onMounted(() => {
      if (strukType == 1) {
        axios
          .get(Api.BASE_URL + "/TransaksiAktivasi/" + route.params.id, {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            // transaksi.value = re
            console.log(response);
            transaksi.value = response.data.data;
            f_member.value = transaksi.value.f_member;
            f_pegawai.value = transaksi.value.f_pegawai;
          })
          .catch((error) => {
            console.log(error);
            toastr.error(error);
          });
      } else if (strukType == 2) {
        axios
          .get(Api.BASE_URL + "/TransaksiDepositUang/" + route.params.id, {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            // transaksi.value = re
            console.log(response);
            transaksi.value = response.data.data;
            f_member.value = transaksi.value.f_member;
            f_pegawai.value = transaksi.value.f_pegawai;
          })
          .catch((error) => {
            console.log(error);
            toastr.error(error.res);
          });
      } else if (strukType == 3) {
        axios
          .get(Api.BASE_URL + "/TransaksiDepositKelas/" + route.params.id, {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            // transaksi.value = re
            console.log(response);
            transaksi.value = response.data.data;
            f_member.value = transaksi.value.f_member;
            f_pegawai.value = transaksi.value.f_pegawai;
            f_kelas.value = transaksi.value.f_kelas;
          })
          .catch((error) => {
            console.log(error);
            toastr.error(error.res);
          });
      }
    });

    function cetak() {
      window.print();
    }
    return {
      transaksi,
      f_member,
      f_pegawai,
      f_kelas,
      Api,
      strukType,
      useRoute,
      cetak
    };
  },
};
</script>
