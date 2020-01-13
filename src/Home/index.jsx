import React, { useState, useEffect } from 'react'
import { Card } from 'antd-mobile'
import { Link } from 'react-router-dom'
import axios from '../utils/axios'
import './style.css'

const Home = () => {
  const [list, setList] = useState([])
  useEffect(() => {
    axios.get('/list').then(({ data }) => {
      setList(data)
    })
  }, [])
  return (
    <div className='diary-list'>
      {
        list.map(item => <Link
          key={item.id}
          to={{ pathname: 'detail', search: `?id=${item.id}` }}
        >
          <Card className='diary-item'>
            <Card.Header
              title={item.title}
              thumb={item.url}
              extra={<span>晴天</span>}
            />
            <Card.Body>
              <div>{item.content}</div>
            </Card.Body>
            <Card.Footer content={item.date} />
          </Card>
        </Link>)
      }
    </div>
  )
}

export default Home