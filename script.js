// script.js
$(document).ready(function(){
  console.log("version: 0.01");
  // Function to make a GET request to the API and update the paragraph tag
  function callAPI() {
      $.get("https://api.example.com/data", function(data, status){
          $("#apiResponse").text(data);
      });
  }

  // Event listener for the button click
  $("#fetchButton").click(function(){
      callAPI();
  });
});
