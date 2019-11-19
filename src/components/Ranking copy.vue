<template>
    <v-container id="list"> 
        <!-- Lista simples -->
        <v-list>
             <v-subheader>REMESSAS</v-subheader>
        <v-list-item-group  color="primary" >
          <v-list-item v-on:click="setSelectedItem(item)"
            v-for="(item, i) in itens"
            :key="i.remessaId">
             <v-list-item-content>
              <v-list-item-title class="text-uppercase">

              <v-label>{{item.nomeEnte}}</v-label><v-spacer class="d-inline-block" style="width:10px"></v-spacer><v-label>{{item.ano}}</v-label>
              </v-list-item-title>
             </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        </v-list>
           <RemessaView v-if="selectedItem!=null" :selectedItem="selectedItem"
           :dialog="viewRemessa"
            v-on:updateRemessa="updateRemessa" v-on:closeDialog="closeDialog" ></RemessaView>
    </v-container>
    
</template>
<script>
import axios from 'axios'
import RemessaView from "./RemessaView"
import { log } from 'util';
//import Vue from 'vue'
export default {
  components: {
    RemessaView
  },
  data: function(){
    return {itens:[], viewRemessa:false,
            selectedItem:null,
            }
  },methods:{
    setSelectedItem: function(remessa){
      this.viewRemessa=true;
      this.selectedItem=remessa;
      log("ID:"+this.selectedItem.nomeEnte+" Ente: "+this.selectedItem.nomeEnte+".");
    },
    updateRemessa: function(remessa){
        /*atualizar no BD*/
        axios
        .put("remessa/"+remessa.id,remessa)
        .then(response=>{log(response.status)
          Object.assign(this.selectedItem,remessa)
        })
        .catch(error =>{log(error)})
        
        
      
    },
    closeDialog: function(){
      this.viewRemessa=false;
    }
  },
  watch:{
    
  },
  mounted: function(){
    axios
      .get('remessa/remessasValidadasAno',{
        params:{ano:2016}
      })
      .then(response => {
        this.itens = response.data
        //log(response.data)
        })
      .catch(error => {log(error)
        this.itens=[{"remessaId":342,"nomeEnte":"Turiaçu","ano":2016},{"remessaId":326,"nomeEnte":"Brejo de Areia","ano":2016}]
      })
  }
};
</script>