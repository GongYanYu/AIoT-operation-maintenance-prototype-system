<template>
  <div class="list-view-table">
    <div class="json-table-view">
      <el-table
        ref="jsonTable"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
        element-loading-text="数据正在加载中"
        element-loading-spinner="el-icon-loading"
        :data="tableData"
        :show-header="showHeader"
        :row-key="rowKey"
        :height="height"
        :header-cell-style="headerCellStyle"
        @selection-change="handleSelectionChange"
        @row-click="rowClick"
      >
        <el-table-column class-name="tt-sequence" align="center"
                         type="index" label="序号" width="50" v-if="isShowSerialNumber"
        ></el-table-column>

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
          type="index"
          v-if="indexModel"
          align="center"
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
          :show-overflow-tooltip="!(col.overflowTooltip === 'notShow')"
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
import resize from '@/mixins/resize'
import LOG from '@/utils/self-log'

export default {
  name: 'TransparentTable',
  mixins:[resize],
  props: {
    //显示序号？
    isShowSerialNumber:{
      type: Boolean,
      default:true
    },
    //高度
    height: {
      type: Number,
      default: 420
    },
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
          color: 'white',
          height: '40px',
          borderBottom: ' 1px solid  rgba(255, 255, 255,0.2)'
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
    },
    rowClick(row, column, e) {
      LOG.info(['--' + JSON.stringify(row)])
      this.$emit('rowClick', row)
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
  padding: 0;
  color: white;
}
/*hover*/
/deep/ .el-table .el-table__body tr.current-row > td {
  background-color: #0D1F34 !important;
  padding-top: 0;
}

/deep/ .el-table .el-table__body tr:hover > td {
  background-color: #0D1F34 !important;
}
/*el-table组件去掉滚动条*/
/deep/ .el-table__body-wrapper::-webkit-scrollbar {
  width: 0;
}

>>> .tt-sequence {
  color: rgba(255, 255, 255, 0.6);
}

>>> .el-table td.el-table__cell {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/*去除底部横线*/
>>> .el-table::before {
  height: 0;
}

>>> .el-table__header,.el-table__body{
  width: 100%;
}
</style>
