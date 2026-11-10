(function(){
'use strict';
const E=window.ApeironStory, KEY='apeiron.storytest.v2', LANGKEY='apeiron.storytest.lang';
let s,language='uk';
try{language=localStorage.getItem(LANGKEY)==='en'?'en':'uk';s=E.restore(localStorage.getItem(KEY));}catch(err){s=E.initial();}
const D={
uk:{
sub:'Історія, що залежить від рішень',worldEyebrow:'Мапа / зв’язки між світами',worldTitle:'Три світи. Один шлях.',worldClaim:'Один поворот поверхні з’єднує місто з водою або з урожаєм. Але не з обома одночасно.',
city:'Місто',terrace:'Тераси',tower:'Вежа',depth:'Глибини',center:'Місце рішення',food:'Зерно',water:'Вода',hidden:'Невідомий шлях',known:'Відомий шлях',
mapNote:'Суцільна лінія — чинний зв’язок. Пунктир — можливість, але не відкритий шлях.',routeLabel:'Поверхневий шлях',rightsLabel:'Право керування',routeNone:'Не визначено',routeWater:'Місто — Вежа',routeGrain:'Місто — Тераси',rightNone:'Не вирішено',rightCity:'Міська варта',rightShared:'Спільна угода',rightDepth:'Незалежні Глибини',rightUnresolved:'Тимчасове рішення',
chapter:'РОЗДІЛ I / ПРАВО НА ШЛЯХ',turn:'Рішення',choice:'Твоє рішення',journal:'Хроніка рішень',restart:'Почати нове проходження? Попередній вибір буде втрачено.',saved:'Збережено локально',notSaved:'Браузер не зберіг прогрес',version:'СТОРІТЕЛІНГ-ТЕСТ 0.2 · UA / EN',foot:'Окрема сюжетна проба, не канон Apeiron. Без мережевих ресурсів та серверного збереження.',again:'Зіграти інший шлях',
scenes:{
council:{title:'Дві однакові печатки',speaker:'Лада',role:'Доглядачка міської мапи',body:'Уранці до міста прибули два посланці. Один прийшов від Вежі, другий — з Терас. Вони не знайомі, але обидва тримають однакові ключі.\n\n— Місто може з’єднатися з водою або з зерном, — каже Лада. — Повернути поверхню для обох одразу неможливо.\n\nПід одним договором ти бачиш власний підпис. Посланці кажуть, що ти пообіцяв дорогу кожному з них.'},
archive:{title:'Підпис, якого ти не пам’ятаєш',speaker:'Іра',role:'Хранителька старих угод',body:'Поки дві громади чекають рішення, архіварка показує інший бік договору. Тут стоїть дата: за рік до твоєї появи в місті.\n\n— Папір справжній, — каже вона. — Це не означає, що правдиве все написане.\n\nУ коридорі стоїть незнайомка з Глибин. Вона мовчки торкається стіни, за якою не видно жодних дверей.'},
treaty:{title:'Хто володіє дорогою',speaker:'Сава',role:'Посланець Терас',body:'Рада зібралася знову. Лада хоче гарантій для міста. Сава вимагає, щоб нічиє життя не залежало від одного чужого наказу. Посланці Вежі не погодяться без доступу для майстрів.\n\nТепер ти вирішуєш не лише куди веде дорога, а й хто зможе її закривати. Твоя відповідь змінить чужу можливість повернутися додому.'},
end:{title:'Наслідок рішення',speaker:'Хроніка міста',role:'Світ запам’ятовує вчинки',body:'Твоє рішення вже змінило доступ до шляхів. Люди пам’ятають, хто отримав право вирішувати за інших. Але підпис на старому договорі нікуди не зник.'}},
options:{
giveWater:['Повернути шлях до Вежі','Місто отримує доступ до води, Тераси — поки без дороги.'],
giveGrain:['Повернути шлях до Терас','Зерно може дістатися міста, але Вежа втрачає прямий доступ.'],
holdCouncil:['Залишити поверхню незмінною','Жодну громаду не обираєш. Час використаєш для перевірки договору.'],
inspectSeal:['Дослідити справжність підпису','Знайти свідчення, але не отримати нового маршруту.'],
hearDepth:['Вислухати посланницю Глибин','З’ясувати, чи існує незалежний внутрішній шлях.'],
questionMap:['Зіставити обидві карти','Дізнатися, хто змінив їхнє сусідство.'],
cityControl:['Закріпити владу міської варти','Місто контролює перемикання, інші повинні просити дозволу.'],
sharedPact:['Домовитися про спільний шлях','Три громади чергують один поверхневий маршрут та утримують його.'],
deepFreedom:['Визнати незалежний шлях Глибин','Відкрити додатковий маршрут. Право його закрити належить Глибинам.'],
refuseDeal:['Не підписувати нову угоду','Зберегти нинішній стан, залишивши суперечку відкритою.']},
events:{giveWater:'Ти повернув шлях до Вежі. Тераси втратили прямий доступ.',giveGrain:'Ти повернув шлях до Терас. Вежа втратила прямий доступ.',holdCouncil:'Ти відмовився обирати сторону до перевірки доказів.',inspectSeal:'Ти довідався: підпис міг бути перенесений зі старого документа.',hearDepth:'Посланниця показала вхід у вкладений світ і незалежний шлях.',questionMap:'Ти виявив, що записи про сусідство змінювали після укладання угод.',cityControl:'Міська варта взяла під контроль чинний перехід.',sharedPact:'Сторони підписали угоду про чергування маршруту та догляд.',deepFreedom:'Глибини відкрили незалежний перехід за власними правилами.',refuseDeal:'Домовленості немає. Тимчасовий стан збережено.'},
ends:{city:['Варта на дорозі','Міська рада отримує право змінювати напрямок одного переходу. Місто захищене від раптових рішень сусідів, але Вежа й Тераси тепер залежать від його дозволу. На площі з’являються люди, які називають тебе захисником, і люди, які пам’ятатимуть інше.'],shared:['Угода трьох','Місто, Вежа й Тераси підписують договір про чергування переходу. Жодна громада не отримує двох доріг одночасно, зате кожна знає свої дні й обов’язки. Перша суперечка вже чекає: хто вирішить, що робити під час неврожаю?'],depth:['Шлях, якого не було на мапі','Нижні ворота відкриваються. Вози можуть їхати до Вежі та Терас через Глибини, не вимагаючи нового повороту поверхні. Місто отримує можливість, але втрачає монополію: мешканці Глибин самі керують своїм проходом. Тепер хтось вимагатиме від тебе забрати в них це право.'],unresolved:['Дорога без угоди','Ти не віддав жодній стороні владу над усіма переходами. Поточний маршрут лишається, решта чекають. Це не поразка, але й не мир: наступного разу делегації прийдуть уже з іншими союзниками.']},
endingHook:'На звороті договору є ще один підпис — твій. Але почерк у ньому старіший за сам папір.'
},
en:{
sub:'A story shaped by decisions',worldEyebrow:'Map / connections between worlds',worldTitle:'Three worlds. One road.',worldClaim:'One surface shift connects the city to water or harvest, but cannot connect both at once.',
city:'The City',terrace:'Terraces',tower:'The Tower',depth:'The Depths',center:'The decision',food:'Grain',water:'Water',hidden:'Unknown road',known:'Known road',
mapNote:'A solid line is an active connection. A dashed line is a possible, but closed, route.',routeLabel:'Surface route',rightsLabel:'Control of passage',routeNone:'Undecided',routeWater:'City — Tower',routeGrain:'City — Terraces',rightNone:'Undecided',rightCity:'City guard',rightShared:'Shared covenant',rightDepth:'Independent Depths',rightUnresolved:'Temporary terms',
chapter:'CHAPTER I / RIGHT OF PASSAGE',turn:'Decision',choice:'Your decision',journal:'Chronicle of choices',restart:'Begin a new story? Your current choices will be replaced.',saved:'Saved on this device',notSaved:'Your browser could not save progress',version:'NARRATIVE TEST 0.2 · UA / EN',foot:'A separate narrative experiment, not Apeiron canon. No external assets or server storage.',again:'Try a different path',
scenes:{
council:{title:'Two identical seals',speaker:'Lada',role:'Keeper of the city map',body:'Two envoys arrive at the city gates. One comes from the Tower, the other from the Terraces. They have never met. Both carry the same key.\n\n“The city may connect to water or to grain,” Lada says. “We cannot turn the surface both ways at once.”\n\nA treaty bears your signature. Each envoy insists you promised them the road.'},
archive:{title:'The signature you cannot recall',speaker:'Ira',role:'Keeper of old agreements',body:'While the envoys await your decision, the archivist turns the treaty over. It bears a date from a year before your arrival.\n\n“The paper is genuine,” she says. “That does not make every word on it true.”\n\nA stranger from the Depths waits in the hallway, touching a wall where no door can be seen.'},
treaty:{title:'Who owns a road?',speaker:'Sava',role:'Envoy of the Terraces',body:'The council gathers again. Lada demands security for the city. Sava refuses to let his people live at the mercy of a stranger’s permission. The Tower will sign nothing without access for its engineers.\n\nYou now decide not only where the road leads, but who will have the power to close it. Your decision may decide whether people can find their way home.'},
end:{title:'The consequence',speaker:'The city chronicle',role:'The world remembers',body:'Your decision has changed who may travel and who may refuse passage. People will remember who was given the right to decide for others. But your signature remains on the old agreement.'}},
options:{
giveWater:['Turn the road toward the Tower','Water is reachable; the Terraces lose the direct route.'],
giveGrain:['Turn the road toward the Terraces','Grain can reach the city; the Tower loses direct access.'],
holdCouncil:['Leave the surface unchanged','Take no side yet and examine the treaty.'],
inspectSeal:['Inspect the signature','Investigate the evidence, but gain no new route.'],
hearDepth:['Listen to the envoy from the Depths','Discover whether there is an independent inner route.'],
questionMap:['Compare the maps','Discover who changed the recorded connections.'],
cityControl:['Grant authority to the city guard','The city controls the shift; others must seek permission.'],
sharedPact:['Negotiate a shared route','Three communities take turns with one route and maintain it together.'],
deepFreedom:['Recognize an independent route','Open a second path; the Depths retain the right to close it.'],
refuseDeal:['Refuse to sign a new treaty','Keep the current state and leave the dispute unresolved.']},
events:{giveWater:'The city now connects to the Tower. The Terraces lack direct access.',giveGrain:'The city now connects to the Terraces. The Tower lacks direct access.',holdCouncil:'You refused to select a side before reviewing the evidence.',inspectSeal:'The signature may have been transferred from an older document.',hearDepth:'The envoy showed a passage through a nested world.',questionMap:'The map records were altered after the treaties were signed.',cityControl:'The city guard now controls the active crossing.',sharedPact:'All parties signed a schedule for shared access and maintenance.',deepFreedom:'The Depths opened their independent route on their own terms.',refuseDeal:'No treaty was signed. The provisional arrangement remains.'},
ends:{city:['A guard at the crossing','The council controls the direction of one crossing. The city is protected from sudden changes imposed by others, but the Tower and Terraces must now ask for permission. Some call you their protector. Others will remember you differently.'],shared:['A covenant of three','The City, Tower and Terraces agree to share one route in turns. Nobody gains two simultaneous roads, but every community knows its rights and duties. Their first dispute is already coming: who decides what happens when the harvest fails?'],depth:['A road missing from every map','The lower gates open. Carts can reach the Tower and Terraces through the Depths without another surface shift. The city gains a route but loses its monopoly. The people of the Depths govern their own crossing. Someone will soon ask you to take that right away.'],unresolved:['A road without a treaty','You have granted no faction total power. The current route remains, and the others wait. It is neither victory nor defeat. When the envoys return, they will bring new allies.']},
endingHook:'On the treaty’s reverse is another signature: yours. But the handwriting appears older than the paper itself.'
}};
const el=id=>document.getElementById(id);
function set(id,str){el(id).textContent=str;}
function persist(){try{localStorage.setItem(KEY,E.serialize(s));localStorage.setItem(LANGKEY,language);set('saveStatus',D[language].saved);}catch(e){set('saveStatus',D[language].notSaved);}}
function draw(){
 const t=D[language], sc=t.scenes[s.stage];document.documentElement.lang=language;
 set('subhead',t.sub);set('worldEyebrow',t.worldEyebrow);set('worldTitle',t.worldTitle);set('worldClaim',t.worldClaim);
 for(const [id,label,note] of [['City','city','center'],['Terrace','terrace','food'],['Tower','tower','water'],['Depth','depth',s.depthKnown?'known':'hidden']]){set('place'+id,t[label]);set('place'+id+'Note',t[note]);}
 set('mapNote',t.mapNote);set('labelRoute',t.routeLabel);set('labelRights',t.rightsLabel);
 set('routeValue',t[s.priority==='water'?'routeWater':s.priority==='grain'?'routeGrain':'routeNone']);
 set('rightsValue',t[s.ending==='city'?'rightCity':s.ending==='shared'?'rightShared':s.ending==='depth'?'rightDepth':s.ending==='unresolved'?'rightUnresolved':'rightNone']);
 el('route-water').classList.toggle('active',s.priority==='water');el('route-grain').classList.toggle('active',s.priority==='grain');
 el('route-depth').classList.toggle('active',s.ending==='depth');el('route-from-depth').classList.toggle('active',s.ending==='depth');
 el('map').querySelector('.depth').classList.toggle('revealed',s.depthKnown);
 set('chapterLabel',t.chapter);set('sceneTitle',sc.title);set('speakerName',sc.speaker);set('speakerRole',sc.role);set('sceneText',sc.body);set('turn',t.turn+' '+s.turn+'/3');
 set('choiceLabel',t.choice);set('journalLabel',t.journal);set('footnote',t.foot);set('version',t.version);
 set('language',language==='uk'?'EN':'UA');el('language').setAttribute('aria-label',language==='uk'?'Switch to English':'Українська');
 el('restart').setAttribute('aria-label',language==='uk'?'Почати знову':'Restart');
 const box=el('actions');box.replaceChildren();for(const id of E.legal(s)){
  const [title,desc]=t.options[id];const b=document.createElement('button');b.type='button';b.className='option';
  const strong=document.createElement('strong');strong.textContent=title;const small=document.createElement('small');small.textContent=desc;
  b.append(strong,small);b.addEventListener('click',()=>{s=E.apply(s,id);persist();draw();window.scrollTo({top:0,behavior:'instant'});});box.appendChild(b);
 }
 const after=el('aftermath');if(s.events.length){after.hidden=false;after.textContent=t.events[s.events[s.events.length-1].id];}else{after.hidden=true;}
 const end=el('ending');end.hidden=!s.ending;el('choiceLabel').hidden=!!s.ending;
 if(s.ending){const [title,body]=t.ends[s.ending];set('endingTitle',title);set('endingText',body+'\n\n'+t.endingHook);set('again',t.again);}
 const journal=el('journal');journal.replaceChildren();s.events.forEach(x=>{const li=document.createElement('li');li.textContent=x.turn+'. '+t.events[x.id];journal.appendChild(li);});
}
el('language').addEventListener('click',()=>{language=language==='uk'?'en':'uk';persist();draw();});
el('restart').addEventListener('click',()=>{if(!window.confirm(D[language].restart))return;s=E.initial();persist();draw();window.scrollTo({top:0,behavior:'instant'});});
el('again').addEventListener('click',()=>{s=E.initial();persist();draw();window.scrollTo({top:0,behavior:'instant'});});
draw();persist();
})();
