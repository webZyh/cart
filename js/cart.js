var vm = new Vue({
	el:"#app",
	data:{
		productList:[],
		checkAllFlag: false,
		totalMoney:0,
		delFlag:false,
		curProduct:''
	},
	mounted:function(){
		this.$nextTick(function(){
			this.cartView();
		});
	},
	methods:{
		cartView(){
			this.$http.get("data/cart.json").then(res=>{
				this.productList=res.body.result.productList;
			})
		},
		changeAmount:function(product,flag){
			if(flag>0){
				product.productQuentity++;
			}else{
				product.productQuentity--;
				if(product.productQuentity<1){
					product.productQuentity=1;
				}
			}
			this.calcTotalMoney();
		},
		checkBtn:function(item){
			if(typeof item.check=='undefined'){
				Vue.set(item,'check',true);
			}else{
				item.check=!item.check;
			}
			//当所有单选选中时，全选自动选中
			var count = 0;
			this.productList.forEach((item,index)=>{
				if(item.check){
					count  += 1;
				}else{
					count -= 1;
				}
				return count;
			})
			if(count==this.productList.length){
				this.checkAllFlag = true;
			}else{
				this.checkAllFlag = false;
			}


			this.calcTotalMoney();
		},
		checkAll:function(flag){
			this.checkAllFlag = flag;
			this.productList.forEach((item,index)=>{
				if(typeof item.check == 'undefined'){
					this.$set(item,'check',this.checkAllFlag);
				}else{
					item.check=this.checkAllFlag;
				}
			})
			this.calcTotalMoney();
		},
		calcTotalMoney:function(){
			this.totalMoney=0;
			this.productList.forEach((item,index)=>{
				if(item.check){
					this.totalMoney+=item.productPrice*item.productQuentity;
				}
			})
		},
		delIndex:function(item){
			this.delFlag = true;
			this.curProduct = item;
		},
		delConfirm:function(){
			var index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1);
			this.delFlag=false;
			this.calcTotalMoney();
		}
	}
})
//全局过滤器
Vue.filter("formatMoney",function(value,type){
	return "￥ "+value+' '+type;			//type为所带的参数，例如：元   		html中的用法{{需要格式化的内容 | formatMoney('元')}}
})