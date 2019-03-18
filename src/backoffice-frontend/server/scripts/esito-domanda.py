import sys
import json
import os
import string
import random
import names
import time


def main():
  if os.path.exists("lista-esito-Domande.ts"):
    os.remove("lista-esito-Domande.ts")

  sys.stdout = open("lista-esito-Domande.ts", "w")
  print('export const ESITO = {')
  for count in range(1, 1000):
    generateEsitoDomanda(count)
  print('}')


class Spid(object):
  codiceFiscale = ""
  nome = ''
  cognome = ''
  dataNascita = ''
  luogoDiNascita = ''
  residenza = ''
  via = ''
  telefono = ''
  email = ''
  domDigitale = ''


class Istruzione(object):
  istitutoFrequentato = ''
  tipoDiploma = ''
  annoDiploma = ''
  provinciaIstituto = ''
  comuneIstituto = ''
  sedeIstituto = ''


class CategorieProtette(object):
  isCategorieProtette = ''
  percInvalidita = ''
  dataCertificazione = ''
  enteRilascioCertificato = ''
  ausilioProva = ''
  tempiAggiuntivi = ''
  esenzioneProvaSelettiva = ''


# Crea 11 caratteri alfanumerici a caso, non fa il check di nome e cognome

def codiceFiscaleGenerator(size=16, chars=string.ascii_uppercase + string.digits):
  return ''.join(random.choice(chars) for _ in range(size))


### FUNZIONE:  Genera un file json

def generateEsitoDomanda(id):
  # DATASTE SPID

  randomDate = ['02/12/94', '01/03/90', '29/05/80', '15/05/89', '12/12/90']
  randomLuogoNascita = ['Roma', 'Milano', 'Napoli', 'Bari', 'Venezia']
  randomVia = ['Via dei cosi', 'Via delle cose', 'Via delle super cose', 'Via delle poche cose', 'Via caso']
  randomTelefono = ['2323232323', '5454545454', '5252525252']
  randomEmail = ['ma@gmail.com', 'do@gmail.com', 'kiki@gmail.com']
  randomDomDig = 'dom.pec@gmail.it'

  # DATASET ISTRUZIONE

  randomIstitutoFrequentato = ['Ceccherelli', 'Federico Caffè', 'Visconti', 'Keplero']
  randomTipoDiploma = ['Tecnico Commerciale', 'Artistico', 'Scientifico', 'Geometra']
  randomAnnoDiploma = ['1990', '1991', '1983', '1994', '1995']
  randomAnnoInvio = ['02/03/19', '03/05/19', '12/03/19', '22/03/19', '01/05/19']
  randomProvinciaIstituto = ['Roma', 'Alessandria', 'Ancona', 'Arezzo']
  randomComuneIstituto = ['Roma', 'Acate', 'Accumoli', 'Potenza']
  randomSedeIstituto = ['Via dei cosi', 'Via degli alberti', 'Via del vaticano', 'Via paola']

  # DATASET LINGUE STRANIERE
  randomLinguaSelezionata = ['Inglese', 'Francese', 'Spagnolo', 'Tedesco']
  # DATASET TITOLI PREFERENZIALI
  randomTitoliPreferenziali = ['Titolo 1', 'Titolo 2', 'Titolo 3', 'Figli a carico']
  randomFigliACarico = [1, 2, 3, 4]

  # DATASET RISERVE
  randomRiserve = ['Riserva 1', 'Riserva 2']

  # DATASET CATEGORIE PROTETTE
  randomCategorieProtette = [1, 0]
  randomPercInvalidita = [0, 25, 50, 75]
  randomdataCertificazione = ['02/12/12', '21/01/19']
  randomEnteRilascio = ['ASL', 'RASL', 'CASL']
  randomAusilioProva = [1, 0]
  randomTempiAggiuntivi = [1, 0]
  randomEsenzioneProvaSelettiva = [1, 0]

  # SPID

  spid = Spid()
  spid.codiceFiscale = codiceFiscaleGenerator()
  spid.nome = names.get_first_name()
  spid.cognome = names.get_last_name()
  spid.dataNascita = random.choice(randomDate)
  spid.luogoDiNascita = random.choice(randomLuogoNascita)
  spid.residenza = random.choice(randomLuogoNascita)
  spid.via = random.choice(randomVia)
  spid.telefono = random.choice(randomTelefono)
  spid.email = random.choice(randomEmail)
  spid.domDigitale = random.choice(randomDomDig)

  # FINE SPID

  # ISTRUZIONE

  istruzione = Istruzione()
  istruzione.istitutoFrequentato = random.choice(randomIstitutoFrequentato)
  istruzione.tipoDiploma = random.choice(randomTipoDiploma)
  istruzione.annoDiploma = random.choice(randomAnnoDiploma)
  istruzione.provinciaIstituto = random.choice(randomProvinciaIstituto)
  istruzione.comuneIstituto = random.choice(randomComuneIstituto)
  istruzione.sedeIstituto = random.choice(randomSedeIstituto)

  # FINE ISTRUZIONE

  # LINGUA

  linguaSelezionata = random.choice(randomLinguaSelezionata)
  idLingua = randomLinguaSelezionata.index(linguaSelezionata)

  # FINE LINGUA

  # TITOLI PREFERENZIALI

  titoloSelezionato = random.choice(randomTitoliPreferenziali)
  aventeFigli = (titoloSelezionato == 'Figli a carico')

  if (aventeFigli):
    numFigli = random.choice(randomFigliACarico)
  else:
    numFigli = 0

  # FINE TITOLI PREFERENZIALI

  # CATEGORIE PROTETTE

  catProtette = CategorieProtette()
  catProtette.isCategorieProtette = random.choice(randomCategorieProtette)

  if (catProtette.isCategorieProtette):
    catProtette.percInvalidita = random.choice(randomPercInvalidita)
    catProtette.dataCertificazione = random.choice(randomdataCertificazione)
    catProtette.enteRilascioCertificato = random.choice(randomEnteRilascio)
    catProtette.ausilioProva = random.choice(randomAusilioProva)
    catProtette.tempiAggiuntivi = random.choice(randomTempiAggiuntivi)
    catProtette.esenzioneProvaSelettiva = random.choice(randomEsenzioneProvaSelettiva)

  if (catProtette.isCategorieProtette == 0):
    catProtette.percInvalidita = ''
    catProtette.dataCertificazione = ''
    catProtette.enteRilascioCertificato = ''
    catProtette.ausilioProva = ''
    catProtette.tempiAggiuntivi = ''
    catProtette.esenzioneProvaSelettiva = ''

  # FINE CATEGORIE PROTETTE

  # ESITO

  randomEsitoProva = ['AMMESSO', 'ASSENTE GIUSTIFICATO', 'SUPERATA'];




  # Anagrafica

  my_dict = {
    'idConcorso'  : 1,
    'id': id,
    'idEsito': id,
    'prove': [
            {
              'dataProva' : random.choice(randomAnnoInvio),
              'nomeProva' : 'PROVA SELETTIVA',
              'sessione'  : '1',
              'esito'     : random.choice(randomEsitoProva),
              'punteggio' : int(random.uniform(1,99)),
              'allegati'  : 'nessuno',
            },
            {
              'dataProva' : random.choice(randomAnnoInvio),
              'nomeProva' : 'PROVA NUOTO',
              'sessione'  : '1',
              'esito'     : random.choice(randomEsitoProva),
              'punteggio' : int(random.uniform(1,99)),
              'allegati'  : 'nessuno',
            },
            {
                'dataProva': random.choice(randomAnnoInvio),
                'nomeProva': 'PROVA MOTORIO ATTITUDINALE',
                'sessione': '1',
                'esito': random.choice(randomEsitoProva),
                'punteggio' : int(random.uniform(1,99)),
                'allegati'  : 'nessuno',
            },
            {
                'dataProva': random.choice(randomAnnoInvio),
              'nomeProva': 'COLLOQUIO',
              'sessione': '1',
              'esito': random.choice(randomEsitoProva),
              'punteggio': int(random.uniform(1,99)),
              'allegati': 'nessuno',
            }],
  }
  print(id, ':', json.dumps(my_dict), ',')


main()
