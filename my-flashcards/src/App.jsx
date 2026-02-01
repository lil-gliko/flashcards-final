import { useState, useEffect } from 'react';

// --- רשימת המילים המלאה שלך ---
const initialWords = [
  { "id": 1, "front": "ich", "back": "I" },
  { "id": 2, "front": "du", "back": "you (singular)" },
  { "id": 3, "front": "Universität", "back": "university" },
  { "id": 4, "front": "Studenten", "back": "students" },
  { "id": 5, "front": "aber", "back": "but" },
  { "id": 6, "front": "alle", "back": "all" },
  { "id": 7, "front": "Frage", "back": "question" },
  { "id": 8, "front": "Antwort", "back": "answer" },
  { "id": 9, "front": "aus", "back": "from" },
  { "id": 10, "front": "neu", "back": "new" },
  { "id": 11, "front": "das", "back": "the / that" },
  { "id": 12, "front": "normal", "back": "normal" },
  { "id": 13, "front": "Deutsch", "back": "German" },
  { "id": 14, "front": "nicht", "back": "not" },
  { "id": 15, "front": "Dialog", "back": "dialogue" },
  { "id": 16, "front": "finden", "back": "to find" },
  { "id": 17, "front": "glauben", "back": "to believe" },
  { "id": 18, "front": "ich heiße / du heißt", "back": "my name is / your name is" },
  { "id": 19, "front": "richtig", "back": "correct" },
  { "id": 20, "front": "in/im", "back": "in / in the" },
  { "id": 21, "front": "spricht", "back": "speaks" },
  { "id": 22, "front": "ist", "back": "is" },
  { "id": 23, "front": "Hebräisch", "back": "Hebrew" },
  { "id": 24, "front": "jetzt", "back": "now" },
  { "id": 25, "front": "Entschuldigung", "back": "excuse me" },
  { "id": 26, "front": "Klasse", "back": "class" },
  { "id": 27, "front": "Kurs", "back": "course" },
  { "id": 28, "front": "wichtig", "back": "important" },
  { "id": 29, "front": "komme / kommst", "back": "come / come" },
  { "id": 30, "front": "eins", "back": "one" },
  { "id": 31, "front": "zwei", "back": "two" },
  { "id": 32, "front": "drei", "back": "three" },
  { "id": 33, "front": "vier", "back": "four" },
  { "id": 34, "front": "fünf", "back": "five" },
  { "id": 35, "front": "sechs", "back": "six" },
  { "id": 36, "front": "sieben", "back": "seven" },
  { "id": 37, "front": "acht", "back": "eight" },
  { "id": 38, "front": "neun", "back": "nine" },
  { "id": 39, "front": "ich mag", "back": "I like" },
  { "id": 40, "front": "mein Name", "back": "my name" },
  { "id": 41, "front": "und", "back": "and" },
  { "id": 42, "front": "oder", "back": "or" },
  { "id": 43, "front": "was", "back": "what" },
  { "id": 44, "front": "wie", "back": "how" },
  { "id": 45, "front": "wo", "back": "where" },
  { "id": 46, "front": "woher", "back": "where from" },
  { "id": 47, "front": "wohnen", "back": "to live" },
  { "id": 48, "front": "sehr gut", "back": "very good" },
  { "id": 49, "front": "Herr", "back": "Mr." },
  { "id": 50, "front": "Frau", "back": "Ms. / Mrs. / Woman" },
  { "id": 51, "front": "lesen", "back": "to read" },
  { "id": 52, "front": "ihr", "back": "you (plural) / her" },
  { "id": 53, "front": "wir", "back": "we" },
  { "id": 54, "front": "auch", "back": "also" },
  { "id": 55, "front": "lernen", "back": "to learn" },
  { "id": 56, "front": "Italienisch", "back": "Italian" },
  { "id": 57, "front": "zusammen", "back": "together" },
  { "id": 58, "front": "Hausaufgaben machen", "back": "to do homework" },
  { "id": 59, "front": "gute Idee", "back": "good idea" },
  { "id": 60, "front": "wann", "back": "when" },
  { "id": 61, "front": "dann", "back": "then" },
  { "id": 62, "front": "am", "back": "on / at" },
  { "id": 63, "front": "um", "back": "at (time)" },
  { "id": 64, "front": "leider", "back": "unfortunately" },
  { "id": 65, "front": "lebe", "back": "live" },
  { "id": 66, "front": "schade", "back": "pity / too bad" },
  { "id": 67, "front": "Moment", "back": "moment" },
  { "id": 68, "front": "haben", "back": "to have" },
  { "id": 69, "front": "sein", "back": "to be" },
  { "id": 70, "front": "geht", "back": "goes / works" },
  { "id": 71, "front": "da", "back": "there" },
  { "id": 72, "front": "genau", "back": "exactly" },
  { "id": 73, "front": "Zeit", "back": "time" },
  { "id": 74, "front": "vielleicht", "back": "maybe" },
  { "id": 75, "front": "Uhr", "back": "clock / o'clock" },
  { "id": 76, "front": "telefonieren", "back": "to talk on the phone" },
  { "id": 77, "front": "Telefonnummer", "back": "phone number" },
  { "id": 78, "front": "schicke", "back": "send" },
  { "id": 79, "front": "danke", "back": "thank you" },
  { "id": 80, "front": "Montag", "back": "Monday" },
  { "id": 81, "front": "Dienstag", "back": "Tuesday" },
  { "id": 82, "front": "Mittwoch", "back": "Wednesday" },
  { "id": 83, "front": "Donnerstag", "back": "Thursday" },
  { "id": 84, "front": "Freitag", "back": "Friday" },
  { "id": 85, "front": "Samstag", "back": "Saturday" },
  { "id": 86, "front": "Sonntag", "back": "Sunday" },
  { "id": 87, "front": "heute morgen", "back": "this morning" },
  { "id": 88, "front": "das Jahr, Jahre", "back": "year, years" },
  { "id": 89, "front": "alt", "back": "old" },
  { "id": 90, "front": "neu", "back": "new" },
  { "id": 91, "front": "studieren", "back": "to study (university)" },
  { "id": 92, "front": "der Professor", "back": "professor" },
  { "id": 93, "front": "nett", "back": "nice" },
  { "id": 94, "front": "viele", "back": "many" },
  { "id": 95, "front": "das Buch, Bücher", "back": "book, books" },
  { "id": 96, "front": "der Lehrer", "back": "teacher" },
  { "id": 97, "front": "die Information", "back": "information" },
  { "id": 98, "front": "das Internet", "back": "internet" },
  { "id": 99, "front": "der Unterricht", "back": "lesson / class" },
  { "id": 100, "front": "wer", "back": "who" },
  { "id": 101, "front": "schreiben", "back": "to write" },
  { "id": 102, "front": "fantastisch", "back": "fantastic" },
  { "id": 103, "front": "kein", "back": "no / none" },
  { "id": 104, "front": "heute", "back": "today" },
  { "id": 105, "front": "nein", "back": "no" },
  { "id": 106, "front": "groß", "back": "big / tall" },
  { "id": 107, "front": "man", "back": "one / people (general)" },
  { "id": 108, "front": "die Stadt, Städte", "back": "city, cities" },
  { "id": 109, "front": "hier", "back": "here" },
  { "id": 110, "front": "die Bibliothek, Bibliotheken", "back": "library, libraries" },
  { "id": 111, "front": "alles klar", "back": "all clear / okay" },
  { "id": 112, "front": "das Semester", "back": "semester" },
  { "id": 113, "front": "der Partner", "back": "partner" },
  { "id": 114, "front": "Deutschland", "back": "Germany" },
  { "id": 115, "front": "die Lektion", "back": "lesson" },
  { "id": 116, "front": "die Sprache, Sprachen", "back": "language, languages" },
  { "id": 117, "front": "die Seite", "back": "page" },
  { "id": 118, "front": "die Literatur", "back": "literature" },
  { "id": 119, "front": "das Wort", "back": "word" },
  { "id": 120, "front": "schon", "back": "already" },
  { "id": 121, "front": "sprechen", "back": "to speak" },
  { "id": 122, "front": "der Bus, Busse", "back": "bus, buses" },
  { "id": 123, "front": "verstehen", "back": "to understand" },
  { "id": 124, "front": "denn", "back": "because / for" },
  { "id": 125, "front": "das Zentrum", "back": "center" },
  { "id": 126, "front": "das Schloss, Schlösser", "back": "castle, castles" },
  { "id": 127, "front": "die Kirche, Kirchen", "back": "church, churches" },
  { "id": 128, "front": "schön", "back": "beautiful" },
  { "id": 129, "front": "das Museum, Museen", "back": "museum, museums" },
  { "id": 130, "front": "das Theater", "back": "theater" },
  { "id": 131, "front": "der Campus", "back": "campus" },
  { "id": 132, "front": "es gibt", "back": "there is / there are" },
  { "id": 133, "front": "das Zimmer", "back": "room" },
  { "id": 134, "front": "die Tafel", "back": "blackboard" },
  { "id": 135, "front": "der Tisch, Tische", "back": "table, tables" },
  { "id": 136, "front": "der Stuhl, Stühle", "back": "chair, chairs" },
  { "id": 137, "front": "die Gitarre", "back": "guitar" },
  { "id": 138, "front": "die Musik", "back": "music" },
  { "id": 139, "front": "das Hobby, Hobbys", "back": "hobby, hobbies" },
  { "id": 140, "front": "hören", "back": "to hear / listen" },
  { "id": 141, "front": "gern", "back": "gladly / like to" },
  { "id": 142, "front": "toll", "back": "great" },
  { "id": 143, "front": "kochen", "back": "to cook" },
  { "id": 144, "front": "ins Kino gehen", "back": "to go to the cinema" },
  { "id": 145, "front": "der Film, Filme", "back": "film, films" },
  { "id": 146, "front": "natürlich", "back": "naturally / of course" },
  { "id": 147, "front": "sehen", "back": "to see" },
  { "id": 148, "front": "etwas", "back": "something" },
  { "id": 149, "front": "auf Englisch", "back": "in English" },
  { "id": 150, "front": "amerikanisch", "back": "American" },
  { "id": 151, "front": "meinen", "back": "to mean / think" },
  { "id": 152, "front": "interessant", "back": "interesting" },
  { "id": 153, "front": "der Fußball", "back": "football / soccer" },
  { "id": 154, "front": "doch", "back": "yes (contradicting negative) / but" },
  { "id": 155, "front": "der Kurs, Kurse", "back": "course, courses" },
  { "id": 156, "front": "das Thema, Themen", "back": "topic, topics" },
  { "id": 157, "front": "der Sport", "back": "sport" },
  { "id": 158, "front": "das Problem", "back": "problem" },
  { "id": 159, "front": "das Ende", "back": "end" },
  { "id": 160, "front": "schrecklich", "back": "terrible" },
  { "id": 161, "front": "klingen", "back": "to sound" },
  { "id": 162, "front": "das Kind, Kinder", "back": "child, children" },
  { "id": 163, "front": "der Junge, Jungen", "back": "boy, boys" },
  { "id": 164, "front": "ohne", "back": "without" },
  { "id": 165, "front": "mit", "back": "with" },
  { "id": 166, "front": "der Vater, Väter", "back": "father, fathers" },
  { "id": 167, "front": "der Bruder, Brüder", "back": "brother, brothers" },
  { "id": 168, "front": "für", "back": "for" },
  { "id": 169, "front": "von", "back": "of / from" },
  { "id": 170, "front": "lieben", "back": "to love" },
  { "id": 171, "front": "hassen", "back": "to hate" },
  { "id": 172, "front": "der Onkel", "back": "uncle" },
  { "id": 173, "front": "der Erwachsene", "back": "adult" },
  { "id": 174, "front": "die Eltern", "back": "parents" },
  { "id": 175, "front": "biologisch", "back": "biological" },
  { "id": 176, "front": "die Mutter, Mütter", "back": "mother, mothers" },
  { "id": 177, "front": "möglich", "back": "possible" },
  { "id": 178, "front": "schwul", "back": "gay" },
  { "id": 179, "front": "das Paar, Paare", "back": "couple, couples" },
  { "id": 180, "front": "zeigen", "back": "to show" },
  { "id": 181, "front": "das Video, die Videos", "back": "video, videos" },
  { "id": 182, "front": "die Familie", "back": "family" },
  { "id": 183, "front": "der Mann, Männer", "back": "man, men / husband" },
  { "id": 184, "front": "der Mensch, Menschen", "back": "human, humans" },
  { "id": 185, "front": "fragen", "back": "to ask" },
  { "id": 186, "front": "selten", "back": "rarely" },
  { "id": 187, "front": "das Mädchen", "back": "girl" },
  { "id": 188, "front": "das Haus, Häuser", "back": "house, houses" },
  { "id": 189, "front": "die Tochter, Töchter", "back": "daughter, daughters" },
  { "id": 190, "front": "die Geschwister", "back": "siblings" },
  { "id": 191, "front": "populär", "back": "popular" },
  { "id": 192, "front": "die Liebe", "back": "love" },
  { "id": 193, "front": "andere", "back": "other" },
  { "id": 194, "front": "die Fotografie", "back": "photography" },
  { "id": 195, "front": "nur", "back": "only" },
  { "id": 196, "front": "die Schwester, Schwestern", "back": "sister, sisters" },
  { "id": 197, "front": "die Generation", "back": "generation" },
  { "id": 198, "front": "die Großeltern", "back": "grandparents" },
  { "id": 199, "front": "die Woche, Wochen", "back": "week, weeks" },
  { "id": 200, "front": "das Essen", "back": "food" },
  { "id": 201, "front": "der Freund, Freunde", "back": "friend, friends" },
  { "id": 202, "front": "schlecht", "back": "bad" },
  { "id": 203, "front": "der Mitbewohner", "back": "roommate" },
  { "id": 204, "front": "essen", "back": "to eat" },
  { "id": 205, "front": "das Studentenwohnheim", "back": "student dormitory" },
  { "id": 206, "front": "lernen", "back": "to learn / study" },
  { "id": 207, "front": "klein", "back": "small" },
  { "id": 208, "front": "das Fach, Fächer", "back": "subject, subjects" },
  { "id": 209, "front": "allein", "back": "alone" },
  { "id": 210, "front": "jeden Tag", "back": "every day" },
  { "id": 211, "front": "bekommen", "back": "to get / receive" },
  { "id": 212, "front": "diskutieren", "back": "to discuss" },
  { "id": 213, "front": "sicher", "back": "sure / safe" },
  { "id": 214, "front": "viel", "back": "much / a lot" },
  { "id": 215, "front": "wirklich", "back": "really" },
  { "id": 216, "front": "einfach", "back": "simple / easy" },
  { "id": 217, "front": "besuchen", "back": "to visit" },
  { "id": 218, "front": "die Diskussion", "back": "discussion" },
  { "id": 219, "front": "individuell", "back": "individual" },
  { "id": 220, "front": "die Mensa", "back": "cafeteria (uni)" },
  { "id": 221, "front": "mehr", "back": "more" },
  { "id": 222, "front": "die Aktivität", "back": "activity" },
  { "id": 223, "front": "Zahlen", "back": "numbers" },
  { "id": 224, "front": "die Gruppe", "back": "group" },
  { "id": 225, "front": "der Roman, Romane", "back": "novel, novels" },
  { "id": 226, "front": "das Studium", "back": "studies" },
  { "id": 227, "front": "frei", "back": "free" },
  { "id": 228, "front": "ganz", "back": "whole / quite" },
  { "id": 229, "front": "nach Hause fahren", "back": "to drive/go home" },
  { "id": 230, "front": "manchmal", "back": "sometimes" },
  { "id": 231, "front": "total", "back": "total / totally" },
  { "id": 232, "front": "schnell", "back": "fast" },
  { "id": 233, "front": "die Katastrophe", "back": "catastrophe" },
  { "id": 234, "front": "das Medizinstudium", "back": "medical studies" },
  { "id": 235, "front": "die Freundin", "back": "girlfriend / female friend" },
  { "id": 236, "front": "das Wintersemester", "back": "winter semester" },
  { "id": 237, "front": "das Sommersemester", "back": "summer semester" },
  { "id": 238, "front": "die Vorlesung", "back": "lecture" },
  { "id": 239, "front": "offiziell", "back": "official" },
  { "id": 240, "front": "Anglistik", "back": "English studies" },
  { "id": 241, "front": "beginnen", "back": "to begin" },
  { "id": 242, "front": "klassisch", "back": "classical" },
  { "id": 243, "front": "die Philosophie", "back": "philosophy" },
  { "id": 244, "front": "die Germanistik", "back": "German studies" },
  { "id": 245, "front": "der Doktor", "back": "doctor" },
  { "id": 246, "front": "heiraten", "back": "to marry" },
  { "id": 247, "front": "der Arzt, Ärzte", "back": "physician, physicians" },
  { "id": 248, "front": "arbeiten", "back": "to work" },
  { "id": 249, "front": "das Examen", "back": "exam" },
  { "id": 250, "front": "später", "back": "later" },
  { "id": 251, "front": "bis", "back": "until" },
  { "id": 252, "front": "der Beruf, Berufe", "back": "profession, professions" },
  { "id": 253, "front": "der Computer", "back": "computer" },
  { "id": 254, "front": "immer", "back": "always" },
  { "id": 255, "front": "helfen", "back": "to help" },
  { "id": 256, "front": "die Arbeit", "back": "work" },
  { "id": 257, "front": "besonders", "back": "especially" },
  { "id": 258, "front": "der Raum", "back": "room" },
  { "id": 259, "front": "kalt", "back": "cold" },
  { "id": 260, "front": "die Geschichte", "back": "history / story" },
  { "id": 261, "front": "wissenschaftliche Mitarbeiterin", "back": "research assistant (female)" },
  { "id": 262, "front": "suchen", "back": "to search" },
  { "id": 263, "front": "der Artikel", "back": "article" },
  { "id": 264, "front": "der Sekretär", "back": "secretary" },
  { "id": 265, "front": "die Leute", "back": "people" },
  { "id": 266, "front": "letzte", "back": "last" },
  { "id": 267, "front": "der Einkauf", "back": "purchase / shopping" },
  { "id": 268, "front": "das/der Laptop", "back": "laptop" },
  { "id": 269, "front": "das Tablet", "back": "tablet" },
  { "id": 270, "front": "der Becher", "back": "cup/mug" },
  { "id": 271, "front": "kaufen", "back": "to buy" },
  { "id": 272, "front": "der Kaffee", "back": "coffee" },
  { "id": 273, "front": "kaputt", "back": "broken" },
  { "id": 274, "front": "der Rucksack", "back": "backpack" },
  { "id": 275, "front": "der Stift", "back": "pen/pencil" },
  { "id": 276, "front": "denken", "back": "to think" },
  { "id": 277, "front": "der Kugelschreiber", "back": "ballpoint pen" },
  { "id": 278, "front": "der Bleistift", "back": "pencil" },
  { "id": 279, "front": "egal", "back": "doesn't matter / equal" },
  { "id": 280, "front": "kosten", "back": "to cost" },
  { "id": 281, "front": "der Supermarkt", "back": "supermarket" },
  { "id": 282, "front": "der Textmarker", "back": "highlighter" },
  { "id": 283, "front": "das Papier", "back": "paper" },
  { "id": 284, "front": "der Kalender", "back": "calendar" },
  { "id": 285, "front": "der Termin", "back": "appointment" },
  { "id": 286, "front": "praktisch", "back": "practical" },
  { "id": 287, "front": "der Platz, Plätze", "back": "place, places" },
  { "id": 288, "front": "die Notizen", "back": "notes" },
  { "id": 289, "front": "benutzen", "back": "to use" },
  { "id": 290, "front": "genug", "back": "enough" },
  { "id": 291, "front": "die Konferenz", "back": "conference" },
  { "id": 292, "front": "der Deutschlehrer", "back": "German teacher" },
  { "id": 293, "front": "aus der ganzen Welt", "back": "from all over the world" },
  { "id": 294, "front": "international", "back": "international" },
  { "id": 295, "front": "sagen", "back": "to say" },
  { "id": 296, "front": "subjektiv", "back": "subjective" },
  { "id": 297, "front": "die Fakten", "back": "facts" },
  { "id": 298, "front": "die Kultur", "back": "culture" },
  { "id": 299, "front": "komplex", "back": "complex" },
  { "id": 300, "front": "national", "back": "national" },
  { "id": 301, "front": "das Land, Länder", "back": "country, countries" },
  { "id": 302, "front": "identisch", "back": "identical" },
  { "id": 303, "front": "das Treffen", "back": "meeting" },
  { "id": 304, "front": "Indien", "back": "India" },
  { "id": 305, "front": "Argentinien", "back": "Argentina" },
  { "id": 306, "front": "das Bild, Bilder", "back": "picture, pictures" },
  { "id": 307, "front": "leer", "back": "empty" },
  { "id": 308, "front": "voll", "back": "full" },
  { "id": 309, "front": "öffnen", "back": "to open" },
  { "id": 310, "front": "das Brot", "back": "bread" },
  { "id": 311, "front": "der Fisch", "back": "fish" },
  { "id": 312, "front": "die Wurst", "back": "sausage" },
  { "id": 313, "front": "der Käse", "back": "cheese" },
  { "id": 314, "front": "der Joghurt", "back": "yogurt" },
  { "id": 315, "front": "nehmen", "back": "to take" },
  { "id": 316, "front": "das Frühstück", "back": "breakfast" },
  { "id": 317, "front": "schmecken", "back": "to taste" },
  { "id": 318, "front": "warum", "back": "why" },
  { "id": 319, "front": "das Geld", "back": "money" },
  { "id": 320, "front": "oft", "back": "often" },
  { "id": 321, "front": "der Euro", "back": "Euro" },
  { "id": 322, "front": "weiter", "back": "further" },
  { "id": 323, "front": "August", "back": "August" },
  { "id": 324, "front": "möchten", "back": "would like" },
  { "id": 325, "front": "die Milch", "back": "milk" },
  { "id": 326, "front": "trinken", "back": "to drink" },
  { "id": 327, "front": "der Kuchen", "back": "cake" },
  { "id": 328, "front": "lecker", "back": "tasty" },
  { "id": 329, "front": "der Salat", "back": "salad" },
  { "id": 330, "front": "bitte", "back": "please" },
  { "id": 331, "front": "israelisch", "back": "Israeli" },
  { "id": 332, "front": "die Olive, Oliven", "back": "olive, olives" },
  { "id": 333, "front": "die Tomate, Tomaten", "back": "tomato, tomatoes" },
  { "id": 334, "front": "die Gurke, Gurken", "back": "cucumber, cucumbers" },
  { "id": 335, "front": "das Öl", "back": "oil" },
  { "id": 336, "front": "die Zitrone", "back": "lemon" },
  { "id": 337, "front": "der Pfeffer", "back": "pepper" },
  { "id": 338, "front": "das Salz", "back": "salt" },
  { "id": 339, "front": "guten Appetit", "back": "enjoy your meal" },
  { "id": 340, "front": "das Eis", "back": "ice cream" },
  { "id": 341, "front": "zuerst", "back": "first" },
  { "id": 342, "front": "die Schokolade", "back": "chocolate" },
  { "id": 343, "front": "ein bisschen", "back": "a little" },
  { "id": 344, "front": "die Verabredung", "back": "appointment / date" },
  { "id": 345, "front": "die WG (Wohngemeinschaft)", "back": "shared flat" },
  { "id": 346, "front": "Viertel", "back": "quarter" },
  { "id": 347, "front": "die Pizza", "back": "pizza" },
  { "id": 348, "front": "halb", "back": "half" },
  { "id": 349, "front": "vor", "back": "before / in front of" },
  { "id": 350, "front": "nach", "back": "after / to" },
  { "id": 351, "front": "das Mittagessen", "back": "lunch" },
  { "id": 352, "front": "Abendessen", "back": "dinner" },
  { "id": 353, "front": "perfekt", "back": "perfect" },
  { "id": 354, "front": "treffen", "back": "to meet" },
  { "id": 355, "front": "wieder", "back": "again" },
  { "id": 356, "front": "Informatik", "back": "computer science" },
  { "id": 357, "front": "malen", "back": "to paint" },
  { "id": 358, "front": "der Maler", "back": "painter" },
  { "id": 359, "front": "das Glas, Gläser", "back": "glass, glasses" },
  { "id": 360, "front": "der Wein", "back": "wine" },
  { "id": 361, "front": "Barock", "back": "Baroque" },
  { "id": 362, "front": "die Niederlande", "back": "Netherlands" },
  { "id": 363, "front": "das Beispiel", "back": "example" },
  { "id": 364, "front": "extrem", "back": "extreme" },
  { "id": 365, "front": "fotografieren", "back": "to photograph" },
  { "id": 366, "front": "das Foto", "back": "photo" },
  { "id": 367, "front": "posten", "back": "to post" },
  { "id": 368, "front": "der Post", "back": "post" },
  { "id": 369, "front": "das Phänomen", "back": "phenomenon" },
  { "id": 370, "front": "erklären", "back": "to explain" },
  { "id": 371, "front": "sozial", "back": "social" },
  { "id": 372, "front": "die Meinung", "back": "opinion" },
  { "id": 373, "front": "wissen", "back": "to know" },
  { "id": 374, "front": "das Pils", "back": "pilsner" },
  { "id": 375, "front": "der Milchkaffee", "back": "coffee with milk" },
  { "id": 376, "front": "sofort", "back": "immediately" },
  { "id": 377, "front": "die Linguistik", "back": "linguistics" },
  { "id": 378, "front": "das Bier", "back": "beer" },
  { "id": 379, "front": "gleich", "back": "right away / equal" },
  { "id": 380, "front": "das Vorlesungsende", "back": "end of lecture" },
  { "id": 381, "front": "die Pasta", "back": "pasta" },
  { "id": 382, "front": "vegetarisch", "back": "vegetarian" },
  { "id": 383, "front": "das Gemüse", "back": "vegetable" },
  { "id": 384, "front": "warten", "back": "to wait" },
  { "id": 385, "front": "die Minute, Minuten", "back": "minute, minutes" },
  { "id": 386, "front": "der Nachtisch", "back": "dessert" },
  { "id": 387, "front": "der Apfel, Äpfel", "back": "apple, apples" },
  { "id": 388, "front": "die Pommes", "back": "french fries" },
  { "id": 389, "front": "der Reis", "back": "rice" },
  { "id": 390, "front": "nächste", "back": "next" },
  { "id": 391, "front": "Frankreich", "back": "France" },
  { "id": 392, "front": "Französisch", "back": "French" },
  { "id": 393, "front": "der Alkohol", "back": "alcohol" },
  { "id": 394, "front": "bald", "back": "soon" },
  { "id": 395, "front": "die Schule", "back": "school" },
  { "id": 396, "front": "stimmt", "back": "correct / right" },
  { "id": 397, "front": "der Monat, Monate", "back": "month, months" },
  { "id": 398, "front": "müssen", "back": "must / have to" },
  { "id": 399, "front": "früh", "back": "early" },
  { "id": 400, "front": "aufstehen", "back": "to get up" },
  { "id": 401, "front": "das Klavier", "back": "piano" },
  { "id": 402, "front": "dauern", "back": "to last" },
  { "id": 403, "front": "der Bachelor", "back": "bachelor" },
  { "id": 404, "front": "ziemlich", "back": "quite" },
  { "id": 405, "front": "lang", "back": "long" },
  { "id": 406, "front": "auswendig", "back": "by heart" },
  { "id": 407, "front": "Lust haben", "back": "to feel like / have desire" },
  { "id": 408, "front": "der Nachmittag", "back": "afternoon" },
  { "id": 409, "front": "die Ökonomie", "back": "economy" },
  { "id": 410, "front": "die Politik", "back": "politics" },
  { "id": 411, "front": "die Moral", "back": "morality" },
  { "id": 412, "front": "Evangelische Theologie", "back": "Protestant theology" },
  { "id": 413, "front": "Griechisch", "back": "Greek" },
  { "id": 414, "front": "glücklich", "back": "happy" },
  { "id": 415, "front": "der Brief, Briefe", "back": "letter, letters" },
  { "id": 416, "front": "eine Vorlesung halten", "back": "to give a lecture" },
  { "id": 417, "front": "niemand", "back": "nobody" },
  { "id": 418, "front": "der Ort, Orte", "back": "place, places" },
  { "id": 419, "front": "Bayern", "back": "Bavaria" },
  { "id": 420, "front": "echt", "back": "real / really" },
  { "id": 421, "front": "mitmachen", "back": "to participate" },
  { "id": 422, "front": "gerade", "back": "straight / just now" },
  { "id": 423, "front": "die Caféteria", "back": "cafeteria" },
  { "id": 424, "front": "Ski fahren", "back": "to ski" },
  { "id": 425, "front": "langweilig", "back": "boring" },
  { "id": 426, "front": "nichts", "back": "nothing" },
  { "id": 427, "front": "die Bäckerei", "back": "bakery" },
  { "id": 428, "front": "lachen", "back": "to laugh" },
  { "id": 429, "front": "die Natur", "back": "nature" },
  { "id": 430, "front": "bestimmt", "back": "definitely / certain" },
  { "id": 431, "front": "wandern", "back": "to hike" },
  { "id": 432, "front": "das Konzert", "back": "concert" },
  { "id": 433, "front": "die Party", "back": "party" },
  { "id": 434, "front": "die Kneipe", "back": "pub" },
  { "id": 435, "front": "spazieren", "back": "to walk" },
  { "id": 436, "front": "die Perspektive", "back": "perspective" },
  { "id": 437, "front": "das Dokument", "back": "document" },
  { "id": 438, "front": "der / die Deutsche", "back": "the German" },
  { "id": 439, "front": "der Alltag", "back": "everyday life" },
  { "id": 440, "front": "Österreich", "back": "Austria" },
  { "id": 441, "front": "das Handy", "back": "mobile phone" },
  { "id": 442, "front": "weg", "back": "away" },
  { "id": 443, "front": "die SIM-Karte", "back": "SIM card" },
  { "id": 444, "front": "registrieren", "back": "to register" },
  { "id": 445, "front": "schwer", "back": "heavy / difficult" },
  { "id": 446, "front": "Lehrerin werden", "back": "to become a teacher" },
  { "id": 447, "front": "müde", "back": "tired" },
  { "id": 448, "front": "normalerweise", "back": "normally" },
  { "id": 449, "front": "die Hausarbeit", "back": "housework / paper" },
  { "id": 450, "front": "abholen", "back": "to pick up" },
  { "id": 451, "front": "romantisch", "back": "romantic" },
  { "id": 452, "front": "anrufen", "back": "to call (phone)" },
  { "id": 453, "front": "aufräumen", "back": "to clean up" },
  { "id": 454, "front": "nochmal", "back": "again" },
  { "id": 455, "front": "ernst", "back": "serious" },
  { "id": 456, "front": "lustig", "back": "funny" },
  { "id": 457, "front": "der Humor", "back": "humor" },
  { "id": 458, "front": "anziehen", "back": "to put on / dress" },
  { "id": 459, "front": "mitkommen", "back": "to come along" },
  { "id": 460, "front": "ausgehen", "back": "to go out" },
  { "id": 461, "front": "vorhaben", "back": "to plan" },
  { "id": 462, "front": "Prüfung", "back": "exam" },
  { "id": 463, "front": "wütend", "back": "angry" },
  { "id": 464, "front": "deprimiert", "back": "depressed" },
  { "id": 465, "front": "doof", "back": "stupid / silly" },
  { "id": 466, "front": "nervös", "back": "nervous" },
  { "id": 467, "front": "aussehen", "back": "to look (appearance)" },
  { "id": 468, "front": "vergessen", "back": "to forget" },
  { "id": 469, "front": "einschlafen", "back": "to fall asleep" },
  { "id": 470, "front": "das Leben", "back": "life" },
  { "id": 471, "front": "aufwachen", "back": "to wake up" },
  { "id": 472, "front": "traurig", "back": "sad" },
  { "id": 473, "front": "zufrieden", "back": "content / satisfied" },
  { "id": 474, "front": "der Nobelpreis", "back": "Nobel Prize" },
  { "id": 475, "front": "der Schriftsteller", "back": "writer" },
  { "id": 476, "front": "die Schweiz", "back": "Switzerland" },
  { "id": 477, "front": "dort", "back": "there" },
  { "id": 478, "front": "rauchen", "back": "to smoke" },
  { "id": 479, "front": "die Zigarre", "back": "cigar" },
  { "id": 480, "front": "der Spaziergang", "back": "walk / stroll" },
  { "id": 481, "front": "anschließend", "back": "subsequently" },
  { "id": 482, "front": "emigrieren", "back": "to emigrate" },
  { "id": 483, "front": "wollen", "back": "to want" },
  { "id": 484, "front": "das Picknick", "back": "picnic" },
  { "id": 485, "front": "bringen", "back": "to bring" },
  { "id": 486, "front": "dürfen", "back": "may / to be allowed" },
  { "id": 487, "front": "vorstellen", "back": "to introduce / imagine" },
  { "id": 488, "front": "jeder", "back": "everyone / every" },
  { "id": 489, "front": "die Ethik", "back": "ethics" },
  { "id": 490, "front": "der Politiker", "back": "politician" },
  { "id": 491, "front": "der Philosoph", "back": "philosopher" },
  { "id": 492, "front": "der Jugendliche", "back": "teenager / youth" },
  { "id": 493, "front": "nie", "back": "never" },
  { "id": 494, "front": "bleiben", "back": "to stay" },
  { "id": 495, "front": "zurück", "back": "back" },
  { "id": 496, "front": "die Arbeitsmöglichkeiten", "back": "job opportunities" },
  { "id": 497, "front": "ursprünglich", "back": "originally" },
  { "id": 498, "front": "die Zigarette", "back": "cigarette" },
  { "id": 499, "front": "der Wille", "back": "will" },
  { "id": 500, "front": "der Physiker", "back": "physicist" },
  { "id": 501, "front": "der Psychologe", "back": "psychologist" },
  { "id": 502, "front": "der Mediziner", "back": "medical doctor" },
  { "id": 503, "front": "absolut", "back": "absolute" },
  { "id": 504, "front": "nun", "back": "now" },
  { "id": 505, "front": "der Hund", "back": "dog" },
  { "id": 506, "front": "der Pudel", "back": "poodle" },
  { "id": 507, "front": "veröffentlichen", "back": "to publish" },
  { "id": 508, "front": "die Version", "back": "version" },
  { "id": 509, "front": "wenig", "back": "little" },
  { "id": 510, "front": "griechisch", "back": "Greek" },
  { "id": 511, "front": "der Titel", "back": "title" },
  { "id": 512, "front": "endlich", "back": "finally" },
  { "id": 513, "front": "die Großstadt", "back": "big city" },
  { "id": 514, "front": "neben", "back": "next to" },
  { "id": 515, "front": "seit", "back": "since / for" },
  { "id": 516, "front": "links", "back": "left" },
  { "id": 517, "front": "alternativ", "back": "alternative" },
  { "id": 518, "front": "die Kulturszene", "back": "culture scene" },
  { "id": 519, "front": "der Sänger", "back": "singer" },
  { "id": 520, "front": "die Band", "back": "band" },
  { "id": 521, "front": "der Straßenname", "back": "street name" },
  { "id": 522, "front": "der Charakter", "back": "character" },
  { "id": 523, "front": "die Boutique", "back": "boutique" },
  { "id": 524, "front": "die Bar", "back": "bar" },
  { "id": 525, "front": "rechts", "back": "right" },
  { "id": 526, "front": "billig", "back": "cheap" },
  { "id": 527, "front": "teuer", "back": "expensive" },
  { "id": 528, "front": "die Straße", "back": "street" },
  { "id": 529, "front": "sogar", "back": "even" },
  { "id": 530, "front": "die Polizei", "back": "police" },
  { "id": 531, "front": "die Droge, Drogen", "back": "drug, drugs" },
  { "id": 532, "front": "der Park", "back": "park" },
  { "id": 533, "front": "die U-Bahn", "back": "subway" },
  { "id": 534, "front": "die Station", "back": "station" },
  { "id": 535, "front": "Fahrrad", "back": "bicycle" },
  { "id": 536, "front": "steigen", "back": "to climb / rise" },
  { "id": 537, "front": "der Preis", "back": "price" },
  { "id": 538, "front": "die Wohnung", "back": "apartment" },
  { "id": 539, "front": "direkt", "back": "direct" },
  { "id": 540, "front": "damals", "back": "back then" },
  { "id": 541, "front": "das Ghetto", "back": "ghetto" },
  { "id": 542, "front": "die Mauer", "back": "wall" },
  { "id": 543, "front": "mitten", "back": "in the middle" },
  { "id": 544, "front": "Osten", "back": "East" },
  { "id": 545, "front": "Westen", "back": "West" },
  { "id": 546, "front": "der Bahnhof", "back": "train station" },
  { "id": 547, "front": "die Jugendherberge", "back": "youth hostel" },
  { "id": 548, "front": "der Garten", "back": "garden" },
  { "id": 549, "front": "geradeaus", "back": "straight ahead" },
  { "id": 550, "front": "Oktober", "back": "October" },
  { "id": 551, "front": "geben", "back": "to give" },
  { "id": 552, "front": "der Besuch", "back": "visit" },
  { "id": 553, "front": "fast", "back": "almost" },
  { "id": 554, "front": "der Dichter", "back": "poet" },
  { "id": 555, "front": "der Theologe", "back": "theologian" },
  { "id": 556, "front": "das Arbeitszimmer", "back": "study (room)" },
  { "id": 557, "front": "der Saal", "back": "hall" },
  { "id": 558, "front": "das Nationalmuseum", "back": "national museum" },
  { "id": 559, "front": "sitzen", "back": "to sit" },
  { "id": 560, "front": "die Atmosphäre", "back": "atmosphere" },
  { "id": 561, "front": "privat", "back": "private" },
  { "id": 562, "front": "die Mitte", "back": "middle" },
  { "id": 563, "front": "die Wand, Wände", "back": "wall, walls" },
  { "id": 564, "front": "hängen", "back": "to hang" },
  { "id": 565, "front": "erzählen", "back": "to tell" },
  { "id": 566, "front": "die Liebesgeschichte", "back": "love story" },
  { "id": 567, "front": "die Kunst", "back": "art" },
  { "id": 568, "front": "stehen", "back": "to stand" },
  { "id": 569, "front": "die Decke", "back": "ceiling / blanket" },
  { "id": 570, "front": "die Blume, Blumen", "back": "flower, flowers" },
  { "id": 571, "front": "das Blatt", "back": "leaf / sheet" },
  { "id": 572, "front": "die Antike", "back": "antiquity" },
  { "id": 573, "front": "liegen", "back": "to lie" },
  { "id": 574, "front": "das Kissen", "back": "pillow" },
  { "id": 575, "front": "das Fenster", "back": "window" },
  { "id": 576, "front": "der Schreibtisch", "back": "desk" },
  { "id": 577, "front": "produktiv", "back": "productive" },
  { "id": 578, "front": "diktieren", "back": "to dictate" },
  { "id": 579, "front": "hin", "back": "there (away from speaker)" },
  { "id": 580, "front": "her", "back": "here (towards speaker)" },
  { "id": 581, "front": "die Möbel", "back": "furniture" },
  { "id": 582, "front": "die Umgebung", "back": "surroundings" },
  { "id": 583, "front": "bequem", "back": "comfortable" },
  { "id": 584, "front": "passiv", "back": "passive" },
  { "id": 585, "front": "euch", "back": "you (plural, accusative/dative)" },
  { "id": 586, "front": "typisch", "back": "typical" },
  { "id": 587, "front": "die Studentenstadt", "back": "student city" },
  { "id": 588, "front": "mindestens", "back": "at least" },
  { "id": 589, "front": "Prozent", "back": "percent" },
  { "id": 590, "front": "zum Beispiel", "back": "for example" },
  { "id": 591, "front": "die Infrastruktur", "back": "infrastructure" },
  { "id": 592, "front": "der Fahrradfahrer", "back": "cyclist" },
  { "id": 593, "front": "uns", "back": "us" },
  { "id": 594, "front": "der / die Studierende", "back": "student" },
  { "id": 595, "front": "überall", "back": "everywhere" },
  { "id": 596, "front": "jung", "back": "young" },
  { "id": 597, "front": "hässlich", "back": "ugly" },
  { "id": 598, "front": "die Altstadt", "back": "old town" },
  { "id": 599, "front": "die Sehenswürdigkeit", "back": "sight / attraction" },
  { "id": 600, "front": "das Kino", "back": "cinema" },
  { "id": 601, "front": "einkaufen", "back": "to shop" },
  { "id": 602, "front": "weit", "back": "far" },
  { "id": 603, "front": "streiten", "back": "to argue" },
  { "id": 604, "front": "ausländisch", "back": "foreign" },
  { "id": 605, "front": "laut", "back": "loud" },
  { "id": 606, "front": "die Internationalität", "back": "internationality" },
  { "id": 607, "front": "die Kommune", "back": "commune" },
  { "id": 608, "front": "ideal", "back": "ideal" },
  { "id": 609, "front": "überhaupt", "back": "at all" },
  { "id": 610, "front": "das Wohnzimmer", "back": "living room" },
  { "id": 611, "front": "das Schlafzimmer", "back": "bedroom" },
  { "id": 612, "front": "schlafen", "back": "to sleep" },
  { "id": 613, "front": "wählen", "back": "to choose" },
  { "id": 614, "front": "die Ruhe", "back": "quiet / peace" },
  { "id": 615, "front": "kommunizieren", "back": "to communicate" },
  { "id": 616, "front": "die Kommunikation", "back": "communication" },
  { "id": 617, "front": "der Aktivismus", "back": "activism" },
  { "id": 618, "front": "kapitalistisch", "back": "capitalistic" },
  { "id": 619, "front": "die Demonstration", "back": "demonstration" },
  { "id": 620, "front": "der Bewohner", "back": "resident" },
  { "id": 621, "front": "feministisch", "back": "feminist" },
  { "id": 622, "front": "anbieten", "back": "to offer" },
  { "id": 623, "front": "das Wohnheim", "back": "dormitory" },
  { "id": 624, "front": "Nähe", "back": "proximity" },
  { "id": 625, "front": "möbliert", "back": "furnished" },
  { "id": 626, "front": "das Bett, Betten", "back": "bed, beds" },
  { "id": 627, "front": "der Schrank, Schränke", "back": "closet, closets" },
  { "id": 628, "front": "das Bücherregal", "back": "bookshelf" },
  { "id": 629, "front": "der Teppichboden", "back": "carpet floor" },
  { "id": 630, "front": "parken", "back": "to park" },
  { "id": 631, "front": "das Auto, Autos", "back": "car, cars" },
  { "id": 632, "front": "die Bushaltestelle", "back": "bus stop" },
  { "id": 633, "front": "verkaufen", "back": "to sell" },
  { "id": 634, "front": "der Kontakt", "back": "contact" },
  { "id": 635, "front": "deshalb", "back": "therefore" },
  { "id": 636, "front": "die Fremdsprache", "back": "foreign language" },
  { "id": 637, "front": "reservieren", "back": "to reserve" },
  { "id": 638, "front": "antworten", "back": "to answer" },
  { "id": 639, "front": "die Hilfe", "back": "help" },
  { "id": 640, "front": "einige", "back": "some" },
  { "id": 641, "front": "selbst", "back": "self / even" },
  { "id": 642, "front": "sondern", "back": "but (on the contrary)" },
  { "id": 643, "front": "der Nachbar", "back": "neighbor" },
  { "id": 644, "front": "die Geige", "back": "violin" },
  { "id": 645, "front": "merken", "back": "to notice" },
  { "id": 646, "front": "tagsüber", "back": "during the day" },
  { "id": 647, "front": "morgens", "back": "in the morning" },
  { "id": 648, "front": "abends", "back": "in the evening" },
  { "id": 649, "front": "ausschlafen", "back": "to sleep in" },
  { "id": 650, "front": "entspannen", "back": "to relax" },
  { "id": 651, "front": "kurz", "back": "short" },
  { "id": 652, "front": "die Pause", "back": "break" },
  { "id": 653, "front": "das Wochenende", "back": "weekend" },
  { "id": 654, "front": "der Beginn", "back": "beginning" },
  { "id": 655, "front": "tolerant", "back": "tolerant" },
  { "id": 656, "front": "nerven", "back": "to annoy" },
  { "id": 657, "front": "die Klingel", "back": "doorbell" },
  { "id": 658, "front": "täglich", "back": "daily" },
  { "id": 659, "front": "andererseits", "back": "on the other hand" },
  { "id": 660, "front": "umziehen", "back": "to move (house)" },
  { "id": 661, "front": "schonmal", "back": "ever / before" },
  { "id": 662, "front": "Lösung", "back": "solution" },
  { "id": 663, "front": "definitiv", "back": "definitively" },
  { "id": 664, "front": "die meisten", "back": "most" },
  { "id": 665, "front": "der Vermieter", "back": "landlord" },
  { "id": 666, "front": "das Instrument", "back": "instrument" },
  { "id": 667, "front": "digital", "back": "digital" },
  { "id": 668, "front": "problemlos", "back": "problem-free" },
  { "id": 669, "front": "lautlos", "back": "silent" },
  { "id": 670, "front": "die Hochschule", "back": "college / university" },
  { "id": 671, "front": "ignorieren", "back": "to ignore" },
  { "id": 672, "front": "sonst", "back": "otherwise" },
  { "id": 673, "front": "das Piano", "back": "piano" },
  { "id": 674, "front": "das Verständnis", "back": "understanding" },
  { "id": 675, "front": "der Druck", "back": "pressure" },
  { "id": 676, "front": "stundenlang", "back": "for hours" },
  { "id": 677, "front": "der Geburtstag", "back": "birthday" },
  { "id": 678, "front": "anfangen", "back": "to start" },
  { "id": 679, "front": "schauen", "back": "to look" },
  { "id": 680, "front": "nie gehört", "back": "never heard" },
  { "id": 681, "front": "die beiden", "back": "both" },
  { "id": 682, "front": "die Lieblingsgruppe", "back": "favorite band" },
  { "id": 683, "front": "die Bühne", "back": "stage" },
  { "id": 684, "front": "singen", "back": "to sing" },
  { "id": 685, "front": "bestellen", "back": "to order" },
  { "id": 686, "front": "die Karte", "back": "card / ticket" },
  { "id": 687, "front": "die Vorverkaufsstelle", "back": "ticket agency" },
  { "id": 688, "front": "tun", "back": "to do" },
  { "id": 689, "front": "das Ticket", "back": "ticket" },
  { "id": 690, "front": "heftig", "back": "intense / heavy" },
  { "id": 691, "front": "überlegen", "back": "to consider / think over" },
  { "id": 692, "front": "lassen", "back": "to let" },
  { "id": 693, "front": "ausverkauft", "back": "sold out" },
  { "id": 694, "front": "ausdrucken", "back": "to print out" },
  { "id": 695, "front": "Herzlichen Dank", "back": "Many thanks" },
  { "id": 696, "front": "gern geschehen", "back": "you're welcome" },
  { "id": 697, "front": "Auf Wiederhören", "back": "goodbye (on phone)" },
  { "id": 698, "front": "Tschüss", "back": "bye" },
  { "id": 699, "front": "auflegen", "back": "to hang up" },
  { "id": 700, "front": "schlimm", "back": "bad" },
  { "id": 701, "front": "einladen", "back": "to invite" },
  { "id": 702, "front": "erstmal", "back": "for now" },
  { "id": 703, "front": "der Finger", "back": "finger" },
  { "id": 704, "front": "weh tun", "back": "to hurt" },
  { "id": 705, "front": "üben", "back": "to practice" },
  { "id": 706, "front": "der Rücken", "back": "back (body)" },
  { "id": 707, "front": "die Note, Noten", "back": "grade, grades / note, notes" },
  { "id": 708, "front": "der Körper", "back": "body" },
  { "id": 709, "front": "passieren", "back": "to happen" },
  { "id": 710, "front": "die Gesundheit", "back": "health" },
  { "id": 711, "front": "der Orchestermusiker", "back": "orchestra musician" },
  { "id": 712, "front": "der Schmerz, Schmerzen", "back": "pain, pains" },
  { "id": 713, "front": "vorschlagen", "back": "to suggest" },
  { "id": 714, "front": "der Pianist", "back": "pianist" },
  { "id": 715, "front": "langsam", "back": "slow" },
  { "id": 716, "front": "schwach", "back": "weak" },
  { "id": 717, "front": "bauen", "back": "to build" },
  { "id": 718, "front": "komponieren", "back": "to compose" },
  { "id": 719, "front": "das Alter", "back": "age" },
  { "id": 720, "front": "das Symptom", "back": "symptom" },
  { "id": 721, "front": "das Fieber", "back": "fever" },
  { "id": 722, "front": "modern", "back": "modern" },
  { "id": 723, "front": "das Krankenhaus", "back": "hospital" },
  { "id": 724, "front": "besser", "back": "better" },
  { "id": 725, "front": "melancholisch", "back": "melancholic" },
  { "id": 726, "front": "beruflich", "back": "professionally" },
  { "id": 727, "front": "stark", "back": "strong" },
  { "id": 728, "front": "der Kopf", "back": "head" },
  { "id": 729, "front": "die Kopfschmerzen", "back": "headache" },
  { "id": 730, "front": "sollen", "back": "should" },
  { "id": 731, "front": "atmen", "back": "to breathe" },
  { "id": 732, "front": "letzten", "back": "last" },
  { "id": 733, "front": "der Sommer", "back": "summer" },
  { "id": 734, "front": "plötzlich", "back": "suddenly" },
  { "id": 735, "front": "die Behandlung", "back": "treatment" },
  { "id": 736, "front": "das Ohr", "back": "ear" },
  { "id": 737, "front": "angenehm", "back": "pleasant" },
  { "id": 738, "front": "empfehlen", "back": "to recommend" },
  { "id": 739, "front": "das Tattoo", "back": "tattoo" },
  { "id": 740, "front": "der Arm", "back": "arm" },
  { "id": 741, "front": "der Hals", "back": "neck" },
  { "id": 742, "front": "das Studio", "back": "studio" },
  { "id": 743, "front": "tätowieren", "back": "to tattoo" },
  { "id": 744, "front": "aufwachsen", "back": "to grow up" },
  { "id": 745, "front": "das Tier", "back": "animal" },
  { "id": 746, "front": "zeichnen", "back": "to draw" },
  { "id": 747, "front": "der Vogel", "back": "bird" },
  { "id": 748, "front": "die Isolation", "back": "isolation" },
  { "id": 749, "front": "positiv", "back": "positive" },
  { "id": 750, "front": "negativ", "back": "negative" },
  { "id": 751, "front": "die Freiheit", "back": "freedom" },
  { "id": 752, "front": "der Rockstar", "back": "rock star" },
  { "id": 753, "front": "die Malerei", "back": "painting" },
  { "id": 754, "front": "die Akademie", "back": "academy" },
  { "id": 755, "front": "Bildende Künste", "back": "fine arts" },
  { "id": 756, "front": "die Grafik", "back": "graphics" },
  { "id": 757, "front": "die Technik", "back": "technology / technique" },
  { "id": 758, "front": "reich", "back": "rich" },
  { "id": 759, "front": "bekannt", "back": "known / famous" },
  { "id": 760, "front": "tätowiert", "back": "tattooed" },
  { "id": 761, "front": "geometrisch", "back": "geometric" },
  { "id": 762, "front": "die Figur", "back": "figure" },
  { "id": 763, "front": "der Kitsch", "back": "kitsch" },
  { "id": 764, "front": "die Farbe", "back": "color" },
  { "id": 765, "front": "schwarz", "back": "black" },
  { "id": 766, "front": "das Original", "back": "original" },
  { "id": 767, "front": "der Kunde", "back": "customer" },
  { "id": 768, "front": "der Künstler", "back": "artist" },
  { "id": 769, "front": "akzeptieren", "back": "to accept" },
  { "id": 770, "front": "faszinierend", "back": "fascinating" },
  { "id": 771, "front": "das Motiv", "back": "motif" },
  { "id": 772, "front": "die Haut", "back": "skin" },
  { "id": 773, "front": "fotografisch", "back": "photographic" },
  { "id": 774, "front": "realistisch", "back": "realistic" },
  { "id": 775, "front": "abstrakt", "back": "abstract" },
  { "id": 776, "front": "die Komposition", "back": "composition" }
];

// --- הגדרת עיצובים (Inline Styles) ---
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'sans-serif',
    direction: 'rtl'
  },
  header: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '24px',
    color: '#2563eb'
  },
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center'
  },
  statsBox: {
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'space-around',
    fontWeight: 'bold'
  },
  textGreen: { color: '#16a34a' },
  textRed: { color: '#ef4444' },
  textGray: { color: '#6b7280' },
  
  primaryButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'background-color 0.2s'
  },
  dangerButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: '500',
    border: '2px solid #b91c1c',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'background-color 0.2s'
  },
  resetLink: {
    color: '#9ca3af',
    fontSize: '14px',
    marginTop: '32px',
    textDecoration: 'underline',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  },
  gameContainer: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  gameHeader: {
    marginBottom: '16px',
    color: '#4b5563',
    fontWeight: '500'
  },
  card: {
    position: 'relative',
    width: '100%',
    height: '250px',
    cursor: 'pointer',
    perspective: '1000px' // חובה לאפקט תלת מימד
  },
  cardInner: (isFlipped) => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    backgroundColor: 'white'
  }),
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden', // מסתיר את הצד האחורי כשהוא הפוך
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '16px'
  },
  cardFaceBack: {
    transform: 'rotateY(180deg)',
    backgroundColor: '#f9fafb'
  },
  cardText: {
    fontSize: '2.5rem', // text-4xl
    fontWeight: 'bold',
    color: '#1f2937'
  },
  cardSubtext: {
    fontSize: '0.875rem', // text-sm
    color: '#9ca3af',
    textTransform: 'uppercase',
    marginBottom: '8px'
  },
  hintText: {
    fontSize: '0.875rem',
    color: '#60a5fa',
    marginTop: '8px'
  },
  controls: {
    display: 'flex',
    gap: '16px',
    marginTop: '32px',
    width: '100%'
  },
  controlButton: (type) => ({
    flex: 1,
    padding: '16px',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '1.125rem',
    cursor: 'pointer',
    border: type === 'know' ? '1px solid #22c55e' : '1px solid #ef4444',
    backgroundColor: type === 'know' ? '#dcfce7' : '#fee2e2',
    color: type === 'know' ? '#16a34a' : '#dc2626',
    transition: 'background-color 0.2s'
  }),
  exitButton: {
    marginTop: '24px',
    color: '#6b7280',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem'
  }
};

function App() {
  // 1. טעינת נתונים חכמה + הוספת שדה סטטוס אוטומטית
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem('flashcards-data');
    if (saved) {
      return JSON.parse(saved);
    }
    // אם זו פעם ראשונה - נוסיף לכל מילה סטטוס 'לא נלמד'
    return initialWords.map(card => ({ ...card, status: 'unlearned' }));
  });

  // משתנים למצב משחק
  const [sessionCards, setSessionCards] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayMode, setIsPlayMode] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('');

  // 2. שמירה אוטומטית בכל שינוי
  useEffect(() => {
    localStorage.setItem('flashcards-data', JSON.stringify(cards));
  }, [cards]);

  // פונקציה להתחלת תרגול רגיל (ערבוב הכל)
  const startStandardSession = () => {
    const shuffled = [...cards].sort(() => 0.5 - Math.random());
    setSessionCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionTitle('תרגול כללי (מעורבב)');
    setIsPlayMode(true);
  };

  // 3. הפונקציה לתרגול 20 מילים קשות
  const startHardSession = () => {
    const unknownCards = cards.filter(card => card.status === 'dont_know');
    
    if (unknownCards.length === 0) {
      alert("אין כרגע מילים שסימנת כ'לא יודע'. כל הכבוד!");
      return;
    }

    const sessionBatch = unknownCards.slice(0, 20);
    
    setSessionCards(sessionBatch);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionTitle(`תרגול מילים קשות (${sessionBatch.length} מילים)`);
    setIsPlayMode(true);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleVote = (status) => {
    const currentCardId = sessionCards[currentIndex].id;

    // עדכון הרשימה הראשית
    setCards(prevCards => prevCards.map(card => 
      card.id === currentCardId ? { ...card, status: status } : card
    ));

    // מעבר לקלף הבא
    if (currentIndex < sessionCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      alert("כל הכבוד! סיימת את הסשן.");
      setIsPlayMode(false);
    }
  };

  const stats = {
    known: cards.filter(c => c.status === 'know').length,
    unknown: cards.filter(c => c.status === 'dont_know').length,
    total: cards.length
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Flashcards German</h1>

      {!isPlayMode ? (
        <div style={styles.dashboard}>
          
          <div style={styles.statsBox}>
            <div style={styles.textGreen}>✅ יודע: {stats.known}</div>
            <div style={styles.textRed}>❌ לא יודע: {stats.unknown}</div>
            <div style={styles.textGray}>סה"כ: {stats.total}</div>
          </div>

          <button 
            onClick={startStandardSession}
            style={styles.primaryButton}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            התחל תרגול רגיל (מעורבב)
          </button>

          {stats.unknown > 0 && (
            <button 
              onClick={startHardSession}
              style={styles.dangerButton}
              onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
            >
              תרגל {Math.min(20, stats.unknown)} מילים שלא ידעתי
            </button>
          )}
          
          <button 
            onClick={() => {
                if(window.confirm('האם אתה בטוח? זה יאפס את כל ההתקדמות שלך.')) {
                    localStorage.removeItem('flashcards-data');
                    window.location.reload();
                }
            }}
            style={styles.resetLink}
          >
            איפוס נתונים
          </button>
        </div>
      ) : (
        <div style={styles.gameContainer}>
          <div style={styles.gameHeader}>
            {sessionTitle} | קלף {currentIndex + 1} מתוך {sessionCards.length}
          </div>

          {/* אזור הכרטיסייה */}
          <div style={styles.card} onClick={handleFlip}>
            <div style={styles.cardInner(isFlipped)}>
              
              {/* צד קדמי */}
              <div style={{...styles.cardFace, ...styles.cardFaceFront}}>
                <span style={styles.cardSubtext}>
                  גרמנית
                </span>
                <h2 style={styles.cardText}>
                  {sessionCards[currentIndex].front}
                </h2>
                <p style={styles.hintText}>(לחץ להפיכה)</p>
              </div>

              {/* צד אחורי */}
              <div style={{...styles.cardFace, ...styles.cardFaceBack}}>
                <span style={styles.cardSubtext}>
                  תרגום
                </span>
                <h2 style={styles.cardText}>
                  {sessionCards[currentIndex].back}
                </h2>
              </div>

            </div>
          </div>

          <div style={styles.controls}>
            <button 
              onClick={() => handleVote('dont_know')}
              style={styles.controlButton('dont_know')}
              onMouseOver={(e) => e.target.style.backgroundColor = '#fecaca'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#fee2e2'}
            >
              ❌ לא ידעתי
            </button>
            <button 
              onClick={() => handleVote('know')}
              style={styles.controlButton('know')}
              onMouseOver={(e) => e.target.style.backgroundColor = '#bbf7d0'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#dcfce7'}
            >
              ✅ ידעתי
            </button>
          </div>
          
          <button 
            onClick={() => setIsPlayMode(false)}
            style={styles.exitButton}
          >
            צא מהסשן
          </button>
        </div>
      )}
    </div>
  );
}

export default App;