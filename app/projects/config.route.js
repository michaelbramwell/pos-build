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
                url: '/projects',
                config: {
                    templateUrl: 'app/projects/projects.html',
                    controller: 'Projects',
                    controllerAs: 'vm',
                    title: 'projects',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Projects'
                    }
                }
            }
        ];
    }
})();
