(function() {
    angular
        .module("WebAppMaker")
        .controller("widgetListController", widgetListController)

    function widgetListController($routeParams,$location, widgetService, $sce) {
        //declare controller
        var model = this;
        //variable from path
        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];

        //declare function
        model.trustHtmlContent = trustHtmlContent;
        model.trustUrlResource = trustUrlResource;
        model.getWidget = getWidget;
        //initial function
        function init() {
            widgetService.findWidgetByPageId(model.pageId)
                .then(function (response) {
                    model.widgets = response.data;
                });
        }
        init();

        //functions
        function trustHtmlContent(content) {
            return $sce.trustAsHtml(content);
        }
        function trustUrlResource(url){
            var youtubeUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split("/");
            youtubeUrl += urlParts[urlParts.length - 1];
            return $sce.trustAsResourceUrl(youtubeUrl);
        }
        function getWidget(type){
            var url = "views/widget/templates/widget-"
            url += type;
            url += ".view.client.html"
            return url;
        }
    }

})();