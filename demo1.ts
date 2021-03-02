//顺序: 属性和方法(参数 > 方法) > 类

namespace a {
	interface Person {
		xx: string;
		yy: string;
	}

	//这是函数 不是实例
	function enhancer(target: any) {
		//要赋值得赋值到原型上
		target.prototype.xx = '1';
		target.prototype.yy = '2';
	}

	//类装饰器
	@enhancer
	class Person {
		constructor() { }
	}
	let p = new Person();
	//console.log(p.xx);
	//console.log(p.yy);
}

//把类整个替换
namespace b {
	function enhancer(name: string) {
		return function enhancer(target: any) {
			return class Child extends target {
				public name: string = name;
				public age: number = 10;
			}
		}
	}

	@enhancer('Dennis')
	class Person {
		public name: string = 'person';
		constructor() { }
	}
}

//属性装饰器

namespace c {
	//target如果装饰的是普通属性的话，target ->指向类的原型
	//装饰类的属性static，target -> 类的定义
	function upperCase(target: any, propertyName: string) {
		let value = target[propertyName];
		const getter = () => value;
		const setter = (newVal: string) => {
			value = newVal.toUpperCase();
		};
		delete target[propertyName];
		Object.defineProperty(target, propertyName, {
			get: getter,
			set: setter,
			enumerable: true,
			configurable: true,
		});
	}
	//装饰sum中把字符串变成数字
	function toNumber(target: any, methodName: string, propertyDescriptor: PropertyDescriptor) {
		let oldMethod = propertyDescriptor.value;
		propertyDescriptor.value = function (...args: any[]) {
			args = args.map(items => parseFloat(items));
			return oldMethod.apply(this, args);
		}
	}
	class Person {
		@upperCase
		name: string = 'Dennis';
		@toNumber
		sum(...args: any[]) {
			return args.reduce((accu, item) => accu + item, 0);
		}
	}

	let p = new Person();
	p.name = 'Sally';
	//console.log(p.name);
	//console.log(p.sum(1, '2', '3'));
}

//参数修饰器

namespace d {
	interface Person {
		age: number
	}
	function addAge(target: any, methodName: string, paramsIndex: number) {
		target.age = 10;
	}
	class Person {
		login(username: string, @addAge password: string) {
			console.log(this.age, username, password);
		}
	}
	let p = new Person();
	p.login('Dennis', '12222');
}