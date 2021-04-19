<template>
  <div class="about">
    <h1>About me</h1>
    <div v-html="content"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import content from "@/assets/about.md";

@Options({
  name: "about",
  data() {
    return {
      content,
    };
  },
})
export default class About extends Vue {}
</script>
