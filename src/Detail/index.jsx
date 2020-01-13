import React, { useState, useEffect } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { useHistory } from 'react-router-dom'
import { getQueryString } from '../utils'
import axios from '../utils/axios'

const Detail = () => {
  const [detail, setDetail] = useState({})
  const history = useHistory()
  const id = getQueryString('id')

  useEffect(() => {
    axios.get(`/detail/${id}`).then(({ data }) => {
      if (data.length) {
        setDetail(data[0])
      } 
    })
  }, [])

  const deleteDiary = (id) => {
    axios.post('/delete', { id }).then(({ data }) => {
      history.push('/')
    })
  }

  return (<div className='diary-detail'>
    <NavBar
      mode="light"
      icon={<Icon type="left" />}
      onLeftClick={() => history.goBack()}
      rightContent={[
        <Icon style={{ marginRight: 10 }} onClick={() => deleteDiary(detail.id)} key="0" type="cross-circle-o" />,
        <img onClick={() => history.push(`/edit?id=${detail.id}`)} style={{ width: 26 }} src="//s.weituibao.com/1578721957732/Edit.png" alt=""/>
      ]}
    >{detail.title || ''}</NavBar>
    {/* <List renderHeader={() => `${detail.date} 晴天`} className="my-list">
      <List.Item wrap>
        {detail.content}
      </List.Item>
    </List> */}
  </div>)
}

export default Detail