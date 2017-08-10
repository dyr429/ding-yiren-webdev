(function() {
    angular
        .module("WebAppMaker")
        .controller("widgetNewController", widgetNewController)

    function widgetNewController($location,$routeParams, widgetService) {
        //declare controller
        var model = this;
        //variable from path
        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];
        // declare functions
        model.newWidget = newWidget;
        model.newHeadingWidget = newHeadingWidget;
        model.newImageWidget = newImageWidget;
        model.newHtmlWidget = newHtmlWidget;
        model.newYoutubeWidget = newYoutubeWidget;
        model.newInputWidget = newInputWidget;
        // functins
        function init() {
        }
        init();

        function newWidget() {
            widgetService.createWidget(model.pageId, model.newwidget)
                .then(function (response) {
                    if(response.data){
                        var _newpage = response.data;
                        var _newwidgetId = _newpage.widgets.slice(-1)[0]
                        $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + _newwidgetId);
                    }
                    else{
                        alert("create fail");
                    }
                });

        }

        function newHeadingWidget() {
            model.newwidget = { "type": "", "_page": "", "size": "", "text": ""};
            model.newwidget.type = "HEADING";
            model.newwidget.size = "1";
            model.newwidget.text = "new text";
            newWidget();
        }
        function newImageWidget() {
            model.newwidget = {"type": "", "_page": "", "width": "", "url": ""};
            model.newwidget.type = "IMAGE";
            model.newwidget.width = "100%";
            model.url = "new url";
            newWidget();
        }
        function newHtmlWidget() {
            model.newwidget = { "type": "", "_page": "", "text": ""};
            model.newwidget.type = "HTML";
            model.newwidget.text = "<p>new html</p>";
            newWidget();
        }
        function newYoutubeWidget() {
            model.newwidget = { "type": "", "_page": "", "width": "", "url": ""};
            model.newwidget.type = "YOUTUBE";
            model.newwidget.width = "100%";
            model.newwidget.url = "new url";
            newWidget();
        }

        function newInputWidget() {
            model.newwidget = { "type": "", "_page": "", "text": ""};
            model.newwidget.type = "INPUT";
            model.newwidget.text = "new input";
            newWidget();
        }

    }

})();