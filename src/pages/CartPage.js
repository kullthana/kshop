import React, { useState, useEffect } from 'react'
import { Layout, List, Typography, InputNumber, Space, Spin, Button } from 'antd'
import { connect } from 'react-redux'
import { fetchData } from '../actions/ActionsHome'
import { fetchCartData } from '../actions/CartAction'
import { bindActionCreators } from 'redux'
import { SubmitAction, SubmitUpdateAction, SubmitRemoveAction } from '../actions/NotebookActions'
import { useNavigate } from 'react-router-dom'

const CartPage = (props) => {
  const { fetchData, fetchCartData, SubmitUpdateAction, SubmitRemoveAction, loading } = props
  const { data } = props.data
  const { cartData } = props.cartData
  const { Text } = Typography
  const [cartLists, SetCartLists] = useState()
  const [product, SetProduct] = useState()
  const dataCart = []

  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
    fetchCartData()
    cartListData()
  }, [])

  const onChangeNumber = (item) => (value) => {
    onUpdateNumber(item, value)
  }

  const onUpdateNumber = (value, num) => {
    for (var item of cartData) {
      if (item.product_id === value.id) {
        item.quantity = num
        if (item.quantity === 0) {
          SubmitRemoveAction(item)
          refreshPage()
        } else {
          SubmitUpdateAction(item)
        }
      }
    }
  }

  const refreshPage = () => {
    if (!window.location.hash) {
      window.location.reload()
    }
  }

  const cartListData = () => {
    return (
      <div>
        {cartData.slice().map((cart) => {
          data.slice().map((data) => {
            if (data.id === cart.product_id && dataCart.length < cartData.length) {
              data.quantity = cart.quantity
              dataCart.push(data)
              SetCartLists(dataCart)
            }
          })
        })}
      </div>
    )
  }

  return (
    <Spin spinning={loading}>
      <Layout style={{ height: '100%' }}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page)
            },
            pageSize: 5
          }}
          dataSource={cartLists}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <Space wrap>
                  <InputNumber
                    min={0}
                    max={item.stock}
                    defaultValue={item.quantity}
                    onChange={onChangeNumber(item)}
                  />
                  {}
                  <Text type="secondary">{item.stock} Stock</Text>
                </Space>
              ]}
              extra={
                <img
                  width={180}
                  alt=""
                  src={item.image}
                  onClick={() => navigate('/lists/' + item.id)}
                />
              }
            >
              <List.Item.Meta
                title={item.name}
                description={item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
              />

              <Text>{item.detail}</Text>
            </List.Item>
          )}
        />

        <Button type="primary" style={{ marginTop: '1rem', width: '5rem', alignSelf: 'center' }}>
          Checkout
        </Button>
      </Layout>
    </Spin>
  )
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    cartData: state.cartPage,
    loading: state.cartPage.loading
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { fetchData, SubmitAction, fetchCartData, SubmitUpdateAction, SubmitRemoveAction },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
