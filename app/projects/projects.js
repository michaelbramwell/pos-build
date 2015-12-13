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
                    
            getProjects()
            
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
            
            $('#carousel').on('slid.bs.carousel', function (e, f) {
                var idx = $(this).find('.active').index();
                console.log(e);
                console.log(f);
                vm.currentName = vm.projects[idx].name;    
                                
                // onload of image add as background to slide
                var fwdNode = $($(this).find('.item')).eq(idx);
                var backwdNode = $($(this).find('.item')).eq(idx - 1);
                
                if(backwdNode.length > 0 && backwdNode.css('background-image') === 'none') {         
                    backwdNode.css({'background-image': 'url(' + backwdNode.attr('source') + ')'});
                }
                
                if(fwdNode.length > 0) {                    
                    preload(fwdNode, vm.projects);
                }  
                
                setTimeout(function() { $scope.$apply(); }, 0);
            });
        }
        
        function preload(imgEle, imgArrObj) {
            $('#carousel').find('.item').height($(window).height() - $('.masthead').height()); 
            
            for(var i = 0; i < 3; i++) {
                if(imgArrObj[i]) {
                    var imageObj = new Image();
        
                    imageObj.onload = function(){
                        imgEle.css({'background-image': 'url(' + imgEle.attr('source') + ')'});
                    };
                
                    imageObj.src = imgArrObj[i].source;
                }                 
            }            
        }
        
        vm.slide = function (dir) {
            $('#carousel').carousel(dir);
        };
    }
})();
