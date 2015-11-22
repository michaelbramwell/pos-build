(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('Projects', Projects);

    /* @ngInject */
    function Projects(dataservice, logger, common, $interval, $timeout) {
        /*jshint validthis: true */
        var vm = this;
        vm.projects = [];
        vm.title = 'Projects';

        init();

        function init() {            
            getProjects()
            
            $(function(){
                var carousel = $('#carousel');
                carousel.carousel(); 
                
                $timeout(function(){
                    carousel.find('.item').height($(window).height() - $('.masthead').height());                                        
                }, 500);
                
                $interval(function(){
                    $('#carousel').carousel('next');
                }, 10000);
            }); 
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
            $('#carousel').carousel(dir);
        };
    }
})();
