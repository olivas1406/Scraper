
$(".notes").hide();

$(".noteMe").on("click", function() {
    $(".notes").empty().show();
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    }).then(function(data) {
        $(".notes").append("<h2>" + data.title + "</h2>");
        $(".notes").append("<input id='titleinput' name='title' >");
        $(".notes").append("<textarea id='bodyinput' name='body'></textarea>");
        $(".notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
        if (data.note) {
            $(".titleinput").val(data.note.title);
            $(".bodyinput").val(data.note.body);
        }
      });
  });
  
$("#savenote").on("click", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    }).then(function(data) {
        $("#notes").empty();
    });
    $("#titleinput").val("");
    $("#bodyinput").val("");
});
 