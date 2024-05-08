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
import { TChannelCreatorsConversations } from '../types'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Legend)

type Props = {
  channelCreatorsConversations: TChannelCreatorsConversations
  channelName: string
}

// 日付オブジェクトをあらかじめ作っておく
const DATE = new Date()
const getMonth = (idx: number) => {
  return DATE.getMonth() + idx
}

function LineChart({ channelCreatorsConversations }: Props) {
  const labels: string[] = channelCreatorsConversations[0].conversations.map(
    (_, idx: number) => `${getMonth(idx + 1)}月`,
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
        text: 'timesチャンネルの投稿数の分析結果',
      },
    },
    scales: {
      y: {
        min: 0,
      },
    },
  }

  /**
   * グラフの各凡例のボーダーカラー
   */
  const BORDER_COLORS = ['#87cefa', '#7cfc00', '#ffebcd', '#dda0dd', '#d2691e']
  /**
   * グラフの各凡例の背景色
   */
  const BACKGROUND_COLOR = ['#87cefa80', '#7cfc0080', '#ffebcd80', '#dda0dd80', '#d2691e80']
  const data: ChartData<'line'> = {
    labels,
    datasets: channelCreatorsConversations.map((channelCreatorConversations, idx: number) => {
      return {
        label: channelCreatorConversations.channelInfo.name,
        data: channelCreatorConversations.conversations.map((message) => message.length),
        borderColor: BORDER_COLORS[idx],
        backgroundColor: BACKGROUND_COLOR[idx],
      }
    }),
  }
  return <Line options={options} data={data} />
}

export default LineChart
