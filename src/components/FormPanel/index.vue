<template>
  <el-form :ref="formConfig.ref" :inline="formConfig.inline" :label-position="formConfig.labelPosition" :class="formConfig.class" :label-width="formConfig.labelWidth?formConfig.labelWidth:'80px'" :model="value" :rules="rules" :style="formConfig.style">
    <el-row :gutter="formConfig.gutter">
      <slot name="formItem" />
      <el-col
        v-for="(item, index) in formConfig.formItemList"
        :key="item.prop"
        :span="item.col ? item.col : formConfig.col"
      >
        <el-form-item :label="item.label" :prop="item.prop">
          <!-- input type: text | textarea | password-->
          <el-input
            v-if="item.type === 'input' || item.type === 'textarea' || item.type === 'password'"
            v-model="value[item.prop]"
            :type="item.type"
            :rows="item.type === 'textarea' ? item.rows : ''"
            :show-password="item.type === 'password' && item.showPassword ? true : false"
            :placeholder="item.placeholder"
            :class="item.class"
            :autosize="item.autosize"
            :disabled="item.disabled"
            :prefix-icon="item.type === 'text' ? item.prefix - icon : ''"
            :suffix-icon="item.type === 'text' ? item.suffix - icon : ''"
            :clearable="item.clearable ? item.clearable : false"
          />
          <!-- radio -->
          <el-radio-group
            v-if="item.type === 'radio'"
            v-model="value[item.prop]"
            @change="radioVal => {item.changeRadio? item.changeRadio(radioVal, item, index): ''}"
          >
            <el-radio
              v-for="(radio, index) in item.radioArr"
              :key="index"
              :label="radio[item.radioLabel?item.radioLabel:'label']"
              :disabled="radio.disabled"
            >{{ radio[item.radioLabel?item.radioLabel:'label'] }}</el-radio>
          </el-radio-group>
          <!-- checkbox -->
          <el-checkbox-group
            v-if="item.type === 'checkbox'"
            v-model="value[item.prop]"
            @change="checkVal => { item.changeCheck? item.changeCheck(checkVal, item, index): ''}"
          >
            <el-checkbox
              v-for="(checkbox, index) in item.checkboxArr"
              :key="index"
              :label="checkbox[item.checkLabel?item.checkLabel:'label']"
              :disabled="checkbox.disabled"
            >{{ checkbox[item.checkLabel?item.checkLabel:'label'] }}</el-checkbox>
          </el-checkbox-group>
          <!-- select -->
          <el-select
            v-if="item.type === 'select'"
            v-model="value[item.prop]"
            :disabled="item.disabled"
            :clearable="item.clearable"
            :multiple="item.multiple"
            :placeholder="item.placeholder"
            @change="optionVal => {item.changeSelect? item.changeSelect(optionVal, item, index): ''}"
          >
            <el-option
              v-for="option in item.options"
              :key="item.optionSingle?option:option[item.optionKey?item.optionKey:'value']"
              :label="item.optionSingle?option:option[item.optionLabel?item.optionLabel:'label']"
              :value="item.optionSingle?option:option[item.optionValue?item.optionValue:'value']"
              :disabled="option.disabled"
            />
          </el-select>
          <!-- cascader -->
          <el-cascader
            v-if="item.type === 'cascader'"
            v-model="value[item.prop]"
            :options="item.options"
            :props="item.props"
            :clearable="item.clearable ? true : false"
            @change="value => {item.changeCascader? item.changeCascader(value, item, index): ''}"
          />
          <!-- number -->
          <el-input-number
            v-if="item.type === 'number'"
            v-model="value[item.prop]"
            :min="item.min"
            :max="item.max"
            :size="item.size"
            @change="(currentValue, oldValue) => {item.changeNumber? item.changeNumber(currentValue, oldValue, item, index): ''}"
          />
          <!-- timePicker -->
          <el-time-select
            v-if="item.type === 'timePicker'"
            v-model="value[item.prop]"
            :picker-options="item.pickerOptions"
            :placeholder="item.placeholder ? item.placeholder : '选择时间'"
            :clearable="item.clearable"
            :disabled="item.disabled"
            :is-range="item.isRange"
            :start-placeholder="item.startPlaceholder"
            :end-placeholder="item.endPlaceholder"
            :prefix-icon="item.prefixIcon ? item.prefixIcon : 'el-icon-time'"
            :clear-icon="item.clearIcon ? item.clearIcon : 'el-icon-circle-close'"
            :range-separator="item.rangeSeparator ? item.rangeSeparator : '至'"
            @change="time => {item.changeTime ? item.changeTime(time, item, index) : ''}"
          />
          <!-- datePicker  --- subType:date daterange....-->
          <el-date-picker
            v-if="item.type === 'datePicker'"
            v-model="value[item.prop]"
            :type="item.subType ? item.subType : 'date'"
            :disabled="item.disabled"
            :readonly="item.readonly"
            :unlink-panels="item.unlinkPanels ? item.unlinkPanels : false"
            :placeholder="item.placeholder ? item.placeholder : '选择日期'"
            :range-separator="item.rangeSeparator ? item.rangeSeparator : '至'"
            :start-placeholder="item.startPlaceholder ? item.startPlaceholder : '开始日期'"
            :end-placeholder="item.endPlaceholder ? item.endPlaceholder : '结束日期'"
            :picker-options="item.pickerOptions"
            :format="item.format"
            :align="item.align"
            :editable="item.editable"
            :clearable="item.clearable"
            :value-format="item.valueFormat"
            @change="date => {item.changeDate ? item.changeDate(date, item, index) : ''}"
          />
          <!-- dateTimePicker -->
          <el-date-picker
            v-if="item.type === 'dateTimePicker'"
            v-model="value[item.prop]"
            :type="item.subType ? item.subType : 'datetime'"
            :disabled="item.disabled"
            :readonly="item.readonly"
            :unlink-panels="item.unlinkPanels ? item.unlinkPanels : false"
            :placeholder="item.placeholder"
            :range-separator="item.rangeSeparator ? item.rangeSeparator : '至'"
            :start-placeholder="item.startPlaceholder ? item.startPlaceholder : '开始日期'"
            :end-placeholder="item.endPlaceholder ? item.endPlaceholder : '结束日期'"
            :picker-options="item.pickerOptions"
            :format="item.format"
            :align="item.align"
            :editable="item.editable"
            :clearable="item.clearable"
            :value-format="item.valueFormat"
            @change="dateTime => {item.changeDateTime? item.changeDateTime(dateTime, item, index): ''}"
          />
        </el-form-item>
      </el-col>
      <el-col :span="formConfig.operateCol ? formConfig.operateCol : formConfig.col">
        <el-form-item>
          <!-- button -->
          <el-button
            v-for="(item,index) in formConfig.operates"
            :key="index"
            :type="item.type"
            :size="item.size"
            :disabled="item.disabled"
            :plain="item.plain"
            :icon="item.icon"
            @click.native.prevent="item.method ? item.method(formItemList, item, index) : ''"
          >{{ item.buttonLabel }}
          </el-button>
          <slot name="operate" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
export default {
  props: {
    formConfig: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {},
  mounted() {
    this.setDefaultValue()
  },
  methods: {
    setDefaultValue() {
      const formData = { ...this.value }
      // 设置默认值
      this.formConfig.formItemList.forEach(({ key, value }) => {
        if (formData[key] === undefined || formData[key] === null) {
          formData[key] = value
        }
      });
      this.$emit('input', formData)
    }
  }
};
</script>
<style lang="scss" scope>

</style>
