/* initialise variables */


var bottone_clean = document.querySelector("#bClean");
var select_note = document.querySelector("#select_note");
var contenuto_nota = document.querySelector("#contenuto_nota");
var bLoadFromFile = document.querySelector("#bLoadFromFile");
var bLoadFromFile_file = document.querySelector("#bLoadFromFile_file");
var bSaveToFile = document.querySelector("#bSaveToFile");

var bUrl = document.querySelector("#bUrl");
var bAdd = document.querySelector("#bAdd");
var bConfirm = document.querySelector("#bConfirm");
var bRemove = document.querySelector("#bRemove");

var bPrint_note = document.querySelector("#bPrint_note");

var bBackup = document.querySelector("#bBackup");
/*var bHelp = document.querySelector("#bHelp");*/

var time_save = 2000;


/*  add event listeners to buttons */
bottone_clean.addEventListener('click', clear_nota);
select_note.addEventListener('change', selezionata_nuova_nota);
/*contenuto_nota.addEventListener('change', salva_nota);*/
bAdd.addEventListener('click', new_name_nota);
bRemove.addEventListener('click', rimuovi_nota);
bConfirm.addEventListener('click', aggiungi_nota);
bUrl.addEventListener('click', extractHostname);


bLoadFromFile.addEventListener('click', click_load_from_file);
bLoadFromFile_file.addEventListener('change', load_from_file);
bSaveToFile.addEventListener('click', save_to_file);
bPrint_note.addEventListener('click', print_note);


bBackup.addEventListener('click', do_backup);
/*bHelp.addEventListener('click', show_path);*/




/* generic error handler */
function onError(error) {
  /*console.log(error);*/
  alert(error);
}
  function onGot(error) {
  /*console.log(error);*/
  alert(error);
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


/* display previously-saved stored notes on startup */

initialize();
var myTimer = setInterval(function() {salva_nota();}, time_save);
	

function initialize() {
	
	document.getElementById("bar_2").style.display="none";
	document.getElementById("bar_3").style.display="none";
	document.getElementById("message").style.display="none";
	var n = 0;
	var recuperatuttelenote = browser.storage.local.get(null);
	recuperatuttelenote.then((results) => {
		var noteKeys = Object.keys(results);
		noteKeys.sort();
		
		document.getElementById("select_note").options.length = 0;
		
		for (let noteKey of noteKeys) {
			

			var curValue = results[noteKey];
			/*alert(noteKey + "->" + curValue )*/
		
			var sel = document.getElementById("select_note");
			var opt = document.createElement("option");
			opt.value = noteKey;
			opt.text = noteKey;
			sel.add(opt, null);
			
			if(noteKey == "default")
			{
				n=1;
				document.getElementById("select_note").value = noteKey;
				document.getElementById("contenuto_nota").value = curValue
			}
		}

		if(n==0)
		{
			/*alert("non ci sono note, creo io la default")*/
			var sel = document.getElementById("select_note");
			var opt = document.createElement("option");
			opt.value = "default";
			opt.text = "default";
			sel.add(opt, sel.options[0]);
		}

	}, onError);
	

}



function aggiungi_nota() {
	var contenuto_nota = document.getElementById("contenuto_nota").value;
	rif_nota = document.getElementById("nome_new_nota").value;
	if(rif_nota != "")
	{
		document.getElementById("nome_new_nota").value = "";
		var storingNote = browser.storage.local.set({ [rif_nota] : contenuto_nota });
		initialize();
		var myTimer = setTimeout(function() {document.getElementById("select_note").value = rif_nota;}, 300);


		var prendiNota = browser.storage.local.get(rif_nota);
		prendiNota.then((results) => {
		var noteKeys = Object.keys(results);
		for (let noteKey of noteKeys) {
			var curValue = results[noteKey];
			document.getElementById("select_note").value = noteKey;
			document.getElementById("contenuto_nota").value = curValue
	    }
		 }, onError);

		document.getElementById("bar_3").style.display="none";
		
		
		
	}
	else
	{
		alert("Insert name of new Note!")
	}
}

function rimuovi_nota() {
time_save = 20000;
	var rif_nota = document.getElementById("select_note").value;

	if(rif_nota != "default")
	{
		var risposta = confirm("Would you remove '" + rif_nota + "'?");
		if(risposta)
		{
			var rimuovi_nota = browser.storage.local.remove(rif_nota);
			document.getElementById("select_note").value = "default";
			initialize();
		}
	}
	else
	{
		alert("The default note can't be removed");
	}
time_save = 2000;
}




function aggiungi_rimuovi_nota() {
	var rif_nota = document.getElementById("select_note").value;
	var contenuto_nota = document.getElementById("contenuto_nota").value;

	if(document.getElementById("nome_new_nota").value=="") /* nessun nome, elimino */
	{	

		if(rif_nota != "default")
		{
			var risposta = confirm("Vuoi cancellare la nota '" + rif_nota + "'?");
			if(risposta)
			{
				let rimuovi_nota = browser.storage.local.remove(rif_nota);
				rimuovi_nota.then(onGot, onError);
				initialize();
			}
		}
		else
		{
			alert("The default note can't be removed");
		}			
	}
	else /* è presente un nome per la nuova nota quindi creo */
	{
		rif_nota = document.getElementById("nome_new_nota").value;
		document.getElementById("nome_new_nota").value = "";

		var storingNote = browser.storage.local.set({ [rif_nota] : contenuto_nota });
		initialize();
		var myTimer = setTimeout(function() {document.getElementById("select_note").value = rif_nota;}, 300);
		
	}
}


function salva_nota() {
	var rif_nota = document.getElementById("select_note").value;
	var contenuto_nota = document.getElementById("contenuto_nota").value;
	var storingNote = browser.storage.local.set({ [rif_nota] : contenuto_nota });
}

function clear_nota() {
	document.getElementById("contenuto_nota").value = "";
	var rif_nota = document.getElementById("select_note").value;
	var contenuto_nota = document.getElementById("contenuto_nota").value;
	var storingNote = browser.storage.local.set({ [rif_nota] : contenuto_nota });
}


function selezionata_nuova_nota() {
	var nome_nota = document.getElementById("select_note").value;

	var prendiNota = browser.storage.local.get(nome_nota);
	prendiNota.then((results) => {
    var noteKeys = Object.keys(results);
    for (let noteKey of noteKeys) {
		var curValue = results[noteKey];
		document.getElementById("select_note").value = noteKey;
		document.getElementById("contenuto_nota").value = curValue

    }
  }, onError);
}

function click_load_from_file() {

	if(document.getElementById("bar_2").style.display=="none")
		document.getElementById("bar_2").style.display="block";
	else
		document.getElementById("bar_2").style.display="none";
}

function new_name_nota() {
	if(document.getElementById("bar_3").style.display=="none")
		document.getElementById("bar_3").style.display="block";
	else
		document.getElementById("bar_3").style.display="none";
}


function load_from_file() {
var file = document.getElementById("bLoadFromFile_file").files[0];
var textType = /text.*/;


  var reader = new FileReader();

  reader.onload = function(e) {
    document.getElementById("contenuto_nota").value = reader.result;
	
	var rif_nota = document.getElementById("select_note").value;
	var contenuto_nota = document.getElementById("contenuto_nota").value;
	var storingNote = browser.storage.local.set({ [rif_nota] : contenuto_nota });
	
	
  }
  reader.readAsText(file);  
	document.getElementById("bar_2").style.display="none";
}


function save_to_file() {

var filename = document.getElementById("select_note").value + ".txt";



var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
			var text = document.getElementById("contenuto_nota").value;
            blob = new Blob([text], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

var data = { x: 42, s: "text", d: new Date() },
    fileName = document.getElementById("select_note").value + ".txt";

saveData(data, fileName);


}



function do_backup() {
	document.getElementById("bar_2").style.display="none";
	var bk_text = "BLOCKNOTE FIREFOX - BACKUP ALL NOTE\r\n\r\n";
	var recuperatuttelenote = browser.storage.local.get(null);
	recuperatuttelenote.then((results) => {
		var noteKeys = Object.keys(results);
		for (let noteKey of noteKeys)
		{
			var curValue = results[noteKey];
			/*alert(noteKey + "->" + curValue )*/
bk_text = bk_text + "### START - " + noteKey + " ---------------------------------\r\n" + curValue + "\r\n### STOP -- " + noteKey + " ---------------------------------\r\n\r\n"

		}

		d = new Date();
		df = d.getMonth()+'-'+d.getDate()+'-'+d.getYear()+' '+(d.getHours()+1)+'_'+d.getMinutes()

	fileName = "blocknote_backup_" + df + ".txt";

	/*alert(bk_text);*/
	/*sleep(3000);*/

    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
	var text = bk_text;
    blob = new Blob([text], {type: "text/plain"}),
    url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);

	}, onError);


}




function show_path() {
	if(document.getElementById("message").style.display=="none")
		document.getElementById("message").style.display="block";
	else
		document.getElementById("message").style.display="none";
}



function print_note() {
	document.getElementById("title_print").innerHTML = document.getElementById("select_note").value + "<br /><br />";
	document.getElementById("text_area_print").innerHTML = document.getElementById("contenuto_nota").value.replace(/[\n\r]/g, '<br />');
	window.print()
}



function returnTabUrl(tabs) {

	
	var url;
	/*alert(url);*/
	var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname



  for (let tab of tabs) {
    // tab.url requires the `tabs` permission
    /*alert(tab.url);*/
	url = tab.url;
	

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];
	/*alert(hostname);*/
	
	document.getElementById("nome_new_nota").value = hostname;
    // return hostname;
	
	
  }
}


function extractHostname() {

	
var querying = browser.tabs.query({currentWindow: true, active: true});
querying.then(returnTabUrl, onError);

	
    

	
}










