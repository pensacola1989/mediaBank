var Model = {
	resources: [
		{
			type: 'Image',
			fileName: 'testFile',
			reference: 'xxx',
			date: '20130909',
			uploader: 'nick',
			name: 'test',
			product: '1',
			book: '1',
			unit: '3',
			user: 'www',
			src: 'http://ww4.sinaimg.cn/bmiddle/9e7eb410jw1e8big9ppqpj213v0lsdjv.jpg',
			tags: ['xxx','sss','ddd']
		},
		{
			type: 'Image',
			fileName: 'testFile',
			reference: 'xxsdfsdfsdfx',
			date: '20130909',
			uploader: 'nick',
			name: 'test',
			product: 'NHF',
			book: '1',
			unit: '3',
			user: 'www',
			src: 'http://ww1.sinaimg.cn/bmiddle/7a11525egw1e8cpx56s0sj20hu0a3js7.jpg',
			tags: ['xxx','sss','ddd']
		},
		{
			type: 'Image',
			fileName: 'testFile',
			reference: 'xsdfsdffsdfsdfsdfsdfxx',
			date: '20130909',
			uploader: 'nick',
			name: 'test',
			product: 'NHF',
			book: '1',
			unit: '3',
			user: 'www',
			src: 'http://ww1.sinaimg.cn/bmiddle/7a11525egw1e8cpx56s0sj20hu0a3js7.jpg',
			tags: ['xxx','sss','ddd']
		},
		{
			type: 'Image',
			fileName: 'testFile',
			reference: 'xsdfsdfsdfxx',
			date: '20130909',
			uploader: 'nick',
			name: 'test',
			product: 'NHF',
			book: '1',
			unit: '3',
			user: 'www',
			src: 'http://ww1.sinaimg.cn/bmiddle/7a11525egw1e8cpx56s0sj20hu0a3js7.jpg',
			tags: ['xxx','sss','ddd']
		},
		{
			type: 'Audio',
			fileName: 'testFile',
			reference: 'xsdfsdfsdfsdxx',
			date: '20130909',
			uploader: 'nick',
			name: 'test',
			product: 'NHF',
			book: '1',
			unit: '3',
			user: 'www',
			src: 'http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3',
			tags: ['xxx','sss','ddd']
		},
		{
			type: 'Video',
			fileName: 'testFile',
			reference: 'xsdfsdfsdfsdxx',
			date: '20130909',
			uploader: 'nick',
			name: 'test',
			product: 'NHF',
			book: '1',
			unit: '3',
			user: 'www',
			src: 'http://www.jplayer.org/video/m4v/Big_Buck_Bunny_Trailer_480x270_h264aac.m4v',
			tags: ['xxx','sss','ddd']
		}
	],
	selectItem: {
		product: [
			'1','2','3'
		],
		book: ['1','2','4'],
		unit: ['1','2','3'],
		mediatype: ['Image','Video','Audio'],
	}
}

var itemNum = 20;

var _getData = function () {
	var ret = [];

	for (var i = itemNum - 1; i >= 0; i--) {
		var newModel = JSON.parse(JSON.stringify(Model.resources[0]));
		ret.push(newModel);
	};

	return ret;
}

var mediaBank = angular.module('mediaBank',[]);
mediaBank.controller('index',function ($scope) {

	$scope.selectedNum = 0;
	$scope.checkIndex = 0;
	// dropdownlist
	$scope.config = Model.selectItem;

	$scope.selectedItem = [];

	$scope.tempModel = {};

	$scope.model = Model.resources;

	$scope.mainTab = 'single';

	// $scope.playingModel = '';

	// $scope.openPlayer = function (index) {
	// 	$scope.isPlaying = true;	
	// 	$scope.playingModel = $scope.model[index];
	// };

	$scope.commonProperty = {
		product: '',
		book: '' ,
		unit: '',
		mediatype: '',
		tags: ''
	};

	$scope.saveBoth = function () {
		if($scope.tempModel) {
			for(var i in $scope.tempModel) {
				if(typeof $scope.tempModel[i] == 'object') {
					$scope.tempModel[i].product = $scope.commonProperty.product;
					$scope.tempModel[i].book = $scope.commonProperty.book;
					$scope.tempModel[i].unit = $scope.commonProperty.unit;
					$scope.tempModel[i].type = $scope.commonProperty.mediatype;
					$scope.tempModel[i].tags = $scope.commonProperty.tags;
				}
			}
			alert('saved ok');
			console.log($scope.model);
		}
	};

	$scope.isMultiFile = function () {
		return $scope.selectedNum > 1;
	};

	$scope.single = function () {
		$scope.mainTab = 'single';
	};

	$scope.multi = function () {
		$scope.mainTab = 'multi';
	};


	$scope.show = function (index) {
		$scope.hoverIndex = index;
	};

	$scope.check = function (index) {
		$scope.checkIndex = index;
		$scope.selectedItem[index] = !$scope.selectedItem[index];
		if($scope.selectedItem[index]) {
			$scope.selectedNum++;
			$scope.tempModel[index] = $scope.model[index];
		} else {
			$scope.selectedNum--;
			$scope.tempModel[index] = '';
		}
	};
});
mediaBank.directive('playModal',function () {
	var getTpl = function () {
		var ret = [];
		ret['image'] = '';
		ret['audio'] = '';
		ret['video'] = '';
		return ret[type] || '';
	};

	var renderUI = function (type) {
		var tpl = getTpl(type);
	};
	return {
		restrict: 'A',
		replace: true,
		template: $('.temp2').html(),
		controller: function ($scope,$element,$attrs) {
			$scope.isPlaying = false;
			$scope.playingModel = '';
			$scope.playingIndex = 0;
			$scope.closeDialog = function () {
				$scope.isPlaying = false;	
			};
			$scope.openPlayer = function (index,type) {
				$scope.isPlaying = true;	
				$scope.playingModel = $scope.model[index];
				$scope.playingIndex = index;
			};
			$scope.showPre = function () {
				if($scope.$jplayer) {
					$scope.$jplayer.jPlayer('stop');
				}
				console.log($scope.playingIndex);
				if($scope.playingIndex > 0)
					$scope.playingIndex--;
			};
			$scope.showNext = function () {
				if($scope.$jplayer) {
					$scope.$jplayer.jPlayer('stop');
				}
				console.log($scope.playingIndex);
				if($scope.playingIndex < $scope.model.length - 1)
					$scope.playingIndex++;
			};

			console.log($attrs)
		},
		link: function (scope,ele,attr) {
			
			var $root = $(ele);
			// var src = $(ele).find(".play_content").attr('src')
			// src = scope.$eval(src);
			scope.$jplayer = $root.find('#jplayer_audio');
			scope.$jplayerVideo = $root.find('#jplayer_video');


			scope.$jplayerVideo.jPlayer({
				swfPath: "http://jplayer.org/latest/js",
                supplied: "m4v, ogv"
			});

			scope.$jplayer.jPlayer({
                swfPath: "http://jplayer.org/latest/js",
                supplied: "mp3"
			});	


			scope.playVideo = function () {
				scope.$jplayerVideo.jPlayer('setMedia',{
					m4v: scope.model[scope.playingIndex].src
				}).jPlayer('play');
			};

			scope.playAudio = function () {
				scope.$jplayer.jPlayer('setMedia',{
					mp3: scope.model[scope.playingIndex].src
				}).jPlayer('play');
			};

			scope.stopAudio = function () {
				scope.$jplayer.jPlayer('stop')	
			};
		}
	}
});

mediaBank.directive('modalWin',function(){
  return {
    restrict: 'A',
    replace: true,
    template: $(".temp").html(),
    controller:function($scope,$element,$attrs) {
       $scope.drpProduct = ['NHF','Frontrunner'];
       $scope.product = '';
       $scope.val = 'fuck you';
       $scope.isOpen = false; 
       $scope.open = function() {
           $scope.isOpen = true; 
       };
  
       $scope.close = function() {
          console.log($scope);
         $scope.isOpen = false;
       };

        $scope.uploader = new plupload.Uploader({
    		runtimes: 'html5,html4',
            browse_button:'addFile',
            max_file_size: '20000mb',
            chunk_size: '512kb',
            // resize: { width: 125, height: 85, quality: 90 },
            flash_swf_url: '../scripts/lib/plupload.flash.swf',
            filters: [{
                extensions: 'mp3'
            }]
    	});

        $scope.fileLength = 0;

    	$scope.uploader.bind('init',function () {
    		console.log('init');
    	});
    	$scope.uploader.bind('FilesAdded',function (up,files) {
    		$scope.$apply(function () {
    			$scope.fileLength = files.length;
    		});
    	});
    	$scope.uploader.init();
    },
    link: function (scope,ele,attr) {
    	var height = $(document).height();
    	var width = $(document).width();
    	var css = {
    		position: 'fixed',
    		height: height,
    		width: width,
    		left: 0,
    		top: 0,
    		bottom: 0,
    		right: 0,
    		'background-color': 'rgba(0,0,0,0.7)',
    		'z-index': '10000'
    	}
    	$(ele).css(css);
    	
    }
  };
});