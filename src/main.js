const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')//读取本地hashMap
const xObject =JSON.parse(x)//变为对象
const hashMap = xObject || [
    { logo:'A',url:'https://www.acfun.cn'},
    {logo:'b',url:'https://www.bilibili.com'},
    {logo:'c',url:'https://www.csdn.net'},
];

const simplifyUrl =(url)=>{

return url.replace('https://','')
          .replace('http://','')
          .replace('www.','')
          .replace(/\/.*/,'')
}
const render = () =>{
     $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index) =>{
        const $li =$(`<li>
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close"><svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-close"></use>
        </svg></div>
        </div>
        </li>`).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation()//阻止冒泡否者点关掉没用
            hashMap.splice(index,1)
            render()
        })
    })
}
render();
$('.addButton')
.on('click',()=>{
   let url =  window.prompt('请问你要添加的网址是啥')
   if(url.indexOf('http')!==0){
       url = 'https://' + url
   }
    hashMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),
        url:url});
  render();
}
)
window.onbeforeunload =()=>{
    const string = JSON.stringify(hashMap)//把当前的hashMap变为一个字符串
    localStorage.setItem ('x',string)//存储在本地中
}
$(document).on('keypress',(e)=>{
    const {key} = e
    for(let i =0;i<hashMap.length;i++)
    {
        if(hashMap[i].logo.toLowerCase()===key)
        {
            window.open(hashMap[i].url)
        }
    }
})