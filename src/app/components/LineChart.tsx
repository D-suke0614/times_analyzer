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
} from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title)

type Props = {
  messages: any
  channelName: string
}

// 日付オブジェクトをあらかじめ作っておく
const DATE = new Date()
const getMonth = (idx: number) => {
  return DATE.getMonth() + idx
}

function LineChart({ messages, channelName }: Props) {
  const labels: string[] = messages.map((message: any[], idx: number) => `${getMonth(idx + 1)}月`)

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

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        data: messages.map((message: any[]) => message.length),
        borderColor: 'rgb(53, 162, 235)',
      },
    ],
  }
  return <Line options={options} data={data} />
}

export default LineChart
