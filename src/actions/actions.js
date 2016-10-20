import fetch from 'node-fetch'

const requestPosts = (subreddit) =>{
	return {
		type: 'REQUEST_POST',
		subreddit: subreddit
	}
}

const receivePosts = (subreddit, posts) => {
	return {
		type: 'RECEIVE_POST',
		subreddit: subreddit,
		posts: posts.data.children.map(child => child.data),
		receiveAt: Date.now()
	}
}


const selectSubreddit = (subreddit) => {
	return {
		type: 'SELECT_SUBREDDIT',
		subreddit: subreddit
	}
}


export const fetchPosts = (subreddit) => {
	return dispatch => {
		// Step 1: 发起 请求
		dispatch(requestPosts(subreddit))
		// Step 2: 通过API获取数据
		fetch('http://www.subreddit.com/r/${subreddit}.json')
			.then(response => response.json()) // Step 3: 将结果转换为Json
			.then(json => dispatch(receivePosts(subreddit, json))) // Step 4: 执行 receivePosts
	}
}