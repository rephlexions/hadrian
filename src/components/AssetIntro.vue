<script>
import moment from "moment";

export default {
  name: "AssetIntro",
  props: {
    assetData: {
      type: Object,
    },
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
  },
  computed: {
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
};
</script>

<template>
  <div id="asset-intro">
    <div class="col-md-12 d-flex">
      <h1>Asset detail</h1>
      <div id="breadcrumb" class="ms-auto p-2 bd-highlight">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Assets</a></li>
            <li class="breadcrumb-item active" aria-current="page">
              Asset Details
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-lg-8 mb-2">
        <div class="card">
          <div class="card-body d-flex and flex-column">
            <h5 class="card-title">General information</h5>
            <div class="row card-content">
              <div class="col-8">
                <div class="row">
                  <div class="info-left-pane col-4">
                    <p>Asset value</p>
                    <p>Asset type</p>
                    <p>Detected on</p>
                    <p>Last scan</p>
                    <p>Last visit</p>
                  </div>
                  <div class="info-right-pane col-4">
                    <p>{{ assetData.value }}</p>
                    <p>{{ assetData.type }}</p>
                    <p>
                      {{ formatDate(assetData.detectedOn) }}
                    </p>
                    <p>
                      {{ formatDate(assetData.lastScan) }}
                    </p>
                    <p>
                      {{ formatDate(assetData.lastVisit) }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-4 risk-stats">
                <h5>{{ getTotalRisk }} unresolved risks</h5>
                <div class="risk-count row">
                  <div class="col-6">
                    <p>{{ countRiskType.critical }} total</p>
                  </div>
                  <div class="col-6">
                    <span class="badge bg-critical text-dark">Critical</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <p>{{ countRiskType.high }} total</p>
                  </div>
                  <div class="col-6">
                    <span class="badge bg-high text-dark">High</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <p>{{ countRiskType.medium }} total</p>
                  </div>
                  <div class="col-6">
                    <span class="badge bg-medium text-dark">Medium</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <p>{{ countRiskType.low }} total</p>
                  </div>
                  <div class="col-6">
                    <span class="badge bg-low text-dark">Low</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-lg-4 mb-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Screenshot</h5>
            <img
              id="general-info-screen"
              src="../assets/screenshot.png"
              class="img-fluid"
              alt="..."
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#asset-intro {
  margin-top: 5em;
}

h1 {
  left: 1px;
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 35px;
  font-family: "Outfit";
}

#breadcrumb {
  font-family: "Outfit";
  font-style: normal;
}

.breadcrumb-item > a {
  color: #7d7f93;
}

.breadcrumb-item .active {
  font-weight: bold;
}

.asset-general-info {
  border-style: solid;
  border-color: white;
  background-color: white;
}
.badge {
  border-radius: 17.5px !important;
}

.risk-count {
  margin-top: 24px !important;
}

.asset-general-info .info-left-pane {
  font-size: 15px;
}
.info-left-pane {
  font-weight: 600;
}
.card-title {
  font-weight: 600;
}
.info-right-pane {
  font-weight: 400;
  font-size: 15px;
}
.risk-stats > h5 {
  font-weight: 600;
}

.risk-stats {
  border: 1px solid rgba(162, 188, 254, 0.2);
  box-sizing: border-box;
  border-radius: 4px;
}

.card-content {
  border-top: 1px solid rgba(162, 188, 254, 0.2);
  box-sizing: border-box;
  border-radius: 4px;
  padding-top: 1em;
}
.bg-critical {
  background-color: #ff5151 !important;
}
.bg-high {
  background-color: #ff8f51;
}

.bg-medium {
  background-color: #ffce51;
}
.bg-low {
  background-color: #8cc777;
}

.card {
  height: 100% !important;
}
</style>
