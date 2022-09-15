from bs4 import BeautifulSoup
import os
import requests

if __name__ == '__main__':
  file = open(os.getcwd() + '/twitch.html')

  soup = BeautifulSoup(file, 'html.parser')

  images = soup.find_all('img', class_='tw-image')

  newImages = images[5:]

  games = []

  for image in newImages:
    attrs = image.attrs
    sanitizedAlt = attrs['alt'].split()
    del sanitizedAlt[-2:]
    game = {
      'title': ' '.join(sanitizedAlt),
      'bannerUrl': attrs['src']
    }
    games.append(game)

  for game in games:
    r = requests.post('http://localhost:3333/game', json = game)
