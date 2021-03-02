
//无法实例化
namespace a {
	abstract class Animal {
		name!: string;
		abstract getName(): string;
	}

	class Cat extends Animal {
		getName(): string {
			return this.name;
		}
	}
	let cat = new Cat();
	cat.name = 'Sally';
	//console.log(cat.getName());

	//interface: 1. 描述对象 对象有什么属性 是什么类型
	//2. 描述行为的抽象 接口里只能放抽象方法 不能放实现
	interface Speakable {
		speak(): void
	}
	interface Eatable {
		eat(): void
	}

	class Person implements Speakable, Eatable {
		speak() { }
		eat() { }
	}
}

//重写（override):子类重写继承父类的方法
//重载（overload):同一个函数提供多个类型定义
namespace b {
	//override
	class Animal {
		constructor() {

		}
		speak() {
			console.log('Hello');
		}
	}
	class Cat extends Animal {
		speak() {
			console.log('Speak');
			super.speak();
		}
	}
	let cat = new Cat();
	cat.speak();
}


