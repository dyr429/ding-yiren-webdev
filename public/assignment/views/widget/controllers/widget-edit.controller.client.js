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

        //initial function
        function init() {
            model.thiswidget = widgetService.findWidgetById(model.widgetId);
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
            var url = "../editors/widget-"
            url += model.thiswidget.widgetType;
            url += "-edit.view.client.html"
            return url;
        }

    }

})();