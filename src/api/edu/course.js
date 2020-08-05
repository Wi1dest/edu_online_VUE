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
    }
}