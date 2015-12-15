;(function ( $, window, document, undefined ) {

	"use strict";

	var pluginName = "matrix";
	var defaults = { };

	function Plugin ( element, options ) {
		this.element = element;
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	$.extend(Plugin.prototype, {
		init: function () {
			
			// Create reference to self
			var _self = this;

			// Create buffer
			_self.buffer = [0,0,0,0,0,0,0,0];

			// Build the matrix
			_self.matrixEl = $("<div class='matrix' />");

			for(var y = 0; y < 8; y++){
				var rowOuterEl = $("<div class='matrix__row matrix__row--"+ y +"'></div>");
				var rowInnerEl = $("<div class='matrix__row-content'></div>");
				for(var x = 0; x < 8; x++){
					var ledEl = $("<a class='matrix__cell matrix__cell--"+ y +"_"+ x +"'><span class='matrix__led' /></a>");
					ledEl.data("row", y).data("col", x);
					rowInnerEl.append(ledEl);
				}
				rowOuterEl.append(rowInnerEl);
				_self.matrixEl.append(rowOuterEl);
			}

			_self.matrixEl.on("click", "a", function(){
				var $el = $(this);
				var row = $el.data("row");
				var col = $el.data("col");

				_self.buffer[row] ^= 1 << (7-col);

				_self.redrawMatrix();
				_self.writeValue();
			});

			// Hide the input
			$(_self.element).attr("type", "hidden")
				.after(_self.matrixEl);

			// Load value
			_self.readValue();

			// Draw the matrix
			_self.redrawMatrix();

		},
		redrawMatrix: function(){
			var _self = this;
			for(var y = 0; y < 8; y++){
				for(var x = 0; x < 8; x++){
					var $el = $(_self.matrixEl).find(".matrix__cell--"+ y +"_"+ x);
					var mask = 1 << (7-x)
					if(_self.buffer[y] & mask){
						$el.addClass("active");
					} else {
						$el.removeClass("active");
					}
				}
			}
		},
		readValue: function(){
			var _self = this;
			var value = $(_self.element).val();
			if(value.length == 16){
				var parts = value.split(/(?=(?:..)*$)/);
				for(var i = 0; i < parts.length; i++){
					_self.buffer[i] = parseInt(parts[i], 16);
				}
			}
		},
		writeValue: function(){
			var _self = this;
			var value = "";
			for(var y = 0; y < 8; y++){
				value += ("00" + _self.buffer[y].toString(16)).substr(-2);
			}
			$(_self.element).val(value);
		}
	});

	$.fn[ pluginName ] = function ( options ) {
		return this.each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
			}
		});
	};

})( jQuery, window, document );