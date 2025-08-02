import React, { useEffect } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { setPercentage } from '../features/stockPercentageSlice';


// #cd5050
// #0088FE


const COLORS = ['#0088FE', ' #cd5050',];
const RADIAN = Math.PI / 180;

// ✅ This renders the % inside each slice
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);




  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={14}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// ✅ This renders the name label at the end of the label line
const renderNameLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  name,
}) => {
  const radius = outerRadius + 15;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={14}
      fontWeight="bold"
    >
      {name}
    </text>
  );
};

const PieChartComponent = ({
  products = { inStock: 50, outOfStock: 50, message: 'This is dummy example' },

}) => { 
  // this is array which will serve in pie chart
  const data = [
    { name: 'In Stock', value: 0 },
    { name: 'Out of Stock', value: 0 },
  ]; 

  // so here make percentage and put in that array
  const total = products.inStock + products.outOfStock 
  data[0].value =   (products.inStock / total * 100) 
  data[1].value = (products.outOfStock / total * 100)


  

  return (
    <div className="h-[400px] w-full p-4 bg-gray-400 dark:bg-gray-800 rounded-xl shadow-xl">
      {products.message &&
        <p
          className='text-yellow-700 font-bold text-center'
        >
          {products.message}
        </p>
      }
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* ✅ Main Pie with percent label inside */}
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={145}
            // fill="#8884d8"
            fill="#8884d8"
            dataKey="value"
            animationDuration={1000}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          {/* ✅ Transparent Pie just for name labels on line end */}
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={155}
            fill="transparent"
            dataKey="value"
            labelLine={false}
            label={renderNameLabel}
            stroke='transparent'
            isAnimationActive={false} // prevent flickering
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
