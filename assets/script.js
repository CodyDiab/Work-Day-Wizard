// task value
// var task1 = $(".task1").val()
// var task2 = $(".task2").val()
// var task3 = $(".task3").val()
// var task4 = $(".task4").val()
// var task5 = $(".task5").val()
// var task6 = $(".task6").val()
// var task7 = $(".task7").val()
// var task8 = $(".task8").val()
// var task9 = $(".task9").val()

// // time block values
// let timeBlocks = [
//  $(".timeblock1")==9,
//  $(".timeblock2")==10,
//  $("timeblock3")==11,
//  $(".timeblock4")==12,
//  $(".timeblock5")==13,
//  $(".timeblock6")==14,
//  $(".timeblock7")==15,
//  $(".timeblock8")==16,
//  $(".timeblock9")==17
// ]
let workDay= {
   "9 AM": "",
  "10 AM": "",
  "11 AM": "",
  "12 PM": "",
  "1 PM": "",
  "2 PM": "",
  "3 PM": "",
  "4 PM": "",
  "5 PM": "",
}
function timeConvertNum(stringVal) { 
    switch(stringVal){
    case "9 AM": return 9;
    case "10 AM": return 10;
    case "11 AM": return 11;
    case "12 PM": return 12;
    case "1 PM": return 13;
    case "2 PM": return 14;
    case "3 PM": return 15;
    case "4 PM": return 16;
    case "5 PM": return 17;
    }
}
$(document).ready(function(){
    if(!localStorage.getItem('workDay')) {
      updateTasks(workDay);
    } else {
      updateTasks(JSON.parse(localStorage.getItem('workDay')));
    }
  })


let counter = 1;
for(const property in workDay) {
 let taskText = "#task" + counter;
 $(taskText).text(workDay[property]);
 
 let time = ".time" + counter;
 
 let timeBlock = "#timeBlock" + counter;

 let currentHour = moment().hour();

 let timeString = $(time).text();

 let timeVal = timeConvertNum(timeString)

 if (timeVal > currentHour){
    $(timeBlock).addClass("bg-success")
} else if (timeVal < currentHour){

    $(timeBlock).addClass("bg-light")
 }else{
    $(timeBlock).addClass("bg-warning")  
}
counter++;
}
// task buttons on click localStorage.setItem (task)
// function saveTask1(){
  
// }
// function saveTask2(){
//     localStorage.setItem("task2",task2)
// }
// function saveTask3(){
//     localStorage.setItem("task3",task3)
// }

// retrieve task from storage on load

//set date for current day
$('#currentDay').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));

//creat function to colour code time blocks
// var presentTime = moment().hour();
// if(timeBlocks > presentTime) {
//     $(list-group-item).addClass("bg-success")

// }
$("button").click(function() {
    value = $(this).siblings("textarea").val();
    hourString = $(this).siblings("div").text();
    
    saveSchedule(hourString, value);
  });
  
//   function hourNumberFromHourString(hourString) {
//     switch(hourString) {
//       case "8 AM": return 8;
//       case "9 AM": return 9;
//       case "10 AM": return 10;
//       case "11 AM": return 11;
//       case "12 PM": return 12;
//       case "1 PM": return 13;
//       case "2 PM": return 14;
//       case "3 PM": return 15;
//       case "4 PM": return 16;
//       case "5 PM": return 17;
//     }
//   }
  
  function loadCorrectDataset() {
    result = localStorage.getItem('workDay')
    return (result ? result : workDay);
  }
  
  function initializeLocalStorage() {
    localStorage.setItem('workDay', JSON.stringify(workDay));
  };
  
  function saveToLocalStorage(dayObj) {
    localStorage.setItem('workDay', JSON.stringify(dayObj));
  }
  
  function saveSchedule(hourString, val) {
    if(!localStorage.getItem('workDay')) {
      initializeLocalStorage();
    }
  
    let workHours = JSON.parse(localStorage.getItem('workDay'));
    workHours[hourString] = val
  
    saveToLocalStorage(workHours);
  }
  
  function updateTasks(dayObject) {
    $(".list-group-item").each(function(index) {
      let res = $(this).children("div");
      $(this).children("textarea").text(dayObject[res.text()]);
    })
  }