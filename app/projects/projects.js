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
        vm.currentName = '';

        init();
        
        function init() {    
            setUpSliderHandlers();
                    
            getProjects()
            
            $(function(){
                var carousel = $('#carousel');
                carousel.carousel(); 
                
                $timeout(function(){
                    carousel.find('.item').height($(window).height() - $('.masthead').height());                                        
                }, 500);
            }); 
        }

        function getProjects() {
            return dataservice.getProjects().then(function(response) {
                var projects = response.data;
                vm.projects = common.randomize(projects);      
                
                // pre-load initial 3 images
                for(var i = 0; i < 3; i++) {
                    
                    if(vm.projects[i]) {
                        var fwdNode = $($('#carousel').find('.item')).eq(i);
                        var imageObj = new Image();
                        console.log(fwdNode);
                        imageObj.onload = function(){
                            console.log($('.item').eq(i))
                            console.log(fwdNode.attr('source'));
                            fwdNode.css({'background-image': 'url(' + fwdNode.attr('source') + ')'});
                        };
                    
                        imageObj.src = vm.projects[i].source;                                                
                    }
                }
            });
        }
        
        function setUpSliderHandlers() {
            
            $('#carousel').on('slide.bs.carousel', function () {
                var idx = $(this).find('.active').index();
                
                vm.currentName = vm.projects[idx].name;    
                
                // onload of image add as background to slide
                var fwdNode = $($(this).find('.item')).eq(idx + 3);
                
                if(fwdNode.length > 0) {
                    var imageObj = new Image();
        
                    imageObj.onload = function(){
                        fwdNode.css({'background-image': 'url(' + fwdNode.attr('source') + ')'});
                    };
                
                    imageObj.src = vm.projects[idx + 3].source;    
                }
                 
            });
        }
        
        vm.slide = function (dir) {
            $('#carousel').carousel(dir);
        };
    }
})();
