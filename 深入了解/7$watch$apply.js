function Scope(){
    //观察者
    this.$$watcher = [];
}

Scope.prototype.$watch = function(expr,listen){
    var watcher = {
        exp:expr,
        last:undefined,
        fn:listen
    };
    this.$$watcher.push(watcher);
};

Scope.prototype.$apply = function(){
    var that = this;
    this.$$watcher.forEach(function(watcher){
        var newVal = that[watcher.exp];
        var oldVal = watcher.last;
        if(newVal != oldVal){
            watcher.fn(newVal,oldVal);
            watcher.last = newVal;

        }
    })
};
var scope = new Scope();
var age = 0;
scope.$watch('age',function(newVal,oldVal){
    console.log(newVal,oldVal);
});
scope.age = age++;
scope.$apply();
scope.age = age++;
scope.$apply();
//console.log(scope);