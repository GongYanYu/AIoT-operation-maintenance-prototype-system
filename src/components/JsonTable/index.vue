<template>
  <div class="list-view-table">
    <div class="json-table-view">
      <el-table
        ref="jsonTable"
        v-loading="loading"
        :data="tableData"
        :border="border"
        :stripe="stripe"
        :show-header="showHeader"
        :height="tableHeight"
        :row-key="rowKey"
        :header-cell-style="headerCellStyle"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="index" width="50"> </el-table-column> -->

        <el-table-column
          v-if="tableType === 'expand'"
          type="expand"
          align="center"
          header-align="center"
          width="50"
        >
          <template slot-scope="scope">
            <slot name="tableType" :rowData="{ scope }"/>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="tableType !== 'none'"
          :type="canCatchDel ? tableType : 'index'"
          :fixed="tableType === 'selection' && canCatchDel ? 'left' : ''"
          :label="tableType === 'index' || !canCatchDel ? '#' : ''"
          align="center"
          header-align="center"
          width="50"
        />

        <el-table-column
          type="index"
          v-if="indexModel"
          align="center"
          width="50"
          :label="'#'"
        >
        </el-table-column>

        <el-table-column
          v-for="(col, index) in tableHeads"
          :key="index"
          :align="col.align || 'center'"
          :header-align="col.headerAlign || 'center'"
          :prop="col.prop"
          :fixed="col.fixed"
          :label="col.label"
          :width="col.width || ''"
          :show-overflow-tooltip="col.overflowTooltip === 'show'"
          :min-width="col.minWidth || ''"
        >
          <template slot-scope="scope">
            <span v-if="!col.slot">{{ scope.row[col.prop] }}</span>
            <slot v-else :name="col.prop" :rowData="{ scope }"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="page !== null" class="page">
      <el-pagination
        prev-text="上一页"
        next-text="下一页"
        :current-page.sync="page.current"
        :page-size="page.limit"
        :total="page.total"
        layout="prev, pager, next, total, slot, jumper"
        @current-change="onCurrentPageChange"
      >
        <span class="common-pagination__total-pages">共{{ totalPages }}页</span>
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JsonTable',
  props: {
    // 斑马线
    stripe: {
      type: Boolean,
      default: false
    },
    // 边框
    border: {
      type: Boolean,
      default: true
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true
    },
    // 表头样式
    headerCellStyle: {
      type: Object,
      default: () => {
        return {
          background: '#f8f8f8',
          color: '#555',
          height: '40px'
        }
      }
    },

    // 表格第一列类型：
    // 1、selection：多选；
    // 2、expand：展开行；
    // 3、index：序号（default）
    // 4、none：什么也没有
    tableType: {
      type: String,
      default: 'index'
    },

    indexModel: {
      type: Boolean,
      default: false
    },

    // 表格多选的时候必填，一般都是批量删除所需的主键
    rowKey: {
      type: String,
      default: null
    },
    selectionButtonName: {
      type: String,
      default: '批量操作'
    },
    selectionButtonType: {
      type: String,
      default: 'danger'
    },
    // 表格列值配置列表，item 字段有：{ slot,prop,label,width,min-width,align(default center),header-align(default center),fixed }
    // 一般地最后一列fixed:'right'；表格多选的时候第一列fixed:'left'，操作列fixed:'right'。
    tableHeads: {
      type: Array
    },
    tableData: {
      type: Array
    },
    // 分页信息: { current, limit, total }
    page: {
      type: Object,
      default: null
    },
    // 加载
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableHeight: 0,

      // 多选时候的相关数据
      selections: []
    }
  },
  computed: {
    totalPages() {
      return this.page ? Math.ceil(this.page.total / this.page.limit) : 0
    },
    //
    canCatchDel() {
      return true
    }
  },

  watch: {
    // tableData是el-table绑定的数据
    tableData: {
      // 解决表格显示错位问题
      handler() {
        this.$nextTick(() => {
          // tableRef是el-table绑定的ref属性值
          this.$refs.jsonTable.doLayout() // 对 Table 进行重新布局
        })
      },
      deep: true
    },
    tableHeight(val) {
      this.tableHeight =
        window.innerHeight - this.$refs.jsonTable.$el.offsetTop - 160
      // 监听窗口大小变化
      const self = this
      window.onresize = function() {
        try {
          self.tableHeight =
            window.innerHeight - self.$refs.jsonTable.$el.offsetTop - 160
        } catch (e) {
          console.warn(e)
        }
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.tableHeight =
        window.innerHeight - this.$refs.jsonTable.$el.offsetTop - 160
      // 监听窗口大小变化
      const self = this
      window.onresize = function() {
        try {
          self.tableHeight =
            window.innerHeight - self.$refs.jsonTable.$el.offsetTop - 160
        } catch (e) {
          console.warn(e)
        }
      }
    })
    // this.$refs.table.$el.offsetTop：表格距离浏览器的高度
  },
  methods: {
    // 换页的事件
    onCurrentPageChange(e) {
      this.$emit('current-change', e)
    },

    // 多选时候的相关方法
    handleSelectionChange(val) {
      this.LOG.info(['表格多选对象 --- ', val])
      const s = []
      const key = this.rowKey
      val.forEach((v) => {
        s.push(v[key])
      })
      this.LOG.info(['表格多选处理 --- ', s])
      this.selections = s
      this.selectionDoClick()
    },
    cancelSelection() {
      this.$refs.jsonTable.clearSelection()
      this.selections = []
    },
    selectionDoClick() {
      this.$emit('selection-do', this.selections)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-view-table {
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 20px 5px 20px;
  height: 100%;
  width: 100%;

  .json-table-view {
    flex: 1;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
  }

  .page {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    height: 40px;

    .common-pagination__total-pages {
      margin-left: 18px;
      color: #797979;
    }
  }
}
</style>
<style scoped>

/deep/ .el-table,
/deep/ .el-table__expanded-cell,
/deep/ .el-table th,
/deep/ .el-table tr {
  background-color: transparent;
}
</style>
