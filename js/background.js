chrome.runtime.onConnect.addListener(function(port){
	port.onMessage.addListener(function(msg){
		if( msg.action === "next" ){
			
			chrome.tabs.query({currentWindow:true }, function(tabs){
				var i=0, iz = tabs.length, one = null, tabId = null;

				for(;i<iz;i++){
					one = tabs[i];
					if( one.active ){ 
						tabId = ( i+1 < iz ) ? tabs[i+1].id : tabs[0].id;
						chrome.tabs.update( tabId, {selected: true });
						break;
					}
				}
			});

		} else if( msg.action === "prev" ){
			chrome.tabs.query({currentWindow: true}, function(tabs){
				var i=0, iz = tabs.length, one = null, tabId = null;

				for(;i<iz;i++){
					one = tabs[i];
					if( one.active ){ 
						tabId = ( i-1 >= 0) ? tabs[i-1].id : tabs[iz-1].id;
						chrome.tabs.update( tabId, {selected: true });
						break;
					}
				}
			});

		} 
	});
});
// Only reload all tabs.
chrome.tabs.query({currentWindow: true}, function(tabs){
	var i=0, iz = tabs.length, one = null, tabId = null;

	for(;i<iz;i++){
		one = tabs[i];
		tabId = one.id

		if( !/opera:\/\//.test(one.url) ){
			chrome.tabs.reload( tabId, {}, function(){} );
		}
	}

});

