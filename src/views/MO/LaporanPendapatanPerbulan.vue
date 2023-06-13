<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3 border-bottom "
  >
    <h1 class="h2">Laporan aktivitas Kelas bulanan</h1>
  </div>

  <div class="container">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-start mb-1">
          <div>
            <p class="mb-0"><strong>Gofit</strong></p>
            <p>Jl. Centralpark No. 10 Yogyakarta</p>
          </div>
        </div>
        <div class="d-flex justify-content-start mb-1">
          <div>
            <p class="mb-0"><strong><u>LAPORAN AKTIVITAS KELAS BULANAN</u></strong></p>
            <p class="mb-0">PERIODE: {{ tahun }}</p>
            <p>Tanggal cetak: {{tanggalCetak}}</p>
          </div>
        </div>

        <table class="table table-striped table-bordered mt4">
              <thead class="thead-dark">
                <tr class="text-dark table-secondary">
                  <th scope="col">Bulan</th>
                  <th scope="col">Aktivasi</th>
                  <th scope="col">Deposit</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(Laporan, id) in Laporans" :key="id">
                  <td>{{ daftarBulan[Laporan.Bulan-1]}}</td>
                  <td>{{ Number(Laporan.Aktivasi).toLocaleString('id-ID', options) }}</td>
                  <td>{{ Number(Laporan.Deposit).toLocaleString('id-ID', options) }}</td>
                  <td>{{ Number(Laporan.Total).toLocaleString('id-ID', options) }}</td>
                </tr>
              </tbody>
        </table>
      </div>
    </div>
    <div class="d-flex justify-content-end mt-2 " @click="cetak()">
      <button class="btn btn-success">
        <i class="fas fa-print"></i> Print Cetak
      </button>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import { onMounted, ref } from "vue";
import * as Api from "../ApiHelper";
import toastr from "toastr";
import "toastr/build/toastr.min.css";



// import { useRouter } from 'vue-router'
import axios from "axios";

export default {
    setup() {
        let Laporans = ref([]);
        let selectedMonth = ref('');
        let total = ref(0);
        const tahun = ref('')
        const bulan = ref('')
        const tanggalCetak = ref('')
        const daftarBulan = [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember',
        ]

        function setDefaultMonth() {
            const today = new Date();
            const year = today.getFullYear();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            selectedMonth.value = `${year}-${month}`;
        }

        function getData(){
            tahun.value = selectedMonth.value.substring(0, 4);
            bulan.value = daftarBulan[parseInt(selectedMonth.value.substring(5, 7)) - 1];
            tanggalCetak.value = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
            
            axios.get(Api.BASE_URL+ '/LaporanDana' , {
                 headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }).then((response) => {
                total.value = 0;
                Laporans.value = response.data.data;
                for (let i = 0; i < response.data.data.length; i++) {
                    total.value += response.data.data[i].jumlah_member;
                }
                
                // console.log(response);
            }).catch((error) => {
                toastr.error(error.response.data.message);
                // console.log(error.response);
            });
        }
        function cetak() {
            window.print();
        }
        
        onMounted(async () => {
            setDefaultMonth();
            getData();
        })

        return {
            selectedMonth,
            Laporans,
            total,
            tahun,
            bulan,
            tanggalCetak,
            daftarBulan,
            getData,
            cetak,
            options : {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }
            
        }
    }
}

</script>

<style>
.table_p0 td {
  padding: 0;
}

@media print {
  .btn {
    display: none;
  }
  .cari {
    display: none  !important;;
  }
}


</style>
