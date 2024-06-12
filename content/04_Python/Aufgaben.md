# Generelle Hinweise:
> [!NOTE]
> - Entwickelt und testet eure Programme **[hier](https://programiz.pro/ide/python)**
> - Wir empfehlen euch **[dieses Cheatsheet](https://www.pythoncheatsheet.org/cheatsheet/basics)** zu verwenden.
> - Es ist erlaubt Google zu benutzen
> - Ihr dürft euch auch gegenseitig unterstützen😉
> - Verwendet bitte keine generative KI zum lösen dieser Aufgaben (ChatGPT)
> - Erstellt für jede Aufgabe eine neue Datei, ihr könnt den Code von der letzten Aufgabe rüber kopieren, falls nötig.

> [!CAUTION]
> Auf dem Gerät, das du für diesen Schnuppertag erhalten hast, sollte nichts installiert werden. Deshalb seid ihr auf das beschränkt, was ihr online findet.

# Aufgaben:
## 1. `Hello World!`
Schreib ein Programm, das den Text `Hello World!` in der Commando Zeile ausgibt.
> [!TIP]
> - Um etwas auszugeben kann man die Funktion `print(x)` verwenden
> - Um ein Stück Text in Python darzustellen, muss man ihn zwischen zwei Gänsefüsschen setzen `"text"`

## 2. `Hallo John`
Schreibe ein Programm, das den Benutzer nach seinem Namen fragt und ihm danach mit `Hallo <name>` antwortet.

Beispiel Interaktion:
```
Wie heist du?   <-  Programm
John            <-  User
Hallo John      <-  Programm,
```
> [!TIP]
> - Um einen Benutzer in der Commando Zeile nach einem Input zu fragen muss die `input()` Funktion verwendet werden.
> - https://www.pythoncheatsheet.org/cheatsheet/basics#the-input-function


## 3. `PIN-Check`
Schreibe ein Programm, das den Benutzer nach einem Passwort fragt und danach überprüft ob es stimmt.
> [!TIP]
> - https://www.pythoncheatsheet.org/cheatsheet/control-flow
> - Den PIN kanst du direkt als Text in einer Variabel speichern.

## 4. `limitierte Versüche`
Wir wollen einem Benutzer drei Versuche geben, um den PIN korrekt einzugeben. Deshalb solltest du jetzt dein Programm so modifizieren, das es drei mal nach dem PIN fragt.
> [!WARNING]
> **Verwende einen loop um diese Aufgabe zu lösen.** Es ist zwar möglich mehrere `if` Statements ineinander zu verschachteln, allerdings ist das nicht der Sinn dieser Aufgabe.

> [!TIP]
> - https://www.pythoncheatsheet.org/cheatsheet/control-flow#break-statements

## 5. `Funktion`
Damit unserer Code eleganter wird möchten wir eine dedizierte Funktion (wie z.B. `print()`) schreiben, den eingegebenen PIN überprüft. Verwende den Code aus Auftrag 3 als Basis. Schreibe eine Funktion die die Eingabe des Benutzers als Input nimmt und je nachdem ob der PIN korrekt ist, ein `True` oder ein `False` zurückgibt.
> [!TIP]
> - https://www.pythoncheatsheet.org/cheatsheet/functions
> - https://mimo.org/glossary/python/return

## 6. `Bruteforce`
Du (der Benutzer) hast deinen PIN vergessen und du fragst dich, ob du ihn hacken kannst, es gibt ja schliesslich nur so viele mögliche Kombinationen die ein PIN haben kann, oder?
Schreibe ein Programm das alle möglichen nummern von 1 bis zu (z.B.) 10000 durchgeht und sie versucht als PIN einzugeben.
Verwende die Funktion, die du in der letzten Aufgabe geschrieben hast.
> [!TIP]
> - https://www.pythoncheatsheet.org/builtin/range
> - Du kanst eine zahl nicht mit einem text vergleichen:
>   ```py
>   1234 == "1234" # False, ist nicht dasselbe
>   ```
>   Du musst die Zahl zuerst in einen string verwandeln.
>   ```py
>   str(1234) == "1234" # True, die Werte sind gleich
>   ```

# Erweitert:
Wenn du mit allen Aufgaben fertig bist, oder denkst, dass sie viel zu einfach sind, kannst du gerne selber noch experimentieren oder eine der folgenden Challenges probieren:

<details>
<summary><h3>hash-cracker</h3></summary>

In dieser Aufgabe hast du einen [sha256 hash](https://www.dashlane.com/de/blog/was-versteht-man-unter-passwort-hashing) von einem Password bekommen, der irgendwann mal gestohlen wurde. Leider ist der Hash an sich nutzlos, daher ist es jetzt dein Job, ihm irgendwie zu brechen. sha256 an sich gilt als sicher, allerdings kann es gut sein, dass der Benutzer nicht vorsichtig wahr und eines von den [top 10'000 Passwörtern](https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/10-million-password-list-top-10000.txt) benutzt hat. Schreib ein Programm, das jedes der top 10'000 Passwörter hashed und versuch herauszufinden, was das ursprüngliche Passwort des Benutzers wahr. 

**Hash:**
```
7a5179eecc0fe18760ba615f92603372ae3fe302860098a019e15927551fee3b
```

**Ressourcen:**
- ```py
  import hashlib
  print(hashlib.sha256("Hello World!".encode('UTF-8')).hexdigest())
  ```
- https://www.geeksforgeeks.org/read-a-file-line-by-line-in-python/
- https://www.w3schools.com/python/ref_string_strip.asp
- Denke an die Aufgabe 6

</details>
<details>
<summary><h3>office-encryption</h3></summary>

## Beschreibung
**Disclaimer:** Diese Aufgabe wurde nicht von uns erfunden, sondern ist ein Teil der [Swiss Hacking Challenge 2024](https://ctf.m0unt41n.ch/challenges/office-encryption). Wir erwarten nicht ernsthaft, dass jemand diese Aufgabe lösen wird; ihr solltet sie nur versuchen, wenn ihr sonst nichts zu tun habt. In dieser Aufgabe werden auch mehrere Grundkonzepte verwendet, die bis dahin nicht von uns angesprochen wurden.

**Auftrag:** Ihr bekommt eine Flagge (encrypted_text.txt), die mit dem angehefteten Python-Programm verschlüsselt wurde. Deine Aufgabe ist es jetzt, den Algorithmus zu verstehen und rückgängig zu machen.


## Dateien:
**encrypt.py**
```py
from random import shuffle
from collections import Counter

def generate_substitution_cipher(text):
    alphabet = "abcdefghijklmnopqrstuvwxyz"
    shuffled_alphabet = list(alphabet)
    shuffle(shuffled_alphabet)
    cipher_map = {
        original: substituted
        for original, substituted in zip(alphabet, shuffled_alphabet)
    }
    encrypted_text = ""
    for char in text:
        if char.lower() in cipher_map:
            encrypted_char = cipher_map[char.lower()]
            if char.isupper():
                encrypted_char = encrypted_char.upper()
            encrypted_text += encrypted_char
        else:
            encrypted_text += char
    return encrypted_text, cipher_map

text = "shc2024{fake_flag}"
encrypted_text, cipher_map = generate_substitution_cipher(text)
print(encrypted_text, cipher_map)
```

**encrypted_text.txt**
```txt
swo2024{jytmm_ruvs_opgbzu_mum}
```

**cipher_map.txt**
```json
{
    'a': 'k',
    'b': 'n',
    'c': 'o',
    'd': 'r',
    'e': 'v',
    'f': 'q',
    'g': 'i',
    'h': 'w',
    'i': 'x',
    'j': 'd',
    'k': 'h',
    'l': 'm',
    'm': 'l',
    'n': 'y',
    'o': 'u',
    'p': 'b',
    'q': 'f',
    'r': 'p',
    's': 's',
    't': 'z',
    'u': 't',
    'v': 'a',
    'w': 'c',
    'x': 'j',
    'y': 'g',
    'z': 'e'
}
```

</details>