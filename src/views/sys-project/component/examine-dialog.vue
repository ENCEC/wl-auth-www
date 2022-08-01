<template>
  <div class="project-examine-dialog">
    <el-dialog
      top="10vh"
      :title="dialogTitle"
      :visible="dialogVisible"
      width="800px"
      center
      destroy-on-close
    >
      <el-form
        ref="elForm"
        :model="temp"
        size="medium"
        label-position="left"
        label-width="100px"
        :inline="true"
        destroy-on-close
        disabled
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目总监">
              <el-input :value="chiefName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目经理">
              <el-input :value="demandName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开发经理">
              <el-input :value="devDirectorName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="需求组长">
              <el-input :value="dutyName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开发组员">
              <el-input :value="genDevUsersName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="需求组员">
              <el-input :value="genDemandUsersName" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer">
        <el-button
          type="primary"
          :plain="true"
          size="medium"
          @click="dialogVisible = false"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { queryViewDetailById } from '@/api/sys-project.js';
export default {
  components: {},
  props: {},
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '查看项目组成员',
      temp: {
      },
      // 项目总监
      chiefName: '',
      // 需求组长
      demandName: '',
      // 开发经理
      devDirectorName: '',
      // 项目经理
      dutyName: '',
      // 需求组员ID
      genDemandUsersName: '',
      // 开发组员ID
      genDevUsersName: ''
    };
  },

  watch: {},
  created() {},
  mounted() {},
  methods: {
    open(row) {
      this.dialogVisible = true;
      if (row) {
        debugger;
        this.temp = row;
        this.getChiefName();
        this.getDemandName();
        this.getDevDirectortName();
        this.getDutyName();
        this.getGenDevUsersName()
        this.getGenDemandUsersName();
      }
    },
    getChiefName() {
      const nameArr = [];
      queryViewDetailById(this.temp.chiefId).then((res) => {
        res.data.forEach((item) => {
          nameArr.push(item.name);
        });
        this.chiefName = nameArr.join(',');
      });
    },
    getDemandName() {
      const nameArr = [];
      queryViewDetailById(this.temp.demandId).then((res) => {
        res.data.forEach((item) => {
          nameArr.push(item.name);
        });
        this.demandName = nameArr.join(',');
      });
    },
    getDevDirectortName() {
      const nameArr = [];
      queryViewDetailById(this.temp.devDirectorId).then((res) => {
        res.data.forEach((item) => {
          nameArr.push(item.name);
        });
        this.devDirectorName = nameArr.join(',');
      });
    },
    getDutyName() {
      const nameArr = [];
      queryViewDetailById(this.temp.dutyId).then((res) => {
        res.data.forEach((item) => {
          nameArr.push(item.name);
        });
        this.dutyName = nameArr.join(',');
      });
    },
    getDenDemandUsersName() {
      const nameArr = [];
      queryViewDetailById(this.temp.genDemandUsers).then((res) => {
        res.data.forEach((item) => {
          nameArr.push(item.name);
        });
        this.genDemandUsersName = nameArr.join(',');
      });
    },
    getDenDevUsersName() {
      const nameArr = [];
      queryViewDetailById(this.temp.genDevUsers).then((res) => {
        res.data.forEach((item) => {
          nameArr.push(item.name);
        });
        this.genDevUsersName = nameArr.join(',');
      });
    }
  }
};
</script>
<style lang="scss">
</style>
