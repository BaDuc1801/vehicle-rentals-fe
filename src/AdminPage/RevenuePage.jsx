import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import { Select } from 'antd';
import paymentService from '../Services/paymentService'; 

const groupPaymentsByMonth = (payments) => {
  const monthlyRevenue = {};

  payments.forEach((payment) => {
    const monthKey = dayjs(payment.createdAt).format('YYYY-MM');  // Gom theo tháng
    if (!monthlyRevenue[monthKey]) {
      monthlyRevenue[monthKey] = 0;
    }
    monthlyRevenue[monthKey] += payment.totalPrice;
  });

  const months = Object.keys(monthlyRevenue).sort();  // Sắp xếp theo thời gian
  const revenue = months.map((month) => monthlyRevenue[month]);

  return { months, revenue };
};

const RevenuePage = () => {
  const [payments, setPayments] = useState([]); 
  const [selectedYear, setSelectedYear] = useState(dayjs().year());  
  const [filteredPayments, setFilteredPayments] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await paymentService.getAllPayment();  
        setPayments(data.filter((payment) => payment.status === 'completed'));  
      } catch (error) {
        console.error("Error fetching payments: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = payments.filter(payment =>
      dayjs(payment.createdAt).year() === selectedYear
    );
    setFilteredPayments(filtered);
  }, [payments, selectedYear]);

  const { months, revenue } = groupPaymentsByMonth(filteredPayments);  

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 400,
      toolbar: { show: false }
    },
    title: {
      text: `Doanh thu theo tháng - Năm ${selectedYear}`,
      align: 'center',
      style: { fontSize: '24px', fontWeight: 'bold' }
    },
    xaxis: {
      categories: months,
      title: {
        text: 'Tháng'
      }
    },
    yaxis: {
      title: {
        text: 'Doanh thu (VND)'
      },
      labels: {
        formatter: (val) => val.toLocaleString('vi-VN') + ' ₫'
      }
    },
    tooltip: {
      y: {
        formatter: (val) => val.toLocaleString('vi-VN') + ' ₫'
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => val.toLocaleString('vi-VN') + ' ₫',
      style: { fontSize: '12px' }
    },
    colors: ['#00b894']
  };

  const chartSeries = [
    {
      name: 'Doanh thu',
      data: revenue
    }
  ];

  return (
    <div className="bg-white p-6">
      <div className="mb-4">
        <Select
          defaultValue={selectedYear}
          onChange={setSelectedYear}
          options={[2023, 2024, 2025].map(year => ({ value: year, label: year }))}
          size="large"
        />
      </div>

      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={400}
      />
    </div>
  );
};

export default RevenuePage;
