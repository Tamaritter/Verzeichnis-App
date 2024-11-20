-> Diese Anleitung ist nach bestem Wissen und Gewissen entstanden. Solltest du in irgendeiner Weise Probleme haben, nutze das Internet. Dort gibt es YouTube-Videos und weitere Tutorials. <-

#Visual Studio Code
##Download
- Gehe auf https://code.visualstudio.com/ (Windows) oder auf https://code.visualstudio.com/docs?dv=osx (Mac)
- Drücke auf Download und lade die Installationsdatei runter

##Installation für Windows
- Lade das Visual Studio Code-Installationsprogramm für Windows herunter.
- Führe nach dem Herunterladen das Installationsprogramm (VSCodeUserSetup-{Version}.exe) aus. Dies dauert nur eine Minute.
- Standardmäßig wird VS Code unter C:\Benutzer{Benutzername}\AppData\Local\Programme\Microsoft VS Code installiert.

##Installation für Mac
- Öffne die Download-Liste des Browsers und suche die heruntergeladene Anwendung oder das Archiv.
- Wenn es sich um ein Archiv handelt, extrahiere den Inhalt des Archivs. Verwende bei einigen Browsern einen Doppelklick oder wähle bei Safari das Lupensymbol.
- Ziehe Visual Studio Code.app in den Ordner „Programme“, um es im macOS Launchpad verfügbar zu machen.
- Öffne VS Code aus dem Ordner „Programme“, indem du auf das Symbol doppelklickst.
- Füge VS Code zu deinem Dock hinzu, indem du mit der rechten Maustaste auf das Symbol im Dock klickst, um das Kontextmenü aufzurufen, und Optionen, Im Dock behalten wählen. 


#MinGW C/C++ Extension
##C/C++ Extension
- Öffne dein VSCode 
- Wähle auf der linken Seite im Reiter die Extensions aus
- Suche nach "C/C++" und optional "C/C++ Extension Pack"
- Lade die Extension runter.

##MingGW via MSYS2 
- https://www.msys2.org/ herunterladen
- Lade das Installationsprogramm herunter: msys2-x86_64-20241116.exe
- Führe das Installationsprogramm aus. Die Installation von MSYS2 erfordert ein 64-Bit-Windows 10 oder neuer.
- Gebe den gewünschten Installationsordner ein (kurzer ASCII-Pfad auf einem NTFS-Volume, keine Akzente, keine Leerzeichen, keine Symlinks, keine Subst- oder Netzlaufwerke, kein FAT).
- Wenn die Datei installiert ist klicke "finish".
- Jetzt ist MSYS2 bereit und ein Terminal für die UCRT64-Umgebung wird gestartet.

- Du wirst wahrscheinlich einige Tools wie den mingw-w64 GCC installieren wollen, um mit der Kompilierung von Projekten zu beginnen. 
Führe folgenden Befehl aus: 
$ pacman -S mingw-w64-ucrt-x86_64-gcc

- Im Terminalfenster wird die folgende Ausgabe angezeigt. Drücke „Enter“, um fortzufahren:

resolving dependencies...
looking for conflicting packages...

Packages (15) mingw-w64-ucrt-x86_64-binutils-2.41-2
            mingw-w64-ucrt-x86_64-crt-git-11.0.0.r216.gffe883434-1
            mingw-w64-ucrt-x86_64-gcc-libs-13.2.0-2  mingw-w64-ucrt-x86_64-gmp-6.3.0-2
            mingw-w64-ucrt-x86_64-headers-git-11.0.0.r216.gffe883434-1
            mingw-w64-ucrt-x86_64-isl-0.26-1  mingw-w64-ucrt-x86_64-libiconv-1.17-3
            mingw-w64-ucrt-x86_64-libwinpthread-git-11.0.0.r216.gffe883434-1
            mingw-w64-ucrt-x86_64-mpc-1.3.1-2  mingw-w64-ucrt-x86_64-mpfr-4.2.1-2
            mingw-w64-ucrt-x86_64-windows-default-manifest-6.4-4
            mingw-w64-ucrt-x86_64-winpthreads-git-11.0.0.r216.gffe883434-1
            mingw-w64-ucrt-x86_64-zlib-1.3-1  mingw-w64-ucrt-x86_64-zstd-1.5.5-1
            mingw-w64-ucrt-x86_64-gcc-13.2.0-2

Total Download Size:    49.38 MiB
Total Installed Size:  418.82 MiB

:: Proceed with installation? [Y/n]
[... downloading and installation continues ...]

- Geben Y ein, wenn du gefragt wirst, ob du mit der Installation fortfahren möchten.
- Jetzt kannst du gcc aufrufen, um Software für Windows zu erstellen.
    $ gcc --version

- Nach der Installation von MSYS2 wird es sich selbst über pacman aktualisieren, siehe die Update-Anleitung für weitere Informationen. (https://www.msys2.org/docs/updating/)

- Quelle: https://code.visualstudio.com/docs/cpp/config-mingw


###Füge den Pfad Ihres MinGW-w64 bin-Ordners zur Windows PATH-Umgebungsvariable hinzu, indem du die folgenden Schritte ausführst:
-Gebe in der Windows-Suchleiste Einstellungen ein, um deine Windows-Einstellungen zu öffnen.
-Suche nach Umgebungsvariablen für dein Konto bearbeiten.
-Wähle in den Benutzervariablen die Variable Path und wähle dann Bearbeiten.
-Wähle Neu und füge den MinGW-w64-Zielordner, den du während des Installationsvorgangs aufgezeichnet hast, der Liste hinzu. Wenn du die obigen Standardeinstellungen verwendet haben, ist dies der Pfad: C:\msys64\ucrt64\bin.
-Wähle OK und dann erneut OK im Fenster Umgebungsvariablen, um die Umgebungsvariable PATH zu aktualisieren. Du musst alle Konsolenfenster erneut öffnen, damit die aktualisierte PATH-Umgebungsvariable verfügbar ist.

- Überprüfen deine MinGW-Installation
    Um zu überprüfen, ob deine MinGW-w64-Tools korrekt installiert und verfügbar sind, öffne eine neue Eingabeaufforderung (Terminal) und geben ein:
    gcc --version
    g++ --version
    gdb --version

- Du solltest eine Ausgabe sehen, die angibt, welche Versionen von GCC, g++ und GDB du installiert habst. Wenn dies nicht der Fall ist:
Vergewissere dich, dass dein Eintrag in der PATH-Variable mit dem Binärverzeichnis von MinGW-w64 übereinstimmt, in dem die Toolchain installiert wurde. 
Wenn die Compiler nicht in diesem PATH-Eintrag vorhanden sind, stelle sicher, dass du die vorherigen Anweisungen befolgt hast.
Wenn gcc die richtige Ausgabe hat, aber nicht gdb, dann musst du die fehlenden Pakete aus dem MinGW-w64 Toolset installieren.
Wenn du beim Kompilieren die Meldung „Der Wert von miDebuggerPath ist ungültig.“ erhalten hast, kann eine Ursache sein, dass dir das Paket mingw-w64-gdb fehlt.


###VSCode vorbereiten
- Öffne VSCode und wähle die Statusleiste in der Mitte aus. Wähle "> C/C++: Select IntelliSense Configurations..." aus.
- Dort solltest du nun "gcc.exe" sehen. Diesen kannst du auswählen.
- Wenn du alles richtig gemacht hast, sollte dein VS Code startklar sein.
- Falls du direkt loslegen willst, kannst du gerne auf der folgenden Webseite ab dem Punkt "Create a Hello World App" weitermachen.
(https://code.visualstudio.com/docs/cpp/config-mingw) 

-> Nun kannst du mit dem Programmieren mit C loslegen. Basics sowie viele Anleitungen zu deinen ersten eigenen Apps mit C findest du in deiner Suchmaschine oder auf YouTube. <-

Optional kannst du dir unter "Extensions" auch andere Programmiersprachen installieren, wenn sie von VSCode unterstützt werden. Zum Beispiel kannst du dir "Python" runterladen. Beim Erstellen einer neuen Datei achte einfach auf die "Dateinamenendung", sprich den Dateityp. Beispielsweise ein ".c" für die Programmiersprache C oder ein ".py" für Python. 
