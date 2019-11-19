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
        <v-select
          style="display:inline-block;width:5rem; font-family:DejaVu Sans; font-size:23px; font-strech:semi-condensed;"
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
        <v-select
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
        <v-btn v-on:click="downloadCSV" class="elevation-0">
          <v-icon>mdi-download</v-icon>
          CSV</v-btn>
      </v-col>
      
    </v-row>
    <div style="height:87%;width:100;margin:0;" class="align-self-center mx-2">
      <v-data-table
        style="height:100%;width:100%"
        :headers="headers"
        :items="itens"
        :items-per-page="auto"
      >
        <template v-slot:item.nota="{ item }">
          <v-chip color="#114f70ff" dark style="padding-left:0">
          <v-chip  :color="getColor(item.nota)" dark w-5 style="margin-left:0">{{ item.faixa }}</v-chip>
          <span class="ml-1" style="width:4rem;font-size:16px;font-weight:bold;:color=getColor(item.nota)" >{{item.nota.toFixed(2)}}</span>
          </v-chip>
          
        </template>
        <template v-slot:item.ieduc="{ item }">
          <v-chip :color="getColor(item.ieduc)" dark>{{ item.ieduc.toFixed(2) }}</v-chip>
        </template>
        <template v-slot:item.isaude="{ item }">
          <v-chip :color="getColor(item.isaude)" dark>{{ item.isaude.toFixed(2) }}</v-chip>
        </template>
        <template v-slot:item.iplan="{ item }">
          <v-chip :color="getColor(item.iplan)" dark>{{ item.iplan.toFixed(2) }}</v-chip>
        </template>
        <template v-slot:item.ifiscal="{ item }">
          <v-chip :color="getColor(item.ifiscal)" dark>{{ item.ifiscal.toFixed(2) }}</v-chip>
        </template>
        <template v-slot:item.iamb="{ item }">
          <v-chip :color="getColor(item.iamb)" dark>{{ item.iamb.toFixed(2) }}</v-chip>
        </template>
        <template v-slot:item.icidade="{ item }">
          <v-chip :color="getColor(item.icidade)" dark>{{ item.icidade.toFixed(2) }}</v-chip>
        </template>
        <template v-slot:item.igovti="{ item }">
          <v-chip :color="getColor(item.igovti)" dark>{{ item.igovti.toFixed(2) }}</v-chip>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { json2csvAsync } from "json-2-csv";
//import RemessaView from "./RemessaView"
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
      estados: ["MA", "BA"],
      estadoSelecionado: "MA",
      anos: [2015, 2016, 2017, 2018],
      anoSelecionado: 2016,
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
      ],
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
    filtroRemessaToCSV: function(){
      var csvItens = [];
      this.itens.forEach(element => {
        var item = {
          CODIGO_MUNICIPIO_IBGE: element.enteId,
          NOME_ENTE : element.nomeEnte,
          NOTA_GERAL : element.nota,
          FAIXA_GERAL : element.faixa,
          EDUCACAO : element.ieduc,
          EDUCFAIXA : this.calc_faixa(element.ieduc),
          SAUDE : element.isaude,
          SAUFAIXA : this.calc_faixa(element.isaude),
          PLANEJAMENTO : element.iplan,
          PLANFAIXA : this.calc_faixa(element.iplan),
          FISCAL : element.ifiscal,
          FISFAIXA : this.calc_faixa(element.ifiscal),
          AMBIENTE : element.iamb,
          AMBFAIXA : this.calc_faixa(element.iamb),
          CIDADE : element.icidade,
          CIDFAIXA : this.calc_faixa(element.icidade),
          GOVTI : element.igovti,
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
      if (pontos >= 90) return "#5B9BD5";
      else if (75 <= pontos && pontos <= 89.99) return "#70AD47";
      else if (60 <= pontos && pontos <= 74.99) return "#CCC";
      else if (50 <= pontos && pontos <= 59.99) return "#FFD966";
      else return "#F19455";
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
    axios
      .get("remessa/remessasValidadasAno", {
        params: { ano: 2016 }
      })
      .then(response => {
        this.itens = response.data;
        //log(response.data)
      })
      .catch(error => {
        log(error);
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