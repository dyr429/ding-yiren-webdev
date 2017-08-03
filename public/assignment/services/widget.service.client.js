
(function() {
    angular
        .module("WebAppMaker")
        .factory("widgetService", widgetService);
    function widgetService($http) {



        var api = {
            "createWidget"   : createWidget,
            "findWidgetById" : findWidgetById,
            "findWidgetByPageId" : findWidgetByPageId,
            "updateWidget": updateWidget,
            "deleteWidget" : deleteWidget,
            "sortWidget" : sortWidget,
        };
        return api;
        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId +"/widget" ;
            return $http.post(url, widget);
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }
        function findWidgetByPageId(pageId) {
            var url = "/api/page/" + pageId +"/widget" ;
            return $http.get(url);
        }
        function updateWidget(widgetId,widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url,widget);
        }


        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }

        function sortWidget(index1, index2,pageId){
            var url = "/api/page/" + pageId + "/widget?initial=" + index1 + "&final=" + index2
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });

        }


    }
})();

