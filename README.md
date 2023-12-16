# Weather Display

## Table of Contents

- [Weather Display](#weather-display)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [TODO / Ideas](#todo--ideas)
  - [Resources / Links](#resources--links)

## About

Several months ago, I found a [sky-based gradient](https://codepen.io/justgooddesign/pen/AzaLmZ).
I.e., it is a clock with a background that changes with each hour. I wanted to
expand on this idea to include the current weather and forecast.

Also, even though I've worked with a number of React and TypeScript applications,
I had never used those technologies to build an application from scratch.

So, this is currently both a work in progress and a learning process.

## TODO / Ideas

- World Map:

  - <https://help.apple.com/assets/64F2682AAC506411740C75E5/64F2682BAC506411740C75EC/en_US/6d5f223547f927f31f5cdaab94b1979e.png>
  - <https://leafletjs.com/>
  - <https://joergdietrich.github.io/Leaflet.Terminator/>

- Sunrise/Sunset indicator
- Move locations to config file
- Some components don't resize; contents overflow.
- Moon phase display.
- Move icons to their own component.
- Back-end service:
  - Weather pull
  - Configuration changes
- Minutely Data
  - Don't render if there is no data
  - Don't render if the data is older than the current date
  - Don't render if there is no precipitation.
  - If the current date/time is older than the forecast, render the current time mark at the beginning (or not at all)
- Wind Direction
- Air Quality
- Weather icon colors
- Graph of hourly temperature data.
- Center/resize with screen size changes.

## Resources / Links

<https://openweathermap.org/api/one-call-3#parameter>
<https://www.xconvert.com/unit-converter/hectopascals-to-inches-of-mercury>
<https://codepen.io/Boogiesox/pen/zxjGgO?editors=1000>
