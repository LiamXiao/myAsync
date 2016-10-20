import { combineReducers } from 'redux'

// 主题选择 Reducer
const selected = (state = 'reactjs',action) => {
	switch(action.type){
		case 'SELECT_SUBREDDIT':
			return action.subreddit;
		default :
			return state;
	}
}

// 
const posted = (state = {isFetching: false, didInvalidate: false, items: []}, action) => {
	switch(action.type){
		case 'REQUEST_POST': 				//请求数据 → 设置当前主题 isFetching = true & didInvalidate = false
			return Object.assign({}, state, 
				{isFetching: true, didInvalidate: false});
		case 'RECEIVE_POST': 				//获得数据 → 设置当前主题 isFetching = false & items = 最新结果 & lastUpdated = 最新时间
			return Object.assign({}, state, 
				{isFetching: false, didInvalidate: false, lastUpdated: action.receiveAt, items: action.posts});
		default :
			return state;
	}
}

// 按主题选择帖子 Reducer
const postedBySubreddit = (state = {}, action) => {
	switch(action.type){
		case 'REQUEST_POST':
		case 'RECEIVE_POST': 
			return Object.assign( {}, state, {[action.subreddit] : posted(state[action.subreddit], action)} ) // es6 symbol语法 [key]
		default:
			return state
	}
}

const reducer = combineReducers({
	selected : selected,    				// equivalent to xxReducer(state.xx, action)
	received : postedBySubreddit
})


const stateTree = {					//state设计用	
	selectedSubreddit: 'reactjs',	//当前选中的主题
	postsBySubreddit: {				//Post返回的内容
		reactjs: {					//'reactjs'相关
			isFetching: true,
			didInvalidate: false,
			items: []
		},
		frontend: {
			isFetching: false,
			didInvalidate: false,
			lastUpdated: 1439478405547,
			items: [
				{
					id: 42,
					title: 'XXXXXX'
				},
				{
					id: 53,
					title: 'YYYYY'
				}
			]
		}

	} 
}


export default reducer;