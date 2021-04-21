<template>
  <div>
    订单设置: 待付款订单取消时间设置
     拍下普通订单_分钟内未付款，自动取消订单；同时退回已扣减的积分；
     拍下秒杀订单_分钟内未付款，自动取消订单；同时退回已扣减的积分
     拍下参团订单_分钟内未付款，自动取消订单；同时退回已扣减的积分
     <p>
       发货后自动确认收货时间设置
       实物商品发货后 1 天，自动确认收货
     </p>
  </div>
</template>

<script>
export default {
  name: 'order-setting'
}
</script>

<style lang="scss" scoped>

</style>
