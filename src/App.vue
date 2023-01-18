<template>
  <a-form name="sword1Form" v-bind="formItemLayout">
    <a-form-item label="项目路径" v-bind="validateInfos.projectUrl">
      <a-input v-model:value="formState.projectUrl"></a-input>
    </a-form-item>
    <a-form-item label="模块名称" v-bind="validateInfos.modelName">
      <a-input v-model:value="formState.modelName"></a-input>
    </a-form-item>
    <a-form-item label="模块路径" v-bind="validateInfos.modelPath">
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
      <a-checkbox-group v-model:value="formState.actions">
        <a-checkbox value="add" name="actions">新增</a-checkbox>
        <a-checkbox value="del" name="actions">删除</a-checkbox>
        <a-checkbox value="edit" name="actions">编辑</a-checkbox>
        <a-checkbox value="upload" name="actions">上传</a-checkbox>
        <a-checkbox value="_export" name="actions">导出</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="查询接口" v-bind="validateInfos.apis">
      <a-input v-model:value="formState.apis['Origin']"></a-input>
    </a-form-item>
    <a-form-item
      v-if="formState.actions.indexOf('add') > -1"
      label="新增接口"
      v-bind="validateInfos.apis"
    >
      <a-input v-model:value="formState.apis['Add']"></a-input>
    </a-form-item>
    <a-form-item
      v-if="formState.actions.indexOf('del') > -1"
      label="删除接口"
      v-bind="validateInfos.apis"
    >
      <a-input v-model:value="formState.apis['Del']"></a-input>
    </a-form-item>
    <a-form-item
      v-if="formState.actions.indexOf('edit') > -1"
      label="编辑接口"
      v-bind="validateInfos.apis"
    >
      <a-input v-model:value="formState.apis['Edit']"></a-input>
    </a-form-item>
    <a-form-item
      v-if="formState.actions.indexOf('upload') > -1"
      label="导入接口"
      v-bind="validateInfos.apis"
    >
      <a-input v-model:value="formState.apis['Upload']"></a-input>
    </a-form-item>
    <a-form-item
      v-if="formState.actions.indexOf('upload') > -1"
      label="下载接口"
      v-bind="validateInfos.apis"
    >
      <a-input v-model:value="formState.apis['Download']"></a-input>
    </a-form-item>
    <a-form-item
      v-if="formState.actions.indexOf('_export') > -1"
      label="导出接口"
      v-bind="validateInfos.apis"
    >
      <a-input v-model:value="formState.apis['Export']"></a-input>
    </a-form-item>
    <div class="ant-col ant-col-20" style="text-align: right">
      <a-radio-group v-model:value="fieldViewType" button-style="solid">
        <a-radio-button value="config">配置字段</a-radio-button>
        <a-radio-button value="vision">字段可视化</a-radio-button>
      </a-radio-group>
    </div>

    <a-form-item v-show="fieldViewType === 'config'" label="配置字段">
      <DynamicFieldConfig
        @handleEditorChange="handleEditorChange"
        :values="dynamicFieldString"
      />
    </a-form-item>
    <a-space
      direction="vertical"
      style="margin-left: 25%"
      v-show="fieldViewType === 'vision'"
    >
      <a-card
        :title="'Field-' + index"
        style="width: 700px"
        v-for="(item, index) in formState.dynamicFields"
        :key="item.id"
      >
        <div>
          <a-form-item
            :name="['dynamicFields', index, 'field']"
            label="field字段"
            :rules="[{ required: true, message: 'please input field' }]"
          >
            <a-input v-model:value="item.field" @change="handleInput"></a-input>
          </a-form-item>
          <a-form-item
            :name="['dynamicFields', index, 'label']"
            label="label字段"
            :rules="[{ required: true, message: 'please input field' }]"
          >
            <a-input v-model:value="item.label"></a-input>
          </a-form-item>
          <a-form-item label="component字段" :label-col="{ span: 6 }">
            <a-select
              v-model:value="item.component"
              :options="componentOptions"
            ></a-select>
          </a-form-item>
          <a-form-item label="是否搜索字段">
            <a-radio-group v-model:value="item.isSearchForm">
              <a-radio :value="true" name="actions">是</a-radio>
              <a-radio :value="false" name="actions">否</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="是否编辑字段">
            <a-radio-group v-model:value="item.isEditForm">
              <a-radio :value="true" name="actions">是</a-radio>
              <a-radio :value="false" name="actions">否</a-radio>
            </a-radio-group>
          </a-form-item>
        </div>
        <div style="text-align: right">
          <a-button
            type="primary"
            @click="
              () => {
                handleRemoveFields(item);
              }
            "
            >删除</a-button
          >
        </div>
      </a-card>
      <a-button @click="handleAddFields" block type="primary"
        ><PlusOutlined /> 新增字段</a-button
      >
    </a-space>

    <a-form-item label="store模块">
      <a-radio-group v-model:value="formState.hasStore">
        <a-radio :value="true">启用</a-radio>
        <a-radio :value="false">禁用</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="下拉字典" v-bind="validateInfos.hasDictionary">
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
    </a-form-item>

    <a-form-item
      label="项目默认接口参数"
      v-bind="validateInfos.hasProjectDefaultParam"
    >
      <a-radio-group v-model:value="formState.hasProjectDefaultParam">
        <a-radio :value="true">启用</a-radio>
        <a-radio :value="false">禁用</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click.prevent="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, ref, computed } from "vue";
import { Form } from "ant-design-vue";
import { ProjectConfigScema, DynamicFieldType } from "./types/index";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import DynamicFieldConfig from "./components/DynamicFieldConfig.vue";
import { COMPONENTS } from "./util/enum";
const useForm = Form.useForm;
export default defineComponent({
  name: "App",
  components: { MinusCircleOutlined, PlusOutlined, DynamicFieldConfig },
  setup() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    type FieldViewType = "config" | "vision";
    const fieldViewType = ref<FieldViewType>("config");
    const formState = reactive<ProjectConfigScema>({
      projectUrl: "",
      modelName: "",
      modelPath: "",
      title: "",
      actions: ["add", "edit"],
      apiFileName: "",
      addName: "",
      hasStore: false,
      hasDictionary: false,
      hasDynamicTable: false,
      hasProjectDefaultParam: true,
      apis: {
        Origin: "",
      },
      dynamicFields: [
        {
          field: "", //数据库字段
          label: "", //展示名称
          component: "Input", //组件
          isSearchForm: true, //是否是搜索表单字段
          isEditForm: true,
          id: Date.now(),
        },
      ],
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
          required: true,
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

    const { resetFields, validate, validateInfos } = useForm(
      formState,
      ruleRef,
      {
        onValidate: (...args) => console.log(...args),
      }
    );
    const onSubmit = async () => {
      const vals = await validate("dynamicFields");
      const demo =
        acquireVsCodeApi ??
        function () {
          console.log("没有acquireVsCodeApi方法");
        };
      if (typeof demo === "function") {
        const vscode = demo();
        vscode.postMessage(toRaw(formState));
      }
    };

    const handleAddFields = () => {
      formState.dynamicFields.push({
        field: "", //数据库字段
        label: "", //展示名称
        component: "Input", //组件
        isSearchForm: true, //是否是搜索表单字段
        isEditForm: true,
        id: Date.now(),
      });
    };

    const handleRemoveFields = (item: any) => {
      let index = formState.dynamicFields.indexOf(item);
      console.log("index:", index);
      if (index !== -1) {
        formState.dynamicFields.splice(index, 1);
      }
    };
    const componentOptions = ref<Array<any>>([]);
    componentOptions.value = COMPONENTS.map((item) => {
      return {
        label: item,
        value: item,
      };
    });
    const handleInput = (e) => {
      console.log("e:", e.target);
      console.log("formState:", formState);
    };
    const handleEditorChange = (val: string) => {
      console.log("handleEditorChange-val:", JSON.parse(val));
      dynamicFieldString.value = val;
    };
    return {
      fieldViewType,
      formItemLayout,
      validateInfos,
      formState,
      dynamicFieldString,
      componentOptions,
      onSubmit,
      resetFields,
      handleAddFields,
      handleRemoveFields,
      handleInput,
      handleEditorChange,
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
