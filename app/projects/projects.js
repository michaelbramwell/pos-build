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
            return getProjects().then(function() {
                logger.info('Activated Projects View');
            });
        }

        function getProjects() {
            return dataservice.getProjects().then(function(data) {
                vm.projects = data;
                logger.info('got data')
                console.log(data);
                return vm.projects;
            });
        }
    }
})();
