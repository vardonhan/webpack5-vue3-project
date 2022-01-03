<template>
  <img :src="require('@/assets/img/images.jpeg')" alt="pic" width="112">
  <h1 class="title">Hi~</h1>
  <div class="name">{{ name }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  // 已启用类型推断
  data(): {[key: string]: any} {
    return {
      name: 'Jupiter',
    };
  },
});
</script>

<style lang="scss" scoped>
.base {
  padding: 15px;
  color: #0074ff;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  user-select: none;
}
.title {
  @extend .base;
  font-size: 24px;
}
.name {
  @extend .base;
  font-size: 16px;
}
</style>