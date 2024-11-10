import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import Navbar from './components/Navbar'

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorBgBase: '#181f28'
        }
      }}
    >
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
