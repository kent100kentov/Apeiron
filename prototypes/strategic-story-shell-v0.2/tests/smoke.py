from pathlib import Path
import re
from playwright.sync_api import sync_playwright
folder=Path(__file__).resolve().parents[1]
if (folder/'apeiron-story').exists():
    folder=folder/'apeiron-story'
html=(folder/'index.html').read_text()
html=re.sub(r'<link rel="stylesheet" href="style.css">','',html)
html=re.sub(r'<script src="(?:engine|view)\.js"></script>','',html)
css=(folder/'style.css').read_text()
engine=(folder/'engine.js').read_text()
view=(folder/'view.js').read_text()
with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  for vp in [{'width':390,'height':844},{'width':1280,'height':860}]:
    context=browser.new_context(viewport=vp)
    page=context.new_page(); errors=[]
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.set_content(html)
    page.add_style_tag(content=css)
    page.add_script_tag(content=engine)
    page.add_script_tag(content=view)

    assert page.locator('#actions .option').count()==3
    assert page.locator('#sceneTitle').inner_text()=='Дві однакові печатки'
    page.screenshot(path=str(folder.parent/f"screen-{vp['width']}.png"),full_page=True)
    page.locator('#actions .option').first.click()
    assert page.locator('#sceneTitle').inner_text()=='Підпис, якого ти не пам’ятаєш'
    page.locator('#language').click()
    assert page.locator('#sceneTitle').inner_text()=='The signature you cannot recall'
    page.locator('#actions .option').nth(1).click()
    assert page.locator('#actions .option').count()==4
    page.locator('#actions .option').nth(2).click()
    assert page.locator('#ending').is_visible()
    assert 'A road missing from every map' in page.locator('#endingTitle').inner_text()
    assert not errors,errors
    overflow=page.evaluate('document.documentElement.scrollWidth > window.innerWidth')
    assert not overflow,f'horizontal overflow at {vp["width"]}'
    print(vp['width'],'passed; no browser exceptions or horizontal overflow')
    context.close()
  browser.close()
