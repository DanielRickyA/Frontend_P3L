<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <div class="m-0 w-100">
          <div>
            <div class="d-flex justify-content-between w-100">
              <div>
                <p class="mb-0"><strong>Gofit</strong></p>
                <p>Jl. Centralpark No. 10 Yogyakarta</p>
              </div>
              <div class="" @click="cetak()">
                <button class="btn btn-success">
                  <i class="fas fa-print"></i> Print Cetak
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-start mb-1">
          <div>
            <p class="mb-0">
              <strong><u>LAPORAN AKTIVITAS KELAS BULANAN</u></strong>
            </p>
            <p class="mb-0">PERIODE: {{ tahun }}</p>
            <p>Tanggal cetak: {{ tanggalCetak }}</p>
          </div>
        </div>
        <div
          class="table-responsive overflow-y-scroll"
          style="max-height: 50vh"
        >
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
                <td>{{ daftarBulan[Laporan.Bulan - 1] }}</td>
                <td>
                  {{
                    Number(Laporan.Aktivasi).toLocaleString("id-ID", options)
                  }}
                </td>
                <td>
                  {{ Number(Laporan.Deposit).toLocaleString("id-ID", options) }}
                </td>
                <td>
                  {{ Number(Laporan.Total).toLocaleString("id-ID", options) }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-center mb-2" v-if="loading">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden"></span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    <div class="card mt-2">
      <div class="card-body">
        <Bar
            v-if="loading === false"
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
          />
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import { reactive, onMounted, ref } from "vue";
import * as Api from "../ApiHelper";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
// import { useRouter } from 'vue-router'
import axios from "axios";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  setup() {
    let Laporans = ref([]);
    let selectedMonth = ref("");
    let total = ref(0);
    const tahun = ref("");
    const bulan = ref("");
    const tanggalCetak = ref("");
    let aktivasis = reactive(new Array(12).fill(0));
    let deposits = reactive(new Array(12).fill(0));
    let totals = reactive(new Array(12).fill(0));

    let chartData = {
      labels: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
      datasets: [
        {
          label: "Aktivasi",
          backgroundColor: "#f87979",
          data: aktivasis,
        },
        {
          label: "Deposit",
          backgroundColor: "#7CFC00",
          data: deposits,
        },
        {
          label: "Total",
          backgroundColor: "#00FFFF",
          data: totals,
        },
      ],
    };

    const daftarBulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const loading = ref(true);

    function setDefaultMonth() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      selectedMonth.value = `${year}-${month}`;
    }

    function getData() {
      loading.value = true;
      tahun.value = selectedMonth.value.substring(0, 4);
      bulan.value =
        daftarBulan[parseInt(selectedMonth.value.substring(5, 7)) - 1];
      tanggalCetak.value = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      axios
        .get(Api.BASE_URL + "/LaporanDana", {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          total.value = 0;
          Laporans.value = response.data.data;
          for (let i = 0; i < response.data.data.length; i++) {
            total.value += response.data.data[i].jumlah_member;
          }

          aktivasis = Array.from({ length: 12 }, (_, index) => {
            const bulanData = response.data.data.find(
              (data) => data.Bulan === index + 1
            );
            return bulanData ? Number(bulanData.Aktivasi) : 0;
          });

          deposits = Array.from({ length: 12 }, (_, index) => {
            const bulanData = response.data.data.find(
              (data) => data.Bulan === index + 1
            );
            return bulanData ? Number(bulanData.Deposit) : 0;
          });

          totals = Array.from({ length: 12 }, (_, index) => {
            const bulanData = response.data.data.find(
              (data) => data.Bulan === index + 1
            );
            return bulanData ? Number(bulanData.Total) : 0;
          });

          chartData.datasets[0].data = aktivasis;
          chartData.datasets[1].data = deposits;
          chartData.datasets[2].data = totals;

          console.log(aktivasis);

          loading.value = false;
          // console.log(response);
        })
        .catch((error) => {
          toastr.error(error.response.data.message);
          loading.value = false;
          // console.log(error.response);
        });
    }
    function cetak() {
      window.print();
    }

    onMounted(async () => {
      setDefaultMonth();
      getData();
    });

    return {
      aktivasis,
      selectedMonth,
      Laporans,
      total,
      tahun,
      bulan,
      tanggalCetak,
      daftarBulan,
      getData,
      cetak,
      loading,
      options: {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
      chartData,
      chartOptions: {
        responsive: true,
      },
    };
  },
};
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
    display: none !important;
  }
  /* remove the scroll */
  .table-responsive {
    overflow: visible !important;
    max-height: 100% !important;
    max-width: 100% !important;
  }
  .card {
    border: none !important;
    box-shadow: none !important;
  }
  /* remove sidebar */
  .sidebar {
    display: none;
  }

 #content{
  width: 100%;
 }
}
</style>
