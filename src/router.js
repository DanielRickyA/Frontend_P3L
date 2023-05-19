//import vue router
import { createRouter, createWebHistory } from 'vue-router'
//define a routes
// const routes = [
//   {
//     path: "/",
//     name: "Login",
//     component: () => import("@/views/LoginPegawai.vue"),
//     // children: [
//     //   {
//     //     path: "/MemberView.index",
//     //     name: "indexMemberView",
//     //     component: () => import("@/views/Kasir/MemberView.vue"),
//     //   },
//     //   // {
//     //   //   path: "/departemen/create",
//     //   //   name: "departemen.create",
//     //   //   component: () => import("@/views/Departemen/createPage.vue"),
//     //   // },
//     // ],
//   },
//   {
//     path: "/MemberView.index",
//     name: "indexMemberView",
//     component: () => import("@/views/Kasir/MemberView.vue"),
//   },
// ];

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/LoginPegawai.vue"),
  },

  {
    // sidebar untuk MO
    path: "/",
    name: "mo",
    component: () => import("@/components/SidebarMO.vue"),
    children: [
      {
        path: "/JadwalView.index",
        name: "indexJadwalView",
        component: () => import("@/views/MO/JadwalView.vue"),
      },
      {
        path: "/JadwalView.create",
        name: "createJadwalView",
        component: () => import("@/views/MO/JadwalCreate.vue"),
      },
      {
        path: "/JadwalHarianView.index",
        name: "indexJadwalHarianView",
        component: () => import("@/views/MO/JadwalHarianView.vue"),
      },
      {
        path: "/PerizinanView.index",
        name: "indexPerizinanView",
        component: () => import("@/views/MO/PerizinanInstrukturView.vue"),
      },
    ],
  },

  {
    // sidebar untuk kasir
    path: "/",
    name: "kasir",
    component: () => import("@/components/SidebarKasir.vue"),
    children: [
      {
        path: "/MemberView.index",
        name: "indexMemberView",
        component: () => import("@/views/Kasir/MemberView.vue"),
      },
      {
        path: "/MemberCreate.create",
        name: "createMemberView",
        component: () => import("@/views/Kasir/MemberCreate.vue"),
      },
      {
        path: "/AktivasiView.index",
        name: "AktivasiView",
        component: () => import("@/views/Kasir/TransaksiView.vue"),
      },
      {
        path: "/TransaksiDeposit.index",
        name: "DepoView",
        component: () => import("@/views/Kasir/TransaksiDepoView.vue"),
      },
      {
        path: "/TransaksiDepositUang.index",
        name: "DepoUangView",
        component: () => import("@/views/Kasir/TransaksiDepoUang.vue"),
      },
      {
        path: "/TransaksiDepositKelas.index",
        name: "DepoKelasView",
        component: () => import("@/views/Kasir/TransaksiDepoKelas.vue"),
      },
      {
        path: "/StrukTransaksi.index",
        name: "StrukTransaksiView",
        component: () => import("@/views/Kasir/StrukTransaksi.vue"),
      },
    ],
  },

  {
    // sidebar untuk admin
    path: "/",
    name: "admin",
    component: () => import("@/components/SidebarAdmin.vue"),
    children: [
      {
        path: "/InstrukturView.index",
        name: "indexInstrukturView",
        component: () => import("@/views/Admin/InstrukturView.vue"),
      },
      {
        path: "/InstrukturCreate.index",
        name: "createInstrukturView",
        component: () => import("@/views/Admin/InstrukturCreate.vue"),
      },
    ],
  },
];



//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // config routes
});
export default router;