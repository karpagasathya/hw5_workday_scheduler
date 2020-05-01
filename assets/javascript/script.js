$(document).ready(function () {
  $("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));
  $(".saveBtn").on("click", function () {
    // referred this link for siblings() https://api.jquery.com/siblings/
    var text = $(this).siblings(".description").val().trim();
    var time = $(this).parent().attr("id");

    // skip save to local storage when textarea value is null
    if (text !== "") {
      localStorage.setItem(time, JSON.stringify(text));
    }
  });

  for (let i = 0; i < localStorage.length; i++) {
    let timeblocksIdDescription = "#" + localStorage.key(i) + " .description";
    $(timeblocksIdDescription).val(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }

  function hourTracker() {
    var currentHour = moment().hour();
    $(".time-block").each(function () {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
      var scheduleHour = parseInt($(this).attr("id").split("hour")[1]);

      if (scheduleHour < currentHour) {
        $(this).addClass("past");
        $(this).removeClass("future");
        $(this).removeClass("present");
      } else if (scheduleHour === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
        $(this).removeClass("future");
      } else {
        $(this).removeClass("present");
        $(this).removeClass("past");
        $(this).addClass("future");
      }
    });
  }
  hourTracker();
});
