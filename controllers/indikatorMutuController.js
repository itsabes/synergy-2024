sikatApp.controller("indikatorMutuListController", function(
  $scope,
  $rootScope,
  $http,
  $filter,
  $location,
  $routeParams,
  NgTableParams
) {

  $rootScope.currPage = "indikatorMutu";
  $rootScope.currPageParam = $routeParams.param;
  $scope.profileType = {};

  $scope.tahun = "";
  if ($routeParams.tahun) 
    $scope.tahun = $routeParams.tahun;

  $scope.unit = "";
  if ($routeParams.unit) 
    $scope.unit = $routeParams.unit;

  $scope.yearDynamic = [];
  const startYear = 2016;
  const currentYear = new Date().getFullYear();
  $scope.currentYear = currentYear;
  for (let year = startYear; year <= currentYear; year++) {
      $scope.yearDynamic.push(year);
  }
  

  $scope.tableParams = new NgTableParams({}, { dataset: [] });
  $scope.loadData = () => {
    $location.url(
      "/indikatorMutu?tahun=" +
        ($scope.tahun ? $scope.tahun : "") +
        "&unit=" +
        ($scope.unit ? $scope.unit : "")
    );
  };

  $scope.addIndikatorMutu = () => {
    $location.url("/indikatorMutu_new");
  };
    
  $scope.getData = () => {

    var url = SERVER_URL + "/api/dynamic/getByQuery?q=0";
    if ($scope.tahun) 
      url += "&tahun=" + $scope.tahun;

    if ($scope.unit) 
      url += "&unit=" + $scope.unit;
    
    $http
      .get(url, { headers: { Authorization: localStorage.getItem("token") } })
      .then(
        function(reqRes) {
          if (reqRes.data && reqRes.data != "") {
            $scope.tableParams = new NgTableParams(
              {},
              { dataset: reqRes.data }
            );
          } else {
            $scope.tableParams = new NgTableParams({}, { dataset: [] });
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

  $scope.getProcessTypeData = (callbackFunc) => {
    var result = { data: null };

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Open a synchronous GET request
    xhr.open("GET", SERVER_URL + "/api/dynamic/getProcessType", false); // `false` makes it synchronous

    // Set headers if needed
    xhr.setRequestHeader("Authorization", localStorage.getItem("token"));

    try {
        // Send the request
        xhr.send();

        // Check the response status
        if (xhr.status === 200) {
            // Parse the response data if it is in JSON format
            result.data = JSON.parse(xhr.responseText);
            //console.log("Received data:", result.data);

        } else {
            console.error("Error occurred: " + xhr.statusText);
        }
    } catch (error) {
        console.error("Error occurred during AJAX call: ", error);
    }

    // Call the callback function with the result
    callbackFunc(result);
  };

  $scope.getProcessTypeData(result => {
    if (result) {
      $scope.profileType = result.data;
    } else {
      console.log("No data or error occurred.");
    }
  });

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
  console.log("Received data:", $scope.profileType);

});