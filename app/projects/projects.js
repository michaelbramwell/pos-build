(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('Projects', Projects);

    /* @ngInject */
    function Projects(dataservice, logger, common, $interval) {
        /*jshint validthis: true */
        var vm = this;
        vm.projects = [];
        vm.title = 'Projects';

        init();

        function init() {            
            getProjects()
        }

        function getProjects() {
            return dataservice.getProjects().then(function(response) {
                var projects = [];
                var arr = response.data.match(/href=".+"/g);
                
                arr.forEach(function(element, index) {
                    projects.push({ name: dataservice.getPath() + element.replace('href="', '').replace('"', '')}); 
                });
                
                vm.projects = common.randomize(projects);                
            });
        }
        
        vm.slide = function (dir) {
            console.log(dir);
            $('#carousel').carousel(dir);
        };
    }
})();
