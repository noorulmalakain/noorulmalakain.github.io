// script.js
var backend_url = "https://rtlqdhy3r7kmbxdblsl32pu6ta0oelez.lambda-url.us-west-2.on.aws/";
var APP_VERSION = "0.0.2"

// Function to fetch data from the API
function fetchData() {
  $.ajax({
      url: backend_url,
      method: "GET",
      async: true, // Ensure asynchronous request
      headers: {
          "authentication": "Authentication" // Add your custom header here
      },
      success: function(data){
          // Once data is received successfully, display it in the body tag
          $("#apiResponse").text(data);
          // $("body").html(JSON.stringify(data));
      },
      error: function(){
          // Display an error message if request fails
          // $("body").html("Failed to fetch data from the API.");
          console.log("Failed to fetch data from the API.");
      }
  });
}

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
    fetchData();
  });
});
