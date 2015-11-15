(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('Projects', Projects)
        .directive('backgroundImage', backgroundImage);

    /* @ngInject */
    function Projects(dataservice, logger) {
        /*jshint validthis: true */
        var vm = this;
        vm.projects = [];
        vm.title = 'Projects';

        activate();

        function activate() {
            return getProjects().then(function() {
                logger.info('Activated Projects View');
            });
        }

        function getProjects() {
            return dataservice.getProjects().then(function(response) {
                console.log(response) 
                var projects = [];
                var arr = response.data.match(/href=".+"/g);
                console.log(arr);
                arr.forEach(function(element, index) {
                    projects.push({ name: dataservice.getPath() + element.replace('href="', '').replace('"', '')}); 
                });
                
                vm.projects = projects;
                logger.info('got data');
                console.log(projects);
                return vm.projects;
            });
        }
    }
    
    function backgroundImage()
    {
        var directive = {
            restrict: 'A',
            link: style
        };
        
        return directive;
    }
    
    function style(scope, element)
    {
        var delay = 0;
        console.log(scope.$index);
        if(scope.$index > 0)
        {
            delay = 6 * scope.$index;
        }
        
        element
            .css('background-image', 'url(' + scope.project.name + ')')
            .css('animation-delay', delay + 's');
    }
})();
