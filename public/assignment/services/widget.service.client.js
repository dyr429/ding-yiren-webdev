
(function() {
    angular
        .module("WebAppMaker")
        .factory("widgetService", widgetService);
    function widgetService() {
        var widgets = [
                { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];


        var api = {
            "createWidget"   : createWidget,
            "findWidgetById" : findWidgetByPageId,
            "findWidgetByPageId" : findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget" : deleteWidget,
        };
        return api;
        function createWidget(pageId, widget) {
            widget._id = (new Date()).getTime() + "";
            widget.pageId = pageId;
            widgets.push(widget);
            return widget;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets){
                var _widget = widgets[w];
                if(_widget._id === widgetId){
                    return _widget;
                }
            }
            return null;
        }
        function findWidgetByPageId(pageId) {
            var result = new Array();
            for(var w in widgets){
                var _widget = widgets[w];
                if(_widget.pageId === pageId){
                    result.push(_widget);
                }
            }
            return result;

        }
        function updateWidget(widgetId,widget) {
            for(var w in widgets){
                if(widgets[w]._id === widgetId){
                    widgets[w] = widget;
                    return widget;
                }
            }
            return null;
        }


        function deleteWidget(widgetId) {
            for(var w in widgets){
                if(widgets[w]._id === widgetId){
                    var deleted = widgets[w];
                    if(w > -1){
                        widgets.splice(w,1);
                    }
                    return deleted;
                }
            }
            return null;
        }
    }
})();

