// script.js
var backend_url = "https://dxsjbch7nswfqybw6kdevtvmby0luwxp.lambda-url.us-west-2.on.aws/";
var APP_VERSION = "0.0.3"

// Function to fetch data from the API
function loadData(elem) {
  dataType = elem.attr('blog-data-type')
  dataId = elem.attr('blog-data-id')
  console.log("loadData - dataType: " + dataType);
  console.log("loadData - dataId: " + dataId);
  $.ajax({
    url: backend_url,
    method: "GET",
    async: false, // Ensure asynchronous request
    // headers: {
    //   "authentication": "Authentication" // Add your custom header here
    // },
    data: {
      "dataType": dataType,
      "dataId": dataId
    },
    success: function(data, textStatus, xhr){
      // Once data is received successfully, display it in the body tag
      // console.log(JSON.stringify(data));
      // console.log(JSON.stringify(xhr));
      console.log(JSON.stringify(textStatus));
      displayData(elem, dataType, dataId, data);
    },
    error: function(xhr, textStatus, errorThrown){
      // Display an error message if request fails
      console.log("Failed to fetch data from the API.");
      // console.log(JSON.stringify(xhr));
      console.log(JSON.stringify(textStatus));
      // console.log(JSON.stringify(errorThrown));
      return([]);
    }
  });
}

function displayData(elem, dataType, dataId, data) {
  if (dataId == "0"){
    loadPostsList(elem, data);
  } else {
    loadPostData(elem, data)
  }
}

function loadPostsList(elem, postsList){
  // console.log("loadPostsList - elem blog-data-type: " + elem.attr('blog-data-type'));
  // console.log("loadPostsList - elem blog-data-id: " + elem.attr('blog-data-id'));
  // console.log("loadPostsList - postLists: " + JSON.stringify(postsList));
  for (let post of postsList) {
    newPost = generatePostItem(post, elem.attr('blog-data-type'));
    $("#" + elem.attr("blog-data-type") + "CardBody").append(newPost);
  }
}

function generatePostItem(post, postType){
  startButtonComment = '<!-- start ' + post['id'] +' collapse button -->';
  postBlurb = '<p>' + post['blurb'] + '</p>'
  postTitle = '<p><a class="btn btn-primary blogpost" blog-data-type="' + postType + '" blog-data-id="' + post['id'] + '" data-bs-toggle="collapse" href="#' + post['id'] + 'Collapse" role="button" aria-expanded="false" aria-controls="' + post['id'] + 'Collapse">' + post['title'] + '</a></p>'
  endButtonComment = '<!-- end ' + post['id'] +' collapse button -->'
  startBodyComment = '<!-- start ' + post['id'] +' collapse body -->'
  postBody = '<div class="collapse" id="' + post['id'] +'Collapse"><div class="card card-body" id="' + post['id'] + 'CardBody"><p>Loading...</p></div></div><br>'
  endBodyComment = '<!-- end ' + post['id'] +' collapse body -->'
  post = startButtonComment + '\n' + postBlurb + postTitle + endButtonComment + startBodyComment + postBody + endBodyComment
  return post
}

function loadPostData(elem, post){
  // postText = "newPostText for " + elem.attr("blog-data-id");
  console.log("loadPostData - post: " + JSON.stringify(post));
  $("#" + post['id'] + "CardBody").html(post['body']);
}

$(document).ready(function(){
  console.log("version: " + APP_VERSION);
  $("#appVersion").text(APP_VERSION);
  // Event listener for the button click
  $("a.btn.btn-primary.mainblog").on("click", function(){
    if ($(this).hasClass("collapsed") || $(this).hasClass("data-loaded")){
      console.log("Collapsing item or data already loaded - no need to load items");
      return;
    }
    buttonText = $(this).text();
    $(this).text("Loading...");
    loadData($(this));
    $(this).text(buttonText);
    $(this).addClass("data-loaded");
  });
  // Event listener for the button click
  $("body").on("click", "a.btn.btn-primary.blogpost", function(){
    console.log("mainClass: " + $(this).attr("class"));
    console.log("mainClass: " + $(this).attr("blog-data-type"));
    console.log("mainClass: " + $(this).attr("blog-data-id"));
    console.log("mainClass: " + $(this).attr("aria-controls"));
    if ($(this).hasClass("collapsed") || $(this).hasClass("data-loaded")){
      console.log("Collapsing item or data already loaded - no need to load items");
      return;
    }
    loadData($(this));
    $(this).addClass("data-loaded");
  });
  $("button[type|='search']").on("click", function(){
    console.log("mainClass: " + $(this).attr("class"));
  });
});
