import request from '@/utils/request'
import { data } from 'autoprefixer'

export default {
    getAllChapterVideo(courseId){
        return request({
            url: "/eduservice/chapter/getChapterVideo/"+courseId,
            method: 'get'
        })
    },
    addChapter(chapter){
        return request({
            url: "/eduservice/chapter/saveChapter/",
            method: 'post',
            data: chapter
        })
    },
    getChapterByChapterId(chapterId){
        return request({
            url: "/eduservice/chapter/getChapter/"+chapterId,
            method: 'get'
        })
    },
    deleteChapterByChapterId(chapterId){
        return request({
            url: "/eduservice/chapter/"+chapterId,
            method: 'delete'
        })
    },
    updateChapterByChapterId(chapter){
        return request({
            url: "/eduservice/chapter/updateChapter",
            method: 'put',
            data: chapter
        })
    }
}