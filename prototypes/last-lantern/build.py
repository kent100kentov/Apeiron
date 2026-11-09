from pathlib import Path
import zipfile
root=Path(__file__).resolve().parent
html=(root/'shell.html').read_text()
for marker,file in [('/*STYLE*/','style.css'),('/*ENGINE*/','engine.js'),('/*VIEW*/','view.js')]:
    html=html.replace(marker,(root/file).read_text())
out=root/'dist';out.mkdir(exist_ok=True)
(out/'index.html').write_text(html)
(out/'index.html').chmod(0o644);out.chmod(0o755)
with zipfile.ZipFile(root/'APEIRON-0.1.0-LAST-LANTERN-644-755.zip','w',zipfile.ZIP_DEFLATED) as z:
    folder=zipfile.ZipInfo('apeiron/');folder.create_system=3;folder.external_attr=(0o40755<<16)|0x10;z.writestr(folder,b'')
    zi=zipfile.ZipInfo('apeiron/index.html');zi.create_system=3;zi.external_attr=(0o100644<<16);zi.compress_type=zipfile.ZIP_DEFLATED
    z.writestr(zi,html.encode())
(root/'APEIRON-0.1.0-LAST-LANTERN-644-755.zip').chmod(0o644)
print(f'Built {len(html.encode())} bytes; index.html 644, dist 755')
