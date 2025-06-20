import { useState } from "react";
import {
  RiArrowRightSLine,
  RiSunLine,
  RiGlobalLine,
  RiMoonLine,
  RiEqualizerLine,
} from "@remixicon/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";

import * as TabMenuVertical from "@repo/ui/components/ui/tab-menu-vertical";
import * as Divider from "@repo/ui/components/ui/divider";
import * as Button from "@repo/ui/components/ui/button";
import * as Select from "@repo/ui/components/ui/select";
import * as Label from "@repo/ui/components/ui/label";
import * as Radio from "@repo/ui/components/ui/radio";
import { useNotification } from "@ui/hooks/use-notification";
import { useTheme } from "~/hooks/use-theme";

const items = [
  {
    label: "Regional Preferences",
    icon: RiGlobalLine,
    value: "regional",
  },
  {
    label: "Theme Options",
    icon: RiSunLine,
    value: "theme",
  },
];

export function GeneralPage() {
  const [activeTab, setActiveTab] = useState("regional");

  return (
    <div className="py-5 md:py-8">
      <TabMenuVertical.Root
        className="grid gap-8 items-start grid-cols-[auto,1fr] xl:grid-cols-[1fr_minmax(0,352px)_1fr]"
        defaultValue="regional"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <div className="p-2.5 rounded-2xl ring-1 ring-inset w-[258px] shrink-0 bg-bg-white-0 shadow-regular-xs ring-stroke-soft-200">
          <h4 className="py-1 px-2 mb-2 uppercase text-subheading-xs text-text-soft-400">
            Select Menu
          </h4>

          <TabMenuVertical.List>
            {items.map(({ label, icon: Icon, value }) => (
              <TabMenuVertical.Trigger
                key={`tab_trigger_${value}`}
                value={value}
              >
                <TabMenuVertical.Icon as={Icon} />
                {label}
                <TabMenuVertical.ArrowIcon as={RiArrowRightSLine} />
              </TabMenuVertical.Trigger>
            ))}
          </TabMenuVertical.List>
        </div>

        <TabMenuVertical.Content
          value="regional"
          className="data-[state=active]:duration-300 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-4"
        >
          <RegionalSettings />
        </TabMenuVertical.Content>

        <TabMenuVertical.Content
          value="theme"
          className="data-[state=active]:duration-300 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-4"
        >
          <ThemeOptions />
        </TabMenuVertical.Content>
      </TabMenuVertical.Root>
    </div>
  );
}

const regionalFormSchema = z.object({
  language: z.string().min(1, "Please, select a language"),
  timezone: z.string().min(1, "Please, select a timezone"),
  dateFormat: z.string().min(1, "Please, select a date format"),
});

type RegionalFormValues = z.infer<typeof regionalFormSchema>;

const languages = [
  { value: "pt-BR", label: "Português (Brasil)" },
  { value: "en-US", label: "English (United States)" },
  { value: "es-ES", label: "Español (España)" },
  { value: "fr-FR", label: "Français (France)" },
  { value: "de-DE", label: "Deutsch (Deutschland)" },
  { value: "it-IT", label: "Italiano (Italia)" },
  { value: "ja-JP", label: "日本語 (Japan)" },
  { value: "ko-KR", label: "한국어 (Korea)" },
  { value: "zh-CN", label: "中文 (China)" },
];

const timezones = [
  { value: "America/Sao_Paulo", label: "Brasil - São Paulo (GMT-3)" },
  { value: "America/New_York", label: "Estados Unidos - Nova York (GMT-5)" },
  {
    value: "America/Los_Angeles",
    label: "Estados Unidos - Los Angeles (GMT-8)",
  },
  { value: "Europe/London", label: "Reino Unido - Londres (GMT+0)" },
  { value: "Europe/Paris", label: "França - Paris (GMT+1)" },
  { value: "Europe/Berlin", label: "Alemanha - Berlim (GMT+1)" },
  { value: "Asia/Tokyo", label: "Japão - Tóquio (GMT+9)" },
  { value: "Asia/Shanghai", label: "China - Xangai (GMT+8)" },
  { value: "Australia/Sydney", label: "Austrália - Sydney (GMT+10)" },
];

const dateFormats = [
  { value: "DD/MM/YYYY", label: "DD/MM/AAAA (31/12/2024)" },
  { value: "MM/DD/YYYY", label: "MM/DD/AAAA (12/31/2024)" },
  { value: "YYYY-MM-DD", label: "AAAA-MM-DD (2024-12-31)" },
  { value: "DD-MM-YYYY", label: "DD-MM-AAAA (31-12-2024)" },
  { value: "MM-DD-YYYY", label: "MM-DD-AAAA (12-31-2024)" },
  { value: "DD.MM.YYYY", label: "DD.MM.AAAA (31.12.2024)" },
];

function RegionalSettings() {
  const { notification } = useNotification();

  const { control, handleSubmit, setValue, reset } =
    useForm<RegionalFormValues>({
      resolver: zodResolver(regionalFormSchema),
      mode: "all",
      defaultValues: {
        language: "en-US",
        timezone: "America/Sao_Paulo",
        dateFormat: "DD/MM/YYYY",
      },
    });

  const onSubmit: SubmitHandler<RegionalFormValues> = async (values) => {
    console.log(values);

    notification({
      title: "Preferences saved successfully",
      description: "Your preferences have been saved successfully.",
      variant: "stroke",
      status: "success",
    });
  };

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <h3 className="text-label-md text-text-strong-950">
          Regional Preferences
        </h3>
        <p className="mt-1 text-paragraph-sm text-text-sub-600">
          Select your preferences for your region.
        </p>
      </div>

      <Divider.Root />

      <div className="flex flex-col gap-3">
        <Controller
          control={control}
          name="language"
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <Label.Root htmlFor="language">
                Language
                <Label.Asterisk />
              </Label.Root>
              <Select.Root
                {...field}
                onValueChange={(val) => setValue("language", val)}
              >
                <Select.Trigger>
                  <Select.Value placeholder="Select a language" />
                </Select.Trigger>

                <Select.Content>
                  {languages.map((item) => (
                    <Select.Item key={item.value} value={item.value}>
                      <Select.ItemIcon as={RiGlobalLine} />
                      {item.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>
          )}
        />

        <Controller
          control={control}
          name="timezone"
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <Label.Root htmlFor="timezone">
                Timezone
                <Label.Asterisk />
              </Label.Root>
              <Select.Root
                {...field}
                onValueChange={(val) => setValue("timezone", val)}
              >
                <Select.Trigger>
                  <Select.Value placeholder="Select a timezone" />
                </Select.Trigger>

                <Select.Content>
                  {timezones.map((item) => (
                    <Select.Item key={item.value} value={item.value}>
                      {item.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>
          )}
        />

        <Controller
          control={control}
          name="dateFormat"
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <Label.Root htmlFor="dateFormat">
                Date Format
                <Label.Asterisk />
              </Label.Root>
              <Select.Root
                {...field}
                onValueChange={(val) => setValue("dateFormat", val)}
              >
                <Select.Trigger>
                  <Select.Value placeholder="Select a date format" />
                </Select.Trigger>

                <Select.Content>
                  {dateFormats.map((item) => (
                    <Select.Item key={item.value} value={item.value}>
                      {item.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </div>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-2">
        <Button.Root
          variant="neutral"
          mode="stroke"
          type="button"
          onClick={() => reset()}
        >
          Discard
        </Button.Root>

        <Button.Root variant="primary" mode="filled" type="submit">
          Save Changes
        </Button.Root>
      </div>
    </form>
  );
}

function ThemeOptions() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <h3 className="text-label-md text-text-strong-950">Theme Options</h3>
        <p className="mt-1 text-paragraph-sm text-text-sub-600">
          Pick theme to personalize experience.
        </p>
      </div>

      <Divider.Root />

      <Radio.Group
        className="flex flex-col gap-3 text-text-strong-950"
        value={theme}
        onValueChange={setTheme}
      >
        <label className="flex cursor-pointer items-start gap-3.5 rounded-xl bg-bg-white-0 p-4 shadow-regular-xs ring-1 ring-inset ring-stroke-soft-200 transition duration-200 ease-out hover:bg-bg-weak-50 hover:ring-transparent has-[[data-state=checked]]:shadow-none has-[[data-state=checked]]:ring-primary-base">
          <div className="flex justify-center items-center rounded-full ring-1 ring-inset size-10 bg-bg-white-0 shadow-regular-xs ring-stroke-soft-200">
            <RiSunLine className="size-5 text-text-sub-600" />
          </div>

          <div className="flex-1 space-y-1">
            <div className="text-label-sm">Light Mode</div>
            <p className="text-paragraph-xs text-text-sub-600">
              Pick a clean and classic light theme.
            </p>
          </div>

          <Radio.Item
            id="light"
            value="light"
            className="relative outline-none focus:outline-none group/radio size-5 shrink-0"
          />
        </label>

        <label className="flex cursor-pointer items-start gap-3.5 rounded-xl bg-bg-white-0 p-4 shadow-regular-xs ring-1 ring-inset ring-stroke-soft-200 transition duration-200 ease-out hover:bg-bg-weak-50 hover:ring-transparent has-[[data-state=checked]]:shadow-none has-[[data-state=checked]]:ring-primary-base">
          <div className="flex justify-center items-center rounded-full ring-1 ring-inset size-10 bg-bg-white-0 shadow-regular-xs ring-stroke-soft-200">
            <RiMoonLine className="size-5 text-text-sub-600" />
          </div>

          <div className="flex-1 space-y-1">
            <div className="text-label-sm">Dark Mode</div>
            <p className="text-paragraph-xs text-text-sub-600">
              Pick a sleek and modern dark theme.
            </p>
          </div>

          <Radio.Item
            id="dark"
            value="dark"
            className="relative outline-none focus:outline-none group/radio size-5 shrink-0"
          />
        </label>

        <label className="flex cursor-pointer items-start gap-3.5 rounded-xl bg-bg-white-0 p-4 shadow-regular-xs ring-1 ring-inset ring-stroke-soft-200 transition duration-200 ease-out hover:bg-bg-weak-50 hover:ring-transparent has-[[data-state=checked]]:shadow-none has-[[data-state=checked]]:ring-primary-base">
          <div className="flex justify-center items-center rounded-full ring-1 ring-inset size-10 bg-bg-white-0 shadow-regular-xs ring-stroke-soft-200">
            <RiEqualizerLine className="size-5 text-text-sub-600" />
          </div>

          <div className="flex-1 space-y-1">
            <div className="text-label-sm">System</div>
            <p className="text-paragraph-xs text-text-sub-600">
              Adapts to your system theme.
            </p>
          </div>

          <Radio.Item
            id="system"
            value="system"
            className="relative outline-none focus:outline-none group/radio size-5 shrink-0"
          />
        </label>
      </Radio.Group>
    </div>
  );
}
