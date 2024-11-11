import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, Typography, InputNumber, Space, Button, Spin } from 'antd'
import { connect } from 'react-redux'
import { fetchData } from '../reducer/NotebookReducer'
import { bindActionCreators } from 'redux'
import { useParams } from 'react-router-dom'
import { SubmitAction, SubmitUpdateAction } from '../actions/NotebookActions'
import { fetchCartData } from '../actions/CartAction'

const NotebookDetailPage = (props) => {
  const { fetchData, SubmitAction, fetchCartData, SubmitUpdateAction, loading } = props
  const { data } = props.data
  const { id } = useParams()
  const { Title, Text, Paragraph } = Typography
  const { cartData } = props.cartData

  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [stock, setStock] = useState()
  const [detail, setDetail] = useState()
  const [CPU, setCPU] = useState()
  const [graphics, setGraphics] = useState()
  const [RAM, setRAM] = useState()
  const [SSD, setSSD] = useState()
  const [image, setImage] = useState()
  const [targetData, settargetData] = useState()

  const [number, SetNumber] = useState()

  useEffect(() => {
    fetchData()
    fetchCartData()
  }, [])

  useEffect(() => {
    if (targetData) {
      setName(targetData.name)
      setPrice(targetData.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
      setStock(targetData.stock)
      setDetail(targetData.detail)
      setCPU(targetData.CPU)
      setGraphics(targetData.Graphics)
      setRAM(targetData.RAM)
      setSSD(targetData.SSD)
      setImage(targetData.image)
      SetNumber(1)
    }
  }, [targetData])

  useEffect(() => {
    getDetail()
  }, [data])

  const getDetail = () => {
    const filter = data.find((value) => {
      return value.id === id
    })
    settargetData(filter)
  }

  const onChangeNumber = (value) => {
    SetNumber(value)
  }

  const Submit = () => {
    const numId = cartData.length + 1
    var arr = []

    if (cartData.length > 0) {
      for (var item of cartData) {
        arr.push(...item.product_id)
        if (arr.includes(id)) {
          if (item.product_id === id) {
            item.quantity = item.quantity + number
            SubmitUpdateAction(item)
          }
        } else {
          const data = {
            id: numId.toString(),
            product_id: id,
            quantity: number
          }
          SubmitAction(data)
        }
      }
    } else {
      const data = {
        id: numId.toString(),
        product_id: id,
        quantity: number
      }
      SubmitAction(data)
    }
  }

  return (
    <Spin spinning={loading}>
      <Layout style={{ height: '100%' }}>
        <Row justify="center">
          <Col
            xs={24}
            sm={18}
            md={13}
            lg={12}
            xl={10}
            style={{ textAlignLast: 'right', paddingRight: '2rem' }}
          >
            <img
              alt=""
              src={image}
              style={{
                height: '400px'
              }}
            />
          </Col>
          <Col xs={24} sm={18} md={13} lg={12} xl={10}>
            <Title
              style={{
                margin: 0
              }}
            >
              {name}
            </Title>
            <Title
              level={4}
              style={{
                margin: '0px 0px 10px 0px'
              }}
            >
              ฿{price}
            </Title>
            <Text>{detail}</Text>
            <Paragraph>
              <ul>
                <li>
                  <Text strong>CPU: </Text>
                  {CPU}
                </li>
                <li>
                  <Text strong>Graphics: </Text>
                  {graphics}
                </li>
                <li>
                  <Text strong>RAM: </Text>
                  {RAM}
                </li>
                <li>
                  <Text strong>SSD: </Text>
                  {SSD}
                </li>
              </ul>
            </Paragraph>

            <Space wrap>
              <InputNumber min={1} max={stock} defaultValue={1} onChange={onChangeNumber} />
              <Text type="secondary">{stock} Stock</Text>
            </Space>

            <Button type="primary" block style={{ marginTop: '1rem' }} onClick={() => Submit()}>
              ADD TO CART
            </Button>
          </Col>
        </Row>
      </Layout>
    </Spin>
  )
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    cartData: state.cartPage,
    loading: state.detailState.loading
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { fetchData, SubmitAction, fetchCartData, SubmitUpdateAction },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookDetailPage)
