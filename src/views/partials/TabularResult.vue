<template>
  <div id="container1">
    <!-- detail table -->
    <div class="result-table" v-if="data && rowKeys.length">
      <h5>Details</h5>
      <div>
        <ion-row v-for="key in rowKeys" :key="key">
          <ion-col class="heading">{{key}}</ion-col>
          <ion-col class="sub-heading">{{data[key]}}</ion-col>
        </ion-row>
      </div>
    </div>
    <div class="home-btn" v-if="data && rowKeys.length">
      <ion-button href="/">
        <ion-icon :icon="arrowBack">
          <slot name="start"></slot>
        </ion-icon>
        Home Page
      </ion-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { arrowBack } from 'ionicons/icons';

export default defineComponent({
  name: 'TabularResult',
  props: [ 'jsonData' ],
  data() {
    return {
      data: this.jsonData,
      rowKeys: {},
    }
  },
  mounted: function() {
    this.rowKeys = Object.keys(this.data);
  },
  setup() {
    return {
      arrowBack
    }
  },
});
</script>

<style scoped>
h1 {
  color: #005741;
  font-size: 2em;
  font-weight: bold;
}
#container1 {
  margin-top: 0px;
}
#container1 strong {
  font-size: 20px;
  line-height: 26px;
}
#container1 p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}
#container1 a {
  text-decoration: none;
}
.cnic-input {
  border: 1px solid #dedede;
  margin-top: 16px;
  margin-bottom: 16px;
  border-radius: 5px;
}
.submit-btn {
  width: 100%;
}
.result-table {
  text-align: left;
  padding: 20px;
}
.result-table div {
  padding: 5px;
  border: 1px solid #dedede;
  border-radius: 5px;
  font-size: .85rem;
}
.heading {
  font-weight: 500;
}
.sub-heading {
  color: rgb(83, 83, 83);
}
</style>