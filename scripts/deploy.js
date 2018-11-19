var co = require('co');
var OSS = require('ali-oss');
var fs = require('fs');

var getEnvironmentVar = function(varname, defaultvalue) {
  var result = process.env[varname];
  if (result!=undefined)
    return result;
  else
    return defaultvalue;
};

var bucket = getEnvironmentVar('BUCKET_NAME', 'spa-host-dev');

console.log('Deploy code to ' + bucket);

var client = OSS({
    accessKeyId: 'LTAIFzb3zqlqO5ZQ',
    accessKeySecret: 'ISmXHA0Ix9WOoOYMcM6Q1vPMlTwygt',
    bucket: bucket,
    region: 'oss-cn-hongkong'
});

var upload = function () {
    console.log(process.cwd());

    fs.readdirSync('/').forEach(file => {
        console.log(file);
    });
    fs.readdirSync('./').forEach(file => {
        console.log(file);
    });
    fs.readdirSync('dist').forEach(file => {
        if (file !== 'assets'){
            co(function* () {
                client.useBucket(bucket);
                var result = yield client.put(file, 'dist/' + file);
                console.log('Finished uploading: ' + file);
            }).catch(function (err) {
                console.log(err);
            });
        }
    });
    fs.readdirSync('dist/assets').forEach(file => {
        console.log(file);
        co(function* () {
            client.useBucket(bucket);
            var result = yield client.put('assets/' + file, 'dist/assets/' + file);
            console.log('Finished uploading: assets/' + file);
        }).catch(function (err) {
            console.log(err);
        });
    });
};

var deleteFunc = function* (object, finished) {
    var deleteRes = yield client.delete(object.name);
    if (finished) {
        upload();
    }
};


co(function* () {
    client.useBucket(bucket);
    var result = yield client.list();
    if (result.objects){
        for (var i = 0; i < result.objects.length; i++) {
            co(deleteFunc(result.objects[i], i === result.objects.length -1))
            .catch(function (err) {
                console.log(err);
            });
        }
    } else {
        upload();
    }
}).catch(function (err) {
    console.log(err);
});
