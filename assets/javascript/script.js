$(document).ready(function () {
  $("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));

  var date = moment().format("LL");
  var scheduleArr = [];
  var schedule = {
    hourId: "",
    hourText: "",
  };

  displaySchedule();

  $(".saveBtn").on("click", function () {
    var text = $(this).siblings(".description").val().trim();
    var time = $(this).parent().attr("id");
    var storedSchedules = JSON.parse(localStorage.getItem(date));

    // checking if the plan text is not null
    if (text !== "") {
      // checking if this is first time entry for the day and add it to local storage
      if (storedSchedules === null) {
        schedule.hourId = time;
        schedule.hourText = text;
        scheduleArr.push(schedule);

        localStorage.setItem(date, JSON.stringify(scheduleArr));
      } else {
        let scheduleIndex = storedSchedules.findIndex((storedSchedule) => storedSchedule.hourId === time);
        // checking if hour plan already exists and update the text else add it to the storage
        if (scheduleIndex !== -1) {
          storedSchedules[scheduleIndex].hourText = text;
        } else {
          schedule.hourId = time;
          schedule.hourText = text;
          storedSchedules.push(schedule);
        }

        localStorage.setItem(date, JSON.stringify(storedSchedules));
      }
    }
  });

  function displaySchedule() {
    savedSchedule = JSON.parse(localStorage.getItem(date));
    if (savedSchedule !== null) {
      for (var i = 0; i < savedSchedule.length; i++) {
        let timeblocksIdDescription = "#" + savedSchedule[i].hourId + " .description";
        $(timeblocksIdDescription).val(savedSchedule[i].hourText);
      }
    }
  }

  function hourTracker() {
    var currentHour = moment().hour();
    $(".time-block").each(function () {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split refered this link for split
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
