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
        <input
            :disabled="disabled"
            :type="type"
            :placeholder="placeholder"
            @input="onInput"
            v-model="modelValue"
            v-bind="field"
            class="bg-grey-300 border border-grey-700 text-grey-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5 pl-3"
        />
        <div
            class="flex absolute inset-y-0 right-0 items-center pr-3 cursor-pointer"
            @click="clearField(name)"
        >
          <svg
              class="w-5 h-5 text-black-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
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
  name: {
    type: String,
    default: "text",
  },
  placeholder: String,
  rules: String,
  modelValue: String,
  labelClass: String,
  disabled: Boolean,
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
