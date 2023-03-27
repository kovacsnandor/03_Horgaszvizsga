
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
                <ul class="list-group">
                  <li class="list-group-item">Méret: Meret</li>
                  <li class="list-group-item">Súly: Suly</li>
                  <li class="list-group-item">
                    Tilalmi időszak: TilalmiIdoszak
                  </li>
                  <li class="list-group-item">Méret korlát: MeretKorlat</li>
                  <li class="list-group-item">Darab korlátos: DarabKorlatos</li>
                  <li class="list-group-item">Foghatóság Foghatosag</li>
                </ul>
                <p class="card-text">SzovegHtml</p>

                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
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
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Launch demo modal
    </button>

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
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">...</div>
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
export default {
  data() {
    return {
      halak: [],
      urlHalkartyak: "http://localhost:3000/halkartyak",
      FejezetId: null,
      halKartya: null,
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
  },
};
</script>


<style>
</style>
