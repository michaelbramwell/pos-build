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
                
                var item = 0;
                $interval(function(){
                    $('#carousel').carousel('next');
                    console.log(vm.projects[item]);
                    
                    // pre-load next 3 images
                    for(var i = (item + 3); i < (item + 6); i++) {
                        
                        if(vm.projects[i]) {                            
                            var imageObj = new Image();
                            imageObj.onload = function(){
                                console.log(this);
                            };
                            imageObj.src = vm.projects[i].name;                                                
                        }
                    }
                    
                    item++;
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
                
                // pre-load initial 3 images
                for(var i = 0; i < 3; i++) {
                    console.log(i);
                    if(vm.projects[i]) {
                        var imageObj = new Image();
                        imageObj.onload = function(){
                            console.log(this);
                        };
                        imageObj.src = vm.projects[i].name;                                                
                    }
                }
            });
        }
        
        vm.slide = function (dir) {
            $('#carousel').carousel(dir);
        };
    }
})();
