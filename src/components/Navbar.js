import React, { useState, useEffect } from 'react'
import { Layout, Menu, Row, Badge, Typography } from 'antd'
import { useNavigate, Routes, Route } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import { Select } from 'antd'
import { connect, useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchData } from '../reducer/NotebookReducer'
import { setKey } from '../reducer/NavReducer'
import NotebookListsPage from '../pages/NotebookListsPage'
import NotebookDetailPage from '../pages/NotebookDetailsPage'
import CartPage from '../pages/CartPage'
import logo from '../image/newlogo.png'
import {
  SearchOutlined,
  HomeOutlined,
  LaptopOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons'
import { fetchCartData } from '../actions/CartAction'

const { Content, Footer } = Layout
const { Option } = Select

const NavBar = (props) => {
  const { fetchCartData } = props
  const { data } = props.data
  const { cartData } = props.cartData
  const selKey = useSelector((state) => state.toggle.key)
  const dispatch = useDispatch()
  const [showSearch] = useState(true)
  const { Link } = Typography

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

  const renderOption = () => {
    if (data) {
      return data.map((value) => {
        return (
          <Option value={value.name}>
            <Link onClick={() => navigate('/lists/' + value.id)}>{value.name}</Link>
          </Option>
        )
      })
    }
  }

  const searchInput = () => {
    return (
      <div>
        <Select
          showSearch
          style={{ width: 200, textAlign: 'center' }}
          prefix={<SearchOutlined />}
          placeholder="Search"
          optionFilterProp={data}
          filterOption={(input, option) =>
            option.props.items.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {renderOption()}
        </Select>
      </div>
    )
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
          style={{ width: '100%', alignItems: 'baseline', justifyContent: 'right' }}
        >
          <Menu.Item key="1">
            <HomeOutlined /> <span>Home</span>
          </Menu.Item>
          <Menu.Item key="2">
            <LaptopOutlined />
            <span>Shop</span>
          </Menu.Item>

          {/* {showSearch ? <Menu.Item key="search">{searchInput()}</Menu.Item> : ''} */}
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
            minHeight: '87vh'
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
