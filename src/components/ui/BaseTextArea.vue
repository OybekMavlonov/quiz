<template>
  <div>
    <label class="block mb-2 text-sm font-medium text-grey-700">{{
        label
      }}</label>
    <Field
        :name="name"
        :modelValue="modelValue"
        v-slot="{ errors, field }"
        :rules="rules"
    >
      <div class="relative w-full mb-1">
        <textarea
            rows="4"
            :type="type"
            :placeholder="placeholder"
            @input="onInput"
            v-model="modelValue"
            v-bind="field"
            class="bg-grey-300 border border-grey-700 text-grey-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5 pl-3"
        />
      </div>
      <div class="h-3 mb-2">
        <transition name="fade">
          <span v-if="errors[0]" class="text-red-600 block text-sm">{{
              errors[0]
            }}</span>
        </transition>
      </div>
    </Field>
  </div>
</template>

<script setup>
import { Field } from "vee-validate";

defineProps({
  label: String,
  type: String,
  placeholder: String,
  name: {
    type: String,
    default: "text",
  },
  rules: String,
  modelValue: String,
});

const emits = defineEmits(["update:modelValue", "onClear"]);

const onInput = (val) => {
  emits("update:modelValue", val.target.value);
};
function clearField(val) {
  emits("onClear", val);
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
