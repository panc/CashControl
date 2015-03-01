'use strict';

angular.module('cashcontrol')
.factory('toasts', ['$timeout', function($timeout) {

    var toasts = [];

    var addToast = function(message, type) {

		var text = 'An error occoured!';
		
		if (message != undefined) {
			if (message.msg != undefined)
				text = message.msg;
			else if (message.errors != undefined)
				text = message.errors[0];
			else
				text = message;
		}
			
        var item = { msg: text, type: type };

        item.timeout = $timeout(function() {
            closeToast(item);
        }, 5000);  

        toasts.push(item);
    };

    var closeToast = function(item) {

        if (item.timeout)
            $timeout.cancel(item.timeout);

        var index = toasts.indexOf(item);
        toasts.splice(index, 1);
    };

    return {
        entries: toasts,

        error: function(message) {
            addToast(message, 'warning');
        },

        info: function(message) {
            addToast(message, 'success');
        },

        closeToast: function(index) {
            closeToast(toasts[index]);
        }
    };
}]);