(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('Projects', Projects)
        .directive('backgroundImage', backgroundImage);

    /* @ngInject */
    function Projects(dataservice, logger, common) {
        /*jshint validthis: true */
        var vm = this;
        vm.projects = [];
        vm.title = 'Projects';

        init();

        function init() {
            return getProjects()
        }

        function getProjects() {
            return dataservice.getProjects().then(function(response) {
                var projects = [];
                var arr = response.data.match(/href=".+"/g);
                console.log(arr);
                arr.forEach(function(element, index) {
                    projects.push({ name: dataservice.getPath() + element.replace('href="', '').replace('"', '')}); 
                });
                
                vm.projects = common.randomize(projects);
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
        if(scope.$index > 0) {
            delay = 6 * scope.$index;
        }
        
        if(scope.$index < 3) {
            element.css('background-image', 'url(' + scope.project.name + ')')    
        }else
        {
            element.attr('data-src', scope.project.name);
        }
        
        element.css('animation-delay', delay + 's');
            
            
    }
})();
