(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger) {
        var isPrimed = false;
        var primePromise;

        var service = {
            getProjects: getProjects,
            getPath: getPath,
            ready: ready
        };

        return service;
        
        function getPath()
        {
            return '/images/projects/';
        }

        function getProjects() {
            
            /*var projects = [
                { name: path + '/fremantle1_0313-078.jpg' },
                { name: path + '/fremantle1_0312-077.jpg' },
                { name: path + '/fremantle1_0311-076.jpg' },
                { name: path + '/fremantle1_0273-055.jpg' },
                { name: path + '/fremantle1_0270-054.jpg' },
                { name: path + '/fremantle1_0266-052.jpg' }
            ];*/
            
            return $http.get(this.getPath());//.then(function(response){
                //var arr = response.data.match(/href=".+"/g);
                             
                /*
                arr.forEach(function(element, index) {
                    projects.push(path + element.replace('href="', '').replace('"', ''));
                });
                */
          
            //});
            
            //return projects;
            //return $q.when(projects);
        }

        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
                logger.info('Primed data');
            }
        }

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function failed'));
        }

    }
})();
