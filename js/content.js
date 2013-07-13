(function(_win,_doc){

	function OneKeyControl(){
		this.nowLink = 0;
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
		},
		nextLink: function(){
			var links = _doc.querySelectorAll("a"),
				pos = this.nowLink+1,
				dummy = _doc.querySelector(".onekeyhighlight"),
				targetLink = null;

			if( !dummy ){
				dummy = _doc.body.appendChild(_doc.createElement("div"));
				dummy.className = "onekeyhighlight";
			}
			if( typeof links[pos] !== "undefined" ){
				targetLink = links[pos];
				this.nowLink = pos;
			}else{
				targetLink = links[0];
				this.nowLink = 0;
			}

			dummy.style.top = targetLink.offsetTop + 'px';
			dummy.style.left = targetLink.offsetLeft + 'px';
			dummy.style.width = targetLink.offsetWidth + 'px';
			dummy.style.height = targetLink.offsetHeight + 'px';

		},
		previousLink: function(){
		},
		scrollDown: function(){
			_win.scrollBy(0, 36);
		},
		scrollUp: function(){
			_win.scrollBy(0, -36);
		}

	}

	var okc = new OneKeyControl();

	var OneKey = {
		49: function(){		//1
			okc.prevTab();
		},
		50: function(){		//2
			okc.nextTab();
		},
		/*65: function(){
			okc.nextLink();
		},
		66: function(){
			okc.previousLink();
		}*/
		/*74: function(){		//j
			okc.scrollDown();
		},
		75: function(){		//k
			okc.scrollUp();
		}*/

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
