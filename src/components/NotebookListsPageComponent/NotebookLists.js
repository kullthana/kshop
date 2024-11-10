import React, { useEffect, useState } from 'react'
import '../../App.css'
import { List, Card, Col, Row, Select, Spin } from 'antd'
import { connect, useDispatch } from 'react-redux'
import { fetchData, searchNotebookLists, filter } from '../../actions/NotebookListsAction'
import { bindActionCreators } from 'redux'
import NotebookListsTool from './NotebookListsTool'
import { useNavigate } from 'react-router-dom'

const { Meta } = Card
const { Option } = Select

const NotebookLists = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { notebookLists, notebookSearch, filterList, loading } = props

  const onFilter = () => {
    if (filterList === 'All') {
      return sortArray()
    } else {
      return sortArray().filter((notebook, index) => {
        let isInclude = false

        var name = notebook.name.split(' ')
        if (name[0].toString() === filterList) {
          isInclude = true
        }
        return isInclude
      })
    }
  }

  const [sorting, setSorting] = useState('none')

  const handleChange = (value) => {
    setSorting(value)
  }

  const sortArray = () => {
    if (sorting === 'none') {
      return notebookLists
    } else if (sorting === 'byName') {
      return notebookLists.sort(function (a, b) {
        var nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase()
        if (nameA < nameB) return -1
        if (nameA > nameB) return 1
        return 0
      })
    } else if (sorting === 'byLowPrice') {
      return notebookLists.sort(function (a, b) {
        if (a.price < b.price) return -1
        if (a.price > b.price) return 1
        return 0
      })
    } else if (sorting === 'byHighPrice') {
      return notebookLists.sort(function (a, b) {
        if (a.price < b.price) return 1
        if (a.price > b.price) return -1
        return 0
      })
    }
  }

  useEffect(() => {
    dispatch(fetchData())
  }, [])

  const getDataToShow = () => {
    // filter
    // sort
    let dataToShow = onFilter()

    // search
    if (notebookSearch !== '') {
      dataToShow = dataToShow.filter((data) =>
        data.name.toLowerCase().match(notebookSearch.toLowerCase())
      )
    }

    return dataToShow
  }

  return (
    <div>
      <Spin spinning={loading}>
        <Row justify={'end'} style={{ alignItems: 'self-end' }}>
          <Col>
            <NotebookListsTool />
          </Col>
          <Select
            defaultValue="Sort"
            onChange={handleChange}
            style={{ width: '7rem', marginLeft: '5px' }}
          >
            <Option value="byName">Name</Option>
            <Option value="byLowPrice">Low Price</Option>
            <Option value="byHighPrice">High Price</Option>
          </Select>
        </Row>
        <List
          grid={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
          size="large"
          pagination={{
            pageSize: 9,
            alightment: 'bottom right'
          }}
          dataSource={getDataToShow()}
          renderItem={(item) => (
            <Col style={{ padding: '12px' }}>
              <div onClick={() => navigate('/lists/' + item.id)}>
                <Card hoverable style={{ width: 300 }} cover={<img alt="" src={item.image} />}>
                  <Meta
                    title={item.name}
                    description={'฿' + item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                  />
                </Card>
              </div>
            </Col>
          )}
        />
      </Spin>
    </div>
  )
}

const mapStateToprops = (state) => {
  return {
    notebookLists: state.listNotebook.data,
    notebookSearch: state.listNotebook.searchData,
    filterList: state.listNotebook.filterType,
    loading: state.listNotebook.loading
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchData, searchNotebookLists, filter }, dispatch)
}
export default connect(mapStateToprops, mapDispatchToProps)(NotebookLists)
