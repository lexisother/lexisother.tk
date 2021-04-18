<template>
  <div class="about">
    <h1>About me</h1>
    <vue-marked :source="content"></vue-marked>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Markdown from "@hrwg/vue-marked";

@Options({
  name: "about",
  components: {
    "vue-marked": Markdown,
  },
  data() {
    const content = process.env.ABOUT_CONTENT;
    return {
      content,
    };
  },
})
export default class About extends Vue {}
</script>
