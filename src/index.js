import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/index'
import ReactDom from 'react-dom'
import App from './components/App'

const store = createStore(reducer);
const rootElement = document.getElementById('root');

const render = () => {
	ReactDom.render(
	<Provider store={store} >
		<div>
			<App />
		</div>
	</Provider>,
	rootElement
	)
}
render();