//泛型Generics
namespace a {
	function createArray<T>(length: number, value: T): Array<T> {
		let result: Array<T> = [];
		for (let i = 0; i < length; i++) {
			result[i] = value;
		}
		return result;
	}
	let result = createArray<string>(3, 'x');
	//console.log(result);

	//类数组 ArrayLike arguments
	function sum(...args2: any[]) {
		let args: IArguments = arguments;
		for (let i = 0; i < args.length; i++) {
			console.log(args[i]);
		}
	}
	//sum(1, 2, 3);

	/* 	let root: HTMLElement | null = document.getElementById('root');
		let children: HTMLCollection = root!.children;
		let childNodes: NodeListOf<ChildNode> = root!.childNodes; */

	class MyArray<T> {
		private list: T[] = [];
		add(val: T) {
			this.list.push(val);
		}
		getMax(): T {
			let result: T = this.list[0];
			for (let i = 1; i < this.list.length; i++) {
				if (this.list[i] > result) {
					result = this.list[i];
				}
			}
			return result;
		}
	}
	let arr = new MyArray<number>();
	arr.add(1);
	arr.add(2);
	arr.add(3);
	let result2 = arr.getMax();
	//console.log(result2);

	//接口泛型
	interface Calculate {
		<T>(a: T, b: T): T
	}
	let add: Calculate = function <T>(a: T, b: T): T {
		return b;
	}
	let result3 = add<number>(5, 5);
	//console.log(result3);

	//多个类型参数 如何在不增加中间变量的情况下，交换两个变量的值
	function swap<A, B>(tuple: [A, B]): [B, A] {
		return [tuple[1], tuple[0]];
	}
	const result4 = swap<number, number>([1, 2]);
	//console.log(result4);
}

//泛型的约束 在函数中使用泛型 预先不知道泛型的具体类型 所以不能询问相应类型的方法
//没有借口的话 不能直接调用value.length
namespace b {
	interface LengthWise {
		length: number
	}
	function logger<T extends LengthWise>(value: T) {
		console.log(value.length);
	}	

	interface Cart<T> {
		list: T[]
	}
	let cart: Cart<string> = {
		list: ['1', '2', '3']
	}

	//泛型类型别名
	type Cart2<T> = { list: T[] } | T[];
	let c1: Cart2<string> = {list: ['1']};
	let c2: Cart2<string> = ['1'];

	//interface定义一个实实在在的接口 是真正的类型
	//type一般用来定义别名 并不是一个真正的类型 不能继承和实现
}


