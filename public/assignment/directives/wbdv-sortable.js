
(function () {
    angular
        .module('myDirectives',[])
        .directive('sortableList', sortableList)

    function sortableList($routeParams,widgetService) {

        function linkFunction(scope, element) {
            var startIndex;
            var pageId = $routeParams.pid;

            function startHandler(event, ui){
                startIndex = $(ui.item).index();
            };

            function stopHandler(event, ui) {
                if (startIndex !== null){
                    var endIndex = $(ui.item).index();
                    widgetService.sortWidget(startIndex,endIndex,pageId).then(
                            console.log(startIndex + " to "+ endIndex)
                    );
                }
            };
            $(element).sortable({
                    start: startHandler,
                    stop: stopHandler
                }
            );
        }
        return {
            link: linkFunction
        }
    }

})();