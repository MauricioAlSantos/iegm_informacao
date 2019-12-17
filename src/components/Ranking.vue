<style lang="stylus" scoped>
.menu-iegm {
  background-color: '#4fbadfff';
}
</style>
<template>
  <div style="height:100%;width:100%;margin:0;padding:0;">
    <v-row style="width:100%;">
      <v-col
        
        style="font-family:sans-serif;font-size:20pt;
    color:#114f70ff;background-color:#4fbadfff;
    border-radius: 0 0 20px 0;width:603px;height:50px;padding-top:.5%; padding-left:20px"
      >
        <span>RESULTADOS</span>
        <span
          style="margin-left:50px; margin-right:10px; font-family:DejaVu Sans; font-size:23px; font-weight:300;"
        >Estado</span>
        <v-select v-on:change="atualizarRanking" :disabled="carregandoRanking"
          style="display:inline-block;width:min-content; font-family:DejaVu Sans; font-size:23px; font-strech:semi-condensed;"
          v-model="estadoSelecionado"
          :items="estados"
          solo
          dense
          flat
          color="#114f70ff"
          item-color="#114f70ff"
          menu-props="{ content-class='menu-iegm'}"
          background-color="#4fbadfff"
          margin="0"
        >
          <template v-slot:selection="{ item, index }" class="elevation-1">
            <span
              style="font-family:DejaVu Sans; font-size:23px; font-strech:semi-condensed;
      color:#114f70ff;;background-color:#4fbadfff"
            >{{ item }}</span>
          </template>
        </v-select>
        <span
          style="margin-left:20px;margin-right:10px;font-family:DejaVu Sans;font-size:23px;font-weight:200;"
        >Ano</span>
        <v-select v-on:change="atualizarRanking" :disabled="carregandoRanking"
          style="display:inline-block;width:6.5rem; font-family:DejaVu Sans; font-size:23px; font-strech:semi-condensed;"
          v-model="anoSelecionado"
          :items="anos"
          solo
          dense
          flat
          color="#114f70ff"
          item-color="#114f70ff"
          menu-props="{ content-class='menu-iegm' }"
          background-color="#4fbadfff"
          margin="0"
        >
          <template v-slot:selection="{ item, index }" class="elevation-1">
            <span
              style="font-family:DejaVu Sans; font-size:23px; font-strech:semi-condensed;
      color:#114f70ff;;background-color:#4fbadfff"
            >{{ item }}</span>
          </template>
        </v-select>
      </v-col>
      <v-col class="d-inline-block ml-5" style="height:100%;padding-top:.5%">
        <v-btn v-on:click="downloadCSV" class="elevation-0" :disabled="itens.length===0||carregandoRanking">
          <v-icon>mdi-download</v-icon>
          CSV</v-btn>
          <v-btn v-on:click="carregarTabela" class="elevation-0" :disabled="itens.length===0||carregandoRanking">
          <v-icon>mdi-download</v-icon>
          Carregar tabela</v-btn>
      </v-col>
      
    </v-row>
    <div style="min-height:87%;width:100;margin:0;" class="align-self-center mx-2">
      <v-data-table :loading="carregandoRanking" loading-text="Carregando" no-data-text="Sem resultados" no-results-text="Sem resultados"
        style="height:100%;width:100%;font-size:14pt"
        :headers="headers"
        :items="itens"
        :items-per-page="auto"
        
      >
        <template v-slot:item.nota="{ item }">
          <v-chip pill color="#114f70ff" dark style="padding-left:0">
            <v-avatar left :color="getColor(item.nota)" dark w-5 style="margin-left:0px;">{{typeof item.nota==='number'? item.faixa:item.nota }}</v-avatar>
          <span v-if="typeof item.nota==='number'" style="font-size:16px;font-weight:bold;" >{{item.nota.toFixed(2)}}</span>
          
          </v-chip>
        </template>
        <template v-slot:item.ieduc="{ item }">
          <span  style="color:#607D8B;font-weight:bold"> {{typeof item.nota==='number'?item.ieduc.toFixed(2).replace(/[.]/,','):item.ieduc}}</span>
          <div  :style="{color:getColor(item.ieduc),backgroundColor:getColor(item.ieduc),
          borderRadius:'90px',width:'10px',height:'15px',display:'inline-block ',verticalAlign:'text-top'}" class="ml-1">
          </div>

        </template>
        <template v-slot:item.isaude="{ item }">
          <span  style="color:#607D8B;font-weight:bold"> {{ typeof item.nota==='number'?item.isaude.toFixed(2).replace(/[.]/,','):item.isaude}}</span>
          <div :style="{color:getColor(item.isaude),backgroundColor:getColor(item.isaude),
          borderRadius:'90px',width:'10px',height:'15px',display:'inline-block ',verticalAlign:'text-top'}" class="ml-1"></div>
        </template>
        <template v-slot:item.iplan="{ item }">
          <span style="color:#607D8B;font-weight:bold"> {{typeof item.nota==='number'? item.iplan.toFixed(2).replace(/[.]/,','):item.iplan }}</span>
          <div :style="{color:getColor(item.iplan),backgroundColor:getColor(item.iplan),
          borderRadius:'90px',width:'10px',height:'15px',display:'inline-block ',verticalAlign:'text-top'}" class="ml-1"></div>
        </template>
        <template v-slot:item.ifiscal="{ item }">
         <span  style="color:#607D8B;font-weight:bold"> {{typeof item.nota==='number'? item.ifiscal.toFixed(2).replace(/[.]/,','):item.ifiscal }}</span>
          <div :style="{color:getColor(item.ifiscal),backgroundColor:getColor(item.ifiscal),
          borderRadius:'90px',width:'10px',height:'15px',display:'inline-block ',verticalAlign:'text-top'}" class="ml-1"></div>
        </template>
        <template v-slot:item.iamb="{ item }">
        <span style="color:#607D8B;font-weight:bold"> {{ typeof item.nota==='number'?item.iamb.toFixed(2).replace(/[.]/,','):item.iamb}}</span>
          <div :style="{color:getColor(item.iamb),backgroundColor:getColor(item.iamb),
          borderRadius:'90px',width:'10px',height:'15px',display:'inline-block ',verticalAlign:'text-top'}" class="ml-1"></div>
        </template>
        <template v-slot:item.icidade="{ item }">          
          <span  style="color:#607D8B;font-weight:bold"> {{typeof item.nota==='number'? item.icidade.toFixed(2).replace(/[.]/,','):item.icidade}}</span>
          <div :style="{color:getColor(item.icidade),backgroundColor:getColor(item.icidade),
          borderRadius:'90px',width:'10px',height:'15px',display:'inline-block ',verticalAlign:'text-top'}" class="ml-1"></div>
        </template>
        <template v-slot:item.igovti="{ item }">
          <span style="color:#607D8B;font-weight:bold"> {{typeof item.nota==='number'? item.igovti.toFixed(2).replace(/[.]/,','):item.igovti }}</span>
          <div :style="{color:getColor(item.igovti),backgroundColor:getColor(item.igovti),
          borderRadius:'90px',width:'10px',height:'15px',display:'inline-block ',verticalAlign:'text-top'}" class="ml-1"></div>
        </template>
      </v-data-table>
    </div>
    <v-bottom-sheet v-model="Offline" persistent inset>
      <v-sheet class="text-center" height="200px" >
        <v-btn
          class="mt-6 primary"
          flat
          @click="atualizarRanking"
        >Atualizar</v-btn>
        <div v-show="!carregandoRanking">
          <div class="title mt-5">O serviço está offline</div>
          <div >Por favor, tente mais tarde</div>
        </div>
        <div v-show="carregandoRanking">
          <v-progress-circular class="mt-6" indeterminate="true"></v-progress-circular>
        </div>
        
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
import axios from "axios";
import { json2csvAsync } from "json-2-csv";
import readXlsxFile from 'read-excel-file'
import { log } from "util";
import { mask } from "vue-the-mask";
//import Vue from 'vue'
export default {
  directives: {
    mask
  },
  components: {
    //RemessaView
  },
  data: function() {
    return {
      itens: [],
      estados: ["Geral","MA","BA","PR","GO","MG","CE","SC",
                "DF","SP","PA","PE","PI","RN","AC",
                "AL","AP","AM","ES","MT","MS",
                "PB","RJ","RS","RO","RR","SE","TO"],
      estadoSelecionado: "MA",
      anos: [2015, 2016, 2017, 2018],
      anoSelecionado: 2016,
      nomesTabelas:[],
      headers: [
        {
          text: "Município",
          align: "left",
          sortable: true,
          value: "nomeEnte",
          mask: "00.00"
        },
        {
          text: "Nota",
          align: "center",
          sortable: true,
          value: "nota",
          mask: "00.00"
        },
        {
          text: "Educação",
          align: "center",
          sortable: true,
          value: "ieduc"
        },
        {
          text: "Saúde",
          align: "center",
          sortable: true,
          value: "isaude"
        },
        {
          text: "Planejamento",
          align: "center",
          sortable: true,
          value: "iplan"
        },
        {
          text: "Fiscal",
          align: "center",
          sortable: true,
          value: "ifiscal"
        },
        {
          text: "Ambiente",
          align: "center",
          sortable: true,
          value: "iamb"
        },
        {
          text: "Cidade",
          align: "center",
          sortable: true,
          value: "icidade"
        },
        {
          text: "Governança de TI",
          align: "center",
          sortable: true,
          value: "igovti"
        }
      ],carregandoRanking:true,Offline:false,
      viewRemessa: false,
      selectedItem: null
    };
  },
  methods: {
    setSelectedItem: function(remessa) {
      this.viewRemessa = true;
      this.selectedItem = remessa;
      log(
        "ID:" +
          this.selectedItem.nomeEnte +
          " Ente: " +
          this.selectedItem.nomeEnte +
          "."
      );
    },
    atualizarRanking(){
      this.itens=[];
      this.carregandoRanking=true;
      //Verificar se tem dados no BD
      axios
      .get("remessa/remessasValidadasSiglaEstadoAno", {
        params: { sigla:this.estadoSelecionado!=='Geral' ? this.estadoSelecionado: '',ano: this.anoSelecionado }
      })
      .then(response => {
        this.itens = response.data;
        
        this.carregandoRanking=false;
        this.Offline = false;
      })
      .catch(error => {log(error);this.carregandoRanking=false;this.Offline=true;})
    }
    ,
    updateRemessa: function(remessa) {
      /*atualizar no BD*/
      axios
        .put("remessa/" + remessa.id, remessa)
        .then(response => {
          log(response.status);
          Object.assign(this.selectedItem, remessa);
        })
        .catch(error => {
          log(error);
        });
    },
    addZeroes(num) {
      return num.toLocaleString("ptBR", {useGrouping: false, minimumSignificantDigits:4});
      },
    filtroRemessaToCSV: function(){
      var csvItens = [];
      this.itens.forEach(element => {
        var item = {
          CODIGO_MUNICIPIO_IBGE: element.enteId,
          NOME_ENTE : element.nomeEnte,
          NOTA_GERAL : this.addZeroes(element.nota),
          FAIXA_GERAL : element.faixa,
          EDUCACAO : this.addZeroes(element.ieduc),
          EDUCFAIXA : this.calc_faixa(element.ieduc),
          SAUDE :  this.addZeroes(element.isaude),
          SAUFAIXA : this.calc_faixa(element.isaude),
          PLANEJAMENTO :  this.addZeroes(element.iplan),
          PLANFAIXA : this.calc_faixa(element.iplan),
          FISCAL :  this.addZeroes(element.ifiscal),
          FISFAIXA : this.calc_faixa(element.ifiscal),
          AMBIENTE :  this.addZeroes(element.iamb),
          AMBFAIXA : this.calc_faixa(element.iamb),
          CIDADE :  this.addZeroes(element.icidade),
          CIDFAIXA : this.calc_faixa(element.icidade),
          GOVTI :  this.addZeroes(element.igovti),
          GOVFAIXA : this.calc_faixa(element.igovti)
        }
        csvItens.push(item);
      });
      log(csvItens.length);
      return csvItens;
    },
    downloadCSV: function() {
      log("Download CSV");
      let options = {
    delimiter : {
        wrap  : '"', // Double Quote (") character
        field : ';', // Comma field delimiter
        eol   : '\n' // Newline delimiter
    }}
      json2csvAsync(this.filtroRemessaToCSV(),options)
        .then(csv => {
          this.openSaveFileDialog(
            csv,
            "IEGM_" +
              this.estadoSelecionado +
              "_" +
              this.anoSelecionado +
              ".csv",
            "text/plain"
          );
        })
        .catch(err => {
          throw err;
        });
    },
      carregarTabela (){
        const schema = {
        'ano': {
          prop: 'ano',
          type: Number,
          required:true
        },
        'ente': {
          prop: 'nomeEnte',
          type: String,
          required: true
        },
         'IEGM': {
          prop: 'nota',
          type: String,
         
        },
         'i-Educ': {
          prop: 'ieduc',
          type: String,
         
        },
         'i-Saúde': {
          prop: 'isaude',
          type: String,
          
        },
         'i-Planejamento': {
          prop: 'iplan',
          type: String,
          
        }, 'i-Fiscal': {
          prop: 'ifiscal',
         type: String,
          
        }, 'i-Amb': {
          prop: 'iamb',
          type:String,
        }, 'i-Cidade': {
          prop: 'icidade',
        type: String,
        },
         'i-Gov TI': {
          prop: 'igovti',
          type: String,
        }}

        fetch('/tabelas/').then(response=>{log(response)})
        
        log("Carregando Arquivo")
        fetch('/tabelas/iegm_GO_13112019_1728.xlsx')
        .then(response => response.blob())
        .then(blob => {
        var file = blob;
        log("Arquivo Carregado!");
        
        readXlsxFile(file, { schema }).then(({ rows, errors })=>{
          
          if(errors.length === 0){
            this.itens = rows;
          }else{
            log(errors)
          }
        });
  });
        
        }
    ,
    openSaveFileDialog: function(data, filename, mimetype) {
      if (!data) return;

      var blob =
        data.constructor !== Blob
          ? new Blob([data], { type: mimetype || "application/octet-stream" })
          : data;

      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, filename);
        return;
      }

      var lnk = document.createElement("a"),
        url = window.URL,
        objectURL;

      if (mimetype) {
        lnk.type = mimetype;
      }

      lnk.download = filename || "untitled";
      lnk.href = objectURL = url.createObjectURL(blob);
      lnk.dispatchEvent(new MouseEvent("click"));
      setTimeout(url.revokeObjectURL.bind(url, objectURL));
    },
    getColor(pontos) {
      if (pontos === null) return "#F19455";
      if(typeof pontos === 'number'){
        if (pontos >= 90) return "#5B9BD5";
        else if (75 <= pontos && pontos <= 89.99) return "#70AD47";
        else if (60 <= pontos && pontos <= 74.99) return "#CCC";
        else if (50 <= pontos && pontos <= 59.99) return "#FFD966";
        else return "#F19455";
      }else if(typeof pontos === 'string'){
        if (pontos ==='A') return "#5B9BD5";
        else if (pontos==='B+') return "#70AD47";
        else if (pontos==='B') return "#CCC";
        else if (pontos==='C+') return "#FFD966";
        else return "#F19455";
      }
    },
    calc_faixa(nota) {
		if(90 <= nota) return "A";
		if(75 <=nota && nota <= 89.99) return "B+";
		if(60 <=nota && nota <= 74.99) return "B";
		if(50 <=nota && nota <= 59.99) return "C+";
		if(nota <= 49.99) return "C"; 
		return "";
  },
    closeDialog: function() {
      this.viewRemessa = false;
    }
  },
  watch: {},
  mounted: function() {
    this.carregandoRanking=true;
    axios
      .get("remessa/remessasValidadasSiglaEstadoAno", {
        params: { sigla: this.estadoSelecionado!=='Geral' ? this.estadoSelecionado: '', ano: this.anoSelecionado }
      })
      .then(response => {
        this.itens = response.data;
        //log(response.data)
        this.carregandoRanking=false;
      })
      .catch(error => {
        log(error);
        this.carregandoRanking=false;
        this.itens = [
          {
            remessaId: 342,
            enteId: 2112407,
            ano: 2016,
            prazo: null,
            envio: "2017-03-25T20:04:40.000+0000",
            usuarioExternoId: 77101,
            validado: true,
            usuarioInternoId: null,
            codComprovante: 1490483080153,
            ieduc: 42.0,
            isaude: 42.0,
            iplan: 0.0,
            ifiscal: 10.0,
            iamb: 30.0,
            icidade: 30.0,
            igovti: 22.0,
            nota: 24.4,
            calculado: true,
            ieducPrev: 40.0,
            isaudePrev: 46.0,
            iplanPrev: 0.0,
            ifiscalPrev: 10.0,
            iambPrev: 30.0,
            icidadePrev: 30.0,
            igovtiPrev: 22.0,
            notaPrev: 24.8,
            calculadoPrev: true,
            nomeEnte: "Turiaçu",
            faixa: "C",
            codFaixa: 5,
            faixaPrev: "C",
            codFaixaPrev: 5,
            quesitosGerados: true,
            notaW: "24.4px",
            ieduW: "42.0px",
            isauW: "42.0px",
            iplaW: "0.0px",
            ifisW: "10.0px",
            iambW: "30.0px",
            icidW: "30.0px",
            igovW: "22.0px",
            ieducColor: "background-color:#F19455;",
            isaudeColor: "background-color:#F19455;",
            iplanColor: "background-color:#F19455;",
            ifiscalColor: "background-color:#F19455;",
            iambColor: "background-color:#F19455;",
            icidadeColor: "background-color:#F19455;",
            igovtiColor: "background-color:#F19455;",
            color: "background-color:#0097a7;",
            enviado: true
          },
          {
            remessaId: 255,
            enteId: 2101772,
            ano: 2016,
            prazo: null,
            envio: "2017-03-25T20:21:49.000+0000",
            usuarioExternoId: 5215453,
            validado: true,
            usuarioInternoId: null,
            codComprovante: 1490484109010,
            ieduc: 19.0,
            isaude: 58.0,
            iplan: 0.0,
            ifiscal: 16.0,
            iamb: 26.0,
            icidade: 0.0,
            igovti: 16.0,
            nota: 21.8,
            calculado: true,
            ieducPrev: 20.0,
            isaudePrev: 57.0,
            iplanPrev: 0.0,
            ifiscalPrev: 16.0,
            iambPrev: 26.0,
            icidadePrev: 0.0,
            igovtiPrev: 16.0,
            notaPrev: 21.8,
            calculadoPrev: true,
            nomeEnte: "Bela Vista do Maranhão",
            faixa: "C",
            codFaixa: 5,
            faixaPrev: "C",
            codFaixaPrev: 5,
            quesitosGerados: true,
            notaW: "21.8px",
            ieduW: "19.0px",
            isauW: "58.0px",
            iplaW: "0.0px",
            ifisW: "16.0px",
            iambW: "26.0px",
            icidW: "0.0px",
            igovW: "16.0px",
            ieducColor: "background-color:#F19455;",
            isaudeColor: "background-color:#FFD966;",
            iplanColor: "background-color:#F19455;",
            ifiscalColor: "background-color:#F19455;",
            iambColor: "background-color:#F19455;",
            icidadeColor: "background-color:#F19455;",
            igovtiColor: "background-color:#F19455;",
            color: "background-color:#0097a7;",
            enviado: true
          }
        ];
      });
  }
};
</script>