"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const SERVICE = 'mk-service';
function provide() {
    return (target) => {
        console.log(target.name);
        console.log('Reflect', Reflect);
        let Services = Reflect.getMetadata(SERVICE, Reflect) || [];
        console.log('Services', Services);
        let newMetadata = [target].concat(Services);
        Reflect.defineMetadata(SERVICE, newMetadata, Reflect);
        console.log('Reflect-get', Reflect.getMetadata(SERVICE, Reflect));
        return target;
    };
}
let Test = class Test {
    constructor() {
        console.log('test');
    }
    hit() {
        return 'return hit';
    }
};
Test = __decorate([
    provide(),
    __metadata("design:paramtypes", [])
], Test);
let School = class School {
    constructor() {
        console.log(1);
    }
    sch() {
        return 'return sch';
    }
};
School = __decorate([
    provide(),
    __metadata("design:paramtypes", [])
], School);
console.log('service 搜集数据：', Reflect.getMetadata(SERVICE, Reflect));
console.log(Test, School);
