const Recipe = () => {
  return <div>[id]</div>;
};

export default Recipe;

// <!DOCTYPE html>
// <html lang="en">

// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <!-- og tags -->
//   <meta property="og:title" content="<%= `Fill the Fridge: ${name}` %>" />
//   <meta property="og:url" content=<%=link %> />
//   <meta property="og:image" content=<%=image %> />
//   <meta property="og:type" content="article" />
//   <meta property="og:description" content="<%= `${reciep.substr(0, 127)}...` %>" />
//   <!-- Bootstrap CSS -->
//   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
//     integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />
//   <link rel="stylesheet" href="/assets/css/input.css" />
//   <link rel="stylesheet" href="/assets/css/fullreciep.css" />
//   <!-- Bootstrap JavaScript and JQuery-->
//   <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
//     integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
//     crossorigin="anonymous"></script>
//   <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
//     integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
//     crossorigin="anonymous"></script>
//   <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
//     integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
//     crossorigin="anonymous"></script>
//   <script
//     src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCYsL3NtRxHucdRBUKgnmP5m0QQcTnjM3s&libraries=places"></script>

//   <script src="/assets/js/main.js" type="module"></script>
//   <title>
//     <%= `Fill the Fridge: ${name}` %>
//   </title>
// </head>

// <body>
//   <div class="container mt-4">
//     <div class="d-flex flex-row justify-content-between ">
//       <h3 class="font-weight-bold">
//         <a href="/" class="text-black">Fill the Fridge</a>
//       </h3>
//       <div style="height: 100%; display: flex; align-items: center;">
//         <button class="btn btn-success cleaner ml-3">Clear the Fridge</button>
//         <button class="help text-black ml-3 mr-1 bg-white border-0">?</button>
//       </div>
//     </div>
//   </div>
//   </div>
//   <div class="container h-100 mt-4">
//     <form class="form-inline w-100 tag-container">
//       <input type="text" class="form-control" id="inputIngredients" />
//       <button type="submit" class="btn btn-primary submit">
//         Search recieps
//       </button>
//     </form>
//   </div>
//   <div class="d-flex justify-content-center mt-4" id="reloading"></div>
//   <div class="container mt-4 container-infinite mb-4">
//     <div class="toDelete d-flex">
//       <div class="fullreciep" id="reciepContent">
//         <div class="backbutton d-none" id="dropmarkers">
//           <button type="button" class="rounded-circle material-icons btn btn-light">
//             navigate_before
//           </button>
//         </div>
//         <div class="container">
//           <div id="wholemodalReciep">
//             <div class="row articleName mt-2 mb-2 border-bottom">
//               <div class="col-12">
//                 <h1>
//                   <%= `Fill the Fridge: ${name}` %>
//                 </h1>
//               </div>
//             </div>
//             <div class="row mt-2 mb-4">
//               <div class="col-12 col-md-5 col-lg-6 image">
//                 <img src="<%= image %>" alt="" class="img-fluid rounded" style="height: auto;" />
//               </div>
//               <div class="col-12 col-md-7 col-lg-6 mt-2 mt-md-0  h-100">
//                 <div id="allStores"></div>
//                 <button class="btn btn-primary btn-block" id="openMap">See on Map</button>
//               </div>
//             </div>
//             <div class="row ingredientsSingle">
//               <div class="col-12 col-md-9 col-lg-6">
//                 <ul class="list-group" id="allIngs">
//                   <%for (const element of ingredients) {%>
//                     <li class="list-group-item"><span>
//                         <%= element.item %>
//                       </span>&mdash;<%= element.amount %>
//                     </li>
//                     <% }%>
//                 </ul>
//               </div>
//             </div>
//             <div class="row">
//               <div class="col-12">
//                 <p>
//                   <%= reciep %>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div class="modal-content d-none" id="mapPopup">
//         <div class="modal-body" style="padding: 0.5rem;">
//           <div id="map"></div>
//         </div>
//       </div>
//     </div>

//     <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3" id="search-results-container"></div>
//     <div class="d-flex justify-content-center" id="loading"></div>
//   </div>
//   <div class="container container-popup"></div>
// </body>

// </html>
