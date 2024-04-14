import { MenuProps } from "antd";
import { TCountryResponse } from "../../../../store/countriesList";

export const getYearsItems = (): MenuProps["items"] => {
  const currentYear = 2024;
  const children = [];
  for (let i = currentYear + 3; i > currentYear - 7; --i) {
    children.push({ label: i, key: i });
  }
  for (let i = Math.floor(currentYear / 10) * 10; i > 1880; i -= 10) {
    const period = `${i}-${i + 9}`;
    children.push({ label: period, key: period });
  }
  const result: MenuProps["items"] = [
    {
      label: "Годы",
      key: "SubMenu",
      children: children,
    },
  ];

  return result;
};
export const getCountryListItems = (
  countriesList: TCountryResponse
): MenuProps["items"] => {
  const result: MenuProps["items"] = [
    {
      label: "Страны",
      key: "SubMenu",
      children: countriesList.map((country) => ({
        label: country.name,
        key: country.name,
      })),
    },
  ];
  return result;
};
export const ageLimitItems: MenuProps["items"] = [
  {
    label: "Возрастной рейтинг",
    key: "SubMenu",
    children: [
      {
        label: "0+",
        key: "0",
      },
      {
        label: "6+",
        key: "6",
      },
      {
        label: "12+",
        key: "12",
      },
      {
        label: "16+",
        key: "16",
      },
      {
        label: "18+",
        key: "18",
      },
    ],
  },
];
