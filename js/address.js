var vm = new Vue({
	el:'.container',
	data:{
		addressList:[],
		loadNum: 3,
		shippingMethod:1,
		currIndex:0,
		curAddress:''		//当前选中的地址
	},
	mounted:function(){
		this.$nextTick(function(){
			this.getAddressList();
			//console.log(this.addressList);
		})
	},
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0,this.loadNum);
		}
	},
	methods:{
		getAddressList:function(){
			this.$http.get('data/address.json').then(res=>{
				if(res.data.status == '1'){
					this.addressList = res.data.result;		//也可以使用res.body
				}
			});
		},
		loadMore:function(){
			this.loadNum = this.addressList.length;
		},
		//设置默认地址
		setDefault:function(addressId){
			this.addressList.forEach((item,index)=>{
				if(item.addressId==addressId){
					item.isDefault = true;
				}else{
					item.isDefault = false;
				}
			});
		},
		//删除列表中的地址
		delAddress:function(item){
			this.curAddress = item;
			var index = this.addressList.indexOf(this.curAddress);
			this.addressList.splice(index,1);
		}
	}
})