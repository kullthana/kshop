import React, { useEffect } from 'react'
import { Card, Row, Col, Typography, Carousel, Spin } from 'antd'
import '../App.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchData } from '../actions/ActionsHome'
import { useNavigate } from 'react-router-dom'

const Homepage = (props) => {
  const { fetchData, dataALL, loading } = props
  const { Meta } = Card
  const { Link } = Typography

  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Spin spinning={loading}>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} justify="center">
          {dataALL.slice(0, 6).map((data) => {
            return (
              <Col style={{ paddingTop: '12px', paddingBottom: '12px' }}>
                <div onClick={() => navigate('/lists/' + data.id)}>
                  <Card hoverable style={{ width: 300 }} cover={<img alt="" src={data.image} />}>
                    <Meta
                      title={data.name}
                      description={'฿' + data.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    />
                  </Card>
                </div>
              </Col>
            )
          })}
        </Row>

        <div style={{ justifySelf: 'flex-end', margin: '12px' }} onClick={() => navigate('/lists')}>
          <Link>See More >></Link>
        </div>
      </Spin>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    dataALL: state.dataHomePage.dataHome,
    loading: state.dataHomePage.loading
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchData }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
