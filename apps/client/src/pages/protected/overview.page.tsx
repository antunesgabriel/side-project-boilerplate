import { RiLineChartLine, RiTimeFill, RiUserLine } from "@remixicon/react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import * as PageHeader from "@repo/ui/components/blocks/page-header";
import * as Chart from "@repo/ui/components/ui/chart";
import * as Button from "@repo/ui/components/ui/button";
import * as Card from "@repo/ui/components/ui/card";
import * as Divider from "@repo/ui/components/ui/divider";

import { useSession } from "~/config/auth";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies Chart.ChartConfig;

export function OverviewPage() {
  const { data: session } = useSession();

  return (
    <div className="flex relative z-50 flex-col flex-1 self-stretch mx-auto w-full max-w-[1360px]">
      <PageHeader.Root
        title={session?.user?.name ?? ""}
        subtitle="Welcome back to Company👋🏽"
        icon={<PageHeader.Icon as={RiUserLine} />}
        avatarUrl={session?.user?.image ?? undefined}
      />

      <section className="px-4 lg:px-8">
        <div className="grid gap-6 justify-center items-start grid-cols-[repeat(auto-fill,minmax(344px,1fr))]">
          <Card.Root>
            <Card.Header>
              <RiLineChartLine className="size-6 text-text-sub-600" />
              <Card.Title>Work Hour Analysis</Card.Title>
              <Card.Action>
                <Button.Root variant="neutral" mode="stroke" size="xsmall">
                  See all
                </Button.Root>
              </Card.Action>
            </Card.Header>

            <Divider.Root className="mt-2" />

            <Card.Content className="pt-5 space-y-5">
              <div className="flex gap-2.5 items-center">
                <div className="flex justify-center items-center rounded-full size-10 shrink-0 bg-primary-alpha-10">
                  <RiTimeFill className="size-5 text-primary-base" />
                </div>

                <div className="space-y-1">
                  <h3 className="uppercase text-subheading-2xs text-text-soft-400">
                    Total Work
                  </h3>
                  <p className="text-label-lg text-text-strong-950">
                    38 hours ∙ 12 mins
                  </p>
                </div>
              </div>

              <Chart.Root config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <Chart.Tooltip
                    cursor={false}
                    content={<Chart.TooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="desktop"
                    type="step"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </Chart.Root>
            </Card.Content>
          </Card.Root>
        </div>
      </section>
    </div>
  );
}
