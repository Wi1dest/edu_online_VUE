import request from '@/utils/request'

export default {
    registerCount(day){
        return request({
            url: "/statisticsservice/statisticsDaily/countregister/"+day,
            method: 'get'
        })
    },
    showChart(begin,end,type){
        return request({
            url: `/statisticsservice/statisticsDaily/chart/${begin}/${end}/${type}`,
            method: 'get'
        })
    }
}