
var obj={
    a:'hello'
};

function foo(){
    console.log(this.a);
}
/**
 * 目标：修改函数中的this指针 让函数执行
 * mycall里面的this是foo这个函数
 */
Function.prototype.myCall = function(target){
    var source = this.toString();
    console.log(source);
    source = source.replace(/this/,function(result){
        // console.log(arguments);
        return 'arguments[0]';
    });
    console.log(source)
    //console.log(source)
    eval('('+source+')(target)');
};

//foo.call(obj);
foo.myCall(obj);
//foo()


