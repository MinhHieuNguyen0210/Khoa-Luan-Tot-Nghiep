import { useEffect, useState, useRef } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

export default function AppConversionRates() {
  const [productNames, setProductNames] = useState([]);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    async function fetchProductList() {
      const requestUrl = 'https://foody-store-server.herokuapp.com/products?isDeleted=false';
      const response = await fetch(requestUrl);
      const responseJSON = await response.json();
      console.log({
        responseJSON
      });
      const data = responseJSON;
      const resObj = data.map((item) =>
        // eslint-disable-next-line no-lone-blocks
        ({
          // eslint-disable-next-line prettier/prettier
          name: item.name,
          quantity: item.quantity
        })
      );
      const chartData = [];
      const productNames = [];
      resObj.forEach((item) => {
        chartData.push(item.quantity);
        productNames.push(item.name);
      });
      setChartData(chartData);
      setProductNames(productNames);
      console.log(resObj);
    }
    fetchProductList();
  }, []);

  const CHART_DATA = [{ name: 'quanity', data: chartData }];
  const categoriesData = productNames;
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        // formatter: (seriesName) => fNumber(seriesName),
        title: {
          // formatter: (seriesName) => `${seriesName}`
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '40%', borderRadius: 1 }
    },
    xaxis: {
      categories: categoriesData
    }
  });

  return (
    <Card>
      <CardHeader title="Product Quantity Statictics " subheader="" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={600} />
      </Box>
    </Card>
  );
}
