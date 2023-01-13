export type ComponentType =
  | 'Input'
  | 'InputGroup'
  | 'InputPassword'
  | 'InputSearch'
  | 'InputTextArea'
  | 'InputNumber'
  | 'InputCountDown'
  | 'Select'
  | 'ApiSelect'
  | 'TreeSelect'
  | 'ApiTree'
  | 'ApiTreeSelect'
  | 'ApiRadioGroup'
  | 'RadioButtonGroup'
  | 'RadioGroup'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'AutoComplete'
  | 'ApiCascader'
  | 'Cascader'
  | 'DatePicker'
  | 'MonthPicker'
  | 'RangePicker'
  | 'WeekPicker'
  | 'TimePicker'
  | 'Switch'
  | 'StrengthMeter'
  | 'Upload'
  | 'IconPicker'
  | 'Render'
  | 'Slider'
  | 'Rate'
  | 'Divider'
  | 'ApiTransfer';

export type ActionsType = 'add' | 'del' | 'edit' | 'upload' | '_export';

export type ApiType = {
    Origin:string;
    Add?:string; //新增接口
    Del?:string; //删除接口
    Edit?:string; //编辑接口
    Upload?:string; //上传接口
    Download?:string; //下载接口
    Export?:string; //导出接口
}

export type DynamicFieldType = {
    field:string; //数据库字段
    label:string; //展示名称
    component:ComponentType; //组件
    isSearchForm:boolean; //是否是搜索表单字段
    isEditForm:boolean; //是否是编辑表单字段
    id:any;
}


export interface ProjectConfigScema {
  //项目地址
  projectUrl: string;
  modelName: string;
  modelPath: string;
  title: string;
  actions: ActionsType[];
  apiFileName: string;
  addName: string;
  hasStore: boolean;
  hasDictionary: boolean;
  hasDynamicTable: boolean;
  hasProjectDefaultParam: boolean;
  apis: ApiType;
  dynamicFields:DynamicFieldType[]
}
