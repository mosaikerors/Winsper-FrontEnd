import React from 'react';
import HeanCard from './src/components/hean/HeanCard'

const hean =  {
    "hId": "1",
    "cover": "https://tse4-mm.cn.bing.net/th?id=OIP.ImYDTf5CrXft11OUpTMSTQHaEA&w=215&h=160&c=7&o=5&dpr=1.5&pid=1.7",
    "text": "mount 方法则会将 React 组件渲染为真实的 DOM 节点，特别是在依赖真实的 DOM 结构必须存在的情况下，比如说按钮的点击事件。",
    "hasLiked": true,   //是否点过赞
    "hasStarred": false,   //是否已收藏
    "likeCount": 1000,   //点赞数
    "starCount": 999,   //收藏数
    "commentCount": 111,  //评论数
};

export default ()=>{
    return(
        <HeanCard hean={hean}/>
    )
}
