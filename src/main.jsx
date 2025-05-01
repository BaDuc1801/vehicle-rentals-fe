import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { SearchProvider } from './Context/SearchContext.jsx'
import store from './Redux/store.js'
import { Provider } from 'react-redux'

const theme = {
  token: {
    colorPrimary: '#2cb8af',
  },
};

createRoot(document.getElementById('root')).render(
    <SearchProvider>
      <BrowserRouter>
        <Provider store={store}>
          <ConfigProvider
            theme={theme}>
            <App />
          </ConfigProvider>
        </Provider>
      </BrowserRouter>
    </SearchProvider>
)
