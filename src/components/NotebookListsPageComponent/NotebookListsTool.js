import React from 'react'
import '../../App.css'
import { Input, Col, Row, Select } from 'antd'
import { useDispatch } from 'react-redux'
import { searchNotebookLists, filter } from '../../actions/NotebookListsAction'
const { Search } = Input
const { Option, OptGroup } = Select

const NotebookListsTool = () => {
  const dispatch = useDispatch()

  const onSeachList = (evnet) => {
    let textValue = evnet.target.value
    dispatch(searchNotebookLists(textValue))
  }

  const onFilter = (value) => {
    let textFilter = value
    dispatch(filter(textFilter))
  }

  return (
    <div>
      <Row style={{ marginTop: '-36px' }}>
        <Col style={{ float: 'right' }}>
          <div>
            <Search placeholder="Notebook Title..." onChange={onSeachList} style={{ width: 200 }} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col style={{ float: 'right' }}>
          <div>
            <hr></hr>
            <Select
              defaultValue={'All'}
              style={{ width: 200 }}
              onChange={(value) => onFilter(value)}
            >
              <OptGroup label="Categories">
                <Option value="All">All</Option>
                <Option value="Acer">Acer</Option>
                <Option value="Alienware">Alienware</Option>
                <Option value="ASUS">ASUS</Option>
                <Option value="Dell">Dell</Option>
                <Option value="Gigabyte">Gigabyte</Option>
                <Option value="HP">HP</Option>
                <Option value="Lenovo">Lenovo</Option>
                <Option value="MSI">MSI</Option>
                <Option value="Razer">Razer</Option>
              </OptGroup>
            </Select>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default NotebookListsTool
