
<template>
  <div>
    <h1>Halkártyák</h1>

    <div class="row m-0">
      <!-- kereső -->
      <div class="col-md-12 my-border">kereső</div>

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
                <h5 class="card-title">{{ hal.FejezetCim }}</h5>
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
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              {{ halKartya.FejezetCim }}
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

            <div>{{halKartya.SzovegHtml}}</div>  

          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
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
      FejezetId: null,
      halKartya: new HalKartya(),
    };
  },
  mounted() {
    this.getHalkartyak();
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
  },
};
</script>


<style>
</style>
