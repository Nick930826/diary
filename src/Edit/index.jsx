import React, { useState, useEffect } from 'react'
import { InputItem, TextareaItem, DatePicker, ImagePicker, Button, Toast } from 'antd-mobile'
import moment from 'moment'
import axios from '../utils/axios'
import { getQueryString } from '../utils'
import './style.css'

const Edit = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [date, setDate] = useState('')
  const [files, setFile] = useState([])
  const id = getQueryString('id')
  const onChange = (files, type, index) => {
    console.log(files, type, index);
    setFile(files)
  }

  useEffect(() => {
    if (id) {
      axios.get(`/detail/${id}`).then(({ data }) => {
        if (data.length) {
          setTitle(data[0].title)
          setContent(data[0].content)
          setDate(new Date(data[0].date))
          setFile([{ url: data[0].url }])
        } 
      })
    }
  }, [])

  const publish = () => {
    if (!title || !content || !date) {
      Toast.fail('请填写必要参数')
      return
    }
    const params = {
      title,
      content,
      date: moment(date).format('YYYY-MM-DD'),
      url: files.length ? files[0].url : ''
    }
    if (id) {
      params['id'] = id
      axios.post('/update', params).then(res => {
        Toast.success('修改成功')
      })
      return
    }
    axios.post('/add', params).then(res => {
      Toast.success('添加成功')
    })
  }

  return (<div className='diary-edit'>
    {/* <List renderHeader={() => '编辑日记'}>
      <InputItem
        clear
        placeholder="请输入标题"
        value={title}
        onChange={(value) => setTitle(value)}
      >标题</InputItem>
      <TextareaItem
        rows={6}
        placeholder="请输入日记内容"
        value={content}
        onChange={(value) => setContent(value)}
      />
      <DatePicker
        mode="date"
        title="请选择日期"
        extra="请选择日期"
        value={date}
        onChange={date => setDate(date)}
      >
        <List.Item arrow="horizontal">日期</List.Item>
      </DatePicker>
      <ImagePicker
        files={files}
        onChange={onChange}
        onImageClick={(index, fs) => console.log(index, fs)}
        selectable={files.length < 1}
        multiple={false}
      />
      <Button type='primary' onClick={() => publish()}>发布</Button>
    </List> */}
  </div>)
}

export default Edit