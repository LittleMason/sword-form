<template>
  <a-form name="sword1Form" v-bind="formItemLayout">
    <a-form-item v-bind="validateInfos.projectUrl">
      <template #label>
        <span>
          项目路径
          <a-popover>
            <template #content>
              This field is what project you want build of path, <br />
              This plugin will automatically select current workspace path
            </template>
            <question-circle-outlined :style="{ fontSize: '18px' }" />
          </a-popover>
        </span>
      </template>
      <a-input v-model:value="formState.projectUrl"></a-input>
    </a-form-item>
    <a-form-item v-bind="validateInfos.modelName">
      <template #label>
        <span>
          模块名称
          <a-popover>
            <template #content>
              This field is what business module you want build, <br />
              it will be generate at folder of 'views','api' eg of below
            </template>
            <question-circle-outlined :style="{ fontSize: '18px' }" />
          </a-popover>
        </span>
      </template>
      <a-input v-model:value="formState.modelName"></a-input>
    </a-form-item>
    <a-form-item v-bind="validateInfos.modelPath">
      <template #label>
        <span>
          模块路径
          <a-popover>
            <template #content>
              This field is generated business module of path, <br />
              plugin will automatically add prefix of till current project's 'views'
              folder for this field,include end of symbol '/'<br />
              so you just like input follow: [fatherPath]*/moduleName
              <span style="color: red">(don't need '/' in the began)</span>
            </template>
            <question-circle-outlined :style="{ fontSize: '18px' }" />
          </a-popover>
        </span>
      </template>
      <a-input v-model:value="formState.modelPath"></a-input>
    </a-form-item>
    <a-form-item label="表格名称" v-bind="validateInfos.title">
      <a-input v-model:value="formState.title"></a-input>
    </a-form-item>
    <a-form-item label="新增按钮名称" v-bind="validateInfos.addName">
      <a-input v-model:value="formState.addName"></a-input>
    </a-form-item>
    <a-form-item label="接口文件名称" v-bind="validateInfos.apiFileName">
      <a-input v-model:value="formState.apiFileName"></a-input>
    </a-form-item>
    <a-form-item label="操作启用" v-bind="validateInfos.actions">
      <a-checkbox-group v-model:value="formState.actions" @change="handleActions">
        <a-checkbox value="add" name="actions">新增</a-checkbox>
        <a-checkbox value="del" name="actions">删除</a-checkbox>
        <a-checkbox value="edit" name="actions">编辑</a-checkbox>
        <a-checkbox value="upload" name="actions">上传</a-checkbox>
        <a-checkbox value="_export" name="actions">导出</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="查询接口" v-bind="validateInfos['apis.Origin']">
      <a-input v-model:value="formState.apis['Origin']"></a-input>
    </a-form-item>
    <a-form-item
      v-if="formState.actions.indexOf('add') > -1"
      label="新增接口"
      v-bind="validateInfos['apis.Add']"
    >
      <a-input v-model:value="formState.apis['Add']"></a-input>
    </a-form-item>
    <a-form-item
      v-if="formState.actions.indexOf('del') > -1"
      label="删除接口"
      v-bind="validateInfos['apis.Del']"
    >
      <a-input v-model:value="formState.apis['Del']"></a-input>
    </a-form-item>
    <a-form-item
      v-if="formState.actions.indexOf('edit') > -1"
      label="编辑接口"
      v-bind="validateInfos['apis.Edit']"
    >
      <a-input v-model:value="formState.apis['Edit']"></a-input>
    </a-form-item>
    <a-form-item
      v-if="formState.actions.indexOf('upload') > -1"
      label="导入接口"
      v-bind="validateInfos['apis.Upload']"
    >
      <a-input v-model:value="formState.apis['Upload']"></a-input>
    </a-form-item>
    <a-form-item
      v-if="formState.actions.indexOf('upload') > -1"
      label="下载接口"
      v-bind="validateInfos['apis.Download']"
    >
      <a-input v-model:value="formState.apis['Download']"></a-input>
    </a-form-item>
    <a-form-item
      v-if="formState.actions.indexOf('_export') > -1"
      label="导出接口"
      v-bind="validateInfos['apis.Export']"
    >
      <a-input v-model:value="formState.apis['Export']"></a-input>
    </a-form-item>
    <div class="ant-col ant-col-20" style="text-align: right">
      <a-button type="primary" @click="handleAddField">新增字段</a-button>
    </div>

    <a-form-item label="配置字段">
      <a-table
        :columns="columns"
        :data-source="formState.dynamicFields"
        :scroll="{ x: 600, y: 300 }"
        @resizeColumn="handleResizeColumn"
        :pagination="{defaultPageSize:1000}"
      >
        <template #bodyCell="{ column, text, record, index }">
          <template v-if="column.dataIndex === 'actions'">
            <a @click="handleDeleteRow(record.id)">删除</a>
          </template>
          <template v-else-if="column.dataIndex === 'component'">
            <a-select
              show-search
              :options="componentOptions"
              @change="
                (val) => {
                  handleChangeDynamicField(val, column.dataIndex, record.id);
                }
              "
              v-model:value="formState.dynamicFields[index][column.dataIndex]"
            >
            </a-select>
          </template>
          <template
            v-else-if="
              ['isSearchForm', 'isEditForm', 'required'].includes(column.dataIndex)
            "
          >
            <a-select
              :options="shifouOptions"
              @change="
                (val) => {
                  handleChangeDynamicField(val, column.dataIndex, record.id);
                }
              "
              v-model:value="formState.dynamicFields[index][column.dataIndex]"
            >
            </a-select>
          </template>
          <template v-else-if="column.dataIndex === 'xuhao'">
            <span>{{ index + 1 }}</span>
          </template>
          <template v-else-if="column.dataIndex != 'id'">
            <a-input
              v-model:value="formState.dynamicFields[index][column.dataIndex]"
              @change="
                (e) => {
                  handleChangeDynamicField(e.target.value, column.dataIndex, record.id);
                }
              "
            />
          </template>
        </template>
      </a-table>
    </a-form-item>

    <a-form-item label="store模块">
      <a-radio-group v-model:value="formState.hasStore">
        <a-radio :value="true">启用</a-radio>
        <a-radio :value="false">禁用</a-radio>
      </a-radio-group>
    </a-form-item>
    <!-- <a-form-item label="下拉字典" v-bind="validateInfos.hasDictionary">
      <a-radio-group v-model:value="formState.hasDictionary">
        <a-radio :value="true">启用</a-radio>
        <a-radio :value="false">禁用</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="动态表格组件" v-bind="validateInfos.hasDynamicTable">
      <a-radio-group v-model:value="formState.hasDynamicTable">
        <a-radio :value="true">启用</a-radio>
        <a-radio :value="false">禁用</a-radio>
      </a-radio-group>
    </a-form-item> -->

    <a-form-item label="项目默认接口参数" v-bind="validateInfos.hasProjectDefaultParam">
      <a-radio-group v-model:value="formState.hasProjectDefaultParam">
        <a-radio :value="true">启用</a-radio>
        <a-radio :value="false">禁用</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item :colon="false">
      <template #label>
        <span style="color: white">按钮</span>
      </template>
      <div style="text-align: right">
        <a-button type="primary" @click.prevent="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
      </div>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, ref, computed, onMounted } from "vue";
import { Form } from "ant-design-vue";
import { ProjectConfigScema, DynamicFieldType } from "./types/index";
import {
  MinusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons-vue";
import { COMPONENTS } from "./util/enum";
import { basicColumns } from "./data";
const useForm = Form.useForm;
export default defineComponent({
  name: "App",
  components: { MinusCircleOutlined, PlusOutlined, QuestionCircleOutlined },
  setup() {
    const isSimpleSearch = ref(false); //是否为纯查询界面
    const initColumns = basicColumns.filter((item) => {
      return ["是否必填", "编辑字段"].indexOf(item.title) === -1;
    });
    const dynamicColumns = ref<Array<any>>(initColumns); //动态columns
    //form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const defaultField: DynamicFieldType = {
      field: "", //数据库字段
      formField: "",
      label: "", //展示名称
      component: "Input", //组件
      isSearchForm: 1, //是否是搜索表单字段
      isEditForm: 1,
      required: 1,
      width: 100,
      id: Date.now(),
    };
    const formState = reactive<ProjectConfigScema>({
      projectUrl: "",
      modelName: "",
      modelPath: "",
      title: "",
      actions: [],
      apiFileName: "",
      addName: "",
      hasStore: false,
      hasDictionary: false,
      hasDynamicTable: false,
      hasProjectDefaultParam: true,
      apis: {
        Origin: "",
      },
      dynamicFields: [{ ...defaultField }],
    });
    const ruleRef = reactive({
      projectUrl: [
        {
          required: true,
          message: "Please input projectUrl",
        },
      ],
      modelName: [
        {
          required: true,
          message: "Please input modelName",
        },
      ],
      modelPath: [
        {
          required: true,
          message: "Please input modelPath",
        },
      ],
      actions: [
        {
          required: false,
          message: "Please select actions",
        },
      ],
      title: [
        {
          required: true,
          message: "Please input title",
        },
      ],
      apiFileName: [
        {
          required: false,
          message: "Please input apiFileName",
        },
      ],
      addName: [
        {
          required: false,
          message: "Please input addName",
        },
      ],
      dynamicFields: [
        {
          required: true,
        },
      ],
      "apis.Origin": [
        {
          required: true,
          mesaage: "Please input this input",
        },
      ],
      "apis.Add": [
        {
          required: true,
          mesaage: "Please input this input",
        },
      ],
      "apis.Edit": [
        {
          required: true,
          mesaage: "Please input this input",
        },
      ],
      "apis.Upload": [
        {
          required: true,
          mesaage: "Please input this input",
        },
      ],
      "apis.Del": [
        {
          required: true,
          mesaage: "Please input this input",
        },
      ],
      "apis.Export": [
        {
          required: true,
          mesaage: "Please input this input",
        },
      ],
      "apis.Download": [
        {
          required: true,
          mesaage: "Please input this input",
        },
      ],
    });
    const dynamicFieldString = computed({
      get() {
        return JSON.stringify(formState.dynamicFields);
      },
      set(val: string) {
        const noSpace = val.replace(/\s*/g, "");
        formState.dynamicFields = JSON.parse(noSpace);
      },
    });

    const { resetFields, validate, validateInfos } = useForm(formState, ruleRef);

    const vscodeInterface =
      window.acquireVsCodeApi ??
      function () {
        console.log("没有acquireVsCodeApi方法");
      };
    const vscode = vscodeInterface();
    const onSubmit = async () => {
      
      await validate();
      if(isSimpleSearch){
        formState.dynamicFields =formState.dynamicFields.map(item=>{
          return {...item,isEditForm:0,required:0}
        })
      }
      console.log("formState:", formState);
      if (typeof vscodeInterface === "function") {
        vscode.postMessage(toRaw(formState));
      }
    };
    // watch vscode postMessage
    onMounted(() => {
      window.addEventListener("message", (event) => {
        const receiveDatas = event.data;
        formState.projectUrl = receiveDatas["rootPath"];
      });
    });

    //table
    const componentOptions = ref<Array<any>>([]);
    componentOptions.value = COMPONENTS.map((item) => {
      return {
        label: item,
        value: item,
      };
    });
    const shifouOptions = [
      {
        label: "是",
        value: 1,
      },
      {
        label: "否",
        value: 0,
      },
    ];
    const handleAddField = () => {
      formState.dynamicFields.push({
        ...defaultField,
        id: Date.now(),
      });
    };

    const handleDeleteRow = (id) => {
      let inx: any = 0;
      for (let x in formState.dynamicFields) {
        if (formState.dynamicFields[x].id === id) {
          inx = x;
        }
      }
      formState.dynamicFields.splice(inx, 1);
    };
    const handleChangeDynamicField = (val, key, id) => {
      for (let x in formState.dynamicFields) {
        if (id === formState.dynamicFields[x].id) {
          formState.dynamicFields[x][key] = val;
        }
      }
    };

    const handleActions = (val) => {
      if (val.length) {
        isSimpleSearch.value = true;
        dynamicColumns.value = basicColumns;
      } else {
        isSimpleSearch.value = false;
        dynamicColumns.value = dynamicColumns.value.filter((item) => {
          return ["是否必填", "编辑字段"].indexOf(item.title) === -1;
        });
      }
    };

    return {
      formItemLayout,
      validateInfos,
      formState,
      dynamicFieldString,
      componentOptions,
      shifouOptions,
      columns: dynamicColumns,
      onSubmit,
      resetFields,
      handleAddField,
      handleDeleteRow,
      handleChangeDynamicField,
      handleActions,
      handleResizeColumn: (w, col) => {
        col.width = w;
      },
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  padding-bottom: 60px;
}
</style>
