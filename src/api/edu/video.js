import request from '@/utils/request'

export default {
    addVideo(video){
        return request({
            url: "/eduservice/video/saveChapter",
            method: 'post',
            data: video
        })
    },
    deleteVideoByVideoId(videoId){
        return request({
            url: "/eduservice/video/"+videoId,
            method: 'delete'
        })
    },
    getVideo(videoId){
        return request({
            url: "/eduservice/video/getVideo/"+videoId,
            method: 'get'
        })
    },
    // updateVideo(video){
    //     return request({
    //         url: "/eduservice/video/update",
    //         method: 'put',
    //         data: video
    //     })
    // },
    deleeteVideo(videoId){
        return request({
            url: "/vodservice/video/deleteAliVideo/" + videoId,
            method: 'delete'
        })
    }
}