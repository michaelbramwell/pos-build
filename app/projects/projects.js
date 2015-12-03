(function() {
    'use strict';

    angular
        .module('app.projects')
        .controller('Projects', Projects);

    /* @ngInject */
    function Projects(dataservice, logger, common, $interval, $timeout, $scope) {
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
                    // resize image container to fullscreen
                    carousel.find('.item').height($(window).height() - $('.masthead').height()); 
                    // load first item
                    var currImage = $(carousel.find('.item').eq(0));
                    
                    if(currImage.length > 0) {
                        currImage.css({'background-image': 'url(' + currImage.attr('source') + ')'});                    
                        vm.currentName = currImage.attr('name') 
                    
                        $scope.$apply();
                    }                    
                }, 500);
            }); 
        }

        function getProjects() {
            return dataservice.getProjects().then(function(response) {
                var projects = response.data;
                vm.projects = common.randomize(projects);
                
                // preload first image, it may or may not execute before the first item has loaded
                if(vm.projects.length > 0) {
                    var imageObj = new Image();        
                    imageObj.onload = function(){};            
                    imageObj.src = vm.projects[0].source;
                }                  
            });
        }
        
        function setUpSliderHandlers() {
            
            $('#carousel').on('slide.bs.carousel', function () {
                var idx = $(this).find('.active').index();
                console.log(idx);
                vm.currentName = vm.projects[idx].name;    
                                
                // onload of image add as background to slide
                var fwdNode = $($(this).find('.item')).eq(idx + 1);
                var backwdNode = $($(this).find('.item')).eq(idx - 1);
                
                if(backwdNode.length > 0 && backwdNode.css('background-image') === 'none') {         
                    backwdNode.css({'background-image': 'url(' + backwdNode.attr('source') + ')'});
                }
                
                if(fwdNode.length > 0) {
                    var imageObj = new Image();
        
                    imageObj.onload = function(){
                        fwdNode.css({'background-image': 'url(' + fwdNode.attr('source') + ')'});
                    };
                
                    imageObj.src = vm.projects[idx + 1].source;    
                }  
            });
        }
        
        vm.slide = function (dir) {
            $('#carousel').carousel(dir);
        };
    }
})();
