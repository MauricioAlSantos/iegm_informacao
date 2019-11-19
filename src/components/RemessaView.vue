<template>
<v-dialog v-model="visibleDialog" v-on:click:outside='$emit("closeDialog");' max-width="500px">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        ></v-card-title>
        <v-card-text>
          <div>REMESSA</div>
             <div v-show="!edit" class="row" width="100%" >
              <div class="col flex-grow-1 flex-shrink-0 align-self-center" cols="10" ><v-label style="width:100rem" >{{item.nomeEnte}}</v-label></div>
              <div class="col flex-grow-0 flex-shrink-0 align-self-center"><v-label>{{item.ano}}</v-label></div>
              <div class="col" ><v-btn outlined class="ma-2" fab small v-on:click="edit=true" >
                <v-icon >mdi-pencil</v-icon>
              </v-btn>
              </div>
             </div>
             <div v-if="edit" style="width:100%">
                <v-text-field v-model="item.nomeEnte" class="d-inline-block" ></v-text-field> 
                <v-spacer class="d-inline-block" style="width:10px;" ></v-spacer>
                <v-text-field :rules="[anoRule]" type="Number" v-model.trim="item.ano" class="d-inline-block" style="width:4em;"></v-text-field>
                <v-btn outlined class="ma-2" fab small v-on:click="updateRemessa();" >
                <v-icon >mdi-check</v-icon>
              </v-btn>
              <v-btn outlined class="ma-2" fab small v-on:click='edit=false' >
                <v-icon >mdi-cancel</v-icon></v-btn>
             </div>
        </v-card-text>
      </v-card>
      </v-dialog>
</template>
<script>
/* import axios from 'axios' */
import { log } from 'util'
export default {
  data: function(){
    return {item:"",visibleDialog:false,
      edit:false,
      anoRule: v  => {
        if(this.item!=null&&this.item=="") return true;
        //if (!v.trim()) return true;
        if (!isNaN(parseInt(v)) && v >= 1999) return true;
        return 'Ano deve ser maior que 1999';
      }
    }
  },
  props: {selectedItem:Object,dialog:Boolean},
  watch:{
    dialog: function(){
        if(this.dialog){
          this.item=Object.assign({},this.selectedItem);
          this.visibleDialog = true;
        }else{
          this.visibleDialog=false;
        }
    },
   
  },
  methods: {
    updateRemessa: function(){
        this.$emit("updateRemessa",this.item);
    }
  },
  mounted: function(){
    this.item=Object.assign({},this.selectedItem);
    this.visibleDialog=true;
    log();
  }
};
</script>