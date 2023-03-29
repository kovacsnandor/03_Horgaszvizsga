
<template>
  <div>
    <h1>Hal könyv</h1>

    <div class="accordion accordion-flush" id="accordionFlushExample">

      <!-- accordion temlate -->
      <div class="accordion-item"  v-for="(hal, index) in halak" :key="index">
        <h2 class="accordion-header" :id="`flush-heading${index}`">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#flush-collapse${index}`"
            aria-expanded="false"
            :aria-controls="`flush-collapse${index}`"
            
          >
            <h2 v-html="`${hal.FejezetSzam}.  ${keresJelol(hal.FejezetCim)}`"></h2>
          </button>
        </h2>
        <div
          :id="`flush-collapse${index}`"
          class="accordion-collapse collapse"
          :aria-labelledby="`flush-heading${index}`"
          data-bs-parent="#accordionFlushExample"
        >

          <div class="accordion-body">

            <table class="table table-success" v-if="hal.KepFile">
              <thead>
                <tr>
                  <th>Méret</th>
                  <th>Súly</th>
                  <th>Tilalmi időszak</th>
                  <th>Méret korlát</th>
                  <th>Darab korlátos</th>
                  <th>Foghatóság</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ hal.Meret }}</td>
                  <td>{{ hal.Suly }}</td>
                  <td>{{ hal.TilalmiIdoszak }}</td>
                  <td>{{ hal.MeretKorlat }}</td>
                  <td>{{ hal.DarabKorlatos }}</td>
                  <td>{{ hal.Foghatosag }}</td>
                </tr>
              </tbody>
            </table>

            <img
              v-if="hal.KepFile"
              :src="`/public/kepek/${hal.KepFile}`"
              class="card-img-top"
              alt="..."
            />
            <div class="card-text" v-html="keresJelol(hal.SzovegHtml)"></div>


          </div>

        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useKeresStore } from "@/stores/keres";
const storeKeres = useKeresStore();
const { keresoszo } = storeToRefs(storeKeres);
export default {
  data() {
    return {
      halak: [],
      urlHalkartyak: "http://localhost:3000/halkonyv",
      urlHalkartyakSzur: "http://localhost:3000/halkonyvSzur",
      keresoszo,
    };
  },
  mounted() {
    this.getHalkartyak();
  },
  watch: {
    keresoszo() {
      if (this.keresoszo.trim()) {
        this.getHalkartyakSzur();
      } else {
        this.getHalkartyak();
      }
    },
  },
  methods: {
    async getHalkartyak() {
      const response = await fetch(this.urlHalkartyak);
      const data = await response.json();
      this.halak = data.data;
    },
    async getHalkartyakSzur() {
      const urlHalkartya = `${this.urlHalkartyakSzur}/${this.keresoszo}`;
      const response = await fetch(urlHalkartya);
      const data = await response.json();
      this.halak = data.data;
    },
    keresJelol(text) {
      if (this.keresoszo) {
        let what = new RegExp(this.keresoszo, "gi");
        if (text != null) {
          text = text.replace(what, (match) => {
            return `<span class="mark">${match}</span>`;
          });
        }
        return text;
      } else {
        return text;
      }
    },
  },
  computed: {},
};

</script>


<style>
</style>
