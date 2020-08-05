<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" " />
      </el-form-item>

      <!-- 所属分类 -->
      <!-- 一级分类 -->
      <el-form-item label="课程类别">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="请选择一级分类"
          @change="subjectLevelOneChanged"
        >
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="请选择二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.value"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程简介 -->
      <el-form-item label="课程简介">
        <el-input v-model="courseInfo.description" placeholder=" " />
      </el-form-item>

      <!-- 课程封面 -->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/ossservice/file'"
          class="avatar-uploader"
        >
          <img :src="courseInfo.cover" />
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />元
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from "@/api/edu/course";
import subject from "@/api/edu/subject";

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseInfo: {
        title: "",
        subjectId: "",
        teacherId: "",
        lessonNum: 0,
        description: "",
        cover: "/static/cover.jpg",
        price: 0,
      },
      BASE_API: process.env.BASE_API,
      teacherList: [],
      subjectOneList: [],
      subjectTwoList: [],
    };
  },
  created() {
    this.getTeacherList();
    this.getSubjectList();
  },
  methods: {
    saveOrUpdate() {
      course.addCourseInfo(this.courseInfo).then((response) => {
        // 提示
        this.$message({
          type: "success",
          message: "添加课程成功!",
        });
        //调到第二步
        this.$router.push({ path: "/course/chapter/" + response.data });
      });
    },
    getTeacherList() {
      course.getTeacherList().then((response) => {
        this.teacherList = response.data;
      });
    },
    getSubjectList() {
      subject.getSubjectList().then((response) => {
        this.subjectOneList = response.data;
      });
    },
    subjectLevelOneChanged(value) {
      //value就是一级分类id值
      //遍历所有的分类，包含一级和二级
      for (let i = 0; i < this.subjectOneList.length; i++) {
        //每个一级分类
        var oneSubject = this.subjectOneList[i];
        //判断：所有一级分类id 和 点击一级分类id是否一样
        if (value === oneSubject.id) {
          this.subjectTwoList = oneSubject.children;
          //把二级分类id值清空
          this.courseInfo.subjectId = "";
        }
      }
    },
    //上传成功
    handleAvatarSuccess(res,file) {
      this.courseInfo.cover = res.data.url;
    },
    //上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>