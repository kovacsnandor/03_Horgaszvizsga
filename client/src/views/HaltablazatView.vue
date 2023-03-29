
<template>
  <div>
    <h1>Hal táblázat</h1>

    <!-- táblázat -->
    <div class="table">
      <thead>
        <tr>
          <th>Hal</th>
          <th>Kép</th>
          <th>Méret</th>
          <th>Súly</th>
          <th>Tilalmi időszak</th>
          <th>Méret korlát</th>
          <th>Darab korlátos</th>
          <th>Foghatóság</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(hal, index) in halak" :key="`sor${index}`">
          <td>{{ hal.FejezetCim }}</td>
          <td> <img
            :src="`/public/kepek/${hal.KepFile}`"
            class="card-img-top my-picture-100"
            :alt="hal.FejezetCim"
          /></td>
          <td>{{ hal.Meret }}</td>
          <td>{{ hal.Suly }}</td>
          <td>{{ hal.TilalmiIdoszak }}</td>
          <td>{{ hal.MeretKorlat }}</td>
          <td>{{ hal.DarabKorlatos }}</td>
          <td>{{ hal.Foghatosag }}</td>
        </tr>
      </tbody>
    </div>
    
  </div>
</template>

<script>
class HalKartya {
  constructor() {
    this.FejezetId = null;
    this.FejezetSzint = null;
    this.FejezetSzam = null;
    this.FejezetCim = null;
    this.KepFile = null;
    this.Meret = null;
    this.Suly = null;
    this.TilalmiIdoszak = null;
    this.MeretKorla = null;
    this.DarabKorlato = null;
    this.Foghatosag = null;
    this.SzovegHtml = null;
  }
}
import { storeToRefs } from "pinia";
import { useKeresStore } from "@/stores/keres";
const storeKeres = useKeresStore();
const { keresoszo } = storeToRefs(storeKeres);
export default {
  data() {
    return {
      halak: [],
      halKartya: new HalKartya(),
      urlHalkartyak: "http://localhost:3000/halkartyak",
      urlHalkartyakSzur: "http://localhost:3000/halkartyakSzur",
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
        text = text.replace(what, (match) => {
          return `<span class="mark">${match}</span>`;
        });
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
.my-picture-100{
  width: 100px
}
</style>
