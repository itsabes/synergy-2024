sikatApp.controller("indikatorMutuListController", function(
  $scope,
  $rootScope,
  $routeParams,
  $http
) {
  $rootScope.currPage = "ppi";
  $rootScope.currPageParam = $routeParams.param;
  $scope.tanggal = $routeParams.tanggal;
  $scope.noRawat = $routeParams.noRawat;
  $scope.noRekamMedis = $routeParams.noRekamMedis;
  $scope.namaPasien = $routeParams.namaPasien;
  $scope.namaDokter = $routeParams.namaDokter;
  $scope.kodeKamar =
    $routeParams.kodeKamar != "null" ? $routeParams.kodeKamar : "";
  $scope.getData = () => {
    var url =
      SERVER_URL + "/api/ppi?id=" + $scope.tanggal + ";" + $scope.noRawat;
    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          if (reqRes.data && reqRes.data != "") {
            $scope.ett = reqRes.data.ETT - 0;
            $scope.cvl = reqRes.data.CVL - 0;
            $scope.ivl = reqRes.data.IVL - 0;
            $scope.uc = reqRes.data.UC - 0;
            $scope.vap = reqRes.data.VAP - 0;
            $scope.iad = reqRes.data.IAD - 0;
            $scope.pleb = reqRes.data.PLEB - 0;
            $scope.isk = reqRes.data.ISK - 0;
            $scope.ilo = reqRes.data.ILO - 0;
            $scope.hap = reqRes.data.HAP - 0;
            $scope.tinea = reqRes.data.Tinea - 0;
            $scope.scabies = reqRes.data.Scabies - 0;
            $scope.deku = reqRes.data.DEKU;
            $scope.sputum = reqRes.data.SPUTUM;
            $scope.darah = reqRes.data.DARAH;
            $scope.urine = reqRes.data.URINE;
            $scope.antibiotik = reqRes.data.ANTIBIOTIK;
            $scope.kd_kamar = reqRes.data.kd_kamar;
            $scope.tanggalSampel = reqRes.data.tgl_sampel;
            $scope.tanggalKirim = reqRes.data.tgl_kirim;
            $scope.tanggalHasil = reqRes.data.tgl_hasil;
            $scope.mdr = reqRes.data.MDR - 0;
            $scope.difteri = reqRes.data.DIFTERI - 0;
            $scope.konsentrat = reqRes.data.KONSENTRAT;
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
        SERVER_URL + "/api/ppi",
        {
          id: $scope.tanggal + ";" + $scope.noRawat,
          ett: $scope.ett,
          cvl: $scope.cvl,
          ivl: $scope.ivl,
          uc: $scope.uc,
          vap: $scope.vap,
          iad: $scope.iad,
          pleb: $scope.pleb,
          isk: $scope.isk,
          ilo: $scope.ilo,
          hap: $scope.hap,
          tinea: $scope.tinea,
          scabies: $scope.scabies,
          deku: $scope.deku,
          sputum: $scope.sputum,
          darah: $scope.darah,
          urine: $scope.urine,
          antibiotik: $scope.antibiotik,
          kd_kamar: $scope.kodeKamar != "" ? $scope.kodeKamar : null,
          tgl_sampel: $scope.tanggalSampel,
          tgl_kirim: $scope.tanggalKirim,
          tgl_hasil: $scope.tanggalHasil,
          mdr: $scope.mdr,
          difteri: $scope.difteri,
          konsentrat: $scope.konsentrat
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
      "/api/ppi/delete?id=" +
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
  $scope.backToList = () => {
    window.history.back();
  };
  $scope.getData();
});