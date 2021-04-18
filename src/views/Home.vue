<template>
  <div class="home">
    <img alt="angery alyx" src="../assets/angery.png" />
    <Header msg="Alyxia Sother" />
    <Content />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "@/components/Header.vue"; // @ is an alias to /src
import Content from "@/components/Content.vue";

@Options({
  components: {
    Header,
    Content,
  },
})
export default class Home extends Vue {}
</script>
