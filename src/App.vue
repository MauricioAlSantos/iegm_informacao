<template>
  <v-app>
    
      <v-app-bar app elevation="1" height="100" >
            <v-container fill-height  pa-1 ma-1 class="v-row">
                <img height="85" style="sm-height:40px" :src="require('./assets/iegm_icon.svg')">
                <v-container class="col">
                    <h3 class="font-weight-medium inline">Índice de Efetividade da Gestão Municipal</h3>
                    <h4 class="font-weight-regular">Tribunal de Contas do Estado do Maranhão</h4>
                    <span></span>
                </v-container>
            </v-container>
        </v-app-bar>   

    <v-content>
      <Ranking></Ranking>
    </v-content>
  </v-app>
</template>

<script>
/* import HelloWorld from './components/HelloWorld'; */
import Ranking from './components/Ranking';
export default {
  name: 'App',
  components: {
    Ranking
  },
  data: () => ({
    //
  }),
};
</script>
