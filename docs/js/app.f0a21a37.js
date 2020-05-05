(function(t){function e(e){for(var n,o,i=e[0],c=e[1],l=e[2],u=0,f=[];u<i.length;u++)o=i[u],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&f.push(s[o][0]),s[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);d&&d(e);while(f.length)f.shift()();return r.push.apply(r,l||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],n=!0,i=1;i<a.length;i++){var c=a[i];0!==s[c]&&(n=!1)}n&&(r.splice(e--,1),t=o(o.s=a[0]))}return t}var n={},s={app:0},r=[];function o(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=n,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(a,n,function(e){return t[e]}.bind(null,n));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var d=c;r.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"3a49":function(t,e,a){"use strict";var n=a("6963"),s=a.n(n);s.a},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-content",[a("Home",{attrs:{today:t.loadToday,yesterday:t.loadYesterday,states:t.loadStates}})],1)],1)},r=[],o=(a("d3b7"),a("96cf"),a("1da1")),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-row",{staticClass:"text-center justify-center"},[a("v-col",{staticClass:"xs-12",attrs:{cols:"12"}},[a("p",{staticClass:"display-2 font-weight-bold mb-3"},[t._v(" COVID-19 U.S. ")])]),a("v-col",{staticClass:"xs-12 red--text",attrs:{cols:"12"}},[a("p",{staticClass:"font-weight-regular"},[t._v(" New ")]),a("h2",{staticClass:"display-3 font-weight-bold mb-3"},[t._v(" "+t._s(t.newConfirmed)+" ")])]),a("v-col",{staticClass:"xs-12 red--text text--darken-4",attrs:{cols:"12"}},[a("p",{staticClass:"subheading font-weight-regular"},[t._v(" Confirmed ")]),a("h2",{staticClass:"display-3 font-weight-bold mb-3"},[t._v(" "+t._s(t.totalConfirmed)+" ")])]),a("v-col",{staticClass:"xs-12 green--text",attrs:{cols:"12"}},[a("p",{staticClass:"subheading font-weight-regular"},[t._v(" Recovered ")]),a("span",{staticClass:"display-3 font-weight-bold mb-3"},[t._v(" "+t._s(t.totalRecovered)+" ")]),a("span",{staticStyle:{"font-size":"26px"}},[t._v(" "+t._s(t.recoveredRate)+"% ")])]),a("v-col",{staticClass:"xs-12 blue-grey--text text--darken-3",attrs:{cols:"12"}},[a("p",{staticClass:"subheading font-weight-regular"},[t._v(" Deceased ")]),a("span",{staticClass:"display-3 font-weight-bold mb-3"},[t._v(" "+t._s(t.totalDeaths)+" ")]),a("span",{staticStyle:{"font-size":"26px"}},[t._v(" "+t._s(t.deathRate)+"% ")])]),a("UsaMap"),a("v-col",{staticClass:"xs-12",attrs:{cols:"12"}},[a("v-data-table",{staticClass:"elevation-1",attrs:{"mobile-breakpoint":0,headers:t.headers,items:t.states,"items-per-page":5,"sort-by":["cases"],"sort-desc":[!0]}})],1),a("v-col",{staticClass:"xs-12",attrs:{cols:"12"}},[a("div",[t._v("Updated: "+t._s(t.updatedTime))])])],1)],1)},c=[],l=(a("b680"),a("ac1f"),a("25f0"),a("5319"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d3-geomap",attrs:{id:"mapUs"}})}),d=[],u=(a("7db0"),a("4160"),a("b0c0"),a("3ca3"),a("159b"),a("ddb0"),a("5698")),f=a("3fe2"),p=a("2ef0"),h={name:"UsaMap",data:function(){return{}},created:function(){this.createMapUs()},methods:{createMapUs:function(){return Object(o["a"])(regeneratorRuntime.mark((function t(){var e,a,n,s,r,o,i,c,l,d,h,m,v,y,g,b,x,C,w,_,j,S,U,O,R,T,D;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=.585,a=window.innerWidth,n=p.ceil(a*e),s="Cornsilk",r="Maroon",o=10,i=a,c=.02,l=.002,d=.8,h=.7,m=p.ceil(.02*i),v=6e4,y=[1,5e3,1e4,3e4,v],t.next=16,Promise.all([u["d"]("/d3-geomap/states-10m.json"),fetch("https://corona.lmao.ninja/v2/states?sort=cases")]);case 16:return g=t.sent,t.next=19,g[1].json();case 19:for(b=t.sent,x=g[0],C=f["a"](x,x.objects.states).features,w=[],b.forEach((function(t){w.push({state:t.state,cases:t.cases})})),_=u["e"]().domain([1,v]).range([1,o]),j=u["e"]().domain([1,o]).range([s,r]),j.clamp(!0),S=u["f"]("#mapUs").append("svg").attr("width",a).attr("height",n),S.append("g").attr("transform","translate(0, 0)"),U=u["f"]("#mapUs").append("div").attr("class","tooltip").style("opacity",0),O=u["b"]().translate([a/2,n/2]).scale(a),R=u["c"]().projection(O),S.selectAll(".state").data(C).enter().append("path").attr("class","state").attr("fill",(function(t){var e=w.find((function(e){return e.state===t.properties.name}));if(!p.isUndefined(e))return 0!==e.cases?j(_(e.cases)):j(_(1))})).attr("d",R).on("mouseover",(function(t){U.transition().duration(200).style("opacity",.9),U.html((function(){var e=w.find((function(e){return e.state===t.properties.name})),a='\n              <table style="margin-top: 2.5px;">\n                <tr><td>State: </td><td style="text-align: right">'+e.state+'</td></tr>\n                <tr><td>Case: </td><td style="text-align: right">'+e.cases+"</td></tr>\n              </table>";return a})).style("left",u["a"].pageX+"px").style("top",u["a"].pageY+"px")})).on("mouseout",(function(){U.transition().duration(500).style("opacity",0)})),S.append("path").datum(f["b"](x,x.objects.states,(function(t,e){return t!==e}))).attr("fill","none").attr("stroke","white").attr("stroke-linejoin","round").attr("d",R),S.append("text").attr("y",n*h).attr("x",a*d).attr("text-anchor","left").style("font-size",m).text("Confirmed"),T=function(t){S.append("rect").attr("y",n*h+(t+1)*i*(c+l)-i*c).attr("x",a*d).attr("width",i*c).attr("height",i*c).style("fill",j(_(y[t]))),S.append("text").attr("y",n*h+(t+1)*a*(c+l)).attr("x",a*(d+c+l)).attr("text-anchor","start").style("font-size",m).text((function(){var e=p.replace(p.toString(y[t]),/\B(?=(\d{3})+(?!\d))/g,",");if(t===y.length-1)return e+"+";var a=p.replace(p.toString(y[t+1]),/\B(?=(\d{3})+(?!\d))/g,",");return e+" - "+a}))},D=0;D<y.length;D++)T(D);case 37:case"end":return t.stop()}}),t)})))()}}},m=h,v=(a("600d"),a("2877")),y=Object(v["a"])(m,l,d,!1,null,null,null),g=y.exports,b=a("2ef0"),x={name:"Home",props:["today","yesterday","states"],components:{UsaMap:g},data:function(){return{headers:[{text:"States",align:"start",sortable:!1,value:"state"},{text:"Confirmed",value:"cases"},{text:"Active",value:"active"},{text:"Tests",value:"tests"},{text:"Tests / Million",value:"testsPerOneMillion"}]}},computed:{newConfirmed:function(){var t=24,e=60,a=0,n=new Date,s=t-n.getTimezoneOffset()/e;return n.getHours()>=s?this.today.todayCases>this.yesterday.todayCases/3?a=this.numberWithCommas(this.today.todayCases):b.isUndefined(this.today.todayCases)||b.isUndefined(this.yesterday.todayCases)||(a=this.numberWithCommas(this.today.todayCases+this.yesterday.todayCases)):a=this.numberWithCommas(this.today.todayCases),a},totalConfirmed:function(){return this.numberWithCommas(this.today.cases)},totalRecovered:function(){return this.numberWithCommas(this.today.recovered)},totalDeaths:function(){return this.numberWithCommas(this.today.deaths)},recoveredRate:function(){return this.calculateRate(this.today.recovered,this.today.cases,2)},deathRate:function(){return this.calculateRate(this.today.deaths,this.today.cases,2)},updatedTime:function(){var t="";if(!b.isUndefined(this.today.updated)){var e=new Date(this.today.updated);t=e.toLocaleDateString("en-US")+" "+e.toLocaleTimeString("en-US")}return t}},methods:{numberWithCommas:function(t){var e=0;return b.isUndefined(t)||(e=b.replace(b.toString(t),/\B(?=(\d{3})+(?!\d))/g,",")),e},calculateRate:function(t,e,a){var n=0;return b.isUndefined(t)||b.isUndefined(e)||(n=(t/e*100).toFixed(a)),n}}},C=x,w=(a("3a49"),a("6544")),_=a.n(w),j=a("62ad"),S=a("a523"),U=a("8fea"),O=a("0fd9"),R=Object(v["a"])(C,i,c,!1,null,"0c604da3",null),T=R.exports;_()(R,{VCol:j["a"],VContainer:S["a"],VDataTable:U["a"],VRow:O["a"]});var D={name:"App",components:{Home:T},data:function(){return{loadToday:[],loadYesterday:[],loadStates:[],polling:null,pollingTime:3e4}},created:function(){this.fetchData(),this.pollingData()},beforeDestroy:function(){clearInterval(this.polling)},methods:{fetchData:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a,n,s,r,o,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://corona.lmao.ninja/v2/countries/USA");case 2:return a=e.sent,e.next=5,a.json();case 5:return n=e.sent,t.loadToday=n,e.next=9,fetch("https://corona.lmao.ninja/v2/countries/USA?yesterday=true");case 9:return s=e.sent,e.next=12,s.json();case 12:return r=e.sent,t.loadYesterday=r,e.next=16,fetch("https://corona.lmao.ninja/v2/states?sort=cases");case 16:return o=e.sent,e.next=19,o.json();case 19:i=e.sent,t.loadStates=i;case 21:case"end":return e.stop()}}),e)})))()},pollingData:function(){var t=this;this.polling=setInterval((function(){t.fetchData()}),this.pollingTime)}}},M=D,k=a("7496"),P=a("a75b"),W=Object(v["a"])(M,s,r,!1,null,null,null),V=W.exports;_()(W,{VApp:k["a"],VContent:P["a"]});var A=a("f309");n["a"].use(A["a"]);var z=new A["a"]({});n["a"].config.productionTip=!1,new n["a"]({vuetify:z,render:function(t){return t(V)}}).$mount("#app")},"600d":function(t,e,a){"use strict";var n=a("8aa7"),s=a.n(n);s.a},6963:function(t,e,a){},"8aa7":function(t,e,a){}});
//# sourceMappingURL=app.f0a21a37.js.map