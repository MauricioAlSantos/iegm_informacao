<template>
    <v-container id="list">
        <!-- Lista simples -->
        <v-list>
             <v-subheader>REMESSAS</v-subheader>
        <v-list-item-group v-model="itens" color="primary">
          <v-list-item
            v-for="(item, i) in itens"
            :key="i.id">
             <v-list-item-content>
              <v-list-item-title class="text-uppercase"
              >
              <v-label>{{item.nomeEnte}}</v-label><vlabel>{{item.ano}}</vlabel>
              </v-list-item-title>
             </v-list-item-content>
          
          </v-list-item>
        </v-list-item-group>
        </v-list>
    </v-container>
    
</template>
<script>
import axios from 'axios'
export default {
  data: function(){
    return {itens:[]}
  },
  mounted: function(){
    axios
      .get('remessasAno',{
        params:{ano:2017}
      })
      .then(response => (this.itens = response.data))
  }
};
</script>