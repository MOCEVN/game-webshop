# Expert review

## K3:

Ik heb nu voor de API-endpoint voor producten toevoegen meerdere routes die beschrijven wat ze doen in de url, maar ik kan in plaats daarvan één route hebben (/store-content) en een POST request sturen om een product toe te voegen aan de database. En om in één route meerdere soorten data (één enkele product of meerdere producten tegelijkertijd) te accepteren kan ik de data altijd als een array sturen. Dan hoeft de api niet te checken of het maar één product is of meerdere.  
Ik check nu de authorization door bij elke request de userdata van de database te halen, maar dat is inefficient. Ik kan beter de data maar één keer ophalen tijdens het inloggen en opslaan in de JWT.

## K1:

In mijn code heb ik classes die overerven van LitElement.  
Voor een ander voorbeeld van inheritance kan ik een algemene product class maken en daaronder specifieker een game en een merch class maken. De product class heeft dan algemene properties: id,name,description etc., en de game en merch class hebben dan specifiekere properties: author voor game, materiaal voor merch.  
Ik kan ook een algemene database class maken en daaronder specifiek een class voor products en een class voor users.
