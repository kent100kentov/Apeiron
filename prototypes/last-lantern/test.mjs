import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const sandbox={};vm.createContext(sandbox);vm.runInContext(fs.readFileSync(new URL('./engine.js',import.meta.url),'utf8'),sandbox);const E=sandbox.Apeiron;
let checks=0;
function doIt(s,id,to){const old=JSON.stringify(s);const out=E.apply(s,{id,to});assert.equal(JSON.stringify(s),old);checks++;return out;}
function run(actions){let s=E.initial();for(const a of actions)s=doIt(s,a[0],a[1]);return s;}
function travelPocket(s,target){const queue=[{s,path:[]}],seen=new Set();while(queue.length){const q=queue.shift();if(q.s.pocket.pos===target){for(const a of q.path)s=doIt(s,a.id,a.to);return s;}const key=q.s.pocket.pos+':'+q.s.pocket.phase%2;if(seen.has(key))continue;seen.add(key);for(const a of E.legal(q.s).filter(x=>x.id==='step'||x.id==='wait'))queue.push({s:E.apply(q.s,a),path:q.path.concat(a)});}throw Error('Pocket target unreachable '+target);}
const wood=run([['move','mira'],['tradeOil'],['move','tower'],['move','willow'],['repair'],['cross']]);assert.equal(wood.ending,'wood');assert.equal(wood.oil,0);assert.equal(wood.wood,0);
const detour=run([['move','mira'],['borrowTool'],['move','tower'],['move','willow'],['toolBridge'],['cross']]);assert.equal(detour.ending,'detour');assert.equal(detour.rope,0);assert.equal(detour.tool,false);
const boat=run([['move','willow'],['rescue'],['move','quay'],['deliver'],['sail']]);assert.equal(boat.ending,'boat');assert.equal(boat.delivered,true);
let roots=run([['move','willow'],['move','tower'],['light'],['move','willow'],['descend']]);roots=travelPocket(roots,3);roots=doIt(roots,'align');roots=travelPocket(roots,12);roots=doIt(roots,'leavePocket');assert.equal(roots.bridge,true);assert.equal(roots.pocketDark,false);roots=doIt(roots,'cross');assert.equal(roots.ending,'roots');
let shadow=run([['move','willow'],['descend']]);shadow=travelPocket(shadow,3);shadow=doIt(shadow,'takeLens');shadow=travelPocket(shadow,12);shadow=doIt(shadow,'leavePocket');assert.equal(shadow.pocketDark,true);shadow=doIt(shadow,'lensBridge');assert.equal(shadow.lens,false);shadow=doIt(shadow,'cross');assert.equal(shadow.ending,'shadow');
let folded=run([['move','mira'],['move','tower'],['light']]);const before=JSON.stringify(folded.order);for(let i=0;i<3;i++)folded=doIt(folded,'fold');assert.equal(JSON.stringify(folded.order),before);assert.equal(folded.beacon,true);assert(!E.legal(folded).some(a=>a.id==='fold'));
let missed=E.initial();for(let i=0;i<8;i++)missed=doIt(missed,'move',i%2?'quay':'mira');assert.equal(E.boatHere(missed),false);assert(E.legal(missed).length>0);assert(missed.log.some(e=>e.key==='boatLeaves'));
let late=doIt(doIt(doIt(missed,'move','mira'),'move','tower'),'light');assert.equal(E.boatHere(late),false);
let long=run([['move','mira'],['move','tower'],['light']]);assert.equal(E.deadline(long),12);
for(const save of [wood,detour,boat,roots,shadow,folded,missed])assert.equal(JSON.stringify(E.restore(JSON.stringify(save))),JSON.stringify(save));
assert.throws(()=>E.restore('{"version":99}'));
const start=E.initial(),saved=JSON.stringify(start);assert.throws(()=>E.apply(start,{id:'sail'}));assert.equal(JSON.stringify(start),saved);
const riskSetup=[['move','willow'],['risk']];assert.equal(JSON.stringify(run(riskSetup)),JSON.stringify(run(riskSetup)));
// Explore legal choices across many seeds, preserving ownership-like inventory bounds.
for(let seed=1;seed<=30;seed++){let s=E.initial(seed);for(let i=0;i<70&&!s.ending;i++){const opts=E.legal(s);assert(opts.length);const a=opts[(seed+i*13)%opts.length];s=doIt(s,a.id,a.to);for(const k of ['oil','rope','wood'])assert(Number.isInteger(s[k])&&s[k]>=0);assert(new Set(s.order).size===4);if(s.pocket)assert(s.pocket.pos>=0&&s.pocket.pos<16);}}
const report={version:'0.1.0',endings:['boat','wood','detour','roots','shadow'],immutableTransitionsChecked:checks,pocketRoutes:'PASS',outerInnerInfluence:'PASS',threeFoldsRestoreOrder:'PASS',persistentStateRoundTrip:'PASS',missedBoatRecoveryOptions:'PASS',repeatableDice:'PASS',illegalActionAtomic:'PASS',seedsExplored:30,limitations:['short authored demo, not the final general engine','single inner world, not unlimited depth','no native iOS Safari device test','game balance requires human playtests']};
fs.writeFileSync(new URL('./TEST-RESULTS.json',import.meta.url),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
