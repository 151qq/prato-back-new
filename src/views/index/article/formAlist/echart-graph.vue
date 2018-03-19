<template>
  <div class="echar-box" :id="idName"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  data () {
    return {
      idName: 'spreadPath',
      option: {
        tooltip: {
            trigger: 'item',
            formatter: '{b}:{c}',
            hideDelay: 0 
        },
        series: [{
          name: '树图',
          type: 'tree',
          orient: 'horizontal', // vertical horizontal
          rootLocation: { x: '10%', y: '60%' }, // 根节点位置  {x: 'center',y: 10}
          nodePadding: 20, //智能定义全局最小节点间距，不能定义层级节点间距，有点搓。
          symbol: 'circle',
          symbolSize: [60, 60],
          data: [{
            name: '手机',
            value: 6,
            symbol: 'image://http://www.iconpng.com/png/ecommerce-business/iphone.png',
            children: [{
                  name: '小米', //由于label的formatter存在bug，所以无法通过html进行格式化，如果要换行要用\n
                  value: 4,
                  symbol: 'image://http://pic.58pic.com/58pic/12/36/51/66d58PICMUV.jpg',
                  children: [{
                    name: '小米11',
                    value: 10,
                    symbol: 'image://http://pic.58pic.com/58pic/12/36/51/66d58PICMUV.jpg',
                  }]
              },
              {
                name: '苹果',
                symbol: 'image://http://www.viastreaming.com/images/apple_logo2.png',
                value: 4
              }
            ]
          }]
        }]
      },
      mockData: {
          name: '华为',
          value: 4,
          symbol: 'image://http://pic.58pic.com/58pic/12/36/51/66d58PICMUV.jpg',
          children: [{
            name: '小米11',
            value: 10,
            symbol: 'image://http://pic.58pic.com/58pic/12/36/51/66d58PICMUV.jpg',
          }]
      }
    }
  },
  mounted () {
    // this.drawEchart()
  },
  methods: {
    // 获取echarts数据
    getData (param) {
      // console.log(param)
      // console.log(this.myChart.getOption())
      if(!(param.data.children && param.data.children.length > 0)) {
          // 没有数据获取数据
          setTimeout(() => {
            param.data.children = []
            param.data.children.push(this.mockData)
            this.myChart.setOption(this.myChart.getOption())
          }, 300)
      }
    },
    setEcharts () {
      let datas = this.echartsDate
      // 设置标题
      this.option.title.text = datas.title ? datas.title : ''
      // 设置legend
      this.option.legend[0].data = datas.categories ? datas.categories : []
      this.option.series[0].categories = datas.categories ? datas.categories : []

      
      // 设置关系数据
      this.option.series[0].data = [].concat(datas.nodes)
      this.option.series[0].links = [].concat(datas.links)

      this.drawEchart()
    },
    drawEchart () {
      // 使用刚指定的配置项和数据显示图表。
      // 基于准备好的dom，初始化echarts实例
      var dom = document.getElementById(this.idName)
      this.myChart = echarts.init(dom)
      this.myChart.on('click', this.getData)
      this.myChart.setOption(this.option)
    }
  }
}
</script>
<style lang="scss">
  .echar-box {
    width: 100%;
    height: 350px;
    box-sizing: border-box;
  }
</style>
