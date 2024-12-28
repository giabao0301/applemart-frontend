/** @format */
"use client";
import formatPrice from "@/utils/priceFormatter";
import React from "react";
import {
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

type Props = {};

const data = [
  {
    name: "1",
    total: Math.floor(Math.random() * 1000000000) + 1000000,
  },
  {
    name: "2",
    total: Math.floor(Math.random() * 1000000000) + 1000000,
  },
  {
    name: "3",
    total: Math.floor(Math.random() * 1000000000) + 1000000,
  },
  {
    name: "4",
    total: Math.floor(Math.random() * 1000000000) + 1429000,
  },
  {
    name: "5",
    total: Math.floor(Math.random() * 1000000000) + 1429000,
  },
  {
    name: "6",
    total: Math.floor(Math.random() * 1000000000) + 1429000,
  },
  {
    name: "7",
    total: Math.floor(Math.random() * 1000000000) + 1429000,
  },
  {
    name: "8",
    total: Math.floor(Math.random() * 1000000000) + 1429000,
  },
  {
    name: "9",
    total: Math.floor(Math.random() * 1000000000) + 1429000,
  },
  {
    name: "10",
    total: Math.floor(Math.random() * 1000000000) + 1429000,
  },
  {
    name: "11",
    total: Math.floor(Math.random() * 1000000000) + 1429000,
  },
  {
    name: "12",
    total: Math.floor(Math.random() * 1000000000) + 1429000,
  },
];

export default function BarChart({}: Props) {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarGraph data={data}>
        <XAxis
          dataKey={"name"}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          padding={{ left: 48 }}
          tickMargin={12}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          tickMargin={-32}
          fontSize={12}
          tickFormatter={(value) => `${formatPrice(value)}đ`}
        />
        <Bar dataKey={"total"} radius={[4, 4, 0, 0]} />
      </BarGraph>
    </ResponsiveContainer>
  );
}
