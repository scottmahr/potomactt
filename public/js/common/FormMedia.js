//This is for all the configuration we need
var app = angular.module("twc");

//FormMedia does all the work to play sounds and video
app.factory('FormMedia', ['$rootScope','$jrCrop','$http','$cordovaCamera','FormState','FormGlobals' ,'FormLifters',
        function($rootScope,$jrCrop,$http,$cordovaCamera,FormState,FormGlobals,FormLifters) {
    var fs = FormState;
    var sounds = [];
    var getMediaURL = function(s) {
        if(device.platform.toLowerCase() === "android") {return "/android_asset/www/" + s;}
        return s;
    }


    var service = {};
    //loads all the sounds so we are ready to use them
    service.loadSounds = function(){
        sounds = _.map(FormGlobals.sounds,function(sound){
            var out = {name: sound.name};
            if(_.has(sound,'path')){
                out['path'] = sound.path;
                out['audio'] = new Media(getMediaURL(sound.path));
            }
            return out;
        });

        console.log("sounds loaded up");

    };
    //plays a sound by name
    service.playSound = function(name){
        if(name==undefined){
            return;
        }
        var sound = _.findWhere(sounds,{name:name});
        if(sound!=undefined && _.has(sound,'audio')){
            //console.log('playing sound...'+name)
            sound.audio.play();
        }
    };
    
    service.playSoundByIdx = function(idx){
        if(idx==undefined){
            return;
        }
        var sound = sounds[idx];
        if(sound!=undefined && _.has(sound,'audio')){
            //console.log('playing sound...'+name)
            sound.audio.play();
        }
    };


    service.getImage = function(){
        console.log('destination:'+Camera.DestinationType.DATA_URL)
        var options = {
          quality: 50,
          //destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          //encodingType: Camera.EncodingType.PNG,
          targetWidth: 300,
          targetHeight: 300,
          correctOrientation:true,
        };

        //var options = {
        //    targetWidth: 100,
        //    targetHeight: 100,
        //};

        console.log('getting image')
        $cordovaCamera.getPicture(options).then(function(imageData) {
            //var image = document.getElementById('myImage');
            console.log(imageData)
            fs.imgData = imageData;
            console.log('got image data')

            $jrCrop.crop({
                url: imageData,
                width: 200,
                height: 200
            }).then(
            function(canvas) {
                console.log('wohoo!')
                var image = canvas.toDataURL("image/png");
                //now, try to upload the image
                image = image.replace('data:image/png;base64,','');
                $http.post("http://formlifting.herokuapp.com/api/loadDataUrl", image,{
                    headers:{'Content-Type':'image/png'
                }})
                .success(function(data, status, headers){
                    console.log('success')
                    console.log(data)
                    console.log(status)
                    console.log(headers)
                    if(data.status=='Saved'){
                        fs.lifter.pictureID = data.id;
                        FormLifters.updateLifter();
                    }
                })
                .error(function(data, status, headers){
                    console.log('error',data,status)
                })
            }, 
            function() {
                console.log('image error')
            });


          //image.src = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            console.log('error:'+err)
          // error
        });
    }

    service.testImage = function(){

        $jrCrop.crop({
            url: '/img/bar.jpg',
            width: 200,
            height: 200
        }).then(function(canvas) {
            console.log('wohoo!')
            var image = canvas.toDataURL("image/png");
            //now, try to upload the image
            image = image.replace('data:image/png;base64,','');
            $http.post("http://formlifting.herokuapp.com/api/loadDataUrl", image,{
                headers:{'Content-Type':'image/png'
            }})
            .success(function(data, status, headers){
                console.log('success')
                console.log(data)
                console.log(status)
                console.log(headers)
                if(data.status=='Saved'){
                    fs.lifter.pictureID = data.id;
                    FormLifters.updateLifter();
                }
            })
            .error(function(data, status, headers){
                console.log('error',data,status)
            })
          }, function() {
              console.log('image error')
          });

    }



    $rootScope.$on('playSound',function(event, data){
        //console.log("playing sound",data);
        if(_.has(data,'soundName')){
          service.playSound(data.soundName);
        }else if(_.has(data,'soundIdx')){
          service.playSoundByIdx(data.soundIdx);
        }


    });

    return service;

}]);

