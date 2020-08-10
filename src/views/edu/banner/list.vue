<template>
  <div class="app-container">
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

      <el-table-column prop="title" label="名称" width="150" />

      <el-table-column prop="sort" label="排序" width="120" />

      <el-table-column prop="linkUrl" label="图片超链接" width="120" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160" />

      <el-table-column prop="gmtModified" label="更新时间" width="160" />

      <el-table-column label="操作" width="255" align="center">
        <template slot-scope="scope">
          <router-link :to="'/banner/edit/'+scope.row.id">
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
import banner from '@/api/edu/banner'

export default {
  data() {
    return {
      list: null, //API查询后返回的集合数据
      page: 1, //当前页
      limit: 6, //一页的记录数
      total: 0, //总记录数
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //讲师列表方法
    getList(page = 1) {
      this.page = page;
      banner
        .getBannerList(this.page, this.limit)
        //请求成功
        .then((response) => {
          this.list = response.data.items;
          this.total = response.data.total;
        })
    },
    resetData() {
      // 因为是v-model双向绑定的 所以此处清空 上面也清空
      this.teacherVO = {};
      this.getList();
    },
    removeDataById(id) {
      this.$confirm("此操作将永久删除该Banner, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调用删除方法
          banner.deleteBanner(id).then((response) => {
            //提示信息
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //回到列表
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>