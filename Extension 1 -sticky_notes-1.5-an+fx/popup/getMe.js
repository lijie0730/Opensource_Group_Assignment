
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
