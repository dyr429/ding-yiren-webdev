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
        // functins
        function init() {
        }
        init();

        function newWidget() {
            var _newwidget = widgetService.createWidget(model.pageId, model.newwidget);
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + _newwidget._id);
        }

        function newHeadingWidget() {
            model.newwidget = { "_id": "", "widgetType": "", "pageId": "", "size": "", "text": ""};
            model.newwidget.widgetType = "HEADING";
            model.newwidget.size = "1";
            model.newwidget.text = "new text";
            newWidget();
        }
        function newImageWidget() {
            model.newwidget = { "_id": "", "widgetType": "", "pageId": "", "width": "", "url": ""};
            model.newwidget.widgetType = "IMAGE";
            model.newwidget.width = "100%";
            model.url = "new url";
            newWidget();
        }
        function newHtmlWidget() {
            model.newwidget = { "_id": "", "widgetType": "", "pageId": "", "text": ""};
            model.newwidget.widgetType = "HTML";
            model.newwidget.text = "<p>new html</p>";
            newWidget();
        }
        function newYoutubeWidget() {
            model.newwidget = { "_id": "", "widgetType": "", "pageId": "", "width": "", "url": ""};
            model.newwidget.widgetType = "YOUTUBE";
            model.newwidget.width = "100%";
            model.newwidget.url = "new url";
            newWidget();
        }

    }

})();