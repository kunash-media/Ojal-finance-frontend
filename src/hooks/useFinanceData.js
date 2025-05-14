import { useState, useEffect } from 'react';
import {
  getLineChartData,
  getBarChartData,
  getPieChartData,
  getCustomersData,
  getStatCardsData
} from '../api/financeApi';

export const useFinanceData = () => {
  const [data, setData] = useState({
    lineChart: null,
    barChart: null,
    pieChart: null,
    customers: null,
    stats: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lineChart, barChart, pieChart, customers, stats] = await Promise.all([
          getLineChartData(),
          getBarChartData(),
          getPieChartData(),
          getCustomersData(),
          getStatCardsData()
        ]);

        setData({
          lineChart,
          barChart,
          pieChart,
          customers,
          stats,
          loading: false,
          error: null
        });
      } catch (error) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    };

    fetchData();
  }, []);

  return data;
};