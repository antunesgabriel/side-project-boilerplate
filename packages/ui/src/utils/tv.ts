import { createTV } from "tailwind-variants";
export type { VariantProps, ClassValue } from "tailwind-variants";

import { twMergeConfig } from "@ui/utils/cn";

export const tv = createTV({
  twMergeConfig,
});
