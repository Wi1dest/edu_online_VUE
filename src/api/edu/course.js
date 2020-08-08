import request from '@/utils/request'
import { data } from 'autoprefixer'

export default {
    addCourseInfo(courseInfo) {
        return request({
            url: "/eduservice/course/saveCourse",
            method: 'post',
            data: courseInfo
        })
    },
    getTeacherList(){
        return request({
            url: "/eduservice/teacher/findAll",
            method: 'get'
        })
    },
    getCourseById(id){
        return request({
            url: "/eduservice/course/getCourseInfo/"+id,
            method: 'get'
        })
    },
    updateCourse(courseInfo){
        return request({
            url: "/eduservice/course/updateCourseInfo",
            method: 'put',
            data: courseInfo
        })
    },
    getCoursePublish(courseId){
        return request({
            url: "/eduservice/course/getCoursePublish/"+courseId,
            method: 'get'
        })
    },
    fixCoursePublish(courseId){
        return request({
            url: "/eduservice/course/"+courseId,
            method: 'put'
        })
    },
    getCourseInfo(page,limit){
        return request({
            url: `/eduservice/course/getCourse/${page}/${limit}`,
            method: 'get'
        })
    },
    getCourseInfoCondition(page,limit,courseVO){
        return request({
            url: `/eduservice/course/getCourse/${page}/${limit}`,
            method: 'post',
            data: courseVO
        })
    },
    delCourse(courseId){
        return request({
            url: "/eduservice/course/deleteCourseByCourseId/" + courseId,
            method: 'delete'
        })
    }
}