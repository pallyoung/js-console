(function (factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : window.JSConsole = factory();
})(function () {
    'use strict'
        var Global = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : {});

    var isInjectSupport = true;
    var originalConsole = Global.console;

    try {
        Global.console = {};
    } catch (e) {
        var descriptor = Object.getOwnPropertyDescriptor(global, 'console');
        if (descriptor.configurable) {
            delete Global.console;
            Global.console = originalConsole;
        } else {
            isInjectSupport = false;
        }
    }

    Global.console = originalConsole;


    var emptyConsole = {

    }
  
    var prop, method;
    function noop() { }

    function hasOwnProperty(o, p) {
        return Object.hasOwnProperty(o, p);
    }

    function isFunction(arg) {
        return typeof arg === 'function';
    }
    var DEBUG = 1;
    var INFO = 2;
    var WARNING = 3;
    var ERROR = 4;
    var SILENT = 5;
    var LEVEL = {
        DEBUG: DEBUG,
        INFO: INFO,
        WARNING: WARNING,
        ERROR: ERROR,
        SILENT: SILENT
    }

    function forEach(arr,callback){
        var i = 0,l = arr.length;
        for(;i<l;i++){
            callback(arr[i]);
        }
    }
    function map(arr,callback){
        var dist = [];
        forEach(arr,function(item){
            var result = callback(item);
            if(result!==undefined){
                dist.push(result);
            }
        });
        return dist;
    }
    /**
     * %s 字符串
     * %o 链接对象        
     */
    function formatArguments(){

    }
    
    //继承原console的方法
    function ConsoleExtender() {

    }
    ConsoleExtender.prototype = console;

    function FakeConsole(level) {
        this.name = 'FakeConsole';
        this.isInject = false;
        this.level = level;
        this.prefix = function prefix(){
            return new Date().toDateString()+':';
        }
        this.storage = function storage(formatMessage){
            
        }

    }

    FakeConsole.prototype = new ConsoleExtender();
    FakeConsole.prototype.consturctor = FakeConsole;

    FakeConsole.prototype.log = function log() {
         if(this.level>=LEVEL.WARNING){
            return;
        }
        var self = this;
        var messages = map(arguments,function(message){
            return self.prefix()+message;
        }).join('\r\n');
        originalConsole.log(messages);
        this.storage(messages);
    };
    FakeConsole.prototype.debug = function debug() {
        if(this.level>=LEVEL.INFO){
            return;
        }
        var self = this;
        var messages = map(arguments,function(message){
            return self.prefix()+message;
        }).join('\r\n');
        originalConsole.debug(messages);
        this.storage(messages);
    };
    FakeConsole.prototype.info = function info() {
        if(this.level>=LEVEL.WARNING){
            return;
        }
        var self = this;
        var messages = map(arguments,function(message){
            return self.prefix()+message;
        }).join('\r\n');
        originalConsole.info(messages);
        this.storage(messages);
    };
    FakeConsole.prototype.warn = function warn() {
         if(this.level>=LEVEL.ERROR){
            return;
        }
        var self = this;
        var messages = map(arguments,function(message){
            return self.prefix()+message;
        }).join('\r\n');
        originalConsole.warn(messages);
        this.storage(messages);
    };
    FakeConsole.prototype.error = function error() {
        if(this.level === LEVEL.SILENT ){
            return;
        }
        var self = this;
        var messages = map(arguments,function(message){
            return self.prefix()+message;
        }).join('\r\n');
        originalConsole.error(messages);
        this.storage(messages);
    };

    FakeConsole.prototype.inject = function (isInject) {
        if (!isInjectSupport) {
            originalConsole.info('don\'t support inject');
            return;
        } else if (isInject) {
            Global.console = this;
        } else {
            Global.console = originalConsole;
        }
        this.isInject = isInject
    }
    FakeConsole.prototype.LEVEL = LEVEL;
  

    var Console = new FakeConsole(LEVEL.DEBUG);
    return Console;
});
