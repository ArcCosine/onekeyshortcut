var tabIndex = -1;

console.log(chrome.tabs);
chrome.runtime.onConnect.addListener(function(port){
	port.onMessage.addListener(function(msg){
		if( msg.action === "next" ){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				tabIndex = tabs[0].index;
				console.log(tabIndex);
			})
		} else if( msg.action === "prev" ){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				tabIndex = tabs[0].index;
				console.log(tabIndex);
			})
		}
	});
});
