<template>
  <fs-page>
    <a-card title="直接显示表单">
      <fs-form ref="formRef" v-bind="formOptions" />
      <div style="margin-top: 10px">
        <a-button @click="formSubmit">提交表单</a-button>
        <a-button @click="formReset">重置表单</a-button>
        <a-button class="ml-10" @click="setFormDataTest">setFormData</a-button>
      </div>
    </a-card>
  </fs-page>
</template>

<script>
import {computed, defineComponent, ref} from "vue";
import { message } from "ant-design-vue";
import { useCrud, useExpose, useColumns } from "@fast-crud/fast-crud";

function createFormOptions() {
  // 自定义表单配置
  const { buildFormOptions } = useColumns();
  //使用crudOptions结构来构建自定义表单配置
  return buildFormOptions({
    columns: {
      customField: {
        title: "新表单字段",
        form: {
          component: {
            name: "a-input",
            vModel: "value",
            allowClear: true,
            // formOptions 为ref，里面如果有计算属性的话 eachDeep 将会死循环遍历
            disabled: computed(()=> {
              return true
            })
          },
          valueBuilder(context) {
            console.log("value builder :", context);
          },
          rules: [{ required: true, message: "此项必填" }]
        }
      },
      groupField: {
        title: "分组字段",
        form: {
          component: {
            name: "a-input",
            vModel: "value",
            allowClear: true
          },
          rules: [{ required: true, message: "此项必填" }]
        }
      }
    },
    form: {
      labelCol: { span: 6 },
      group: {
        groups: {
          testGroupName: {
            header: "分组测试",
            columns: ["groupField"]
          }
        }
      },
      doSubmit({ form }) {
        console.log("form submit:", form);
        message.info("自定义表单提交:" + JSON.stringify(form));
        message.success("保存成功");
      }
    }
  });
}
/**
 * 表单直接独立使用
 * */
function useFormDirect() {
  const formRef = ref();
  const formOptions = ref();
  formOptions.value = createFormOptions();
  function formSubmit() {
    formRef.value.submit();
  }
  function setFormDataTest() {
    formRef.value.setFormData({
      customField: "test"
    });
  }
  function formReset() {
    formRef.value.reset();
  }
  return {
    formOptions,
    formRef,
    formSubmit,
    formReset,
    setFormDataTest
  };
}


export default defineComponent({
  name: "FormIndependent",
  setup() {
    return {
      ...useFormDirect()
    };
  }
});
</script>
