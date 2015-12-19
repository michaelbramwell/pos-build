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

        $(function(){
            init();                        
        });
        
        function init() {    
            setUpSliderHandlers();                    
            getProjects();            
        }

        function getProjects() {
            return dataservice.getProjects().then(function(response) {
                var projects = response.data;
                var loader = {
                    "name": "",
                    "source": "/images/projects/loader.jpg"
                };          
                
                vm.projects = common.randomize(projects);
                vm.projects.unshift(loader);
                
                // preload first image, it may or may not execute before the first item has loaded
                if(vm.projects.length > 0) {
                    
                    var carousel = $('#carousel');
                    carousel.carousel({ interval: 20000 }); 
                    
                    $timeout(function() {
                        // resize image container to fullscreen
                        carousel.find('.item').height($(window).height() - $('.masthead').height()); 
                        // load first item
                        var currImages = $(carousel.find('.item'));
                        var currImage = currImages.eq(0);
                        
                        if(currImage.length > 0) {                  
                            vm.currentName = currImage.attr('name');                            
                            preload(currImages, vm.projects, 0);                            
                            $scope.$apply();
                        }                    
                    }, 100);
                }                  
            });
        }
        
        function setUpSliderHandlers() {
            
            $('#carousel').on('slid.bs.carousel', function () {                
                var idx = $(this).find('.active').index();
                vm.currentName = 'Positiva in ' + vm.projects[idx].name + ', Western Australia';    
                                
                // onload of image add as background to slide
                var fwdNodes = $($(this).find('.item'));
                var backwdNode = $($(this).find('.item')).eq(idx - 1);
                
                if(backwdNode.length > 0 && backwdNode.css('background-image') === 'none') {         
                    backwdNode.css({'background-image': 'url(' + backwdNode.attr('source') + ')'});
                }
                
                if(fwdNodes.length > 0) {                    
                    preload(fwdNodes, vm.projects, idx);
                }  
                
                setTimeout(function() { $scope.$apply(); }, 0);
            });
        }
        
        function preload(imgEles, imgArrObj, currentIdx) {
            
            for(var i = 0; i < 5; i++) {
                
                if(imgArrObj[currentIdx + i]) {
                    var currImage = imgEles.eq(currentIdx + i);
                    var imageObj = new Image();
                    
                    imageObj.onload = function(){
                        console.log($(this).prop('src'));
                        
                        if($(this).prop('src').indexOf('loader') !== -1) {
                            setTimeout(function(){
                                $('#carousel').carousel('next');                                                                
                            }, 2000);
                        }
                    };
                
                    imageObj.src = imgArrObj[currentIdx + i].source;
                    
                    currImage.css({"background-image": 'url(' + currImage.attr('source') + ')'});
                    
                }                 
            }            
        }
        
        vm.slide = function (dir) {
            $('#carousel').carousel(dir);
        };
    }
})();
