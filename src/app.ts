import 'reflect-metadata';

const SERVICE = 'mk-service';

function provide() {
    return (target: any) => {
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

@provide()
class Test {
    constructor() {
        console.log('test');
    }

    public hit() {
        return 'return hit';
    }
}

@provide()
class School {
    constructor() {
        console.log(1);
    }

    public sch() {
        return 'return sch';
    }
}

console.log('service 搜集数据：',  Reflect.getMetadata(SERVICE, Reflect));
console.log(Test, School);


