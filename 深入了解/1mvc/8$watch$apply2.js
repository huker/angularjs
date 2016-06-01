/*
* 能实现死循环的机制的$watch 和 $apply API的原理
* */

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

Scope.prototype.$digest = function(){
    var dirty;
    //$digest执行10次就报错
    var count = 10;
    do{
        dirty = this.$digestOnce();
        if(dirty && count == 0){
            throw Error('10 $digest() iterations reached. Aborting!')
        }
    }while(dirty && count--)
};

//检测一次脏数据 返回数据是否脏
Scope.prototype.$digestOnce = function(){
    var that = this;
    var dirty = false; //查看是否有脏数据
    this.$$watcher.forEach(function(watcher){
        var newVal = that[watcher.exp];
        var oldVal = watcher.last;
        if(newVal != oldVal){
            watcher.fn(newVal,oldVal);
            watcher.last = newVal;
            dirty = true;
        }
    });
    return dirty;
};

Scope.prototype.$apply = function(){
    this.$digest();
};
var scope = new Scope();
scope.one = 0;
scope.two = 0;
scope.$watch('one',function(newVal,oldVal){
    scope.two = Math.random();
    console.log(scope.two);
});
scope.$watch('two',function(newVal,oldVal){
    scope.one = Math.random();
    console.log(scope.one);
});
scope.one = 1;
scope.$apply();


//console.log(scope);