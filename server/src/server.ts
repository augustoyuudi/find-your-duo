import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convertHourStringToMinutes';
import { convertMinuteStringToHours } from './utils/counvertMinuteStringToHours';

const app = express()

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient()

app.post('/game', async (request, response) => {
  const { title, bannerUrl } = request.body

  const game = await prisma.game.create({
    data: {
      title,
      bannerUrl
    }
  })

  return response.status(201).json(game)
})

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  });

  return response.json(games);
});

app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id
  const { name, yearsPlaying, discord, weekDays, startHour, endHour, useVoiceChannel } = request.body

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays: weekDays.join(','),
      startHour: convertHourStringToMinutes(startHour),
      endHour: convertHourStringToMinutes(endHour),
      useVoiceChannel
    }
  })

  return response.status(201).json(ad)
});

app.get('/games/:id/ads', async (request, response) => {
  const gameId: string = request.params.id

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      yearsPlaying: true,
      weekDays: true,
      startHour: true,
      endHour: true,
      useVoiceChannel: true
    },
    where: {
      gameId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return response.json(ads.map(ad => ({
    ...ad,
    weekDays: ad.weekDays.split(','),
    startHour: convertMinuteStringToHours(ad.startHour),
    endHour: convertMinuteStringToHours(ad.endHour)
  })))
})

app.get('/ads/:id/discord', async (request, response) => {
  const adId: string = request.params.id

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adId
    }
  })

  return response.json({
    discord: ad.discord
  })
})

app.listen(3333)