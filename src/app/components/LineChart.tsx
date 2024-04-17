/* eslint-disable import/named */
'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
  ChartData,
  Title,
  Legend,
} from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Legend)

type Props = {
  channelCreatorsConversations: any
  channelName: string
}

// 日付オブジェクトをあらかじめ作っておく
const DATE = new Date()
const getMonth = (idx: number) => {
  return DATE.getMonth() + idx
}

function LineChart({ channelCreatorsConversations, channelName }: Props) {
  const labels: string[] = channelCreatorsConversations[0].conversations.map(
    (message: any[], idx: number) => `${getMonth(idx + 1)}月`,
  )

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        position: 'top',
        text: channelName,
      },
    },
    scales: {
      y: {
        min: 0,
      },
    },
  }

  const BORDER_COLORS = ['#87cefa', '#7cfc00', '#ffebcd', '#dda0dd', '#d2691e']
  const data: ChartData<'line'> = {
    labels,
    datasets: channelCreatorsConversations.map((channelCreatorConversations: any, idx: number) => {
      return {
        label: channelCreatorConversations.channelInfo.name,
        data: channelCreatorConversations.conversations.map((message: any[]) => message.length),
        borderColor: BORDER_COLORS[idx],
      }
    }),
  }
  return <Line options={options} data={data} />
}

export default LineChart
