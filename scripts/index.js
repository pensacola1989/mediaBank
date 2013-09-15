var Model = {
	resources: [
		{
		    id: 1,
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
			thumbnial: 'http://ww4.sinaimg.cn/bmiddle/9e7eb410jw1e8big9ppqpj213v0lsdjv.jpg',
			src: 'http://ww4.sinaimg.cn/bmiddle/9e7eb410jw1e8big9ppqpj213v0lsdjv.jpg',
			tags: ['xxx','sss','ddd'],
			attachAcivity: ['activity1','activity2']
		},
		{
		    id: 2,
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
			thumbnial: 'http://ww1.sinaimg.cn/bmiddle/7a11525egw1e8cpx56s0sj20hu0a3js7.jpg',
			src: 'http://ww1.sinaimg.cn/bmiddle/7a11525egw1e8cpx56s0sj20hu0a3js7.jpg',
			tags: ['xxx','sss','ddd'],
			attachAcivity: ['activity1','activity2']
		},
		{
		    id: 3,
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
			thumbnial: 'http://ww1.sinaimg.cn/bmiddle/7a11525egw1e8cpx56s0sj20hu0a3js7.jpg',
			src: 'http://ww1.sinaimg.cn/bmiddle/7a11525egw1e8cpx56s0sj20hu0a3js7.jpg',
			tags: ['xxx','sss','ddd'],
			attachAcivity: ['activity1','activity2']
		},
		{
		    id: 4,
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
			thumbnial: 'http://ww1.sinaimg.cn/bmiddle/7a11525egw1e8cpx56s0sj20hu0a3js7.jpg',
			src: 'http://ww1.sinaimg.cn/bmiddle/7a11525egw1e8cpx56s0sj20hu0a3js7.jpg',
			tags: ['xxx','sss','ddd'],
			attachAcivity: []
		},
		{
		    id: 5,
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
			thumbnial: 'http://ww2.sinaimg.cn/bmiddle/80a16a36gw1e8ezn1p03xj21kw0vlgqw.jpg',
			src: 'http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3',
			tags: ['xxx','sss','ddd'],
			attachAcivity: []
		},
		{
		    id: 6,
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
			thumbnial: 'http://ww2.sinaimg.cn/bmiddle/80a16a36gw1e8ezn1p03xj21kw0vlgqw.jpg',
			src: 'http://www.jplayer.org/video/m4v/Big_Buck_Bunny_Trailer_480x270_h264aac.m4v',
			tags: ['xxx','sss','ddd'],
			attachAcivity: ['activity1','activity2']
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

	$scope.confirmOption = {
	    show: false,
	    Confirmcontent: "The file could not be deleted because it's being used in N activities.Edit the activities and try again.'"
	};

	$scope.fileItemDelete = function (index) {
		if ($scope.model[index].attachAcivity.length > 1) {
		    $scope.warning();
		} else {
		    var id = $scope.model[index].id;
		    $scope.model.splice(index, 1);
		    $scope.selectedNum--;
		    
		    $scope.selectedItem[id] = false;
		}
	};
	$scope.warning = function () {
		$scope.confirmOption.show = true;
	};

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
	    $scope.checkIndex = $scope.model[index].id;
	    var id = $scope.model[index].id;
	    $scope.selectedItem[id] = !$scope.selectedItem[id];
	    if($scope.selectedItem[id]) {
	    	$scope.selectedNum++;
	    	$scope.tempModel[id] = $scope.model[index];
	    } else {
	    	$scope.selectedNum--;
	    	$scope.tempModel[id] = '';
	    }
	};

	// $scope.replaceModel = 'sd';

    $scope.replace = function(index) {
        var replaceId = $scope.model[index].id;
        $scope.replaceModel = $scope.model[index];
        $scope.open();
        $scope.uploader.settings.multi_selection = false;
       	$scope.uploader.settings.url = 'xxx';
       	$scope.uploader.refresh();
        console.log($scope);
    };
});

mediaBank.directive('confirm',function () {
	return {
        priority:100,
        template:['<div class="confirmModal" ng-show="visible">',
                '<div class="confirmWin" ng-show="visible">',
                ' <div class="confirmHeader">',
                '   <div class="confirmTitle">{{title}}',
                '   </div>',
                '   <div class="confirmClose" ng-click="onClose()">',
                '   </div>',
                ' </div>',
                ' <div class="body" ng-transclude></div>',
                '    </div>',
                '</div>'].join(""),
        replace:false,
        transclude: true,
        restrict:'E',
        scope:{
            title:"@",//引用dialog标签title属性的值
            onClose:"&",//以wrapper function形式引用dialog标签的on-ok属性的内容
            onCancel:"&",//以wrapper function形式引用dialog标签的on-cancel属性的内容
            visible:"@"//引用dialog标签visible属性的值
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
				if($scope.$jplayer) {
					$scope.stopAudio();
				}
				if($scope.$jplayerVideo) {
					$scope.stopVideo();
				}
			};
			$scope.openPlayer = function (index,type) {
				$scope.isPlaying = true;	
				$scope.playingModel = $scope.model[index];
				$scope.playingIndex = index;
			};
			$scope.showPre = function () {
				if($scope.$jplayer) {
					$scope.stopAudio();
				}
				if($scope.$jplayerVideo) {
					$scope.stopVideo();
				}
				console.log($scope.playingIndex);
				if($scope.playingIndex > 0)
					$scope.playingIndex--;
			};
			$scope.showNext = function () {
				if($scope.$jplayer) {
					$scope.stopAudio();
				}
				if($scope.$jplayerVideo) {
					$scope.stopVideo();
				}
				console.log($scope.playingIndex);
				if($scope.playingIndex < $scope.model.length - 1)
					$scope.playingIndex++;
			};

			console.log($attrs)
		},
		link: function (scope,ele,attr) {
			
			var $root = $(ele);
			scope.$jplayer = $root.find('#jplayer_audio');
			scope.$jplayerVideo = $root.find('#jplayer_video');


			scope.$jplayerVideo.jPlayer({
				swfPath: "http://jplayer.org/latest/js",
				supplied: "m4v, ogv",
				cssSelectorAncestor: ".ctrl_pannel",
				cssSelector: {
                    mute: "#A2",
                    unmute: "#A3"
                }
			});

			scope.$jplayer.jPlayer({
                swfPath: "http://jplayer.org/latest/js",
                supplied: "mp3",
                cssSelectorAncestor: ".ctrl_pannel",
                cssSelector: {
                    mute: "#mute",
                    unmute: "#unmute"
                }
			});	

			scope.playVideo = function () {
				scope.$jplayerVideo.jPlayer('setMedia',{
					m4v: scope.model[scope.playingIndex].src
				}).jPlayer('play');
			};
			scope.stopVideo = function () {
				scope.$jplayerVideo.jPlayer('stop');
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
    controller: function ($scope, $element, $attrs) {
    
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
        };
    	$(ele).css(css);
    	function readURL(input) {

            if (input.files.length) {
                var files = input.files;
                var template = ['<div class="preview_container">',
                                                '<img src="{data}"/>',
                                                '<div class="progress">',
                                                    '<div class="progress_bar">',
                                                    '</div>',
                                                    '<div class="progress_percent">to be uploaded',
                                                    '</div>',
                                                '</div>',
                                            '</div>'].join('');
                for (var i = 0; i < files.length; i++) {
                    if (files[i].type == 'audio/mp3') {
                        template = template.replace('{data}', 'http://www.baidu.com/img/270129pc_60ef2bb4e1cdaf92255e9c45ed3a8d05.gif');
                        $(template).appendTo('.file_container');
                    } else {
                        (function (file) {
                            var reader = new FileReader();

                            reader.onload = function (e) {
                                console.log(i);
                                // $('.preview_img').eq(i).attr('src', e.target.result);

                                template = template.replace('{data}', e.target.result);
                                $(template).appendTo('.file_container');
                            };
                            reader.readAsDataURL(file);
                        })(files[i]);
                    }

                }
            }
        }


        var uploadedModel = [];
       scope.drpProduct = ['NHF','Frontrunner'];
       scope.product = '';
       scope.val = 'fuck you';
       scope.isOpen = false; 
       scope.open = function() {
           scope.isOpen = true; 
       };

       scope.close = function () {
           if (scope.uploader.state == 2) {
               return false;
           } 
           scope.isOpen = false;
           $('.file_container').empty();
           scope.uploader.splice();
           if (uploadedModel.length) {
               for (var i = 0; i < uploadedModel.length; i++) {
                   scope.model.push(uploadedModel[i]);
                   scope.selectedItem[uploadedModel[i].id] = true;
                   scope.tempModel[uploadedModel[i].id] = uploadedModel[i];
                   scope.selectedNum++;
               }
            //   scope.model.reverse();
               uploadedModel = [];
           }
       };

        scope.uploader = new plupload.Uploader({
    		runtimes: 'html5,html4',
            browse_button:'addFile',
            max_file_size: '20000mb',
            chunk_size: '512kb',
            multi_selection: true,
            // resize: { width: 125, height: 85, quality: 90 },
            flash_swf_url: '../scripts/lib/plupload.flash.swf',
            filters: [{
                extensions: 'jpg,png,mp3'
            }]
    	});
        
        scope.fileLength = 0;
        scope.currentUpload = 0;
    	scope.uploader.bind('init',function () {
    		console.log('init');
    	});
        scope.uploader.bind('UploadProgress', function(up, files) {
            $('.progress_percent').eq(scope.currentUpload).html(files.percent + '%');
            $('.progress_bar').eq(scope.currentUpload).css('width', files.percent + '%');
        });
    	scope.uploader.bind('FilesAdded',function (up,files) {
    		console.log(up);
    		scope.$apply(function () {
    			scope.fileLength = files.length;
    		});
    	    
    	    readURL($('input[type=file]')[0]);
    	});
        scope.uploader.bind('BeforeUpload', function(up, file) {
            var mediaName = 'MediaBank' + Math.random().toString().substr(2);
            up.settings.url = '/Upload.ashx?medianame=' + mediaName + '&activityid=2013';
        });

        function getMediaType(type) {
            var ret = {};
            ret['jpg'] = 'image';
            ret['png'] = 'image';
            ret['gif'] = 'image';
            ret['mp3'] = 'audio';

            return ret[type] || '';
        }
        scope.uploader.bind('FileUploaded', function(up, file, info) {
            scope.currentUpload++;
            var id = scope.model[scope.model.length - 1].id;
            var newModel = {
                id: ++id,
                type: getMediaType(file.name.split('.')[1].toLowerCase()),
                fileName: 'testFile',
                reference: 'xsdfsdffsdfsdfsdfsdfxx',
                date: '20130909',
                uploader: 'nick',
                name: 'test',
                product: 'NHF',
                book: '1',
                unit: '3',
                user: 'www',
                thumbnial: info.response,
                src: info.response,
                tags: ['xxx', 'sss', 'ddd'],
                attachAcivity: ['activity1', 'activity2']
            };
            uploadedModel.push(newModel);
        });
        scope.uploader.bind('UploadComplete', function(up, file) {
            scope.currentUpload = 0;
            console.log(scope.model);
        });
        scope.uploader.init();
        $('#save').bind('click', function() {
            scope.uploader.start();
        });
    }
  };
});