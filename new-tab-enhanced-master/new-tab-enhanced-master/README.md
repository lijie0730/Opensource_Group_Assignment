# New Tab Enhanced

### An enhanced new tab experience, for Firefox 54+

This addon will transform Firefox's new tab page into a notebook, links to weather and search, and a listing of top sites.

Notes:
---

 - Top sites will be the same as those loaded in about:newtab.  Pinned sites on that page will be respectively pinned on this extension's page.  

  - Bookmarks will be the same as those In the bookmarks toolbar. (may use dedicated folder with the 2.0 release)

 - Weather links to DuckDuckGo's Weather Instant Answer feature, which uses [Dark Sky](https://darksky.net) as its source. It should show local weather based on your IP address, but location is configurable through the options page.


Screenshots:
---

### Top Sites
![Top Sites](images/topsites.png)

### Bookmarks
![Bookmarks](images/bookmarks.png)

### Search
![Search](images/search.png)

Themes:
---

### Dark
![Dark Theme](images/darktheme.png)

### Image
![Image Theme](images/imagetheme.png)

ToDo:
---
* [X] Implement themes and theme chooser (light, dark, greyscale, colorful)

* [ ] Option to choose image to be used as background

* [ ] Choose which links to display in top bar

Credits
---

Credit for the initial work on the "notebook", and the initial base for this project, goes to [wildskyf's "tab-notes"](https://github.com/wildskyf/tab-notes/).

JavaScript for the topSites API from [Top-Sites](https://github.com/mdn/webextensions-examples/tree/master/top-sites) Webextensions example from MDN.

Weather links to [Dark Sky](https://darksky.net) via DuckDuckGo

Search links to [DuckDuckGo](https://duckduckgo.com), a search engine that doesn't track you.

Persistant notes on Chrome made possible with some code from [Sweenzor's "New Tab Notepad"](https://github.com/sweenzor/new-tab-notepad)
