import ToastComponent from "./vue-toast.vue"   //组件也是一个实例

let Toast = {}

Toast.install = function (Vue, options) {
	//全局配置
	let opt = {
		duration: 3000
	}
	for (let key in options)  {
		opt[key] = options[key];	
	}
	Vue.prototype.$toast = function (message,option) { //扩展原型方法
		//局部配置 (局部覆盖全局设置,局部优先)
		if (typeof option == 'object') {
			for (let key in option) {
				opt[key] = option[key];	
			}
		}
		
		const ToastController = Vue.extend(ToastComponent); //扩展实例
		let instance = new ToastController().$mount(document.createElement('div')); //新的实例 实例可以理解成对象相当于新的Vue 的实例
		let time = option ? option : opt.duration ;
		console.log(time);
		console.log(opt.duration);
		
		instance.message = message;
		instance.visible = true;     
		document.body.appendChild(instance.$el);
		
		
		
		setTimeout(() => {
			instance.visible = false;
			document.body.removeChild(instance.$el);   //instance.$el 类似于 vm.$el 拿到作用域的Dom对象
		}, time)
	}
	Vue.prototype.$toast['show'] = (message, option) => {
		Vue.prototype.$toast(message, option)
	}
	Vue.prototype.$toast['success'] = (message, option) => {
		Vue.prototype.$toast(message, option)
	}
	Vue.prototype.$toast['error'] = (message, option) => {
		Vue.prototype.$toast(message, option)
	}
}

if (window.Vue) {  //注册使用一下插件
	Vue.use(Toast);
}

export default Toast;