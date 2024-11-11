import React, { useEffect } from 'react'
import { Layout, Menu, Row, Badge } from 'antd'
import { useNavigate, Routes, Route } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import { connect, useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchData } from '../reducer/NotebookReducer'
import { setKey } from '../reducer/NavReducer'
import NotebookListsPage from '../pages/NotebookListsPage'
import NotebookDetailPage from '../pages/NotebookDetailsPage'
import CartPage from '../pages/CartPage'
import { HomeOutlined, LaptopOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { fetchCartData } from '../actions/CartAction'

const { Content, Footer } = Layout

const NavBar = (props) => {
  const { fetchCartData } = props
  const { cartData } = props.cartData
  const selKey = useSelector((state) => state.toggle.key)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    fetchCartData()
  }, [])

  const handleSelect = (key) => {
    switch (key) {
      case '1':
        navigate('/')
        return
      case '2':
        navigate('/lists')
        return
      case '3':
        navigate('/cart')
        return
      default:
        return
    }
  }
  const url = window.location.pathname

  if (url === '/lists') {
    dispatch(setKey('2'))
  } else if (url === '/cart') {
    dispatch(setKey('3'))
  } else if (url === '/') {
    dispatch(setKey('1'))
  } else {
    dispatch(setKey('0'))
  }

  return (
    <Layout>
      <Row>
        <Menu
          mode="horizontal"
          selectedKeys={[selKey]}
          onSelect={(e) => {
            handleSelect(e.key)
          }}
          style={{
            width: '100%',
            alignItems: 'baseline',
            justifyContent: 'right'
          }}
        >
          <Menu.Item key="1">
            <HomeOutlined /> <span>Home</span>
          </Menu.Item>
          <Menu.Item key="2">
            <LaptopOutlined />
            <span>Shop</span>
          </Menu.Item>

          <Menu.Item key="3">
            <Badge count={cartData.length}>
              <ShoppingCartOutlined style={{ fontSize: '18px' }} />
            </Badge>
          </Menu.Item>
        </Menu>
      </Row>
      <Content
        style={{
          padding: '48px 48px 0px'
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: '90vh'
          }}
        >
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/lists" element={<NotebookListsPage />} />
            <Route path="/lists/:id" element={<NotebookDetailPage />} />

            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', color: '#fff' }}>© K-Shop</Footer>
    </Layout>
  )
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    cartData: state.cartPage
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchData, fetchCartData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
