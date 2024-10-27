sikatApp.controller("indikatorMutuListController", function(
  $scope,
  $rootScope,
  $http,
  $location,
  $routeParams
) {

  $rootScope.currPage = "indikatorMutu";
  var today = new Date();
  $scope.bulan = today.getMonth() + 1 + "";
  $scope.tahun = today.getFullYear() + "";


  $scope.addIndikatorMutu = () => {
    $location.url("/b3rs_new");
  };

  $scope.showIndikatorMutu = (id_profilindikator) => {
    $location.url(
      "/indikatorMutu_edit?id_profilindikator=" +
      id_profilindikator
    );
  };

  $scope.loadData = () => {
    $location.url(
      "/indikator_Mutu?bulan=" +
        ($scope.bulan ? $scope.bulan : "") +
        "&tahun=" +
        $scope.tahun +
        "&kodeKamar=" +
        $scope.kodeKamar +
        "&noRekamMedis=" +
        $scope.noRekamMedis +
        "&namaPasien=" +
        $scope.namaPasien +
        "&namaDokter=" +
        $scope.namaDokter +
        "&isRanap=" +
        $scope.isRanap
    );
  };

  $scope.getData = () => {};
  //$scope.getData();

});

sikatApp.controller("indikatorMutuNewController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http
) {
  $rootScope.currPage = "indikatorMutu";
  $scope.noRawat = $routeParams.noRawat;
  $scope.noRekamMedis = $routeParams.noRekamMedis;
  $scope.namaPasien = $routeParams.namaPasien;
  $scope.namaDokter = $routeParams.namaDokter;
  $scope.kodeKamar =
    $routeParams.kodeKamar != "null" ? $routeParams.kodeKamar : "";
  $scope.umur = $routeParams.umur;
  $scope.jenisKelamin = $routeParams.jenisKelamin;
  $scope.caraBayar = $routeParams.caraBayar;
  $scope.tglRegistrasi = $routeParams.tglRegistrasi;
  $scope.petugasList = [];
  $scope.save = () => {
    $http
      .post(
        SERVER_URL + "/api/indikatorMutu",
        {
          tahun: $scope.tahun,
          judulIndikator: $scope.judulIndikator,
          dasarPemikiran: $scope.dasarPemikiran,
          isEfisien: $scope.isEfisien,
          isEfektif: $scope.isEfektif,
          isTepatWaktu: $scope.isTepatWaktu,
          isAman: $scope.isAman,
          isAdil: $scope.isAdil,
          isBerPasien: $scope.isBerPasien,
          isIntegrasi: $scope.isIntegrasi,
          tujuan: $scope.tujuan,
          defPemikiran: $scope.defPemikiran,
          tipeIndikator: $scope.tipeIndikator,
          ukuranIndikator: $scope.ukuranIndikator,
          numerator: $scope.numerator,
          denumerator: $scope.denumerator,
          targetPencapaian: $scope.targetPencapaian,
          kriteria: $scope.kriteria,
          formula: $scope.formula,
          sumberData: $scope.sumberData,
          frekPengumpulan: $scope.frekPengumpulan,
          periodePelaporan: $scope.periodePelaporan,
          periodeAnalisa: $scope.periodeAnalisa,
          metodePengumpulan: $scope.metodePengumpulan,
          populasiSampel: $scope.populasiSampel,
          isiSampel: $scope.isiSampel,
          rencanaAnalisis: $scope.rencanaAnalisis,
          instrumenPengambilan: $scope.instrumenPengambilan,
          penanggungJawab: $scope.penanggungJawab
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then(
        function(data) {
          swal("Success!", "Data is successfully saved.", "success");
          window.history.back();
        },
        function(data) {
          swal("Error!", "Data is failed to be saved.", "error");
        }
      );
  };
  $scope.onSelectedPetugas = item => {
    $scope.petugas = item.nip;
  };
  $scope.searchPetugas = function($select) {
    if ($select.search.length > 0) {
      return $http
        .get(SERVER_URL + "/api/indikatorMutu/allPetugasByQuery", {
          params: {
            searchstr: $select.search
          },
          headers: { Authorization: localStorage.getItem("token") }
        })
        .then(function(response) {
          $scope.petugasList = response.data;
        });
    }
    return false;
  };
});

sikatApp.controller("indikatorMutuEditController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http,
  pmkpService
) {
  $rootScope.currPage = "indikatorMutu";
  $scope.tanggal = $routeParams.tanggal;
  $scope.noRawat = $routeParams.noRawat;
  $scope.noRekamMedis = $routeParams.noRekamMedis;
  $scope.namaPasien = $routeParams.namaPasien;
  $scope.namaDokter = $routeParams.namaDokter;
  $scope.kodeKamar =
    $routeParams.kodeKamar != "null" ? $routeParams.kodeKamar : "";
  $scope.umur = $routeParams.umur;
  $scope.jenisKelamin = $routeParams.jenisKelamin;
  $scope.caraBayar = $routeParams.caraBayar;
  $scope.tglRegistrasi = $routeParams.tglRegistrasi;
  $scope.petugasList = [];
  $scope.insidenList = [];
  $scope.petugasObj = {};
  $scope.insidenObj = {};
  $scope.insiden = "IK001";

  $scope.getData = () => {
    var url =
      SERVER_URL + "/api/indikatorMutu?id=" + $scope.tanggal + ";" + $scope.noRawat;
    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          if (reqRes.data && reqRes.data != "") {
            $scope.noRawat = reqRes.data.no_rawat;
            $scope.petugas = reqRes.data.nip;
            $scope.lokasi = reqRes.data.lokasi;
            $scope.unitTerkait = reqRes.data.unit_terkait;
            $scope.pertamaMelaporkan = reqRes.data.pertama_melaporkan;
            $scope.unitPenyebab = reqRes.data.unit_penyebab;
            $scope.kejadianSebelumnya = reqRes.data.kejadian_sebelumnya;
            $scope.pencegahanTerulang = reqRes.data.pencegahan_terulang;
            $scope.tanggal =
              reqRes.data.tgl_kejadian + " " + reqRes.data.jam_kejadian;
            $scope.tanggalLapor =
              reqRes.data.tgl_lapor + " " + reqRes.data.jam_lapor;
            $scope.insiden = reqRes.data.kode_insiden;
            $scope.identifikasi = reqRes.data.identifikasi_masalah;
            $scope.akibat = reqRes.data.akibat;
            $scope.tindakanInsiden = reqRes.data.tindakan_insiden;
            $scope.rtl = reqRes.data.rtl;
            $scope.namaPenerima = reqRes.data.nm_penerima;
            $scope.tanggalTerima = reqRes.data.tgl_terima;
            $scope.gradingRisiko = reqRes.data.grading_risiko;
            $scope.petugasObj.selected = {
              nip: reqRes.data.nip,
              nama: reqRes.data.nama
            };
            $scope.insidenObj.selected = {
              kode_insiden: reqRes.data.kode_insiden,
              nama_insiden: reqRes.data.nama_insiden,
              jenis_insiden: reqRes.data.jenis_insiden,
              dampak: reqRes.data.dampak
            };
            $scope.jenisInsiden = reqRes.data.jenis_insiden;
            $scope.namaInsiden = reqRes.data.nama_insiden;
            $scope.skorDampak = reqRes.data.skor_dampak;
            $scope.tipeInsiden = reqRes.data.tipe_insiden;
            $scope.subtipeInsiden = reqRes.data.subtipe_insiden;
            $scope.frekuensiKejadian = reqRes.data.frekuensi_kejadian;
            $scope.tindakanOleh = reqRes.data.tindakan_oleh;
          }
        },
        function() {
          $.toast({
            heading: "Error",
            text:
              "Error happen when trying to get data on " +
              url +
              ", please try again or contact support.",
            position: "top-right",
            loaderBg: "#ff6849",
            icon: "error",
            hideAfter: 4000,
            stack: 6
          });
        }
      );
  };
  $scope.update = () => {
    $http
      .put(
        SERVER_URL + "/api/ikpLapor",
        {
          id: $scope.tanggal + ";" + $scope.noRawat,
          no_rawat: $scope.noRawat,
          nip: $scope.petugas,
          lokasi: $scope.lokasi,
          unit_terkait: $scope.unitTerkait,
          pertama_melaporkan: $scope.pertamaMelaporkan,
          unit_penyebab: $scope.unitPenyebab,
          kejadian_sebelumnya: $scope.kejadianSebelumnya,
          pencegahan_terulang: $scope.pencegahanTerulang,
          tgl_kejadian: $scope.tanggal,
          tgl_lapor: $scope.tanggalLapor,
          kode_insiden: $scope.insiden,
          identifikasi_masalah: $scope.identifikasi,
          akibat: $scope.akibat,
          tindakan_insiden: $scope.tindakanInsiden,
          rtl: $scope.rtl,
          nm_penerima: $scope.namaPenerima,
          tgl_terima: $scope.tanggalTerima,
          grading_risiko: $scope.gradingRisiko,
          jenis_insiden: $scope.jenisInsiden,
          nama_insiden: $scope.namaInsiden,
          skor_dampak: $scope.skorDampak,
          tipe_insiden: $scope.tipeInsiden,
          subtipe_insiden: $scope.subtipeInsiden,
          frekuensi_kejadian: $scope.frekuensiKejadian,
          tindakan_oleh: $scope.tindakanOleh
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then(
        function(data) {
          swal("Success!", "Data is successfully updated.", "success");
          window.history.back();
        },
        function(data) {
          swal("Error!", "Data is failed to be updated.", "error");
        }
      );
  };
  $scope.delete = () => {
    var url =
      SERVER_URL +
      "/api/ikpLapor/delete?id=" +
      $scope.tanggal +
      ";" +
      $scope.noRawat;
    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          if (reqRes.data && reqRes.data != "") {
            swal("Success!", "Data is successfully updated.", "success");
            window.history.back();
          }
        },
        function() {
          $.toast({
            heading: "Error",
            text:
              "Error happen when trying to delete data on " +
              url +
              ", please try again or contact support.",
            position: "top-right",
            loaderBg: "#ff6849",
            icon: "error",
            hideAfter: 4000,
            stack: 6
          });
        }
      );
  };
  $scope.downloadExcel = () => {
    const data = {
      direkturName: localStorage.getItem("nama_direktur"),
      direkturNip: localStorage.getItem("nip_direktur"),
      rsName: localStorage.getItem("nama_rumah_sakit"),
      noRawat: $scope.noRawat,
      lokasi: $scope.lokasi,
      unitTerkait: $scope.unitTerkait,
      pertamaMelaporkan: $scope.pertamaMelaporkan,
      unitPenyebab: $scope.unitPenyebab,
      kejadianSebelumnya: $scope.kejadianSebelumnya,
      pencegahanTerulang: $scope.pencegahanTerulang,
      tanggal: $scope.tanggal,
      tanggalLapor: $scope.tanggalLapor,
      insiden: $scope.insiden,
      identifikasi: $scope.identifikasi,
      akibat: $scope.akibat,
      tindakanInsiden: $scope.tindakanInsiden,
      rtl: $scope.rtl,
      namaPenerima: $scope.namaPenerima,
      tanggalTerima: $scope.tanggalTerima,
      gradingRisiko: $scope.gradingRisiko,
      petugas: $scope.petugasObj.selected
        ? $scope.petugasObj.selected.nip +
          " - " +
          $scope.petugasObj.selected.nama
        : "", // nip nama
      jenisInsiden: $scope.jenisInsiden,
      namaInsiden: $scope.namaInsiden,
      skorDampak: $scope.skorDampak,
      tipeInsiden: $scope.tipeInsiden,
      subtipeInsiden: $scope.subtipeInsiden,
      frekuensiKejadian: $scope.frekuensiKejadian,
      tindakanOleh: $scope.tindakanOleh,

      noRekamMedis: $scope.noRekamMedis,
      namaPasien: $scope.namaPasien,
      namaDokter: $scope.namaDokter,
      kodeKamar: $scope.kodeKamar,
      umur: $scope.umur,
      jenisKelamin: $scope.jenisKelamin,
      caraBayar: $scope.caraBayar,
      tglRegistrasi: $scope.tglRegistrasi
    };
    for (let i = 0; i < $scope.jenisInsidenList.length; i += 1) {
      if ($scope.jenisInsidenList[i].id === $scope.jenisInsiden) {
        data.jenisInsiden =
          $scope.jenisInsidenList[i].id +
          " - " +
          $scope.jenisInsidenList[i].nama;
        break;
      }
    }
    for (let i = 0; i < $scope.namaInsidenList.length; i += 1) {
      if ($scope.namaInsidenList[i].id === $scope.namaInsiden) {
        data.namaInsiden =
          $scope.namaInsidenList[i].id + " - " + $scope.namaInsidenList[i].nama;
        break;
      }
    }
    for (let i = 0; i < $scope.skorDampakList.length; i += 1) {
      if ($scope.skorDampakList[i].id === $scope.skorDampak) {
        data.skorDampak =
          $scope.skorDampakList[i].id + " - " + $scope.skorDampakList[i].nama;
        break;
      }
    }
    for (let i = 0; i < $scope.tipeInsidenList.length; i += 1) {
      if ($scope.tipeInsidenList[i].id === $scope.tipeInsiden) {
        data.tipeInsiden =
          $scope.tipeInsidenList[i].id + " - " + $scope.tipeInsidenList[i].nama;
        break;
      }
    }
    for (let i = 0; i < $scope.subtipeInsidenList.length; i += 1) {
      if ($scope.subtipeInsidenList[i].id === $scope.subtipeInsiden) {
        data.subtipeInsiden =
          $scope.subtipeInsidenList[i].id +
          " - " +
          $scope.subtipeInsidenList[i].nama;
        break;
      }
    }
    for (let i = 0; i < $scope.frekuensiKejadianList.length; i += 1) {
      if ($scope.frekuensiKejadianList[i].id === $scope.frekuensiKejadian) {
        data.frekuensiKejadian =
          $scope.frekuensiKejadianList[i].id +
          " - " +
          $scope.frekuensiKejadianList[i].nama;
        break;
      }
    }
    for (let i = 0; i < $scope.tindakanOlehList.length; i += 1) {
      if ($scope.tindakanOlehList[i].id === $scope.tindakanOleh) {
        data.tindakanOleh =
          $scope.tindakanOlehList[i].id +
          " - " +
          $scope.tindakanOlehList[i].nama;
        break;
      }
    }
    const url = REPORT_URL + "/xlsx/ikpLapor";
    pmkpService.postDownload(url, data, "ikpLapor.xlsx");
  };
  $scope.onSelectedPetugas = item => {
    $scope.petugas = item.nip;
  };
  $scope.onTaggingPetugas = namaPetugas => {
    return {
      nip: namaPetugas,
      nama: ""
    };
  };
  $scope.searchPetugas = function($select) {
    if ($select.search.length > 0) {
      return $http
        .get(SERVER_URL + "/api/ikpLapor/allPetugasByQuery", {
          params: {
            searchstr: $select.search
          },
          headers: { Authorization: localStorage.getItem("token") }
        })
        .then(function(response) {
          $scope.petugasList = response.data;
        });
    }
    return false;
  };
  $scope.getAllJenisInsiden();
  $scope.getAllNamaInsiden();
  $scope.getAllSkorDampak();
  $scope.getAllTipeInsiden();
  $scope.getAllSubtipeInsiden();
  $scope.getAllFrekuensiKejadian();
  $scope.getAllTindakanOleh();
  $scope.getData();
});