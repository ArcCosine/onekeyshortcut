(function(_win,_doc){

	function OneKeyControl(){
		this.init();
	}

	OneKeyControl.prototype = {
		init: function(){
			this.port = chrome.extension.connect({name:"OneKeyBack"});
		},
		nextTab: function(){
			this.port.postMessage({"action":"next"});
		},
		prevTab: function(){
			this.port.postMessage({"action":"prev"});
		}
	}

	var okc = new OneKeyControl();

	var OneKey = {
		49: function(){		//1
			okc.nextTab();
		},
		50: function(){		//2
			okc.prevTab();
		}
	}


	// Check keydown Event
	_doc.addEventListener("keydown", function(eve){
		var keycode = eve.keyCode,
			node = eve.target;

		if( node.nodeType === 1 && !/INPUT|TEXTAREA/.test(node.tagName.toUpperCase()) ){
			if( typeof OneKey[keycode] === "function" ){
				eve.preventDefault();
				OneKey[keycode].apply();
			}
		}

	}, false );

})(window,document);
