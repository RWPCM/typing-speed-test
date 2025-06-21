import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Session {
  date: string;
  time: string;
  inputText: string;
  wpm: number;
  timestamp: number;
}

const WpmChart: React.FC = () => {
  const chartData = React.useMemo(() => {
    const sessions = JSON.parse(localStorage.getItem('typingSessions') || '[]') as Session[];
    const now = new Date();
    const threeMonthsAgo = new Date(now);
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const recentSessions = sessions.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate >= threeMonthsAgo;
    });

    const groupedSessions = recentSessions.reduce((acc, session) => {
      const date = session.date;
      if (!acc[date]) {
        acc[date] = { 
          min: session.wpm, 
          max: session.wpm,
          wpms: [session.wpm]
        };
      } else {
        acc[date].min = Math.min(acc[date].min, session.wpm);
        acc[date].max = Math.max(acc[date].max, session.wpm);
        acc[date].wpms.push(session.wpm);
      }
      return acc;
    }, {} as { [key: string]: { min: number; max: number; wpms: number[] } });

    const dates = Object.keys(groupedSessions).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const minData = dates.map(date => groupedSessions[date].min);
    const maxData = dates.map(date => groupedSessions[date].max);
    const medianData = dates.map(date => {
      const wpms = groupedSessions[date].wpms.sort((a, b) => a - b);
      const middle = Math.floor(wpms.length / 2);
      if (wpms.length % 2 === 0) {
        return (wpms[middle - 1] + wpms[middle]) / 2;
      }
      return wpms[middle];
    });

    return {
      labels: dates,
      datasets: [
        {
          label: 'Min WPM',
          data: minData,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1,
          fill: false,
        },
        {
          label: 'Max WPM',
          data: maxData,
          borderColor: 'rgba(54, 162, 235, 1)',
          tension: 0.1,
          fill: false,
        },
        {
          label: 'Median WPM',
          data: medianData,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1,
          fill: false,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxHeight: 0,
          boxWidth: 20,
          padding: 8
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'WPM',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-page">
      <h2>Words Per Minute (WPM) history (last 3 months)</h2>
      <div className="wpm-chart-container">
        <div className="wpm-chart">
          <Line
            data={chartData}
            options={chartOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default WpmChart;
