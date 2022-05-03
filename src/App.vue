<script>
import "./components/NavBar.vue";
import NavBar from "./components/NavBar.vue";
import AssetIntro from "./components/AssetIntro.vue";
import Table from "./components/Table.vue";

export default {
  name: "App",
  components: {
    Table: Table,
    NavBar: NavBar,
    AssetIntro: AssetIntro,
  },

  setup() {
    //An array of values for the data
    const assetData = [
      {
        value: "domain.com",
        type: "domain",
        detectedOn: "2022-04-23T03:00",
        lastScan: "2022-04-30T00:00",
        lastVisit: "2022-05-01T00:00",
        risks: [
          {
            ["Risk type"]: "Risk name",
            ["Risk status"]: "Open",
            ["Risk lifetime"]: "2022-07-02T09:00",
            ["Detected on"]: "2022-05-01T09:30",
            age: "17",
            type: "Critical",
          },
          {
            ["Risk type"]: "Risk name",
            ["Risk status"]: "Processing",
            ["Risk lifetime"]: "2022-05-23T23:00",
            ["Detected on"]: "2022-04-30T00:00",
            age: "17",
            type: "High",
          },
          {
            ["Risk type"]: "Risk name",
            ["Risk status"]: "Open",
            ["Risk lifetime"]: "2022-05-02T23:00",
            ["Detected on"]: "2022-05-02T13:10",
            age: "17",
            type: "Medium",
          },

          {
            ["Risk type"]: "Risk name",
            ["Risk status"]: "Processing",
            ["Risk lifetime"]: "2022-05-02T23:00",
            ["Detected on"]: "2022-01-11T00:00",
            age: "17",
            type: "Low",
          },
        ],
      },
    ];
    const fields = ["Risk type", "Risk status", "Risk lifetime", "Detected on"];
    return { assetData, fields };
  },

  methods: {
    getTotalRisk() {
      if (this.assetData) {
        return this.assetData.risks.length;
      }

      return 0;
    },

    countRiskType() {
      let critical = 0,
        high = 0,
        medium = 0,
        low = 0;

      if (this.assetData.risks) {
        for (let index = 0; index < this.assetData.risks.length; index++) {
          if (this.assetData.risks[index].type === "Critical") {
            critical++;
          } else if (this.assetData.risks[index].type === "High") {
            high++;
          } else if (this.assetData.risks[index].type === "Medium") {
            medium++;
          } else {
            low++;
          }
        }
      }

      return { critical, high, medium, low };
    },
  },
  computed: {},
};
</script>

<template>
  <NavBar></NavBar>
  <div class="container">
    <header>
      <AssetIntro :assetData="assetData[0]"></AssetIntro>
    </header>
    <main>
      <Table :fields="fields" :riskData="assetData[0].risks"></Table>
    </main>
  </div>
</template>

<style>
#app {
  font-weight: normal;
  font-family: "Outfit";
}

body {
  background-color: #e5e5e5 !important;
}
</style>
