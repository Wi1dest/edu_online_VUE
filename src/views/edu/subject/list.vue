<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="subjectTree"
      :data="subjectList"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import subject from '@/api/edu/subject'

export default {

  data() {
    return {
      filterText: '',
      subjectList: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.subjectTree.filter(val)
    }
  },

  created() {
    this.getAllSubjectList()
  },

  methods: {
    getAllSubjectList() {
      subject.getSubjectList().then(response => {
          this.subjectList = response.data
      })
    },
    // 搜索功能优化: 都变成小写来比较 实现搜索功能不区分大小写
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value) !== -1
    }
  }
}
</script>