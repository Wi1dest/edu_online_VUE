<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="Banner名称">
        <el-input v-model="banner.title" />
      </el-form-item>
      <el-form-item label="Banner排序">
        <el-input-number v-model="banner.sort" controls-position="right" min="0" />
      </el-form-item>
      <el-form-item label="Banner图片">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="banner.imageUrl" />
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">上传Banner图片</el-button>

        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/ossservice/file/banner'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>

      <el-form-item label="Banner链接">
        <el-input v-model="banner.linkUrl" />
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import banner from "@/api/edu/banner";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";

export default {
  components: {
    ImageCropper,
    PanThumb,
  },
  data() {
    return {
      banner: {
        title: "",
        sort: 0,
        imageUrl: "",
        linkUrl: " ",
      },
      imagecropperShow: false,
      imagecropperKey: 0,
      BASE_API: process.env.BASE_API,
      saveBtnDisabled: false,
    };
  },
  created() {
    this.init();
  },
  watch: {
    $route(to, from) {
      this.init();
    },
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        this.getBannerById(id);
      } else {
        this.banner = {};
      }
    },
    saveOrUpdate() {
      this.saveBtnDisabled = true;
      if (!this.banner.id) {
        this.saveBanner();
      } else {
        this.updateBannerById();
      }
    },
    saveBanner() {
      banner
        .saveBanner(this.banner)
        .then((response) => {
          return this.$message({
            type: "success",
            message: "保存成功!",
          });
        })
        .then((response) => {
          this.$router.push({ path: "/banner/table" });
        })
        .catch((response) => {
          this.$message({
            type: "error",
            message: "保存失败",
          });
        });
    },
    getBannerById(id) {
      banner.getBannerById(id).then((response) => {
        this.banner = response.data;
      });
    },
    updateBannerById() {
      banner
        .updateBanner(this.banner)
        .then((response) => {
          return this.$message({
            type: "success",
            message: "修改成功!",
          });
        })
        .then((response) => {
          this.$router.push({ path: "/banner/table" });
        })
        .catch((response) => {
          this.$message({
            type: "error",
            message: "保存失败",
          });
        });
    },
    // 关闭上传弹窗
    close() {
      this.imagecropperShow = false;
      //上传组件初始化(不然上传成功后想重新上传会显示"上传成功"而无法选择照片)
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    //上传成功方法
    cropSuccess(data) {
      this.imagecropperShow = false;
      //上传之后接口返回的地址
      this.banner.imageUrl = data.url;
      this.imagecropperKey = this.imagecropperKey + 1;
    },
  },
};
</script>