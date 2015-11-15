(function() {
    'use strict';

    angular
        .module('app.projects')
        .run(appRun);

    // appRun.$inject = ['routehelper']

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/projects/projects.html',
                    controller: 'Projects',
                    controllerAs: 'vm',
                    title: 'projects'
                }
            }
        ];
    }
})();
