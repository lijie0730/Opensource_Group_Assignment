
const notePad = document.getElementById('tslNotes');
const cleanPad = document.getElementById('cleanPad');
const layOver = document.getElementById('layOver');
const yes = document.getElementById('yesPlz');
const no = document.getElementById('nope');


const gettingItem = browser.storage.local.get('tslStickyNotes');
gettingItem.then((res) => {
try{
  if(res.tslStickyNotes){
    notePad.value = res.tslStickyNotes;
  }
}catch(e){}
});
notePad.addEventListener('keyup',()=>{
    browser.storage.local.set({ tslStickyNotes: notePad.value });
}, false);


//clear page 1
cleanPad.addEventListener('click',()=>{
    layOver.className="";
}, false);

no.addEventListener('click',()=>{
    layOver.className="hidden";
}, false);

yes.addEventListener('click',()=>{
    notePad.value = "";
    browser.storage.local.set({ tslStickyNotes: "" });
    layOver.className="hidden";
}, false);
//clear page 1




// add on
//page 2
const notePad2 = document.getElementById('tslNotes2');
const cleanPad2 = document.getElementById('cleanPad2');
const layOver2 = document.getElementById('layOver2');
const yes2 = document.getElementById('yesPlz2');
const no2 = document.getElementById('nope2');


const gettingItem2 = browser.storage.local.get('tslStickyNotes2');
gettingItem2.then((res) => {
try{
  if(res.tslStickyNotes2){
    notePad2.value = res.tslStickyNotes2;
  }
}catch(e){}
});
notePad2.addEventListener('keyup',()=>{
    browser.storage.local.set({ tslStickyNotes2: notePad2.value });
}, false);

//21/6/2019


//clear page 1
cleanPad2.addEventListener('click',()=>{
    layOver2.className="";
}, false);

no2.addEventListener('click',()=>{
    layOver2.className="hidden";
}, false);

yes2.addEventListener('click',()=>{
    notePad2.value = "";
    browser.storage.local.set({ tslStickyNotes2: "" });
    layOver2.className="hidden";
}, false);
//22/6/2019
//clear page 1

//page 2



//switch page

document.getElementById('page_2').addEventListener("click", function(){
  
  document.getElementById("tslNotes").setAttribute("hidden", "true");
  document.getElementById("tslNotes2").removeAttribute("hidden");
  document.getElementById("Pad1").setAttribute("hidden", "true"); 
  document.getElementById("Pad2").removeAttribute("hidden");
  
});
//23/6/2019
document.getElementById('page_1').addEventListener("click", function(){
  
  document.getElementById("tslNotes2").setAttribute("hidden", "true");
  document.getElementById("tslNotes").removeAttribute("hidden");
  document.getElementById("Pad2").setAttribute("hidden", "true");
  document.getElementById("Pad1").removeAttribute("hidden");
});

//switch page


// 25/6/2019






//change font size
document.getElementById('selectsize').addEventListener("change", function(){

  var x = document.getElementById("selectsize").value;
  document.getElementById("tslNotes").setAttribute("style", "font-size:"+x+"px");
  document.getElementById("tslNotes2").setAttribute("style", "font-size:"+x+"px");


  localStorage.setItem("fontsize_record", x);



});

// 25/6/2019

//change font size

  // document.getElementById("fontsize_value_display").innerHTML = localStorage.getItem("fontsize_record");



  // var x = document.getElementById("selectsize").value;

  // document.getElementById("result").innerHTML = sessionStorage.getItem("fontsize_record");



//countdown timer


//appear input countdown
var timer_checked = 1;

// 25/6/2019


document.getElementById('button_time').addEventListener("click", function(){
  
  if(timer_checked == 1){
        document.getElementById("timer_function").removeAttribute("hidden");
        timer_checked = 0;
  }else{    
        document.getElementById("timer_function").setAttribute("hidden","true");
        timer_checked = 1
  }
});

// 26/6/2019

//appear input countdown


//time count text appear

var time_count_text_checked = 1;
document.getElementById('start_countdown').addEventListener("click", function(){
  
  if(time_count_text_checked == 1){
        document.getElementById("time_count").removeAttribute("hidden");
        time_count_text_checked = 0;
  }else{    
        document.getElementById("time_count").setAttribute("hidden","true");
        time_count_text_checked = 1
  }
});


//time count text appear

// 26/6/2019



// 27/6/2019
// timer start countdown progress
document.getElementById('start_countdown').addEventListener("click", function(){

var countdown_value = document.getElementById("input_countdown").value;


  var inputminute = countdown_value;
  var duration = inputminute*60;
  var display = document.querySelector('#time');

  // 27/6/2019
  var timer = duration, minutes, seconds;

  setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      // if (--timer < 0) {
      //     timer = duration;
      // }

      if (--timer < 0) {
          if(timer<0)
          {
            // document.getElementById("coundowntime").innerHTML = "Please enter minutes";


              var audio = new Audio('sounds/old-fashioned-door-bell-daniel_simon.mp3');
              audio.play();


          }
      }

  }, 1000);


});

// timer start countdown progress



//countdown timer




//clock

var checked = 1;
document.getElementById('mytime').addEventListener("change", function(){
  
  if(checked == 1){
        document.getElementById("canvas").removeAttribute("hidden");
        checked = 0;
  }else{    
        document.getElementById("canvas").setAttribute("hidden","true");
        checked = 1
  }
});

//clock


//change font color


document.getElementById('btn_default').addEventListener("click", function(){


  var mycolor = "black";
  document.getElementById("tslNotes").setAttribute("style", "color:black");
  document.getElementById("tslNotes2").setAttribute("style", "color:black");

  localStorage.setItem("currentColor", mycolor);

 set_font_color();

});








document.getElementById('btn_primary').addEventListener("click", function(){

  var mycolor = "blue";

  document.getElementById("tslNotes").setAttribute("style", "color:blue");
  document.getElementById("tslNotes2").setAttribute("style", "color:blue");

  localStorage.setItem("currentColor", mycolor);

    set_font_color();
});


document.getElementById('btn_success').addEventListener("click", function(){

var mycolor = "green";

  document.getElementById("tslNotes").setAttribute("style", "color:green");
  document.getElementById("tslNotes2").setAttribute("style", "color:green");

  localStorage.setItem("currentColor", mycolor);

   set_font_color();
});









// 28/6/2019

document.getElementById('btn_info').addEventListener("click", function(){


  var mycolor = "#74CBFF";

  document.getElementById("tslNotes").setAttribute("style", "color:#74CBFF");
  document.getElementById("tslNotes2").setAttribute("style", "color:#74CBFF");

  localStorage.setItem("currentColor", mycolor);

  set_font_color();
});



document.getElementById('btn_warning').addEventListener("click", function(){


  var mycolor = "orange";

  document.getElementById("tslNotes").setAttribute("style", "color:"+mycolor);
  document.getElementById("tslNotes2").setAttribute("style", "color:"+mycolor);

  localStorage.setItem("currentColor", mycolor);

 set_font_color();
});


document.getElementById('btn_danger').addEventListener("click", function(){


  var mycolor = "red";

  document.getElementById("tslNotes").setAttribute("style", "color:"+mycolor);
  document.getElementById("tslNotes2").setAttribute("style", "color:"+mycolor);

  localStorage.setItem("currentColor", mycolor);

  set_font_color();

});
//change font color

//font color and text size

function set_font_color() {
    document.getElementById("tslNotes").setAttribute("style", "color:"+localStorage.getItem("currentColor") + ";"+"font-size:"+localStorage.getItem("fontsize_record")+"px");
    document.getElementById("tslNotes2").setAttribute("style", "color:"+localStorage.getItem("currentColor") + ";"+"font-size:"+localStorage.getItem("fontsize_record")+"px");

}



document.getElementById("tslNotes").setAttribute("style", "color:"+localStorage.getItem("currentColor") + ";"+"font-size:"+localStorage.getItem("fontsize_record")+"px");

document.getElementById("tslNotes2").setAttribute("style", "color:"+localStorage.getItem("currentColor") + ";"+"font-size:"+localStorage.getItem("fontsize_record")+"px");



//font color and text size


