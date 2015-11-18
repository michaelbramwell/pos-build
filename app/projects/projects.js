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
        vm.animationTime = 0;

        init();

        function init() {
            return getProjects()
        }

        function getProjects() {
            return dataservice.getProjects().then(function(response) {
                var projects = [];
                var arr = response.data.match(/href=".+"/g);
                arr.forEach(function(element, index) {
                    projects.push({ name: dataservice.getPath() + element.replace('href="', '').replace('"', '')}); 
                });
                
                var randomized = common.randomize(projects);
                var rIdx = 0;
                vm.animationTime = randomized.length * 8;
                
                $interval(function(){
                    vm.projects.push(randomized[rIdx]); 
                    rIdx++;                   
                }, 8000, (randomized.length - 1));
            });
        }
    }
})();
