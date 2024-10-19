module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Убедитесь, что эти пути включают ваши файлы
  ],
  theme: {
    extend: {
      colors: {
        customBlue: "rgba(0, 160, 227, 1)",
      },
    },
  },
  plugins: [],
};
