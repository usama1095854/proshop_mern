import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  MY_ORDER_LIST_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from '../actions/types'

export const orderCreateReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: payload,
      }
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: payload,
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderDeliverReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case ORDER_DELIVER_RESET:
      return {}
    default:
      return state
  }
}

export const myOrderListReducer = (state = { orders: [] }, action) => {
  const { type, payload } = action

  switch (type) {
    case MY_ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case MY_ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: payload,
      }
    case MY_ORDER_LIST_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case MY_ORDER_LIST_RESET:
      return { orders: [] }
    default:
      return state
  }
}

export const orderListReducer = (state = { orders: [] }, action) => {
  const { type, payload } = action

  switch (type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: payload,
      }
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
