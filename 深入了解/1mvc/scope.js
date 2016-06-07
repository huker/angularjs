function Scope(){
    this.$$watcher = [];
}

Scope.prototype.$watch = function(target,callback){
    var watcher = {
        exp:target,
        last:undefined,
        fn:callback
    };
    this.$$watcher.push(watcher);
};

Scope.prototype.$apply = function(){
    var that = this;
    this.$$watcher.forEach(function(watcher){
        var newVal = that[watcher.exp];
        var oldVal = watcher.last;
        if( newVal != oldVal){
            watcher.fn(oldVal,newVal);
            watcher.last = newVal;
        }
    })
};

var scope = new Scope();
var num = 0;

scope.$watch('add',function(oldVal,newVal){
    console.log(oldVal,newVal);
});

scope.add = num++;
scope.$apply();
scope.add = num++;
scope.$apply();
