
 class UserController {
   constructor() {
     this.search();
     this.trending(1);
     
     this.mobileDetails();
     this.desktopDetails();
   }

   trending(page){
      // Request for trending movies
      $.ajax({
        url:
          "https://api.themoviedb.org/3/trending/movie/day?language=pt-BR&query=" +
         
          "&page=" +
          page +
          "&include_adult=false",
        data: { api_key: "d427e3268c3ecbbf7270e830e4a8dc47" },
        dataType: "json",
        success: function (result, status, xhr) {
          $(".error-message").css({display: "none"});

          var resultHtml = $('<section class="container grid grid-template-columns-1" id="desktop-section">');

          // For each result, a card with the movie information is displayed
          for (let i = 0; i < result["results"].length; i++) {
            // formatting the date
            var releaseDate = moment(result["results"][i]["release_date"]).locale('pt').format('LL');

            var image =
              result["results"][i]["poster_path"] == null
                ? "Image/no-image.png"
                : "https://image.tmdb.org/t/p/w500/" +
                  result["results"][i]["poster_path"];
            var title = 
              result["results"][i]["original_name"] == null
              ? result["results"][i]["title"]
              : result["results"][i]["original_name"];

            resultHtml.append(
             '<div class="item " resourceId="' + 
               result["results"][i]["id"] +
               '">' +
               '<div class="card" style="width: 11rem">' +
               '<img class="card-img-top" alt="Card image cap" src="' +
               image +
               '" />' + 
               '<div class="card-body">' +
              ' <h5 class="card-title">' +
                title +
               '</h5>'+ 
               '<span class="card-text">'+ releaseDate + '</span>'
               +
              '</div>'
              +'<p id="note">' + result["results"][i]["vote_average"] + '</p>'
              +'</div>'

            );
          
          }
           resultHtml.append("</section>");
           $("#content").html(resultHtml);
            // Mobile version, using different type of <section>
            var resultHtml2 = $('<section class="grid grid-template-rows-1" id="mobile-section">');

            for (let i = 0; i < result["results"].length; i++) {
              var releaseDate = moment(result["results"][i]["release_date"]).locale('pt').format('LL');

              var image =
                result["results"][i]["poster_path"] == null
                  ? "Image/no-image.png"
                  : "https://image.tmdb.org/t/p/w500/" +
                    result["results"][i]["poster_path"];

              var title = 
                result["results"][i]["original_name"] == null
                  ? result["results"][i]["title"]
                  : result["results"][i]["original_name"];
            
              resultHtml2.append(
                '<div class="item " resourceId="' + 
                  result["results"][i]["id"] +
                  '">' +
                  '<div class="card">' +
                  '<img class="card-img-top" alt="Card image cap" src="' +
                  image +
                  '" />' + 
                  '<div class="card-body">' +
                ' <h5 class="card-title">' +
                title +
                  '</h5>'+ 
                  '<span class="card-text">'+ releaseDate + '</span>'
                  +
                  '</div>'
                  +'<p id="note">' + result["results"][i]["vote_average"] + '</p>'
                  +'</div>'

              );
                        
            }
            resultHtml2.append("</section>");
            $("#mobile-content").html(resultHtml2);

        },
        error: function (xhr, status, error) {
          $("#message").html(
            "Result: " +
              status +
              " " +
              error +
              " " +
              xhr.status +
              " " +
              xhr.statusText
          );
        },
      });
    } 

   search(){

    $("#submit").click(function (e) {
      var validate = Validate();
      $("#content").html(validate);
      if (validate.length == 0) {
        CallAPI(1);
      }
    });

  
      function CallAPI(page) {
        $.ajax({
          url:
            "https://api.themoviedb.org/3/search/movie?language=pt-BR&query=" +
            $("#search-bar").val() +
            "&page=" +
            page +
            "&include_adult=false",
          data: { api_key: "d427e3268c3ecbbf7270e830e4a8dc47" },
          dataType: "json",
          success: function (result, status, xhr) {
            $("#movie-details").css({display: "none"});
            $("#content").css({display: "block"});
            $("#mobile-content").css({display: "block"});

            $(".error-message").css({display: "none"});
            // For each result, a card with the movie information is displayed

            var resultHtml = $('<section class="container grid grid-template-columns-1" id="desktop-section">');
            for (let i = 0; i < result["results"].length; i++) {
              // formatting the date
              var releaseDate = moment(result["results"][i]["release_date"]).locale('pt').format('LL');
              var image =
                result["results"][i]["poster_path"] == null
                  ? "Image/no-image.png"
                  : "https://image.tmdb.org/t/p/w500/" +
                    result["results"][i]["poster_path"];
              var title = 
                result["results"][i]["original_name"] == null
                  ? result["results"][i]["title"]
                  : result["results"][i]["original_name"];
      
              resultHtml.append(
                '<div class="item " resourceId="' + 
                result["results"][i]["id"] +
                '">' +
                '<div class="card" style="width: 11rem">' +
                '<img class="card-img-top" alt="Card image cap" src="' +
                image +
                '" />' + 
                '<div class="card-body">' +
              ' <h5 class="card-title">' +
              title +
                '</h5>'+ 
                '<span class="card-text">'+ releaseDate + '</span>'
                +
                '</div>'
                +'<p id="note">' + result["results"][i]["vote_average"] + '</p>'
                +'</div>'
              );
            }

            resultHtml.append("</section>");
            $("#content").html(resultHtml);
            // Mobile version, using different type of <section>
            var resultHtml2 = $('<section class="grid grid-template-rows-1" id="mobile-section">');
            // For each result, a card with the movie information is displayed
            for (let i = 0; i < result["results"].length; i++) {
              var releaseDate = moment(result["results"][i]["release_date"]).locale('pt').format('LL');
              var image =
                result["results"][i]["poster_path"] == null
                  ? "Image/no-image.png"
                  : "https://image.tmdb.org/t/p/w500/" +
                    result["results"][i]["poster_path"];
              var title = 
                result["results"][i]["original_name"] == null
                  ? result["results"][i]["title"]
                  : result["results"][i]["original_name"];
      
              resultHtml2.append(
                '<div class="item" resourceId="' + 
                result["results"][i]["id"] +
                '">' +
                '<div class="card">' +
                '<img class="card-img-top" alt="Card image cap" src="' +
                image +
                '" />' + 
                '<div class="card-body">' +
              ' <h5 class="card-title">' +
              title +
                '</h5>'+ 
                '<span class="card-text">'+ releaseDate + '</span>'
                +
                '</div>'
                +'<p id="note">' + result["results"][i]["vote_average"] + '</p>'
                +'</div>'
              );
            }

            resultHtml2.append("</section>");
            $("#mobile-content").html(resultHtml2);


            // Paging(result["total_pages"]);
          },
          error: function (xhr, status, error) {
            $("#message").html(
              "Result: " +
                status +
                " " +
                error +
                " " +
                xhr.status +
                " " +
                xhr.statusText
            );
          },
        });
      }

      function Validate() {
        var errorMessage = "";
        if ($("#search-bar").val() == "") {
          $(".error-message").css({display: "block"});
        }
        return errorMessage;
      }

  }
  
  desktopDetails(){
      $(document).ready(function () {
        $("#trending").click(function (e) {
          location.reload();
        });
        // Getting the movie id onclick
        $("#content").on("click", ".item", function () {
          var resourceId = $(this).attr("resourceId");
          // Searching the information abot the movie
          $.ajax({
            url:
              "https://api.themoviedb.org/3/movie/" +
              resourceId +
              "?language=pt-BR",
            data: {
              api_key: "d427e3268c3ecbbf7270e830e4a8dc47",
            },
            dataType: "json",
            success: function (result, status, xhr) {
             $("#content").css({display: "none"});
             $("#mobile-content").css({display: "none"});
             $("#movie-details").css({display: "block"});
              // Displaying the information
             $("#movie-details").html(result["original_title"]);
             var releaseDate = moment(result["release_date"]).locale('pt').format('LL');

             var image =
               result["poster_path"] == null
                 ? "Image/no-image.png"
                 : "https://image.tmdb.org/t/p/w500/" + result["poster_path"];
             var biography =
               result["original_title"] == null
                 ? "No information available"
                 : result["original_title"];

             var resultHtml =
               '<p ><img id="large-image" src="' +
               image +
               '"/></p>'+
               '<div id="about">' +
              '<h3>'+
               biography +
               '</h3>'+
               "</p>";
             resultHtml +=
              "<p><h5>Nota:</h5> " +
              result["vote_average"] +
              "</h5></p> " +
               "<p><h5>Lançamento:</h5> " +
               releaseDate +
               "</h5></p> " +
               "<p><h5>Sinopse:</h5> " +
               result["overview"] +
               "</h5></p> " +
               "</div>"
               "";

             $("#movie-details").html(resultHtml);

          },
          error: function (xhr, status, error) {
            $("#message").html(
              "Result: " +
                status +
                " " +
                error +
                " " +
                xhr.status +
                " " +
                xhr.statusText
            );
          },
        });
        
      });
    });
  }
  mobileDetails(){
    $(document).ready(function () {
      $("#trending").click(function (e) {
        location.reload();
      });
      // Não consegui adaptar o evento de click mobile e desktop, por isso acabei repetindo praticamente toda a função :(
      $("#mobile-content").on("click", ".item", function () {
        var resourceId = $(this).attr("resourceId");
        $.ajax({
          url:
            "https://api.themoviedb.org/3/movie/" +
            resourceId +
            "?language=pt-BR",
          data: {
            api_key: "d427e3268c3ecbbf7270e830e4a8dc47",
          },
          dataType: "json",
          success: function (result, status, xhr) {
           $("#content").css({display: "none"});
           $("#mobile-content").css({display: "none"});

           $("#movie-content").html(result["original_title"]);
           var releaseDate = moment(result["release_date"]).locale('pt').format('LL');

           var image =
             result["poster_path"] == null
               ? "Image/no-image.png"
               : "https://image.tmdb.org/t/p/w500/" + result["poster_path"];
           var biography =
             result["original_title"] == null
               ? "No information available"
               : result["original_title"];

           var resultHtml =
             '<p ><img id="large-image" src="' +
             image +
             '"/></p>'+
             '<div id="about">' +
            '<h3>'+
             biography +
             '</h3>'+
             "</p>";
           resultHtml +=
            "<p><h5>Nota:</h5> " +
            result["vote_average"] +
            "</h5></p> " +
             "<p><h5>Lançamento:</h5> " +
             releaseDate +
             "</h5></p> " +
             "<p><h5>Sinópse:</h5> " +
             result["overview"] +
             "</h5></p> " +
             "</div>"
             "";

           $("#movie-content").html(resultHtml);

        },
        error: function (xhr, status, error) {
          $("#message").html(
            "Result: " +
              status +
              " " +
              error +
              " " +
              xhr.status +
              " " +
              xhr.statusText
          );
        },
      });
      
    });
  });
}
}     
    

    
  
