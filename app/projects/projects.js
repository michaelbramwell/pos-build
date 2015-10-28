(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('Projects', Projects);

    /* @ngInject */
    function Projects(dataservice, logger) {
        /*jshint validthis: true */
        var vm = this;
        vm.projects = [];
        vm.title = 'Projects';

        activate();

        function activate() {
//            Using a resolver on all routes or dataservice.ready in every controller
//            var promises = [getProjects()];
//            return dataservice.ready(promises).then(function(){
            return getProjects().then(function() {
                logger.info('Activated Avengers View');
            });
        }

        function getProjects() {
            return dataservice.getProjects().then(function(data) {
                vm.projects = data;
                return vm.projects;
            });
        }
    }
})();
