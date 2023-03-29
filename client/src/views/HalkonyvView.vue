
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
            Accordion Item #1
          </button>
        </h2>
        <div
          :id="`flush-collapse${index}`"
          class="accordion-collapse collapse"
          :aria-labelledby="`flush-heading${index}`"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">
            Placeholder content for this accordion, which is intended to
            demonstrate the <code>.accordion-flush</code> class. This is the
            first item's accordion body.
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
      FejezetId: null,
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
    async getHalkartya() {
      const urlHalkartya = `${this.urlHalkartyak}/${this.FejezetId}`;
      const response = await fetch(urlHalkartya);
      const data = await response.json();
      this.halKartya = data.data[0];
      console.log(urlHalkartya, this.halKartya);
    },
    onClickReszletek(FejezetId) {
      this.FejezetId = FejezetId;
      this.getHalkartya();
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
