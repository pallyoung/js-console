'use strict'

var Global = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : {});

var isInjectSupport = true;
var originalConsole = Global.console;

try {
    Global.console = {};
} catch (e) {
    var descriptor = Object.getOwnPropertyDescriptor(Global, 'console');
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

//继承原console的方法
function ConsoleExtender(){

}
ConsoleExtender.prototype = console;


var INFO = 'INFO';
var WARNING = 'WARNING';
var DEBUG = 'DEBUG';
var ERROR = 'ERROR';
var SILENT = 'SILENT';
var LEVEL = {
    INFO: INFO,
    WARNING: WARNING,
    ERROR: ERROR,
    DEBUG: DEBUG,
    SILENT: SILENT
}


function FakeConsole(level) {
    this.name = 'FakeConsole';
    this.isInject = false;
    this.level;
    this.setLevel(level);
}

FakeConsole.prototype = new ConsoleExtender();
FakeConsole.prototype.consturctor = FakeConsole;

FakeConsole.prototype.inject = function(isInject){
    if(!isInjectSupport){
        console.info('don\'t support inject');
        return;
    }else if(isInject){
         Global.console = this;
    }else{
        Global.console = originalConsole;
    }
    this.isInject = isInject
}
FakeConsole.prototype.LEVEL = LEVEL;
FakeConsole.prototype.setLevel = function(level){
    if(this.level === level){
        return;
    }
    this.level = level;
    switch (level) {
        case DEBUG:
            break;
        case INFO:
            _console.debug = noop;
            break;
        case WARNING:
            _console.debug = noop;
            _console.log = noop;
            _console.info = noop;
            break;
        case ERROR:
            _console.debug = noop;
            _console.log = noop;
            _console.info = noop;
            _console.assert = noop;
            _console.warn = noop;
            break;
        case SILENT:
            _console = emptyConsole;
            _level = level;
        default:
            break;
    }
}


var Console = new FakeConsole(LEVEL.DEBUG);
module.exports =  Console;