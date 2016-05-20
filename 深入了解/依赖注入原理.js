//要注入的服务
var greet = function(word){
    console.log(word.text)
};

//定义的服务
var registry = {
    word:{
        text:'hello'
    }
};

//依赖注入的函数 把要注入进来的服务自动执行
var inject = function(fun){
    var func = fun.toString();
    var service = func.match(/function\s?\((\w+)\)/);
    console.log(service);
    service = service.slice(1);
    var args = [];
    for(var i=0;i<service.length;i++){
        var argObj = registry[service[i]];  //text:'hello'
        args.push(argObj);
    }
    fun.apply(null,args)
};

//执行
inject(greet);