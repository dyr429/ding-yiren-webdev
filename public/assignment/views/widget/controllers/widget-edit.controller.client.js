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
            widgetService.findWidgetById(model.widgetId)
                .then(function (response) {
                    model.thiswidget = response.data;
                });
        }
        init();

        //functions
        function updateWidget() {
            widgetService.updateWidget(model.widgetId,model.thiswidget)
                .then(function (response) {
                    if(response.data != "0"){
                        alert("update scceuss");
                        $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/"
                            + model.pageId + "/widget");
                    }
                    else{
                        alert("update fail");
                    }
                });
        }
        function deleteWidget(){
            widgetService.deleteWidget(model.widgetId)
                .then(function (response) {
                    if(response.data!="0"){
                        alert("delete success");
                        $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/"
                            + model.pageId + "/widget");
                    }
                    else {
                        alert("delete fail");
                    }
                });
        }
        function getWidgetEdit(){
            if(model.thiswidget){
                var url = "views/widget/editors/widget-"
                url += model.thiswidget.type;
                url += "-edit.view.client.html"
                return url;
             }
        }

    }

})();