"use client";

import { useEffect, useState } from "react";

import { cn } from "@ui/utils/cn";

const defaultLevelColors = {
  1: "text-error-base",
  2: "text-warning-base",
  3: "text-success-base",
};

const countTrueCriteria = (criteria: { [key: string]: boolean }): number => {
  return Object.values(criteria).filter((value) => value).length;
};

function LevelBarItem({
  levels,
  level,
  ...rest
}: {
  active?: boolean;
  level: number;
  levels: number;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="w-full h-1 rounded-full bg-bg-soft-200"
      style={{
        clipPath: "inset(0 round 99px)",
      }}
      {...rest}
    >
      <div
        className="absolute top-0 left-0 w-0 h-full bg-current rounded-full duration-500 ease-out"
        style={{
          transitionProperty: "width",
          width: `calc((100% / ${levels}) * ${level})`,
        }}
      />
    </div>
  );
}

export function LevelBar({
  value,
  levels = 3,
  levelColors = defaultLevelColors,
  className,
  ...rest
}: {
  value: string;
  levels?: number;
  levelColors?: { [key: number]: string };
} & React.HTMLAttributes<HTMLDivElement>) {
  const [criteria, setCriteria] = useState({
    length: false,
    uppercase: false,
    number: false,
  });

  useEffect(() => {
    setCriteria({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      number: /[0-9]/.test(value),
    });
  }, [value]);

  const trueCriteriaCount = countTrueCriteria(criteria);

  return (
    <div
      className={cn(
        "relative flex gap-2 overflow-hidden rounded-full",
        levelColors[1],
        className,
        levelColors[trueCriteriaCount],
      )}
      {...rest}
    >
      {Array.from({ length: levels }, (_, i) => i).map((currentLevel) => (
        <LevelBarItem
          key={currentLevel}
          level={trueCriteriaCount}
          levels={levels}
          active={currentLevel < trueCriteriaCount}
        />
      ))}
    </div>
  );
}
