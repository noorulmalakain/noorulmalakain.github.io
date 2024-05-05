// script.js
var backend_url = "https://rtlqdhy3r7kmbxdblsl32pu6ta0oelez.lambda-url.us-west-2.on.aws/";
var APP_VERSION = "0.0.1"
$(document).ready(function(){
  console.log("version: " + APP_VERSION);
  $("#appVersion").text(APP_VERSION);
  // Function to make a GET request to the API and update the paragraph tag
  function callAPI() {
    $.get(backend_url, function(data, status){
      $("#apiResponse").text(data);
    });
  }

  // Event listener for the button click
  $("#fetchButton").click(function(){
    callAPI();
  });
});
