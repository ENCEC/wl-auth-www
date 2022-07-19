<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px" style="max-width:800px">
      <el-form-item label="活动名称">
        <el-input ref="test" v-model="form.name" name="name" />
      </el-form-item>

      <el-form-item label="活动地点">
        <el-input ref="test" v-model="form.add" disabled name="date" />
      </el-form-item>

      <el-form-item label="活动内容">
        <el-input v-model="form.desc" type="textarea" name="delivery" />
      </el-form-item>

      <el-form-item label="活动形式">
        <el-checkbox-group v-model="form.checkbox">
          <el-checkbox name="checkbox" disabled :label="3">3</el-checkbox>
          <el-checkbox name="checkbox" :label="6">6</el-checkbox>
          <el-checkbox name="checkbox" :label="9">35</el-checkbox>
          <el-checkbox name="checkbox" disabled :label="12">5</el-checkbox>
          <el-checkbox name="checkbox" disabled :label="14">23</el-checkbox>
          <el-checkbox name="checkbox" disabled :label="941">112</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="活动项目">
        <el-input v-model="form.desc" type="textarea" name="desc" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button name="cance">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '12',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        radio: '',
        checkbox: [],
        type: '',
        resource: '',
        desc: ''
      }
    }
  },
  created() {
    const config = {
      ignoreCase: true, // 区分大小写
      getElement: this.getElement, // 自定义获取getElement 事件
      indexes: [ // indexes 切换控件列表
        {
          field: 'name',
          label: 'nameLabel',
          idx: 0
        },
        {
          field: 'date',
          label: 'dateLabel',
          idx: 1
        },
        {
          key: { // 单独定义切换到该控件的快捷键
            ctrl: false,
            shift: false,
            alt: false,
            key: 'F3'
          },
          field: 'delivery',
          label: 'deliveryLabel',
          idx: 2
        },
        {
          field: 'checkbox',
          label: 'checkboxLabel',
          idx: 12,
          jumpMultiple: false
        },
        {
          field: 'desc',
          label: 'descLabel',
          idx: 16
        },
        {
          field: 'button',
          label: 'button',
          idx: 22
        }
      ]
    }
    this.$tabIndex.register(this, config)
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>
