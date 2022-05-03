<script>
import moment from "moment";
import { computed, ref } from "vue";
import { sortBy } from "lodash";

export default {
  name: "TableComponent",
  props: {
    riskData: {
      type: Array,
    },
    fields: {
      type: Array,
    },
  },
  methods: {
    formatLifeTimeDate(date) {
      return moment(date).fromNow();
    },
    formatDetectionDate(date) {
      return moment(date).calendar(null, {
        sameDay: "[Today] HH:mm:ss",
        lastDay: "[Yesterday] HH:mm:ss",
        lastWeek: "DD/MM/YYYY",
        sameElse: "DD/MM/YYYY",
      });
    },
    getTotalRisk() {
      if (this.riskData) {
        return this.riskData.length;
      }

      return 0;
    },

    searchQuery() {},

    countRiskType() {
      let critical = 0,
        high = 0,
        medium = 0,
        low = 0;

      if (this.riskData) {
        for (let index = 0; index < this.riskData.length; index++) {
          if (this.riskData[index].type === "Critical") {
            critical++;
          } else if (this.riskData[index].type === "High") {
            high++;
          } else if (this.riskData[index].type === "Medium") {
            medium++;
          } else {
            low++;
          }
        }
      }

      return { critical, high, medium, low };
    },
  },

  setup(props) {
    let sort = ref(false);
    let updatedList = ref([]);
    let searchQuery = ref("");

    const sortTable = (col) => {
      sort.value = true;

      updatedList.value = sortBy(props.riskData, col);
    };

    const sortedList = computed(() => {
      if (sort.value) {
        return updatedList.value;
      } else {
        return props.riskData;
      }
    });

    const filteredList = computed(() => {
      return sortedList.value.filter((risk) => {
        return (
          risk["Risk type"]
            .toLowerCase()
            .indexOf(searchQuery.value.toLowerCase()) != -1
        );
      });
    });

    return { sortedList, sortTable, searchQuery, filteredList };
  },
};
</script>
<template>
  <div id="tableComponent" class="mt-3">
    <div id="tableHeader" class="d-flex bd-highlight mb-3">
      <span
        class="align-self-center"
        style="
          margin-left: 0.5em;
          margin-right: 1em;
          font-weight: 600;
          font-size: 20px;
        "
        >Risks <span style="color: #7d7f93">({{ getTotalRisk() }})</span></span
      >
      <div class="me-auto p-2 bd-highlight">
        <div class="row">
          <div class="input-group">
            <input
              class="form-control py-2 border-left-0 border"
              type="search"
              placeholder="Search..."
              v-model="searchQuery"
              id="search-input"
            />
          </div>
        </div>
      </div>
      <div class="p-2 bd-highlight">
        <button type="button" class="btn">
          <i class="bi bi-sort-down-alt"></i> Sort
        </button>
      </div>
      <div class="p-2 bd-highlight">
        <button type="button" class="btn">
          <i class="bi bi-filter"></i> Filter
        </button>
      </div>
      <div id="dropdown" class="p-2 bd-highlight">
        <span class="">per page</span>
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            50
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><a class="dropdown-item" href="#">100</a></li>
            <li><a class="dropdown-item" href="#">150</a></li>
          </ul>
        </div>
      </div>
      <div class="p-2 bd-highlight">
        <button type="button" class="btn">
          <i class="bi bi-list"></i>
        </button>
      </div>
      <div class="p-2 bd-highlight">
        <button type="button" class="btn">
          <i class="bi bi-grid-3x3-gap"></i>
        </button>
      </div>
    </div>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th
            scope="row"
            v-for="field in fields"
            :key="field"
            @click="sortTable(field)"
          >
            {{ field }}
            <button type="button" class="btn">
              <i class="bi bi-sort-alpha-down"></i>
            </button>
          </th>
          <th>
            <i class="bi bi-pencil-fill"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredList" :key="item">
          <td v-for="field in fields" :key="field">
            <div v-if="field === 'Risk type' && item.type === 'Critical'">
              <i class="bi bi-hexagon-fill"></i>
            </div>
            <div v-else-if="field === 'Risk type' && item.type === 'High'">
              <i class="bi bi-pentagon-fill"></i>
            </div>
            <div v-else-if="field === 'Risk type' && item.type === 'Medium'">
              <i class="bi bi-square-fill"></i>
            </div>
            <div v-else-if="field === 'Risk type' && item.type === 'Low'">
              <i class="bi bi-triangle-fill"></i>
            </div>
            <div v-if="field === 'Risk lifetime'">
              {{ formatLifeTimeDate(item[field]) }}
            </div>
            <div v-else-if="field === 'Detected on'">
              {{ formatDetectionDate(item[field]) }}
            </div>
            <div v-else>{{ item[field] }}</div>
          </td>
          <td><i class="bi bi-chevron-right"></i></td>
        </tr>
      </tbody>
    </table>
    <div id="tableFooter" class="d-flex bd-highlight mb-3">
      <div class="me-auto p-2 bd-highlight">
        <div>
          <span style="margin-left: 0.5em"
            >{{ getTotalRisk() }} total risks/
          </span>
          <span
            ><i class="bi bi-hexagon-fill"></i
            >{{ countRiskType().critical }} critical</span
          >
          <span
            ><i class="bi bi-pentagon-fill"></i
            >{{ countRiskType().high }} high</span
          >
          <span
            ><i class="bi bi-square-fill"></i
            >{{ countRiskType().medium }} medium</span
          >
          <span
            ><i class="bi bi-triangle-fill"></i
            >{{ countRiskType().low }} low</span
          >
        </div>
      </div>
      <div class="p-2 bd-highlight">
        <nav class="" aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1">Previous</a>
            </li>
            <li class="page-item">
              <a style="color: black" class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
              <a style="color: black" class="page-link" href="#" tabindex="1"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<style scoped>
.table-striped > tbody > tr:nth-child(2n + 1) > td,
.table-striped > tbody > tr:nth-child(2n + 1) > th {
  background-color: #fbfbfb;
}

thead {
  background: rgba(252, 111, 128, 0.2);
}

#tableComponent {
  background-color: white;
}

#dropdown > * {
  display: inline-block;
}

i {
  font-size: 1.1em !important;
}

.bi-hexagon-fill {
  color: #ff5151;
}
.bi-pentagon-fill {
  color: #ff8f51;
}

.bi-square-fill {
  color: #ffce51;
}

.bi-triangle-fill {
  color: #8cc777;
}

td > div {
  display: inline-block !important;
  margin-right: 1em;
}

.has-search .form-control-feedback {
  position: absolute !important;
  z-index: 2;
  display: block;

  pointer-events: none;
  color: #aaa;
}

#tableFooter > div > div > span {
  margin-right: 0.6em;
  color: #7d7f93;
}
#tableFooter > div > div > span > i {
  margin-right: 0.5em;
}
</style>
