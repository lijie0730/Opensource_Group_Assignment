var BNPanel = browser.extension.getURL("sidebar/panel.html");




browser.browserAction.onClicked.addListener(() => {

		browser.sidebarAction.setPanel({panel: BNPanel});
		browser.sidebarAction.open();


	
});