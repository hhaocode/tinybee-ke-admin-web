### vue.js阻止事件冒泡和默认事件
#### 原生js取消事件冒泡
```
try{
  e.stopPropagation();//非IE浏览器
  }
catch(e){
  window.event.cancelBubble = true;//IE浏览器
} 
```
       
#### 原生js阻止默认事件
```
if ( e && e.preventDefault ) {
  e.preventDefault()//非IE浏览器
} else { window.event.returnValue = false; } //IE浏览器
```

#### vue.js取消事件冒泡

```<div @click.stop="doSomething($event)">vue取消事件冒泡</div>```
#### vue.js阻止默认事件

```<div @click.prevent="doSomething($event)">vue阻止默认事件</div>```