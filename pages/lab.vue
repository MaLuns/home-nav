<template>
  <div>
    <div class="header"></div>
    <ul class="container" v-for="(item, index) in list" :key="index">
      <div class="class-title">
        {{ item.title }}
      </div>
      <ul class="row">
        <li class="col" v-for="(element, idx) in item.childen" :key="idx">
          <a class="card-link" :href="element.url" target="_blank">
            <div class="card-tit">
              <img :src="element.logo" alt="" />
              <div class="name">{{ element.title }}</div>
            </div>
            <div class="card-desc">
              {{ element.desc }}
            </div>
          </a>
        </li>
      </ul>
    </ul>
    <footer class="footer"></footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: "有点意思",
          icon: "",
          childen: [
            {
              url: "http://guozhivip.com/mvs.html",
              title: "免费影视",
              desc: "免费在线追剧观影",
              logo: "http://guozhivip.com/lab/images/gy.png",
            },
            {
              url: "https://neave.com/",
              title: "Neave",
              desc: "好玩的小游戏合集",
              logo: "http://guozhivip.com/lab/images/get.png",
            },
            {
              url: "https://alteredqualia.com/",
              title: "Alteredqualia",
              desc: "3D影像技术，各种好玩的神器",
              logo: "http://guozhivip.com/lab/images/hw.jpg",
            },
            {
              url: "https://bruno-simon.com/",
              title: "自驾乐趣",
              desc: "无聊，把车开起来",
              logo: "http://guozhivip.com/lab/images/funny.jpg",
            },
            {
              url: "http://www.staggeringbeauty.com/",
              title: "Staggeringbeauty",
              desc: "一个贱萌的减压家伙",
              logo: "http://guozhivip.com/lab/images/ss.png",
            },
            {
              url: "https://aidn.jp/wow/",
              title: "WOW",
              desc: "让初音未来陪你跳舞",
              logo: "http://guozhivip.com/lab/images/wow.jpg",
            },
            {
              url: "https://findtheinvisiblecow.com/",
              title: "找到隐藏的牛",
              desc: "移动鼠标，根据动物叫声大小找到牛",
              logo: "http://guozhivip.com/lab/images/zn.png",
            },
            {
              url: "http://guozhivip.com/fun/2048",
              title: "2048",
              desc: "2048游戏在线玩",
              logo: "http://guozhivip.com/lab/images/2048.jpg",
            },
            {
              url: "http://nodtotherhythm.com/",
              title: "节奏照片",
              desc: "可以让照片中的人脸跟着音乐律动",
              logo: "http://guozhivip.com/lab/images/jp.png",
            },
            {
              url: "https://2020game.io/",
              title: "酷跑",
              desc: "在线小人酷跑",
              logo: "http://guozhivip.com/lab/images/gm.png",
            },
            {
              url: "https://fff.cmiscm.com/",
              title: "fff.",
              desc: "让人欲罢不能的鼠标交互",
              logo: "http://guozhivip.com/lab/images/fff.png",
            },
            {
              url: "http://guozhivip.com/fun/wen.html",
              title: "文章生成器",
              desc: "狗屁不通文章生成器",
              logo: "http://guozhivip.com/lab/images/wen.png",
            },
            {
              url: "http://guozhivip.com/fun/els/",
              title: "俄罗斯方块",
              desc: "经典小游戏",
              logo: "http://guozhivip.com/lab/images/fk.png",
            },
            {
              url: "https://jewels.frvr.com/",
              title: "Jewels",
              desc: "开心消消乐",
              logo: "http://guozhivip.com/lab/images/xxl.jpg",
            },
            {
              url: "http://flapmmo.com/",
              title: "Flapmmo",
              desc: "疯狂的小鸟",
              logo: "http://guozhivip.com/lab/images/fp.jpg",
            },
            {
              url: "https://greed.frvr.com/",
              title: "Greed",
              desc: "疯狂抢金币",
              logo: "http://guozhivip.com/lab/images/qjb.jpg",
            },
            {
              url: "http://slither.io/",
              title: "Slither",
              desc: "在线玩贪吃蛇",
              logo: "http://guozhivip.com/lab/images/tcs.jpg",
            },
            {
              url: "https://lines.frvr.com/",
              title: "Play Lines",
              desc: "把相同颜色的点都连接起来",
              logo: "http://guozhivip.com/lab/images/ll.jpg",
            },
            {
              url: "http://guozhivip.com/fun/",
              title: "小球跳跃",
              desc: "小球听你指挥",
              logo: "http://guozhivip.com/lab/images/ball.jpg",
            },
            {
              url: "https://hex.frvr.com/",
              title: "Hexagon",
              desc: "随机色块填充消除",
              logo: "http://guozhivip.com/lab/images/sktc.jpg",
            },
            {
              url: "http://guozhivip.com/fun/card.html",
              title: "疯狂纸牌",
              desc: "可以翻滚的扑克牌",
              logo: "http://guozhivip.com/lab/images/pkp.jpg",
            },
            {
              url: "https://soccer.frvr.com/",
              title: "足球射门",
              desc: "在线踢足球",
              logo: "http://guozhivip.com/lab/images/tzq.jpg",
            },
            {
              url: "http://kedou.workerman.net/",
              title: "蝌蚪聊天室",
              desc: "没事儿和陌生人聊个天",
              logo: "http://guozhivip.com/lab/images/lt.jpg",
            },
            {
              url: "https://www.yikm.net/",
              title: "小霸王",
              desc: "找回童年的欢乐",
              logo: "http://guozhivip.com/lab/images/xbw.jpg",
            },
            {
              url: "http://guozhivip.com/fun/fire.html",
              title: "熊熊火焰",
              desc: "燃烧吧，火焰",
              logo: "http://guozhivip.com/lab/images/fire.jpg",
            },
            {
              url: "https://zty.pe/",
              title: "ZType",
              desc: "停不下来的打字小游戏",
              logo: "http://guozhivip.com/lab/images/dzyx.png",
            },
            {
              url: "http://www.windows93.net/",
              title: "Windows93",
              desc: "“Windows93”系统操作体验",
              logo: "http://guozhivip.com/lab/images/w93.png",
            },
            {
              url: "http://lab.mkblog.cn/hacker/",
              title: "黑客帝国文字",
              desc: "进入点击鼠标，你的电脑将被攻击",
              logo: "http://guozhivip.com/lab/images/wd.png",
            },
            {
              url: "http://www.geektyper.com/",
              title: "Geektyper",
              desc: "伪装成特工，你就是黑客",
              logo: "http://guozhivip.com/lab/images/type.png",
            },
            {
              url: "http://www.species-in-pieces.com/",
              title: "In-pieces",
              desc: "每切换一次画面，产生新的动物",
              logo: "http://guozhivip.com/lab/images/ip.jpg",
            },
            {
              url: "http://www.secaibi.com/howbigisspace/",
              title: "天空有多高",
              desc: "看看天空到底有多高？",
              logo: "http://guozhivip.com/lab/images/sky.jpg",
            },
            {
              url: "http://www.autopiano.cn/",
              title: "自由钢琴",
              desc: "在线弹钢琴",
              logo: "http://guozhivip.com/lab/images/pn.png",
            },
            {
              url: "http://guozhivip.com/jzg/",
              title: "架子鼓",
              desc: "敲打出你自己的旋律",
              logo: "http://guozhivip.com/lab/images/jzg.png",
            },
            {
              url: "https://aidn.jp/mikutap/",
              title: "Mikutap",
              desc: "随意演奏属于你的旋律",
              logo: "http://guozhivip.com/lab/images/msc.png",
            },
            {
              url: "https://learningmusic.ableton.com/zh-Hans/index.html",
              title: "电子音乐",
              desc: "开始你的音乐创作之旅",
              logo: "http://guozhivip.com/lab/images/dzyy.png",
            },
            {
              url: "http://guozhivip.com/eat/",
              title: "今天吃啥呀?",
              desc: "再也不用为吃饭发愁了",
              logo: "http://guozhivip.com/lab/images/ms.png",
            },
            {
              url: "https://www.ipanda.com/",
              title: "熊猫频道",
              desc: "专业的熊猫卖萌社区",
              logo: "http://guozhivip.com/lab/images/pda.png",
            },
            {
              url: "http://webapp.vizen.cn/gugong_app_pc/index.html",
              title: "全景故宫",
              desc: "实时感受故宫文化",
              logo: "http://guozhivip.com/lab/images/gug.png",
            },
            {
              url: "https://www.cbaigui.com/",
              title: "知妖",
              desc: "中国妖怪百集",
              logo: "http://guozhivip.com/lab/images/yg.png",
            },
            {
              url: "https://cybermap.kaspersky.com/",
              title: "Kaspersky",
              desc: "全球实时网络攻击地图",
              logo: "http://guozhivip.com/lab/images/kbsj.png",
            },
            {
              url: "https://stars.chromeexperiments.com/",
              title: "Stars",
              desc: "进入宇宙，遨游星际",
              logo: "http://guozhivip.com/lab/images/star.png",
            },
            {
              url: "https://www.meteorshowers.org/",
              title: "Meteor showers",
              desc: "太空视角观看流星雨",
              logo: "http://guozhivip.com/lab/images/ms.jpg",
            },
          ],
        },
        {
          title: "墙裂推荐",
          icon: "",
          childen: [
            {
              url: "http://guozhivip.com/rank/",
              title: "果汁排行榜",
              desc: "全网热点，早知道",
              logo: "http://guozhivip.com/lab/images/rank.png",
            },
            {
              url: "https://www.sigoo.com/",
              title: "极像素",
              desc: "超高像素看世界",
              logo: "http://guozhivip.com/lab/images/jxs.jpg",
            },
            {
              url: "http://www.bigpixel.cn/",
              title: "千亿像素",
              desc: "世界之美, 记录细节！",
              logo: "http://guozhivip.com/lab/images/dxs.jpg",
            },
            {
              url: "https://www.allhistory.com/",
              title: "全历史",
              desc: "深入了解历史画廊",
              logo: "http://guozhivip.com/lab/images/qls.svg",
            },
            {
              url: "http://www.ltfc.net/",
              title: "中华珍宝馆",
              desc: "观看学习历代名家佳作",
              logo: "http://guozhivip.com/lab/images/zbg.jpg",
            },
            {
              url: "https://gallerix.asia/",
              title: "Gallerix",
              desc: "浏览世界著名画家作品",
              logo: "http://guozhivip.com/lab/images/yh.jpg",
            },
            {
              url: "https://www.xinpianchang.com/channel/index/sort-like",
              title: "新片场",
              desc: "趣味创意短视频作品",
              logo: "http://guozhivip.com/lab/images/get.ico",
            },
            {
              url: "https://www.sony.net/united/clock/",
              title: "索尼风景图",
              desc: "看一些城市的24h风景照",
              logo: "http://guozhivip.com/lab/images/sony.jpg",
            },
            {
              url: "https://topbook.cc/",
              title: "Topbook",
              desc: "高效生活研究所",
              logo: "http://guozhivip.com/lab/images/tb.png",
            },
            {
              url: "https://www.avogado6.com/",
              title: "avogado6",
              desc: "日本画师治愈系插画",
              logo: "http://guozhivip.com/lab/images/zych.jpg",
            },
            {
              url: "http://zhongguose.com/",
              title: "中国传统色",
              desc: "中国古典色在线手册",
              logo: "http://guozhivip.com/lab/images/gds.jpg",
            },
            {
              url: "https://www.kujiale.com/xiaoguotu/suggestion",
              title: "酷家乐",
              desc: "优秀家装设计鉴赏",
              logo: "http://guozhivip.com/lab/images/kj.jpg",
            },
            {
              url: "https://film-grab.com/",
              title: "FilmGrab",
              desc: "带你找到全世界的电影截图",
              logo: "http://guozhivip.com/lab/images/fg.jpg",
            },
            {
              url: "https://www.skypixel.com/",
              title: "天空之城",
              desc: "全球航拍摄影作品社区",
              logo: "http://guozhivip.com/lab/images/tkzc.png",
            },
            {
              url: "http://guozhivip.com/design/",
              title: "设计资源",
              desc: "精选优质设计资源大全",
              logo: "http://guozhivip.com/lab/images/design.png",
            },
            {
              url: "http://guozhivip.com/imgs.html",
              title: "壁纸美图",
              desc: "壁纸、摄影美图、图片素材",
              logo: "http://guozhivip.com/lab/images/alex.jpg",
            },
          ],
        },
        {
          title: "学习·涨知识",
          icon: "",
          childen: [
            {
              url: "https://zh.wikihow.com/%E9%A6%96%E9%A1%B5",
              title: "WikiHow",
              desc: "Get学习、工作、生活小技能",
              logo: "http://guozhivip.com/lab/images/zs.png",
            },
            {
              url: "https://www.wukong.com/",
              title: "悟空问答",
              desc: "了解你感兴趣的知识",
              logo: "http://guozhivip.com/lab/images/wkwd.png",
            },
            {
              url: "https://www.yxgapp.com/",
              title: "译学馆",
              desc: "分享国外有价值的学习资源",
              logo: "http://guozhivip.com/lab/images/e.png",
            },
            {
              url: "https://www.mvyxws.com/",
              title: "医学微视",
              desc: "科普医学知识的良心网站",
              logo: "http://guozhivip.com/lab/images/yxws.png",
            },
            {
              url: "https://www.idongde.com/",
              title: "懂得",
              desc: "生活知识小百科",
              logo: "http://guozhivip.com/lab/images/dd.jpg",
            },
            {
              url: "https://piyao.kepuchina.cn/rumor/rumorlist",
              title: "科学辟谣",
              desc: "为你揭开真相",
              logo: "http://guozhivip.com/lab/images/kp.jpg",
            },
            {
              url: "https://www.gushiwen.org/",
              title: "古诗文网",
              desc: "古诗文经典传承",
              logo: "http://guozhivip.com/lab/images/gsw.ico",
            },
            {
              url: "https://xing.911cha.com/",
              title: "百家姓",
              desc: "查询了解自己的姓氏起源",
              logo: "http://guozhivip.com/lab/images/bjx.png",
            },
            {
              url: "https://www.asklib.com/",
              title: "问答库",
              desc: "有用的题库问答学习平台",
              logo: "http://guozhivip.com/lab/images/ask.png",
            },
            {
              url: "https://www.examcoo.com/index/ku",
              title: "考试酷",
              desc: "免费的在线学习考试系统",
              logo: "http://guozhivip.com/lab/images/ks.png",
            },
            {
              url: "http://www.termonline.cn/",
              title: "术语在线",
              desc: "你不懂的术语，在这里查询",
              logo: "http://guozhivip.com/lab/images/syzx.png",
            },
          ],
        },
        {
          title: "创意生活",
          icon: "",
          childen: [
            {
              url: "https://miniature-calendar.com/",
              title: "Miniature-calendar",
              desc: "奇妙的创意小人世界",
              logo: "http://guozhivip.com/lab/images/mc.png",
            },
            {
              url: "https://odditymall.com/",
              title: "Odditymall",
              desc: "神奇的创意产品大合集",
              logo: "http://guozhivip.com/lab/images/cycp.jpg",
            },
            {
              url: "https://www.thisiscolossal.com/",
              title: "Colossal",
              desc: "一个创意图片视频网站",
              logo: "http://guozhivip.com/lab/images/col.jpg",
            },
            {
              url: "https://themonsterproject.org/monstergallery2019",
              title: "The Monster",
              desc: "打开童心大门的小怪兽",
              logo: "http://guozhivip.com/lab/images/tms.jpg",
            },
            {
              url: "https://romain-laurent.com/",
              title: "Romain laurent",
              desc: "最有创意的图片&动图",
              logo: "http://guozhivip.com/lab/images/cyrr.jpg",
            },
            {
              url: "https://ello.co/discover",
              title: "Ello",
              desc: "全球创意工作者的聚集地",
              logo: "http://guozhivip.com/lab/images/ello.png",
            },
            {
              url: "https://www.artic.edu/collection",
              title: "Artic",
              desc: "探索博物馆收藏的艺术品",
              logo: "http://guozhivip.com/lab/images/ww.png",
            },
            {
              url: "https://divisare.com/",
              title: "Divisare",
              desc: "最大的当代建筑线上图书馆",
              logo: "http://guozhivip.com/lab/images/ds.png",
            },
            {
              url: "https://www.gracg.com/works?type=hot",
              title: "涂鸦王国",
              desc: "创意插画艺术作品",
              logo: "http://guozhivip.com/lab/images/tywg.png",
            },
          ],
        },
        {
          title: "在线制作",
          icon: "",
          childen: [
            {
              url: "https://www.gifhome.com/",
              title: "GIF之家",
              desc: "GIF动图在线制作/下载",
              logo: "http://guozhivip.com/lab/images/gif.ico",
            },
            {
              url: "https://obliterate.me/",
              title: "Obliterate",
              desc: "国外涂鸦网站，很好玩",
              logo: "http://guozhivip.com/lab/images/av.svg",
            },
            {
              url: "https://www.autodraw.com/",
              title: "AutoDraw",
              desc: "手残党快速上手的作图神器",
              logo: "http://guozhivip.com/lab/images/atd.jpg",
            },
            {
              url: "https://www.photopea.com/",
              title: "在线PS",
              desc: "在线抠图、拼图、PS设计",
              logo: "http://guozhivip.com/lab/images/ps.svg",
            },
            {
              url: "https://photomosh.com/",
              title: "Photomosh",
              desc: "故障艺术的在线定制方式",
              logo: "http://guozhivip.com/lab/images/mos.png",
            },
            {
              url: "https://smartmockups.com/",
              title: "Smartmockups",
              desc: "令人惊叹的产品模型",
              logo: "http://guozhivip.com/lab/images/st.png",
            },
            {
              url: "https://wordart.com/",
              title: "Wordart",
              desc: "将一些文字自动排版成图形",
              logo: "http://guozhivip.com/lab/images/word.png",
            },
            {
              url: "https://www.weiciyun.com/",
              title: "微词云",
              desc: "好玩的文字云生成",
              logo: "http://guozhivip.com/lab/images/wcy.png",
            },
            {
              url: "https://www.zybuluo.com/mdeditor",
              title: "Markdown编辑器",
              desc: "好用的Markdown在线编辑阅读器",
              logo: "http://guozhivip.com/lab/images/mkd.png",
            },
          ],
        },
        {
          title: "文艺视听",
          icon: "",
          childen: [
            {
              url: "https://new.shuge.org/",
              title: "书格",
              desc: "在线古籍图书馆",
              logo: "http://guozhivip.com/lab/images/sg.png",
            },
            {
              url: "https://www.ageeye.cn/",
              title: "发现中国",
              desc: "地图分享知识",
              logo: "http://guozhivip.com/lab/images/fxzg.jpg",
            },
            {
              url: "https://www.vmovier.com/",
              title: "场库",
              desc: "高品质短片分享",
              logo: "http://guozhivip.com/lab/images/ck.jpg",
            },
            {
              url: "https://www.itingwa.com/",
              title: "听蛙音乐",
              desc: "听最好听的轻音乐",
              logo: "http://guozhivip.com/lab/images/qyy.ico",
            },
            {
              url: "http://www.htqyy.com/",
              title: "好听轻音乐",
              desc: "听轻音乐放飞好心情",
              logo: "http://guozhivip.com/lab/images/luoo.png",
            },
            {
              url: "http://5sing.kugou.com/",
              title: "5sing",
              desc: "中国原创音乐基地",
              logo: "http://guozhivip.com/lab/images/5sing.jpg",
            },
            {
              url: "http://guozhivip.com/qt/",
              title: "倾听",
              desc: "倾听白噪音，放松心情",
              logo: "http://guozhivip.com/lab/images/qt.png",
            },
            {
              url: "https://www.mvcat.com/",
              title: "电影推荐",
              desc: "很有设计范儿的影音网站",
              logo: "http://guozhivip.com/lab/images/mc.jpg",
            },
            {
              url: "https://www.tvmao.com/",
              title: "电视猫",
              desc: "电视剧剧情介绍，节目预告",
              logo: "http://guozhivip.com/lab/images/tv.jpg",
            },
          ],
        },
        {
          title: "其他酷站",
          icon: "",
          childen: [
            {
              url: "https://www.producthunt.com/",
              title: "Producthunt",
              desc: "发现新产品",
              logo: "http://guozhivip.com/lab/images/ph.png",
            },
            {
              url: "https://creativemass.cn/",
              title: "CreativeMass",
              desc: "精选创意导航",
              logo: "http://guozhivip.com/lab/images/cm.png",
            },
            {
              url: "https://www.wenshushu.cn/",
              title: "文叔叔",
              desc: "极速传文件给他人",
              logo: "http://guozhivip.com/lab/images/wss.png",
            },
            {
              url: "http://typhoon.nmc.cn/",
              title: "台风网",
              desc: "实时掌握台风、降雨等气象",
              logo: "http://guozhivip.com/lab/images/tf.png",
            },
            {
              url: "http://www.foodwake.com/",
              title: "唤醒食物",
              desc: "食物营养成分与营养工具",
              logo: "http://guozhivip.com/lab/images/hx.png",
            },
            {
              url: "https://www.zhijianshang.com/",
              title: "指尖上",
              desc: "指尖轻点，看遍世界",
              logo: "http://guozhivip.com/lab/images/zjs.png",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.footer {
  height: 100px;
  background: url(http://guozhivip.com/lab/images/tbg.png) no-repeat;
  background-size: 100% 100%;
  transform: rotate(180deg);
  margin-top: 30px;
}

.container {
  width: 1200px;
  margin: 0 auto;
  list-style: none;

  .class-title {
    height: 45px;
    color: #444;
    font-weight: 600;
    font-size: 18px;
    line-height: 45px;
    padding-left: 20px;
  }

  .row {
    list-style: none;

    .col {
      display: inline-block;
      width: 200px;
      padding: 0 7px;
      margin: 0 0 14px;

      .card-link {
        display: block;
        overflow: hidden;
        padding: 10px 10px;
        border-radius: 5px;
        background-color: #fff;
        -webkit-transition: all 0.2s ease-out;
        -moz-transition: all 0.2s ease-out;
        -o-transition: all 0.2s ease-out;
        transition: all 0.2s ease-out;

        &:hover {
          -moz-box-shadow: 4px 4px 10px rgba(180, 195, 255, 0.35);
          box-shadow: 4px 4px 10px rgba(180, 195, 255, 0.35);
          -webkit-transform: translateY(-5px);
          -moz-transform: translateY(-5px);
          -o-transform: translateY(-5px);
          transform: translateY(-5px);
          -ms-transform: translateY(-5px);
        }
      }

      .card-tit {
        height: 40px;
        color: #555;
        font-weight: 700;
        font-size: 14px;

        img {
          float: left;
          display: block;
          margin-right: 5px;
          width: 40px;
          height: 40px;
          border-radius: 5px;
        }

        .name {
          float: left;
          display: block;
          overflow: hidden;
          padding: 10px 3px 3px 3px;
          max-width: 62%;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .card-desc {
        overflow: hidden;
        margin-top: 3px;
        height: 25px;
        max-width: 99.5%;
        color: #777;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        line-height: 25px;
      }
    }
  }
}
</style>