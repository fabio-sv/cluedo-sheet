import type { Theme } from "../../stores/theme";

export const themes: { [key: string]: Theme } = {
    green: {
      name: "green",
      primary: "bg-green-600",
      secondary: "bg-green-100",
      border: "border-green-600",
      childBorder: "*:border-green-600",
      foreground: "black",
      background: "white",
    },
    red: {
      name: "red",
      primary: "bg-red-600",
      secondary: "bg-red-100",
      border: "border-red-600",
      childBorder: "*:border-red-600",
      foreground: "black",
      background: "white",
    },
    blue: {
      name: "blue",
      primary: "bg-blue-600",
      secondary: "bg-blue-100",
      border: "border-blue-600",
      childBorder: "*:border-blue-600",
      foreground: "black",
      background: "white",
    },
    purple: {
      name: "purple",
      primary: "bg-purple-600",
      secondary: "bg-purple-100",
      border: "border-purple-600",
      childBorder: "*:border-purple-600",
      foreground: "black",
      background: "white",
    },
    orange: {
      name: "orange",
      primary: "bg-orange-600",
      secondary: "bg-orange-100",
      border: "border-orange-600",
      childBorder: "*:border-orange-600",
      foreground: "black",
      background: "white",
    },
  };