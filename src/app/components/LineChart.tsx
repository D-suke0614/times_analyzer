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

function LineChart({ messages, channelName }: Props) {
  const labels: string[] = messages.map((message: any[], idx: number) => `${idx + 1}months`)

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
    // scales: {
    //   y: {
    //     ticks: {
    //       stepSize: 1
    //     }
    //   }
    // }
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
