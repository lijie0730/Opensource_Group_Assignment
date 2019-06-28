
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

//page 2

//switch page

document.getElementById('page_2').addEventListener("click", function(){
    document.getElementById("tslNotes").setAttribute("hidden", "true");
    document.getElementById("tslNotes2").removeAttribute("hidden");
    document.getElementById("Pad1").setAttribute("hidden", "true"); 
    document.getElementById("Pad2").removeAttribute("hidden");
});

document.getElementById('selectsize').addEventListener("change", function(){
    var x = document.getElementById("selectsize").value;
  document.getElementById("tslNotes").setAttribute("style", "font-size:"+x+"px");
  document.getElementById("tslNotes2").setAttribute("style", "font-size:"+x+"px");
    localStorage.setItem("fontsize_record", x);
});

var timer_checked = 1;
document.getElementById('button_time').addEventListener("click", function(){
      if(timer_checked == 1){
         document.getElementById("timer_function").removeAttribute("hidden");
         timer_checked = 0;
      }else{ 
         document.getElementById("timer_function").setAttribute("hidden","true");
         timer_checked = 1
      }
});

document.getElementById('start_countdown').addEventListener("click", function(){
  var countdown_value = document.getElementById("input_countdown").value;
    var inputminute = countdown_value;
   var duration = inputminute*60;
    var display = document.querySelector('#time');
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

