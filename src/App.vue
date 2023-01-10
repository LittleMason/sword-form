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
      <a-button @click="handleAddFields">新增字段</a-button>
    </div>
    <a-space direction="vertical" style="margin-left: 25%">
      <a-card
        :title="'Field-' + index"
        style="width: 300px"
        v-for="(item, index) in formState.dynamicFields"
        :key="index"
      >
        <div><a-input v-model="formState.dynamicFields[index].field"></a-input></div>
        <p>Card content</p>
        <MinusCircleOutlined @click="handleRemoveFields(item)" />
      </a-card>
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
import { defineComponent, reactive, toRaw } from "vue";
import { Form } from "ant-design-vue";
import { ProjectConfigScema,DynamicFieldType } from "./types/index";
import { MinusCircleOutlined } from '@ant-design/icons-vue';
const useForm = Form.useForm;
export default defineComponent({
  name: "App",
  components:{MinusCircleOutlined},
  setup() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
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
      dynamicFields: [],
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
    });
    const { resetFields, validate, validateInfos } = useForm(
      formState,
      ruleRef,
      {
        onValidate: (...args) => console.log(...args),
      }
    );
    const onSubmit = async () => {
      const vals = await validate();
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
        isSearchForm: false, //是否是搜索表单字段
      });
    };

    const handleRemoveFields = (item:DynamicFieldType) => {
      const index = formState.dynamicFields.indexOf(item);
      if (index !== -1) {
        formState.dynamicFields.splice(index, 1);
      }
    };
    return {
      formItemLayout,
      validateInfos,
      formState,
      onSubmit,
      resetFields,
      handleAddFields,
      handleRemoveFields
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
