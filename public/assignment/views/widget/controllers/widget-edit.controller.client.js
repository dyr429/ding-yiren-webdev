(function() {
    angular
        .module("WebAppMaker")
        .controller("widgetEditController", widgetEditController)

    function widgetEditController($routeParams,$location, widgetService, $sce) {
        //declare controller
        var model = this;
        //variable from path
        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];
        model.widgetId = $routeParams["wgid"];

        //declare function
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        model.getWidgetEdit = getWidgetEdit;

        // var cloneObj = function(obj){
        //     var str, newobj = obj.constructor === Array ? [] : {};
        //     if(typeof obj !== 'object'){
        //         return;
        //     } else if(window.JSON){
        //         str = JSON.stringify(obj),
        //             newobj = JSON.parse(str);
        //     } else {
        //         for(var i in obj){
        //             newobj[i] = typeof obj[i] === 'object' ?
        //                 cloneObj(obj[i]) : obj[i];
        //         }
        //     }
        //     return newobj;
        // };
        //initial function
        function init() {
            model.thiswidget = cloneObj(widgetService.findWidgetById(model.widgetId));
        }
        init();

        //functions
        function updateWidget() {
            var _widget = widgetService.updateWidget(model.widgetId,model.thiswidget);
            if(_widget){
                alert("update scceuss");
            }
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/"
                + model.pageId + "/widget");

        }
        function deleteWidget(){
            widgetService.deleteWidget(model.widgetId);
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/"
                + model.pageId + "/widget");
        }
        function getWidgetEdit(){
            var url = "views/widget/editors/widget-"
            url += model.thiswidget.widgetType;
            url += "-edit.view.client.html"
            return url;
        }

    }

})();