import ax from '@/utils/request'

export function getOrderListAPI(parameter) {
  console.log('parameter', parameter)
  return ax({
    url: '/orders',
    method: 'get',
    params: parameter
  })
}

export function getOrderItemListAPI(orderId) {
  const orderIds = orderId['orderId']
  return ax({
    url: `/orders/item/` + orderIds,
    method: 'get',
    withCredentials: true
  })
}

export function getOrderProcessListAPI(parameter) {
  console.log(parameter)
  return ax({
    url: '/orders/process',
    method: 'get',
    params: { parameter }
  })
}

export function getOrderRequestConfirmListAPI(parameter) {
  console.log(parameter)
  return ax({
    url: '/orders/process/confirm',
    method: 'get',
    params: { parameter }
  })
}

export function addOrderProcess(parameter) {
  console.log(parameter)
  return ax({
    url: '/orders/process',
    method: 'post',
    params: { parameter }
  })
}

