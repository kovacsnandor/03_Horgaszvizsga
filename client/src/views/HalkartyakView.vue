
<template>
  <div>
    <h1>Halkártyák</h1>

    <div class="row m-0">
      <!-- kereső -->
      <div class="col-md-12 my-border">kereső</div>
      <!-- kártyák -->
      <div class="col-md-8 my-border">
        <div class="row row-cols-1 row-cols-md-3 g-4">

          <!-- kártya temlate -->
          <div class="card" v-for="(hal, index) in halak" :key="index">
            <img :src="`/public/kepek/${hal.KepFile}`" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">FejezetCim</h5>
              <ul class="list-group">
                <li class="list-group-item">Méret: Meret</li>
                <li class="list-group-item">Súly: Suly</li>
                <li class="list-group-item">Tilalmi időszak: TilalmiIdoszak</li>
                <li class="list-group-item">Méret korlát: MeretKorlat</li>
                <li class="list-group-item">Darab korlátos: DarabKorlatos</li>
                <li class="list-group-item">Foghatóság Foghatosag</li>
              </ul>
              <p class="card-text">
                SzovegHtml
              </p>
              <a href="#" class="btn btn-primary">Részletek</a>
            </div>
          </div>

        </div>
      </div>
      <!-- kártya -->
      <div class="col-md-4 my-border">kártya</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      halak: [],
      urlHalkartyak: "http://localhost:3000/halkartyak",
    };
  },
  mounted(){
    this.getHalkartyak();
  },
  methods: {
    async getHalkartyak(){
      const response = await fetch(this.urlHalkartyak);
      const data = await response.json();
      this.halak = data.data;
      console.log(this.halak);
    },
    picture (kep) {
    // return require(kep)
    // The path could be '../assets/img.png', etc., which depends on where your vue file is
  }
  },

};
</script>


<style>
</style>
