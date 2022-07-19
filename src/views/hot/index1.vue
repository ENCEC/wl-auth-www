<template>
  <div class="app-container">

    <div class="filter-container">
      文本框：
      <el-input v-model="testInput" placeholder="请输入测试内容" case="upper" trim="atrim" :dbc="true" />
      数字文本框：
      <!-- 格式化才
     自动截断:auto-cut="true"
     自动添加小数点:integerpart-length="2"
     -->
      <el-input-number v-model="testInputNumber" :precision="4" :auto-cut="true" :rounding="false" />
      下拉框：
      <!-- multiple allow-create   default-first-option -->
      <el-select v-model="testSelect" allow-create filterable default-first-option placeholder="请选择文章标签">
        <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      日期选择器datePicker：
      <el-date-picker v-model="datePickerValue" type="month" @change="handleDatePickerChange" />
      时间选择器timeSelect：
      <el-time-select v-model="timeSelectValue" placeholder="选择时间" @blur="handleTimeSelectBlur" />
      checkbox:
      <el-checkbox v-model="checkboxValue" @change="handleCheckBoxChange" />
    </div>

    <hot-table ref="testHotTable" :data-source="tableData" :settings="testHotSettings" @valueChange="handleCheckBoxChange">
      <hot-column data="checked" title="复选框" width="150">
        <el-checkbox-editor :disabled="true" hot-editor />
      </hot-column>
      <hot-column data="date" title="日期" width="150" :has-tip="true">
        <el-date-picker-editor type="datetime" placeholder="请选择日期" :picker-options="datePickerOptions" hot-editor @change="datePickerEditorChange" @blur="datePickerEditorBlur" @focus="datePickerEditorFocus" />
      </hot-column>
      <hot-column data="timeSelect" title="时间time-select" width="150" align="right" :has-tip="true">
        <el-time-select-editor
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
            minTime: '11:11',
          }"
          placeholder="任意时间点"
          hot-editor
          @change="timeSelectEditorChange"
          @blur="timeSelectEditorBlur"
          @focus="timeSelectEditorFocus"
        />
      </hot-column>
      <hot-column data="timePicker" title="时间time-picker" width="150" align="right" :has-tip="true">
        <el-time-picker-editor
          :picker-options="{
            selectableRange: '18:30:00 - 20:30:00',
          }"
          placeholder="任意时间点"
          hot-editor
          @change="timePickerEditorChange"
          @blur="timePickerEditorBlur"
          @focus="timePickerEditorFocus"
        />
      </hot-column>
      <hot-column data="address" title="级联" width="150" :has-tip="true">
        <el-cascader-editor
          :change-on-select="false"
          filterable
          clearable
          hot-editor
          :options="cascaderOptions"
          :props="{
            value: 'value',
            children: 'children',
            label: 'label',
          }"
          @change="cascaderEditorChange"
          @active-item-change="cascaderEditorItemChange"
        >
          <!-- expand-trigger="hover" :show-all-levels="false"  change-on-select -->
        </el-cascader-editor>
      </hot-column>
      <hot-column data="info" title="信息" width="150" :has-tip="true">
        <el-autocomplete-editor hot-editor :fetch-suggestions="autocompleteSearch" :trigger-on-focus="false" @select="autocompleteEditorSelect" />
      </hot-column>
      <hot-column data="id" title="id" width="150" :has-tip="true">
        <el-input-number-editor :integerpart-length="3" :step="2" :precision="4" :auto-cut="true" hot-editor @blur="inputEditorBlur" @focus="inputEditorFocus" @change="inputEditorChange" />
      </hot-column>
      <hot-column data="name" title="姓名" width="150" :has-tip="true">
        <el-input-editor hot-editor @blur="inputEditorBlur" @focus="inputEditorFocus" @change="inputEditorChange" />
      </hot-column>
      <hot-column data="height" title="高度" width="150" dict-name="MD_CODE_DICT$MD_CODE_SELF_COLLECT">
        <el-select-editor
          hot-editor
          multiple
          clearable
          :options="dicts.MD_CODE_DICT$MD_CODE_SELF_COLLECT"
          filterable
          default-first-option
          value-separator=";"
          @change="selectEditorChange"
          @visible-change="selectEditorVisibleChange"
          @remove-tag="selectEditorRemoveTag"
          @clear="selectEditorClear"
          @blur="selectEditorBlur"
          @focus="selectEditorFocus"
        />
      </hot-column>
      <hot-column data="age" title="年龄" width="150">
        <el-associate-editor
          v-model="associateValue"
          hot-editor
          multiple
          :display-init="associateValue"
          :columns="associateColumns"
          clearable
          value-prop="ipfCcmBoId"
          lable-prop="boName"
          :query-method="associateQueryMethod"
          @change="associateEditorChange"
          @visible-change="associateEditorVisibleChange"
          @remove-tag="associateEditorRemoveTag"
          @clear="associateEditorClear"
          @blur="associateEditorBlur"
          @focus="associateEditorFocus"
        />
      </hot-column>
    </hot-table>
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      testInput: '',
      testInputNumber: '',
      testSelect: [],
      selectOptions: [
        {
          value: 'HTML',
          label: 'HTML'
        },
        {
          value: 'CSS',
          label: 'CSS'
        },
        {
          value: 'JavaScript',
          label: 'JavaScript'
        }
      ],
      /* hot-table配置 */
      testHotSettings: {
        dragCheck: true,
        height: 200,
        manualColumnResize: true,
        language: 'zh-CN',
        licenseKey: 'non-commercial-and-evaluation'
      },
      tableData: [],
      /* 联想框 */
      associateValue: null,
      associateColumns: [
        {
          title: '业务对象名',
          field: 'boName'
        }
        // {
        //   title: '描述',
        //   field: 'description',
        // },
        // {
        //   title: '功能模块',
        //   field: 'appModule',
        // },
        // {
        //   title: 'java路径',
        //   field: 'javaPath',
        // }
      ],
      // 下拉框数据
      dicts: {
        MD_CODE_DICT$MD_CODE_SELF_COLLECT: [
          { label: '全程自有', value: 'N' },
          { label: '全程自采', value: 'Q' },
          { label: '部分自采', value: 'S' }
        ],
        MD_CODE_DICT$MD_CODE_FACILITY_TYPE: [
          { label: '码头', value: 'MT' },
          { label: '提箱地', value: 'TXD' },
          { label: '堆场', value: 'DC' },
          { label: '铁路口岸', value: 'TLKA' }
        ]
      },
      autocompleteData: [
        { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        {
          value: 'Hot honey 首尔炸鸡（仙霞路）',
          address: '上海市长宁区淞虹路661号'
        },
        {
          value: '新旺角茶餐厅',
          address: '上海市普陀区真北路988号创邑金沙谷6号楼113'
        },
        { value: '泷千家(天山西路店)', address: '天山西路438号' },
        {
          value: '胖仙女纸杯蛋糕（上海凌空店）',
          address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101'
        },
        { value: '贡茶', address: '上海市长宁区金钟路633号' },
        {
          value: '豪大大香鸡排超级奶爸',
          address: '上海市嘉定区曹安公路曹安路1685号'
        },
        {
          value: '茶芝兰（奶茶，手抓饼）',
          address: '上海市普陀区同普路1435号'
        },
        { value: '十二泷町', address: '上海市北翟路1444弄81号B幢-107' },
        { value: '星移浓缩咖啡', address: '上海市嘉定区新郁路817号' },
        { value: '阿姨奶茶/豪大大', address: '嘉定区曹安路1611号' },
        { value: '新麦甜四季甜品炸鸡', address: '嘉定区曹安公路2383弄55号' }
      ],
      // cascaderOptions: [{
      //   label: '江苏',
      //   cities: []
      // }, {
      //   label: '浙江',
      //   cities: []
      // }],

      cascaderOptions: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局'
                },
                {
                  value: 'color',
                  label: 'Color 色彩'
                },
                {
                  value: 'typography',
                  label: 'Typography 字体'
                },
                {
                  value: 'icon',
                  label: 'Icon 图标'
                },
                {
                  value: 'button',
                  label: 'Button 按钮'
                }
              ]
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio 单选框'
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox 多选框'
                },
                {
                  value: 'input',
                  label: 'Input 输入框'
                },
                {
                  value: 'input-number',
                  label: 'InputNumber 计数器'
                },
                {
                  value: 'select',
                  label: 'Select 选择器'
                },
                {
                  value: 'cascader',
                  label: 'Cascader 级联选择器'
                },
                {
                  value: 'switch',
                  label: 'Switch 开关'
                },
                {
                  value: 'slider',
                  label: 'Slider 滑块'
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器'
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器'
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器'
                },
                {
                  value: 'upload',
                  label: 'Upload 上传'
                },
                {
                  value: 'rate',
                  label: 'Rate 评分'
                },
                {
                  value: 'form',
                  label: 'Form 表单'
                }
              ]
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table 表格'
                },
                {
                  value: 'tag',
                  label: 'Tag 标签'
                },
                {
                  value: 'progress',
                  label: 'Progress 进度条'
                },
                {
                  value: 'tree',
                  label: 'Tree 树形控件'
                },
                {
                  value: 'pagination',
                  label: 'Pagination 分页'
                },
                {
                  value: 'badge',
                  label: 'Badge 标记'
                }
              ]
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert 警告'
                },
                {
                  value: 'loading',
                  label: 'Loading 加载'
                },
                {
                  value: 'message',
                  label: 'Message 消息提示'
                },
                {
                  value: 'message-box',
                  label: 'MessageBox 弹框'
                },
                {
                  value: 'notification',
                  label: 'Notification 通知'
                }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'NavMenu 导航菜单'
                },
                {
                  value: 'tabs',
                  label: 'Tabs 标签页'
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑'
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单'
                },
                {
                  value: 'steps',
                  label: 'Steps 步骤条'
                }
              ]
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog 对话框'
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示'
                },
                {
                  value: 'popover',
                  label: 'Popover 弹出框'
                },
                {
                  value: 'card',
                  label: 'Card 卡片'
                },
                {
                  value: 'carousel',
                  label: 'Carousel 走马灯'
                },
                {
                  value: 'collapse',
                  label: 'Collapse 折叠面板'
                }
              ]
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ],
      datePickerValue: '',
      timeSelectValue: '',
      datePickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }
        ]
      },
      checkboxValue: false
    };
  },
  computed: {},
  watch: {},

  mounted() {
    this.tableData = [
      {
        date: '',
        timeSelect: '',
        timePicker: '',
        address: '',
        info: 'in1',
        id: 1,
        name: 'aa',
        height: '',
        age: 18,
        checked: false,
        test: 't1'
      },
      {
        date: '',
        timeSelect: '',
        timePicker: '',
        address: '',
        info: 'in2',
        id: 11,
        name: 'dd',
        height: '',
        age: 19,
        checked: true,
        test: 't11'
      },
      {
        date: '',
        timeSelect: '',
        timePicker: '',
        address: '',
        info: 'in3',
        id: 111,
        name: 'gg',
        height: '',
        age: 17,
        checked: true,
        test: 't111'
      }
    ];
  },
  methods: {
    /* 测试编辑器事件 */
    // el-input-editor  el-input-number-editor
    inputEditorBlur(e) {
      console.log('el-input-editor的blur事件', e);
    },
    inputEditorFocus(e) {
      console.log('el-input-editor的focus事件', e);
    },
    inputEditorChange(value) {
      console.log('el-input-editor的change事件', value);
    },

    // el-select-editor
    selectEditorChange(val) {
      console.log('el-select-editor的change事件', val);
    },
    selectEditorVisibleChange(val) {
      console.log('el-select-editor的visible-change事件', val);
    },
    selectEditorRemoveTag(val) {
      console.log('el-select-editor的remove-tag事件', val);
    },
    selectEditorClear() {
      console.log('el-select-editor的clear事件');
    },
    selectEditorBlur(e) {
      console.log('el-select-editor的blur事件', e);
    },
    selectEditorFocus(e) {
      console.log('el-select-editor的focus事件', e);
    },

    // el-autocomplete-editor
    autocompleteEditorSelect(item) {
      console.log('el-autocomplete-editor的select事件', item);
    },

    // el-cascader-editor
    cascaderEditorChange(val) {
      console.log('el-cascader-editor的change事件', val);
    },

    // el-time-select-editor
    timeSelectEditorChange(val) {
      console.log('el-time-select-editor的change事件', val);
    },
    timeSelectEditorBlur(ele) {
      console.log('el-time-select-editor的blur事件', ele);
    },
    timeSelectEditorFocus(ele) {
      console.log('el-time-select-editor的focus事件', ele);
    },

    // el-time-picker-editor
    timePickerEditorChange(val) {
      console.log('el-time-picker-editor的change事件', val);
    },
    timePickerEditorBlur(ele) {
      console.log('el-time-picker-editor的blur事件', ele);
    },
    timePickerEditorFocus(ele) {
      console.log('el-time-picker-editor的focus事件', ele);
    },

    // el-date-picker-editor
    datePickerEditorChange(val) {
      console.log('el-date-picker-editor的change事件', val);
    },
    datePickerEditorBlur(ele) {
      console.log('el-date-picker-editor的blur事件', ele);
    },
    datePickerEditorFocus(ele) {
      console.log('el-date-picker-editor的focus事件', ele);
    },

    // el-associate-editor
    associateEditorChange(val) {
      console.log('el-associate-editor的change事件', val);
    },
    associateEditorVisibleChange(val) {
      console.log('el-associate-editor的visible-change事件', val);
    },
    associateEditorRemoveTag(val) {
      console.log('el-associate-editor的remove-tag事件', val);
    },
    associateEditorClear() {
      console.log('el-select-editor的clear事件');
    },
    associateEditorBlur(e) {
      console.log('el-associate-editor的blur事件', e);
    },
    associateEditorFocus(e) {
      console.log('el-associate-editor的focus事件', e);
    },

    cascaderEditorItemChange(val) {
      setTimeout(() => {
        if (val.indexOf('zhinan') > -1) {
          this.cascaderOptions[0].children.push({
            label: '郑家指南'
          });
        } else if (val.indexOf('ziyuan') > -1) {
          this.cascaderOptions[2].children.unshift({
            value: 'gold',
            label: '黄金'
          });
        }
      }, 300);
    }, // 动态加载级联控件次级选项
    associateQueryMethod(option) {
      const _this = this;
      // window.console.log(option)
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(_this.mock(option));
        }, Math.random() * 800);
      });
    },
    mock({ keyword, pageSize, currentPage }) {
      let list = [
        {
          boName: 'BasItemSelect',
          ipfCcmBoId: '76978a4036d74f348d1ad441e94e37e5'
        },
        {
          boName: 'CsCustInspect',
          ipfCcmBoId: '1c0de2b7dca747e08fa6a67843ccee84'
        },
        { boName: 'SysDac', ipfCcmBoId: 'aa5cd4713eb94c4f9e00db096db5431d' },
        { boName: 'MdPmTask', ipfCcmBoId: '855feb02002746d3b83e939af6f60d2b' }
      ];
      list = list.filter(
        item => item.boName.toLowerCase().indexOf(keyword) >= 0
      );
      const total = list.length;
      const from = pageSize * (currentPage - 1);
      list = list.slice(from, from + pageSize);
      return {
        records: list,
        recordStart: from,
        recordEnd: from + list.length - 1,
        total
      };
    },
    autocompleteSearch(queryString, cb) {
      const autocompleteData = this.autocompleteData;
      const results = queryString
        ? autocompleteData.filter(this.createFilter(queryString))
        : autocompleteData;
      cb(results);
    },
    createFilter(queryString) {
      return data => {
        return (
          data.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    handleDatePickerChange(item) {
      console.log('handleDatePickerChange', item);
    },
    handleTimeSelectBlur() {
      console.log('timeSelect失焦事件', this.timeSelectValue);
    },

    handleCheckBoxChange(val) {
      // console.log('checkbox变化', val)
    }
  }
};
</script>
