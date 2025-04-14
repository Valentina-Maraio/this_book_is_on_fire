"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import banned_books from '../app/dashboard/banned_books.json';

export const description = "An interactive area chart"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig

const countAllBannedBooks = (books: any, key: any) => {
  return books.reduce((acc: any, item: any) => {
    const value = item[key] || 'Unknown';
    acc[value] = (acc[value] ||  0) + 1;
    return acc;
  }, {})
};

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const booksByAuthor = countAllBannedBooks(banned_books, 'Author');

  const sortedAuthors: {author: string; count: number;}[] = Object.entries(booksByAuthor)
  .sort((a, b) => {
    const countA = typeof a[1] === 'number' ? a[1] : 0;
    const countB = typeof b[1] === 'number' ? b[1] : 0;
    return countA - countB
  })
  .map(([author, count]) => ({ author, count: typeof count === 'number' ? count : 0 }));

  const mostBanned = sortedAuthors.filter((item) => item.count > 2);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Most banned authors</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total books banned in the USA by author
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={mostBanned}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid />
            <XAxis
              dataKey="author"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <YAxis allowDecimals={false} />
            <Area
              dataKey="count"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
