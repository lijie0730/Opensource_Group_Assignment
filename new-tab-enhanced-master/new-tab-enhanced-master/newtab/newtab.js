//Top Sites
browser.topSites.get()
  .then((sites) => {
    var div = document.getElementById('topsites');

    if (!sites.length) {
      div.innerText = 'No sites returned from the topSites API.';
      return;
    }

    sites.splice(12);

    for (let site of sites) {
      let p = document.createElement('p');
      p.className = 'list-group-item';
      let a = document.createElement('a');
      a.href = site.url;
      a.innerText = site.title || site.url;
      p.appendChild(a);
      div.appendChild(p);
    }
  });

//default to hiding the topsites sidebar
document.getElementById('topsites').style.marginLeft = -200 + "%";

//bookmarks
function onFulfilled(children) {
  var divbm = document.getElementById('bookmarks');

  //If there are no bookmarks in the folder (toolbar)
  if (!children.length) {
    let p = document.createElement('p');
    p.id = 'emptyText';
    p.innerText = 'Bookmarks in the Bookmarks Toolbar will be shown here.';
    divbm.appendChild(p);
    return;
  }

  /*for(var i=0; i<children.length; i++) {}*/
  for (child of children) {
    let p = document.createElement('p');
    p.className = 'list-group-item';
    let a = document.createElement('a');

    //filter out non-bookmark items, specifically seperators
    var bookmarksArray = [];
    var seperatorsArray = [];
    /*var foldersArray = [];*/
    if ((child.url != undefined) && (child.url.startsWith("http")) && (child.type != "seperator") && (child.type != "folder")) {
      bookmarksArray.push(child);
    } else if (child.type = "seperator") {
        seperatorsArray.push(child);
    } else if (child.children != undefined) {
        foldersArray.push(child);
        console.log("folder");
        for (i = 0; i < foldersArray.length; i++) {
          if ((foldersArray[i].url != undefined) && (foldersArray[i].url.startsWith("http")) && (foldersArray[i].type != "seperator")) {
            bookmarksArray.push(foldersArray[i]);
          } else if (foldersArray[i].type = "seperator") {
              seperatorsArray.push(foldersArray[i])
          }
        }
      }

    /*
     * I eventually want to add support for reading the contents of
     * folders in the bookmarks toolbar.  However, that adds more
     * complexity to an already shaky function.  I will add support
     * for folders when I begin using a seperate folder specifically
     * for this addon, rather than the bookmarks toolbar.  So, expect
     * improvements sometime around the 2.0 release.
     *
     * ~Isaac
     */

    //add bookmark info to sidebar items
    for (i = 0; i < bookmarksArray.length; i++) {
      a.href = bookmarksArray[i].url;
      a.innerText = bookmarksArray[i].title || bookmarksArray[i].url;
    }

    //attach sidebar items to each other
    p.appendChild(a);
    divbm.appendChild(p);
  }
}

//run when things are broken
function onRejected(error) {
  console.log(`An error: ${error}`);
}

//get bookmarknodeobjects in the bookmarks toolbar folder, promise them
var gettingChildren = browser.bookmarks.getChildren("toolbar_____");
gettingChildren.then(onFulfilled, onRejected);

//default to hiding the bookmarks sidebar
document.getElementById('bookmarks').style.marginLeft = -200 + "%";

//notes
var VERSION = 1;

window.onload = () => {
  var $textarea = document.querySelector('#note-content');

  var initNote = () => {
    browser.storage.sync.get().then( data => {

      if (data.version === undefined) {
        data = {
          version: VERSION,
          content: ''
        };
        browser.storage.sync.set(data);
      }

      $textarea.value = data.content;
    });
  };
  initNote();

  //when user writing
  $textarea.addEventListener('keyup', event => {
    browser.storage.sync.set({ content: event.target.value });
  });

  //when actived window or tab changed
  browser.tabs.onActivated.addListener(initNote);
  browser.windows.onFocusChanged.addListener(initNote);
};

//Set location for Weather, theme
function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
  //weather
  var color = "";
  if (item.color) {
    place = item.color;
    var weather = document.getElementById('weather');
    weather.href += place;
  }

  //theme
  console.log("theme = " + item.theme);

  if (item.theme == "Default") {
    console.log("Default");
  } else if (item.theme == "Dark") {
    console.log("Dark");
    document.styleSheets[0].deleteRule(0);
    document.styleSheets[0].deleteRule(0);
    document.styleSheets[0].insertRule(
      ":root {" +
        "--notes-bg-color: #273038;" +
        "--main-bg-color: #424F5A;" +
        "--notes-text: #fff;" +
        "--secondary-bg-color: #1B2126;" +
      "}"
    ,0);
  } else if (item.theme == "Image") {
    console.log("Image");
    document.styleSheets[0].deleteRule(0);
    document.styleSheets[0].insertRule(
      ":root {" +
        "--main-bg-color: url(background.jpg)" +
      "}"
    ,0);
  } else {
    console.log("Default-weird");
  }
}

var getting = browser.storage.local.get(["color", "theme", "image"]);
getting.then(onGot, onError);
