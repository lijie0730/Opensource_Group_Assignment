/* Callback functions
 * There's probably a better name for these, but they're
 * here so the toggle functions below are readable.
 */

//search
function growSearch() {
  var searchPopOver = document.getElementById('searchBoxId');
  var box = document.getElementById('searchbox');
  var button = document.getElementById('sbsubmit');
  searchPopOver.style.maxHeight = "60px";
  searchPopOver.style.padding = "1.2em 0";
  searchPopOver.style.boxShadow = "0 .4rem .4rem rgba(0,0,0,0.35)";
  searchPopOver.style.borderTop = "2px solid var(--highlight-color)";
  box.style.visibility = "visible";
  box.focus();
  button.style.visibility = "visible";
}

function shrinkSearch() {
  var searchPopOver = document.getElementById('searchBoxId');
  var box = document.getElementById('searchbox');
  var button = document.getElementById('sbsubmit');
  searchPopOver.style.maxHeight = "0px";
  searchPopOver.style.padding = "0";
  searchPopOver.style.boxShadow = "none";
  searchPopOver.style.borderTop = "none";
  box.style.visibility = "collapse";
  button.style.visibility = "collapse";
}

//topsites
function shrinkTopSites() {
  var sidebar = document.getElementById('topsites');
  var width = document.getElementById('topsites').scrollWidth;
  document.getElementById('topsites').style.transition = "all .25s ease-out";
  sidebar.style.marginLeft = -width + "px";
  sidebar.style.boxShadow = "none";
}

function growTopSites() {
  var sidebar = document.getElementById('topsites');
  var width = document.getElementById('topsites').scrollWidth;
  document.getElementById('topsites').style.transition = "all .25s ease-out";
  sidebar.style.marginLeft = "0px";
  sidebar.style.boxShadow = "0 0 .4rem rgba(0,0,0,0.35)";
}

//bookmarks
function shrinkBookmarks() {
  var sidebar = document.getElementById('bookmarks');
  var width = document.getElementById('bookmarks').scrollWidth;
  document.getElementById('bookmarks').style.transition = "all .25s ease-out";
  sidebar.style.marginLeft = -width + "px";
  sidebar.style.boxShadow = "none";
}

function growBookmarks() {
  var sidebar = document.getElementById('bookmarks');
  var width = document.getElementById('bookmarks').scrollWidth;
  document.getElementById('bookmarks').style.transition = "all .25s ease-out";
  sidebar.style.marginLeft = "0px";
  sidebar.style.boxShadow = "0 0 .4rem rgba(0,0,0,0.35)";
}

/* Toggles
 * The below functions are used to toggle the various
 * panels/dropdowns in this extension. They are labeled
 * pretty clearly as to what they do.
 */

//toggle top sites sidebar
function showTopSites(event) {
  var sidebar = document.getElementById('topsites');
  var width = document.getElementById('topsites').scrollWidth;
  document.getElementById('topsites').style.transition = "all .25s ease-out";
  if(sidebar.style.marginLeft == "0px" || sidebar.style.marginLeft == null) {
    shrinkTopSites();
  } else {
    shrinkBookmarks();
    shrinkSearch();
    growTopSites();
  }
}

var toggleID = document.getElementById('toggle');
toggleID.onclick = showTopSites;

//toggle bookmarks sidebar
function showBookmarks(event) {
  var sidebarbm = document.getElementById('bookmarks');
  var width = document.getElementById('bookmarks').scrollWidth;
  document.getElementById('bookmarks').style.transition = "all .25s ease-out";
  if(sidebarbm.style.marginLeft == "0px" || sidebarbm.style.marginLeft == null) {
    shrinkBookmarks();
  } else {
    shrinkTopSites();
    shrinkSearch();
    growBookmarks();
  }
}

var toggleID = document.getElementById('bmtoggle');
toggleID.onclick = showBookmarks;

//toggle searchbox
function showSearch(event) {
  var searchPopOver = document.getElementById('searchBoxId');
  var box = document.getElementById('searchbox');
  var button = document.getElementById('sbsubmit');
  var sidebar = document.getElementById('topsites');
  var width = document.getElementById('topsites').scrollWidth;
  if(searchPopOver.style.maxHeight == "60px") {
    shrinkSearch();
  } else {
    shrinkTopSites();
    shrinkBookmarks();
    growSearch();
  }
}

var toggleSearch = document.getElementById('searchToggle');
toggleSearch.onclick = showSearch;
