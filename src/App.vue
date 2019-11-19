<style lang="stylus" scoped>
  .subheading{
    font-size :10pt;
  }
  .subheading-lg{
    font-size :12pt;
  }
  .heading-app{
    font-size :10pt;
  }
  .heading-app-lg{
    font-size :14pt;
  }
  .logo-app-bar{
    margin-left:-10px;
    height:65px;
  }
  .logo-app-bar-lg{
    height:68px;
    margin-top :-8px;
  }
</style>
<template>
  <v-app>
      <v-app-bar app elevation="0" height="80" color="#fafafaff" >
            <v-container fill-height class="v-row" style="margin:1px;padding:0px;background-color:#dedede17">
                <img  :class="{'logo-app-bar': $vuetify.breakpoint.xs,
                'logo-app-bar-lg':$vuetify.breakpoint.sm,'logo-app-bar-lg':$vuetify.breakpoint.lg}"

                :src="require('./assets/img/iegm_2020.svg')">
                <v-container class="col">
                    <div :class="{'heading-app': $vuetify.breakpoint.xs,
                    'heading-app-lg':$vuetify.breakpoint.smAndUp}" class="font-weight-medium inline">Índice de Efetividade da Gestão Municipal</div>
                    <div :class="{'subheading': $vuetify.breakpoint.xs,
                    'subheading-lg':$vuetify.breakpoint.smAndUp}">Tribunal de Contas do Estado do Maranhão</div>
                    <span></span>
                </v-container>
            </v-container>
        </v-app-bar>   
    <v-content style="background-color:#def2f9ff" >      
      <Ranking></Ranking>
    </v-content>
    <v-footer   >
      <div  style="width:100%" class="lighten-1 text-center">Tribunal de Contas do Estado do Maranhão
        </div>
    </v-footer>
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
  computed:{
      imageHeight: function(){
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return '65px'
          case 'sm': return '85px'
          case 'md': 
          case 'lg': 
          case 'xl': return '85px'
        }
        return 0;
      }
      },
};
</script>
