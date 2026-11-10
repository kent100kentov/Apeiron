'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const parent=path.resolve(__dirname,'..');
const target=fs.existsSync(path.join(parent,'engine.js'))?path.join(parent,'engine.js'):path.join(parent,'apeiron-story','engine.js');
const E=require(target);
test('three decisions end in distinct stable endings',()=>{
const endings=new Set();
for(const first of E.legal(E.initial()))for(const second of E.legal(E.apply(E.initial(),first))){
 const a=E.apply(E.apply(E.initial(),first),second);
 for(const third of E.legal(a)){
  const original=JSON.stringify(a),end=E.apply(a,third);
  assert.equal(JSON.stringify(a),original);
  assert.equal(end.stage,'end');assert.equal(E.legal(end).length,0);
  assert.equal(E.serialize(E.restore(E.serialize(end))),E.serialize(end));
  assert.deepEqual(E.restore(E.serialize(end)),end);
  assert.equal(end.commands.length,3);assert.equal(end.events.length,3);
  if(third==='deepFreedom')assert.equal(end.depthKnown,true);
  endings.add(end.ending);
 }
}
assert.deepEqual([...endings].sort(),['city','depth','shared','unresolved']);
});
test('illegal commands, corrupted saves and impossible branch are rejected',()=>{
assert.throws(()=>E.apply(E.initial(),'deepFreedom'));
assert.throws(()=>E.restore('{"version":2,"commands":["giveWater","inspectSeal","deepFreedom"]}'));
assert.throws(()=>E.restore('{"version":2,"commands":["giveWater","questionMap","sharedPact","refuseDeal"]}'));
assert.throws(()=>E.restore('{"version":999,"commands":[]}'));
assert.deepEqual(E.restore(null),E.initial());
});
