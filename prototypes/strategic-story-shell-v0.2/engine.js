/* Apeiron Story Test v0.2 — pure deterministic finite chapter; no inherited code. */
(function(root){
'use strict';
const VERSION = 2;
const TRANSITIONS = Object.freeze({
  council:['giveWater','giveGrain','holdCouncil'],
  archive:['inspectSeal','hearDepth','questionMap'],
  treaty:['cityControl','sharedPact','deepFreedom','refuseDeal'],
  end:[]
});
function initial(){return {version:VERSION,stage:'council',turn:0,priority:null,evidence:null,depthKnown:false,ending:null,commands:[],events:[]};}
function legal(s){
  if(!s || s.version!==VERSION || !TRANSITIONS[s.stage]) return [];
  const all=TRANSITIONS[s.stage];
  if(s.stage!=='treaty')return all.slice();
  return all.filter(id => id!=='deepFreedom'||s.depthKnown);
}
function apply(old,id){
  if(typeof id!=='string'||!legal(old).includes(id))throw Error('Illegal action');
  const s={...old,commands:old.commands.slice(),events:old.events.slice()};
  if(s.stage==='council'){
    s.priority=id==='giveWater'?'water':id==='giveGrain'?'grain':'none';
    s.stage='archive';
  } else if(s.stage==='archive'){
    s.evidence=id==='inspectSeal'?'seal':id==='hearDepth'?'witness':'map';
    s.depthKnown=id==='hearDepth';
    s.stage='treaty';
  } else if(s.stage==='treaty'){
    s.ending={cityControl:'city',sharedPact:'shared',deepFreedom:'depth',refuseDeal:'unresolved'}[id];
    s.stage='end';
  }
  s.turn++;
  s.commands.push(id);
  s.events.push({turn:s.turn,id});
  return s;
}
function serialize(s){return JSON.stringify({version:VERSION,commands:s.commands});}
function restore(text){
  if(!text)return initial();
  const p=JSON.parse(text);
  if(!p||p.version!==VERSION||!Array.isArray(p.commands)||p.commands.length>3||p.commands.some(x=>typeof x!=='string'))throw Error('Invalid save');
  return p.commands.reduce((s,id)=>apply(s,id),initial());
}
root.ApeironStory={VERSION,initial,legal,apply,serialize,restore};
if(typeof module!=='undefined' && module.exports)module.exports=root.ApeironStory;
})(typeof window!=='undefined'?window:globalThis);
