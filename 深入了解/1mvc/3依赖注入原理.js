//要注入的服务
var greet = function(word,name,hello){
    console.log(word.text);
    console.log(name.text);
    console.log(hello.text);
};

//定义的服务
var registry = {
    word:{
        text:'hello',
        age:12
    },
    hello:{
        text:'hi'
    },
    name:{
        text:'yctu'
    }
};

//依赖注入的函数 把要注入进来的服务自动执行
var inject = function(fun){
    var func = fun.toString();
    //var service = func.match(/function\s?\((\w+)\)/);
    var services = func.match(/function\s?\((.+)\)/);
    // console.log(services);
    services = services[1];
    var service = services.split(',');
    var args = [];
    for(var i=0;i<service.length;i++){
        var argObj = registry[service[i]];  //text:'hello'
        args.push(argObj);
    }
    console.log(args);
    fun.apply(null,args)
};

//执行
inject(greet);