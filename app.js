/* HORLOGERIE — Valsane Studio. Interface et illustrations SVG originales, sans dépendance externe. */
(function(){
"use strict";
const A=window.ATLAS, $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const state={page:"accueil",history:"all",region:"Toutes",form:"cases",view:"outside",part:"boitier",rotor:true};
const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const clean=s=>String(s).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const svg=(inside,view="0 0 260 160")=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+view+'" aria-hidden="true">'+inside+"</svg>";
const gold="#a8895c",ink="#455b4a",pale="#e3e9de",light="#fcfdf9";
const circles=(cx,cy,r,n,fn)=>Array.from({length:n},(_,i)=>{const a=(i*360/n-90)*Math.PI/180;return fn(cx+r*Math.cos(a),cy+r*Math.sin(a),i,a)}).join("");
const dial=(cx=130,cy=80,r=49)=>{
 let ticks=circles(cx,cy,r-7,12,(x,y,i,a)=>'<circle cx="'+x.toFixed(2)+'" cy="'+y.toFixed(2)+'" r="'+(i%3===0?2.4:1.5)+'" fill="'+gold+'"/>');
 return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+light+'" stroke="#c8d5c8" stroke-width="2"/><circle cx="'+cx+'" cy="'+cy+'" r="'+(r-6)+'" fill="none" stroke="#dce4d9"/>'+ticks+'<path d="M'+cx+' '+cy+'l-12 -17 M'+cx+' '+cy+'l23 -14" stroke="'+ink+'" stroke-width="3" stroke-linecap="round"/><circle cx="'+cx+'" cy="'+cy+'" r="3" fill="'+gold+'"/>';
};
const faceCase=(id)=>{
 const shapes={
 rond:'<circle cx="130" cy="80" r="59"/>',
 carre:'<rect x="76" y="26" width="108" height="108" rx="7"/>',
 rectangle:'<rect x="92" y="18" width="76" height="124" rx="7"/>',
 tonneau:'<path d="M92 19 Q130 35 168 19 Q186 80 168 141 Q130 125 92 141 Q74 80 92 19Z"/>',
 ovale:'<ellipse cx="130" cy="80" rx="49" ry="66"/>',
 coussin:'<rect x="73" y="22" width="114" height="116" rx="32"/>',
 tv:'<rect x="64" y="34" width="132" height="94" rx="30"/>',
 octogonal:'<path d="M102 20H158L190 52V108L158 140H102L70 108V52Z"/>',
 cforme:'<path d="M80 19H180Q197 18 197 36V124Q197 143 178 142H80Q69 142 69 130V30Q69 19 80 19Z"/>',
 galet:'<path d="M130 21C181 21 200 46 194 88C187 134 159 140 126 139C80 138 65 115 68 80C70 38 90 21 130 21Z"/>',
 asym:'<path d="M104 21Q170 14 182 45L195 85L185 136H87Q63 99 71 53Z"/>',
 dodeca:'<path d="M105 17H155L181 32L195 56V104L181 129L155 143H105L79 129L65 104V56L79 32Z"/>',
 integré:'<path d="M100 19H160L183 36L191 80L183 124L160 141H100L77 124L69 80L77 36Z"/>'
 };
 let straps='<rect x="112" y="0" width="36" height="23" rx="3" fill="#cbd6cb"/><rect x="112" y="137" width="36" height="23" rx="3" fill="#cbd6cb"/>';
 if(id==="integré")straps='<path d="M100 0H160L171 27H89Z M89 133H171L160 160H100Z" fill="#b4c4b5" stroke="#8fa791" stroke-width="1.5"/>';
 let smaller=(id==="rectangle"||id==="ovale")?44:47;
 return svg(straps+'<g fill="#d4ded2" stroke="'+ink+'" stroke-width="2.3">'+(shapes[id]||shapes.rond)+'</g><circle cx="130" cy="80" r="'+smaller+'" fill="#f9faf7" stroke="'+gold+'" stroke-width="1.4"/>'+dial(130,80,smaller-5)+'<rect x="188" y="73" width="8" height="15" rx="2" fill="'+gold+'"/>');
};
function handPath(id){
 const map={
 baton:'<path d="M-2 12H2V-58H-2Z" fill="#536d56"/>',
 dauphine:'<path d="M0 12L-6 1L0 -62L6 1Z" fill="#617e6a" stroke="#44654b" stroke-width="1"/>',
 feuille:'<path d="M0 13Q-15 -12 0 -61Q15 -12 0 13Z" fill="#56715f"/>',
 alpha:'<path d="M0 10L-3 -8L-9 -29L0 -62L9 -29L3 -8Z" fill="#55745c"/>',
 glaive:'<path d="M-7 13H7L9 -27L0 -65L-9 -27Z" fill="#4b6a54"/>',
 seringue:'<path d="M-5 14H5V-35H3V-62H-3V-35H-5Z" fill="#527157"/>',
 cathedrale:'<path d="M-11 10V-26L-6 -54L0 -63L6 -54L11 -26V10Z" fill="#6a836c"/><path d="M0 -58V8M-7 -27H7M-8 -12H8" stroke="#eef3e8" stroke-width="3"/>',
 breguet:'<path d="M0 13V-34" stroke="#496750" stroke-width="3"/><circle cx="0" cy="-45" r="12" fill="none" stroke="#496750" stroke-width="4"/><path d="M0 -57V-67" stroke="#496750" stroke-width="3"/>',
 lance:'<path d="M0 15L-4 -16L0 -67L4 -16Z" fill="#45644d"/>',
 mercedes:'<path d="M0 -62L-3 -15M0 -15V15" stroke="#496c54" stroke-width="6"/><circle cx="0" cy="-20" r="12" fill="#57745c"/><path d="M-12 -20H12M0 -32L-8 -12M0 -32L8 -12" stroke="#ecf3ea" stroke-width="2.5"/>',
 snowflake:'<path d="M0 13V-24M-10 -25L0 -45L10 -25L0 -5Z" fill="#506f59" stroke="#47674e" stroke-width="4"/>',
 fleche:'<path d="M-3 14H3V-25H12L0 -65L-12 -25H-3Z" fill="#57735a"/>',
 squelette:'<path d="M-9 8L-6 -25L0 -64L6 -25L9 8Z" fill="none" stroke="#536d58" stroke-width="4"/>',
 plongeuse:'<path d="M-10 12H10L10 -37L0 -64L-10 -37Z" fill="#587860" stroke="#375740" stroke-width="2"/><path d="M0 -48V-2" stroke="#e8eee4" stroke-width="5"/>'
 };
 return map[id]||map.baton;
}
function handSvg(id){
 return svg('<circle cx="130" cy="81" r="68" fill="'+light+'" stroke="#bed0be" stroke-width="2"/>'+circles(130,81,59,12,(x,y,i,a)=>'<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(i%3===0?3:2)+'" fill="'+gold+'"/>')+'<g transform="translate(130 81) rotate(-40)">'+handPath(id)+'</g><g transform="translate(130 81) rotate(78) scale(.73)">'+handPath(id)+'</g><circle cx="130" cy="81" r="4" fill="'+gold+'"/>');
}
function indexSvg(id){
 let t='';
 const roman=["XII","I","II","III","IIII","V","VI","VII","VIII","IX","X","XI"];
 t=circles(130,80,57,12,(x,y,i,a)=>{
  const angle=i*30*Math.PI/180;
  if(id==="arabes"||id==="romains")return '<text x="'+x.toFixed(1)+'" y="'+(y+4).toFixed(1)+'" text-anchor="middle" font-family="Georgia" font-size="10" fill="#637b64">'+(id==="arabes"?(i===0?12:i):roman[i])+'</text>';
  if(id==="points"||id==="lume")return '<circle cx="'+x+'" cy="'+y+'" r="'+(id==="lume"?4.4:2.8)+'" fill="'+(id==="lume"?"#c9cf9f":gold)+'"/>';
  if(id==="triangles")return '<g transform="translate('+x+' '+y+') rotate('+(i*30)+')"><path d="M0 -6L-4 5H4Z" fill="'+gold+'"/></g>';
  if(id==="diamants")return '<path d="M'+x+' '+(y-5)+'l4 5 -4 5 -4 -5Z" fill="'+gold+'"/>';
  if(id==="chemin")return '<path d="M'+x+' '+(y-6)+'v12" stroke="'+gold+'" stroke-width="2"/>';
  return '<g transform="translate('+x+' '+y+') rotate('+(i*30)+')"><rect x="-2" y="-7" width="'+(id==="baguettes"?5:3)+'" height="14" rx=".6" fill="'+gold+'"/></g>';
 });
 if(id==="sector")t+='<circle cx="130" cy="80" r="42" fill="none" stroke="'+gold+'"/><path d="M73 80H187M130 23V137" stroke="'+gold+'" opacity=".5"/>';
 if(id==="chemin")t+='<circle cx="130" cy="80" r="52" fill="none" stroke="'+gold+'" stroke-width=".7"/>';
 return svg('<circle cx="130" cy="80" r="72" fill="#fcfdf9" stroke="#b4c7b3" stroke-width="2"/>'+t+'<path d="M130 80l-10 -24 M130 80l29 -14" stroke="'+ink+'" stroke-width="3" stroke-linecap="round"/><circle cx="130" cy="80" r="3" fill="'+gold+'"/>');
}
function dialSvg(id){
 let fill="#f8f8f3",pattern="";
 if(id==="fumee")fill="#869a83";
 if(id==="email")fill="#fefdf5";
 if(id==="laque")fill="#314842";
 if(id==="soleil")pattern=circles(130,80,0,48,(x,y,i)=>'<path d="M130 80L'+(130+75*Math.cos(i*Math.PI/24))+' '+(80+75*Math.sin(i*Math.PI/24))+'" stroke="#cbd6ca" stroke-width=".7"/>');
 if(id==="vertical"||id==="horizontal")pattern=Array.from({length:32},(_,i)=>id==="vertical"?'<path d="M'+(50+i*5)+' 0V160" stroke="#cdd8cd" stroke-width=".8"/>':'<path d="M40 '+(i*5)+'H220" stroke="#cdd8cd" stroke-width=".8"/>').join("");
 if(id==="linen")pattern=Array.from({length:27},(_,i)=>'<path d="M40 '+(i*6)+'H220M'+(49+i*6)+' 0V160" stroke="#cdd5c9" stroke-width=".65"/>').join("");
 if(id==="guilloche")pattern=Array.from({length:20},(_,i)=>'<circle cx="130" cy="80" r="'+(i*4)+'" fill="none" stroke="#cbd7c5" stroke-width=".65"/>').join("");
 if(id==="grain")pattern=circles(130,80,52,88,(x,y,i)=>'<circle cx="'+(130+Math.sin(i*17)*51).toFixed(1)+'" cy="'+(80+Math.cos(i*13)*51).toFixed(1)+'" r=".8" fill="#8da28e"/>');
 if(id==="piepan")pattern='<path d="M130 16L169 41L194 80L169 120L130 144L90 120L66 80L90 41Z" stroke="#a6baaa" stroke-width="6" fill="#ecf0e6"/>';
 if(id==="sandwich")pattern=circles(130,80,53,12,(x,y)=>'<circle cx="'+x+'" cy="'+y+'" r="4.5" fill="#bcc695" stroke="#819784"/>');
 if(id==="squelette")pattern='<circle cx="112" cy="76" r="30" fill="#829d84"/><circle cx="112" cy="76" r="22" fill="none" stroke="#d0b48c" stroke-width="5"/><circle cx="152" cy="99" r="20" fill="#85968c"/><circle cx="152" cy="99" r="13" fill="none" stroke="#d0b48c" stroke-width="4"/>';
 let dark=id==="laque";
 let markers=circles(130,80,56,12,(x,y)=>'<circle cx="'+x+'" cy="'+y+'" r="2.5" fill="'+(dark?"#eee7d7":gold)+'"/>');
 return svg('<defs><clipPath id="dclip"><circle cx="130" cy="80" r="70"/></clipPath></defs><circle cx="130" cy="80" r="71" fill="'+fill+'" stroke="#b7c7b4" stroke-width="2"/><g clip-path="url(#dclip)">'+pattern+'</g>'+markers+'<path d="M130 80l-15 -31 M130 80l34 -16" stroke="'+(dark?"#dfece2":ink)+'" stroke-width="3"/><circle cx="130" cy="80" r="3" fill="'+gold+'"/>');
}
function bezelSvg(id){
 let base='<circle cx="130" cy="80" r="69" fill="#d6dfd4" stroke="#607962" stroke-width="9"/>';
 if(id==="facettes")base='<path d="M105 13H155L180 28L197 55V105L180 132L155 147H105L80 132L63 105V55L80 28Z" fill="#c6d4c6" stroke="#697c68" stroke-width="6"/>';
 let marks="";
 if(["plongee","gmt","tachy","interne"].includes(id))marks=circles(130,80,64,12,(x,y,i)=>'<circle cx="'+x+'" cy="'+y+'" r="'+(i%3===0?2.8:1.6)+'" fill="#496b56"/>');
 if(["canelee","guilloche"].includes(id))marks=circles(130,80,68,56,(x,y)=>'<circle cx="'+x+'" cy="'+y+'" r="1.5" fill="#fff"/>');
 return svg(base+marks+dial(130,80,48));
}
function crystalSvg(id){
 let round='<ellipse cx="130" cy="72" rx="67" ry="43" fill="#e4ebe6" stroke="#9cb5a5" stroke-width="3"/>';
 let profile=id==="plat"?'M64 72H196':id==="box"?'M64 73V53Q130 34 196 53V73':'M64 73Q130 '+(id==="bombe"?"5":"28")+' 196 73';
 return svg('<path d="M65 75L66 101Q130 128 195 101L195 75" fill="#d0dbd2" stroke="#7f9f8c" stroke-width="2"/>'+round+'<path d="'+profile+'" fill="none" stroke="#fdfefd" stroke-width="7" opacity=".85"/><path d="M79 80Q130 111 181 80" fill="none" stroke="'+gold+'" stroke-width="1.5"/><text x="130" y="146" text-anchor="middle" fill="#859a89" font-size="11">COUPE SIMPLIFIÉE</text>');
}
function lugSvg(id){
 let extra='<path d="M111 19L94 0M149 19L166 0M111 141L94 160M149 141L166 160" stroke="#778e77" stroke-width="8" stroke-linecap="round"/>';
 if(id==="cornesfil")extra='<path d="M108 22L100 0M152 22L160 0M108 138L100 160M152 138L160 160" stroke="'+gold+'" stroke-width="2"/>';
 if(id==="cachees"||id==="integrées"||id==="capuchon")extra='<path d="M104 18L106 0H154L156 18M104 142L106 160H154L156 142" fill="#becdbf" stroke="#738b77" stroke-width="2"/>';
 if(id==="lyre")extra='<path d="M109 23Q87 13 95 -1M151 23Q173 13 165 -1M109 137Q87 147 95 161M151 137Q173 147 165 161" fill="none" stroke="#789279" stroke-width="9"/>';
 return svg(extra+dial(130,80,58));
}
function braceletSvg(id){
 let links="";
 if(["oyster","jubilee","grainriz","integré","deployante"].includes(id))links=Array.from({length:9},(_,i)=>'<rect x="109" y="'+(i*17)+'" width="42" height="15" rx="'+(id==="grainriz"?7:2)+'" fill="'+(i%2?"#c5d2c5":"#b7c7b7")+'" stroke="#f4f7f2" stroke-width="1"/>').join("");
 else if(id==="maillemilan")links=Array.from({length:14},(_,i)=>'<path d="M112 '+(i*10)+'h36" stroke="#8aab91" stroke-width="2" stroke-dasharray="3 2"/>').join("");
 else if(id==="tropic"||id==="nato")links=Array.from({length:7},(_,i)=>'<circle cx="130" cy="'+(i*20+12)+'" r="4" fill="#d8e2d5"/>').join("");
 else links='<path d="M130 4V155" stroke="#d5dfd1" stroke-width="1"/>';
 return svg('<rect x="109" y="0" width="42" height="160" rx="8" fill="'+(id==="cuir"?"#9a8069":"#a8baa7")+'"/>'+links+'<circle cx="130" cy="80" r="37" fill="#d7e2d5" stroke="#587361" stroke-width="4"/>'+dial(130,80,28));
}
function crownSvg(id){
 let rect=id==="oignon"?'<circle cx="194" cy="80" r="17" fill="#a4b5a6" stroke="#536b57" stroke-width="3"/>':'<rect x="184" y="67" width="24" height="27" rx="'+(id==="encastree"?7:3)+'" fill="#a4b6a7" stroke="#5b775f" stroke-width="2"/>';
 if(id==="deux")rect+='<rect x="188" y="36" width="18" height="16" rx="3" fill="#9bac9a" stroke="#5b775f"/>';
 return svg('<circle cx="116" cy="80" r="59" fill="#dce6dc" stroke="#5a775f" stroke-width="3"/>'+dial(116,80,48)+rect+'<path d="M188 70V90M194 70V90M200 70V90" stroke="#dae4d9" stroke-width="1.5"/>');
}
function formSvg(type,id){
 if(type==="cases")return faceCase(id);
 if(type==="hands")return handSvg(id);
 if(type==="indices")return indexSvg(id);
 if(type==="dials")return dialSvg(id);
 if(type==="bezels")return bezelSvg(id);
 if(type==="crystals")return crystalSvg(id);
 if(type==="lugs")return lugSvg(id);
 if(type==="bracelets")return braceletSvg(id);
 if(type==="crowns")return crownSvg(id);
 return faceCase("rond");
}
function bigWatch(){
 let tick=circles(180,181,97,60,(x,y,i)=>'<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(i%5===0?2.8:1)+'" fill="'+(i%5===0?"#b79b6c":"#c2cbb9")+'"/>');
 let hands='<path d="M180 181L169 119L185 181Z" fill="#506853"/><path d="M180 181L252 144L180 186Z" fill="#506853"/><path d="M180 181L199 76" stroke="#b28b59" stroke-width="2"/><circle cx="180" cy="181" r="6" fill="#a78656"/>';
 return svg('<defs><linearGradient id="strap" x1="0" x2="1"><stop stop-color="#8f7f67"/><stop offset=".3" stop-color="#c6b398"/><stop offset=".6" stop-color="#9e896d"/><stop offset="1" stop-color="#88725c"/></linearGradient><radialGradient id="dialbg"><stop stop-color="#fdfefa"/><stop offset="1" stop-color="#e8eede"/></radialGradient></defs><rect x="133" y="-9" width="94" height="370" rx="14" fill="url(#strap)"/><path d="M145 0V340M214 0V340" stroke="#e9dcca" stroke-width="2" stroke-dasharray="4 5"/><rect x="151" y="24" width="58" height="30" rx="4" fill="#a6b6a6" stroke="#c6d3c5" stroke-width="5"/><circle cx="180" cy="181" r="132" fill="#b0c1b1" stroke="#788f7c" stroke-width="6"/><circle cx="180" cy="181" r="117" fill="url(#dialbg)" stroke="#f6faf5" stroke-width="8"/><circle cx="180" cy="181" r="108" fill="none" stroke="#9eaf9d" stroke-width="1"/>'+tick+'<text x="180" y="151" font-size="12" text-anchor="middle" letter-spacing="4" fill="#76927a">HORLOGERIE</text><text x="180" y="230" font-size="9" text-anchor="middle" letter-spacing="3" fill="#9fae9e">AUTOMATIQUE</text>'+hands+'<rect x="311" y="167" width="17" height="28" rx="4" fill="#a2b49e" stroke="#617a66" stroke-width="3"/>','0 0 360 360');
}
function renderHero(){
 $("#heroWatch").innerHTML=bigWatch();
 $("#featureHistory").innerHTML=svg('<circle cx="130" cy="80" r="65" fill="none" stroke="#b0c4b1" stroke-width="2"/>'+circles(130,80,55,12,(x,y,i)=>'<circle cx="'+x+'" cy="'+y+'" r="2.2" fill="#b18e5b"/>')+'<path d="M130 80V34M130 80L166 108" stroke="#587560" stroke-width="4"/><circle cx="130" cy="80" r="5" fill="#b18e5b"/>');
 $("#featureBrands").innerHTML=svg('<circle cx="125" cy="82" r="45" fill="#e3ece2" stroke="#748f76" stroke-width="3"/>'+circles(125,82,35,12,(x,y)=>'<circle cx="'+x+'" cy="'+y+'" r="2" fill="#a6895c"/>')+'<path d="M125 82L119 47M125 82L150 88" stroke="#60785f" stroke-width="3"/><circle cx="171" cy="42" r="23" fill="#f5f6ee" stroke="#a38b65" stroke-width="3"/><text x="171" y="48" text-anchor="middle" fill="#8f7e62" font-size="16" font-family="Georgia">S</text>');
 $("#featureForms").innerHTML='<div class="shapes-feature">'+faceCase("coussin")+'</div>';
 $("#featureAnatomy").innerHTML=svg('<circle cx="130" cy="80" r="63" fill="#dce5d9" stroke="#728a73" stroke-width="5"/><circle cx="110" cy="67" r="30" fill="none" stroke="#aa8e5f" stroke-width="5"/><circle cx="161" cy="103" r="22" fill="none" stroke="#748b75" stroke-width="6"/><circle cx="130" cy="80" r="12" fill="#eaf0e8" stroke="#8ca58e" stroke-width="3"/>'+circles(110,67,29,12,(x,y)=>'<circle cx="'+x+'" cy="'+y+'" r="2" fill="#a7895b"/>'));
}
function goPage(page){
 if(!$("#page-"+page))page="accueil";
 state.page=page;
 $$(".page").forEach(e=>e.hidden=e.id!=="page-"+page);
 $$(".navlink").forEach(e=>e.classList.toggle("active",e.dataset.go===page));
 history.replaceState(null,"","#"+page);
 window.scrollTo({top:0,behavior:"instant"});
 if(page==="histoire")renderHistory();
 if(page==="marques")renderBrands();
 if(page==="formes")renderForms();
 if(page==="anatomie")renderAnatomy();
 if(page==="sources")renderSources();
}
function chip(text,active,attr,val){return '<button type="button" class="chip'+(active?" active":"")+'" '+attr+'="'+esc(val)+'">'+esc(text)+'</button>';}
function renderHistory(){
 const filters=[["all","Tout parcourir"],["origines","Jusqu'au XVIIIe"],["1800","XIXe siècle"],["1900","XXe siècle"],["2000","XXIe siècle"]];
 $("#historyFilters").innerHTML=filters.map(x=>chip(x[1],state.history===x[0],"data-history",x[0])).join("");
 const rows=A.events.filter(x=>state.history==="all"||x.era===state.history);
 $("#historyCount").textContent=rows.length+" jalons";
 $("#historyTimeline").innerHTML=rows.map(e=>'<article class="history-item"><div><div class="history-date">'+esc(e.year)+'</div><div class="history-era">'+(e.era==="origines"?"ORIGINES":e.era==="1800"?"XIXe":e.era==="1900"?"XXe":"XXIe")+'</div></div><div class="history-body"><h3>'+esc(e.title)+'</h3><p>'+esc(e.text)+'</p>'+(e.note?'<div class="history-foot"><span class="history-tag">À NUANCER · '+esc(e.note)+'</span></div>':'')+'<div class="history-foot"><a href="'+esc(A.sources[e.src].url)+'" target="_blank" rel="noopener noreferrer">Consulter la source ↗</a></div></div></article>').join("");
}
function renderBrands(){
 const regions=["Toutes","Japon","Suisse","États-Unis","France","Allemagne","Italie","Russie"];
 $("#brandRegions").innerHTML=regions.map(x=>chip(x,state.region===x,"data-region",x)).join("");
 const query=clean($("#brandSearch").value||"");
 const matches=A.brands.filter(b=>(state.region==="Toutes"||b.region.indexOf(state.region)!==-1)&&(!query||clean([b.name,b.intro,b.story,b.tag,b.region,JSON.stringify(b.families)].join(" ")).includes(query)));
 $("#brandCount").textContent=matches.length+" maisons à découvrir";
 $("#brandGrid").innerHTML=matches.map(b=>'<button type="button" class="brand-card" data-brand="'+esc(b.id)+'"><span class="brand-top"><span class="brand-origin">'+esc(b.region.toUpperCase())+'</span><span class="brand-year">'+esc(b.since)+'</span></span><span class="brand-wordmark">'+esc(b.name)+'</span><p>'+esc(b.intro)+'</p><span class="brand-calibres"><strong>'+b.families.reduce((acc,f)=>acc+f[1].length,0)+' mouvements & références</strong> · '+b.families.length+' familles</span><span class="brand-more">Entrer dans l’histoire ↗</span></button>').join("");
}
function openBrand(id){
 const b=A.brands.find(x=>x.id===id);if(!b)return;
 const timeline='<div class="step-list">'+b.steps.map(s=>'<p><strong>'+esc(s[0])+'</strong>'+esc(s[1])+'</p>').join("")+'</div>';
 const families=b.families.map(f=>'<div class="movement-family"><h4>'+esc(f[0])+'</h4><p>'+esc(f[2])+'</p><div class="movement-list">'+f[1].map(m=>'<button type="button" class="movement-pill" data-calibre-brand="'+esc(b.id)+'" data-calibre-key="'+esc(m[0])+'"><strong>'+esc(m[0])+'</strong><small>'+esc(m[1])+'</small><small>Ouvrir la fiche ↗</small></button>').join("")+'</div></div>').join("");
 modal('<div class="modal-header"><span class="article-tag">MAISON · '+esc(b.region.toUpperCase())+' · '+esc(b.since)+'</span><h2 id="modalTitle">'+esc(b.name)+'</h2><p>'+esc(b.intro)+'</p></div><div class="modal-section"><h3>Contexte & identité</h3><p>'+esc(b.story)+'</p></div><div class="modal-section"><h3>Les grandes dates</h3>'+timeline+'</div><div class="modal-section"><h3>Familles de calibres et générations</h3><p>Repères d’apparition et de diffusion, parfois approximatifs. Chaque référence peut comporter des suffixes et des sous-versions ; la « dernière utilisation connue » exige un travail d’archives propre au modèle.</p>'+families+'</div><div class="modal-section"><h3>Pour approfondir</h3><p><a href="'+esc(A.sources[b.src].url)+'" target="_blank" rel="noopener noreferrer">Source historique de référence ↗</a></p></div>');
}
function renderForms(){
 $("#formTabs").innerHTML=A.formOrder.map(key=>'<button type="button" class="category-tab'+(state.form===key?" active":"")+'" data-form="'+key+'">'+esc(A.forms[key].title)+'</button>').join("");
 const data=A.forms[state.form];
 $("#formEyebrow").textContent=data.sub;
 $("#formTitle").textContent=data.title;
 $("#formDesc").textContent=data.desc;
 $("#formCount").textContent=data.items.length+" formes & variantes";
 $("#formGrid").innerHTML=data.items.map(x=>'<button type="button" class="form-card" data-form-id="'+esc(x[0])+'"><div class="form-art">'+formSvg(state.form,x[0])+'</div><div class="form-info"><strong>'+esc(x[1])+'</strong><small>'+esc(x[2])+'</small><p>'+esc(x[4])+'</p></div></button>').join("");
 $("#eraTimeline").innerHTML=A.eras.map(era=>'<div class="era-group"><div class="era-year">'+esc(era)+'</div><div class="era-entries">'+data.items.filter(x=>x[3]===era).map(x=>'<button type="button" class="era-pill" data-form-id="'+esc(x[0])+'">'+esc(x[1])+'</button>').join("")+'</div></div>').join("");
}
function openForm(id){
 const d=A.forms[state.form],x=d.items.find(q=>q[0]===id);if(!x)return;
 modal('<div class="modal-header"><span class="article-tag">'+esc(d.sub.toUpperCase())+'</span><h2 id="modalTitle">'+esc(x[1])+'</h2><p>'+esc(x[4])+'</p></div><div class="modal-art">'+formSvg(state.form,id)+'</div><div class="modal-section"><h3>Comment le reconnaître ?</h3><p>'+esc(x[4])+'</p></div><div class="modal-section"><h3>Dans quelles époques ?</h3><p><strong>'+esc(x[2])+'</strong>. Cette période signale une diffusion ou un regain d’intérêt ; la forme peut exister avant et après.</p></div><div class="modal-section"><h3>Un détail à connaître</h3><p class="tip">'+esc(x[5])+'</p></div><div class="modal-section"><h3>Pour identifier une montre</h3><p>Croisez cet indice avec le mouvement, les inscriptions, le fond, le cadran et les détails de construction. Une forme ne suffit pas à dater ni à certifier l’authenticité.</p></div>');
}
function openCalibre(brandId,key){
 const b=A.brands.find(x=>x.id===brandId);if(!b)return;
 const family=b.families.find(f=>f[1].some(x=>x[0]===key));
 const movement=family&&family[1].find(x=>x[0]===key);
 const info=(A.calibres||[]).find(x=>x.brand===brandId&&x.key===key);
 const period=info?info.period:(movement?movement[1]:"À documenter");
 const source=info&&info.url?info.url:A.sources[b.src].url;
 const body=info
 ?'<div class="modal-section"><h3>Origines & filiation</h3><p>'+esc(info.story)+'</p></div><div class="modal-section"><h3>Architecture & fonctions</h3><p>'+esc(info.mechanics)+'</p></div><div class="modal-section"><h3>Attention aux variantes</h3><p class="tip">'+esc(info.warning)+'</p></div>'
 :'<div class="modal-section"><h3>Repères historiques disponibles</h3><p>'+esc(family?family[2]:"Famille à préciser.")+'</p><p>Cette référence figure dans la chronologie de la maison, mais nous ne disposons pas encore d’une fiche technique individuelle suffisamment recoupée pour publier une date de fin, un nombre de rubis, une fréquence ou une liste de pièces compatibles. Ces informations restent donc volontairement ouvertes.</p></div>';
 modal('<div class="modal-header"><span class="article-tag">'+esc(b.name.toUpperCase())+' · FICHE CALIBRE</span><h2 id="modalTitle">'+esc(key)+'</h2><p>Repère chronologique : <strong>'+esc(period)+'</strong>.</p></div>'+body+'<div class="modal-section"><h3>Recherche documentaire</h3><p><a href="'+esc(source)+'" target="_blank" rel="noopener noreferrer">Consulter une référence ↗</a></p><p>Pour identifier un calibre, relever son marquage exact, son suffixe, le type de calendrier et, pour les pièces détachées, les références constructeur.</p></div><button type="button" class="primary" data-return-brand="'+esc(brandId)+'">← Retour à '+esc(b.name)+'</button>');
}
function modal(html){
 $("#modalContent").innerHTML=html;
 $("#detailModal").hidden=false;document.body.style.overflow="hidden";$("#modalClose").focus();
}
function closeModal(){ $("#detailModal").hidden=true;document.body.style.overflow=""; }
function gear(cx,cy,r,n,stroke){
 let ring='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#d4c6a5" stroke="'+stroke+'" stroke-width="3"/><circle cx="'+cx+'" cy="'+cy+'" r="'+(r*.64)+'" fill="#e3e9df" stroke="'+stroke+'" stroke-width="1.3"/><circle cx="'+cx+'" cy="'+cy+'" r="5" fill="'+stroke+'"/>';
 ring+=circles(cx,cy,r-2,n,(x,y,i,a)=>'<path d="M'+x.toFixed(1)+' '+y.toFixed(1)+'L'+(cx+(r+6)*Math.cos(a)).toFixed(1)+' '+(cy+(r+6)*Math.sin(a)).toFixed(1)+'" stroke="'+stroke+'" stroke-width="2"/>');
 ring+=circles(cx,cy,r*.45,5,(x,y)=>'<path d="M'+cx+' '+cy+'L'+x.toFixed(1)+' '+y.toFixed(1)+'" stroke="'+stroke+'" stroke-width="3"/>');
 return ring;
}
function spiral(cx,cy,r,turns=5){
 let p=[];for(let i=0;i<=160;i++){let t=i/160,angle=t*Math.PI*2*turns,rad=2+r*t;p.push((i?"L":"M")+(cx+rad*Math.cos(angle)).toFixed(1)+" "+(cy+rad*Math.sin(angle)).toFixed(1));}return '<path d="'+p.join("")+'" fill="none" stroke="#8c714d" stroke-width="1.8"/>';
}
const outsideTargets={boitier:[352,293],lunette:[348,183],verre:[250,185],cadran:[222,248],index:[252,176],heure:[253,281],minute:[275,248],seconde:[250,294],couronne:[416,289],cornes:[203,136],bracelet:[252,528],fond:[334,365]};
const insideTargets={rotor:[245,123],barillet:[344,208],rochet:[336,190],cliquet:[379,202],rouecentre:[270,282],rouetierce:[332,310],roueseconde:[245,346],echappement:[350,369],ancre:[327,414],balancier:[200,412],spiral:[200,412],antichoc:[201,413],pont:[263,236],platine:[111,287],rubis:[315,303],tige:[441,292],miseheure:[299,354],incabloc:[213,431]};
function hotSpots(view){
 const parts=A.parts[view],tar=view==="outside"?outsideTargets:insideTargets;
 return parts.map((p,i)=>{
 const x=p[2],y=p[3],target=tar[p[0]];
 const active=state.part===p[0];
 return '<g class="hotspot'+(active?" active":"")+'" data-part="'+p[0]+'" role="button" tabindex="0" aria-label="'+esc(p[1])+'"><path d="M'+x+' '+y+'L'+target[0]+' '+target[1]+'" stroke="'+(active?"#718b6b":"#9cad9c")+'" stroke-width="1" opacity=".65" fill="none" pointer-events="none"/><circle cx="'+x+'" cy="'+y+'" r="15"/><text x="'+x+'" y="'+(y+1)+'">'+(i+1)+'</text></g>';
 }).join("");
}
function outsideSvg(){
 const cx=256,cy=290;
 let marks=circles(cx,cy,116,12,(x,y,i)=>'<g transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+') rotate('+(i*30)+')"><rect x="-2" y="-7" width="4" height="14" rx="1" fill="#b0996b"/></g>');
 return svg('<defs><linearGradient id="oSteel" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#b7c8b8"/><stop offset=".45" stop-color="#edf1e9"/><stop offset="1" stop-color="#93a995"/></linearGradient><radialGradient id="odial"><stop stop-color="#fefefa"/><stop offset="1" stop-color="#ebefe4"/></radialGradient></defs><rect x="206" y="0" width="100" height="590" rx="18" fill="#bca98e" stroke="#9f886b" stroke-width="3"/><path d="M215 0V590M297 0V590" stroke="#eee1cd" stroke-width="2" stroke-dasharray="4 7"/><rect x="204" y="110" width="105" height="29" fill="#a9bdac" stroke="#839d88" stroke-width="3"/><rect x="204" y="442" width="105" height="29" fill="#a9bdac" stroke="#839d88" stroke-width="3"/><circle cx="'+cx+'" cy="'+cy+'" r="157" fill="url(#oSteel)" stroke="#78947b" stroke-width="5"/><circle cx="'+cx+'" cy="'+cy+'" r="137" fill="url(#odial)" stroke="#d4dfd0" stroke-width="9"/><circle cx="'+cx+'" cy="'+cy+'" r="126" fill="none" stroke="#b5c6b3" stroke-width="1"/>'+marks+'<text x="256" y="237" text-anchor="middle" letter-spacing="3" font-size="15" fill="#677f68">HORLOGERIE</text><text x="256" y="359" text-anchor="middle" letter-spacing="2" font-size="10" fill="#8ca08e">AUTOMATIC</text><path d="M256 290L246 228L263 290Z" fill="#56755b"/><path d="M256 290L344 257L260 298Z" fill="#56755b"/><path d="M256 290L285 182" stroke="#b38e5a" stroke-width="2.2"/><circle cx="256" cy="290" r="5" fill="#b38e5a"/><rect x="412" y="274" width="21" height="33" rx="5" fill="#a8b8a5" stroke="#637c67" stroke-width="3"/>'+hotSpots("outside"),"0 0 520 590");
}
function insideSvg(){
 let rt=state.rotor?'<g opacity=".77"><path d="M126 115A180 180 0 0 1 388 239L305 243Q290 203 244 191L208 145Z" fill="#b9c7b9" stroke="#7f9984" stroke-width="6"/><circle cx="260" cy="245" r="22" fill="#cfdcce" stroke="#69826d" stroke-width="5"/><path d="M145 119Q259 70 370 194" stroke="#e9eee7" stroke-width="5" fill="none"/></g>':'';
 let jewel=(x,y)=>'<circle cx="'+x+'" cy="'+y+'" r="8" fill="#b46c67" stroke="#f2d5cf" stroke-width="3"/>';
 return svg('<circle cx="260" cy="288" r="209" fill="#dde7dc" stroke="#97ad9b" stroke-width="12"/><circle cx="260" cy="288" r="189" fill="#d0dfcf" stroke="#9db3a0" stroke-width="2"/><path d="M195 148Q260 125 328 153L351 231L291 265L212 245Z" fill="#bdcdbb" stroke="#79947d" stroke-width="4"/>'+gear(334,210,48,20,"#9c835a")+gear(274,291,37,18,"#9b825c")+gear(338,310,30,15,"#977c55")+gear(248,355,26,13,"#b09063")+gear(350,366,24,14,"#7f9b83")+'<path d="M350 385Q329 400 318 423L340 433L363 403Z" fill="#b9caba" stroke="#638065" stroke-width="3"/><circle cx="198" cy="412" r="64" fill="#e7ece4" stroke="#749177" stroke-width="9"/><circle cx="198" cy="412" r="49" fill="none" stroke="#c1ac81" stroke-width="8"/>'+spiral(198,412,42)+jewel(198,412)+jewel(274,291)+jewel(338,310)+jewel(350,366)+'<path d="M441 292H486" stroke="#899f8b" stroke-width="10"/><path d="M417 272Q439 260 446 285" stroke="#95ad97" stroke-width="8" fill="none"/>'+rt+hotSpots("inside"),"0 0 520 590");
}
function renderAnatomy(){
 const v=state.view,parts=A.parts[v];
 $$(".segmented button").forEach(e=>e.classList.toggle("active",e.dataset.view===v));
 $("#rotorLabel").hidden=v!=="inside";
 $("#rotorToggle").checked=state.rotor;
 $("#anatomyCaption").textContent=v==="outside"?"VUE DE FACE · MONTRE MÉCANIQUE SIMPLE":"VUE SCHÉMATIQUE · MOUVEMENT AUTOMATIQUE";
 $("#anatomyCanvas").innerHTML=v==="outside"?outsideSvg():insideSvg();
 $("#anatomyLegend").innerHTML=parts.map((p,i)=>'<button type="button" data-part="'+p[0]+'" class="'+(p[0]===state.part?"active":"")+'">'+(i+1)+". "+esc(p[1])+'</button>').join("");
 renderPart();
}
function renderPart(){
 const parts=A.parts[state.view],p=parts.find(p=>p[0]===state.part)||parts[0];
 $("#partCategory").textContent="REPÈRE "+String(parts.indexOf(p)+1).padStart(2,"0")+" / "+(state.view==="outside"?"HABILLAGE":"MÉCANIQUE");
 $("#partTitle").textContent=p[1];$("#partIntro").textContent=p[4];
 $("#partDetails").innerHTML='<div class="part-section"><h3>À quoi sert cette pièce ?</h3><p>'+esc(p[5])+'</p></div><div class="part-section"><h3>Pour apprendre à l’identifier</h3><p>'+esc(p[6])+'</p></div><div class="part-section"><h3>Un point à connaître</h3><p>'+esc(p[7])+'</p></div>';
 $$(".hotspot").forEach(e=>e.classList.toggle("active",e.dataset.part===p[0]));
 $$("#anatomyLegend button").forEach(e=>e.classList.toggle("active",e.dataset.part===p[0]));
}
function renderSources(){
 $("#sourceList").innerHTML=A.sources.map((s,i)=>'<a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+String(i+1).padStart(2,"0")+" · "+esc(s.name)+' ↗</a>').join("");
}
function setSearch(q){
 const query=clean(q.trim());if(!query){$("#searchResults").innerHTML='<div class="empty">Saisissez un mot ou un calibre pour parcourir l’atlas.</div>';return;}
 let hits=[];
 A.brands.forEach(b=>{if(clean(b.name+" "+b.intro+" "+b.tag+" "+JSON.stringify(b.families)).includes(query))hits.push({name:b.name,sub:"MAISON & CALIBRES",page:"marques",brand:b.id});});
 A.formOrder.forEach(k=>A.forms[k].items.forEach(item=>{if(clean(item.join(" ")).includes(query))hits.push({name:item[1],sub:A.forms[k].title.toUpperCase(),page:"formes",form:k,id:item[0]});}));
 A.events.forEach(e=>{if(clean(e.year+" "+e.title+" "+e.text).includes(query))hits.push({name:e.year+" · "+e.title,sub:"HISTOIRE",page:"histoire"});});
 $("#searchResults").innerHTML=hits.length?hits.slice(0,22).map(h=>'<button type="button" class="search-result" data-search-go="'+h.page+'" data-search-brand="'+(h.brand||"")+'" data-search-form="'+(h.form||"")+'" data-search-id="'+(h.id||"")+'"><small>'+esc(h.sub)+'</small>'+esc(h.name)+'</button>').join(""):'<p class="timeline-empty">Aucun résultat. Essayez un autre nom ou une famille de mouvement.</p>';
}
let installPrompt=null;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installPrompt=e;$("#installButton").hidden=false;});
$("#installButton").addEventListener("click",async()=>{if(!installPrompt)return;installPrompt.prompt();try{await installPrompt.userChoice;}catch(e){} installPrompt=null;$("#installButton").hidden=true;});
window.addEventListener("appinstalled",()=>{$("#installButton").hidden=true;installPrompt=null;});
$("#searchToggle").addEventListener("click",()=>{$("#searchBar").hidden=!$("#searchBar").hidden;if(!$("#searchBar").hidden){$("#globalSearch").focus();setSearch($("#globalSearch").value);}});
$("#searchClose").addEventListener("click",()=>{$("#searchBar").hidden=true;});
$("#globalSearch").addEventListener("input",e=>setSearch(e.target.value));
$("#brandSearch").addEventListener("input",renderBrands);
$("#rotorToggle").addEventListener("change",e=>{state.rotor=e.target.checked;renderAnatomy();});
$("#modalClose").addEventListener("click",closeModal);
document.addEventListener("click",e=>{
 if(e.target.closest("[data-close-modal]")){closeModal();return;}
 const to=e.target.closest("[data-go]");if(to){goPage(to.dataset.go);return;}
 const hf=e.target.closest("[data-history]");if(hf){state.history=hf.dataset.history;renderHistory();return;}
 const region=e.target.closest("[data-region]");if(region){state.region=region.dataset.region;renderBrands();return;}
 const cal=e.target.closest("[data-calibre-key]");if(cal){openCalibre(cal.dataset.calibreBrand,cal.dataset.calibreKey);return;}
 const back=e.target.closest("[data-return-brand]");if(back){openBrand(back.dataset.returnBrand);return;}
 const brand=e.target.closest("[data-brand]");if(brand){openBrand(brand.dataset.brand);return;}
 const f=e.target.closest("[data-form]");if(f){state.form=f.dataset.form;renderForms();return;}
 const fid=e.target.closest("[data-form-id]");if(fid){openForm(fid.dataset.formId);return;}
 const v=e.target.closest("[data-view]");if(v){state.view=v.dataset.view;state.part=A.parts[state.view][0][0];renderAnatomy();return;}
 const p=e.target.closest("[data-part]");if(p){state.part=p.dataset.part;renderPart();return;}
 const s=e.target.closest("[data-search-go]");if(s){goPage(s.dataset.searchGo);if(s.dataset.searchForm){state.form=s.dataset.searchForm;renderForms();if(s.dataset.searchId)openForm(s.dataset.searchId);}if(s.dataset.searchBrand)openBrand(s.dataset.searchBrand);$("#searchBar").hidden=true;return;}
});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#detailModal").hidden)closeModal();if((e.key==="Enter"||e.key===" ")&&e.target.classList.contains("hotspot")){e.preventDefault();state.part=e.target.dataset.part;renderPart();}});
window.addEventListener("hashchange",()=>{if($("#detailModal").hidden)goPage(location.hash.slice(1)||"accueil");});
renderHero();renderSources();renderHistory();renderBrands();renderForms();renderAnatomy();goPage(location.hash.slice(1)||"accueil");
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));}
})();