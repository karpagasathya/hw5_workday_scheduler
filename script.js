$(document).ready(function () {
    $("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $(".saveBtn").on("click", function () {
        var text = $(this).siblings(".description").val();
        var time = $(this).parent().attr("id");

        localStorage.setItem(time, text);
    });
    
    let timeBlock = ["#hour9", "#hour10", "#hour11", "#hour12", "#hour13", "#hour14", "#hour15", "#hour16", "#hour17"];
    for (let i = 0; i < timeBlock.length; i++) { 
        $(timeBlock[i]).val(localStorage.getItem(timeBlock[i]));
    }
    
//    $("#hour9 .description").val(localStorage.getItem("hour9"));
//    $("#hour10 .description").val(localStorage.getItem("hour10"));
//    $("#hour11 .description").val(localStorage.getItem("hour11"));
//    $("#hour12 .description").val(localStorage.getItem("hour12"));
//    $("#hour13 .description").val(localStorage.getItem("hour13"));
//    $("#hour14 .description").val(localStorage.getItem("hour14"));
//    $("#hour15 .description").val(localStorage.getItem("hour15"));
//    $("#hour16 .description").val(localStorage.getItem("hour16"));
//    $("#hour17 .description").val(localStorage.getItem("hour17"));
    
    function hourTracker() {
        var currentHour = moment().hour();
        $(".time-block").each(function () {
            var scheduleHour = parseInt($(this).attr("id").split("hour")[1]);
            console.log(scheduleHour, currentHour);
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
        })

    }
hourTracker()
})

