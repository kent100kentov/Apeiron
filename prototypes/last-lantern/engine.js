(function(root){
'use strict';
const VERSION=1, NAMES=['quay','mira','tower','willow'];
function initial(seed){return {version:VERSION,seed:seed||24019,rng:seed||24019,turn:0,departed:false,location:'quay',order:NAMES.slice(),oil:1,rope:1,wood:0,tool:false,beacon:false,medicine:false,wet:false,delivered:false,bridge:false,bridgeKind:null,lens:false,aligned:false,pocketDark:false,pocketSeen:false,pocket:null,folds:0,ending:null,log:[{key:'arrival',turn:0}],lastDice:[],seen:{}};}
const clone=x=>JSON.parse(JSON.stringify(x));
function die(s){for(;;){let x=s.rng|0;x^=x<<13;x^=x>>>17;x^=x<<5;s.rng=x>>>0;if(s.rng<4294967292)return 1+(s.rng%6);}}
function deadline(s){return s.beacon?12:8;}
function boatHere(s){return !s.departed&&s.turn<deadline(s);}
function neighbors(s){if(s.location==='bank')return s.bridge?['willow']:[];const i=s.order.indexOf(s.location);return [s.order[(i+3)%4],s.order[(i+1)%4]];}
function beam(p,phase){const x=p%4,y=Math.floor(p/4);return phase%2===0?y===1:x===1;}
function pocketMoves(s){const p=s.pocket;if(!p)return[];const x=p.pos%4,y=Math.floor(p.pos/4);return [[x-1,y],[x+1,y],[x,y-1],[x,y+1]].filter(q=>q[0]>=0&&q[0]<4&&q[1]>=0&&q[1]<4).map(q=>q[1]*4+q[0]).filter(n=>n!==5&&n!==10&&n!==4&&!beam(n,p.phase));}
function action(id,extra){return Object.assign({id:id},extra||{});}
function legal(s){
 if(s.ending)return[];
 if(s.pocket){const a=pocketMoves(s).map(n=>action('step',{to:n}));a.push(action('wait'));
  if(s.pocket.pos===3&&!s.lens&&!s.aligned){a.push(action('takeLens'));if(s.beacon)a.push(action('align'));}
  if(s.pocket.pos===12)a.push(action('leavePocket'));
  return a;}
 let a=neighbors(s).map(to=>action('move',{to:to}));
 if(s.location==='quay'){if(s.medicine&&!s.wet&&!s.delivered)a.push(action('deliver'));if(s.delivered&&boatHere(s))a.push(action('sail'));a.push(action('talkBoat'));}
 if(s.location==='mira'){if(s.oil&&!s.wood)a.push(action('tradeOil'));if(!s.tool&&s.rope)a.push(action('borrowTool'));if(s.medicine&&s.wet)a.push(action('dry'));a.push(action('talkMira'));}
 if(s.location==='tower'){if(!s.beacon&&s.oil)a.push(action('light'));if(s.beacon&&s.folds<3)a.push(action('fold'));a.push(action('lookTower'));}
 if(s.location==='willow'){
  if(!s.medicine&&!s.delivered){if(s.rope)a.push(action('rescue'));a.push(action('risk'));}
  if(s.wood&&!s.bridge)a.push(action('repair'));
  if(s.tool&&!s.bridge)a.push(action('toolBridge'));
  if(s.lens&&!s.bridge)a.push(action('lensBridge'));
  if(s.bridge)a.push(action('cross'));
  if(s.beacon||s.rope||s.pocketSeen)a.push(action('descend'));
  a.push(action('lookWillow'));
 }
 return a;
}
function equals(a,b){return a.id===b.id&&a.to===b.to;}
function apply(state,cmd){
 if(!cmd||!legal(state).some(a=>equals(a,cmd)))throw Error('Illegal action');
 const s=clone(state);s.lastDice=[];let tick=true,key=cmd.id;
 switch(cmd.id){
 case'move':s.location=cmd.to;key='move';break;
 case'talkBoat':case'talkMira':case'lookTower':case'lookWillow':tick=false;s.seen[cmd.id]=true;break;
 case'tradeOil':s.oil--;s.wood++;break;
 case'borrowTool':s.rope--;s.tool=true;break;
 case'dry':s.wet=false;break;
 case'light':s.oil--;s.beacon=true;break;
 case'fold':{const r=s.order.slice(1);r.unshift(r.pop());s.order=[s.order[0]].concat(r);s.folds++;break;}
 case'rescue':s.rope--;s.medicine=true;break;
 case'risk':s.lastDice=[die(s),die(s)];s.medicine=true;s.wet=s.lastDice[0]+s.lastDice[1]<7;key=s.wet?'riskWet':'riskDry';break;
 case'deliver':s.delivered=true;s.medicine=false;break;
 case'repair':s.wood--;s.bridge=true;s.bridgeKind='wood';break;
 case'toolBridge':s.tool=false;s.bridge=true;s.bridgeKind='detour';break;
 case'lensBridge':s.lens=false;s.bridge=true;s.bridgeKind='shadow';break;
 case'descend':if(!s.pocketSeen&&!s.beacon)s.rope--;s.pocketSeen=true;s.pocket={pos:12,phase:0,moves:0};break;
 case'step':s.pocket.pos=cmd.to;s.pocket.phase++;s.pocket.moves++;tick=false;break;
 case'wait':s.pocket.phase++;s.pocket.moves++;tick=false;break;
 case'takeLens':s.lens=true;s.pocketDark=true;s.pocket.phase++;s.pocket.moves++;tick=false;break;
 case'align':s.aligned=true;s.bridge=true;s.bridgeKind='roots';s.pocket.phase++;s.pocket.moves++;tick=false;break;
 case'leavePocket':s.pocket=null;break;
 case'sail':s.location='bank';s.ending='boat';break;
 case'cross':s.location='bank';s.ending=s.bridgeKind;break;
 }
 if(tick)s.turn++;
 if(cmd.id!=='step'&&cmd.id!=='wait')s.log.push({key:key,turn:s.turn,to:cmd.to||null});
 if(s.log.length>60)s.log=s.log.slice(-60);
 if(boatHere(state)&&s.turn>=deadline(s)&&!s.ending){s.departed=true;s.log.push({key:'boatLeaves',turn:s.turn});}
 return s;
}
function restore(text){const s=JSON.parse(text);if(s.version!==VERSION||!NAMES.includes(s.location)&&s.location!=='bank'||!Number.isInteger(s.turn)||s.turn<0)throw Error('Invalid save');if(!Array.isArray(s.order)||s.order.length!==4||new Set(s.order).size!==4||s.order.some(x=>!NAMES.includes(x)))throw Error('Invalid map');for(const k of ['oil','rope','wood'])if(!Number.isInteger(s[k])||s[k]<0)throw Error('Invalid inventory');if(s.pocket&&(!Number.isInteger(s.pocket.pos)||s.pocket.pos<0||s.pocket.pos>15))throw Error('Invalid pocket');return s;}
root.Apeiron={VERSION:VERSION,initial:initial,legal:legal,apply:apply,restore:restore,neighbors:neighbors,deadline:deadline,boatHere:boatHere,beam:beam,pocketMoves:pocketMoves};
})(typeof window==='undefined'?globalThis:window);
