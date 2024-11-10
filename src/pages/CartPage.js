import React, { useState, useEffect } from 'react'
import { Layout, List, Typography, InputNumber, Space, Spin } from 'antd'
import { connect } from 'react-redux'
import { fetchData } from '../actions/ActionsHome'
import { fetchCartData } from '../actions/CartAction'
import { bindActionCreators } from 'redux'
import { SubmitAction, SubmitUpdateAction } from '../actions/NotebookActions'
import { useNavigate } from 'react-router-dom'

const CartPage = (props) => {
  const { fetchData, fetchCartData, SubmitUpdateAction, loading } = props
  const { data } = props.data
  const { cartData } = props.cartData
  const { Text, Paragraph } = Typography
  const [number, SetNumber] = useState()
  const [cartLists, SetCartLists] = useState()
  const dataCart = []

  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
    fetchCartData()
    cartListData()
  }, [])

  const onChangeNumber = (value) => {
    SetNumber(value)
  }

  const onUpdateNumber = (value) => {
    value.quantity = number
    SubmitUpdateAction(value)
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
            pageSize: 4
          }}
          dataSource={cartLists}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <Space wrap>
                  <InputNumber
                    min={1}
                    max={item.stock}
                    defaultValue={item.quantity}
                    onChange={onChangeNumber}
                  />
                  <Text type="secondary">{item.stock} Stock</Text>
                </Space>
              ]}
              extra={
                <img
                  width={272}
                  alt=""
                  src={item.image}
                  onClick={() => navigate('/lists/' + item.id)}
                />
              }
            >
              <List.Item.Meta title={item.name} description={item.price} />

              <Text>฿{item.price}</Text>
              <Paragraph>
                <ul>
                  <li>
                    <Text strong>CPU: </Text>
                    {item.CPU}
                  </li>
                  <li>
                    <Text strong>Graphics: </Text>
                    {item.graphics}
                  </li>
                  <li>
                    <Text strong>RAM: </Text>
                    {item.RAM}
                  </li>
                  <li>
                    <Text strong>SSD: </Text>
                    {item.SSD}
                  </li>
                </ul>
              </Paragraph>
            </List.Item>
          )}
        />
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
    { fetchData, SubmitAction, fetchCartData, SubmitUpdateAction },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
