import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customPurple: 'rgb(175, 16, 255)',
        customPurpleLight: 'rgb(206, 147, 255)', // Lighter version of customPurple
        customBlue: 'rgb(36, 29, 223)',
        customBlueLight: 'rgb(109, 100, 243)', 
        customDarkBlue: '#161a2b'
      },
    },
  },
  plugins: [],
});
