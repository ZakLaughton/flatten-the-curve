(this["webpackJsonpflatten-the-curve"]=this["webpackJsonpflatten-the-curve"]||[]).push([[0],{45:function(t,e,n){t.exports=n(75)},50:function(t,e,n){},74:function(t,e,n){},75:function(t,e,n){"use strict";n.r(e);var i=n(1),o=n.n(i),r=n(36),a=n.n(r),c=(n(50),n(9)),u=n(42),l=n(7),d=n(11),f=n(41);var s=function(t){var e=t.gridSize,n=t.personData,i=t.dispatch,r=t.day,a=n.id,c=n.infectedDay,u=n.isCured,l=n.location,d=!u&&c>=0&&r-c>=5,s={height:"".concat(100/e,"vw"),width:"".concat(100/e,"vw"),backgroundColor:u?"#57c1ff":d?"#448844":"white",borderRadius:"50%",position:"absolute",left:"".concat(100/e*l.x,"%"),bottom:"".concat(100/e*l.y,"%"),border:"1px solid black",boxSizing:"border-box"},p={position:"absolute",left:"".concat(l[0],"px"),bottom:"".concat(l[1],"px"),border:"3px dashed #595959",boxSizing:"border-box"},y={position:"absolute",left:"".concat(l[0],"px"),bottom:"".concat(l[1],"px"),border:"3px solid black",boxSizing:"border-box"};return o.a.createElement(o.a.Fragment,null,o.a.createElement(f.a.span,{positionTransition:{duration:.4},style:s,onClick:function(){i({type:"UPDATE_PERSON_MOBILITY",payload:{id:a,mobility:d?"QUARANTINED":"SOCIALLY_DISTANCED"}}),i({type:"INCREMENT_DAY"})}}),"SOCIALLY_DISTANCED"===n.mobility&&o.a.createElement("div",{style:p}),"QUARANTINED"===n.mobility&&o.a.createElement("div",{style:y}))};function p(){var t=Object(c.a)(["\n  width: 100vw;\n  height: 100vw;\n  max-width: ",";\n  max-height: ",";\n  background-color: #b7b7b7;\n  position: relative;\n  margin: auto;\n"]);return p=function(){return t},t}var y=d.a.div(p(),(function(t){return"".concat(t.size,"px")}),(function(t){return"".concat(t.size,"px")})),m=function(t){var e=t.boardSize,n=t.gridSize,i=t.people,r=t.dispatch,a=t.day;return o.a.createElement(y,{size:e,onContextMenu:function(t){t.preventDefault(),r({type:"INCREMENT_DAY"})}},i.map((function(t,e){return o.a.createElement(s,{personData:t,key:e,gridSize:n,dispatch:r,day:a})})))},b=n(5),h=function(t){var e=t.historicalInfectedCount,n=t.totalPeopleCount,i=t.day,r=e.map((function(t){return{x:t.day,y:t.count}})),a=[0,n],c=[0,i],u=function(){for(var t=[0],e=0;e<i;e++)e%5===0&&t.push(e);return t}(),l=function(){for(var t=[],e=0,i=[0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1];e<i.length;e++){var o=i[e];t.push(o*n)}return t}();return o.a.createElement(b.b,{animation:!0,stackBy:"y",yDomain:a,xDomain:c,curve:"curveCardinal"},o.a.createElement(b.d,null),o.a.createElement(b.c,null),o.a.createElement(b.e,{animation:!0,attr:"x",attrAxis:"y",orientation:"bottom",tickValues:u,tickFormat:function(t){return t},title:"days",position:"end"}),o.a.createElement(b.f,{title:"% infected",position:"end",animation:!0,attr:"y",attrAxis:"x",orientation:"left",tickValues:l,tickFormat:function(t){return t/n*100}}),o.a.createElement(b.a,{animation:!0,data:r,opacity:.5,style:{},color:"red"}))};function v(t){return t.filter((function(t){return!t.isCured&&t.infectedDay>=0})).length}var E=n(17);function x(t,e){var n=e.type,i=e.payload;switch(n){case"INCREMENT_DAY":var o=t.day+1;t.people.reduce((function(e,n,i){if(["SOCIALLY_DISTANCED","QUARANTINED"].includes(n.mobility))return e;var o=function(t,e){var n=g(t,e);return n[Math.floor(Math.random()*n.length)].coordinates}(n.location,t.gridSize);return e.some((function(t){return t.location.x===o.x&&t.location.y===o.y}))?e[i]=n:e[i]=Object(l.a)({},n,{location:o}),e}),t.people);var r=function(){var e=Object(E.a)(t.people),n=e.filter((function(e){return-1!==e.infectedDay&&!e.isCured&&t.day-e.infectedDay>19})).map((function(t){return t.id}));e=e.map((function(t){return n.includes(t.id)&&(t.isCured=!0),t}));var i=t.people.filter((function(t){return t.infectedDay>=0&&!t.isCured&&"QUARANTINED"!==t.mobility})).map((function(t){return g(t.location).filter((function(t){return["N","E","S","W"].includes(t.direction)})).map((function(t){return t.coordinates}))}));return i=i.flat(),t.people.map((function(e){if(-1===e.infectedDay&&i.some((function(t){return e.location.x===t.x&&e.location.y===t.y}))){var n="SOCIALLY_DISTANCED"===e.mobility?.5:1;Math.random()<=n&&(e.infectedDay=t.day)}return e}))}();return Object(l.a)({},t,{day:o,people:r,historicalInfectedCount:[].concat(Object(E.a)(t.historicalInfectedCount),[{day:o,count:v(r)}])});case"UPDATE_PERSON_MOBILITY":var a=Object(E.a)(t.people),c=a.findIndex((function(t){return t.id===i.id}));return a[c].mobility=i.mobility,Object(l.a)({},t,{people:a});default:return t}}function g(t,e){var n=t.x,i=t.y,o=[{direction:"N",coordinates:{x:n+0,y:i+1}},{direction:"NE",coordinates:{x:n+1,y:i+1}},{direction:"E",coordinates:{x:n+1,y:i+0}},{direction:"SE",coordinates:{x:n+1,y:i-1}},{direction:"S",coordinates:{x:n+0,y:i-1}},{direction:"SW",coordinates:{x:n-1,y:i-1}},{direction:"W",coordinates:{x:n-1,y:i+0}},{direction:"NW",coordinates:{x:n-1,y:i+1}}];return function(t){return 0===t.x}(t)&&(o=o.filter((function(t){return!["NW","W","SW"].includes(t.direction)}))),function(t){return 0===t.y}(t)&&(o=o.filter((function(t){return!["SW","S","SE"].includes(t.direction)}))),function(t){return t.x===e-1}(t)&&(o=o.filter((function(t){return!["SE","E","NE"].includes(t.direction)}))),function(t){return t.y===e-1}(t)&&(o=o.filter((function(t){return!["NE","N","NW"].includes(t.direction)}))),o}n(74);function S(){var t=Object(c.a)(["\n  width: 100vw;\n  height: 100vw;\n"]);return S=function(){return t},t}function D(){var t=Object(c.a)(["\n  background-color: #454545;\n  color: rgba(255, 255, 255, 0.8);\n  width: 100%;\n  height: 100%;\n"]);return D=function(){return t},t}var C=d.a.main(D()),I=d.a.div(S()),N=function(){var t=Object(i.useReducer)(x,{day:0,people:[],historicalInfectedCount:[{day:0,count:0}],gridSize:25,boardSize:700,peopleDensity:.3},(function(t){var e=t.gridSize,n=t.peopleDensity,i=Math.floor(e*e*n)||4,o=function(t){for(var e,n,i=t.length;i;e=parseInt(Math.random()*i),n=t[--i],t[i]=t[e],t[e]=n);return t}(function(){for(var t=[],n=0;n<e;n++)for(var i=0;i<e;i++)t.push({x:n,y:i});return t}()).slice(0,i).map((function(t,e){return{id:e,location:t,infectedDay:-1,isCured:!1,mobility:"FREE"}}));return o[Math.floor(Math.random()*o.length)].infectedDay=0,Object(l.a)({},t,{people:o})})),e=Object(u.a)(t,2),n=e[0],r=e[1],a=n.day,c=n.people,d=n.historicalInfectedCount,f=n.gridSize,s=n.boardSize,p={gridSize:f,boardSize:s,peopleDensity:n.peopleDensity},y=v(c),b=c.filter((function(t){return t.isCured})).length,E=c.length||100;return o.a.createElement(C,null,o.a.createElement(m,Object.assign({},p,{dispatch:r,people:c,day:a,gridSize:f})),o.a.createElement("p",null,"Infected: ",y),o.a.createElement("p",null,"Recovered: ",b),o.a.createElement(I,null,o.a.createElement(h,{day:a,historicalInfectedCount:d,totalPeopleCount:E})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(N,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[45,1,2]]]);
//# sourceMappingURL=main.35912607.chunk.js.map