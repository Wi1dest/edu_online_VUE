import request from '@/utils/request'

export default {
    // current:当前页 limit:每页记录数 teacherVO:查询条件
    getTeacherListPage(current,limit,teacherVO){
        return request({
            url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            // teacherVO查询条件
            // data:把对象转成JSON传给后端
            data: teacherVO
          })
    },

    deleteTeacherId(id){
        return request({
            url: `/eduservice/teacher/${id}`,
            method: 'delete'
        })
    }
}

