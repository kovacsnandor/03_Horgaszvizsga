
<template>
  <div>
    <h1>Halkártyák</h1>

    <div class="row m-0">
      <!-- kereső -->
      <div class="col-md-12 my-border d-flex p-2">
        <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="keresoszo"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
      </div>

      <!-- kártyák -->
      <div class="col-md-12 my-border">
        <div
          class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4"
        >
          <!-- kártya temlate -->
          <div class="col" v-for="(hal, index) in halak" :key="index">
            <div class="card">
              <img
                :src="`/public/kepek/${hal.KepFile}`"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title" v-html="keresJelol(hal.FejezetCim)"></h5>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  @click="onClickReszletek(hal.FejezetId)"
                >
                  Részletek
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel" v-html="keresJelol(halKartya.FejezetCim)">
             
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <table class="table table-success">
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
                  <td>{{ halKartya.Meret }}</td>
                  <td>{{ halKartya.Suly }}</td>
                  <td>{{ halKartya.TilalmiIdoszak }}</td>
                  <td>{{ halKartya.MeretKorlat }}</td>
                  <td>{{ halKartya.DarabKorlatos }}</td>
                  <td>{{ halKartya.Foghatosag }}</td>
                </tr>
              </tbody>
            </table>

            <img
                :src="`/public/kepek/${halKartya.KepFile}`"
                class="card-img-top"
                alt="..."
              />

            <div v-html="keresJelol(halKartya.SzovegHtml)"></div>  

          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
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

export default {
  data() {
    return {
      halak: [],
      urlHalkartyak: "http://localhost:3000/halkartyak",
      urlHalkartyakSzur: "http://localhost:3000/halkartyakSzur",
      FejezetId: null,
      halKartya: new HalKartya(),
      keresoszo: null,
    };
  },
  mounted() {
    this.getHalkartyak();
  },
  watch: {
    keresoszo(){
      if (this.keresoszo.trim()) {
        this.getHalkartyakSzur();
      } else {
        this.getHalkartyak();
      }
    }
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
        if (text) {
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
};
</script>


<style>
.modal-body {
  max-height: calc(100vh - 180px);
  overflow-y: auto;
}

</style>
