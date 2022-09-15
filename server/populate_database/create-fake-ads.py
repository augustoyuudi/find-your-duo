from faker import Faker
import requests
from random import randrange, getrandbits, sample

def generateWeekDays():
  days = randrange(7)
  weekDays = sample(range(7), days)

  return weekDays

def generateAd():
  name = fake.name()
  discordNumber = randrange(9999)
  ad = {
    'name': name,
    'yearsPlaying': randrange(11),
    'discord': f'{name} #{discordNumber}',
    'weekDays': generateWeekDays(),
    'startHour': f'{randrange(12, 19)}:00',
    'endHour': f'{randrange(18, 24)}:00',
    'useVoiceChannel': bool(getrandbits(1))
  }

  return ad

if __name__ == '__main__':
  fake = Faker(['pt_BR', 'en_US', 'ja_JP'])

  games = requests.get('http://localhost:3333/games')
  games = games.json()

  for game in games:
    adsUrl = f'http://localhost:3333/games/{game["id"]}/ads'

    for i in range(randrange(6)):
      generatedAd = requests.post(adsUrl, json = generateAd())
      print(generatedAd.json())