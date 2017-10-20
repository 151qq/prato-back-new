<template>
    <section class="date-body">
        <section class="head-box">
            <div class="down-box">
                <span class="year-btn-down"> << </span>
                <span class="month-btn-down"> < </span>
            </div>
            <div class="text-box">
                <input class="year-input" type="text" v-model="year">年
                <input class="month-input" type="text" v-model="month">月
            </div>
            <div class="up-box">
                <span class="year-btn-up"> >> </span>
                <span class="month-btn-up"> > </span>
            </div>
        </section>
        <section class="weeks-box">
            <span v-for="(week, index) in weeks"
                    :key="index"
                    v-text="week"></span>
        </section>
        <section class="days-box">
            <div v-for="(row, indexRow) in months" :key="indexRow">
                <span v-for="(col, indexCol) in row"
                        :key="indexCol"
                        :class="{
                            preDay: col.isPreday,
                            nextDay: !col.isPreday && ! col.isToday,
                            today: col.isToday,
                            selected: col.isSelect,
                            expier: !col.isHold && col.isSelect && col.isPreday,
                            hold: col.isSelect && col.isHold
                        }"
                        v-text="col.dayStr"></span>
            </div>
        </section>
    </section>
</template>
<script>
export default {
    props: ['year', 'month', 'noLeft', 'noRight', 'selectData'],
    data () {
        return {
            weeks: ['日', '一', '二', '三', '四', '五', '六'],
            months: []
        }
    },
    mounted () {
        var today = new Date()
        this.todayYear = today.getFullYear()
        this.todayMonth = today.getMonth() + 1
        this.todayDay = today.getDate()

        console.log(this.todayMonth, this.todayDay)
        this.todayTimes = new Date(this.todayYear, today.getMonth(), this.todayDay).getTime()
        this.upDateHandle()
    },
    methods: {
        upDateHandle () {
            // 置空日历
            this.months = []

            //当前月的第一天的日期
            var firstDay = new Date(this.year, (this.month - 1), 1)

            //第一天是星期几
            var weekday = firstDay.getDay()

            /**求当前月一共有多少天
             *new Date(year,month,0) ： month是当前月，day为0即我们所需的当前月的最后一天。
             *getDate（）则返回这个日期对象是一个月中的第几天，我们由最后一天得知这个月一共有多少天
             **/
            var days = new Date(this.year, this.month, 0).getDate()

            var dayDatas = []

            //上个月末几天置空
            for (var i = 0; i < weekday; i++) {
                dayDatas.push({})
            }
            // 2017-09-10
            for (var i = 1; i <= days; i++) {

                // 当前日期times
                var dayTimes = new Date(this.year, Number(this.month) - 1, i).getTime()

                var day = {
                    isPreday: this.todayTimes > dayTimes,
                    isToday: this.todayTimes == dayTimes,
                    dayStr: i < 10 ? '0' + i : i
                }

                var seleteD = this.selectData.filter((item) => {
                    var dateArr = item.date.split('-')

                    // 被选中日期times
                    var dateTimes = new Date(dateArr[0], Number(dateArr[1]) - 1, dateArr[2]).getTime()

                    return dayTimes == dateTimes
                })

                if (seleteD && seleteD.length) {
                    day.isHold = seleteD[0].isHold
                    day.isSelect = true
                } else {
                    day.isSelect = false
                    day.isHold = false
                }

                dayDatas.push(day)
            }

            while (dayDatas.length) {
                this.months.push(dayDatas.splice(0, 7))
            }
        }
    }
}
</script>
<style lang="scss">
.date-body {
    display: inline-block;

    .head-box {
        overflow: hidden;

        .down-box {
            float: left;
            font-size: 12px;
            color: #99A9BF;

            span {
                display: inline-block;
                width: 24px;
            }
        }

        .text-box {
            float: left;
            width: 100px;
        }
    }
}
</style>