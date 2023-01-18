<template>
  <div class="container">
    <div class="align-right">
      <a-button @click="format" class="mb-10">格式化</a-button>
    </div>
    <div id="dynamicEditor" ref="editorContainer"></div>
  </div>
</template>

<script lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, watch } from "vue";
export default {
  emits: ["handleEditorChange"],
  props: {
    values: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const editorContainer = ref<any>(null);
    const editor = ref<any>(null);
    const editorTheme = ref<any>("vs-dark");
    const codeContent = ref("");
    // 获取编辑框内容
    function getCodeContext() {
      codeContent.value = toRaw(editor.value).getValue();
      return codeContent.value;
    }
    // 自动格式化代码
    function format() {
      toRaw(editor.value).trigger("json", "editor.action.formatDocument");
    }
    onMounted(() => {
      editor.value = monaco.editor.create(editorContainer.value, {
        value: props.values,
        theme: editorTheme.value, // 主题
        language: "json",
        folding: true, // 是否折叠
        foldingHighlight: true, // 折叠等高线
        foldingStrategy: "indentation", // 折叠方式  auto | indentation
        showFoldingControls: "always", // 是否一直显示折叠 always | mouseover
        disableLayerHinting: true, // 等宽优化
        emptySelectionClipboard: false, // 空选择剪切板
        selectionClipboard: false, // 选择剪切板
        automaticLayout: true, // 自动布局
        codeLens: false, // 代码镜头
        scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
        colorDecorators: true, // 颜色装饰器
        accessibilitySupport: "off", // 辅助功能支持  "auto" | "off" | "on"
        lineNumbers: "on", // 行号 取值： "on" | "off" | "relative" | "interval" | function
        lineNumbersMinChars: 5, // 行号最小字符   number
        readOnly: false, //是否只读  取值 true | false
      });
      console.log("editor.value:", editor.value);
      format();
      // 监听内容变化
      editor.value.onDidChangeModelContent((e) => {
        console.log("监听内容变化:", getCodeContext());
        emit("handleEditorChange", getCodeContext());
      });
      // 监听失去焦点事件
      editor.value.onDidBlurEditorText(() => {});
    });

    watch(()=>props.values, (newVal) => {
        toRaw(editor.value).setValue(newVal);
        format();
    },{deep:true});
    return {
      format,
      editorContainer,
    };
  },
};
</script>

<style scoped>
.container {
  margin: 20px 0;
}
#dynamicEditor {
  height: 500px;
}
.align-right {
  text-align: right;
}
.mb-10 {
  margin-bottom: 10px;
}
</style>