<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseVO.title" placeholder="课程名称" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="courseVO.status" clearable placeholder="发布状态">
          <el-option :value="'Draft'" label="未发布" />
          <el-option :value="'Normal'" label="已发布" />
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="title" label="名称" width="80" />

      <el-table-column label="状态" width="80">
        <template slot-scope="scope">{{ scope.row.status==='Normal'?'已发布':'未发布' }}</template>
      </el-table-column>

      <el-table-column prop="price" label="价格" />

      <el-table-column prop="lessonNum" label="课时" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160" />

      <el-table-column prop="gmtModified" label="更新时间" width="160" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import course from "@/api/edu/course";

export default {
  data() {
    return {
      list: null, //API查询后返回的集合数据
      page: 1, //当前页
      limit: 6, //一页的记录数
      total: 0, //总记录数
      courseVO: {}, //条件封装对象
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(page = 1) {
      this.page = page;
      course
        .getCourseInfoCondition(this.page, this.limit, this.courseVO)
        .then((response) => {
          this.list = response.data.rows;
          this.total = response.data.total;
        });
    },
    resetData() {
      // 因为是v-model双向绑定的 所以此处清空 上面也清空
      this.courseVO = {};
      this.getList();
    },
    removeDataById(courseId) {
      this.$confirm("此操作将删除课程及其所有章节小节内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        course.delCourse(courseId).then((response) => {
          //提示信息
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //回到列表
          this.getList();
        });
      });
    },
  },
};
</script>